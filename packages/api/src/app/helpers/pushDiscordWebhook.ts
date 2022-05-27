import axios from 'axios';
import log from './logger';
const { DISCORD_WEBHOOK_URL } = process.env;

//See https://discord.com/developers/docs/resources/channel#embed-object
interface WebhookBody {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: string;
}
interface WebhookEmbeds {
  embeds: WebhookBody[];
}

export const pushDiscordWebhook = async (webhook_body: WebhookBody) => {
  log.info('[WEBHOOK] New push on discord');
  await axios.post(
    DISCORD_WEBHOOK_URL,
    JSON.stringify({ embeds: [{ ...webhook_body }] }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const pushDiscordWebhooks = async (webhook_embeds: WebhookEmbeds) => {
  log.info('[WEBHOOK] New push on discord');
  await axios.post(DISCORD_WEBHOOK_URL, JSON.stringify(webhook_embeds), {
    headers: { 'Content-Type': 'application/json' },
  });
};
