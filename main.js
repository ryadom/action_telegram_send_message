const axios = require('axios');
const github = require('@actions/github');
const core = require('@actions/core');

async function send_message(token, chatId, text) {
    return axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: 'True',
    })
}

function escape(text) {
    if (!text) {
        return ''
    }
    text = String(text);
    for (let c of '.-{}=()_*[]~`>#+|!') {
        text = text.replaceAll(c, '\\' + c);
    }
    return text;
}

(async function run() {
    try {
        const telegramToken = core.getInput('token');
        const chatId = core.getInput('chat');
        const message = core.getInput('message');
        await send_message(telegramToken, chatId, message);    
    } catch (error) {
      if (error.response.data) {
        core.info(error.response.data);
      }
      core.setFailed(error.message);
    }
  })();
