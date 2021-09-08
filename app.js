const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Utiliza —> !sortear", {type: 'WATCHING'})
});

let actualEquipo1 = [];
let actualEquipo2 = [];

client.on('message', msg => {
    console.log(actualEquipo1, actualEquipo2);

    if (msg.content === '!sortear') {

        actualEquipo1 = [];
        actualEquipo2 = [];
        try {
            // Direccion del canal de voz
            const vchan = msg.member.voice.channel;

            // Get members of voice channel
            let member_list = [];
            vchan.members.forEach(function (guildMember, _) {
                member_list.push([guildMember.user.username, guildMember.user.id]);
            });

            // Sorteo
            sortear(member_list);

            // Dividir sorteo a la mitad
            let array_half_len = Math.ceil(member_list.length / 2);
            let actualEquipo2 = member_list.splice(0, array_half_len);
            let actualEquipo1 = member_list;

            // Escribir mensaje
            let rosterEquipo2 = [];
            actualEquipo2.forEach(function (value) {
                    rosterEquipo2.push(value[0]);
                    actualEquipo2.push(value[1]);
                }
            );
            let rosterEquipo1 = [];
            actualEquipo1.forEach(function (value) {
                rosterEquipo1.push(value[0]);
                actualEquipo1.push(value[1]);
            });
            // EMBED PLAYER STATS
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor('Valorant S&T', 'https://i.imgur.com/NHO2tvb.png')
                .setDescription(':game_die: [Se han sorteado equipos en el canal '+(vchan.name)+']:game_die:')
                .setThumbnail('https://media-exp1.licdn.com/dms/image/C4D0BAQHuS8RBrw6WWw/company-logo_200_200/0?e=2159024400&v=beta&t=EWnGNJmH6CjdpRhcNai5sOUyxOWu-QJ_WU8T03yjsGc')

                .addField('[    EQUIPO 1    ]', (rosterEquipo1.join("\n ")), true)
                .addField('[    EQUIPO 2    ]', (rosterEquipo2.join("\n ")), true)
                .addField('\u200b', '[ Utiliza !coinflip para lanzar la moneda | Buena suerte! ]', false)

                .setFooter('|                                   Valorant Mix                                   |', 'https://i.imgur.com/NHO2tvb.png')
                .setTimestamp()


            msg.channel.send(exampleEmbed);
            /*
            msg.channel.send("\n :game_die: __** RESULTADO **__ :game_die: ");
            msg.channel.send("\n__**Equipo 1:**__ " + rosterEquipo1.join(", "));
            msg.channel.send("\n__**Equipo 2:**__ " + rosterEquipo2.join(", "));
            */
        } catch (res) {
            console.log(res);
            msg.reply("tenes que estar en un canal de voz con más de una persona :no_entry: ")
        }
      }
});

function sortear(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

client.login(' TOKEN ');

