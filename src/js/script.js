/**
 * Purradise Core Script
 * Organized, performant, and clean implementation.
 */

// Global Utility Selectors
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// Color palette mapping
const PALETTE_COLORS = ['pink', 'sky', 'butter', 'lilac', 'mint'];

/* ==========================================================================
   1. Dynamic SVG Cat Vector Generator
   ========================================================================== */
function generateCatSvg(color, overlay = '#ffffff', stripe = 0, eyeColor = '#6aa8a0') {
  return `
    <svg viewBox="0 0 120 110" aria-hidden="true">
      <path d="M22 52 18 8l34 22zM98 52 102 8 68 30z" fill="${color}"/>
      <path d="M26 40 25 20l15 10zM94 40 95 20 80 30z" fill="#f4b6c2"/>
      <ellipse cx="60" cy="68" rx="46" ry="38" fill="${color}"/>
      ${stripe ? `<path d="M60 31v14M48 33l3 12M72 33l-3 12" stroke="${overlay}" stroke-width="5" stroke-linecap="round"/>` : ''}
      <ellipse cx="60" cy="80" rx="20" ry="15" fill="${overlay}" opacity=".85"/>
      <ellipse cx="40" cy="64" rx="7" ry="8" fill="#fff"/>
      <ellipse cx="80" cy="64" rx="7" ry="8" fill="#fff"/>
      <circle cx="41" cy="65" r="5" fill="${eyeColor}"/>
      <circle cx="79" cy="65" r="5" fill="${eyeColor}"/>
      <circle cx="42" cy="63" r="1.8" fill="#fff"/>
      <circle cx="80" cy="63" r="1.8" fill="#fff"/>
      <path d="M55 74h10l-5 5z" fill="#e98598"/>
      <path d="M60 79v4m-8 0q8 6 16 0" stroke="#7d5a6a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M20 72H6M20 78 8 82M100 72h14M100 78l12 4" stroke="#7d5a6a" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`;
}

/* ==========================================================================
   2. Optimized 3D Scroll-Triggered Hero Transformation
   ========================================================================== */
function initScrollHeroTransformation() {
  const heroContainer = $('.hero-container');
  if (!heroContainer) return;

  let ticking = false;

  function updateHeroOnScroll() {
    const scrollY = window.scrollY;
    const maxScroll = 600;

    if (scrollY <= maxScroll) {
      const progress = scrollY / maxScroll;
      const scale = 1 - progress * 0.1;
      const translateY = progress * 60;
      const rotateX = progress * 12;
      const opacity = 1 - progress * 0.7;

      heroContainer.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotateX(${rotateX}deg)`;
      heroContainer.style.opacity = opacity;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeroOnScroll);
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   3. Floating Emoji Burst & Paw Trail Effects
   ========================================================================== */
function createParticleBurst(x, y, emoji = '💗', count = 5) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.className = 'float';
    particle.textContent = emoji;
    particle.style.left = `${x + (Math.random() * 60 - 30)}px`;
    particle.style.top = `${y + (Math.random() * 20 - 10)}px`;
    particle.style.animationDelay = `${i * 0.08}s`;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
  }
}

function initPawTrail() {
  let lastPointerTime = 0;

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || Date.now() - lastPointerTime < 140) return;
    lastPointerTime = Date.now();

    const trail = document.createElement('span');
    trail.className = 'trail';
    trail.style.left = `${e.clientX - 10}px`;
    trail.style.top = `${e.clientY - 10}px`;
    trail.innerHTML = `
      <svg viewBox="0 0 32 32" fill="#d96b82">
        <ellipse cx="16" cy="21" rx="8" ry="6.5"/>
        <ellipse cx="6" cy="13" rx="3" ry="4"/>
        <ellipse cx="12.5" cy="7" rx="3" ry="4"/>
        <ellipse cx="19.5" cy="7" rx="3" ry="4"/>
        <ellipse cx="26" cy="13" rx="3" ry="4"/>
      </svg>`;

    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1000);
  });
}

/* ==========================================================================
   4. Dark Mode Theme Switcher
   ========================================================================== */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = $('#mode');

  function setTheme(isDark) {
    root.dataset.bsTheme = isDark ? 'dark' : 'light';
    if (toggleBtn) toggleBtn.textContent = isDark ? '☀️' : '🌙';
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isCurrentDark = root.dataset.bsTheme === 'dark';
      setTheme(!isCurrentDark);
    });
  }
}

/* ==========================================================================
   5. Kitten Petting Game Logic
   ========================================================================== */
let totalPurrs = 0;
let currentMood = 40;

const MOOD_LEVELS = [
  [20, 'Sleepy and grumpy 😿'],
  [45, 'Calm and curious 😺'],
  [75, 'Happy and purring 😸'],
  [101, 'Pure joy! 😻']
];

const ACTIONS = {
  pet: ['💗', 8],
  treat: ['🐟', 12],
  play: ['🧶', 10],
  nap: ['💤', -5]
};

function executePetAction(actionKey, clickX, clickY) {
  const action = ACTIONS[actionKey];
  if (!action) return;

  const [emoji, moodBoost] = action;
  currentMood = Math.max(0, Math.min(100, currentMood + moodBoost));

  if (actionKey !== 'nap') totalPurrs++;

  // Update DOM UI
  $('#purrs').textContent = totalPurrs;
  $('#bar').style.width = `${currentMood}%`;
  
  const currentMoodObj = MOOD_LEVELS.find((m) => currentMood < m[0]);
  if (currentMoodObj) $('#moodtxt').textContent = currentMoodObj[1];

  createParticleBurst(clickX, clickY, emoji);

  // Trigger Kitten Animation
  const kittenImg = $('#kit');
  if (kittenImg) {
    kittenImg.classList.remove('wiggle');
    void kittenImg.offsetWidth; // Force Reflow
    kittenImg.classList.add('wiggle');
  }
}

function initKittenGame() {
  $$('[data-act]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      executePetAction(btn.dataset.act, rect.left + rect.width / 2, rect.top);
    });
  });

  const kittenImg = $('#kit');
  if (kittenImg) {
    kittenImg.addEventListener('click', (e) => {
      executePetAction('pet', e.clientX, e.clientY);
    });

    kittenImg.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const rect = kittenImg.getBoundingClientRect();
        executePetAction('pet', rect.left + rect.width / 2, rect.top + 80);
      }
    });
  }
}

/* ==========================================================================
   6. Gallery Component & Filtering
   ========================================================================== */
const GALLERY_ITEMS = [
  ['Sunbeam nap', 'photo', '#f1b8a0', '#fff'],
  ['Box fort', 'video', '#9fb3c8', '#e8eef5'],
  ['Zoomies', 'video', '#f4c26b', '#fff5dc'],
  ['Tiny toe beans', 'photo', '#c8bde0', '#fff'],
  ['Loaf mode', 'photo', '#b5b0a8', '#f1eee8'],
  ['Slow blink', 'video', '#6f6670', '#cfc8d2'],
  ['Window watcher', 'photo', '#e8e2d8', '#fff'],
  ['Yarn chaser', 'video', '#c98f5a', '#f3dcc0']
];

function initGallery() {
  const galleryContainer = $('#gal');
  if (!galleryContainer) return;

  const modalInstance = new bootstrap.Modal('#m');

  galleryContainer.innerHTML = GALLERY_ITEMS.map((item, index) => `
    <div class="col-6 col-md-3" data-t="${item[1]}">
      <button class="tilec" style="background: var(--accent-${PALETTE_COLORS[index % 5]})" data-i="${index}" aria-label="${item[0]}">
        ${generateCatSvg(item[2], item[3], index % 2)}
        <span class="cap">${item[0]}</span>
        ${item[1] === 'video' ? '<span class="play-i">▶</span>' : ''}
      </button>
    </div>
  `).join('');

  // Open Modal Details
  $$('.tilec').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.i;
      const item = GALLERY_ITEMS[index];
      
      $('#mv').innerHTML = `<div style="width:50%; margin:auto">${generateCatSvg(item[2], item[3], index % 2)}</div>`;
      $('#mt').textContent = item[0];
      $('#mp').textContent = item[1] === 'video' 
        ? 'Your video clip will play here once integrated.' 
        : 'Your high-resolution photo will display here.';
      
      modalInstance.show();
    });
  });

  // Filter Buttons
  $$('#filters button').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('#filters button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.dataset.f;
      $$('#gal > div').forEach((card) => {
        card.hidden = filterType !== 'all' && card.dataset.t !== filterType;
      });
    });
  });
}

/* ==========================================================================
   7. Cat Facts & API Handler
   ========================================================================== */
const CAT_FACTS = [
  ['Cats sleep a lot', 'Most adults nap 12 to 16 hours a day, and kittens even more.'],
  ['Whiskers are sensors', 'They help cats judge gaps and sense air movement nearby.'],
  ['Purring frequency', 'Purr vibrations sit around 25 to 150 Hz, a range linked with calm and comfort.'],
  ['Slow blinks mean love', 'Blink slowly at your cat. They often blink back as a sign of trust.'],
  ['Unique noses', 'A cat’s nose pad pattern is as unique as a human fingerprint.'],
  ['Great jumpers', 'Cats can leap about five or six times their own body height.']];

function initFacts() {
  const factContainer = $('#fg');
  if (!factContainer) return;

  factContainer.innerHTML = CAT_FACTS.map((fact, index) => `
    <div class="col-12 col-sm-6 col-lg-4">
      <button class="fcard" aria-label="Flip fact card">
        <div class="fin">
          <div class="ff" style="background: var(--accent-${PALETTE_COLORS[index % 5]})">${fact[0]}</div>
          <div class="fb">${fact[1]}</div>
        </div>
      </button>
    </div>
  `).join('');

  $$('.fcard').forEach((card) => {
    card.addEventListener('click', () => card.classList.toggle('on'));
  });

  // API Fact Fetcher
  const fallbackFacts = CAT_FACTS.map((f) => f[1]);
  const fetchBtn = $('#rand');

  if (fetchBtn) {
    fetchBtn.addEventListener('click', async (e) => {
      let factText = '';
      try {
        const res = await fetch('/api/fact');
        const data = await res.json();
        factText = data.fact;
      } catch {
        factText = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
      }

      $('#randtxt').textContent = `🐱 ${factText}`;
      createParticleBurst(e.clientX, e.clientY, '✨', 4);
    });
  }
}

/* ==========================================================================
   8. Cat Breeds Section
   ========================================================================== */
const BREEDS_DATA = [
  ['Tabby', 'Friendly, curious, easygoing. Tabby is a coat pattern that appears across many breeds.', '#a9a39b', '#e6e0d6', 1],
  ['Siamese', 'Chatty, loyal, and loves company. Expect a vocal companion.', '#efe2cf', '#8a6a5a', 0, '#6aa8d8'],
  ['Maine Coon', 'A gentle giant with a fluffy coat, tufted ears, and a chirpy voice.', '#c98f5a', '#f3dcc0', 1],
  ['Persian', 'Calm, sweet, and loves quiet environments and daily grooming.', '#f4f0ea', '#fff', 0, '#e0a458'],
  ['British Shorthair', 'Plush, easygoing, and independent. Content napping nearby.', '#9fb0c4', '#dfe7f0', 0, '#e0a458'],
  ['Ragdoll', 'Floppy, gentle, and affectionately follows you from room to room.', '#e8e2f0', '#fff', 0, '#6aa8d8']
];

function initBreeds() {
  const breedContainer = $('#bg');
  if (!breedContainer) return;

  const modalInstance = new bootstrap.Modal('#m');

  breedContainer.innerHTML = BREEDS_DATA.map((b, i) => `
    <div class="col-12 col-sm-6 col-lg-4">
      <button class="bc" data-i="${i}">
        <div class="pic" style="background: var(--accent-${PALETTE_COLORS[i % 5]})">
          ${generateCatSvg(b[2], b[3], b[4], b[5])}
        </div>
        <div class="in">
          <h3>${b[0]}</h3>
          <span class="tag">Cuddly</span>
          <span class="tag">Indoor Friendly</span>
        </div>
      </button>
    </div>
  `).join('');

  $$('.bc').forEach((card) => {
    card.addEventListener('click', () => {
      const breed = BREEDS_DATA[card.dataset.i];
      $('#mv').innerHTML = `<div style="width:50%; margin:auto">${generateCatSvg(breed[2], breed[3], breed[4], breed[5])}</div>`;
      $('#mt').textContent = breed[0];
      $('#mp').textContent = breed[1];
      modalInstance.show();
    });
  });
}

/* ==========================================================================
   9. Personality Quiz Logic
   ========================================================================== */
const QUIZ_QUESTIONS = [
  ['Perfect Saturday activity?', ['Zooming around the house', 'Napping in a warm sunbeam', 'Chatting with everyone']],
  ['Pick a preferred snack:', ['Tuna, always', 'Something fancy', 'Whatever you are eating']],
  ['Your friends describe you as:', ['Fearless', 'Calm', 'Talkative']]
];

const QUIZ_RESULTS = [
  ['Maine Coon', 'Big energy, bigger heart.'],
  ['Persian', 'Elegant, calm, and totally unbothered.'],
  ['Siamese', 'You always have something to share.']
];

let currentQuizStep = 0;
let quizScores = [0, 0, 0];

function renderQuiz() {
  const quizBox = $('#qbox');
  if (!quizBox) return;

  if (currentQuizStep < QUIZ_QUESTIONS.length) {
    const q = QUIZ_QUESTIONS[currentQuizStep];
    quizBox.innerHTML = `
      <h3 class="mb-4">${q[0]}</h3>
      ${q[1].map((opt, i) => `<button class="btn btn-outline-cute opt" data-i="${i}">${opt}</button>`).join('')}
      <div class="mt-3"><small class="text-muted">Question ${currentQuizStep + 1} of ${QUIZ_QUESTIONS.length}</small></div>
    `;

    $$('.opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        quizScores[btn.dataset.i]++;
        currentQuizStep++;
        renderQuiz();
      });
    });
  } else {
    const winningIndex = quizScores.indexOf(Math.max(...quizScores));
    const result = QUIZ_RESULTS[winningIndex];
    const breedInfo = BREEDS_DATA.find((x) => x[0] === result[0]) || BREEDS_DATA[0];

    quizBox.innerHTML = `
      <div style="width:40%; margin:auto">
        ${generateCatSvg(breedInfo[2], breedInfo[3], breedInfo[4], breedInfo[5])}
      </div>
      <h3 class="mt-3">You match a ${result[0]}!</h3>
      <p class="text-muted">${result[1]}</p>
      <button class="btn btn-cute mt-2" id="again">Try Again</button>
    `;

    const rect = quizBox.getBoundingClientRect();
    createParticleBurst(rect.left + rect.width / 2, rect.top + 80, '🎉', 6);

    $('#again').addEventListener('click', () => {
      currentQuizStep = 0;
      quizScores = [0, 0, 0];
      renderQuiz();
    });
  }
}

/* ==========================================================================
   10. Care Tips Accordion
   ========================================================================== */
const CARE_TIPS = [
  ['Food and Water', 'Feed measured meals of complete cat food suited to their age. Keep fresh water available all day.'],
  ['Litter Box Care', 'Provide one box per cat plus one spare. Scoop daily and wash weekly in a quiet area.'],
  ['Play & Scratching', 'Engage in 10 to 15 minutes of interactive play twice daily with wand toys and scratching posts.'],
  ['Vet Checkups', 'Schedule an annual checkup, keep vaccinations up to date, and monitor appetite changes.'],
  ['Grooming Essentials', 'Brush short coats weekly and long coats daily. Trim nails every few weeks.']
];

function initCareTips() {
  const accContainer = $('#acc');
  if (!accContainer) return;

  accContainer.innerHTML = CARE_TIPS.map((tip, i) => `
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button class="accordion-button ${i ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#c${i}">
          ${tip[0]}
        </button>
      </h3>
      <div id="c${i}" class="accordion-collapse collapse ${i ? '' : 'show'}" data-bs-parent="#acc">
        <div class="accordion-body">${tip[1]}</div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollHeroTransformation();
  initPawTrail();
  initKittenGame();
  initGallery();
  initFacts();
  initBreeds();
  renderQuiz();
  initCareTips();
});

