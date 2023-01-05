"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
});
client.on('qr', (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('client sudah ready!!!');
});
client.on('message', async (msg) => {
    if (msg.body.startsWith('!sticker') && msg.type === 'image') {
        const media = await msg.downloadMedia();
        client.sendMessage(msg.from, media, {
            sendMediaAsSticker: true,
            stickerAuthor: 'my-Bot',
            stickerName: 'alia',
        });
    }
});
client.initialize();
