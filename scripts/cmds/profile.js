const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
    name: "profile",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "SHAHADAT SAHU",
    description: "Get Facebook UID and profile links",
    commandCategory: "utility",
    cooldowns: 5
};

module.exports.run = async function ({ event, api, args }) {
    const cacheDir = __dirname + "/cache";

    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }

    let uid = null;
    let name = null;

    const sendResult = async (userID, userName = null) => {
        const filePath = `${cacheDir}/${userID}.jpg`;

        try {
            // Get user name
            if (!userName) {
                try {
                    const userInfo = await api.getUserInfo(userID);
                    userName = userInfo?.[userID]?.name || "Unknown";
                } catch {
                    userName = "Unknown";
                }
            }

            // Facebook profile picture
            const picURL =
                `https://graph.facebook.com/${userID}/picture` +
                `?width=1500&height=1500`;

            const response = await axios.get(picURL, {
                responseType: "arraybuffer",
                maxRedirects: 5
            });

            fs.writeFileSync(filePath, Buffer.from(response.data));

            const message = {
                body:
`╔══════════❖🌺❖══════════╗
║ 👤 𝐍𝐚𝐦𝐞 : ${userName}
║ 🆔 𝐔𝐬𝐞𝐫 𝐔𝐈𝐃 : ${userID}
║ 🔗 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐋𝐢𝐧𝐤 :
║ m.me/${userID}
║ 🌐 𝐅𝐁 𝐏𝐫𝐨𝐟𝐢𝐥𝐞 :
║ fb.com/${userID}
╚══════════❖🌺❖══════════╝`,
                attachment: fs.createReadStream(filePath)
            };

            api.sendMessage(
                message,
                event.threadID,
                () => {
                    try {
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                    } catch {}
                },
                event.messageID
            );

        } catch (error) {
            console.error("Profile Error:", error);

            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch {}

            api.sendMessage(
                "⚠️ Profile information পাওয়া যায়নি। UID সঠিক কিনা চেক করুন।",
                event.threadID,
                event.messageID
            );
        }
    };

    // 1. Reply to someone's message
    if (event.type === "message_reply" && event.messageReply?.senderID) {
        uid = event.messageReply.senderID;
        return sendResult(uid);
    }

    // 2. Mention someone
    if (event.mentions && Object.keys(event.mentions).length > 0) {
        uid = Object.keys(event.mentions)[0];
        name = event.mentions[uid];
        return sendResult(uid, name);
    }

    // 3. No argument = own profile
    if (!args[0]) {
        uid = event.senderID;
        return sendResult(uid);
    }

    // 4. Facebook profile URL
    if (
        args[0].includes("facebook.com/") ||
        args[0].includes("fb.com/")
    ) {
        try {
            uid = await api.getUID(args[0]);

            if (!uid) {
                throw new Error("UID not found");
            }

            return sendResult(uid);
        } catch (error) {
            console.error("UID Error:", error);

            return api.sendMessage(
                "⚠️ Facebook link থেকে UID পাওয়া যায়নি!",
                event.threadID,
                event.messageID
            );
        }
    }

    // 5. Direct UID
    if (/^\d+$/.test(args[0])) {
        uid = args[0];
        return sendResult(uid);
    }

    // 6. Usage
    return api.sendMessage(
`⚠️ 𝐔𝐬𝐚𝐠𝐞:

• uid2
নিজের UID দেখতে

• uid2 @mention
কাউকে mention করে তার UID দেখতে

• uid2 [Facebook Profile Link]
Facebook profile link থেকে UID দেখতে

• কোনো message-এ reply করে uid2
Reply করা ব্যক্তির UID দেখতে`,
        event.threadID,
        event.messageID
    );
};
