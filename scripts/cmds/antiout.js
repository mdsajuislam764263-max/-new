module.exports.config = {
    name: "antiout",
    version: "2.0.0",
    credits: "SHAHADAT SAHU / Fixed by Saju",
    hasPermssion: 1,
    description: "Turn antiout on or off",
    usages: "antiout on/off",
    commandCategory: "system",
    cooldowns: 0
};

module.exports.run = async ({ api, event, Threads }) => {
    try {
        const args = event.body
            ? event.body.trim().split(/\s+/).slice(1)
            : [];

        let data = (await Threads.getData(event.threadID)).data || {};

        // /antiout on
        if (args[0] && args[0].toLowerCase() === "on") {
            data.antiout = true;
        }

        // /antiout off
        else if (args[0] && args[0].toLowerCase() === "off") {
            data.antiout = false;
        }

        // শুধু /antiout দিলে বর্তমান status দেখাবে
        else {
            const status = data.antiout === true ? "ON 🟢" : "OFF 🔴";

            return api.sendMessage(
                `╭──────────────╮
│  🛡️ ANTI-OUT
├──────────────┤
│ Status: ${status}
│
│ Use:
│ /antiout on
│ /antiout off
╰──────────────╯`,
                event.threadID
            );
        }

        await Threads.setData(event.threadID, { data });

        // global thread data update
        if (
            global.data &&
            global.data.threadData &&
            typeof global.data.threadData.set === "function"
        ) {
            global.data.threadData.set(
                parseInt(event.threadID),
                data
            );
        }

        const statusText = data.antiout
            ? "ON 🟢"
            : "OFF 🔴";

        return api.sendMessage(
            `╭──────────────╮
│  🛡️ ANTI-OUT
├──────────────┤
│ Status: ${statusText}
│
│ ✅ Successfully updated!
╰──────────────╯`,
            event.threadID
        );

    } catch (error) {
        console.error("ANTI-OUT ERROR:", error);

        return api.sendMessage(
            `❌ Antiout চালু/বন্ধ করতে সমস্যা হয়েছে!\n\nError: ${error.message}`,
            event.threadID
        );
    }
};
