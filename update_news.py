"""Builds news.json for the Morning Paper from Google News RSS (no API key needed).
Runs every morning via .github/workflows/news.yml. Uses only Python's standard library."""
import json, os, re, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone

IST = timezone(timedelta(hours=5, minutes=30))
Q = "hl=en-IN&gl=IN&ceid=IN:en"
FEEDS = [
    ("India", f"https://news.google.com/rss/headlines/section/topic/NATION?{Q}"),
    ("Himachal", f"https://news.google.com/rss/search?q=Himachal+Pradesh+when:2d&{Q}"),
    ("World", f"https://news.google.com/rss/headlines/section/topic/WORLD?{Q}"),
    ("Tech & AI", f"https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?{Q}"),
    ("Science", f"https://news.google.com/rss/headlines/section/topic/SCIENCE?{Q}"),
]
PER_SECTION = 4
OUT = os.path.join(os.path.dirname(__file__), "..", "news.json")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (LattePlanner morning paper)"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read()


def items(url):
    root = ET.fromstring(fetch(url))
    out, seen = [], set()
    for it in root.iter("item"):
        title = (it.findtext("title") or "").strip()
        src = (it.findtext("source") or "").strip()
        link = (it.findtext("link") or "").strip()
        if not title or not link:
            continue
        if src and title.endswith(" - " + src):
            title = title[: -len(" - " + src)]
        key = re.sub(r"\W+", "", title.lower())[:60]
        if key in seen:
            continue
        seen.add(key)
        out.append({"headline": title, "summary": "", "source": src or "Google News", "url": link})
        if len(out) >= PER_SECTION:
            break
    return out


def main():
    try:
        old = {s["title"]: s for s in json.load(open(OUT)).get("sections", [])}
    except Exception:
        old = {}
    sections, fresh = [], 0
    for title, url in FEEDS:
        try:
            got = items(url)
            fresh += 1
        except Exception as e:  # keep yesterday's stories for this section rather than an empty box
            print(f"{title}: {e}")
            got = old.get(title, {}).get("items", [])
        if got:
            sections.append({"title": title, "items": got})
    if not fresh:
        raise SystemExit("Couldn't reach any news feed; keeping yesterday's paper.")
    now = datetime.now(IST)
    json.dump({"date": now.strftime("%Y-%m-%d"), "updatedAt": now.isoformat(timespec="seconds"), "sections": sections},
              open(OUT, "w"), ensure_ascii=False, indent=1)
    print("Saved", sum(len(s["items"]) for s in sections), "stories")


if __name__ == "__main__":
    main()
