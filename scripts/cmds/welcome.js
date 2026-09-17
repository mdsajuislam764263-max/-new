const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { createCanvas, loadImage } = require("canvas");

const CACHE_DIR = path.join(__dirname, "cache");

if (!fs.existsSync(CACHE_DIR)) {
	fs.mkdirSync(CACHE_DIR, { recursive: true });
}


// ===============================
// DOWNLOAD IMAGE
// ===============================
async function downloadImage(url, filePath) {
	try {
		const response = await axios.get(url, {
			responseType: "arraybuffer",
			headers: {
				"User-Agent": "Mozilla/5.0"
			}
		});

		fs.writeFileSync(filePath, response.data);
		return filePath;
	} catch (e) {
		console.log("Image download error:", e.message);
		return null;
	}
}


// ===============================
// GET USER PROFILE IMAGE
// ===============================
async function getUserImage(api, uid, fileName) {
	try {
		const info = await api.getUserInfo(uid);

		const user = info[uid];

		if (!user)
			return null;

		const imageUrl =
			user.thumbSrc ||
			user.profileUrl ||
			user.picture?.data?.url;

		if (!imageUrl)
			return null;

		return await downloadImage(
			imageUrl,
			path.join(CACHE_DIR, fileName)
		);

	} catch (e) {
		console.log("User image error:", e.message);
		return null;
	}
}


// ===============================
// GET GROUP IMAGE
// ===============================
async function getGroupImage(api, threadID) {
	try {
		const info = await api.getThreadInfo(threadID);

		if (!info.imageSrc)
			return null;

		return await downloadImage(
			info.imageSrc,
			path.join(CACHE_DIR, `group_${threadID}.jpg`)
		);

	} catch (e) {
		console.log("Group image error:", e.message);
		return null;
	}
}


// ===============================
// CIRCLE IMAGE
// ===============================
async function drawCircleImage(ctx, imagePath, x, y, size) {

	if (!imagePath || !fs.existsSync(imagePath))
		return;

	try {
		const img = await loadImage(imagePath);

		ctx.save();

		ctx.beginPath();
		ctx.arc(
			x + size / 2,
			y + size / 2,
			size / 2,
			0,
			Math.PI * 2
		);

		ctx.closePath();
		ctx.clip();

		ctx.drawImage(img, x, y, size, size);

		ctx.restore();

		// Border
		ctx.beginPath();
		ctx.arc(
			x + size / 2,
			y + size / 2,
			size / 2,
			0,
			Math.PI * 2
		);

		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = 5;
		ctx.stroke();

	} catch (e) {
		console.log("Draw image error:", e.message);
	}
}


// ===============================
// CREATE WELCOME IMAGE
// ===============================
async function createWelcomeImage(
	userImage,
	groupImage,
	addedByImage,
	userName,
	groupName
) {

	const width = 1200;
	const height = 700;

	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext("2d");

	// Background
	ctx.fillStyle = "#10151d";
	ctx.fillRect(0, 0, width, height);


	// Top title
	ctx.fillStyle = "#ffffff";
	ctx.font = "bold 55px Arial";
	ctx.textAlign = "center";

	ctx.fillText(
		"🌸 WELCOME 🌸",
		width / 2,
		80
	);


	// Line
	ctx.beginPath();
	ctx.moveTo(100, 110);
	ctx.lineTo(1100, 110);
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 4;
	ctx.stroke();


	// ===============================
	// USER IMAGE - LEFT
	// ===============================

	await drawCircleImage(
		ctx,
		userImage,
		120,
		160,
		230
	);


	// ===============================
	// GROUP IMAGE - CENTER
	// ===============================

	await drawCircleImage(
		ctx,
		groupImage,
		485,
		140,
		270
	);


	// ===============================
	// ADDED BY IMAGE - RIGHT
	// ===============================

	await drawCircleImage(
		ctx,
		addedByImage,
		850,
		160,
		230
	);


	// ===============================
	// USER NAME
	// ===============================

	ctx.fillStyle = "#ffffff";
	ctx.font = "bold 32px Arial";
	ctx.textAlign = "center";

	ctx.fillText(
		userName.length > 18
			? userName.substring(0, 18) + "..."
			: userName,
		235,
		430
	);


	// ===============================
	// GROUP NAME
	// ===============================

	ctx.font = "bold 28px Arial";

	const shortGroup =
		groupName.length > 20
			? groupName.substring(0, 20) + "..."
			: groupName;

	ctx.fillText(
		shortGroup,
		620,
		450
	);


	// ===============================
	// ADDED BY
	// ===============================

	ctx.font = "bold 28px Arial";

	ctx.fillText(
		"Added By",
		965,
		430
	);


	// Bottom line
	ctx.beginPath();
	ctx.moveTo(100, 500);
	ctx.lineTo(1100, 500);

	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 4;
	ctx.stroke();


	// Bottom text
	ctx.font = "bold 38px Arial";

	ctx.fillText(
		"Enjoy your stay! 😊",
		width / 2,
		585
	);


	const output = path.join(
		CACHE_DIR,
		`welcome_${Date.now()}.jpg`
	);

	fs.writeFileSync(
		output,
		canvas.toBuffer("image/jpeg", {
			quality: 0.90
		})
	);

	return output;
}


// ===============================
// GOATBOT COMMAND
// ===============================

module.exports = {

	config: {
		name: "welcome",
		version: "2.0",
		author: "SAJU",
		countDown: 5,
		role: 1,

		description: {
			en: "Welcome new members with profile images"
		},

		category: "box chat",

		guide: {
			en: "{pn}"
		}
	},


	langs: {
		en: {
			success: "Welcome system is active."
		}
	},


	onStart: async function ({ message }) {

		return message.reply(
			"✅ Welcome system is active!"
		);

	},


	// ===============================
	// NEW MEMBER EVENT
	// ===============================

	onEvent: async function ({
		event,
		api
	}) {

		if (event.logMessageType !== "log:subscribe")
			return;

		const data = event.logMessageData;

		if (!data || !data.addedParticipants)
			return;

		const threadID = event.threadID;

		// Get group info
		let threadInfo;

		try {
			threadInfo = await api.getThreadInfo(threadID);
		} catch (e) {
			threadInfo = {
				threadName: "Group"
			};
		}


		const groupName =
			threadInfo.threadName || "Group";


		// Who added the member
		const addedByUID =
			event.author || event.senderID;


		// Added by image
		const addedByImage =
			await getUserImage(
				api,
				addedByUID,
				`addedby_${threadID}.jpg`
			);


		// Group image
		const groupImage =
			await getGroupImage(
				api,
				threadID
			);


		// Member number
		let memberCount = 0;

		try {
			memberCount =
				threadInfo.participantIDs
					? threadInfo.participantIDs.length
					: 0;
		} catch (e) {
			memberCount = 0;
		}


		// Process every new member
		for (const user of data.addedParticipants) {

			const uid =
				user.userFbId ||
				user.userID;


			const name =
				user.fullName ||
				"New Member";


			// User profile image
			const userImage =
				await getUserImage(
					api,
					uid,
					`member_${uid}.jpg`
				);


			// Create image
			let welcomeImage;

			try {

				welcomeImage =
					await createWelcomeImage(
						userImage,
						groupImage,
						addedByImage,
						name,
						groupName
					);

			} catch (e) {

				console.log(
					"Welcome image creation error:",
					e.message
				);

				welcomeImage = null;
			}


			// ===============================
			// WELCOME TEXT
			// ===============================

			const welcomeText = `
╔═══━━━━━━━🕷️━━━━━━━═══╗
🩸 𝑾𝑬𝑳𝑪𝑶𝑴𝑬 🩸
╚═══━━━━━━━🕷️━━━━━━━═══╝

👻 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐭𝐡𝐞 gc 🖤

🌷 Name: ${name}
🏷️ Group: ${groupName}
🔢 Member #${memberCount}

🌑 অন্ধকার জগতে তোমাকে স্বাগতম...
🕸️ এখন থেকে তুমিও আমাদের পরিবারের একজন!
👀 চুপচাপ থেকো না, সবার সাথে পরিচিত হও। 🫶🏻

╭───────🖤───────╮
🕷️ 𝐄𝐧𝐣𝐨𝐲 𝐓𝐡𝐞 𝐕𝐢𝐛𝐞 👻
╰───────🖤───────╯
`;


			// ===============================
			// SEND IMAGE + TEXT
			// ===============================

			if (welcomeImage && fs.existsSync(welcomeImage)) {

				await api.sendMessage(
					{
						body: welcomeText,
						attachment: fs.createReadStream(
							welcomeImage
						)
					},
					threadID
				);

			} else {

				await api.sendMessage(
					welcomeText,
					threadID
				);
			}


			// Cleanup member image
			try {
				if (
					userImage &&
					fs.existsSync(userImage)
				) {
					fs.unlinkSync(userImage);
				}
			} catch (e) {}
		}


		// Cleanup added-by image
		try {

			if (
				addedByImage &&
				fs.existsSync(addedByImage)
			) {
				fs.unlinkSync(addedByImage);
			}

		} catch (e) {}


		// Cleanup group image
		try {

			if (
				groupImage &&
				fs.existsSync(groupImage)
			) {
				fs.unlinkSync(groupImage);
			}

		} catch (e) {}
	}
};
