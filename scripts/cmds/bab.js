const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "bab",
    aliases: ["বাব"],
    version: "1.0",
    author: "SAJU",
    countDown: 3,
    role: 0,

    shortDescription: {
      bn: "নাচ ও সবাইকে মেনশন",
      en: "Dance and mention everyone"
    },

    longDescription: {
      bn: "নাচের ছবি পাঠানো এবং গ্রুপের সবাইকে মেনশন করার কমান্ড।",
      en: "Send a dance image or mention everyone."
    },

    category: "fun",

    guide: {
      bn: "{pn} নাচো | {pn} গ্রুপের সবাইরে চিপা থেকে বের হতে বল | {pn} mention everyone",
      en: "{pn} dance | {pn} mention everyone"
    }
  },

  onStart: async function ({ api, event, args, message }) {

    const text = args.join(" ").trim().toLowerCase();

    // ==========================================
    // 💃 DANCE
    // ==========================================

    const danceWords = [
      "নাচ",
      "নাচো",
      "নাচি",
      "aso nachi",
      "dance"
    ];

    if (danceWords.some(word => text === word || text.includes(word))) {
      try {

        const danceImage = await getStreamFromURL(
          "https://i.imgur.com/bQ8ioYG.png"
        );

        return api.sendMessage(
          {
            body: "💃😂 এই নাও, নাচ শুরু! 🕺🔥",
            attachment: danceImage
          },
          event.threadID,
          event.messageID
        );

      } catch (error) {

        console.error("Dance Error:", error);

        return message.reply(
          "❌ | নাচের ছবি পাঠাতে সমস্যা হয়েছে।"
        );
      }
    }

    // ==========================================
    // 📢 MENTION EVERYONE
    // ==========================================

    const mentionEveryone =
      text === "mention everyone" ||
      text === "everyone" ||
      text.includes("গ্রুপের সবাইরে চিপা থেকে বের হতে বল") ||
      text.includes("গ্রুপের সবাইকে চিপা থেকে বের হতে বল") ||
      text.includes("সবাইরে চিপা থেকে বের হতে বল") ||
      text.includes("সবাইকে চিপা থেকে বের হতে বল");

    if (mentionEveryone) {

      try {

        const threadInfo = await api.getThreadInfo(
          event.threadID
        );

        const members = threadInfo.participantIDs || [];

        if (!members.length) {
          return message.reply(
            "❌ | গ্রুপের সদস্য পাওয়া যায়নি।"
          );
        }

        let body =
`📢 𝐀𝐓𝐓𝐄𝐍𝐓𝐈𝐎𝐍 𝐄𝐕𝐄𝐑𝐘𝐎𝐍𝐄! 🔥

এই যে গ্রুপের সবাই! 👀
চিপার ভিতর থেকে বের হয়ে আসো! 😂

সবাই একটু Active হও! 🗣️🔥

👇 সবাই হাজিরা দাও 👇

`;

        const mentions = [];

        for (const userID of members) {

          // Bot-কে mention করবে না
          if (userID === api.getCurrentUserID()) {
            continue;
          }

          let name = "Member";

          try {

            const userInfo =
              await api.getUserInfo(userID);

            if (
              userInfo &&
              userInfo[userID] &&
              userInfo[userID].name
            ) {
              name = userInfo[userID].name;
            }

          } catch (error) {
            // নাম পাওয়া না গেলে Member থাকবে
          }

          const tag = `@${name}`;

          body += `${tag} `;

          mentions.push({
            tag: tag,
            id: userID
          });
        }

        body +=
`\n\n😂 এবার কেউ চিপায় লুকাইয়া থাকবা না!`;

        return api.sendMessage(
          {
            body: body,
            mentions: mentions
          },
          event.threadID,
          event.messageID
        );

      } catch (error) {

        console.error(
          "Mention Everyone Error:",
          error
        );

        return message.reply(
          "❌ | গ্রুপের সবাইকে mention করতে সমস্যা হয়েছে।"
        );
      }
    }

    // ==========================================
    // ❓ INVALID SUB-COMMAND
    // ==========================================

    return message.reply(
`╭━━━━━━━━━━━━━━━━━━╮
       🤖 𝐁𝐀𝐁 𝐂𝐌𝐃
╰━━━━━━━━━━━━━━━━━━╯

💃 bab নাচো
➜ নাচের ছবি পাঠাবে।

📢 bab mention everyone
➜ গ্রুপের সবাইকে mention করবে।

📢 bab গ্রুপের সবাইরে চিপা থেকে বের হতে বল
➜ সবাইকে একসাথে mention করবে।

━━━━━━━━━━━━━━━━━━━━
🔥 Try one of the commands!
━━━━━━━━━━━━━━━━━━━━`
    );
  }
};
