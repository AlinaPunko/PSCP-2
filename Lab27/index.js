const TOKEN = '1131976741:AAF70I4sOqqhdrZoVv8_ogRV4EjiXRRzA1g';
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/(.)/, (msg) => {
    bot.sendMessage(msg.chat.id, 'echo: ' + msg.text);
});