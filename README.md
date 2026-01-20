# 🚀 Next-Gen Tech Education Portal (초격차 기술교육 포털)

## 📖 프로젝트 개요
중고등학생과 예비 교사들을 위한 **인터랙티브 웹 기반 기술 교육 플랫폼**입니다.
단순한 정보 전달을 넘어, 학습자가 기술을 시스템(Input-Process-Output) 관점에서 이해하고, 퀴즈와 ESG 데이터 분석을 통해 능동적으로 참여할 수 있도록 설계되었습니다.

---

## ✨ 주요 기능 (Key Features)

### 1. 🏗️ 기술 시스템 모델 시각화 (System Model Authorization)
- 모든 5대 기술 영역(제조, 건설, 수송, 통신, 생물)에 **투입-과정-산출-되먹임(Feedback)** 모델을 적용했습니다.
- CSS 애니메이션을 통해 시스템의 흐름을 직관적으로 파악할 수 있습니다.

### 2. 🌱 ESG 데이터 센터 (Data-Driven ESG)
- 기술이 환경과 사회에 미치는 영향을 기업의 실제 사례와 연결했습니다.
- **수송 기술** 파트에서는 `Chart.js`를 활용하여 친환경차 보급 추이와 디젤차 감소세를 그래프로 시각화했습니다.
- `technology_data.json` 데이터를 실시간으로 필터링하여 관련 기업 정보를 제공합니다.

### 3. 📝 형성 평가 퀴즈 (Interactive Formative Assessment)
- 각 파트 학습 후 바로 풀 수 있는 **5문항의 퀴즈 모듈**을 탑재했습니다.
- 정답/오답 여부에 따라 즉각적인 해설(Feedback)이 제공되어 자기주도 학습을 지원합니다.

### 4. 📚 용어 사전 (Smart Glossary)
- `트러스 구조`, `BIM`, `UAM`, `하버-보슈법` 등 핵심 용어에 마우스를 올리면 상세 설명 툴팁이 나타납니다.

### 5. 🎨 반응형 3단 레이아웃 (Responsive UI)
- **Left:** 기술 영역 내비게이션 (사이드바)
- **Center:** 메인 학습 콘텐츠 (영상, 원리, 시스템 모델)
- **Right:** ESG 데이터 및 퀴즈 패널

---

## 🛠️ 기술 스택 (Tech Stack)
- **Frontend:** HTML5, CSS3 (Grid/Flexbox), JavaScript (ES6+)
- **Visualization:** [Chart.js](https://www.chartjs.org/) (데이터 시각화)
- **Data:** JSON (Python으로 Excel 변환)
- **Deployment:** GitHub Pages (정적 호스팅)

---

## 📂 파일 구조 (File Structure)

```
/
├── index.html               # 메인 페이지 (3단 레이아웃 구조)
├── style.css                # 디자인 스타일 (애니메이션, 툴팁, 반응형)
├── script.js                # 인터랙션 로직 (탭 전환, 퀴즈, 차트, 데이터 연동)
├── technology_data.json     # 기업 정보 데이터 (JSON)
├── convert_excel_to_json.py # 엑셀 데이터를 JSON으로 변환하는 파이썬 스크립트
└── README.md                # 프로젝트 설명서
```

---

## 🚀 설치 및 실행 방법

1. **로컬 실행**:
   - 폴더 내의 `index.html` 파일을 크롬(Chrome)이나 엣지(Edge) 브라우저로 엽니다.
   - *참고: 로컬 파일 보안 정책(CORS)으로 인해 JSON 데이터 로드가 차단될 수 있습니다. 이 경우 VS Code의 'Live Server' 확장을 사용하거나 GitHub Pages에 업로드하여 확인하세요.*

2. **GitHub Pages 배포**:
   - 이 저장소를 GitHub에 Push 합니다.
   - [Settings] -> [Pages] 메뉴에서 `main` 브랜치를 소스로 선택합니다.
   - 생성된 URL을 통해 어디서든 접속 가능합니다.

---

## 👨‍🏫 개발자 노트
이 포털은 학생들이 기술의 원리를 쉽게 이해하고, 미래 기술 사회의 주역으로 성장할 수 있도록 돕기 위해 제작되었습니다.
(Designed by Tech Education Specialist & Full-Stack Developer)
