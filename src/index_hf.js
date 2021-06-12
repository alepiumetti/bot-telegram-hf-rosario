const TelegramBot = require("node-telegram-bot-api");
const token = require("./token");
const commands = require("./commands/commands");

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/hf (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const user = msg.from;
  const message = match[1].toLowerCase();

  const cmd = commands(user);

  // console.log(cmd.hasOwnProperty(match[1]));
  // si querés saber si te está tomando el comando podés usar este log.

  if (cmd[message]) {
    const resp = bot.sendMessage(chatId, cmd[message].content, {
      parse_mode: "Markdown",
    });
  } else {
    bot.sendMessage(chatId, "No existe este comando");
  }
});
