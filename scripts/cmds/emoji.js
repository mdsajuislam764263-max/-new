module.exports.config = {
	name: "emoji",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "SHAHADAT SAHU",
	description: "Change your group Emoji",
	commandCategory: "Box", 
	usages: "groupemoji [emoji]", 
	cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
	const emoji = args.join(" ");
	
	if (!emoji) {
		return api.sendMessage("Ki...??😒", event.threadID, event.messageID);
	}

	api.changeThreadEmoji(emoji, event.threadID, () => {
		api.sendMessage(`ok"boss🍃: ${emoji}`, event.threadID, event.messageID);
	});
};
