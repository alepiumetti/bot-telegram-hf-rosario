const status = (context) => {
  context.client.publish("door/trigger", JSON.stringify({ door: "reScan" }));
};

const commands = (context) => {
  return {
    hola: {
      content: "Hola " + user.first_name,
    },
    ayuda: {
      content:
        "Comandos disponibles:.\n• /hf *links* : Hashtags relevantes del servidor \n• /hf *ayuda* : Muestra todos los comandos \n• /hf *hola* : Saludito.\n• /hf *redes*:Todas los medios de contacto de HackFun \n• /hf *about*: Info importante sobre bot ",
    },
    links: {
      content: "Importantes:\n*#Links*: links útiles.\n",
    },
    about: {
      content:
        "*Info*\n_Bot Exclusivo para *HackFun*_\n🔗-*Repositorio*: [Github](https://github.com/alepiumetti/hackfun-rosario) \n⚠-*Issues*:[GitHub](https://github.com/alepiumetti/hackfun-rosario/issues)\n💻-*Creado con*: NodeJs\n🦾-*Motivación*: Pequeños objetivos cumplidos.",
    },
    redes: {
      content:
        "Redes de *HackFun*\n🔗-[Página Web](https://hackfunrosario.com/) \n📷-Instagram: [@hackfunrosario](https://www.instagram.com/hackfunrosario/) \n🕊-Twitter: [@hackfun_ros](https://twitter.com/hackfun_ros)",
    },
    status: {
      content: "apretado status",
    },
  };
};

module.exports = { status };
