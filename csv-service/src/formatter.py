from datetime import datetime

def to_ts(iso: str) -> int:
    return int(datetime.fromisoformat(iso.replace("Z", "+00:00")).timestamp())

def bool_ru(v: bool) -> str:
    return "ИСТИНА" if v else "ЛОЖЬ"

def normalize_event(e: dict):
    return {
        "event_id": e["id"],
        "event_type": e["type"],
        "start_ts": to_ts(e["start"]),
        "end_ts": to_ts(e["end"]) if e.get("end") else "",
        "visible": bool_ru(e["visible"]),
        "magnitude": e.get("magnitude", "")
    }
