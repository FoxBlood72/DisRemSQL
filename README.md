# DisRemSQL
## What is DisRemSQL
DisRemSQL is a Discord bot that can be used to manage MySQL servers. This project was made for managers of databases that wants to run SQL commands directly from Discord.

## Table of Contents
[Installations and Configurations]()

[Warnings]()

[Recommendations]()

[Commands Usage]()

[Commands Descriptions]()

[Contributing]()

## Installation and Configuration
In order to run this discord bot you have to install Nodejs. You can download it from here: https://nodejs.org/en/download/ 

After the installation is complete check if "node" command works in your terminal/command promt.

Download the repository from this project https://github.com/FoxBlood72/DisRemSQL.

Configuration file is "config.json", it includes prefix(by default @) and bot token. You can generate a bot token from here: https://discord.com/developers/
Running the bot is simple, navigate to your directory where you saved the project and run "node ." command. (You have to configure it first by adding discord bot token)

## WARNINGS!
This discord bot is not the perfect one since you have to place your mysql server password in plaintext. I will try to fix this problem by adding a 3rd party website.

Currently, the bot does not support roles and permission, means that everyone that are into a guild(discord server) can execute any command they want.
## RECOMMENDATIONS
Use this bot in a private server and in a private room, do not let other people that you do not trust to join your discord server.

Give permission for the bot to manages messages for automaticaly deleting messages that you do not want.

## Usage and Description of Commands 

### Usage
```
@help
@addserver <ip>:<port> <username> <password>
@shsv
@shdb <key>
@chdb <key> <database_name>
@chcon <key>
@session
@rmsv <key>
@sql <MySQL syntax>
```
  
### Description
@addserver - adds a new mysql server to a guild, if you want to automaticaly delete the message give this permission to the bot "Manage Messages"

@shsv - (Show servers) display all mysql servers from a guild

@shdb - (Show databases) show all databases from a server

@chdb - (Change database) changes the databases from a server

@chcon - (Change connection) changes the mysql server that you want to run sql commands

@session - shows the current mysql server that you are using

@rmsv - (Remove server) removes mysql server by key

@sql - executes an sql command to the current session. Remember to use @chdb and @chcon before using this command

#### What is key?
The key is provided by discord bot once you added a new mysql server. You can view all your keys by using @shsv command

## Contributing
If you have better code, features or even sugestions you can contact me here on github by opening a new "Pull request", or you can contact me on my Discord: FoxBlood#9801





