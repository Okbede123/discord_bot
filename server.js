/*
	Cross-Game Chatter v1.6
	By thEsp - https://github.com/x-Eagle-x/Cross-Game-Chatter
*/



const port = 1337;
const targetChannels = ["1095338133320630373"]; // (channel INDEX)
const inputChannels = ["ALL"]; // (channel INDEX) leave it so for all, put respectable indexes for specific channels

const auth = require("./auth.json");
const net = require("net");
const discord = require("discord.js");

require("events").EventEmitter.prototype._maxListeners = 0;

const bot = new discord.Client({token: auth.token, autorun: true});
bot.login(auth.token);


var messagesend;

var checkUnban;

function calltest(messagesend)
{
	const url = "https://discord.com/api/channels/1095338133320630375/messages";
	const data = { content: messagesend, embeds: null};
	fetch(url, {
	method: "POST",
	headers: {
	"Content-Type": "application/json",
	"Authorization": "Bot MTA5Njc0NTUxNTk3MjA1NTEzMg.GKPh64.kSAEIgYW1hCZSAcagZc3US9hjR86RO6dNecZBI"
	},
	body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error));	
}

function calltest_baocao()
{
	const url = "https://discord.com/api/webhooks/1096711915788574780/UdG5lbUaF7Q3p5RuUzvRbHHGgdSe4YZhgyo6lFVGJYQMdzD8yJOjgCT0xsfjICPF6DCX";
	const data = { content: messagesend, embeds: null};
	fetch(url, {
	method: "POST",
	headers: {
	"Content-Type": "application/json"
	},
	body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error));	
}

                            
function initializeServer()
{

	var server = net.createServer(function(socket)
	{
		socket.on("data", function(data)
		{
			messagesend = data.toString('utf8');

			if (messagesend.startsWith("Map"))
			{
    				bot.user.setStatus("online");
    				bot.user.setPresence({
        				game: {
            					name: messagesend,
            					type: "Playing",
            					afk: false,
            					url: "https://discord.gg/7F73sCMUYq"
        				}
				});
				calltest_baocao();
			}
			else
			{
				
				try{	
					
					calltest(messagesend);
				}
				catch{
					console.log(messagesend)
				}

				
			}
		});
		
		socket.on("close", function()
		{
			server.close()
		});
		
		bot.on("message", function sendMessage(msg)
		{
			if (msg.author.id == 1096711501655593053 || (inputChannels[0] != "ALL" && !inputChannels.includes(msg.channel.id))|| msg.author.id ==1096711915788574780 || msg.author.id == 1096745515972055132)
				return;
			
			if(msg.content.startsWith("admin") || msg.content.startsWith("Admin"))
			{
				socket.write(msg.content.substring(6,msg.content.length));
			}
		
			else if(msg.content.toLowerCase().startsWith("bot_unban") && !msg.author.bot)
			{
				checkUnban = "amx_unban " + msg.content.substring(9,msg.content.length);
				socket.write(checkUnban);
				console.log(checkUnban)
				msg.channel.send("đã unban cho ip :"+msg.content.substring(9,msg.content.length))
			}
			else if (msg.content.toLowerCase().startsWith("chơi thế nào")){
				msg.reply("xem link này bạn nhé https://www.quangcaogiatot.com/2023/10/huong-dan-add-ip-vao-server-game.html")
			}

			else if (msg.content.toLowerCase().includes("mua súng kiểu gì")){
				msg.reply("mua súng xem video này bạn nhé https://www.youtube.com/shorts/WpEfRHK2sPI")
			}			
		
			else
			{
				socket.write("(&x03" + msg.author.username + "&x01 - &x03#" + msg.channel.name + "&x01): &x04" + msg.content);	
			}
			
		});

		bot.on('guildMemberAdd', (member) => {
			console.log(member.displayName)
			calltest("xin chào" + member.displayName)
		
		   });
	});

	server.listen(port, "127.0.0.1");
}



initializeServer();
