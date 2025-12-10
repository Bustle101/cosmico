import time
import os
from fetcher import fetch_events
from writer import write_csv

PERIOD = int(os.getenv("GEN_PERIOD_SEC", "300"))

def main():
    while True:
        try:
            events = fetch_events()
            write_csv(events)
        except Exception as e:
            print("[ERROR]", e)
        time.sleep(PERIOD)

if __name__ == "__main__":
    main()
