module.exports = {
  command: ["احزر"],
  description: "احزر الرقم من 1 إلى 5",
  category: "games",
  react: "🎲",
  async run(m, { conn }) {
    const number = Math.floor(Math.random() * 5) + 1;
    m.reply("احزر رقم من 1 إلى 5");
    const filter = (msg) => msg.key.remoteJid === m.chat && !msg.key.fromMe;
    const collector = conn.createMessageCollector(m.chat, filter, { time: 15000 });

    collector.on("collect", (msg) => {
      if (msg.message.conversation === number.toString()) {
        conn.sendMessage(m.chat, { text: "🎉 صح عليك!" });
      } else {
        conn.sendMessage(m.chat, { text: `❌ غلط، الرقم كان ${number}` });
      }
      collector.stop();
    });

    collector.on("end", () => {
      // انتهى الوقت
    });
  }
    }
