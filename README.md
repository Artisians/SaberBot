# SaberBot

# Get Started!

1. npm init -y
2. npm install discord.js
3. npm install mongoose
4. node index.js

# Project Description

Discord is a real-time messaging platform that bills itself as an “all-in-one voice and text
chat for gamers.” Due to its slick interface, ease of use, and extensive features, Discord has
experienced rapid growth and is becoming increasingly popular even among those with little
interest in video games. Between May 2017 and May 2018, its user base exploded from 45 million
users (about twice the population of New York) to more than 130 million, with more than twice
as many daily users as Slack.

One of the most unique features of the multi-level communication platform Discord is its
bots. These bots are AIs that can perform several useful automated tasks on your server, such as
welcoming new members, moderating content, and banning rule breakers. They can also add
music, memes, games, and other content to your server. Discord bots can bring your experience to
the next level whether you are an admin looking for help moderating your server or a user looking
for new ways to interact with fellow server members.

The Discord API consists of two separate pieces: WebSocket and REST APIs. Broadly
speaking, the WebSocket API is used to receive events from Discord in real time, while the REST
API is used to perform actions inside of Discord.

WebSocket API is used to send and receive messages from Discord. It is more limited than
the REST API, which is used for most bot actions. A bot can be present at a maximum of 2,500
servers per WebSocket connection. To allow a bot to be present in more guilds, the bot must
implement sharding and open several separate WebSocket connections. If your bot runs inside of
a single process on a single node, this may seem unnecessary. But if your bot is extremely popular
and needs to have its back-end distributed across separate nodes, Discord's sharding support makes
this much easier than it would be otherwise. The REST API can also be used to query for
information, but bots rely on events from the Web socket instead and catch the information
received from the API. The API can be used by bots to perform most actions, such as sending
messages, kicking/banning users and updating user permissions.

# Cloud Computing Model

Cloud Model Service: The service model we are using is Software as a Service. Discord
(The software we are using) is originally web-based cross-platform software, that was owned by
"Discord Inc". MongoDB as well is a cross-platform database program, that is owned by
"MongoDB Inc", Any user can create an account and gain immediate access on the software, or
database program through the web-browser, or through a client that can be downloaded on any
OS. Users have no control over the underlying cloud infrastructure.

Deployment Model: We are using a Public Cloud Deployment model as all the resources
that are needed to operate the infrastructure are owned (in our case) by "Discord Inc." for the
software, and "MongoDB Inc." for the Database.

# Functions and Services

1. User leveling system
   -A way for users to be more active in chatting by tracking how many messages they sent and
   giving them rewards based on it.

2. Music Player
   -Full-fledged music player where the user can play songs using simple commands

3. Administrative features to manage chat
   -A way to manage users and chat with commands only for administrators! (Lock Chat,
   Ban/Kick/Mute Users, Purge Text)

4. Economy system
   -A text-based role-playing game for users to get their dream job and earn money and go
   against other users!

5. Giveaway system
   -A way for users to host fair and seamless giveaways for others!

6. Color Role system
   -Color based roles for users to make the chat more vibrant and fun!

7. Starboard
   -A way for users to save their most precious memory in chat!

8. Scheduling system
   -A way to create timed events and set alarms/timers to never miss your most important
   moment! All while handling different time zones.

9. Fun commands
   -A set of fun commands to make the chat lively for example (A random picture of a cute cat or
   a cute dog, 8Ball) and much more!

# Economy system:

Consists of a game; allowing the users to have fun by playing it. Where you
register and start with a level one character. Each character will have an inventory in which he can store
items, potions, weapons, and money (which he earns by doing different tasks in the game). The user has
access to optional quests (which he/she has to register as an adventure for), and optional jobs (which
he/she can work on daily, gain money, and get promoted). The character can also buy properties and gain
money from renting, or selling them after a while. The character can also hunt animals, monsters, or even
encounter bandits and be forced to fight them. He can deposit his money in a bank to keep bandits from
stealing it. He/she can also chop wood, fish, cook, collect recipes for weapons or potions, and craft items.
Scheduling System Service: A calendar mock-up service managing multiple events while handling
different time zones, in which the user can create, look up, or subscribe to events. A poll can be created
to decide the event time on a channel by the event creator. The creator is also able to reconfigure or
delete the event.

# User leveling system Service:

A service which handles users' roles in a server, based on their
contribution. The service is preconfigured with a set of rules for leveling up users and setting their roles
based on a points system reflecting their contribution, while also allowing the Admin of the server full
customizability of roles and rules based on preference. The service is used to simplify, and aid in grouping
certain users by the Admins or Mods for any specific purpose.

# The starboard system:

A way for users to save a special moment that happened in chat by using
the command “createstarboard”, you're able to specify which channel you would like to save the posts
inside. The way a post is saved is by "Starring" the post (by reacting to the post with a star). When the
post reaches the set amount of which is configured by using “setstarlimit”, the post is then embedded
inside the selected channel for everyone to go back to.

# Color Role System:

A way for users to pick their favorite color to show off in chat. By simply using
the "coloradd" command, which prompts you to type [Name of the color], and the [Color Hex Code]. It
then adds the color to the color list which is shown by using the "colorlist" command, and selecting the
color from the list by simply writing the "pick [color]".

# Fun Commands:

8-ball Is a service that can answer the user’s questions by sending the question
to the magic ball. The Add emoji service converts the user's message to emojis. The Aesthetics service
converts the user's text to full width. Aww service gives the user a random picture of a cat or dog. The
Bold fancy service makes the messages of the user bold cursive. The coin flip service gives the user the
option to flip a coin. The Clap service can make the user add clapping emojis between a selected
word/user

# Moderation Commands:

1. Ban: Bans a member whether the member is in the server or not
2. Clearwarn: Removes all warnings from a member.
3. Kick: Kicks a member from the server.
4. Mute: Mutes a member for the specified duration if a time is specified, or indefinity.
5. Purge: Mass message delete, or single user!
6. Unban: Unbans a member.
7. Unmute: Unmutes a member.
8. Warn: Warns a member.
9. Warns: Lists all warns.

# Giveaway Commands:

1. Gcreate: Starts the giveaway process by asking the user what item to giveaway, how many
   winners will be selected and how long it will take till the results are announced.
2. Geroll: Rerolls the winner based on the amount you previously set
3. Gend: Ends the giveaway early.

# Music Commands

1. Play: Searches for the requested song by aggregating it from YouTube then downloading it on the
   device, converts the video to mp3, and plays it.
2. Stop: Stops the music from playing.
3. Resume: Resumes music.
4. Next: Skips to the next song in the queue.
5. Queue: Shows the songs in the queue.
