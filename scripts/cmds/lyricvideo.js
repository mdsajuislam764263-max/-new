const axios = require("axios");
const { getStreamFromURL, shortenURL } = global.utils;

async function fetchTikTokVideos(query) {
  try {
    const response = await axios.get(`https://lyric-search-neon.vercel.app/kshitiz?keyword=${query}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  config: {
    name: "lyricvideo",
    aliases: ["lv"],
    author: "Vex_kshitiz + Nazim Edit",
    version: "2.0",
    shortDescription: {
      en: "Play lyric video",
    },
    longDescription: {
      en: "Search and send lyric video from TikTok",
    },
    category: "media",
    guide: {
      en: "{p}{n} [song name] or reply audio/video",
    },
  },

  onStart: async function ({ api, event, args, message }) {

    // 🔥 Reaction Loading
    api.setMessageReaction("⏳", event.messageID, () => {}, true);

    // 💖 Stylish Waiting Message
    const waitingMsg = await message.reply(
      "૮ ˶ᵔ ᵕ ᵔ˶ ა 𝑩𝒂𝒃𝒚 𝒊𝒔 𝒇𝒊𝒏𝒅𝒊𝒏𝒈 𝒚𝒐𝒖𝒓 𝒗𝒊𝒅𝒆𝒐..."
    );

    try {
      let query = '';

      // 🎵 If reply audio/video
      if (event.messageReply && event.messageReply.attachments.length > 0) {
        const attachment = event.messageReply.attachments[0];

        if (attachment.type === "video" || attachment.type === "audio") {
          const url = attachment.url;

          const musicRecognitionResponse = await axios.get(
            `https://audio-reco.onrender.com/kshitiz?url=${encodeURIComponent(url)}`
          );

          query = musicRecognitionResponse.data.title;
        } else {
          return message.reply("❌ | Reply only audio or video.");
        }

      } else if (args.length > 0) {
        query = args.join(" ");
      } else {
        return message.reply("⚠️ | Enter song name or reply audio/video.");
      }

      query += " lyricsvideoedit";

      const videos = await fetchTikTokVideos(query);

      if (!videos || videos.length === 0) {
        await api.unsendMessage(waitingMsg.messageID);
        return message.reply("❌ | Video not found.");
      }

      const randomVideo = videos[Math.floor(Math.random() * videos.length)];
      const videoUrl = randomVideo.videoUrl;

      if (!videoUrl) {
        await api.unsendMessage(waitingMsg.messageID);
        return message.reply("❌ | Video URL missing.");
      }

      const videoStream = await getStreamFromURL(videoUrl);

      // 🧹 Remove waiting message
      await api.unsendMessage(waitingMsg.messageID);

      // 📤 Send video
      await api.sendMessage({
        body: "💖 𝑯𝒆𝒓𝒆 𝒊𝒔 𝒚𝒐𝒖𝒓 𝑳𝒚𝒓𝒊𝒄 𝑽𝒊𝒅𝒆𝒐...",
        attachment: videoStream
      }, event.threadID, event.messageID);

      // ✅ Done Reaction
      api.setMessageReaction("✅", event.messageID, () => {}, true);

    } catch (error) {
      console.error(error);

      await api.unsendMessage(waitingMsg.messageID);

      message.reply("❌ | Error while processing video.");
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  },
};
