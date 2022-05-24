import axios from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
export type FResponse<T> = [error: string | null, data: T | null];

export const fetcher = async <T>(url: string): Promise<FResponse<T>> => {
  try {
    const data: T = await axios.get(url, { withCredentials: true });
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};

export const fetcherSSR = async <T>(
  req: IncomingMessage,
  res: ServerResponse,
  url: string
): Promise<FResponse<T>> => {
  try {
    const data: T = await axios.get(url, {
      headers: { cookie: req.headers.cookie },
    });
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};
