const TelegramBot = require("node-telegram-bot-api");
const token = require("./token");

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/hf (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const user = msg.from;
  const message = match[1];

  if (message.match(/hola/i)) {
    const resp = "Hola " + user.first_name;
    bot.sendMessage(chatId, resp);
  } else if (message.match(/ayuda/i)) {
    const resp =
      "Comandos disponibles:\n• *ayuda* : Muestra todos los comandos \n• *hola* : Saludito.\n• *redes*:Todas los medios de contacto de HackFun \n\n • *about*: Info importante sobre bot ";
    bot.sendMessage(chatId, resp, { parse_mode: "Markdown" });
  } else if (message.match(/links/i)) {
    const resp = "Importantes:\n*#Links*: links útiles.\n";
    bot.sendMessage(chatId, resp, { parse_mode: "Markdown" });
  } else if (message.match(/about/i)) {
    const resp =
      "*Info*\n_Bot Exclusivo para *HackFun*_\n🔗-*Repositorio*: \n⚠-*Issues*:\n💻-*Creado con*: NodeJs\n🦾-*Motivación*: Pequeños objetivos cumplidos.";
    bot.sendMessage(chatId, resp, { parse_mode: "Markdown" });
  } else if (message.match(/redes/i)) {
    const resp =
      "Redes de *HackFun*\n🔗-[Página Web](https://hackfunrosario.com/) \n📷-Instagram: [@hackfunrosario](https://www.instagram.com/hackfunrosario/) \n🕊-Twitter: [@hackfun_ros](https://twitter.com/hackfun_ros)";
    bot.sendMessage(chatId, resp, { parse_mode: "Markdown" });
  } else {
    bot.sendMessage(chatId, "No existe este comando");
  }
});
