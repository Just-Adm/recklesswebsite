require('dotenv').config();

const express = require('express');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = 3000;

// =====================
// STATIC FILES
// =====================
app.use(express.static(path.join(__dirname, 'public')));

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =====================
// CONFIG (من .env)
// =====================
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/auth/discord/callback';

const GUILD_ID = '1457368980829372429';
const PLAYER_ROLE_ID = '1458248560406696093';

// =====================
// DISCORD BOT
// =====================
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);

// =====================
// STATS API
// =====================
app.get('/stats', async (req, res) => {
    try {
        const guild = await client.guilds.fetch(GUILD_ID);

        let members;
        try {
            members = await guild.members.fetch();
        } catch {
            members = guild.members.cache;
        }

        const totalMembers = guild.memberCount;

        const players = members.filter(m =>
            m.roles.cache.has(PLAYER_ROLE_ID)
        ).size;

        res.json({
            members: totalMembers,
            players: players
        });

    } catch (err) {
        res.status(500).json({ error: 'failed' });
    }
});

// =====================
// DISCORD LOGIN (OAuth)
// =====================

// تحويل المستخدم لديسكورد
app.get('/auth/discord', (req, res) => {
    const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
    res.redirect(url);
});

// callback (تسجيل دخول بسيط)
app.get('/auth/discord/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) return res.send('No code provided');

    res.send('Logged in successfully (you can تطوير هذا لاحقًا لربط الحساب)');
});

// =====================
// START SERVER
// =====================
app.listen(PORT, () => {
    console.log(`🌐 Server running: http://localhost:${PORT}`);
});

// =====================
// BOT LOGIN
// =====================
client.login(TOKEN);