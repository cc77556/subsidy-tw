#!/usr/bin/env python3
"""Auto-update subsidy data: check deadlines, update status, refresh dates."""

import json
from datetime import datetime, date
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "src" / "data" / "subsidies.json"

def update():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        subsidies = json.load(f)

    today = date.today().isoformat()
    changes = []

    for s in subsidies:
        # Check if deadline has passed → mark as closed
        deadline = s.get("deadline", "")
        if deadline and deadline != "常年" and deadline != "隨時申請":
            try:
                deadline_date = date.fromisoformat(deadline)
                if deadline_date < date.today() and s.get("status") == "open":
                    s["status"] = "closed"
                    changes.append(f"  {s['name']}: open → closed (截止 {deadline})")
            except ValueError:
                pass

        # Check if upcoming subsidies should now be open
        # (if deadline is in the future and status is upcoming, keep as is)

    if changes:
        # Update all updatedAt to today
        for s in subsidies:
            s["updatedAt"] = today

        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(subsidies, f, ensure_ascii=False, indent=2)

        print(f"Updated {len(changes)} subsidies:")
        for c in changes:
            print(c)
        return True
    else:
        print(f"No changes needed. All {len(subsidies)} subsidies are current.")
        return False

if __name__ == "__main__":
    update()
