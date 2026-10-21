/**
 * 국립종자원 (KSVS) 대국민 안내 포털 - 바닐라 자바스크립트
 * 별도의 번들러나 서버 없이 브라우저 더블클릭(file://)으로 즉시 동작하도록 설계되었습니다.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFontResizer();
  initReadingProgress();
  initMobileNav();
  initBackToTop();
  initCitizenSupportNavigator();
  initInteractiveTabs();
  initAiHarvestSimulator();
  initVarietyMatcher();
  initQuizMaster();
  initNewsFilterAndSearch();
  initBranchTabs();
});

/* ==========================================================================
   [신규 기능] "나는 어떤 도움을 받을 수 있을까?" 국민 맞춤 도움 진단기
   ========================================================================== */
const SUPPORT_SERVICES_DATA = [
  {
    id: 's1',
    category: '우량 종자 공급',
    icon: '🌾',
    title: '정부보급종(벼·보리·밀·콩) 정기 신청 및 분양',
    summary: '국가가 순도 99% 이상과 높은 발아율(85% 이상)을 철저히 검증한 5대 식량작물 우량종자를 시중보다 안정적인 가격에 농가에 공급합니다.',
    checkText: '올해 농사에 필요한 국가보증 우량 씨앗(벼, 콩, 보리, 밀)을 정기적으로 분양받고 싶다',
    personas: ['farmer', 'all'],
    eligibility: '농업경영체 등록 농업인 (우선 배정)',
    fee: '정부 고시 분양가격 (시중가 대비 합리적 수준)',
    how: '관할 시·군 농업기술센터 또는 읍·면·동 행정복지센터 방문 신청, 종자민원서비스(seednet.go.kr) 온라인 신청',
    link: 'https://www.seednet.go.kr',
    linkText: '종자민원 보급종 신청 ↗'
  },
  {
    id: 's2',
    category: '텃밭·소비자 지원',
    icon: '🌱',
    title: '주말농장·텃밭용 보급종 잔여물량 개별 신청 분양',
    summary: '정기 신청 후 남은 우량 보급종 물량을 일반 국민, 주말농장 동호인, 도시농부도 소량 단위로 직접 신청하여 구매할 수 있습니다.',
    checkText: '주말농장이나 텃밭에 심을 안전하고 발아율 높은 국가보증 씨앗을 소량 구하고 싶다',
    personas: ['citizen', 'all'],
    eligibility: '대한민국 국민 누구나 (1인당 신청 수량 제한 있을 수 있음)',
    fee: '품종별 정해진 보급종 분양단가',
    how: '국립종자원 종자민원서비스(seednet.go.kr) "개별신청" 메뉴에서 온라인 신청 및 택배 수령',
    link: 'https://www.seednet.go.kr',
    linkText: '개별신청 창구 바로가기 ↗'
  },
  {
    id: 's3',
    category: '스마트 영농 지원',
    icon: '🤖',
    title: 'AI 기반 벼 종자 최적 수확기 예측 서비스',
    summary: '46년간의 기상 빅데이터와 적산온도를 분석하여, 기상이변 속에서도 비를 피해 수발아(이삭 싹틈)를 예방하는 최적 수확 적기를 알려드립니다.',
    checkText: '가을 장마나 잦은 비로 벼 수확시기를 잡기 어렵고, 수발아(이삭 싹틈) 피해가 걱정된다',
    personas: ['farmer', 'youth', 'all'],
    eligibility: '정부보급종 채종 농가, 지자체 원종장 및 일반 벼 재배 농가',
    fee: '전액 무료 (국민 누구나 웹 시뮬레이터 이용 가능)',
    how: '본 웹사이트 "AI 벼 수확시기 예측기" 체험 및 관할 국립종자원 지원 영농 가이드라인 수령',
    link: '#interactive',
    linkText: 'AI 수확기 예측기 체험 ↗'
  },
  {
    id: 's4',
    category: '안심영농·안전검정',
    icon: '🔬',
    title: '파종 전 미승인 유전자변형작물(LMO) 무료 신속 검정',
    summary: '유채, 콩, 옥수수 등을 파종하기 전, 종자에 미승인 LMO가 비의도적으로 섞여 있는지 DNA 분석을 통해 사전에 무료로 신속 확인해 드립니다.',
    checkText: '파종 전 내가 가진 종자에 유전자변형작물(LMO)이 섞여 있는지 무료로 검사받고 싶다',
    personas: ['farmer', 'business', 'citizen', 'all'],
    eligibility: '유채·콩·옥수수 등 종자를 파종하려는 모든 농업인 및 단체',
    fee: '전액 무료 (국가 안심영농 지원 사업)',
    how: '국립종자원 관할 지원에 종자 시료(약 100g~200g) 우편 발송 또는 방문 접수 (접수 후 3~5일 내 결과 통보)',
    link: 'https://www.seed.go.kr/bbs/seed/9/24263/artclView.do',
    linkText: 'LMO 무상검정 공고 보기 ↗'
  },
  {
    id: 's5',
    category: '권리구제·소비자보호',
    icon: '🛡️',
    title: '불량 종자·모종 피해 구제 및 불법 유통 신고 (특사경)',
    summary: '구입한 종자나 모종이 싹이 안 트거나 설명과 다른 가짜 품종일 때, 종자 특별사법경찰이 원인을 규명하고 유통 질서를 바로잡아 피해를 구제합니다.',
    checkText: '구입한 씨앗이나 모종이 싹이 트지 않거나 품종이 속여 팔려 농가/소비자 피해를 입었다',
    personas: ['farmer', 'citizen', 'all'],
    eligibility: '불량·불법 종자 또는 묘(모종)로 피해를 입은 농업인 및 일반 소비자',
    fee: '신고 및 분쟁 원인조사 무료',
    how: '국립종자원 대표전화(054-912-0114) 또는 관할 지원 종자유통조사반에 피해 신고서 접수',
    link: 'https://www.seed.go.kr',
    linkText: '유통피해 신고 안내 ↗'
  },
  {
    id: 's6',
    category: '식물 지식재산권',
    icon: '📑',
    title: '식물 신품종보호권(식물 특허) 출원 및 독점권 부여',
    summary: '새로 개발한 화훼, 채소, 과수, 식량작물 등 신품종에 대해 DUS 재배심사를 거쳐 최대 20년(과수·임목 25년)간 법적 배타적 권리를 보장합니다.',
    checkText: '직접 개발한 새로운 꽃, 채소, 과수 품종에 대해 특허(20~25년 독점권)를 얻고 싶다',
    personas: ['breeder', 'business', 'all'],
    eligibility: '국내외 식물 신품종 육성자 (개인 육종가, 종묘회사, 대학·연구소 등)',
    fee: '출원료 및 심사수수료 (법정 수수료 규정 적용)',
    how: '종자민원서비스(seednet.go.kr)에서 "신품종보호 출원서" 온라인 제출 및 종자 시료 제출',
    link: 'https://www.seednet.go.kr',
    linkText: '품종보호 출원창구 ↗'
  },
  {
    id: 's7',
    category: '육종가 육성·포상',
    icon: '🏆',
    title: '대한민국우수품종상 공모 참가 (대통령상 등 정부포상)',
    summary: '국내 최고 권위의 종자 시상 제도로, 우수 품종을 육성한 개인 및 기업에게 대통령상(상금 5천만원) 시상과 해외 수출·홍보 마케팅을 적극 지원합니다.',
    checkText: '우수한 신품종을 개발하여 국가 최고 권위의 포상과 홍보·수출 지원 혜택을 받고 싶다',
    personas: ['breeder', 'business', 'all'],
    eligibility: '국내에서 육성된 품종보호등록 또는 국가품종목록 등재 품종 (공고일 기준)',
    fee: '출품 신청비 무료',
    how: '매년 상반기 국립종자원 누리집 공모 요강 확인 후 신청서 및 실적 증빙 제출',
    link: 'https://www.seed.go.kr',
    linkText: '우수품종상 공모 안내 ↗'
  },
  {
    id: 's8',
    category: '창업·사업자 지원',
    icon: '🏪',
    title: '종자업·육묘업 등록 요건 상담 및 품종 생산·수입판매 신고',
    summary: '종자상이나 모종 판매업을 창업하려는 분들에게 시설 요건, 종자관리사 인력 요건을 원스톱 안내하고 법정 생산·수입판매 신고를 신속 처리합니다.',
    checkText: '종자상이나 모종(육묘) 판매업을 창업·등록하거나, 품종 생산·수입판매 신고를 해야 한다',
    personas: ['business', 'youth', 'all'],
    eligibility: '종자업 또는 육묘업 창업 희망자, 종자 수출입 및 유통업체',
    fee: '법정 수수료 (신고 품종당 소정의 수수료)',
    how: '시·군·구청(종자업·육묘업 등록) 및 국립종자원 종자민원서비스(생산·수입판매 신고)',
    link: 'https://www.seednet.go.kr',
    linkText: '품종판매 신고포털 ↗'
  },
  {
    id: 's9',
    category: '전문 인력 양성',
    icon: '🎓',
    title: '국제종자생명교육센터 전문 교육 (종자관리사·육묘업·스마트육종)',
    summary: '종자관리사 자격 취득자 법정 보수교육, 육묘업 신규 등록자 의무교육, 최신 생명공학·AI 디지털 육종 실습 과정을 연중 체계적으로 운영합니다.',
    checkText: '종자관리사 자격증 교육 또는 육묘업 법정 의무교육을 이수하고 농업 전문역량을 키우고 싶다',
    personas: ['youth', 'business', 'all'],
    eligibility: '종자관리사, 육묘업 종사자, 농생명 계열 전공 대학생, 청년 농업인 등',
    fee: '법정 교육과정별 소정의 교육비 (청년/학생 과정 일부 국비 지원)',
    how: '국제종자생명교육센터 홈페이지(seed.go.kr/edu)에서 연간 교육일정 확인 후 온라인 수강 신청',
    link: 'https://www.seed.go.kr',
    linkText: '교육센터 연수과정 보기 ↗'
  },
  {
    id: 's10',
    category: '수출 지원·국제 인증',
    icon: '🌐',
    title: '국제종자검정협회(ISTA) 공인 종자 검정증명서 발급',
    summary: '한국 종자를 세계 시장으로 수출할 때 필수적으로 요구되는 국제 공인 ISTA 오렌지·블루 증명서를 정밀 분석을 거쳐 공증 발급해 드립니다.',
    checkText: '국내에서 생산한 종자를 해외로 수출하기 위해 국제공인(ISTA) 품질 검정서가 필요하다',
    personas: ['business', 'breeder', 'all'],
    eligibility: '종자 수출을 추진 중인 국내 종자 기업 및 연구기관',
    fee: 'ISTA 검정 항목별 법정 공인 수수료',
    how: '국립종자원 종자검정지원에 ISTA 규정 시료 채취 의뢰 및 검정 신청서 접수',
    link: 'https://www.seed.go.kr',
    linkText: 'ISTA 검정안내 바로가기 ↗'
  }
];

function initCitizenSupportNavigator() {
  const personaChips = document.querySelectorAll('#personaChips .persona-chip');
  const checklistGrid = document.getElementById('checklistGrid');
  const countBadge = document.getElementById('selectedItemCount');
  const btnCheckAll = document.getElementById('btnCheckAll');
  const btnUncheckAll = document.getElementById('btnUncheckAll');
  const btnReset = document.getElementById('btnResetFinder');
  const btnRun = document.getElementById('btnRunFinder');
  const resultsCardGrid = document.getElementById('benefitsCardsGrid');
  const resultsMainTitle = document.getElementById('resultsMainTitle');
  const resultsSubText = document.getElementById('resultsSubText');
  const btnPrint = document.getElementById('btnPrintBenefits');
  const resultsBox = document.getElementById('finderResultsBox');

  if (!checklistGrid || !resultsCardGrid) return;

  let currentPersona = 'all';

  // 1. 체크리스트 렌더링
  function renderChecklist() {
    checklistGrid.innerHTML = SUPPORT_SERVICES_DATA.map(item => `
      <div class="check-card" data-service-id="${item.id}" data-personas="${item.personas.join(' ')}">
        <input type="checkbox" id="chk_${item.id}" value="${item.id}" class="check-input">
        <div class="check-content">
          <label for="chk_${item.id}" class="check-label">${item.checkText}</label>
          <span class="check-tag">🏷️ ${item.category} | ${item.icon} ${item.title.split('(')[0]}</span>
        </div>
      </div>
    `).join('');

    // 카드 클릭 이벤트 바인딩
    checklistGrid.querySelectorAll('.check-card').forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');

      card.addEventListener('click', (e) => {
        if (e.target !== checkbox && e.target.tagName !== 'LABEL') {
          checkbox.checked = !checkbox.checked;
        }
        updateCardVisual(card, checkbox.checked);
        updateSelectionCount();
        renderResults(false);
      });

      checkbox.addEventListener('change', () => {
        updateCardVisual(card, checkbox.checked);
        updateSelectionCount();
        renderResults(false);
      });
    });

    // 기본 페르소나에 맞게 추천 자동 체크 (첫 로드 시 주요 3개 선택)
    autoSelectForPersona(currentPersona);
  }

  function updateCardVisual(card, isChecked) {
    if (isChecked) {
      card.classList.add('checked');
    } else {
      card.classList.remove('checked');
    }
  }

  function updateSelectionCount() {
    const checkedCount = checklistGrid.querySelectorAll('input[type="checkbox"]:checked').length;
    if (countBadge) {
      countBadge.textContent = checkedCount;
    }
  }

  // 페르소나별 자동 선별 선택
  function autoSelectForPersona(persona) {
    const cards = checklistGrid.querySelectorAll('.check-card');
    cards.forEach(card => {
      const cardPersonas = card.getAttribute('data-personas').split(' ');
      const checkbox = card.querySelector('input[type="checkbox"]');

      if (persona === 'all') {
        // 전체일 때는 상위 4개 기본 선택
        const sId = card.getAttribute('data-service-id');
        const isDefault = ['s1', 's2', 's4', 's5'].includes(sId);
        checkbox.checked = isDefault;
        updateCardVisual(card, isDefault);
      } else if (cardPersonas.includes(persona)) {
        checkbox.checked = true;
        updateCardVisual(card, true);
      } else {
        checkbox.checked = false;
        updateCardVisual(card, false);
      }
    });

    updateSelectionCount();
    renderResults(false);
  }

  // 페르소나 칩 클릭 이벤트
  personaChips.forEach(chip => {
    chip.addEventListener('click', () => {
      personaChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentPersona = chip.getAttribute('data-persona');
      autoSelectForPersona(currentPersona);
    });
  });

  // 전체 선택 / 해제
  if (btnCheckAll) {
    btnCheckAll.addEventListener('click', () => {
      checklistGrid.querySelectorAll('.check-card').forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.checked = true;
        updateCardVisual(card, true);
      });
      updateSelectionCount();
      renderResults(false);
    });
  }

  if (btnUncheckAll) {
    btnUncheckAll.addEventListener('click', () => {
      checklistGrid.querySelectorAll('.check-card').forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.checked = false;
        updateCardVisual(card, false);
      });
      updateSelectionCount();
      renderResults(false);
    });
  }

  // 초기화
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      personaChips.forEach(c => c.classList.remove('active'));
      personaChips[0].classList.add('active');
      currentPersona = 'all';
      autoSelectForPersona('all');
    });
  }

  // 진단 실행 버튼 (스크롤 이동)
  if (btnRun) {
    btnRun.addEventListener('click', () => {
      renderResults(true);
      if (resultsBox) {
        resultsBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // 인쇄
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // 3. 결과 렌더링
  function renderResults(shouldScroll = false) {
    const checkedBoxes = Array.from(checklistGrid.querySelectorAll('input[type="checkbox"]:checked'));
    const checkedIds = checkedBoxes.map(b => b.value);

    // 선택된 항목이 없으면 페르소나 관련 전체 항목 표시
    let matchedServices = SUPPORT_SERVICES_DATA.filter(item => checkedIds.includes(item.id));

    if (matchedServices.length === 0) {
      if (currentPersona === 'all') {
        matchedServices = SUPPORT_SERVICES_DATA.slice(0, 4);
      } else {
        matchedServices = SUPPORT_SERVICES_DATA.filter(item => item.personas.includes(currentPersona));
      }
    }

    if (resultsMainTitle) {
      const personaLabels = {
        all: '대한민국 모든 국민',
        farmer: '전문 농업인(수도작·전작)',
        breeder: '신품종 육종가·연구자',
        business: '종자·육묘 사업자',
        citizen: '주말농장·도시농부·소비자',
        youth: '청년 창농·취업 준비생'
      };
      resultsMainTitle.textContent = `[${personaLabels[currentPersona] || '맞춤'}] 국립종자원 추천 지원 혜택 (${matchedServices.length}건)`;
    }

    if (resultsSubText) {
      resultsSubText.textContent = `체크하신 상황을 분석하여 국립종자원에서 제공하는 지원 제도와 실제 신청 창구를 정리했습니다.`;
    }

    resultsCardGrid.innerHTML = matchedServices.map(service => `
      <article class="benefit-card">
        <div class="benefit-header">
          <span class="benefit-category">${service.category}</span>
          <span class="benefit-icon">${service.icon}</span>
        </div>
        <h4 class="benefit-title">${service.title}</h4>
        <p class="benefit-summary">${service.summary}</p>

        <div class="benefit-specs">
          <div class="benefit-specs-item">
            <span class="spec-key">신청 대상:</span>
            <span class="spec-val">${service.eligibility}</span>
          </div>
          <div class="benefit-specs-item">
            <span class="spec-key">비용/수수료:</span>
            <span class="spec-val">${service.fee}</span>
          </div>
          <div class="benefit-specs-item">
            <span class="spec-key">신청 방법:</span>
            <span class="spec-val">${service.how}</span>
          </div>
        </div>

        <div class="benefit-footer">
          <span class="pill-tag">국가지원</span>
          <a href="${service.link}" target="_blank" rel="noopener noreferrer" class="benefit-direct-link">
            ${service.linkText}
          </a>
        </div>
      </article>
    `).join('');
  }

  // 초기 렌더링
  renderChecklist();
}

/* ==========================================================================
   인터랙티브 존 탭 전환 제어
   ========================================================================== */
function initInteractiveTabs() {
  const tabButtons = document.querySelectorAll('.interactive-section .tab-btn');
  const tabPanels = document.querySelectorAll('.interactive-section .tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanelId = btn.getAttribute('aria-controls');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   1. 다크 모드 & 테마 관리 (LocalStorage 연동)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('ksvs_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ksvs_theme', theme);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.querySelector('.icon-theme').textContent = theme === 'dark' ? '☀️' : '🌓';
    themeToggle.setAttribute('title', theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
  }
}

/* ==========================================================================
   2. 글자 크기 조절기 (농업인 및 시니어 배려)
   ========================================================================== */
function initFontResizer() {
  const btnDec = document.getElementById('btnFontDec');
  const btnReset = document.getElementById('btnFontReset');
  const btnInc = document.getElementById('btnFontInc');

  let currentScale = 16; // 기본 16px

  function updateFontSize(px) {
    currentScale = Math.max(14, Math.min(22, px));
    document.documentElement.style.setProperty('--font-scale', `${currentScale}px`);
  }

  if (btnDec) {
    btnDec.addEventListener('click', () => updateFontSize(currentScale - 2));
  }
  if (btnReset) {
    btnReset.addEventListener('click', () => updateFontSize(16));
  }
  if (btnInc) {
    btnInc.addEventListener('click', () => updateFontSize(currentScale + 2));
  }
}

/* ==========================================================================
   3. 상단 스크롤 진행률 & 맨 위로 가기
   ========================================================================== */
function initReadingProgress() {
  const progressBar = document.getElementById('progressBar');
  const backToTopBtn = document.getElementById('btnBackToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('btnBackToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function initMobileNav() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // 메뉴 링크 클릭 시 닫기
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   4. [실제 정책 체험] AI 벼 수확시기 예측기 시뮬레이터
   - 국립종자원과 KETI가 2026년 실제 도입한 AI 알고리즘의 원리를 수학적으로 모델링
   - 품종별 필요 적산온도(출수 후 누적 온도)와 기상 시나리오를 반영하여 최적 수확일을 산출
   ========================================================================== */
function initAiHarvestSimulator() {
  const form = document.getElementById('aiPredictForm');
  const varietySelect = document.getElementById('selectVariety');
  const headingDateInput = document.getElementById('inputHeadingDate');
  const weatherSelect = document.getElementById('selectRegionWeather');
  const rainSlider = document.getElementById('sliderRainRisk');
  const rainRiskVal = document.getElementById('rainRiskVal');

  // 결과 엘리먼트
  const dateHighlight = document.getElementById('predictedHarvestDate');
  const daysText = document.getElementById('predictedDaysFromHeading');
  const accumTempRate = document.getElementById('accumTempRate');
  const accumTempFill = document.getElementById('accumTempFill');
  const sproutRiskText = document.getElementById('sproutRiskText');
  const sproutRiskFill = document.getElementById('sproutRiskFill');
  const germinationQuality = document.getElementById('germinationQuality');
  const germinationFill = document.getElementById('germinationFill');
  const adviceDesc = document.getElementById('aiAdviceDesc');

  if (!form) return;

  // 레인지 슬라이더 텍스트 갱신
  rainSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    let label = '보통';
    if (val < 30) label = '낮음 (맑음 지속)';
    else if (val > 70) label = '높음 (집중호우/태풍 경계)';
    rainRiskVal.textContent = `${val}% (${label})`;
  });

  // 폼 제출 시 계산
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateHarvestPrediction();
  });

  // 초기 1회 실행
  calculateHarvestPrediction();

  function calculateHarvestPrediction() {
    const selectedOption = varietySelect.options[varietySelect.selectedIndex];
    const targetAccumTemp = parseInt(selectedOption.getAttribute('data-accum'), 10) || 1150;
    const varietyName = selectedOption.text.split(' ')[0];
    const headingDateStr = headingDateInput.value || '2026-08-15';
    const weather = weatherSelect.value;
    const rainRisk = parseInt(rainSlider.value, 10);

    // 등숙기 일평균 기온 가정 (가을 평년 22.5℃)
    let avgDailyTemp = 22.5;
    if (weather === 'hot') avgDailyTemp = 24.0;   // 고온기 일찍 익음
    if (weather === 'cool') avgDailyTemp = 20.8;  // 저온기 늦게 익음

    // 필요 일수 = 적산온도 / 일평균 기온
    let requiredDays = Math.round(targetAccumTemp / avgDailyTemp);

    // 출수일 기준 수확 적기 계산
    const headingDate = new Date(headingDateStr);
    const startDate = new Date(headingDate);
    startDate.setDate(startDate.getDate() + (requiredDays - 2));

    const endDate = new Date(headingDate);
    endDate.setDate(endDate.getDate() + (requiredDays + 2));

    const formatDate = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}년 ${month}월 ${day}일`;
    };

    dateHighlight.textContent = `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
    daysText.textContent = `출수 후 약 ${requiredDays}일 전후 (누적 적산온도 ${targetAccumTemp}℃ 충족)`;

    // 수발아 위험도 산출
    let calculatedSproutRisk = Math.min(100, Math.round(rainRisk * 0.7 + (weather === 'hot' ? 25 : 10)));
    sproutRiskFill.style.width = `${calculatedSproutRisk}%`;
    
    if (calculatedSproutRisk > 65) {
      sproutRiskText.textContent = `위험 (${calculatedSproutRisk}%)`;
      sproutRiskText.className = 'text-warning';
      sproutRiskFill.className = 'gauge-bar-fill fill-warning';
    } else if (calculatedSproutRisk > 35) {
      sproutRiskText.textContent = `주의 (${calculatedSproutRisk}%)`;
      sproutRiskText.className = 'text-warning';
      sproutRiskFill.className = 'gauge-bar-fill fill-warning';
    } else {
      sproutRiskText.textContent = `안전 (${calculatedSproutRisk}%)`;
      sproutRiskText.className = 'text-success';
      sproutRiskFill.className = 'gauge-bar-fill fill-success';
    }

    // 발아율 기대치
    let expectedGerm = Math.max(88, 98 - Math.round(calculatedSproutRisk * 0.12));
    germinationQuality.textContent = `우수 (${expectedGerm}% 이상 국가보증 충족)`;
    germinationFill.style.width = `${expectedGerm}%`;

    // 적산온도 달성률
    accumTempRate.textContent = '100% 충족';
    accumTempFill.style.width = '100%';

    // AI 조언 문구 커스텀
    let rainAdvice = '';
    if (calculatedSproutRisk > 60) {
      rainAdvice = `비 예보가 잦아 이삭에서 싹이 트는 수발아 발생 위험이 큽니다. 예측 수확 시작일인 ${formatDate(startDate)} 직전 비가 오지 않는 맑은 날을 택해 신속히 조기 수확하시기 바랍니다.`;
    } else {
      rainAdvice = `기상 조건이 양호하여 벼알이 단단히 여물어 완전미율이 최고에 달할 것으로 예상됩니다. 이삭 전체 낟알의 90% 이상이 황금색으로 익었을 때 적기 수확하세요.`;
    }

    adviceDesc.innerHTML = `<strong>${varietyName}</strong> 품종 분석 결과: 등숙기 목표 적산온도(${targetAccumTemp}℃)에 도달하는 출수 후 <strong>${requiredDays}일차</strong> 무렵 수확 시 가장 건강한 보급종 종자를 채종할 수 있습니다. ${rainAdvice}`;
  }
}

/* ==========================================================================
   5. [농가 가이드] 맞춤형 우량 보급종 추천기
   ========================================================================== */
const VARIETY_DATABASE = [
  {
    crop: 'rice',
    trait: 'taste',
    name: '삼광 (三光)',
    cropName: '벼 (최고품질 밥쌀용)',
    desc: '외관 품위가 매우 뛰어나고 찰기가 좋아 밥맛 평가에서 항상 최고점을 받는 대한민국 대표 최고품질 품종입니다.',
    meta: '주요 재배: 중부·영호남 평야지 | 도열병·줄무늬잎마름병 저항성'
  },
  {
    crop: 'rice',
    trait: 'yield',
    name: '참동진',
    cropName: '벼 (다수확·신동진 대체)',
    desc: '신동진의 굵은 쌀알과 우수한 밥맛을 유지하면서 벼이삭도열병과 흰잎마름병 저항성을 획기적으로 개선한 최신 보급종입니다.',
    meta: '주요 재배: 전북·전남 평야지 | 기후변화 병해충 방제 탁월'
  },
  {
    crop: 'rice',
    trait: 'taste',
    name: '해들 (조생종)',
    cropName: '벼 (경기 이천 명품쌀)',
    desc: '외래 품종(고시히카리)을 대체하여 이천시 등에서 육성한 최고급 조생종으로, 9월 초 추석 전 수확이 가능하며 밥맛이 극상입니다.',
    meta: '주요 재배: 경기·충청 조기 수확지 | 도복(쓰러짐)에 강함'
  },
  {
    crop: 'rice',
    trait: 'climate',
    name: '영호진미',
    cropName: '벼 (남부 고온적응형)',
    desc: '가을철 등숙기 고온에도 쌀알이 맑고 투명하게 잘 여물어 남부지방 기후변화 대응에 가장 최적화된 최고품질 벼입니다.',
    meta: '주요 재배: 영남·호남 내륙 및 해안지 | 흰잎마름병 K1 저항성'
  },
  {
    crop: 'rice',
    trait: 'process',
    name: '보람찬 / 한가루',
    cropName: '벼 (가공·떡·쌀가루용)',
    desc: '제과·제빵 및 가공식품에 알맞게 잘 빻아지는 분질미 특성을 가진 품종으로, 쌀 가공식품 산업화에 기여합니다.',
    meta: '주요 재배: 전국 가공용 계약재배 단지 | 다수확 수량성'
  },
  {
    crop: 'soy',
    trait: 'yield',
    name: '대원콩',
    cropName: '콩 (장류·두부용 표준)',
    desc: '대한민국 콩 재배 면적의 절반 이상을 차지하는 부동의 1위 품종. 수량이 많고 꼬투리가 잘 튀지 않아 기계 수확에 유리합니다.',
    meta: '주요 재배: 전국 일원 | 생육이 왕성하고 토양 적응력 우수'
  },
  {
    crop: 'soy',
    trait: 'climate',
    name: '선풍콩',
    cropName: '콩 (습해·도복 저항성)',
    desc: '논콩 재배 시 침수나 과습 피해를 줄이기 위해 육성된 품종으로 키가 알맞고 꼬투리 달리는 위치가 높아 콤바인 수확에 최적입니다.',
    meta: '주요 재배: 전국 논 타작물 재배단지 | 불마름병 저항성'
  },
  {
    crop: 'soy',
    trait: 'taste',
    name: '청자5호',
    cropName: '콩 (검정콩·당도 우수)',
    desc: '안토시아닌 함량이 높고 속이 짙은 녹색인 서리태 계통 흑청콩으로, 기존 재래종보다 낟알이 굵고 잘 쓰러지지 않습니다.',
    meta: '주요 재배: 중·남부지역 | 밥밑용 및 건강 기능성'
  },
  {
    crop: 'barley',
    trait: 'taste',
    name: '새금강밀',
    cropName: '밀 (국산 제면용 우수종)',
    desc: '수입 밀가루에 견줄 만큼 면을 만들었을 때 색이 밝고 쫄깃한 식감을 자랑하는 국가보증 국산 밀 대표 보급종입니다.',
    meta: '주요 재배: 전남·전북·경남 이모작 지대 | 붉은곰팡이병 저항성'
  },
  {
    crop: 'barley',
    trait: 'yield',
    name: '재안찰쌀보리',
    cropName: '보리 (찰기 풍부·다수확)',
    desc: '소비자들이 좋아하는 찰보리로 밥에 섞었을 때 부드럽고 구수하며 보리호위축병에 강해 안정적으로 다수확이 가능합니다.',
    meta: '주요 재배: 남부 이모작 지대 | 2026 동계작물 통합공급 품목'
  }
];

function initVarietyMatcher() {
  const cropToggles = document.getElementById('cropTypeToggles');
  const traitToggles = document.getElementById('traitToggles');
  const resultContainer = document.getElementById('recommendationResults');

  if (!cropToggles || !resultContainer) return;

  let currentCrop = 'rice';
  let currentTrait = 'taste';

  function renderRecommendations() {
    const matched = VARIETY_DATABASE.filter(item => {
      const matchCrop = item.crop === currentCrop;
      const matchTrait = item.trait === currentTrait;
      return matchCrop && matchTrait;
    });

    // 만약 해당 조건 조합이 비어있으면 해당 작물 전체 표시
    const displayList = matched.length > 0 ? matched : VARIETY_DATABASE.filter(item => item.crop === currentCrop);

    resultContainer.innerHTML = displayList.map(item => `
      <div class="rec-card">
        <span class="rec-crop-badge">${item.cropName}</span>
        <h4 class="rec-name">${item.name}</h4>
        <p class="rec-desc">${item.desc}</p>
        <div class="rec-meta">📌 ${item.meta}</div>
      </div>
    `).join('');
  }

  cropToggles.querySelectorAll('.pill-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      cropToggles.querySelectorAll('.pill-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCrop = btn.getAttribute('data-crop');
      renderRecommendations();
    });
  });

  traitToggles.querySelectorAll('.pill-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      traitToggles.querySelectorAll('.pill-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTrait = btn.getAttribute('data-trait');
      renderRecommendations();
    });
  });

  renderRecommendations();
}

/* ==========================================================================
   6. [도전!] 종자 상식 퀴즈 마스터
   ========================================================================== */
const QUIZ_DATA = [
  {
    question: "Q1. 국립종자원에서 공급하는 '정부 보급종'의 가장 큰 장점은 무엇일까요?",
    options: [
      "가격이 시중 일반 종자보다 10배 이상 비싸다",
      "엄격한 2단계 검사(포장검사, 실내검사)를 거쳐 순도 99% 이상과 높은 발아율이 국가 보증된다",
      "파종 후 물을 전혀 주지 않아도 저절로 자란다",
      "유통기한 없이 50년 동안 보관이 가능하다"
    ],
    answer: 1,
    explanation: "정부 보급종은 이형주(다른 품종) 혼입이 없고, 병해충 소독 및 발아율 85% 이상 검정을 통과한 종자만을 국가가 공증하여 농가에 공급합니다."
  },
  {
    question: "Q2. 2026년 국립종자원이 벼 종자 생산 필지에 전격 도입한 혁신 기술은?",
    options: [
      "드론으로 종자를 우주로 쏘아 올리는 기술",
      "46년 기상 빅데이터와 적산온도를 분석하는 '인공지능(AI) 기반 종자 수확기 예측 프로그램'",
      "종자를 금으로 코팅하는 특수 공정",
      "로봇이 쌀알을 하나씩 손으로 깎는 공법"
    ],
    answer: 1,
    explanation: "한국전자기술연구원과 공동 개발한 AI 수확기 예측 프로그램은 오차 ±3일 이내로 적정 수확기를 예측해 이상기후로 인한 수발아 피해를 사전 차단하고 있습니다."
  },
  {
    question: "Q3. 새로운 식물 품종을 개발한 육종가에게 부여되는 독점적 지식재산권은?",
    options: [
      "상표권",
      "신품종보호권 (식물 특허)",
      "저작인접권",
      "어업면허권"
    ],
    answer: 1,
    explanation: "신품종보호권은 UPOV 협약 및 식물신품종보호법에 따라 품종 육성자의 권리를 최대 20~25년간 법적으로 보장하는 식물계의 특허 제도입니다."
  },
  {
    question: "Q4. 국립종자원 본원이 위치한 혁신도시는 어디일까요?",
    options: [
      "제주특별자치도 서귀포시",
      "경상북도 김천시 (혁신도시)",
      "강원도 춘천시",
      "전라남도 나주시"
    ],
    answer: 1,
    explanation: "국립종자원 본원은 경북 김천 혁신도시에 위치하며, 전국 10개 관할 지원과 국제종자생명교육센터를 총괄하고 있습니다."
  },
  {
    question: "Q5. 2026년 농가의 편의를 위해 처음으로 생산·공급 계획이 하나로 통합된 작물군은?",
    options: [
      "열대 과일(망고·바나나)",
      "동계작물 (밀, 쌀보리, 겉보리, 맥주보리 등 5,685톤)",
      "커피 원두",
      "희귀 약초"
    ],
    answer: 1,
    explanation: "그동안 국립종자원과 한국농업기술진흥원으로 나뉘어 있던 동계작물 보급종 공급 체계가 2026년 처음으로 단일 협의체로 일원화되어 농가 혼선이 사라졌습니다."
  }
];

function initQuizMaster() {
  let currentIndex = 0;
  let score = 0;

  const quizCard = document.getElementById('quizCard');
  const quizCompleteCard = document.getElementById('quizCompleteCard');
  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const feedbackEl = document.getElementById('quizFeedback');
  const feedbackResult = document.getElementById('feedbackResult');
  const feedbackExplanation = document.getElementById('feedbackExplanation');
  const btnNext = document.getElementById('btnNextQuiz');
  const btnRestart = document.getElementById('btnRestartQuiz');
  const currEl = document.getElementById('quizCurr');
  const totalEl = document.getElementById('quizTotal');
  const finalScoreEl = document.getElementById('quizFinalScore');
  const scoreMsgEl = document.getElementById('quizScoreMsg');

  if (!quizCard) return;

  totalEl.textContent = QUIZ_DATA.length;

  function loadQuestion(index) {
    feedbackEl.classList.add('hidden');
    currEl.textContent = index + 1;
    const item = QUIZ_DATA[index];
    questionEl.textContent = item.question;

    optionsEl.innerHTML = '';
    item.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-opt-btn';
      btn.textContent = `${optIdx + 1}. ${optText}`;
      btn.addEventListener('click', () => handleAnswer(optIdx, item.answer, item.explanation));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, correctIndex, explanation) {
    const buttons = optionsEl.querySelectorAll('.quiz-opt-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    feedbackEl.classList.remove('hidden');
    if (selectedIndex === correctIndex) {
      score++;
      feedbackResult.textContent = '🎉 정답입니다!';
      feedbackResult.className = 'feedback-badge success';
    } else {
      feedbackResult.textContent = '💡 오답입니다!';
      feedbackResult.className = 'feedback-badge error';
    }
    feedbackExplanation.textContent = explanation;
  }

  btnNext.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < QUIZ_DATA.length) {
      loadQuestion(currentIndex);
    } else {
      showCompletion();
    }
  });

  function showCompletion() {
    quizCard.classList.add('hidden');
    quizCompleteCard.classList.remove('hidden');
    finalScoreEl.textContent = `${score} / ${QUIZ_DATA.length}`;

    if (score === QUIZ_DATA.length) {
      scoreMsgEl.textContent = '축하합니다! 국립종자원과 대한민국의 씨앗 정책을 완벽히 꿰뚫고 계시네요!';
    } else if (score >= 3) {
      scoreMsgEl.textContent = '훌륭합니다! 우리 식량주권을 지키는 종자의 가치에 대해 깊은 이해를 갖고 계십니다.';
    } else {
      scoreMsgEl.textContent = '수고하셨습니다! 안내 포털의 내용을 천천히 둘러보시고 다시 도전해보세요.';
    }
  }

  btnRestart.addEventListener('click', () => {
    currentIndex = 0;
    score = 0;
    quizCompleteCard.classList.add('hidden');
    quizCard.classList.remove('hidden');
    loadQuestion(currentIndex);
  });

  // 초기 문제 로드
  loadQuestion(0);
}

/* ==========================================================================
   7. 뉴스룸 실시간 필터 및 검색 시스템
   ========================================================================== */
function initNewsFilterAndSearch() {
  const filterBtns = document.querySelectorAll('#newsFilterButtons .btn-news-filter');
  const searchInput = document.getElementById('newsSearchInput');
  const newsCards = document.querySelectorAll('#newsArticleGrid .news-card');

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilters() {
    let visibleCount = 0;

    newsCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = card.textContent.toLowerCase();

      const matchesCat = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = searchTerm === '' || cardText.includes(searchTerm);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // 검색 결과 없음 피드백 처리
    let noResultMsg = document.getElementById('newsNoResult');
    if (visibleCount === 0) {
      if (!noResultMsg) {
        noResultMsg = document.createElement('div');
        noResultMsg.id = 'newsNoResult';
        noResultMsg.className = 'text-center';
        noResultMsg.style.gridColumn = '1 / -1';
        noResultMsg.style.padding = '3rem 1rem';
        noResultMsg.innerHTML = '<p style="font-size: 1.1rem; color: var(--text-subtle);">🔍 검색 조건에 일치하는 기사가 없습니다.</p>';
        document.getElementById('newsArticleGrid').appendChild(noResultMsg);
      }
    } else if (noResultMsg) {
      noResultMsg.remove();
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

/* ==========================================================================
   8. 전국 관할 지원 안내 인터랙티브 탭
   ========================================================================== */
const BRANCH_DATA = {
  hq: {
    name: '국립종자원 본원 (김천 혁신도시)',
    role: '총괄 본부 / 종자산업 컨트롤타워',
    address: '경상북도 김천시 혁신8로 119 (율곡동)',
    tel: '054-912-0114',
    duty: '종자 정책 총괄, 품종보호 출원·심사, 국가보증 보급종 종합 수급계획 수립, 국제협력(UPOV/KOICA)'
  },
  gangwon: {
    name: '강원지원',
    role: '중북부 고랭지 및 옥수수·감자 보급 거점',
    address: '강원특별자치도 평창군 대관령면 차항지길 44',
    tel: '033-336-6244',
    duty: '고랭지 씨감자 및 옥수수 보급종 관리, 강원권 벼·콩 종자 검사 및 유통조사'
  },
  chungbuk: {
    name: '충북지원',
    role: '중원 식량작물 보급 및 과수 무병화 지원',
    address: '충청북도 제천시 바이오밸리1로 56',
    tel: '043-643-4065',
    duty: '충북권 벼·보리·콩 보급종 생산 및 공급, 과수 무병묘(바이러스 프리) 생산 지도'
  },
  chungnam: {
    name: '충남지원',
    role: '서해안 곡창지대 벼·보리 보급 핵심',
    address: '충청남도 아산시 선장면 삽교천로 66',
    tel: '041-541-6646',
    duty: '삼광벼 등 충남권 주력 보급종 채종포 정밀 관리, 볍씨 발아율 및 순도 검정'
  },
  jeonbuk: {
    name: '전북지원',
    role: '호남 최대 보급종 정선시설 & 콩 산업 중심',
    address: '전북특별자치도 익산시 익산대로 452',
    tel: '063-862-7241',
    duty: '참동진·신동진 벼 및 대원콩·선풍콩 대규모 정선·저장, 종자 품질보증'
  },
  jeonnam: {
    name: '전남지원',
    role: '친환경 및 남부 적응형 보급종 생산',
    address: '전라남도 영암군 삼호읍 녹색로 614-27',
    tel: '061-460-2100',
    duty: '영호진미, 백옥향 등 남부 기후 적합 보급종 생산, 친환경 벼 채종단지 육성'
  },
  gyeongbuk: {
    name: '경북지원',
    role: '영남 내륙 식량작물 보급 및 과수 묘목 단속',
    address: '경상북도 안동시 풍산읍 괴정2길 11',
    tel: '054-858-5703',
    duty: '일품벼, 안동 마 등 지역 특화 종자 보증, 묘목 유통질서 확립 특사경 수사'
  },
  gyeongnam: {
    name: '경남지원',
    role: '동남권 식량종자 및 원예 종자 유통 관리',
    address: '경상남도 밀양시 점필재로 115',
    tel: '055-352-9552',
    duty: '경남권 벼·보리 보급종 수급 및 부산·경남 일원 수입 원예종자 통관 검사'
  },
  jeju: {
    name: '제주지원',
    role: '도서지역 종자 보급 및 아열대 작물 조사',
    address: '제주특별자치도 제주시 산천단동길 16',
    tel: '064-746-2077',
    duty: '제주 도내 콩(신화콩 등) 보급종 분양, 기후온난화 대응 아열대 신품종 특성 조사'
  },
  edu: {
    name: '국제종자생명교육센터',
    role: '종자산업 글로벌 인재양성의 요람',
    address: '경상북도 김천시 혁신8로 119 (본원 구내)',
    tel: '054-912-0180',
    duty: '종자관리사 및 육묘업자 법정 교육, 아시아·개도국 농업 공무원 초청 연수(KOICA)'
  }
};

function initBranchTabs() {
  const branchBtns = document.querySelectorAll('#branchButtons .btn-branch');
  const nameEl = document.getElementById('branchName');
  const roleEl = document.getElementById('branchRole');
  const addrEl = document.getElementById('branchAddress');
  const telEl = document.getElementById('branchTel');
  const dutyEl = document.getElementById('branchDuty');

  if (!branchBtns.length || !nameEl) return;

  branchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      branchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const branchKey = btn.getAttribute('data-branch');
      const data = BRANCH_DATA[branchKey];
      if (data) {
        nameEl.textContent = data.name;
        roleEl.textContent = data.role;
        addrEl.textContent = data.address;
        telEl.textContent = data.tel;
        dutyEl.textContent = data.duty;
      }
    });
  });
}
