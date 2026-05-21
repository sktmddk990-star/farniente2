let targetProgress = 0;
let currentProgress = 0;

document.addEventListener('DOMContentLoaded', () => {

    // --- 상단바(Header) 스크롤 감지 ---
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
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

    // --- 애니메이션 루프 (히어로 이미지 프레임 높이 확장) ---
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

// ✅ VALUE 섹션 강제 고정 및 정밀 전환 로직
window.addEventListener('scroll', () => {
    const valueSection = document.querySelector('.value-section');
    const valueItems = document.querySelectorAll('.value-item');
    const valueImages = document.querySelectorAll('.value-img');

    if (!valueSection || valueItems.length === 0) return;

    // 밸류 섹션의 위치 정보
    const sectionTop = valueSection.offsetTop;
    const sectionHeight = valueSection.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // 섹션이 화면에 들어왔는지 확인
    const isInView = scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight;

    if (isInView) {
        // 섹션 내에서의 스크롤 진행도 계산
        const relativeScroll = scrollY - sectionTop;
        const maxScroll = sectionHeight - windowHeight;
        const progress = Math.max(0, Math.min(1, relativeScroll / maxScroll));

        // 3개 아이템이므로 인덱스 계산
        let activeIndex = Math.floor(progress * valueItems.length);
        activeIndex = Math.min(valueItems.length - 1, Math.max(0, activeIndex));

        // 모든 아이템과 이미지에서 active 제거
        valueItems.forEach((item, i) => {
            item.classList.remove('active');
        });
        valueImages.forEach((img, i) => {
            img.classList.remove('active');
        });

        // 현재 인덱스에만 active 추가
        if (valueItems[activeIndex]) {
            valueItems[activeIndex].classList.add('active');
        }
        if (valueImages[activeIndex]) {
            valueImages[activeIndex].classList.add('active');
        }
    } else if (scrollY < sectionTop) {
        // 섹션 이전: 첫 번째 활성화
        valueItems.forEach((item, i) => item.classList.toggle('active', i === 0));
        valueImages.forEach((img, i) => img.classList.toggle('active', i === 0));
    } else {
        // 섹션 이후: 마지막 활성화
        const lastIndex = valueItems.length - 1;
        valueItems.forEach((item, i) => item.classList.toggle('active', i === lastIndex));
        valueImages.forEach((img, i) => img.classList.toggle('active', i === lastIndex));
    }
}, { passive: true });

// 파트너십 탭 메뉴
const tabBtns = document.querySelectorAll('.tab-btn');
const logoGrids = document.querySelectorAll('.logo-grid');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        logoGrids.forEach(g => g.classList.remove('active'));

        btn.classList.add('active');
        const targetGrid = document.getElementById(targetTab);
        if (targetGrid) targetGrid.classList.add('active');
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
            divider.style.width = `${Math.min(100, p * 150)}%`;
        }
    }
});