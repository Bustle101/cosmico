import csv
import os
from datetime import datetime
from formatter import normalize_event

OUT_DIR = os.getenv("CSV_OUT_DIR", "/data/csv")

def write_csv(events: list):
    os.makedirs(OUT_DIR, exist_ok=True)

    ts = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    filename = f"astro_{ts}.csv"
    fullpath = os.path.join(OUT_DIR, filename)

    with open(fullpath, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)

        # CSV header
        w.writerow(["event_id", "event_type", "start_ts", "end_ts", "visible", "magnitude"])

        # rows
        for e in events:
            n = normalize_event(e)
            w.writerow(n.values())

    print(f"[CSV] {fullpath}")
    return fullpath
