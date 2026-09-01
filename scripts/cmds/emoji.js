.cmd install emoji.js module.exports = {
	config: {
		name: "emoji",
		version: "1.0.0",
		author: "SHAHADAT SAHU",
		countDown: 0,
		role: 0,
		shortDescription: {
			en: "Change group emoji"
		},
		longDescription: {
			en: "Change the emoji of the current group"
		},
		category: "box chat",
		guide: {
			en: "{pn} [emoji]"
		}
	},

	onStart: async function ({ api, event, args }) {
		const emoji = args.join(" ").trim();

		if (!emoji) {
			return api.sendMessage(
				"😒 | 😒",
				event.threadID,
				event.messageID
			);
		}

		try {
			await new Promise((resolve, reject) => {
				api.changeThreadEmoji(
					emoji,
					event.threadID,
					(err) => {
						if (err) return reject(err);
						resolve();
					}
				);
			});

			return api.sendMessage(
				`huu | done: ${emoji}`,
				event.threadID,
				event.messageID
			);
		} catch (error) {
			console.error("Emoji Error:", error);

			return api.sendMessage(
				"😒 | 😒।",
				event.threadID,
				event.messageID
			);
		}
	}
};
