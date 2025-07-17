import os
import json
import sys
from datetime import datetime
from dateutil import tz
import google.generativeai as genai

# ======== 1. 환경 설정 ========

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print(json.dumps({"error": "Missing GEMINI_API_KEY"}))
    sys.exit(1)

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-pro")

# ======== 2. 현재 날짜/시간 (한국 기준) ========

def get_kst_now():
    kst = tz.gettz("Asia/Seoul")
    return datetime.now(tz=kst)

# ======== 3. Gemini 프롬프트 생성 ========

def build_prompt(user_input, current_date_str):
    return f"""
### 시스템 설정 ###
당신은 'AI 일정 비서' 역할을 수행하는 Gemini 기반 챗봇입니다.
당신의 주요 임무는:
1. 사용자의 자연스러운 문의나 일정 요청을 이해하고,
2. 부족하거나 모호한 정보(날짜, 시간, 장소, 목적 등)를 문맥과 상식에 따라 정밀하게 추론하거나 보완하며,
3. 만약 사용자가 고민·상담 형태로 미래 행동 계획을 묻는다면,
   - 일반적인 루틴, 학습 경로, 성공 사례 등 외부 지식이나 다른 사용자 데이터와 비교해
   - 맞춤형 일정이나 추천 계획을 다중 단계로 구성해 제안합니다.
   
1. 날짜는 'YYYY-MM-DD' 형식으로 출력한다.
2. 시간은 'HH:MM' 24시간제로 출력하고, 명시되지 않으면 null을 넣는다.
3. 할 일은 한 문장으로 요약해서 'task'에 넣는다.
4. 모든 날짜와 시간은 '대한민국 시간(KST)' 기준으로 해석한다.
5. 날짜가 상대적인 표현(예: 내일, 다음주 화요일)이라면 기준일은 '{current_date_str}'이다.
6. 결과는 반드시 설명 없이 JSON 하나만 출력한다다.

### 출력 형식 지침 ###
- 반드시 하나의 JSON 객체만 출력
- JSON 키: `"task"`, `"date"`, `"time"`, `"location"`
  - `"task"`: 내용은 자연어 한 문장 (예: "파이썬 기초 공부 시작")
  - `"date"`: `YYYY-MM-DD` 형식 (KST 기준). 상대 표현은 기준일 `"@TODAY@"`에서 계산
  - `"time"`: `HH:MM` 24시간제. 명시 없으면 `null`
  - `"location"`: 자연어. 명시 없으면 `null`
- 출력 외 다른 설명 금지
- 상대 날짜 계산 기준: 오늘 `"@TODAY@"`

### 모호성 처리 규칙 ###
1. 날짜 없음 → 오늘 또는 가능한 가까운 주중 날짜로 추정  
2. 시간 없음 → 오전 9시 또는 오후 3시 같은 일반 업무 시간 중 하나 선택  
3. 장소 없음 → `"집"` 또는 `"온라인"`으로 기본 설정  
4. 복수 일정 가능성 또는 상담 요청 → 최소 2~3단계 일정 제안 (리스트 대신 단일 요약 JSON 형태 여서, 핵심 첫 일정 선택)

### 체인 오브 생각(Chain-of-thought) 구조 ###
- 내부적으로: 날짜 계산 먼저 → 시간 추정 → 장소 설정 → 작업(task) 생성  
- 마치 '단계별 사고'하듯 구성

### 사례 예시 ###
입력: "다음주에 친구랑 약속 잡고 싶어"  
→ JSON 출력:
```json
{{
  "task": "친구와 만남 약속",
  "date": "2025-07-24",
  "time": "19:00",
  "location": "서울 시내 카페"
}}
입력 : "{user_input}"
"""

# ======== 4. 일정 분석 ========

def analyze_schedule(user_input):
    now_kst = get_kst_now()
    current_date_str = now_kst.strftime("%Y-%m-%d")
    prompt = build_prompt(user_input, current_date_str)
    response = model.generate_content(prompt)

    try:
        parsed = json.loads(response.text)
        return parsed
    except json.JSONDecodeError:
        return {"error": "Invalid JSON returned from Gemini", "raw": response.text}

# ======== 5. CLI 실행 ========

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input provided"}))
        sys.exit(1)

    user_input = " ".join(sys.argv[1:])
    result = analyze_schedule(user_input)
    print(json.dumps(result, ensure_ascii=False))

if __name__ == "__main__":
    main()
