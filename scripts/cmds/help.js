const fs = require("fs-extra");
const path = require("path");
const https = require("https");

module.exports = {
  config: {
    name: "help",
    aliases: ["menu", "commands"],
    version: "5.0",
    author: "EryXenX",
    shortDescription: "Show all commands",
    longDescription: "Show all commands in fancy font with boxes",
    category: "system",
    guide: "{pn}help [command name]"
  },

  onStart: async function({ message, args, prefix }) {
    const allCommands = global.GoatBot.commands;

    const fancyFont = (str) => str.replace(/[A-Za-z]/g, (c) => {
      const map = {
        A:"𝐀", B:"𝐁", C:"𝐂", D:"𝐃", E:"𝐄", F:"𝐅", G:"𝐆", H:"𝐇",
        I:"𝐈", J:"𝐉", K:"𝐊", L:"𝐋", M:"𝐌", N:"𝐍", O:"𝐎", P:"𝐏",
        Q:"𝐐", R:"𝐑", S:"𝐒", T:"𝐓", U:"𝐔", V:"𝐕", W:"𝐖", X:"𝐗",
        Y:"𝐘", Z:"𝐙",
        a:"𝐚", b:"𝐛", c:"𝐜", d:"𝐝", e:"𝐞", f:"𝐟", g:"𝐠", h:"𝐡",
        i:"𝐢", j:"𝐣", k:"𝐤", l:"𝐥", m:"𝐦", n:"𝐧", o:"𝐨", p:"𝐩",
        q:"𝐪", r:"𝐫", s:"𝐬", t:"𝐭", u:"𝐮", v:"𝐯", w:"𝐰", x:"𝐱",
        y:"𝐲", z:"𝐳"
      };
      return map[c] || c;
    });

    const categoryFont = (str) => str.split("").map(c => {
      const map = {
        A:"𝙰", B:"𝙱", C:"𝙲", D:"𝙳", E:"𝙴", F:"𝙵", G:"𝙶", H:"𝙷",
        I:"𝙸", J:"𝙹", K:"𝙺", L:"𝙻", M:"𝙼", N:"𝙽", O:"𝙾", P:"𝙿",
        Q:"𝚀", R:"𝚁", S:"𝚂", T:"𝚃", U:"𝚄", V:"𝚅", W:"𝚆", X:"𝚇",
        Y:"𝚈", Z:"𝚉",
        a:"𝚊", b:"𝚋", c:"𝚌", d:"𝚍", e:"𝚎", f:"𝚏", g:"𝚐", h:"𝚑",
        i:"𝚒", j:"𝚓", k:"𝚔", l:"𝚕", m:"𝚖", n:"𝚗", o:"𝚘", p:"𝚙",
        q:"𝚚", r:"𝚛", s:"𝚜", t:"𝚝", u:"𝚞", v:"𝚟", w:"𝚠", x:"𝚡",
        y:"𝚢", z:"𝚣"
      };
      return map[c] || c;
    }).join("");

    const cleanCategoryName = (text) => text ? text.toLowerCase() : "others";

    // যদি args[0 থাকে, সেটা specific command
    if (args[0]) {
      const cmdName = args[0].toLowerCase();
      const cmd = allCommands.get(cmdName) || [...allCommands.values()].find(c => c.config.aliases?.includes(cmdName));
      if (!cmd) return message.reply(`❌ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 '${fancyFont(cmdName)}' 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝!`);

      const infoMsg = 
`╭━━━━━━━━━━━━━━━━━━╮
│  💗 ${fancyFont("COMMAND INFO")} 💗
│  ─────────────────
│
│  ✦ ${fancyFont("NAME")}        : ${fancyFont(cmd.config.name)}
│  ✦ ${fancyFont("ALIASES")}     : ${fancyFont(cmd.config.aliases?.join(", ") || "None")}
│  ✦ ${fancyFont("CATEGORY")}    : ${categoryFont((cmd.config.category || "Others").toUpperCase())}
│  ✦ ${fancyFont("VERSION")}     : ${fancyFont(cmd.config.version)}
│  ✦ ${fancyFont("AUTHOR")}      : ${fancyFont(cmd.config.author)}
│  ✦ ${fancyFont("DESCRIPTION")} : ${fancyFont(cmd.config.longDescription || cmd.config.shortDescription)}
│  ✦ ${fancyFont("USAGE")}       : ${prefix}${cmd.config.guide.replace("{pn}", cmd.config.name)}
│
╰━━━━━━━━━━━━━━━━━━╯`;

      return message.reply(infoMsg);
    }

    // যদি args[0 না থাকে, সব commands দেখাও
    const categories = {};
    for (const [name, cmd] of allCommands) {
      const cat = cleanCategoryName(cmd.config.category);
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(name);
    }

    const formatCommandsBox = (cmds) =>
      cmds.sort().map(c => `│  │ 💗 ${fancyFont(c)}`).join("\n");

    let msg = `╭━━━━━━━━━━━━━━━━━━━━╮
│  💕 ${fancyFont("COMMANDS MENU")} 💕
│  ───────────────────
│  ✦ ${fancyFont("PREFIX")} : ${prefix}
│  ✦ ${fancyFont("TOTAL")}  : ${allCommands.size}
│  ✦ ${fancyFont("AUTHOR")} : ⑅⃝𝔰𝔞𝔧𝔲⋆⃝🔻👿⑅⃝😸🪽❥
│
`;

    for (const cat of Object.keys(categories)) {
      msg += `│  ╭─❥ ${categoryFont(cat.toUpperCase())} ❥─╮
`;
      msg += formatCommandsBox(categories[cat]) + "\n";
      msg += `│  ╰────────────────╯
│
`;
    }

    msg += `│  💞 ${fancyFont("USE")} : ${prefix}help <command>
╰━━━━━━━━━━━━━━━━━━━━╯`;

    const imageURL = "https://i.imgur.com/OHi5a1z.jpeg";
    const imageFolder = path.join(__dirname, "cache");
    if (!fs.existsSync(imageFolder)) fs.mkdirSync(imageFolder, { recursive: true });

    const imageName = path.basename(imageURL);
    const imagePath = path.join(imageFolder, imageName);

    if (!fs.existsSync(imagePath)) {
      await downloadImage(imageURL, imagePath);
    }

    return message.reply({
      body: msg,
      attachment: fs.createReadStream(imagePath)
    });
  }
};

// Download Image function
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed to download '${url}' (${res.statusCode})`));
      }

      res.pipe(file);

      file.on("finish", () => {
        file.close(resolve);
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}
