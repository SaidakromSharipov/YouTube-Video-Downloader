const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');
const fs = require('fs');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token obtained from BotFather
const bot = new TelegramBot('6033814337:AAETkN9Xek2-CbdUz_Um20GxCTPm3Yk_GNw', { polling: true });


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const videoUrl = msg.text;
  
    if (ytdl.validateURL(videoUrl)) {
      bot.sendMessage(chatId, 'Downloading video...');
  
      const downloadStream = ytdl(videoUrl);
      const fileName = `${Date.now()}.mp4`;
  
      downloadStream.pipe(fs.createWriteStream(fileName));
  
      // downloadStream.on('progress', (chunkLength, downloaded, total) => {
      //   const percent = (downloaded / total) * 100;
      //   bot.sendMessage(chatId, `Downloaded: ${percent.toFixed(2)}%`);
      // });
  
      downloadStream.on('end', () => {
        bot.sendVideo(chatId, fileName, { caption: 'Here is your video!' });
        // bot.sendMessage(chatId, 'Download complete!');
      });
  
      downloadStream.on('error', (err) => {
        console.error('Error:', err);
        bot.sendMessage(chatId, 'An error occurred while downloading the video.');
      });
    } else {
      bot.sendMessage(chatId, 'Invalid YouTube video link!');
    }
  });
  