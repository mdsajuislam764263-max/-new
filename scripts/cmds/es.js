module.exports = {
  config: {
    name: "es",
    version: "1.1.0",
    author: "Sova",
    role: 0,
    category: "fun"
  },

  onStart: async function ({ api, event }) {
    const { threadID } = event;

    const emojis = [
      "✨","💖","💙","💚","💛","🧡","❤️","💜","🖤","🤍",
      "🔥","⚡","💥","🌈","🌸","🌺","🌹","🌷","🍀","🌿",
      "🦋","🐼","🐸","🐥","🐶","🐱","🍕","🍔","🍟","🍫"
    ];

    // global storage
    if (!global.esSpam) global.esSpam = {};

    // ▶ START
    global.esSpam[threadID] = setInterval(() => {
      let msg = "";
      for (let i = 0; i < 100; i++) {
        msg += emojis[Math.floor(Math.random() * emojis.length)] + " ";
      }
      api.sendMessage(msg, threadID);
    }, 2000);

    return api.sendMessage("✅ Emoji spam started!\nStop করতে 'stop' লিখো", threadID);
  },

  onChat: async function ({ api, event }) {
    const { threadID, body } = event;

    if (!body) return;

    const cmd = body.trim().toLowerCase();

    // ⛔ STOP FIXED
    if (cmd === "stop") {
      if (!global.esSpam || !global.esSpam[threadID]) {
        return api.sendMessage("❌ কিছু চলছে না!", threadID);
      }

      clearInterval(global.esSpam[threadID]);
      delete global.esSpam[threadID];

      return api.sendMessage("🛑 Emoji spam বন্ধ করা হয়েছে!", threadID);
    }
  }
};
