import requests
import os

BACKEND_URL = os.getenv("BACKEND_URL", "http://backend:3000")

def fetch_events():
    url = f"{BACKEND_URL}/api/astro/events"
    r = requests.get(url, timeout=10)
    r.raise_for_status()

    result = r.json()
    if not result.get("ok", False):
        raise RuntimeError("Backend returned ok=false")

    return result["data"]["events"]
