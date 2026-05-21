// 전역 상태 관리 (애니메이션 부드러움을 위해)
let targetProgress = 0;
let currentProgress = 0;

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

            let prog = (scrollY - sectionTop) / sectionHeight;
            targetProgress = Math.max(0, Math.min(1, prog));
        }
    });

    // --- 애니메이션 루프 (RequestAnimationFrame) ---
    function animate() {
        currentProgress += (targetProgress - currentProgress) * 0.1;

        const frame = document.querySelector('.hero-image-frame');
        const textArea = document.querySelector('.hero-text-area');
        const img = frame ? frame.querySelector('img') : null;

        if (frame) {
            const height = 30 + (currentProgress * 70);
            frame.style.height = `${height}vh`;

            if (img) {
                img.style.transform = `scale(${1.2 - (currentProgress * 0.2)})`;
            }
        }

        if (textArea) {
            textArea.style.opacity = 1 - (currentProgress * 2.5);
            textArea.style.transform = `translateY(-${currentProgress * 100}px)`;
        }

        requestAnimationFrame(animate);
    }

    animate();
});

console.log("Farniente: JS Engine Started");

// 비전 마퀴
const visionText = document.querySelector('.vision-text');
let scrollPos = 0;

function marqueeAnimate() {
    scrollPos -= 1;

    if (visionText) {
        const firstSpan = visionText.querySelector('span');
        const firstSpanWidth = firstSpan.offsetWidth;

        if (Math.abs(scrollPos) >= firstSpanWidth) {
            scrollPos = 0;
        }

        visionText.style.transform = `translateX(${scrollPos}px)`;
    }

    requestAnimationFrame(marqueeAnimate);
}

marqueeAnimate();

// value 섹션
window.addEventListener('scroll', () => {
    const section = document.querySelector('.value-section');
    const items = document.querySelectorAll('.value-item');
    const leftImages = document.querySelectorAll('.value-img');

    if (!section || items.length === 0) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const vh = window.innerHeight;

    const scrolled = -rect.top;

    if (scrolled >= 0 && scrolled <= sectionHeight - vh) {
        const index = Math.floor(scrolled / ((sectionHeight - vh) / 3));
        const safeIndex = Math.min(items.length - 1, Math.max(0, index));

        items.forEach((item, i) => {
            item.classList.toggle('active', i === safeIndex);
        });

        leftImages.forEach((img, i) => {
            img.classList.toggle('active', i === safeIndex);
        });
    }
});

// 파트너십 탭 메뉴
const tabBtns = document.querySelectorAll('.tab-btn');
const logoGrids = document.querySelectorAll('.logo-grid');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        logoGrids.forEach(g => g.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// contact 섹션 가로선 애니메이션
window.addEventListener('scroll', () => {
    const divider = document.querySelector('.contact-divider');
    const contactArea = document.querySelector('.contact-area');
    if (divider && contactArea) {
        const cRect = contactArea.getBoundingClientRect();
        const winH = window.innerHeight;
        if (cRect.top < winH && cRect.bottom > 0) {
            let p = (winH - cRect.top) / (winH + cRect.height);
            divider.style.height = `${Math.min(100, p * 150)}%`;
        }
    }
});