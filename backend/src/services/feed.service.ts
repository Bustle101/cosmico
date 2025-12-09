import { FeedItem, FeedResponse } from "../domain/feed.types";

import { getIssService } from "./iss.service";
import { getJwstImagesService } from "./jwst.service";
import { getOsdrService } from "./osdr.service";

export async function getFeedService(limit: number = 20): Promise<FeedResponse> {
  const feed: FeedItem[] = [];


  try {
    const iss = await getIssService();
    if (!iss.error) {
      feed.push({
        type: "iss",
        id: "iss-latest",
        title: "ISS — Latest Telemetry",
        description: `Current position of the International Space Station`,
        image: null,
        url: null,
        timestamp: iss.fetched_at ? new Date(iss.fetched_at).getTime() : Date.now(),
        data: iss
      });
    }
  } catch (err) {
    console.log("[FEED] ISS error:", err);
  }

 
  const jwstLimit = Math.floor(limit / 2);
  const osdrLimit = limit - jwstLimit; 


  try {
    const jwst = await getJwstImagesService(jwstLimit);
    const images = jwst.items || jwst || [];

    images.slice(0, jwstLimit).forEach((img: any) => {
      feed.push({
        type: "jwst",
        id: img.id,
        title: img.title || "JWST Image",
        description: img.description || "",
        image: img.thumbnail_url || img.url || null,
        url: img.url || null,
        timestamp: img.captured_at
          ? new Date(img.captured_at).getTime()
          : Date.now() - 1000,
        data: img
      });
    });
  } catch (err) {
    console.log("[FEED] JWST error:", err);
  }

  try {
    const osdr = await getOsdrService(osdrLimit);
    const datasets = osdr.items || [];

    datasets.slice(0, osdrLimit).forEach((ds: any) => {
      feed.push({
        type: "osdr",
        id: ds.id,
        title: ds.title,
        description: ds.description,
        image: ds.image || null,
        url: ds.url,
        timestamp: Date.now() - 2000,
        data: ds
      });
    });
  } catch (err) {
    console.log("[FEED] OSDR error:", err);
  }


  feed.sort((a, b) => b.timestamp - a.timestamp);

  return { ok: true, items: feed };
}
