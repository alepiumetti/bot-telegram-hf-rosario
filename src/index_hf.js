const TelegramBot = require("node-telegram-bot-api");
const CronJob = require("cron").CronJob;

const mqtt = require("mqtt");

const { token, url_mqtt } = require("./config.json");

const client = mqtt.connect(url_mqtt);
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

bot.onText(/\/hf(.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const user = msg.from;
  const message = match[1].trim().toLowerCase();

  if (message === "hola") {
    bot.sendMessage(chatId, `Hola ${user.username}!`);
  }

  if (message === "1+1") {
    bot.sendMessage(chatId, "11");
  }
});

// bot.onText(/\/encuesta/, async function (msg) {
//   const chatId = msg.chat.id;
//   console.log("msg", msg);
// });

const CRON_JOB = new CronJob(
  "0 8 * * wed",
  async function () {
    await bot.sendPoll(
      -1001530056510,
      `-ENCUESTA DE PRUEBA- Vas a la toma? `,
      ["Si", "Tal vez", "No"],
      {
        is_anonymous: false,
      }
    );
  },
  null,
  true,
  "America/Los_Angeles"
);

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
