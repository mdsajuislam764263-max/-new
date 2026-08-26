const fs = require("fs");
const axios = require("axios");
const path = require("path");

// ✅ YOUR ADMIN UID
const ADMIN_IDS = ["61582071385233"];

module.exports = {
	config: {
		name: "ppc",
		aliases: ["ppc", "setbotpic", "botpp", "setppc"],
		version: "2.0",
		author: "𝒔𝒂𝒋𝒖...𝒃𝒐𝒔𝒔.𝒑𝒏𝒍",
		role: 2,
		countDown: 5,
		shortDescription: "Set bot profile picture",
		category: "admin"
	},

	onStart: async function ({ api, event, message }) {

		try {

			// ✅ Admin Check
			const senderID = String(event.senderID || "");

			if (!ADMIN_IDS.includes(senderID)) {
				return message.reply(
`💀 ACCESS DENIED
🕶️ ONLY BIG BOSS CAN USE THIS COMMAND`
				);
			}

			// ✅ Must reply to image
			const attachments = event.messageReply?.attachments;

			if (!attachments || attachments.length === 0) {
				return message.reply(
"❌ Reply to any image first."
				);
			}

			const image = attachments[0];

			// ✅ Only image allowed
			if (
				image.type !== "photo" &&
				image.type !== "png"
			) {
				return message.reply(
"❌ Only image reply supported."
				);
			}

			// ✅ Image URL
			const imageUrl =
				image.url ||
				image.previewUrl;

			if (!imageUrl) {
				return message.reply(
"❌ Image URL not found."
				);
			}

			// ✅ Cache folder
			const cacheFolder = path.join(__dirname, "cache");

			if (!fs.existsSync(cacheFolder)) {
				fs.mkdirSync(cacheFolder);
			}

			const filePath = path.join(cacheFolder, "ppc.jpg");

			// ✅ Download image
			const response = await axios.get(imageUrl, {
				responseType: "arraybuffer"
			});

			fs.writeFileSync(
				filePath,
				Buffer.from(response.data, "binary")
			);

			await message.reply(
`⚡ BIG BOSS PROFILE SYSTEM
⏳ Updating bot profile picture...`
			);

			// ✅ Change bot profile picture
			await api.changeAvatar(
				fs.createReadStream(filePath)
			);

			// ✅ Delete temp file
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}

			return message.reply(
`✅ BOT PROFILE UPDATED
😈 BIG BOSS MODE ACTIVATED`
			);

		} catch (err) {

			console.log(err);

			return message.reply(
`❌ FAILED TO UPDATE PROFILE
⚠️ Your bot framework may not support api.changeAvatar`
			);
		}
	}
};
