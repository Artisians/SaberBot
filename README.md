# SaberBot

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
