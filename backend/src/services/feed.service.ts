import { getIssService } from "./iss.service";
import { getJwstImagesService } from "./jwst.service";
import { getOsdrService } from "./osdr.service";

export async function getFeedService(limit: number = 20) {
  const feed: any[] = [];

  // ==== ISS ====
  try {
    const iss = await getIssService();

    if (!iss.error) {
      feed.push({
        type: "iss",
        id: "iss-latest",
        title: "ISS — Latest Telemetry",
        description: "Most recent ISS position and tracking data",
        image: null,
        url: null,
        timestamp: iss.fetched_at ? new Date(iss.fetched_at).getTime() : Date.now(),
        data: iss
      });
    }
  } catch (e) {
    console.log("[FEED] ISS error:", e);
  }

  // ==== JWST ====
  try {
    const jwst = await getJwstImagesService(limit);
    const images = jwst.items || jwst || [];

    if (images.length) {
      images.forEach((img: any) =>
        feed.push({
          type: "jwst",
          id: img.id,
          title: img.title,
          description: img.description || "",
          image: img.thumbnail_url || img.url,
          url: img.url,
          timestamp: img.captured_at
            ? new Date(img.captured_at).getTime()
            : Date.now() - 1000,
          data: img
        })
      );
    }
  } catch (e) {
    console.log("[FEED] JWST error:", e);
  }

  // ==== OSDR ====
  try {
    const osdr = await getOsdrService(limit);

    if (osdr.items?.length) {
      osdr.items.forEach((ds: any) =>
        feed.push({
          type: "osdr",
          id: ds.id,
          title: ds.title,
          description: ds.description,
          image: ds.image || null,
          url: ds.url,
          timestamp: Date.now() - 2000, // OSDR не имеет точного timestamp → ставим стабильный
          data: ds
        })
      );
    }
  } catch (e) {
    console.log("[FEED] OSDR error:", e);
  }

  // ==== SORT FEED ====
  feed.sort((a, b) => b.timestamp - a.timestamp);

  return { ok: true, items: feed.slice(0, limit) };
}
