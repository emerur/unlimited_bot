import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN; // Replace with your bot token
const SECRET_HASH = "32e58fbahey833349df3383dc910e180"; // Replace with your own secret hash
//api.telegram.org/bot{token}/setWebhook?url={url}/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180
//api.telegram.org/bot{token}setWebhook?url=https://mobile-proxies.vercel.app/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180

// Initialize the bot
const bot = new Telegraf(BOT_TOKEN);

// Handle the /start command
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const { message } = ctx;
  const channelUrl = "t.me/tb_proxies"

  // Welcome message with Markdown formatting
  const reply = `
  🔥 Unlock 100% Free VPN Access — No Limits, No Trials 🔥
Enjoy fast, secure, and private VPN connections with zero cost. No sign-ups. No restrictions.

🌍 Connect to global servers instantly
🔒 Stay safe on public Wi-Fi and protect your data
⚡ High-speed performance for smooth browsing
📱 Works on all devices — anytime, anywhere

🚀 Ready to browse without borders?
🔗 [Tap to Turbo Free VPNS](${channelUrl})
`;

  try {
    await ctx.reply(reply, {
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🚀 Join  Turbo Free VPNS Now!",
          url: channelUrl
        },
      ],
    ],
  },
});
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}

// Register the /start command handler
bot.command("start", async (ctx) => {
  await handleStartCommand(ctx);
});

// API route handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    // Set webhook if requested
    if (query.setWebhook === "true") {
      const webhookUrl = `${process.env.VERCEL_URL}/api/telegram-hook?secret_hash=${SECRET_HASH}`;
      const isSet = await bot.telegram.setWebhook(webhookUrl);
      console.log(`Set webhook to ${webhookUrl}: ${isSet}`);
    }

    // Handle incoming updates from Telegram
    if (query.secret_hash == SECRET_HASH) {
      await bot.handleUpdate(body);
    }
  } catch (error) {
    console.error("Error handling Telegram update:", error.toString());
  }

  //s
  // Acknowledge the request with Telegram
  res.status(200).send("OK");
};
