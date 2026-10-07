/**
 * MALAR DREAM EVENTS - INTERACTIVE WEB APPLICATION SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initNavbar();
  initProcessStepper();
  initCalculator();
  initServicesFilter();
  initGalleryModal();
  initContactForm();
  init3DTilt();
  initQRModal();
});

/* ==========================================
   1. PARTICLES & BOKEH CANVAS ANIMATION
   ========================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('canvas-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 65);

  class GoldParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.6 - 0.2; // slight upward float
      this.alpha = Math.random() * 0.7 + 0.2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Twinkle alpha effect
      this.alpha += Math.sin(Date.now() * this.twinkleSpeed) * 0.01;
      if (this.alpha < 0.1) this.alpha = 0.1;
      if (this.alpha > 0.9) this.alpha = 0.9;

      // Wrap around edges
      if (this.y < 0) this.y = height;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249, 226, 156, ${this.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new GoldParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================
   2. NAVBAR & NAVIGATION
   ========================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* ==========================================
   3. EVENT PLANNING PROCESS STEPPER (Slide 4)
   ========================================== */
const processStepsData = [
  {
    step: 1,
    title: 'Consultation',
    subtitle: 'Understanding Your Vision',
    desc: 'We begin with an in-depth consultation to listen to your dreams, preferences, guest expectations, and budget. Our creative team takes note of every detail to craft a bespoke theme.',
    highlights: ['Personalized Discussion', 'Venue & Capacity Mapping', 'Initial Concept Board']
  },
  {
    step: 2,
    title: 'Planning & Budgeting',
    subtitle: 'Meticulous Financial & Logistical Blueprint',
    desc: 'Our financial and logistics experts design a transparent budget allocation. We lock down top vendor partners (decor, lighting, catering, photography) with full transparent planning.',
    highlights: ['Custom Budget Optimization', 'Vendor Alignment & Contracts', 'Detailed Timeline Schedule']
  },
  {
    step: 3,
    title: 'Design & Coordination',
    subtitle: '3D Stage Conceptualization & Floral Artistry',
    desc: 'We transform concepts into reality with 3D stage mockups, mood boards, floral arrangement selection, lighting design, and personalized invitation cards.',
    highlights: ['3D Decor Visualization', 'Theme & Color Palette', 'Invitation & Sound Setup']
  },
  {
    step: 4,
    title: 'Execution',
    subtitle: 'Flawless On-Site Realization',
    desc: 'On the event day, our master coordinators manage everything on-site — from stage setup and artist arrivals to guest welcome and dinner flow. Zero stress for you!',
    highlights: ['On-Site Event Managers', 'Guest Hospitality Team', 'Real-Time Schedule Control']
  },
  {
    step: 5,
    title: 'Celebration & Success',
    subtitle: 'Unforgettable Memories Captured',
    desc: 'Enjoy your special day to the fullest surrounded by your loved ones while we take care of every minute detail behind the scenes. Pure joy and royal perfection.',
    highlights: ['Seamless Event Flow', 'Unforgettable Guest Experience', 'Complete Peace of Mind']
  }
];

function initProcessStepper() {
  const stepNodes = document.querySelectorAll('.step-node');
  const cardContainer = document.getElementById('step-detail-card');
  if (!stepNodes.length || !cardContainer) return;

  function renderStep(stepIndex) {
    const data = processStepsData[stepIndex];
    stepNodes.forEach((node, idx) => {
      if (idx === stepIndex) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    cardContainer.innerHTML = `
      <div class="step-detail-badge">0${data.step}</div>
      <div class="step-detail-content">
        <div class="sub-heading">${data.subtitle}</div>
        <h3>${data.title}</h3>
        <p>${data.desc}</p>
        <div style="margin-top: 1.2rem; display: flex; gap: 0.8rem; flex-wrap: wrap;">
          ${data.highlights.map(h => `<span style="background: rgba(212,175,55,0.15); border: 1px solid var(--gold-border); color: var(--gold-light); padding: 0.3rem 0.8rem; border-radius: var(--radius-full); font-size: 0.85rem;">✓ ${h}</span>`).join('')}
        </div>
      </div>
    `;
  }

  stepNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const stepIdx = parseInt(node.getAttribute('data-step')) - 1;
      renderStep(stepIdx);
    });
  });

  // Render initial step
  renderStep(0);
}

/* ==========================================
   4. INTERACTIVE EVENT COST CALCULATOR
   ========================================== */
function initCalculator() {
  const eventTypeBtns = document.querySelectorAll('[data-calc-type]');
  const guestBtns = document.querySelectorAll('[data-calc-guests]');
  const levelBtns = document.querySelectorAll('[data-calc-level]');
  const addonChecks = document.querySelectorAll('[data-calc-addon]');
  const priceDisplay = document.getElementById('calc-total-price');
  const breakdownList = document.getElementById('calc-breakdown');
  const bookCalcBtn = document.getElementById('btn-book-calc');

  if (!priceDisplay || !breakdownList) return;

  let state = {
    eventType: 'Wedding & Reception',
    guestCount: '150 - 400',
    levelName: 'Royal Deluxe',
    addons: []
  };

  function updateCalc() {
    priceDisplay.innerHTML = `Custom Quote Ready`;

    // Render Breakdown
    breakdownList.innerHTML = `
      <li><span>Event Type:</span> <strong>${state.eventType}</strong></li>
      <li><span>Guest Count:</span> <strong>${state.guestCount}</strong></li>
      <li><span>Decor Level:</span> <strong>${state.levelName}</strong></li>
      <li><span>Selected Add-ons:</span> <strong>${state.addons.length > 0 ? state.addons.join(', ') : 'None'}</strong></li>
    `;
  }

  // Handle Event Type Selection
  eventTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      eventTypeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.eventType = btn.innerText;
      updateCalc();
    });
  });

  // Handle Guest Selection
  guestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      guestBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.guestCount = btn.innerText;
      updateCalc();
    });
  });

  // Handle Level Selection
  levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      levelBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.levelName = btn.innerText;
      updateCalc();
    });
  });

  // Handle Addons
  addonChecks.forEach(check => {
    check.addEventListener('change', () => {
      state.addons = [];
      addonChecks.forEach(c => {
        if (c.checked) {
          state.addons.push(c.value);
        }
      });
      updateCalc();
    });
  });

  if (bookCalcBtn) {
    bookCalcBtn.addEventListener('click', () => {
      const addonText = state.addons.length > 0 ? `\n- Add-ons: ${state.addons.join(', ')}` : '';
      const msg = encodeURIComponent(`Hi Malar Dream Events, I customized a package request on your website!\n- Event: ${state.eventType}\n- Guests: ${state.guestCount}\n- Decor Level: ${state.levelName}${addonText}\n\nPlease contact me with a custom quote for this event!`);
      window.open(`https://wa.me/916385637986?text=${msg}`, '_blank');
    });
  }

  // Initial Calculation
  updateCalc();
}

/* ==========================================
   5. SERVICES FILTER & MODALS
   ========================================== */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   6. GALLERY & LIGHTBOX MODAL
   ========================================== */
function initGalleryModal() {
  const items = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCap = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('close-lightbox');

  if (!modal || !modalImg) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4');
      if (img) {
        modalImg.src = img.src;
        modalCap.innerText = title ? title.innerText : 'Malar Dream Events Celebration';
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================
   7. CONTACT & BOOKING FORM
   ========================================== */
function initContactForm() {
  const form = document.getElementById('event-booking-form');
  const modal = document.getElementById('success-modal');
  const closeModal = document.getElementById('close-success-modal');
  const modalDetails = document.getElementById('modal-booking-details');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const eventType = document.getElementById('form-event-type').value;
    const date = document.getElementById('form-date').value;
    const guests = document.getElementById('form-guests').value;
    const notes = document.getElementById('form-notes').value.trim();

    if (!name || !phone || !date) {
      alert('Please fill in all required fields (Name, Mobile, Event Date).');
      return;
    }

    if (modalDetails) {
      modalDetails.innerHTML = `
        <p style="margin-bottom: 0.5rem;"><strong>Name:</strong> ${name}</p>
        <p style="margin-bottom: 0.5rem;"><strong>Phone / WhatsApp:</strong> ${phone}</p>
        <p style="margin-bottom: 0.5rem;"><strong>Event Type:</strong> ${eventType}</p>
        <p style="margin-bottom: 0.5rem;"><strong>Date of Event:</strong> ${date}</p>
        <p style="margin-bottom: 0.5rem;"><strong>Guest Count:</strong> ${guests}</p>
        ${notes ? `<p style="margin-bottom: 0.5rem;"><strong>Special Wishes:</strong> ${notes}</p>` : ''}
      `;
    }

    if (modal) {
      modal.classList.add('active');
    }

    // Prepare WhatsApp Quick Link
    const waText = encodeURIComponent(
      `*MALAR DREAM EVENTS - NEW BOOKING INQUIRY*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🎉 *Event:* ${eventType}\n` +
      `📅 *Date:* ${date}\n` +
      `👥 *Guests:* ${guests}\n` +
      `📝 *Notes:* ${notes || 'N/A'}`
    );

    const waBtn = document.getElementById('wa-confirm-btn');
    if (waBtn) {
      waBtn.href = `https://wa.me/916385637986?text=${waText}`;
    }

    form.reset();
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}

/* ==========================================
   8. 3D HERO LOGO PARALLAX TILT
   ========================================== */
function init3DTilt() {
  const card = document.getElementById('hero-tilt-card');
  const ring = card ? card.querySelector('.hero-3d-ring-outer') : null;
  if (!card || !ring) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / (rect.height / 2)) * -18;
    const rotateY = (x / (rect.width / 2)) * 18;

    ring.style.animation = 'none';
    ring.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.06, 1.06, 1.06)`;
  });

  card.addEventListener('mouseleave', () => {
    ring.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setTimeout(() => {
      ring.style.animation = 'hero3dFloat 6s ease-in-out infinite';
    }, 300);
  });
}

/* ==========================================
   9. QR CODE & LIVE CAMERA SCANNER HANDLER
   ========================================== */
function initQRModal() {
  const openBtn = document.getElementById('btn-open-qr');
  const modal = document.getElementById('qr-modal');
  const modalContent = document.getElementById('qr-modal-content');
  const closeBtn = document.getElementById('close-qr-modal');

  const tabBtnScan = document.getElementById('tab-btn-scan');
  const tabBtnBrowser = document.getElementById('tab-btn-browser');
  const tabBtnCode = document.getElementById('tab-btn-code');
  
  const tabContentScan = document.getElementById('tab-content-scan');
  const tabContentBrowser = document.getElementById('tab-content-browser');
  const tabContentCode = document.getElementById('tab-content-code');

  const btnStartScanner = document.getElementById('btn-start-scanner');
  const btnStopScanner = document.getElementById('btn-stop-scanner');
  const fileInput = document.getElementById('qr-file-input');
  
  const resultBox = document.getElementById('scanner-result-box');
  const resultText = document.getElementById('scanned-url-text');
  const btnOpenInsideScanner = document.getElementById('btn-open-inside-scanner');
  const btnOpenScannedUrl = document.getElementById('btn-open-scanned-url');
  const btnCopyScannedUrl = document.getElementById('btn-copy-scanned-url');

  const qrUrlInput = document.getElementById('qr-website-url-input');
  const btnUpdateQrUrl = document.getElementById('btn-update-qr-url');
  const btnPreviewInsideScannerFromQr = document.getElementById('btn-preview-inside-scanner-from-qr');
  const btnVisitWebsite = document.getElementById('btn-visit-website');
  const btnCopyWebsiteUrl = document.getElementById('btn-copy-website-url');
  const modalQrImage = document.getElementById('modal-qr-image');
  const btnDownloadQr = document.getElementById('btn-download-qr');

  // In-Scanner Browser Controls
  const inScannerAddressInput = document.getElementById('in-scanner-address-input');
  const inScannerIframe = document.getElementById('in-scanner-iframe');
  const inScannerLoading = document.getElementById('in-scanner-loading');
  const btnInScannerReload = document.getElementById('btn-in-scanner-reload');
  const btnInScannerHome = document.getElementById('btn-in-scanner-home');
  const btnInScannerGo = document.getElementById('btn-in-scanner-go');
  const btnInScannerExternal = document.getElementById('btn-in-scanner-external');

  let html5QrcodeScanner = null;
  let isScanning = false;

  // Auto-detect current window URL if on local/live server
  const currentOrigin = (window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file://'))
    ? window.location.href
    : 'http://192.168.1.12:8000';

  if (qrUrlInput && btnVisitWebsite) {
    qrUrlInput.value = currentOrigin;
    btnVisitWebsite.href = currentOrigin;
  }
  if (inScannerAddressInput) {
    inScannerAddressInput.value = currentOrigin;
  }
  if (btnInScannerExternal) {
    btnInScannerExternal.href = currentOrigin;
  }

  // Toast Notification Helper
  function showToast(msg) {
    const toast = document.getElementById('toast-notify');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Load URL inside Embedded Scanner Browser
  function loadUrlInScannerBrowser(url) {
    if (!url) return;
    let target = url.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://') && !target.startsWith('about:')) {
      target = 'http://' + target;
    }

    if (inScannerAddressInput) inScannerAddressInput.value = target;
    if (btnInScannerExternal) btnInScannerExternal.href = target;
    
    if (inScannerLoading) inScannerLoading.classList.add('active');

    if (inScannerIframe) {
      inScannerIframe.src = target;
    }
  }

  if (inScannerIframe) {
    inScannerIframe.addEventListener('load', () => {
      if (inScannerLoading) inScannerLoading.classList.remove('active');
    });
  }

  // Tab Activation Logic
  function activateTab(tabName) {
    if (tabBtnScan) tabBtnScan.classList.remove('active');
    if (tabBtnBrowser) tabBtnBrowser.classList.remove('active');
    if (tabBtnCode) tabBtnCode.classList.remove('active');

    if (tabContentScan) tabContentScan.classList.remove('active');
    if (tabContentBrowser) tabContentBrowser.classList.remove('active');
    if (tabContentCode) tabContentCode.classList.remove('active');

    if (tabName === 'browser') {
      if (tabBtnBrowser) tabBtnBrowser.classList.add('active');
      if (tabContentBrowser) tabContentBrowser.classList.add('active');
      if (modalContent) modalContent.classList.add('wide-modal');
      stopScanner();

      // Load website in iframe if not loaded yet
      if (!inScannerIframe.src || inScannerIframe.src === 'about:blank') {
        loadUrlInScannerBrowser(currentOrigin);
      }
    } else if (tabName === 'scan') {
      if (tabBtnScan) tabBtnScan.classList.add('active');
      if (tabContentScan) tabContentScan.classList.add('active');
      if (modalContent) modalContent.classList.remove('wide-modal');
    } else if (tabName === 'code') {
      if (tabBtnCode) tabBtnCode.classList.add('active');
      if (tabContentCode) tabContentCode.classList.add('active');
      if (modalContent) modalContent.classList.remove('wide-modal');
      stopScanner();
    }
  }

  if (tabBtnScan) tabBtnScan.addEventListener('click', () => activateTab('scan'));
  if (tabBtnBrowser) tabBtnBrowser.addEventListener('click', () => activateTab('browser'));
  if (tabBtnCode) tabBtnCode.addEventListener('click', () => activateTab('code'));

  // In-Scanner Browser Controls Event Listeners
  if (btnInScannerGo && inScannerAddressInput) {
    btnInScannerGo.addEventListener('click', () => {
      loadUrlInScannerBrowser(inScannerAddressInput.value);
    });
    inScannerAddressInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') loadUrlInScannerBrowser(inScannerAddressInput.value);
    });
  }

  if (btnInScannerReload) {
    btnInScannerReload.addEventListener('click', () => {
      if (inScannerIframe && inScannerIframe.src) {
        if (inScannerLoading) inScannerLoading.classList.add('active');
        const currentSrc = inScannerIframe.src;
        inScannerIframe.src = currentSrc;
      }
    });
  }

  if (btnInScannerHome) {
    btnInScannerHome.addEventListener('click', () => {
      loadUrlInScannerBrowser(currentOrigin);
    });
  }

  // Quick Nav Chips
  document.querySelectorAll('.quick-nav-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const targetHash = chip.getAttribute('data-target');
      const baseUrl = currentOrigin.split('#')[0];
      const targetUrl = baseUrl + targetHash;
      loadUrlInScannerBrowser(targetUrl);
    });
  });

  // Open Modal
  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  // Close Modal & Stop Camera
  function closeModal() {
    if (modal) modal.classList.remove('active');
    stopScanner();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Start Camera QR Scanner using Html5Qrcode
  async function startScanner() {
    if (typeof Html5Qrcode === 'undefined') {
      alert('QR Scanner library is loading... Please check internet connection.');
      return;
    }
    if (isScanning) return;

    try {
      if (!html5QrcodeScanner) {
        html5QrcodeScanner = new Html5Qrcode("reader");
      }

      const qrCodeSuccessCallback = (decodedText) => {
        handleScanResult(decodedText);
      };

      const config = { fps: 10, qrbox: { width: 220, height: 220 } };

      await html5QrcodeScanner.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback
      );

      isScanning = true;
      if (btnStartScanner) btnStartScanner.style.display = 'none';
      if (btnStopScanner) btnStopScanner.style.display = 'inline-block';
    } catch (err) {
      console.warn("Environment camera failed, trying default camera:", err);
      try {
        await html5QrcodeScanner.start(
          { facingMode: "user" },
          { fps: 10, qrbox: { width: 220, height: 220 } },
          (decodedText) => handleScanResult(decodedText)
        );
        isScanning = true;
        if (btnStartScanner) btnStartScanner.style.display = 'none';
        if (btnStopScanner) btnStopScanner.style.display = 'inline-block';
      } catch (err2) {
        alert("Camera permission denied or camera unavailable. You can upload a QR Code image file below.");
      }
    }
  }

  async function stopScanner() {
    if (html5QrcodeScanner && isScanning) {
      try {
        await html5QrcodeScanner.stop();
      } catch (err) {
        console.error("Stop scanner error", err);
      }
      isScanning = false;
    }
    if (btnStartScanner) btnStartScanner.style.display = 'inline-block';
    if (btnStopScanner) btnStopScanner.style.display = 'none';
  }

  if (btnStartScanner) btnStartScanner.addEventListener('click', startScanner);
  if (btnStopScanner) btnStopScanner.addEventListener('click', stopScanner);

  // File Upload Scanner
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      if (e.target.files.length === 0) return;
      const imageFile = e.target.files[0];
      
      if (typeof Html5Qrcode === 'undefined') return;
      
      const html5QrCode = new Html5Qrcode("reader");
      try {
        const decodedText = await html5QrCode.scanFile(imageFile, true);
        handleScanResult(decodedText);
      } catch (err) {
        alert("Could not detect a clear QR Code in the uploaded image. Please try another picture.");
      }
    });
  }

  // Handle Scan Result
  function handleScanResult(decodedText) {
    if (resultBox && resultText) {
      resultBox.style.display = 'block';
      resultText.textContent = decodedText;

      let targetUrl = decodedText.trim();
      let isUrl = targetUrl.startsWith('http://') || targetUrl.startsWith('https://');
      let formattedUrl = isUrl ? targetUrl : ('https://' + targetUrl);

      if (btnOpenScannedUrl) {
        btnOpenScannedUrl.href = formattedUrl;
        btnOpenScannedUrl.style.display = 'inline-block';
      }

      showToast("✨ QR Code Scanned Successfully!");
    }
  }

  // Open Inside Scanner Button
  if (btnOpenInsideScanner) {
    btnOpenInsideScanner.addEventListener('click', () => {
      let rawUrl = resultText ? resultText.textContent.trim() : '';
      if (!rawUrl) rawUrl = currentOrigin;
      loadUrlInScannerBrowser(rawUrl);
      activateTab('browser');
      showToast("🌐 Opening website inside scanner...");
    });
  }

  // Preview Inside Scanner Button from QR tab
  if (btnPreviewInsideScannerFromQr && qrUrlInput) {
    btnPreviewInsideScannerFromQr.addEventListener('click', () => {
      const url = qrUrlInput.value.trim() || currentOrigin;
      loadUrlInScannerBrowser(url);
      activateTab('browser');
      showToast("🌐 Opening website inside scanner...");
    });
  }

  // Copy Scanned URL
  if (btnCopyScannedUrl && resultText) {
    btnCopyScannedUrl.addEventListener('click', () => {
      if (!resultText.textContent) return;
      navigator.clipboard.writeText(resultText.textContent).then(() => {
        showToast("Scanned link copied to clipboard!");
      });
    });
  }

  // Dynamic QR & URL Generator Tab Controls
  if (btnUpdateQrUrl && qrUrlInput) {
    btnUpdateQrUrl.addEventListener('click', updateQrCode);
    qrUrlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') updateQrCode();
    });
  }

  function updateQrCode() {
    let url = qrUrlInput.value.trim();
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
      qrUrlInput.value = url;
    }

    if (btnVisitWebsite) btnVisitWebsite.href = url;

    // Generate fresh QR code via QRServer API
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`;
    if (modalQrImage) modalQrImage.src = qrApiUrl;
    if (btnDownloadQr) btnDownloadQr.href = qrApiUrl;

    showToast("QR Code updated for: " + url);
  }

  // Copy Website Link
  if (btnCopyWebsiteUrl && qrUrlInput) {
    btnCopyWebsiteUrl.addEventListener('click', () => {
      navigator.clipboard.writeText(qrUrlInput.value).then(() => {
        showToast("Website URL copied to clipboard!");
      });
    });
  }
}



