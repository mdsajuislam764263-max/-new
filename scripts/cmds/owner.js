const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "1.3.0",
    author: "Mᴏʜᴀᴍᴍᴀᴅ Aᴋᴀsʜ",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`»̶̶͓͓͓̽̽̽⑅⃝𝔰𝔞𝔧𝔲⋆⃝🔻👿⑅⃝😸🪽❥»̶̶͓͓͓̽̽̽
╭────[ ╭━━━━━━━━━━━━━━━━━━━━╮
✨ 𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋 𝐈𝐍𝐅𝐎 𝐅𝐎𝐑𝐌 ✨
╰━━━━━━━━━━━━━━━━━━━━╯

❶ 𝐏𝐮𝐫𝐞 𝐍𝐚𝐦𝐞 : bad'boy 🙂
❷ 𝐍𝐢𝐜𝐤 𝐍𝐚𝐦𝐞 : Saju / S A J U
❸ 𝐀𝐠𝐞 : আন্দাজ করে নিন, ভুল হলে দোষ আপনার 🐱
❹ 𝐆𝐞𝐧𝐝𝐞𝐫 : Male 🗿
❺ 𝐃𝐚𝐭𝐞 𝐎𝐟 𝐁𝐢𝐫𝐭𝐡 : গোপন ফাইল 📂
❻ 𝐁𝐥𝐨𝐨𝐝 𝐆𝐫𝐨𝐮𝐩 : জরুরি হলে আগে চা খাওয়ান ☕
❼ 𝐂𝐨𝐮𝐧𝐭𝐫𝐲 : বাংলাদেশ 🇧🇩
❽ 𝐃𝐢𝐯𝐢𝐬𝐢𝐨𝐧 : ঢাকা
❾ 𝐃𝐢𝐬𝐭𝐫𝐢𝐜𝐭 : বললে বাসায় চলে আসবেন নাকি? 🫡
❿ 𝐓𝐡𝐚𝐧𝐚 / 𝐔𝐩𝐚𝐳𝐢𝐥𝐚 : পরে জানানো হবে 📍
⓫ 𝐕𝐢𝐥𝐥𝐚𝐠𝐞 / 𝐀𝐫𝐞𝐚 : GPS-এও সব সময় ধরা যায় না 😌
⓬ 𝐎𝐜𝐜𝐮𝐩𝐚𝐭𝐢𝐨𝐧 : ঘুমানো 😴
⓭ 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : পড়াশোনা জানি না 🐱
⓮ 𝐌𝐚𝐫𝐢𝐭𝐚𝐥 𝐒𝐭𝐚𝐭𝐮𝐬 : person not allow 🚫 
⓯ 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐈𝐃 : ইনবক্সে আবেদন গ্রহণযোগ্য 📩
⓰ 𝐌𝐞𝐬𝐬𝐞𝐧𝐠𝐞𝐫 𝐍𝐚𝐦𝐞 : নিজে.দেখেন 😒
⓱ 𝐌𝐨𝐛𝐢𝐥𝐞 𝐍𝐮𝐦𝐛𝐞𝐫 : মনে নাই 🙂
⓲ 𝐇𝐨𝐛𝐛𝐢𝐞𝐬 : গান শোনা'গেম খেলা'ঘুমানো 🙂
⓳ 𝐅𝐚𝐯𝐨𝐫𝐢𝐭𝐞 𝐂𝐨𝐥𝐨𝐫 : Black 🖤
⓴ 𝐅𝐚𝐯𝐨𝐫𝐢𝐭𝐞 𝐅𝐨𝐨𝐝 : যা ফ্রি, তাই প্রিয় 🍗
㉑ 𝐅𝐚𝐯𝐨𝐫𝐢𝐭𝐞 𝐒𝐨𝐧𝐠 : মুডের উপর নির্ভর করে 🎧
㉒ 𝐅𝐚𝐯𝐨𝐫𝐢𝐭𝐞 𝐒𝐢𝐧𝐠𝐞𝐫 : Arijit Singh 🎤❤️
㉓ 𝐅𝐚𝐯𝐨𝐫𝐢𝐭𝐞 𝐒𝐩𝐨𝐫𝐭 : ক্রিকেট 🏏
㉔ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 𝐒𝐭𝐚𝐭𝐮𝐬 : মনে 'করে বলমু পরে 🙂
㉕ 𝐘𝐨𝐚𝐫 𝐆𝐨𝐚𝐥 / 𝐃𝐫𝐞𝐚𝐦 : 🐱🥲
㉖ 𝐒𝐡𝐨𝐫𝐭 𝐀𝐛𝐨𝐮𝐭 𝐘𝐨𝐮𝐫𝐬𝐞𝐥𝐟 : I'm bad'boy 🙂😌🔥

━━━━━━━━━━━━━━━━━━━━
🌸 𝐓𝐡𝐚𝐧𝐤 𝐘𝐨𝐮 🌸
━━━━━━━━━━━━━━━━━━━━`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.imgur.com/cq8EAHB.jpeg";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send);
  }
};
