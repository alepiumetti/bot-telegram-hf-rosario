const TelegramBot = require("node-telegram-bot-api");
const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://149.50.131.173:1883");

const token = "1857846651:AAFqnYhoQw_Z21BOyN84mX7KowSyf5Fe-f0";
const commands = require("./commands/commands");

const bot = new TelegramBot(token, { polling: true });

client.on("connect", () => {
  client.subscribe("door/status", (err) => {
    if (err) {
      console.error("Error al suscribirse");
    }
  });

  console.log("Conectado a MQTT");
});

client.on("message", (topic, message) => {
  // message is Buffer
  const STRING_MSG = message.toString();

  switch (topic) {
    case "door/status":
      try {
        const { open } = JSON.parse(STRING_MSG);

        if (open) {
          bot.sendMessage(479543501, "Puerta cerrada");
        } else {
          bot.sendMessage(479543501, "Puerta abierta");
        }
      } catch (error) {
        console.log("error", error);
      }
      break;

    default:
      break;
  }

  // client.end();
});

bot.onText(/\/hf (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const user = msg.from;
  const message = match[1].toLowerCase();

  console.log("chatId", chatId);

  try {
    commands[message]({
      bot,
      chatId,
      client,
      user,
    });
  } catch (error) {
    bot.sendMessage(chatId, "No existe este comando");
  }
});

bot.onText(/\/start/, function (msg) {
  var chatId = msg.chat.id;
  var chatitle = msg.chat.title;

  bot.sendMessage(chatId, `Hola ${msg.from.first_name}! \n `, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "⚙️ Ayuda", callback_data: "botonAyuda" },
          { text: "Estado puerta", callback_data: "status" },
          // { text: "🐶 Sobre Apolo", callback_data: "botonSobre" },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
});

bot.on("callback_query", function onCallbackQuery(actionButton) {
  const data = actionButton.data;
  const msg = actionButton.message;
  const chatId = actionButton.message.chat.id;
  const user = msg.from;

  switch (data) {
    case "botonAyuda":
      break;
    case "status":
      commands.status({
        bot,
        chatId,
        client,
        user,
      });
      break;
    default:
      break;
  }
});
