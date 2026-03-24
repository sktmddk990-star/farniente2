// 1. 전역 상태 관리 (애니메이션 부드러움을 위해)
let targetProgress = 0;   // 스크롤에 따른 목표값
let currentProgress = 0;  // 현재 화면에 반영되는 애니메이션 값

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 상단바(Header) 스크롤 감지 ---
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        // 상단바 배경 전환
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // --- 히어로 섹션 계산 ---
        const section = document.querySelector('.hero-section');
        if (section) {
            const scrollY = window.scrollY;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight - window.innerHeight;

            // 진행률 계산 (0 ~ 1)
            let prog = (scrollY - sectionTop) / sectionHeight;
            targetProgress = Math.max(0, Math.min(1, prog));
        }
    });

    // --- 애니메이션 루프 (RequestAnimationFrame) ---
    // 이 함수가 프레임 단위로 실행되면서 부드러운 움직임을 만듭니다.
    function animate() {
        // 부드러운 가속도 로직 (Lerp)
        // 현재값과 목표값 사이를 10%씩 계속 채워나갑니다.
        currentProgress += (targetProgress - currentProgress) * 0.1;

        const frame = document.querySelector('.hero-image-frame');
        const textArea = document.querySelector('.hero-text-area');
        const img = frame ? frame.querySelector('img') : null;

        if (frame) {
            // 1. 이미지 프레임 높이 조절 (30vh -> 100vh)
            const height = 30 + (currentProgress * 70);
            frame.style.height = `${height}vh`;

            // 2. 이미지 내부 줌 효과 (1.2배에서 1배로 부드럽게 줌아웃)
            if (img) {
                img.style.transform = `scale(${1.2 - (currentProgress * 0.2)})`;
            }
        }

        if (textArea) {
            // 3. 텍스트 투명도 및 위치 조절
            // 이미지가 어느 정도 올라오면(0.4 지점) 더 빨리 사라지게 처리
            textArea.style.opacity = 1 - (currentProgress * 2.5);
            textArea.style.transform = `translateY(-${currentProgress * 100}px)`;
        }

        // 다음 프레임 예약
        requestAnimationFrame(animate);
    }

    // 애니메이션 시작
    animate();
});

console.log("New Project: JS Engine Started (Smooth Scroll Applied)");

//여기서부터 비전 자바
const visionText = document.querySelector('.vision-text');
let scrollPos = 0;

function marqueeAnimate() {
    // 이동 속도 조절 (숫자가 작을수록 느리고 고급스러움)
    scrollPos -= 1; 

    if (visionText) {
        // 첫 번째 문장(span 하나)의 길이를 측정
        const firstSpan = visionText.querySelector('span');
        const firstSpanWidth = firstSpan.offsetWidth;

        // 문장 하나가 완전히 왼쪽으로 사라지면 위치를 0으로 리셋
        if (Math.abs(scrollPos) >= firstSpanWidth) {
            scrollPos = 0;
        }

        visionText.style.transform = `translateX(${scrollPos}px)`;
    }
    
    requestAnimationFrame(marqueeAnimate);
}

// 실행!
marqueeAnimate();

// 여기부터 벨류섹션 자바
window.addEventListener('scroll', () => {
    const section = document.querySelector('.value-section');
    const items = document.querySelectorAll('.value-item');
    const leftImages = document.querySelectorAll('.value-img'); // 이 줄이 반드시 있어야 합니다!

    if (!section || items.length === 0) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const vh = window.innerHeight;

    const scrolled = -rect.top; 
    
    if (scrolled >= 0 && scrolled <= sectionHeight - vh) {
        const index = Math.floor(scrolled / ((sectionHeight - vh) / 3));
        const safeIndex = Math.min(items.length - 1, Math.max(0, index));

        // 우측 텍스트 아이템 활성화
        items.forEach((item, i) => {
            item.classList.toggle('active', i === safeIndex);
        });
        
        // 좌측 이미지 활성화
        leftImages.forEach((img, i) => {
            img.classList.toggle('active', i === safeIndex);
        });
    }
});

//파트너쉽 탭메뉴 효과 부분
const tabBtns = document.querySelectorAll('.tab-btn');
const logoGrids = document.querySelectorAll('.logo-grid');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // 모든 버튼 비활성화
        tabBtns.forEach(b => b.classList.remove('active'));
        // 모든 그리드 숨김
        logoGrids.forEach(g => g.classList.remove('active'));

        // 클릭한 버튼과 해당 그리드만 활성화
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

 // --- 컨택트 섹션 가로선 애니메이션 ---
        const divider = document.querySelector('.contact-divider');
        const contactArea = document.querySelector('.contact-area');
        if(divider && contactArea) {
            const cRect = contactArea.getBoundingClientRect();
            const winH = window.innerHeight;
            if (cRect.top < winH && cRect.bottom > 0) {
                let p = (winH - cRect.top) / (winH + cRect.height);
                divider.style.height = `${Math.min(100, p * 150)}%`;
            }
        }