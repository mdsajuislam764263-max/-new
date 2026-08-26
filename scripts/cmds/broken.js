/cmd install bk.js   
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

if (!global.brokenMemory) global.brokenMemory = new Set();

module.exports = {
  config: {
    name: "broken",
    aliases: ["bk", "sad", "lofi", "nafrat", "sorbonash", "shayar"],
    version: "2.6.0",
    author: "Mr.King",
    countDown: 8,
    role: 0,
    shortDescription: { en: "𝐆𝐞𝐭 𝐫𝐚𝐧𝐝𝐨𝐦 𝐛𝐫𝐨𝐤𝐞𝐧, 𝐬𝐚𝐝, 𝐚𝐧𝐝 𝐥𝐲𝐫𝐢𝐜𝐬 𝐯𝐢𝐝𝐞𝐨𝐬" },
    category: "media",
    guide: {
      en: "𝐔𝐬𝐞 {pn} 𝐨𝐫 {pn} 𝐛𝐤 𝐭𝐨 𝐟𝐞𝐞𝐥 𝐭𝐡𝐞 𝐯𝐢𝐛𝐞 💔"
    }
  },

  onStart: async function ({ api, event, message, usersData }) {
    return this.handleBroken({ api, event, message, usersData });
  },

  onChat: async function ({ api, event, message, usersData }) {
    const trigger = ["broken", "bk", "sad", "ব্যথা", "কষ্ট"];
    if (event.body && trigger.includes(event.body.toLowerCase())) {
        return this.handleBroken({ api, event, message, usersData });
    }
  },

  handleBroken: async function ({ api, event, message, usersData }) {
    const name = await usersData.getName(event.senderID);
    const loadingText = "🔥 | Chill Up『 ᴀᴅᴅᴀ ᴠᴏʀᴘᴜʀ 』☁️🫧 ";
    const info = await message.reply(loadingText);

    const cacheDir = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
    const pathVideo = path.join(cacheDir, `broken_${Date.now()}.mp4`);

    api.setMessageReaction("😅", event.messageID, () => {}, true);
    setTimeout(() => { api.unsendMessage(info.messageID); }, 5000);

    try {
      const brokenTags = [
        "anime broken heart edit 4k", "sad shayari status video", "broken heart status bangla",
        "sad lofi song edit", "sad lyrics status", "nafrat status video", "sorbonash song status",
        "alone boy sad status", "feeling broken status", "হৃদয় ভাঙা স্ট্যাটাস"
      ];

      const brokenCaptions = [
        "\"মাঝে মাঝে নিজেকে খুব একা মনে হয়, যেন এই পৃথিবীতে আমার কেউ নেই।\"",
        "\"স্বপ্নগুলো আজ কাঁচের মতো ভেঙে চুরমার হয়ে গেছে।\"",
        "\"ভালোবাসা মানেই কি শুধু অবহেলা আর চোখের জল?\"",
        "\"কিছু ক্ষত কখনো শুকায় না, শুধু সহ্য করার ক্ষমতা বেড়ে যায়।\"",
        "\"অপেক্ষাটা শুধু তোমার জন্য ছিল, কিন্তু তুমি তা বুঝলে না।\"",
        "\"হৃদয় ভাঙার শব্দ কেউ শুনতে পায় না, শুধু চোখের জল তা বলে দেয়।\"",
        "\"মায়া ত্যাগ করা শিখুন, কারণ মায়া মানুষকে অনেক কাঁদায়।\"",
        "\"খুব ইচ্ছে ছিল তোমার সাথে সারাজীবন থাকার, কিন্তু ভাগ্য সায় দিল না।\"",
        "\"আমি হাসতে জানি, কিন্তু তার মানে এই নয় যে আমি শান্তিতে আছি।\"",
        "\"আজকাল একা থাকতেই বেশি ভালো লাগে, কেউ অন্তত মিথ্যে আশা দেয় না।\"",
        "\"স্মৃতিগুলো আজও পিছু ছাড়ে না, শুধু মানুষগুলো হারিয়ে যায়।\"",
        "\"তোর অবহেলা আমায় শিখিয়েছে যে, কারো জন্য পাগল হওয়া ভুল।\"",
        "\"বুকের ভেতরটা কুঁকড়ে যায় যখন তোর দেওয়া মেসেজগুলো পড়ি।\"",
        "\"হয়তো আমি তোমার যোগ্য ছিলাম না, তাই তুমি অন্য কাউকে বেছে নিলে।\"",
        "\"মানুষ মরে গেলে পচে যায়, আর বেঁচে থাকলে বদলে যায়।\"",
        "\"সবাই বলে ভুলে যেতে, কিন্তু কেউ বলে না কিভাবে ভুলবো।\"",
        "\"ভালোবাসাটা শুধু আমার একারই ছিল, তোর কাছে ছিল সময় কাটানো।\"",
        "\"ভালো থেকো অন্যের সাথে, আমি না হয় বেঁচে থাকবো তোর স্মৃতি নিয়ে।\"",
        "\"অতিরিক্ত বিশ্বাস আর অতিরিক্ত ভালোবাসা মানুষকে ধ্বংস করে দেয়।\"",
        "\"চুপ থাকতে থাকতে এখন কথা বলতেই ভুলে গেছি।\"",
        "\"মাঝরাতে কান্নার শব্দটা বালিশ ছাড়া আর কেউ জানে না।\"",
        "\"তোর দেওয়া বিষাদে আমি এখন নীল হয়ে গেছি।\"",
        "\"খুব ভিড়ের মাঝেও নিজেকে বড্ড একা মনে হয়।\"",
        "\"মরে যাওয়ার জন্য বিষ লাগে না, অবহেলাই যথেষ্ট।\"",
        "\"আমি হারিয়ে গেছি তোর জীবনের অপ্রয়োজনীয় গল্পের ভিড়ে।\"",
        "\"তোর সাথে কাটানো মুহূর্তগুলো আজ আমার বিষাক্ত স্মৃতি।\"",
        "\"শহরের সব আলো জ্বলে উঠলে আমার অন্ধকারটা আরও বেড়ে যায়।\"",
        "\"কষ্টগুলো যখন পাহাড় সমান হয়, তখন চোখের জলও শুকিয়ে যায়।\"",
        "\"বড্ড অসময়ে বুঝেছি, তুই আমার ছিলি না কখনো।\"",
        "\"হাসির আড়ালে লুকানো কষ্টগুলো বোঝার মতো কেউ নেই।\"",
        "\"আমার নীরবতাই বলে দেয় আমি কতটা ভেঙে চুরমার হয়ে গেছি।\"",
        "\"যাকে সবচেয়ে বেশি গুরুত্ব দিয়েছি, সে-ই আমায় সবচেয়ে বেশি অবহেলা করেছে।\"",
        "\"এক আকাশ কষ্টের মাঝে আমি শুধু একটু সুখ চেয়েছিলাম।\"",
        "\"তোর শহরের ভিড়ে আমি আজ এক অচেনা পথিক।\"",
        "\"ভালোবাসা বদলায় না, বদলে যায় মানুষগুলো।\"",
        "\"জীবনটা এখন শুধু টিকে থাকার লড়াই, বেঁচে থাকার নয়।\"",
        "\"অতীতের পাতাগুলো উল্টাতে ভয় লাগে, বড্ড বেশি কান্না পায়।\"",
        "\"তোমাকে ছাড়া কাটানো প্রতিটি রাত যেন এক একটা অনন্তকাল।\"",
        "\"অল্পতেই বিশ্বাস করাটা আমার জীবনের সবচেয়ে বড় ভুল ছিল।\"",
        "\"ভালো থাকিস প্রিয়, তোকে হারানোর যন্ত্রণা নিয়েই আমি বেঁচে থাকবো।\"",
        "\"কিছু কথা বলা যায় না, শুধু দীর্ঘশ্বাসে অনুভব করা যায়।\"",
        "\"তোর দেওয়া যন্ত্রণায় আমি আজ পাথর হয়ে গেছি।\"",
        "\"শূণ্যতাগুলো এখন আমার নিত্যদিনের সঙ্গী।\"",
        "\"ভুলটা আমারই ছিল, তোর মতো মানুষকে মন দিয়েছিলাম।\"",
        "\"বিচ্ছেদের পর বন্ধুত্ব রাখাটা পৃথিবীর সবচেয়ে কঠিন কাজ।\"",
        "\"তোর অবহেলা আজ আমার জেদে পরিণত হয়েছে।\"",
        "\"একলা চলায় এখন প্রশান্তি পাই, কেউ তো আর ধোঁকা দেবে না।\"",
        "\"বুকের বাম পাশটা বড্ড বেশি পুড়ছে আজ।\"",
        "\"তোর গল্পের ইতি হয়তো হয়েছে, কিন্তু আমার কষ্টের শুরু।\"",
        "\"নাফরাত করি ওই দিনটাকে, যেদিন তোর সাথে পরিচয় হয়েছিল।\"",
        "\"সর্বনাশ তো তখনই হয়েছে, যখন তোকে জীবন মনে করেছিলাম।\""
      ];
      
      const randomTag = brokenTags[Math.floor(Math.random() * brokenTags.length)];
      const randomQuote = brokenCaptions[Math.floor(Math.random() * brokenCaptions.length)];

      const res = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(randomTag)}`);
      const videos = res.data?.data?.videos;

      if (!videos || videos.length === 0) throw new Error("No videos found.");

      let selected = videos.sort(() => 0.5 - Math.random()).find(v => !global.brokenMemory.has(v.video_id)) || videos[0];
      global.brokenMemory.add(selected.video_id);

      const videoUrl = selected.play || selected.hdplay;
      const response = await axios({ method: 'get', url: videoUrl, responseType: 'stream' });

      const writer = fs.createWriteStream(pathVideo);
      response.data.pipe(writer);

      writer.on('finish', () => {
        return message.reply({
          body: `💔 | 𝐒𝐀𝐃 𝐕𝐈𝐁𝐄𝐒, ${name.toUpperCase()}\n━━━━━━━━━━━━━━━━━━\n${randomQuote}\n━━━━━━━━━━━━━━━━━━\n👑 𝐁𝐎𝐒𝐒: 𝐑 𝐎 𝐍 𝐈\n\n"𝐈 𝐡𝐨𝐩𝐞 𝐲𝐨𝐮𝐫 𝐡𝐞𝐚𝐫𝐭 𝐟𝐢𝐧𝐝𝐬 𝐩𝐞𝐚𝐜𝐞 𝐬𝐨𝐨𝐧"`,
          attachment: fs.createReadStream(pathVideo)
        }, () => {
          if (fs.existsSync(pathVideo)) fs.unlinkSync(pathVideo);
        });
      });

    } catch (err) {
      console.error(err);
      return message.reply("⚠️ | 𝐒𝐞𝐫𝐯𝐞𝐫 𝐢𝐬 𝐛𝐮𝐬𝐲 𝐛𝐚𝐛𝐲, 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧!");
    }
  }
};
