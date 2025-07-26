import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN; // Replace with your bot token
// const SECRET_HASH = "32e58fbahey833349df3383dc9132e180"; // Replace with your own secret hash
///api.telegram.org/bot{token}/setWebhook?url={url}/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180
//api.telegram.org/bot{token}setWebhook?url=https://mobile-proxies.vercel.app/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180

const bot = new Telegraf(BOT_TOKEN);

// Handle the /start command
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const channelUrl = "t.me/frostyproxx";
  const targetUrl = "t.me/+0_BakK1clqYwOWE0";

  // Welcome message with Markdown formatting
  const reply = `
Unlock Proven Money-Making Secrets for FREE!

Are you tired of falling for scams and get-rich-quick schemes? Look no further! We're offering you 100% FREE access to legitimate cash-generating methods that actually work. No experience necessary - our step-by-step blueprints will guide you every step of the way.

Here's what you'll discover inside:

• Proven Bank Log, Cashapp  & CC Methods
• Unemplyment Benefits
• Giveaways

And the best part? It's all completely FREE! No hidden costs, no signups, and no catch!

🔗 [Join Here](${targetUrl})
`;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Join Proxies & VPNs Channel",
              url: channelUrl,
            },
          ]
        ],
      },
    });
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}
export async function sendImageCommand(ctx) {
  const media = [
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/emerur/unlimited_bot/main/photo_5767148091135348164_w.jpg",
    },
    {
      type: "photo",
      media:
        "https://raw.githubusercontent.com/emerur/unlimited_bot/main/photo_5773649262872217794_y.jpg",
    },
    
  ];
  // Send image first
  await ctx.replyWithMediaGroup(media);
}

// Register the /start command handler
bot.command("start", async (ctx) => {
  // Send image first
  await sendImageCommand(ctx);
  await handleStartCommand(ctx);
});

// Webhook handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    if (query.setWebhook === "true") {
      const webhookUrl = `${process.env.WEBHOOK_URL}`;
      const success = await bot.telegram.setWebhook(webhookUrl);
      // console.log("Webchook set:", webhookUrl, success);
      return res.status(200).send("OK");
    }

    
      await bot.handleUpdate(body);
    return res.status(200).send("OK");
  } catch (err) {
     return res.json({ error: "Internal server error" }, { status: 500 })
  }

  // res.status(200).send("OK");
};
