export type FeedItemType = "iss" | "jwst" | "osdr";

export interface FeedItem {
  type: FeedItemType;

  id: string;
  title: string;
  description?: string | null;

  image: string | null;
  url: string | null;

  timestamp: number; 

  data: any; 
}

export interface FeedResponse {
  ok: boolean;
  items: FeedItem[];
}
