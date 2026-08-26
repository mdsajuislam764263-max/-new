module.exports = {
	config: {
		name: "nickall",
		version: "1.0",
		author: "sàjú",
		countDown: 5,
		role: 1,
		shortDescription: "Change all nicknames",
		longDescription: "Change everyone's nickname randomly",
		category: "group",
		guide: {
			en: "{pn}"
		}
	},

	onStart: async function ({ api, event }) {
		try {
			const { threadID } = event;

			const maleNicks = [
				"👑 King Boss",
				"🔥 Fire King",
				"⚔️ Dark Knight",
				"🦁 Lion King",
				"💎 Diamond Boss",
				"🚀 Rocket Man",
				"🎮 Gamer Pro",
				"⚡ Speed Master",
				"🏆 Champion",
				"🎭 Mister X",
				"🛡️ Guardian",
				"🌟 Superstar",
				"🦅 Eagle Eye",
				"🎯 Sniper King",
				"🚴 Rider Boss",
				"🎸 Rockstar",
				"🌪️ Storm King",
				"🐯 Tiger Boss",
				"🏹 Hunter",
				"💫 Star Boy",
				"🧠 Brain Master",
				"🎲 Lucky Boss",
				"🚗 Racer King",
				"🎤 Music King",
				"🌍 World Boss",
				"🪐 Galaxy King",
				"⚜️ Royal Boy",
				"🎊 Party King",
				"💥 Thunder Boss",
				"🎁 Gift Master"
			];

			const femaleNicks = [
				"👑 Queen Boss",
				"🌸 Princess",
				"💖 Angel Girl",
				"🦋 Butterfly Queen",
				"✨ Star Princess",
				"🌹 Rose Queen",
				"🎀 Dream Girl",
				"💫 Moon Queen",
				"🌈 Rainbow Girl",
				"🧸 Teddy Queen",
				"💎 Diamond Queen",
				"🌺 Flower Princess",
				"🎶 Melody Girl",
				"🪄 Magic Queen",
				"🌙 Moonlight",
				"⭐ Star Girl",
				"🎉 Party Queen",
				"🍓 Strawberry Girl",
				"🍭 Candy Queen",
				"🌷 Tulip Princess",
				"💝 Sweet Angel",
				"🎨 Art Queen",
				"🧁 Cupcake Girl",
				"🌻 Sunflower",
				"🪷 Lotus Queen",
				"🎵 Music Queen",
				"🍀 Lucky Girl",
				"🦄 Unicorn Queen",
				"🎇 Sparkle Girl",
				"💞 Lovely Queen"
			];

			const threadInfo = await api.getThreadInfo(threadID);

			for (const user of threadInfo.userInfo) {
				if (user.id == api.getCurrentUserID()) continue;

				const nickList =
					user.gender == "FEMALE"
						? femaleNicks
						: maleNicks;

				const randomNick =
					nickList[Math.floor(Math.random() * nickList.length)];

				try {
					await api.changeNickname(
						randomNick,
						threadID,
						user.id
					);
				}
				catch (e) {}
			}

			return api.sendMessage(
				"✅ Successfully changed everyone's nickname!",
				threadID
			);
		}
		catch (err) {
			return api.sendMessage(
				`❌ Error: ${err.message}`,
				event.threadID
			);
		}
	}
};
