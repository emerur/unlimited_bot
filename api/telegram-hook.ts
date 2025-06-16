import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN; // Replace with your bot token
const SECRET_HASH = "32e58fbahey833349df3383dc9132e180"; // Replace with your own secret hash
///api.telegram.org/bot{token}/setWebhook?url={url}/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180
//api.telegram.org/bot{token}setWebhook?url=https://mobile-proxies.vercel.app/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  const message = `
🚀 *Welcome to Unlimited Bot!*

Get instant access to fast, secure, and reliable internet tools — made for productivity, testing, and peace of mind.

Choose an option below to begin:
  `;

  await ctx.reply(message, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "📘 Learn More", callback_data: "learn_more" }],
        [{ text: "💡 Try Free Sample", callback_data: "try_sample" }],
        [{ text: "🔓 Unlock Full Access", callback_data: "view_plans" }],
        [{ text: "🛟 Support", callback_data: "support" }],
      ],
    },
  });
});

// Learn More
bot.action("learn_more", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `📘 *About Unlimited Bot*:

Unlimited gives you tools to enhance speed, connectivity, and control across your favorite apps and platforms.

• Reliable global access  
• Simple setup, zero hassle  
• Flexible plans to match your goals

Your gateway to smoother digital performance.`,
    { parse_mode: "Markdown" }
  );
});

// Try Free Sample
bot.action("try_sample", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `🎁 *Free Sample Credentials:*

\`\`\`
Host: 149.56.23.129  
Port: 1080  
Username: demo_user  
Password: unlimited
\`\`\`

This is a limited trial — speed and uptime may vary.

For full access and premium performance, tap *Unlock Full Access* above.`,
    { parse_mode: "Markdown" }
  );
});

// View Paid Plans
bot.action("view_plans", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `💼 *Unlimited Plans*:

🔸 *Starter* — \$5/month  
   Reliable access for light users

🔸 *Performance* — \$10/month  
   Multi-location · Optimized for speed

🔸 *Ultimate* — \$20/month  
   Global coverage · Max bandwidth · VIP Support

All plans include 24/7 assistance and instant setup instructions.`,
    { parse_mode: "Markdown" }
  );
});

// Support
bot.action("support", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply(
    `🛟 *Need Help?*

Our team is here to support you.  
Contact us anytime at: @chaser_v6`
  );
});

// Webhook handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    if (query.setWebhook === "true") {
      const webhookUrl = `${process.env.VERCEL_URL}/api/telegram-hook?secret_hash=${SECRET_HASH}`;
      const success = await bot.telegram.setWebhook(webhookUrl);
      console.log("Webhook set:", webhookUrl, success);
    }

    if (query.secret_hash === SECRET_HASH) {
      await bot.handleUpdate(body);
    }
  } catch (err) {
    console.error("Unlimited Bot Error:", err);
  }

  res.status(200).send("OK");
};
