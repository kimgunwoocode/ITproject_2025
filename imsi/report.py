from schedule import get_user_schedules

def generate_report(uid):
    schedules = get_user_schedules(uid)
    result = {}
    for s in schedules:
        cat = s.get("category", "기타")
        result[cat] = result.get(cat, 0) + 1
    return {
        "total": len(schedules),
        "by_category": result
    }