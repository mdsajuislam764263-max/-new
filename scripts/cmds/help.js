const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

const IMAGE_URL = "https://i.imgur.com/LdlYRvE.jpeg";

module.exports = {
	config: {
		name: "help",
		version: "2.0",
		author: "SAJU",
		countDown: 5,
		role: 0,

		shortDescription: {
			en: "View commands in dark hacker style",
			bn: "ডার্ক হ্যাকার স্টাইলে কমান্ড দেখুন",
			vi: "Xem danh sách lệnh theo phong cách hacker"
		},

		longDescription: {
			en: "View command usage and complete command list",
			bn: "কমান্ডের ব্যবহার ও সম্পূর্ণ কমান্ড তালিকা দেখুন",
			vi: "Xem hướng dẫn và danh sách lệnh"
		},

		category: "info",

		guide: {
			en: "{pn} [command name]",
			bn: "{pn} [কমান্ডের নাম]",
			vi: "{pn} [tên lệnh]"
		},

		priority: 1
	},

	onStart: async function ({
		message,
		args,
		event,
		threadsData,
		role
	}) {

		const { threadID } = event;

		const threadData =
			await threadsData.get(threadID);

		const prefix =
			getPrefix(threadID);

		const langCode =
			threadData.data.lang ||
			global.GoatBot.config.language ||
			"en";

		// ==============================
		// LOAD PROFILE IMAGE
		// ==============================

		let profileImage = null;

		try {
			profileImage =
				await global.utils.getStreamFromURL(
					IMAGE_URL
				);
		} catch (error) {
			console.error(
				"❌ Profile Image Error:",
				error
			);
		}


		// ==============================
		// SHOW ALL COMMANDS
		// ==============================

		if (args.length === 0) {

			const categories = {};
			let msg = "";


			// Collect commands
			for (const [name, value] of commands) {

				if (
					value.config.role > 0 &&
					role < value.config.role
				) {
					continue;
				}

				const category =
					value.config.category ||
					"Uncategorized";

				if (!categories[category]) {
					categories[category] = {
						commands: []
					};
				}

				if (
					!categories[category].commands.includes(
						name
					)
				) {
					categories[category].commands.push(
						name
					);
				}
			}


			// ==============================
			// DARK HEADER
			// ==============================

			msg += `
╔════════════════════════════════╗
║     ☠️  S A J U  //  M A T R I X     ║
╚════════════════════════════════╝

        🩸 SYSTEM : ONLINE
        💀 STATUS : ACTIVE
        ☠️ MODE   : DARKNET
        👁️ ACCESS : GRANTED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

          ⚠️ COMMAND DATABASE ⚠️

`;


			// ==============================
			// COMMAND CATEGORIES
			// ==============================

			Object.keys(categories)
				.sort()
				.forEach((category) => {

					msg +=
`\n╭━━━━━━〔 ☠️ ${category.toUpperCase()} 〕`;

					const names =
						categories[category]
							.commands
							.sort();

					for (
						let i = 0;
						i < names.length;
						i += 3
					) {

						const cmds =
							names
								.slice(i, i + 3)
								.map(
									item => `┃ 🩸 ${item}`
								);

						msg +=
`\n${cmds.join("\n")}`;
					}

					msg +=
`\n╰━━━━━━━━━━━━━━━━━━━━━━━━☠️\n`;
				});


			// ==============================
			// LANGUAGE HINT
			// ==============================

			const totalCommands =
				commands.size;

			let helpHint;

			if (langCode === "bn") {

				helpHint =
`☠️ বিস্তারিত কমান্ড দেখতে লিখুন:
${prefix}help <কমান্ড>`;

			} else if (langCode === "vi") {

				helpHint =
`☠️ Nhập:
${prefix}help <lệnh>`;

			} else {

				helpHint =
`☠️ Type:
${prefix}help <command>`;
			}


			// ==============================
			// FOOTER
			// ==============================

			msg += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💀 TOTAL COMMANDS : ${totalCommands}

${helpHint}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

╭────────〔 👁️ SYSTEM INFO 〕
│
│ ☠️ BOT      : SAJU MATRIX
│ 🩸 STATUS   : ONLINE
│ 💀 SECURITY : ACTIVE
│ ⚡ ENGINE   : NODE.JS
│
╰──────────────────────────────

       ☠️ ENTER THE MATRIX ☠️
       🩸 NO FEAR • NO LIMITS 🩸

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;


			// ==============================
			// SEND HELP MESSAGE
			// ==============================

			try {

				const sent =
					await message.reply({
						body: msg,
						attachment: profileImage || undefined
					});


				// Auto delete after 80 seconds
				if (sent?.messageID) {

					setTimeout(() => {

						try {

							message.unsend(
								sent.messageID
							);

						} catch (error) {}

					}, 80000);
				}

			} catch (error) {

				console.error(
					"❌ Help Error:",
					error
				);

			}

			return;
		}


		// ==============================
		// SINGLE COMMAND HELP
		// ==============================

		const commandName =
			args[0].toLowerCase();

		const command =
			commands.get(commandName) ||
			commands.get(
				aliases.get(commandName)
			);


		// ==============================
		// COMMAND NOT FOUND
		// ==============================

		if (!command) {

			const notFound = `
╔════════════════════════════════╗
║        ☠️ ACCESS DENIED ☠️
╚════════════════════════════════╝

❌ COMMAND NOT FOUND

🩸 TARGET :
「 ${commandName} 」

⚠️ এই নামে কোনো command পাওয়া যায়নি।

💀 সঠিক command দেখতে লিখুন:

${prefix}help

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☠️ SAJU // DARKNET_MATRIX ☠️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

			return message.reply(notFound);
		}


		// ==============================
		// COMMAND INFORMATION
		// ==============================

		const config =
			command.config;

		const roleText =
			roleTextToString(
				config.role,
				langCode
			);


		const labels = {

			bn: {
				name: "নাম",
				alias: "ডাকনাম",
				info: "তথ্য",
				desc: "বর্ণনা",
				author: "লেখক",
				guide: "নির্দেশনা",
				usage: "বিস্তারিত",
				ver: "ভার্সন",
				role: "অনুমতি",
				none: "নেই",
				unknown: "অজানা"
			},

			vi: {
				name: "Tên",
				alias: "Tên khác",
				info: "Thông tin",
				desc: "Mô tả",
				author: "Tác giả",
				guide: "Hướng dẫn",
				usage: "Chi tiết",
				ver: "Phiên bản",
				role: "Quyền hạn",
				none: "Không có",
				unknown: "Không xác định"
			},

			en: {
				name: "NAME",
				alias: "ALIASES",
				info: "INFO",
				desc: "DESCRIPTION",
				author: "AUTHOR",
				guide: "GUIDE",
				usage: "DETAILS",
				ver: "VERSION",
				role: "ROLE",
				none: "None",
				unknown: "Unknown"
			}
		};


		const lb =
			labels[langCode] ||
			labels.en;


		const desc =
			config.description?.[langCode] ||
			config.description?.en ||
			config.longDescription?.[langCode] ||
			config.longDescription?.en ||
			"No description";


		const guideBody =
			config.guide?.[langCode] ||
			config.guide?.en ||
			"";


		const usage =
			guideBody
				.replace(
					/{pn}/g,
					prefix + config.name
				)
				.replace(
					/{p}/g,
					prefix
				)
				.replace(
					/{n}/g,
					config.name
				);


		// ==============================
		// COMMAND DETAIL MESSAGE
		// ==============================

		const response = `
╔════════════════════════════════╗
║        ☠️ COMMAND DATA ☠️
╚════════════════════════════════╝

🩸 ${lb.name} :
   ${config.name}

👁️ ${lb.alias} :
   ${
		config.aliases
			? config.aliases.join(", ")
			: lb.none
	}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 ${lb.desc} :
   ${desc}

👑 ${lb.author} :
   ${config.author || lb.unknown}

📚 ${lb.guide} :
   ${usage || prefix + config.name}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⭐ ${lb.ver} :
   ${config.version || "1.0"}

🛡️ ${lb.role} :
   ${roleText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☠️ SAJU // DARKNET_MATRIX ☠️
🩸 ACCESS LEVEL VERIFIED 🩸

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;


		// ==============================
		// SEND COMMAND DETAILS
		// ==============================

		try {

			const helpMessage =
				await message.reply({
					body: response,
					attachment:
						profileImage || undefined
				});


			// Auto delete after 80 seconds
			if (helpMessage?.messageID) {

				setTimeout(() => {

					try {

						message.unsend(
							helpMessage.messageID
						);

					} catch (error) {}

				}, 80000);
			}

		} catch (error) {

			console.error(
				"❌ Help Detail Error:",
				error
			);

		}
	}
};


// =====================================
// ROLE TEXT
// =====================================

function roleTextToString(role, lang) {

	const roles = {

		bn: [
			"সব ইউজার",
			"গ্রুপ অ্যাডমিন",
			"বোট অ্যাডমিন",
			"ডেভেলপার",
			"ভিআইপি",
			"NSFW ইউজার"
		],

		en: [
			"All users",
			"Group Admin",
			"Bot Admin",
			"Developer",
			"VIP User",
			"NSFW User"
		],

		vi: [
			"Tất cả người dùng",
			"Quản trị viên nhóm",
			"Admin bot",
			"Người phát triển",
			"Người dùng VIP",
			"Người dùng NSFW"
		]
	};


	const r =
		roles[lang] ||
		roles.en;


	if (role >= 0 && role <= 5) {

		return `${role} (${r[role]})`;

	}


	return `${role} (Unknown)`;
}
