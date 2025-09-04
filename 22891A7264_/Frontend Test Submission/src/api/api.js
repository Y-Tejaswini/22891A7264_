import { Log } from '../utils/logger';

export async function shortenURL(payload) {
  try {
    await Log('frontend','debug','api','shortenURL called');
    await new Promise(r => setTimeout(r, 400));
    const code = (Math.random().toString(36).slice(2,8)).toLowerCase();
    await Log('frontend','info','api',`shortenURL success for ${payload.longUrl} -> ${code}`);
    return { shortcode: code, shortUrl: `http://localhost:3000/${code}`, ...payload };
  } catch (err) {
    await Log('frontend','error','api','shortenURL failed');
    throw err;
  }
}
