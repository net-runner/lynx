import axios from 'axios';
const { DISCORD_WEBHOOK_URL } = process.env;

//See https://discord.com/developers/docs/resources/channel#embed-object
interface WebhookBody {
  embeds: {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: string;
  }[];
}

export default async function (webhook_body: WebhookBody) {
  console.log('[WEBHOOK] New push on discord');
  await axios.post(DISCORD_WEBHOOK_URL, JSON.stringify(webhook_body), {
    headers: { 'Content-Type': 'application/json' },
  });
}