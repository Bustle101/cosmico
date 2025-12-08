export type FeedItemType = "iss" | "jwst" | "osdr";

export interface FeedItem {
  type: FeedItemType;

  id: string;
  title: string;
  description?: string | null;

  image: string | null;
  url: string | null;

  timestamp: number; // unix ms для сортировки

  data: any; // оригинальные данные (для detail-страниц)
}

export interface FeedResponse {
  ok: boolean;
  items: FeedItem[];
}
