const createFuncMessage = global.utils.message;
const handlerCheckDB = require("./handlerCheckData.js");

module.exports = (
  api,
  threadModel,
  userModel,
  dashBoardModel,
  globalModel,
  usersData,
  threadsData,
  dashBoardData,
  globalData
) => {
  const handlerEvents = require(
    process.env.NODE_ENV == "development"
      ? "./handlerEvents.dev.js"
      : "./handlerEvents.js"
  )(
    api,
    threadModel,
    userModel,
    dashBoardModel,
    globalModel,
    usersData,
    threadsData,
    dashBoardData,
    globalData
  );

  return async function (event) {

    // ==============================
    // ANTI INBOX PROTECTION
    // ==============================
    if (
      global.GoatBot.config.antiInbox == true &&
      (
        event.senderID == event.threadID ||
        event.userID == event.senderID ||
        event.isGroup == false
      ) &&
      (event.senderID || event.userID || event.isGroup == false)
    ) {
      return;
    }

    const message = createFuncMessage(api, event);

    await handlerCheckDB(usersData, threadsData, event);

    const handlerChat = await handlerEvents(event, message);

    if (!handlerChat) return;

    const {
      onAnyEvent,
      onFirstChat,
      onStart,
      onChat,
      onReply,
      onEvent,
      handlerEvent,
      onReaction,
      typ,
      presence,
      read_receipt
    } = handlerChat;

    onAnyEvent();

    switch (event.type) {

      // ==============================
      // MESSAGE
      // ==============================
      case "message":
      case "message_reply":
      case "message_unsend":

        /*
         * TYPING INDICATOR
         *
         * User message পাওয়ার সাথে সাথে
         * bot "Typing..." দেখাবে।
         */
        try {
          if (event.threadID && api.sendTypingIndicator) {
            api.sendTypingIndicator(event.threadID, (err) => {
              if (err) {
                console.error(
                  "Typing indicator error:",
                  err
                );
              }
            });
          }
        } catch (err) {
          console.error(
            "Typing indicator exception:",
            err
          );
        }

        // Existing bot system
        onFirstChat();
        onChat();
        onStart();
        onReply();

        break;


      // ==============================
      // EVENT
      // ==============================
      case "event":

        handlerEvent();
        onEvent();

        break;


      // ==============================
      // MESSAGE REACTION
      // ==============================
      case "message_reaction":

        onReaction();

        // React-Unsend System
        try {

          const cfg =
            global.GoatBot.config.reactUnsend || {};

          const adminIDs =
            global.GoatBot.config.adminBot || [];

          const isAdmin =
            adminIDs.includes(
              event.userID || event.senderID
            );

          if (
            cfg.enable &&
            cfg.emojis?.includes(event.reaction) &&
            (!cfg.onlyAdmin || isAdmin)
          ) {

            await api.unsendMessage(
              event.messageID
            );

          }

        } catch (err) {

          console.error(
            "❌ React-Unsend Error:",
            err
          );

        }

        break;


      // ==============================
      // TYPING EVENT
      // ==============================
      case "typ":

        typ();

        break;


      // ==============================
      // PRESENCE
      // ==============================
      case "presence":

        presence();

        break;


      // ==============================
      // READ RECEIPT
      // ==============================
      case "read_receipt":

        read_receipt();

        break;


      // ==============================
      // DEFAULT
      // ==============================
      default:

        break;
    }
  };
};
