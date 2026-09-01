const axios = require("axios");
const fs = require("fs-extra");

const baseApiUrl = async () => {
	const res = await axios.get(
		"https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json"
	);
	return res.data.api;
};

module.exports = {
	config: {
		name: "video",
		version: "1.1.4",
		author: "dipto",
		countDown: 5,
		role: 0,

		shortDescription: {
			en: "Download video, audio and info from YouTube"
		},

		longDescription: {
			en: "Search and download YouTube videos, audio or view video information."
		},

		category: "media",

		guide: {
			en:
				"{pn} [video|-v] [video name/link]\n" +
				"{pn} [audio|-a] [video name/link]\n" +
				"{pn} [info|-i] [video name/link]\n\n" +
				"Example:\n" +
				"{pn} -v chipi chipi chapa chapa\n" +
				"{pn} -a chipi chipi chapa chapa\n" +
				"{pn} -i chipi chipi chapa chapa"
		}
	},

	onStart: async function ({ api, args, event }) {
		const { threadID, messageID, senderID } = event;

		let action = args[0]
			? args[0].toLowerCase()
			: "-v";

		const validActions = [
			"-v",
			"video",
			"mp4",
			"-a",
			"audio",
			"mp3",
			"-i",
			"info"
		];

		if (!validActions.includes(action)) {
			args.unshift("-v");
			action = "-v";
		}

		const checkURL =
			/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;

		const urlYtb = args[1]
			? checkURL.test(args[1])
			: false;

		/* =========================
		   DIRECT YOUTUBE LINK
		========================= */

		if (urlYtb) {
			const format =
				["-v", "video", "mp4"].includes(action)
					? "mp4"
					: ["-a", "audio", "mp3"].includes(action)
					? "mp3"
					: null;

			if (!format) {
				return api.sendMessage(
					"❌ | Invalid format.\nUse -v for video or -a for audio.",
					threadID,
					messageID
				);
			}

			try {
				const match = args[1].match(checkURL);
				const videoID = match ? match[1] : null;

				if (!videoID) {
					return api.sendMessage(
						"❌ | Invalid YouTube link.",
						threadID,
						messageID
					);
				}

				const pathName =
					`ytb_${format}_${videoID}.${format}`;

				const base = await baseApiUrl();

				const response = await axios.get(
					`${base}/ytDl3?link=${encodeURIComponent(videoID)}&format=${format}&quality=3`
				);

				const data = response.data || {};

				if (!data.downloadLink) {
					throw new Error("Download link not found");
				}

				await api.sendMessage(
					{
						body:
							`╭─────────────⭓\n` +
							`│ 🎬 Title: ${data.title || "Unknown"}\n` +
							`│ 🎧 Format: ${format.toUpperCase()}\n` +
							`│ ⭐ Quality: ${data.quality || "Unknown"}\n` +
							`╰─────────────⭓`,
						attachment: await downloadFile(
							data.downloadLink,
							pathName
						)
					},
					threadID,
					() => {
						if (fs.existsSync(pathName)) {
							fs.unlinkSync(pathName);
						}
					},
					messageID
				);

				return;
			} catch (error) {
				console.error("YouTube Download Error:", error);

				return api.sendMessage(
					"❌ | ভিডিও ডাউনলোড করতে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
					threadID,
					messageID
				);
			}
		}

		/* =========================
		   SEARCH YOUTUBE
		========================= */

		args.shift();

		const keyWord = args.join(" ").trim();

		if (!keyWord) {
			return api.sendMessage(
				"❌ | Please provide a search keyword.",
				threadID,
				messageID
			);
		}

		try {
			const base = await baseApiUrl();

			const response = await axios.get(
				`${base}/ytFullSearch?songName=${encodeURIComponent(keyWord)}`
			);

			const searchResult = Array.isArray(response.data)
				? response.data.slice(0, 6)
				: [];

			if (!searchResult.length) {
				return api.sendMessage(
					`⭕ | No results found for: ${keyWord}`,
					threadID,
					messageID
				);
			}

			let msg =
				`╭───────⭓ 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐑𝐄𝐒𝐔𝐋𝐓𝐒\n` +
				`│ 🔎 Search: ${keyWord}\n` +
				`╰───────⭓\n\n`;

			const thumbnails = [];

			let i = 1;

			for (const info of searchResult) {
				thumbnails.push(
					streamImage(
						info.thumbnail,
						`thumbnail_${i}.jpg`
					)
				);

				msg +=
					`╭─ ${i}. ${info.title || "Unknown"}\n` +
					`│ ⏱ Time: ${info.time || "Unknown"}\n` +
					`│ 📺 Channel: ${info.channel?.name || "Unknown"}\n` +
					`╰────────────⭓\n\n`;

				i++;
			}

			msg +=
				`↪️ Reply to this message with a number (1-${searchResult.length})`;

			await api.sendMessage(
				{
					body: msg,
					attachment: await Promise.all(thumbnails)
				},
				threadID,
				(err, info) => {
					if (err) {
						console.error(err);
						return;
					}

					global.client.handleReply.push({
						name: module.exports.config.name,
						messageID: info.messageID,
						author: senderID,
						result: searchResult,
						action
					});
				},
				messageID
			);
		} catch (error) {
			console.error("YouTube Search Error:", error);

			return api.sendMessage(
				"❌ | Search করতে সমস্যা হয়েছে।",
				threadID,
				messageID
			);
		}
	},

	/* =========================
	   HANDLE REPLY
	========================= */

	onReply: async function ({ api, event, Reply }) {
		const {
			threadID,
			messageID,
			senderID,
			body
		} = event;

		if (senderID !== Reply.author) {
			return;
		}

		const result = Reply.result;
		const action = Reply.action;

		const choice = parseInt(body);

		if (
			isNaN(choice) ||
			choice <= 0 ||
			choice > result.length
		) {
			return api.sendMessage(
				`❌ | Invalid number.\nPlease reply with 1-${result.length}.`,
				threadID,
				messageID
			);
		}

		const selectedVideo = result[choice - 1];

		const videoID = selectedVideo.id;

		try {
			await api.unsendMessage(Reply.messageID);
		} catch (error) {
			console.error("Unsend Error:", error);
		}

		/* =========================
		   VIDEO / AUDIO
		========================= */

		if (
			[
				"-v",
				"video",
				"mp4",
				"-a",
				"audio",
				"mp3",
				"music"
			].includes(action)
		) {
			const format =
				["-v", "video", "mp4"].includes(action)
					? "mp4"
					: "mp3";

			try {
				const pathName =
					`ytb_${format}_${videoID}.${format}`;

				const base = await baseApiUrl();

				const response = await axios.get(
					`${base}/ytDl3?link=${encodeURIComponent(videoID)}&format=${format}&quality=3`
				);

				const data = response.data || {};

				if (!data.downloadLink) {
					throw new Error("Download link not found");
				}

				await api.sendMessage(
					{
						body:
							`╭─────────────⭓\n` +
							`│ 🎬 Title: ${data.title || selectedVideo.title}\n` +
							`│ 🎧 Format: ${format.toUpperCase()}\n` +
							`│ ⭐ Quality: ${data.quality || "Unknown"}\n` +
							`╰─────────────⭓`,
						attachment: await downloadFile(
							data.downloadLink,
							pathName
						)
					},
					threadID,
					() => {
						if (fs.existsSync(pathName)) {
							fs.unlinkSync(pathName);
						}
					},
					messageID
				);
			} catch (error) {
				console.error("Download Error:", error);

				return api.sendMessage(
					"❌ | Failed to download. Please try again later.",
					threadID,
					messageID
				);
			}

			return;
		}

		/* =========================
		   VIDEO INFO
		========================= */

		if (action === "-i" || action === "info") {
			try {
				const base = await baseApiUrl();

				const response = await axios.get(
					`${base}/ytfullinfo?videoID=${encodeURIComponent(videoID)}`
				);

				const data = response.data || {};

				const categories =
					Array.isArray(data.categories)
						? data.categories.join(", ")
						: "Unknown";

				const duration =
					data.duration
						? `${(Number(data.duration) / 60).toFixed(2)} mins`
						: "Unknown";

				const infoText =
					`╭─────────────⭓\n` +
					`│ 🎬 𝐓𝐈𝐓𝐋𝐄\n` +
					`│ ${data.title || "Unknown"}\n` +
					`├─────────────\n` +
					`│ ⏳ Duration: ${duration}\n` +
					`│ 📺 Resolution: ${data.resolution || "Unknown"}\n` +
					`│ 👀 Views: ${data.view_count || "Unknown"}\n` +
					`│ 👍 Likes: ${data.like_count || "Unknown"}\n` +
					`│ 💬 Comments: ${data.comment_count || "Unknown"}\n` +
					`│ 📂 Category: ${categories}\n` +
					`│ 📢 Channel: ${data.channel || "Unknown"}\n` +
					`│ 👥 Subscribers: ${data.channel_follower_count || "Unknown
