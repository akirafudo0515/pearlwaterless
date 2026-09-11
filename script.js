/**
 * Pearl Waterless International (Taiwan Edition)
 * 核心互動控制腳本 (四大核心旗艦版)
 * 1. 響應式自動輪播橫幅 (Auto-playing Slider, Pause on Hover, Dots, Prev/Next)
 * 2. 手機版選單切換 (Mobile Nav Toggle)
 * 3. 產品類別過濾 (Category Filter on products.html)
 * 4. 愛車族個人節水省時計算機 (Personal Savings Calculator)
 * 5. 常見問題手風琴 (FAQ Accordion)
 * 6. 顧客諮詢表單互動 (Customer Inquiry Form)
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. 自動輪播橫幅 (Banner Slider)
  const slider = document.querySelector('.slider-container');
  if (slider) {
    const slides = slider.querySelectorAll('.slide');
    const dotsContainer = slider.querySelector('.slider-dots');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    let currentIndex = 0;
    let slideInterval = null;
    const intervalTime = 5000;

    // 動態生成指示點
    if (dotsContainer && slides.length > 0) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', `前往第 ${idx + 1} 張投影片`);
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetInterval();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = slider.querySelectorAll('.slider-dot');

    function updateSlider(index) {
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === index);
      });
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });
      currentIndex = index;
    }

    function nextSlide() {
      let nextIndex = (currentIndex + 1) % slides.length;
      updateSlider(nextIndex);
    }

    function prevSlide() {
      let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider(prevIndex);
    }

    function goToSlide(index) {
      updateSlider(index);
    }

    function startAutoPlay() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }

    function resetInterval() {
      stopAutoPlay();
      startAutoPlay();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
      });
    }

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // 觸控滑動支援
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      }
      startAutoPlay();
    }, { passive: true });

    startAutoPlay();
  }

  // 2. 手機版選單切換
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
      mobileBtn.textContent = isExpanded ? '✕' : '☰';
      document.body.style.overflow = isExpanded ? 'hidden' : '';
      if (!isExpanded) {
        navLinks.querySelectorAll('.nav-item-dropdown.open').forEach((item) => {
          item.classList.remove('open');
        });
      }
    });

    navLinks.querySelectorAll('a[href]:not(.dropdown-toggle)').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 992px)').matches) {
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
          mobileBtn.textContent = '☰';
          mobileBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 2b. 產品說明下拉選單（手機點擊切換）
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
  dropdownItems.forEach((item) => {
    const toggle = item.querySelector('.dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      const isMobile = window.matchMedia('(max-width: 992px)').matches;
      if (!isMobile) return;
      e.preventDefault();
      const willOpen = !item.classList.contains('open');
      dropdownItems.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open', willOpen);
    });
  });

  // 2c. 知識交流區文章卡片展開
  document.querySelectorAll('.article-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.article-card');
      if (!card) return;
      const willOpen = !card.classList.contains('open');
      document.querySelectorAll('.article-card.open').forEach((other) => {
        if (other !== card) other.classList.remove('open');
      });
      card.classList.toggle('open', willOpen);
    });
  });

  // 3. 產品類別過濾 (Category Filter on products.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.filter-product-card');

  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. 個人愛車族省水省時計算機 (Personal Savings Calculator)
  const fleetSlider = document.getElementById('calc-fleet');
  const washesSlider = document.getElementById('calc-washes');
  const fleetValDisplay = document.getElementById('calc-fleet-val');
  const washesValDisplay = document.getElementById('calc-washes-val');
  const waterSavedDisplay = document.getElementById('calc-water-saved');
  const co2ReducedDisplay = document.getElementById('calc-co2-reduced');
  const moneySavedDisplay = document.getElementById('calc-money-saved');

  function updateCalculator() {
    if (!fleetSlider || !washesSlider) return;

    const carsCount = parseInt(fleetSlider.value, 10);
    const washesPerMonth = parseInt(washesSlider.value, 10);

    if (fleetValDisplay) fleetValDisplay.textContent = `${carsCount} 輛`;
    if (washesValDisplay) washesValDisplay.textContent = `${washesPerMonth} 次/月`;

    const totalWashesPerYear = carsCount * washesPerMonth * 12;
    // 每次傳統洗車約 300 公升
    const totalLitersSaved = totalWashesPerYear * 300;
    // 每次省下往返與排隊約 1.5 小時
    const totalHoursSaved = Math.round(totalWashesPerYear * 1.5);
    // 每次自助洗車花費約 180 元 (投幣高壓水/泡沫/吹風/打蠟)
    const costSavedNTD = Math.round(totalWashesPerYear * 180);

    if (waterSavedDisplay) {
      waterSavedDisplay.textContent = Number(totalLitersSaved).toLocaleString();
    }
    if (co2ReducedDisplay) {
      co2ReducedDisplay.textContent = Number(totalHoursSaved).toLocaleString();
    }
    if (moneySavedDisplay) {
      moneySavedDisplay.textContent = Number(costSavedNTD).toLocaleString();
    }
  }

  if (fleetSlider && washesSlider) {
    fleetSlider.addEventListener('input', updateCalculator);
    washesSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 5. 常見問題手風琴
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 6. 顧客諮詢表單互動模擬
  const inquiryForm = document.querySelector('#inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const origText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '傳送中...';
        setTimeout(() => {
          alert('【諮詢已送出】\n感謝您的洽詢！Pearl 珍珠環保免水洗車客服專員已收到您的訊息，我們將於 1 個工作日內與您聯絡並提供專屬選購建議與配送資訊。');
          inquiryForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
        }, 800);
      }
    });
  }

});
