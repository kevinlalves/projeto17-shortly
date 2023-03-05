import { Url } from './url.js';

export type User = {
  id: number;
  name: string;
  visitCount: number;
  linksCount?: number;
  shortenedUrls?: Url[];
};
