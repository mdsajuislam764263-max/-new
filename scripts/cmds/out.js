module.exports = {
	config: {
		name: "out",
		version: "1.1",
		author: "SAJU",
		countDown: 3,
		role: 2,
		shortDescription: {
			en: "Bot leaves the group",
			bn: "বট গ্রুপ থেকে বের হবে",
			vi: "Bot rời khỏi nhóm"
		},
		category: "group"
	},

	onStart: async function ({ api, event }) {
		try {
			await api.sendMessage(
				"I’m leaving the group. 🥺\nEveryone, stay happy and take care. ❤️\nAllah Hafiz. 🤍",
				event.threadID
			);

			setTimeout(() => {
				api.removeUserFromGroup(
					api.getCurrentUserID(),
					event.threadID,
					(err) => {
						if (err)
							console.error("OUT command error:", err);
					}
				);
			}, 1000);

		} catch (error) {
			console.error("OUT command error:", error);
		}
	}
};
