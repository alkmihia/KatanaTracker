const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode-terminal');
const path = require('path');

class Wpp {

  /**
   * @param {string} clientId
   */

  constructor(clientId = "katana") {

    this.isClientReady = false;
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: clientId,
        dataPath: "./src/whats/sessions"
      })
    });

    this.initializeEvents();
    this.client.initialize();
  }
  
  async isReady() {
    return this.isClientReady;
  }

  // Eventos!
  initializeEvents() {
    this.client.on('ready', () => {
      this.isClientReady = true;
      console.log('Cliente WhatsApp está pronto!');
    });

    this.client.on('authenticated', () => {
      console.log('Cliente autenticado com sucesso!');
    });

    this.client.on('disconnected', (reason) => {
      this.isClientReady = false;
      console.log(`Cliente desconectado. Motivo: ${reason}`);
    });

    this.client.on('qr', (qr) => {
      if (!this.isClientReady) {
        console.log('QR Code gerado. Escaneie para autenticar:');
        QRCode.generate(qr, { small: true });
      }
    });

    this.client.on('auth_failure', (error) => {
      console.error('Falha na autenticação:', error.message);
    });
  }

  async checkIfNumberExists(number) {
    try {
      const chatId = `${number}@c.us`;
      const numberId = await this.client.isRegisteredUser(chatId);
      return numberId;

    } catch (error) {
      console.error('Erro ao verificar o número:', error.message);
      //throw new Error('Erro ao verificar o número no WhatsApp.');
      return false;
    }
  }

  async checkAllNumbersIfExists(listNumbers) {
    try {
      const promises = listNumbers.map(number => 
        this.client.isRegisteredUser(`${number}@c.us`).then(exists => ({
          number,
          exists,
        }))
      );

      const results = await Promise.all(promises);
      return results.filter(result => result.exists).map(result => result.number);
    } catch (error) {
      console.error("Error checking numbers:", error);
      return [];
    }
  }

  // async checkAllNumbersIfExists(listNumbers) {
  //   try {
  //     const r = []
  //     for (let i = 0; i < listNumbers.length; i++) {
  //       let exist = await this.client.isRegisteredUser(`${listNumbers[i]}@c.us`);
  //       if (exist) {
  //         r.push(listNumbers[i])
  //       }
  //     }

  //     return r;
  //   } catch {
  //     return []
  //   }
  // }
  
}

module.exports = Wpp;