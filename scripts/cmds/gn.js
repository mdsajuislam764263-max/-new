module.exports.config = {
    name: "gn",
    version: "7.0.0",
    credits: "Saju",
    hasPermssion: 0,
    description: "Stylish GC Name Selector",
    usages: "gn",
    commandCategory: "fun",
    cooldowns: 0
};

const NAMES = [
    "স্ঁ⃝̽❥»̶̶͓͓͓̽̽̽স্ব্ঁপ্ন্ঁ⃝̽❥»̶͓͓̽̽ছোঁ্ঁয়া্ঁ⃝̽❥»̶͓͓̽̽আ্ঁড্ঁ্ডা্ঁ⃝̽❥»̶͓͓̽̽ব্ঁক্স্ঁ»̶̶͓͓͓̽̽̽💞🙂🔥💖",

    "꧁༺🦋༻꧂ 𝒀𝑨𝑺𝑯𝑰 ꧁༺🌹༻꧂",
    "◀︎━🦋⃝⃪ 𝑺𝑼𝑱𝑨𝑵〆🔥⃝⃪△",
    "°｡⋆♡°｡ 𝑩𝑬𝑩𝑶 ♡⃝🦋⃝°｡⋆",
    "🦋⃝△ 𝑪𝑨𝑵𝑫𝒀 «◉➳🎼",
    "◀︎━ˣ³ 🔥 𝑷𝒆𝒓𝒇𝒆𝒄𝒕, 𝑻𝒉𝒂𝒓𝒌𝒊 ༺🍷༻",
    "○━• 𝑽𝑨𝑵𝑺𝑯𝑰𝑲𝑨 ༺♡༻ ━○",
    "☞ ᴼᴹ ⋆｡°✩ 𝑲𝑰𝑻𝑻𝒀 ❥💜༺🌹༻",
    "◀︎━🦋⃝ 𝑻𝑶𝑿𝑰𝑪 𝑮𝑰𝑹𝑳 ༺△༻",
    "♡⃝ 𝑻𝑬𝑬𝑲𝑯𝑰 💠⃝ 𝑰𝑹𝑪𝑯𝑰 😈🌶️",
    "○━• 𝑺𝑬𝑳𝑭𝑰𝑺𝑯 ༺♡༻ ━○",
    "༺🌹༻ 𝑭𝒂𝒊𝒓𝒚 𝑫𝒂𝒊𝒓𝒚 𝑴𝒊𝒍𝒌? 💎⃝🌹༻♡",
    "𓆩🦋𓆪 𝑭𝑹𝑰𝑬𝑵𝑫𝑺 𝒁𝑶𝑵𝑬 𓆩🍒💗𓆪",
    "❥⃝ 𝑵𝑨𝑾𝑨𝑩 : 𝑾𝑬𝑳𝑪𝑶𝑴𝑬 👑",
    "꧁༺🌹 𝑨𝑬𝑺𝑻𝑯𝑬𝑻𝑰𝑪 𝒁𝑨𝑹𝑨 🌹༻꧂",
    "𓆩♡𓆪 𝑫𝑶𝑵'𝑻 𝑩𝑬𝑳𝑰𝑬𝑽𝑬 𝑨𝑵𝒀𝑶𝑵𝑬 🧸༻♡",
    "༺🎀༻ 𝑶𝑪𝑪𝑼𝑷𝑨𝑻𝑰𝑶𝑵 𝟏 🐈 ༺🎀༻",
    "◈⃝ 𝑰𝑹𝑭𝑨𝑵 𝑯𝑵 𝒀𝑨𝑹 ✦",
    "🦋💚 𝑴𝑨𝑨𝑺𝑻𝑰 𝑾𝑶𝑹𝑳𝑫' ♡🌸😭🌍",
    "🍷🐥—𝑴𝑰𝑵𝑮𝑺 𝑾𝑶𝑹𝑳𝑫 ❤️🦋✨",
    "🌍🐰 𝑪𝑬𝑳𝑬𝑩𝑹𝑰𝑻𝒀 𝑪𝑨𝑳𝑳 ;-; 🐰💙🪽",
    "❀🍒 𝑯𝑨𝑵𝑼 𝑲𝑰 𝑫𝑼𝑵𝑰𝒀𝑨 🍒❀",
    "⚔️ 𝑺𝑨𝑵𝑨𝑻𝑨𝑵𝑰 🚩 𝑭𝒀𝑻𝑹𝑺 ⚔️",
    "──── 𝑶𝑵𝑬 𝑺𝑴𝑰𝑳𝑬 𝑳𝑶𝑽𝑬 😘❤️",
    "━ 𝑴𝑶𝑵𝑺𝑻𝑬𝑹 𝑯𝑶𝑴𝑬 𝑻𝑶𝑾𝑵 ❤️😅",
    "— 𝑱𝑨𝑰𝑳𝑬𝑬𝑹 ❥💗🪽",
    "[≡ 𝑳𝑬𝑮𝑬𝑵𝑫 𝑯𝑼𝑩 ❤️👍 ≡]",
    "— 𝑵𝑶𝑵𝑺𝑻𝑶𝑷 𝑭𝑳𝑰𝑹𝑻𝒀 :3 ❤️😎",
    "𓆩💞𓆪 𝑺𝑾𝑬𝑬𝑻 𝑴𝑨𝒀𝑨 𝑨𝑫𝑫𝑨 𓆩💞𓆪",
    "╰┈➤ 🖤 𝑫𝑨𝑹𝑲 𝑴𝑨𝑻𝑹𝑰𝑿 𝑭𝑨𝑴𝑰𝑳𝒀 🖤",
    "꧁༺💎 𝑽𝑰𝑷 𝑭𝑹𝑰𝑬𝑵𝑫𝑺 𝑨𝑫𝑫𝑨 💎༻꧂",
    "𓆩🌙𓆪 𝑴𝑶𝑶𝑵𝑳𝑰𝑮𝑯𝑻 𝑨𝑫𝑫𝑨 𝑩𝑶𝑿 𓆩🌙𓆪",
    "❥⃝🦋 𝑩𝑨𝑺𝑻 𝑽𝑰𝑹𝑻𝑼𝑨𝑳 𝑳𝒀𝑹𝑰𝑪𝑺 🦋⃝❥",

    `╔═══❖💗❖═══╗
      𝑴𝑨𝒀𝑨𝑩𝑰 𝑭𝑨𝑴𝑰𝑳𝒀
╚═══❖💗❖═══╝`,

    `╭━━━❖👑❖━━━╮
   𝑹𝑶𝒀𝑨𝑳 𝑭𝑹𝑰𝑬𝑵𝑫𝑺
╰━━━❖👑❖━━━╯`,

    "꧁🖤 𝑺𝑰𝑳𝑬𝑵𝑻 𝑻𝑬𝑹𝑹𝑶𝑹 🖤꧂",
    "༺🦋༻ 𝑶𝑵𝑳𝒀 𝑹𝑬𝑨𝑳 𝑭𝑹𝑰𝑬𝑵𝑫𝑺 ༺🦋༻",
    "♡⃝ 𝑷𝑹𝑬𝑻𝑻𝒀 𝑷𝑬𝑶𝑷𝑳𝑬 𝑨𝑫𝑫𝑨 ♡⃝",
    "💔⃝ 𝑩𝑹𝑶𝑲𝑬𝑵 𝑯𝑬𝑨𝑹𝑻 𝑪𝑳𝑼𝑩 ❤️‍🩹",
    "𓆩💜𓆪 𝑷𝑼𝑹𝑷𝑳𝑬 𝑯𝑬𝑨𝑹𝑻 𝑾𝑶𝑹𝑳𝑫 𓆩💜𓆪",

    "⫷━•༻❃উফ্ ঝাল❃༺•━⫸",
    "⫷━•༻❃বাবু খাইছো❃༺•━⫸",
    "⫷━•༻❃আড্ডা ঘর❃༺•━⫸",
    "⫷━•༻❃ফ্রেন্ডস ক্লাব❃༺•━⫸",
    "⫷━•༻❃বিয়ের প্রস্তাব❃༺•━⫸",
    "⫷━•༻❃এসএসসি ব্যাচ❃༺•━⫸",
    "⫷━•༻❃ঝগড়াটে ছেলে vs মেয়ে❃༺•━⫸",
    "⫷━•༻❃ভালোবাসার কুঁড়েঘর❃༺•━⫸",
    "⫷━•༻❃প্লাজু VS লুঙ্গি❃༺•━⫸",
    "⫷━•༻❃যে প্রেম নিরবে কাদায়❃༺•━⫸",
    "⫷━•༻❃দুষ্টু মেয়েদের আড্ডা❃༺•━⫸",
    "⫷━•༻❃বন্ধু মহল❃༺•━⫸",
    "⫷━•༻❃বেকার ছেলে VS কালো মেয়ে❃༺•━⫸",
    "⫷━•༻❃জেলখানা❃༺•━⫸",
    "⫷━•༻❃বন্ধু VS বান্ধবী❃༺•━⫸",
    "⫷━•༻❃কথার মেলা❃༺•━⫸",
    "⫷━•༻❃রং ঢং মাস্তি❃༺•━⫸",
    "⫷━•༻❃ডেটিং সেন্টার❃༺•━⫸",
    "⫷━•༻❃আমরা সবাই অবুঝ শিশু❃༺•━⫸",
    "⫷━•༻❃ছেলে vs মেয়ে❃༺•━⫸",

    "♥⃝»̶̶͓͓͓̽̽̽ꔹ⃟ꔹ⃟ꕀ⃘⃜⃟ؖؖؖؖؖؖؖؖؖꙮ͌͌͌͌͌͌͌͌͌͌͌͌͌͌ ⑅⃝»̶̶͓͓͓̽̽̽»̶̶͓͓͓̽̽̽๓ All Friends ন্ꕀ⃘⃜⃟ؖؖؖؖؖؖؖؖؖꙮ͌͌͌͌͌͌͌͌͌͌͌͌͌͌ꔹ⃟ꔹ⃟♥⃝»̶̶͓͓͓̽̽̽",

    "♥⃝»̶̶͓͓͓̽̽̽ꔹ⃟ꔹ⃟ꕀ⃘⃜⃟ؖؖؖؖؖؖؖؖؖꙮ͌͌͌͌͌͌͌͌͌͌͌͌͌͌ ⑅⃝»̶̶͓͓͓̽̽̽»̶̶͓͓͓̽̽̽๓Loverꕀ⃘⃜⃟ؖؖؖؖؖؖؖؖؖꙮ͌͌͌͌͌͌͌͌͌͌͌͌͌͌ꔹ⃟ꔹ⃟♥⃝»̶̶͓͓͓̽̽̽",

    "⑅⃝❥»̶̶͓͓͓̽̽̽»̶̶͓͓̽̽̽🥰ক্যা্ঁপ্ঁশ্ঁন্ঁ~ʌ̋̋̋̋̋̋̋̋̋̋̋̋̋̋̋̋̋̋~ব্ঁক্স্ঁ😍»̶̶͓͓͓̽̽̽⑅⃝✺💋",

    "⏤͟͟͞❥͜͡𝄟🌼🦋রিঁয়েঁক্টঁরঁ🌿ক‍্যাঁপঁশঁনঁ"
];


// ======================================================
// REPLY DATA
// ======================================================

if (!global.gnReplyData) {
    global.gnReplyData = new Map();
}


// ======================================================
// GN COMMAND
// ======================================================

module.exports.onStart = async function ({ api, event }) {

    /*
     * IMPORTANT:
     * Reply system কাজ না করলেও এই অংশ number ধরবে।
     */

    if (event.messageReply && event.messageReply.messageID) {

        const replyID = event.messageReply.messageID;

        const saved = global.gnReplyData.get(replyID);

        if (saved) {

            const text = String(event.body || "").trim();

            if (/^\d+$/.test(text)) {

                const number = parseInt(text, 10);

                if (number >= 1 && number <= saved.names.length) {

                    // শুধু নাম পাঠাবে
                    return api.sendMessage(
                        saved.names[number - 1],
                        event.threadID
                    );

                } else {

                    return api.sendMessage(
                        `❌ ভুল নাম্বার!\n১ থেকে ${saved.names.length} এর মধ্যে একটি Number দাও।`,
                        event.threadID
                    );
                }
            }

            return;
        }
    }


    // ==================================================
    // SHOW ALL NAMES
    // ==================================================

    let msg = `╭━━━❖💎❖━━━╮
   𝑺𝑻𝒀𝑳𝑰𝑺𝑯 𝑮𝑪 𝑵𝑨𝑴𝑬
╰━━━❖💎❖━━━╯

`;

    NAMES.forEach((name, index) => {
        msg += `『${index + 1}』 ${name}\n\n`;
    });

    msg += `╭━━━❖🦋❖━━━╮
❤️ Reply এই মেসেজে শুধু Number দাও
👉 1 / 2 / 3 / 4 ...
╰━━━❖🦋❖━━━╯`;


    const info = await api.sendMessage(
        msg,
        event.threadID
    );


    // ==================================================
    // SAVE MESSAGE ID
    // ==================================================

    if (info && info.messageID) {

        global.gnReplyData.set(
            info.messageID,
            {
                names: NAMES,
                author: event.senderID,
                threadID: event.threadID
            }
        );


        // GoatBot built-in reply system
        if (
            global.GoatBot &&
            global.GoatBot.onReply
        ) {

            global.GoatBot.onReply.set(
                info.messageID,
                {
                    commandName: "gn",
                    messageID: info.messageID,
                    author: event.senderID,
                    names: NAMES
                }
            );
        }
    }
};


// ======================================================
// GOATBOT REPLY SYSTEM
// ======================================================

module.exports.onReply = async function ({
    api,
    event,
    handleReply
}) {

    try {

        if (!handleReply) return;

        if (!handleReply.names) return;

        const text = String(
            event.body || ""
        ).trim();

        if (!/^\d+$/.test(text)) return;

        const number = parseInt(
            text,
            10
        );

        if (
            number < 1 ||
            number > handleReply.names.length
        ) {

            return api.sendMessage(
                `❌ ভুল নাম্বার!\n১ থেকে ${handleReply.names.length} এর মধ্যে একটি Number দাও।`,
                event.threadID
            );
        }


        // ⭐ শুধু নির্বাচিত নাম
        return api.sendMessage(
            handleReply.names[number - 1],
            event.threadID
        );

    } catch (error) {

        console.error(
            "GN REPLY ERROR:",
            error
        );
    }
};
