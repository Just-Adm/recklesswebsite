# Reckless | ريكليس

A roleplay community website for the Reckless server. It explains the server rules and systems, shows live community stats, and includes application forms for staff and job roles.

**Live:** https://YOUR-USERNAME.github.io/reckless/

## What it is

Reckless is a small website that introduces the server to new players. It helps you:

- Read the server rules: roleplay rules, general rules, the warning system, and the rules for crime, jobs, police, EMS, justice, and media.
- See community stats (members and players) pulled live from Discord.
- Apply for staff positions through a built-in form.
- Join the Discord with one click.
- Use it in Arabic with full right-to-left support, on both phone and desktop.

## Design

The site uses a dark, clean layout with a full-screen background video, rounded cards, and smooth expanding sections for the rules. The navigation collapses into a menu on phones.

## Privacy

The site has no user accounts. Application forms are sent to a Discord channel. Stats are read from the Discord server through the bot, and no personal data is stored on the site itself.

## Project layout

| Folder | What's inside |
|---|---|
| `public/` | The served site: home page, images, main stylesheet |
| `pages/` | Rules, Store, and Applications pages |
| `css/` | Stylesheets for the sub-pages |
| `images/` | Logos, banners, and the background video |
| `server.js` | Express server, Discord bot, and the `/stats` endpoint |

## Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   DISCORD_TOKEN=your_bot_token
   DISCORD_CLIENT_ID=your_client_id
   DISCORD_CLIENT_SECRET=your_client_secret
   ```

3. Start the server:

   ```bash
   node server.js
   ```

4. Open http://localhost:3000

The bot needs the `Guilds` and `GuildMembers` intents for the stats to work.

## Security

- Never commit `.env`. Add it to `.gitignore` along with `node_modules/`.
- If a token or secret was ever shared publicly, regenerate it in the Discord Developer Portal.

## License

For use by the Reckless server only.
