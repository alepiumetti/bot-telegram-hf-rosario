# HackFun Rosario Bot

Pequeño proyecto para mostrar los contenidos de HackFun.
## ¿HackFun?
Es un Hackerspace itinerante de Rosario.

Podés saber más en la [web](https://hackfunrosario.com/).

## El desarrollo

El bot fue creado hardcodeando los datos ya que era un pequeño proyecto que quería que salga rápido.
### Enviroment

Todo lo que fue utilizado para el bot.
#### Dependencias externas

[Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api);

### Versiones utlilizadas 

```
npm 7.13.0
node v16.2.0
```
## Servidor

Deploy hecho en Digital Ocean
### Agregar o modificar
Podés dejar un [issue]() y/o pull request para las modificaciones.

## ¡Creá tu bot! 

  1. Fork del repositorio.
  2. Instalar dependencias.
   ```
    npm install
   ```
  3. Crear bot en Telegram con [@BotFather](t.me/BotFather)
  4. Crear archivo llamado __token.js__ en el directorio __src/__ de la forma: 
   
  ```js
  const token = "token dado por @BotFather";

  module.exports = token;
  ```
  4. Modificar en __index.jx__ el comando que recibe como parametro el método onText. En este caso está _/hf_.
  5. Modificar y crear tus nuevos comandos en el archivo __commands/commands.js__ de la forma:
   
   ```js
   {
     nombreDeComando:{
     content:"Contenido en Markdown" 
    }
   }

   //Se puede utilizar datos del usuario accediendo a user
   //e.g. user.first_name o user.username 

   ``` 
  6. Guardar todo y ejecutar 
   ```
    npm start
   ```
   7. Hacer deploy en servidor.

## Motivación

Plantearse pequeños objetivos y lograrlos.
