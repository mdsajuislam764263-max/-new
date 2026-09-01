const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
    config: {
        name: "emojivoice",
        version: "1.0.2",
        author: "SHAHADAT SAHU",
        countDown: 0,
        role: 0,
        shortDescription: {
            en: "Emoji voice"
        },
        longDescription: {
            en: "Send a voice when specific emojis are sent"
        },
        category: "noprefix",
        guide: {
            en: "Send an emoji"
        }
    },

    langs: {
        en: {
            error: "ইমুজি দিয়ে লাভ নাই\nযাও মুড়ি খাও জান😘"
        }
    },

    onStart: async function () {},

    onChat: async function ({ api, event }) {
        const { threadID, messageID, body } = event;

        if (!body) return;

        const emoji = body.trim();

        const emojiAudioMap = {
            "🥱": "https://files.catbox.moe/9pou40.mp3",
            "😁": "https://files.catbox.moe/60cwcg.mp3",
            "😌": "https://files.catbox.moe/epqwbx.mp3",
            "🥺": "https://files.catbox.moe/wc17iq.mp3",
            "🤭": "https://files.catbox.moe/cu0mpy.mp3",
            "😅": "https://files.catbox.moe/jl3pzb.mp3",
            "😏": "https://files.catbox.moe/z9e52r.mp3",
            "😞": "https://files.catbox.moe/tdimtx.mp3",
            "🤫": "https://files.catbox.moe/0uii99.mp3",
            "🍼": "https://files.catbox.moe/p6ht91.mp3",
            "🤔": "https://files.catbox.moe/hy6m6w.mp3",
            "🥰": "https://files.catbox.moe/dv9why.mp3",
            "🤦": "https://files.catbox.moe/ivlvoq.mp3",
            "😘": "https://files.catbox.moe/sbws0w.mp3",
            "😑": "https://files.catbox.moe/p78xfw.mp3",
            "😢": "https://files.catbox.moe/shxwj1.mp3",
            "🙊": "https://files.catbox.moe/3bejxv.mp3",
            "🤨": "https://files.catbox.moe/4aci0r.mp3",
            "😡": "https://files.catbox.moe/shxwj1.mp3",
            "🙈": "https://files.catbox.moe/3qc90y.mp3",
            "😍": "https://files.catbox.moe/qjfk1b.mp3",
            "😭": "https://files.catbox.moe/itm4g0.mp3",
            "😱": "https://files.catbox.moe/mu0kka.mp3",
            "😻": "https://files.catbox.moe/y8ul2j.mp3",
            "😿": "https://files.catbox.moe/tqxemm.mp3",
            "💔": "https://files.catbox.moe/6yanv3.mp3",
            "🤣": "https://files.catbox.moe/2sweut.mp3",
            "🥹": "https://files.catbox.moe/jf85xe.mp3",
            "😩": "https://files.catbox.moe/b4m5aj.mp3",
            "🫣": "https://files.catbox.moe/ttb6hi.mp3",
            "🐸": "https://files.catbox.moe/utl83s.mp3"
        };

        const audioUrl = emojiAudioMap[emoji];

        if (!audioUrl) return;

        const cacheDir = path.join(__dirname, "cache");
        const fileName =
            `voice_${Date.now()}_${Math.random()
                .toString(36)
                .substring(2, 8)}.mp3`;

        const filePath = path.join(cacheDir, fileName);

        try {
            await fs.promises.mkdir(cacheDir, {
                recursive: true
            });

            const response = await axios.get(audioUrl, {
                responseType: "arraybuffer",
                timeout: 30000
            });

            await fs.promises.writeFile(
                filePath,
                Buffer.from(response.data)
            );

            await new Promise((resolve, reject) => {
                api.sendMessage(
                    {
                        attachment: fs.createReadStream(filePath)
                    },
                    threadID,
                    err => {
                        if (err) reject(err);
                        else resolve();
                    },
                    messageID
                );
            });

            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }

        } catch (error) {
            console.error("Voice Error:", error);

            try {
                if (fs.existsSync(filePath)) {
                    await fs.promises.unlink(filePath);
                }
            } catch {}

            api.sendMessage(
                "ইমুজি দিয়ে লাভ নাই\nযাও মুড়ি খাও জান😘",
                threadID,
                messageID
            );
        }
    }
};
