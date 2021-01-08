const ytdl = require("ytdl-core-discord");
global.queue = new Map();
const { Util } = require("discord.js");
module.exports = {
  commands: ["play"],
  minArgs: 1,
  expectedArgs: "<Link>",
  requiredRoles: ["Member"],
  callback: async (message, args) => {
    const Discord = require("discord.js");
    global.serverQueue = queue.get(message.guild.id);
    const voiceChannel = message.member.voice.channel;
    module.exports = { constToExport: serverQueue };

    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }

    const songInfo = await ytdl.getInfo(args[0]);
    const song = {
      id: songInfo.videoDetails.video_id,
      title: Util.escapeMarkdown(songInfo.videoDetails.title),
      url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };
      queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.log(error);
        queue.delete(message.guild.id);
        return message.channel.send(error);
      }
    } else {
      serverQueue.songs.push(song);
      const nowPlayingEmbed = new Discord.MessageEmbed()
        .setTitle("🎧 Saber 🎧")
        .setColor("BLUE")
        .setDescription(`${song.title} has been added to the queue!`);
      message.channel.send({
        embed: nowPlayingEmbed,
      });
    }

    async function play(guild, song) {
      const serverQueue = queue.get(guild.id);
      const startPlayingEmbed = new Discord.MessageEmbed()
        .setTitle("🎧 Saber 🎧")
        .setColor("BLUE")
        .setDescription(`🎶 Now playing: ${serverQueue.songs[0].title}`);
      message.channel.send({
        embed: startPlayingEmbed,
      });
      if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
      }
      const dispatcher = serverQueue.connection
        .play(await ytdl(song.url), { type: "opus" })
        .on("finish", () => {
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", (error) => {
          console.log(error);
        });
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    }
  },
};
