import qrcode from "qrcode-terminal"
import { Client, LocalAuth } from "whatsapp-web.js";

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
});

client.on('ready', () => {
    console.log('client sudah ready!!!');
});

client.on('message', async (msg) => {
    if(msg.body.startsWith('!sticker') && msg.type === 'image'){
        const media = await msg.downloadMedia();

        client.sendMessage(msg.from, media, {
            sendMediaAsSticker: true,
            stickerAuthor: 'my-Bot',
            stickerName: 'alia',
        });
    }
});

client.initialize();