const axios = require("axios");
const cheerio = require("cheerio");

async function getCaptions() {
  const links = [
    "https://biostatusbd.com/facebook-bio-status-bangla-attitude-bio/",
    "https://biostatusbd.com/unique-caption-bangla/",
    "https://banglastatus.blog/stylish-facebook-caption/",
    "https://biocaption.com/%E0%A6%AB%E0%A7%87%E0%A6%B8%E0%A6%AC%E0%A7%81%E0%A6%95-%E0%A6%95%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%AA%E0%A6%B6%E0%A6%A8-%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE/"
  ];

  let allCaptions = [];

  for (const url of links) {
    try {
      const res = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
        },
        timeout: 10000
      });

      const $ = cheerio.load(res.data);

      $("p, li").each((i, el) => {
        const text = $(el).text().trim();

        if (
          text.length > 20 &&
          text.length < 200 &&
          !text.includes("http") &&
          !text.includes("Bio") &&
          !text.includes("caption")
        ) {
          allCaptions.push(text);
        }
      });
    } catch (err) {
      console.log("Error fetching:", url);
    }
  }

  return allCaptions;
}

module.exports = {
  config: {
    name: "cp",
    version: "2.0",
    author: "Hasan",
    countDown: 5,
    role: 0,
    category: "fun",
    shortDescription: "Random caption",
    longDescription: "Fetch stylish captions from websites",
  },

  onStart: async function ({ message }) {
    const captions = await getCaptions();

    if (!captions || captions.length === 0) {
      return message.reply("❌ Caption আনতে পারিনি!");
    }

    const random =
      captions[Math.floor(Math.random() * captions.length)];

    const finalMsg = `
╭━━━〔 ✨ 𝗖𝗔𝗣𝗧𝗜𝗢𝗡 ✨ 〕━━━╮

${random}

╰━━━〔 💫 𝗕𝘆 𝗛𝗮𝘀𝗮𝗻 💫 〕━━━╯
`;

    message.reply(finalMsg);
  }
};
