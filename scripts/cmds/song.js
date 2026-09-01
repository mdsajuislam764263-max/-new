const axios = require("axios");
const fs = require("fs");
const path = require("path");

const baseApiUrl = async () => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json"
  );

  if (!response.data || !response.data.api) {
    throw new Error("API URL not found");
  }

  return response.data.api;
};

module.exports = {
  config: {
    name: "song",
    version: "2.2.0",
    aliases: ["music", "play"],
    credits: "dipto",
    countDown: 5,
    hasPermssion: 0,
    description: "Download audio from YouTube",
    category: "media",
    commandCategory: "media",
    usePrefix: true,
    prefix: true,
    usages:
      "{pn} [song name | song link]\n\n" +
      "Example:\n" +
      "{pn} chipi chipi chapa chapa"
  },

  run: async function ({ api, args, event }) {
    const { threadID, messageID, senderID } = event;

    if (!args || args.length === 0) {
      return api.sendMessage(
        `❌ Please enter a song name or YouTube link.\n\nExample:\n${global.GoatBot?.config?.prefix || "."}song chipi chipi chapa chapa`,
        threadID,
        messageID
      );
    }

    const input = args.join(" ").trim();

    const checkurl =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/i;

    const urlYtb = checkurl.test(args[0]);

    // Direct YouTube URL
    if (urlYtb) {
      try {
        const match = args[0].match(checkurl);
        const videoID = match ? match[1] : null;

        if (!videoID) {
          return api.sendMessage(
            "❌ Invalid YouTube link.",
            threadID,
            messageID
          );
        }

        const base = await baseApiUrl();

        const response = await axios.get(
          `${base}/ytDl3?link=${encodeURIComponent(videoID)}&format=mp3`
        );

        const data = response.data || {};

        if (!data.downloadLink) {
          throw new Error("Download link not found");
        }

        const title = data.title || "Downloaded Song";

        const fileName = `song_${senderID}_${Date.now()}.mp3`;
        const filePath = path.join(__dirname, fileName);

        await downloadFile(data.downloadLink, filePath);

        return api.sendMessage(
          {
            body:
              `🎵 ${title}\n\n` +
              `• 𝐀𝐝𝐦𝐢𝐧: 𝐒𝐚𝐣𝐮 𝐈𝐬𝐥𝐚𝐦`,
            attachment: fs.createReadStream(filePath)
          },
          threadID,
          () => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          },
          messageID
        );

      } catch (error) {
        console.error("Song URL Error:", error);

        return api.sendMessage(
          "❌ গান ডাউনলোড করতে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
          threadID,
          messageID
        );
      }
    }

    // Search YouTube
    try {
      const base = await baseApiUrl();

      const searchResponse = await axios.get(
        `${base}/ytFullSearch?songName=${encodeURIComponent(input)}`
      );

      const result = Array.isArray(searchResponse.data)
        ? searchResponse.data.slice(0, 6)
        : [];

      if (result.length === 0) {
        return api.sendMessage(
          `⭕ "${input}" নামে কোনো গান পাওয়া যায়নি।`,
          threadID,
          messageID
        );
      }

      let msg = "";
      const thumbnails = [];

      for (let i = 0; i < result.length; i++) {
        const info = result[i];

        if (info.thumbnail) {
          thumbnails.push(
            downloadImage(info.thumbnail, `thumbnail_${senderID}_${i}.jpg`)
          );
        }

        msg +=
          `${i + 1}. ${info.title || "Unknown"}\n` +
          `Time: ${info.time || "Unknown"}\n` +
          `Channel: ${info.channel?.name || "Unknown"}\n\n`;
      }

      msg += "🔢 Reply to this message with a number to download the song.";

      api.sendMessage(
        {
          body: msg,
          attachment: await Promise.all(thumbnails)
        },
        threadID,
        (err, info) => {
          if (err) {
            console.error("Search Message Error:", err);
            return;
          }

          if (!global.client.handleReply) {
            global.client.handleReply = [];
          }

          global.client.handleReply.push({
            name: "song",
            messageID: info.messageID,
            author: senderID,
            result
          });
        },
        messageID
      );

    } catch (error) {
      console.error("Song Search Error:", error);

      return api.sendMessage(
        `❌ Search error: ${error.message}`,
        threadID,
        messageID
      );
    }
  },

  handleReply: async function ({ event, api, handleReply }) {
    const { threadID, messageID, senderID, body } = event;

    if (senderID !== handleReply.author) {
      return;
    }

    const result = handleReply.result || [];
    const choice = parseInt(String(body).trim());

    if (
      isNaN(choice) ||
      choice < 1 ||
      choice > result.length
    ) {
      return api.sendMessage(
        `❌ Invalid choice. Please reply with a number between 1 and ${result.length}.`,
        threadID,
        messageID
      );
    }

    const selected = result[choice - 1];

    if (!selected || !selected.id) {
      return api.sendMessage(
        "❌ This song could not be found.",
        threadID,
        messageID
      );
    }

    const videoID = selected.id;

    try {
      await api.unsendMessage(handleReply.messageID);
    } catch (error) {
      console.log("Unsend failed:", error.message);
    }

    try {
      const base = await baseApiUrl();

      const response = await axios.get(
        `${base}/ytDl3?link=${encodeURIComponent(videoID)}&format=mp3`
      );

      const data = response.data || {};

      if (!data.downloadLink) {
        throw new Error("Download link not found");
      }

      const title = data.title || selected.title || "Downloaded Song";
      const quality = data.quality || "Audio";

      const fileName = `song_${senderID}_${Date.now()}.mp3`;
      const filePath = path.join(__dirname, fileName);

      await downloadFile(data.downloadLink, filePath);

      await api.sendMessage(
        {
          body:
            `🎵 𝐓𝐢𝐭𝐥𝐞: ${title}\n` +
            `🎧 𝐐𝐮𝐚𝐥𝐢𝐭𝐲: ${quality}\n\n` +
            `• 𝐀𝐝𝐦𝐢𝐧: 𝐒𝐚𝐣𝐮 𝐈𝐬𝐥𝐚𝐦`,
          attachment: fs.createReadStream(filePath)
        },
        threadID,
        () => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        },
        messageID
      );

    } catch (error) {
      console.error("Song Download Error:", error);

      return api.sendMessage(
        "⭕ Sorry, গানটি ডাউনলোড করা যায়নি অথবা ফাইলের সাইজ অনেক বড়।",
        threadID,
        messageID
      );
    }
  }
};


// Download audio file
async function downloadFile(url, filePath) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 120000,
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  });

  fs.writeFileSync(filePath, Buffer.from(response.data));
}


// Download thumbnail
async function downloadImage(url, fileName) {
  const response = await axios.get(url, {
    responseType: "stream",
    timeout: 30000
  });

  response.data.path = fileName;
  return response.data;
}
