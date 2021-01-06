const commandPrefixSchema = require("../schemas/command-prefix-schema");
const { prefix: globalPrefix } = require("../config.json");
const guildPrefixes = {};

const validatePermissions = (permissions) => {
  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`);
    }
  }
};

let recentlyRan = [];

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = "",
    permissionError = "You do not have permission to run this command.",
    minArgs = 0,
    maxArgs = null,
    cooldown = -1,
    requiredChannel = "",
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;

  if (typeof commands === "string") {
    commands = [commands];
  }

  console.log(`Registering command "${commands[0]}"`);

  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  client.on("message", async (message) => {
    const { member, content, guild, channel } = message;

    const prefix = guildPrefixes[guild.id] || globalPrefix;

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`;

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        if (requiredChannel && requiredChannel !== channel.name) {
          const foundChannel = guild.channels.cache.find((channel) => {
            return channel.name === requiredChannel;
          });

          message.reply(
            `You can only run this command inside of <#${foundChannel.id}>.`
          );
          return;
        }

        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError);
            return;
          }
        }

        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          );

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `You must have the "${requiredRole}" role to use this command.`
            );
            return;
          }
        }

        let cooldownString = `${guild.id}-${member.id}-${commands[0]}`;

        if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
          message.reply("You cannot use that command so soon, please wait.");
          return;
        }

        const arguments = content.split(/[ ]+/);

        arguments.shift();

        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          message.reply(
            `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
          );
          return;
        }

        if (cooldown > 0) {
          recentlyRan.push(cooldownString);

          setTimeout(() => {
            console.log("Before:", recentlyRan);

            recentlyRan = recentlyRan.filter((string) => {
              return string !== cooldownString;
            });

            console.log("After:", recentlyRan);
          }, 1000 * cooldown);
        }

        // Handle the custom command code
        callback(message, arguments, arguments.join(" "), client);

        return;
      }
    }
  });
};

module.exports.updateCache = (guildId, newPrefix) => {
  guildPrefixes[guildId] = newPrefix;
};

module.exports.loadPrefixes = async (client) => {
  for (const guild of client.guilds.cache) {
    const guildId = guild[1].id;

    const result = await commandPrefixSchema.findOne({ _id: guildId });
    guildPrefixes[guildId] = result ? result.prefix : globalPrefix;
  }

  console.log(guildPrefixes);
};
