module.exports = {
  config: {
    name: "espm",
    version: "1.0.0",
    author: "Saju",
    role: 0,
    category: "fun"
  },

  onStart: async function ({ api, event }) {
    const { threadID, body } = event;

    if (!body) return;

    const cmd = body.trim().toLowerCase();

    // 🌈 Emojis
    const emojis = [
      "✨","💖","💙","💚","💛","🧡","❤️","💜","🖤","🤍",
      "🔥","⚡","💥","🌈","🌸","🌺","🌹","🌷","🍀","🌿",
      "🦋","🐼","🐸","🐥","🐶","🐱","🍕","🍔","🍟","🍫",
      "😎","🤩","🥳","😊","😍","😇","💫","🌟","⚡","🎉"
    ];

    // 📝 Text
    const texts = [
      "GOOD VIBES ✨",
      "STAY HAPPY 😊",
      "LOVE LIFE ❤️",
      "ENJOY MOMENT 🌈",
      "FEEL GOOD 😎",
      "BE STRONG 💪",
      "DREAM BIG 🚀",
      "KEEP SMILING 😁",
      "YOU CAN DO IT 🔥",
      "POSITIVE ENERGY ⚡"
    ];

    if (!global.ESPM) global.ESPM = {};

    // ▶ ON
    if (cmd === "espm on") {
      if (global.ESPM[threadID]) {
        return api.sendMessage("⚠️ ESPM already ON!", threadID);
      }

      global.ESPM[threadID] = setInterval(() => {
        let msg = "";

        for (let i = 0; i < 150; i++) {
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          const text = texts[Math.floor(Math.random() * texts.length)];

          msg += `${emoji} ${text} `;
        }

        api.sendMessage(msg, threadID);
      }, 2500);

      return api.sendMessage("✅ ESPM MIX MODE ON!", threadID);
    }

    // ⛔ OFF
    if (cmd === "espm off") {
      if (!global.ESPM[threadID]) {
        return api.sendMessage("❌ ESPM already OFF!", threadID);
      }

      clearInterval(global.ESPM[threadID]);
      delete global.ESPM[threadID];

      return api.sendMessage("🛑 ESPM OFF!", threadID);
    }
  }
};
