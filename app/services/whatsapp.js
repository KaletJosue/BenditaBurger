import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const { Client, LocalAuth } = pkg;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el código QR con WhatsApp Web para iniciar sesión');
});

client.on('ready', () => {
    console.log('Cliente WhatsApp Web listo');
});

client.initialize();

export const sendWhatsAppMessage = async (numero, mensaje) => {
    try {
        const chatId = `${numero}@c.us`;
        await client.sendMessage(chatId, mensaje);
    } catch (error) {
        console.error('❌ Error enviando mensaje:', error.message);
    }
};
