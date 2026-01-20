document.addEventListener('DOMContentLoaded', () => {

    /* --- GLOBAL STATE & DATA --- */
    let currentTab = 'mfg';
    let techData = [];
    let currentQuizIndex = 0;
    let score = 0;

    // Mapping for ESG Data Filtration
    const esgKeywords = {
        'mfg': ['현대', '삼성', '로봇', '스마트'],
        'const': ['건설', '삼성물산', '현대건설'],
        'trans': ['현대자동차', '테슬라', 'HD현대', '한화오션', '대한항공', 'KAI'],
        'comm': ['SK텔레콤', 'KT', '네이버'],
        'bio': ['삼성바이오', '셀트리온']
    };

    // Formative Assessment Quiz Data
    const quizData = {
        'mfg': [
            { q: "제조 기술 시스템의 산출(Output)에 해당하지 않는 것은?", opts: ["완제품", "폐기물", "설계도", "재활용품"], a: 2, exp: "설계도는 투입(Input) 단계에 해당합니다." },
            { q: "기어(Gear)의 잇수가 각각 20개(A), 40개(B)일 때 기어비는?", opts: ["0.5", "2", "1", "4"], a: 1, exp: "기어비 i = Z2/Z1 = 40/20 = 2 입니다." }
        ],
        'const': [
            { q: "삼각형 단위로 뼈대를 짜서 하중을 견디는 구조는?", opts: ["라멘 구조", "트러스 구조", "아치 구조", "벽식 구조"], a: 1, exp: "트러스(Truss) 구조는 삼각형의 안정성을 이용합니다." },
            { q: "모듈러 건축의 장점이 아닌 것은?", opts: ["공사 기간 단축", "폐기물 감소", "현장 날씨 영향 최소화", "설계 변경의 자유로움"], a: 3, exp: "모듈러 건축은 표준화된 유닛을 사용하므로 현장에서의 즉각적인 설계 변경이 어렵습니다." }
        ],
        'trans': [
            { q: "다음 중 친환경 수송 수단이 아닌 것은?", opts: ["수소 자동차", "디젤 기관차", "전기 자전거", "자기부상열차"], a: 1, exp: "디젤 기관차는 화석 연료를 사용하여 탄소를 배출합니다." },
            { q: "UAM이 뜻하는 용어는?", opts: ["심해 탐사 로봇", "도심 항공 모빌리티", "자율 주행 트럭", "초고속 열차"], a: 1, exp: "Urban Air Mobility의 약자입니다." }
        ],
        'comm': [
            { q: "OSI 7계층 중 가장 하위 계층은?", opts: ["물리 계층", "전송 계층", "응용 계층", "네트워크 계층"], a: 0, exp: "1계층은 물리(Physical) 계층입니다." },
            { q: "근거리 무선 통신 기술로, 10cm 이내에서 데이터를 주고받는 것은?", opts: ["Wi-Fi", "Bluetooth", "NFC", "LTE"], a: 2, exp: "NFC(Near Field Communication)에 대한 설명입니다." }
        ],
        'bio': [
            { q: "유전자 가위(CRISPR) 기술의 주요 기능은?", opts: ["유전자 복제", "유전자 편집(절단/교정)", "세포 배양", "단백질 합성"], a: 1, exp: "특정 DNA 서열을 찾아 잘라내는 편집 기술입니다." },
            { q: "공기 중의 질소를 고정하여 비료를 만드는 방법은?", opts: ["하버-보슈법", "파스퇴르법", "멘델의 유전법칙", "복제 기술"], a: 0, exp: "프리츠 하버와 카를 보슈가 개발한 암모니아 합성법입니다." }
        ]
    };

    /* --- INITIALIZATION --- */
    init();

    async function init() {
        // Fetch JSON Data
        try {
            const res = await fetch('technology_data.json');
            if (res.ok) {
                techData = await res.json();
            }
        } catch (e) { console.error("JSON Load Error", e); }

        // Render Initial State
        switchTab('mfg');
        setupChart();
    }

    /* --- TAB SWITCHING LOGIC --- */
    window.switchTab = (tabId) => {
        currentTab = tabId;

        // 1. Update UI Classes
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.toggle('active', el.dataset.target === tabId);
        });
        document.querySelectorAll('.content-section').forEach(el => {
            el.classList.toggle('active', el.id === tabId);
        });

        // 2. Load Side Panel Content
        loadESGData(tabId);
        loadQuiz(tabId);
    };

    /* --- ESG DATA CENTER --- */
    function loadESGData(tabId) {
        const container = document.getElementById('esgContainer');
        const keywords = esgKeywords[tabId] || [];

        // Filter JSON data
        let filtered = techData.filter(item => {
            // Check if company name contains any of the keywords
            return keywords.some(k => item['기업명'] && item['기업명'].includes(k));
        });

        // If no matches found in JSON (fallback for demo purposes or empty JSON)
        if (filtered.length === 0 && tabId === 'trans') {
            // Hardcoded fallback for specific request like Tesla/Boeing if not in JSON
            filtered = [
                { '기업명': 'Tesla', '주요 사업 및 수행 업무': '전기차 생산 및 친환경 에너지 솔루션 (Solar Roof)' },
                { '기업명': '현대자동차', '주요 사업 및 수행 업무': '수소전기차 넥쏘 및 전기차 전용 플랫폼 E-GMP' },
                { '기업명': 'HD현대중공업', '주요 사업 및 수행 업무': '메탄올/암모니아 추진 친환경 선박 건조' }
            ];
        }

        if (filtered.length === 0) {
            container.innerHTML = `<p style="color:#666; padding:10px;">해당 분야의 ESG 데이터가 업데이트 중입니다.</p>`;
            return;
        }

        container.innerHTML = `<ul class="esg-list">` +
            filtered.map(item => `
                <li class="esg-item">
                    <span class="esg-company">${item['기업명']}</span>
                    <span class="esg-desc">${item['주요 사업 및 수행 업무'].substring(0, 50)}...</span>
                </li>
            `).join('') + `</ul>`;
    }

    /* --- QUIZ MODULE --- */
    function loadQuiz(tabId) {
        currentQuizIndex = 0;
        renderQuestion(tabId, 0);
    }

    function renderQuestion(tabId, idx) {
        const qBox = document.getElementById('quizQuestion');
        const oBox = document.getElementById('quizOptions');
        const fBox = document.getElementById('quizFeedback');
        const nextBtn = document.getElementById('nextBtn');

        const qSet = quizData[tabId];
        if (!qSet || !qSet[idx]) {
            qBox.textContent = "모든 문제를 풀었습니다! 👏";
            oBox.innerHTML = "";
            fBox.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }

        const q = qSet[idx];
        qBox.textContent = `Q${idx + 1}. ${q.q}`;
        fBox.style.display = 'none';
        nextBtn.style.display = 'none';

        oBox.innerHTML = q.opts.map((opt, i) => `
            <button onclick="checkAnswer('${tabId}', ${idx}, ${i})">${opt}</button>
        `).join('');
    }

    window.checkAnswer = (tabId, qIdx, choiceIdx) => {
        const q = quizData[tabId][qIdx];
        const correct = (choiceIdx === q.a);
        const fBox = document.getElementById('quizFeedback');
        const nextBtn = document.getElementById('nextBtn');
        const buttons = document.querySelectorAll('#quizOptions button');

        buttons[choiceIdx].classList.add(correct ? 'correct' : 'wrong');
        buttons[q.a].classList.add('correct'); // Show correct answer

        // Disable all buttons
        buttons.forEach(btn => btn.disabled = true);

        fBox.textContent = correct ? "정답입니다! 🎉 " + q.exp : "오답입니다. 😢 " + q.exp;
        fBox.style.display = 'block';
        fBox.style.background = correct ? '#d4edda' : '#f8d7da';
        fBox.style.color = correct ? '#155724' : '#721c24';

        nextBtn.style.display = 'block';
        nextBtn.onclick = () => renderQuestion(tabId, qIdx + 1);
    };

    /* --- CHART.JS INTEGRATION --- */
    function setupChart() {
        const ctx = document.getElementById('transChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025(E)'],
                datasets: [{
                    label: '친환경 차 등록 대수 (단위: 10만 대)',
                    data: [82, 115, 150, 210, 280, 350],
                    borderColor: '#42a5f5',
                    backgroundColor: 'rgba(66, 165, 245, 0.2)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: '디젤차 감소 추세',
                    data: [990, 960, 930, 890, 850, 800],
                    borderColor: '#ef5350',
                    borderDash: [5, 5],
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

});
