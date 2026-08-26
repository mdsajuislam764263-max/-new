module.exports = {
  config: {
    name: "busyy",
    aliases: ["busy", "বস", "বসি"],
    version: "3.0",
    author: "SAJU",
    countDown: 3,
    role: 0,

    shortDescription: {
      en: "Send a boss message",
      bn: "বসের মেসেজ পাঠাবে"
    },

    longDescription: {
      en: "Mention someone or reply to their message to send a boss message.",
      bn: "কাউকে মেনশন অথবা তার মেসেজে রিপ্লাই করে বসের মেসেজ পাঠাবে।"
    },

    category: "fun",

    guide: {
      en: "{pn} @mention OR reply to a message",
      bn: "{pn} @mention অথবা কোনো মেসেজে reply করে ব্যবহার করুন"
    }
  },

  onStart: async function ({ api, event, message }) {
    let targetID = null;
    let targetName = "বন্ধু";

    // ━━━━━━━━━━━━━━━━━━━━━
    // 👤 Mention থেকে Target ID
    // ━━━━━━━━━━━━━━━━━━━━━
    if (
      event.mentions &&
      Object.keys(event.mentions).length > 0
    ) {
      targetID = Object.keys(event.mentions)[0];
    }

    // ━━━━━━━━━━━━━━━━━━━━━
    // ↩️ Reply থেকে Target ID
    // ━━━━━━━━━━━━━━━━━━━━━
    if (
      !targetID &&
      event.messageReply &&
      event.messageReply.senderID
    ) {
      targetID = event.messageReply.senderID;
    }

    // ━━━━━━━━━━━━━━━━━━━━━
    // ❌ Target পাওয়া না গেলে
    // ━━━━━━━━━━━━━━━━━━━━━
    if (!targetID) {
      return message.reply(
        "⚠️ | যাকে মেসেজ দিতে চাও তাকে @mention করো অথবা তার মেসেজে reply করে `.busyy` দাও!"
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━
    // 👤 Facebook থেকে নাম নেওয়া
    // ━━━━━━━━━━━━━━━━━━━━━
    try {
      const userInfo = await api.getUserInfo(targetID);

      if (
        userInfo &&
        userInfo[targetID] &&
        userInfo[targetID].name
      ) {
        targetName = userInfo[targetID].name;
      }
    } catch (error) {
      console.log(
        "Unable to get user name:",
        error.message
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━
    // 👑 Boss Message
    // ━━━━━━━━━━━━━━━━━━━━━
    const body = `╭━━━━━━━━━━━━━━━━━━╮
      👑 𝐁𝐎𝐒𝐒 𝐌𝐄𝐒𝐒𝐀𝐆𝐄
╰━━━━━━━━━━━━━━━━━━╯

👤 ${targetName},

একটি গুরুত্বপূর্ণ কথা জানাতে বলা হয়েছে। 🙂

আমাদের বস বর্তমানে আপনার সাথে কথা বলতে চান না। তাই আপাতত তাকে মেসেজ না করাই ভালো। 😶‍🌫️

📢 বসের পক্ষ থেকে জানানো হচ্ছে—

❝ ${targetName}, আপনার সাথে আমার বস কথা বলতে চান না। ❞

তাই বিষয়টি দয়া করে সম্মানের সাথে নিন
এবং আপাতত একটু দূরত্ব বজায় রাখুন। 🫡

╭━━━━━━━━━━━━━━━━━━╮
   👑 𝐁𝐎𝐒𝐒 𝐎𝐑𝐃𝐄𝐑
   🤖 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 𝐃𝐄𝐋𝐈𝐕𝐄𝐑𝐄𝐃
╰━━━━━━━━━━━━━━━━━━╯`;

    // ━━━━━━━━━━━━━━━━━━━━━
    // 📤 Message + Mention
    // ━━━━━━━━━━━━━━━━━━━━━
    return api.sendMessage(
      {
        body: body,
        mentions: [
          {
            tag: `@${targetName}`,
            id: targetID
          }
        ]
      },
      event.threadID,
      event.messageID
    );
  }
};
