/* ------------------ DATA (uses filenames with spaces as you requested) ------------------ */
const temples = [
    { name: "Salt Lake Temple", location: "Utah, USA", year: 1893, size: "large", img: "images/temple card 1.webp" },
    { name: "Manti Temple", location: "Utah, USA", year: 1888, size: "small", img: "images/temple card 2.webp" },
    { name: "Kirtland Temple", location: "Ohio, USA", year: 1836, size: "small", img: "images/temple card 3.webp" },
    { name: "Accra Temple", location: "Ghana", year: 2004, size: "large", img: "images/temple card 4.webp" },
    { name: "Rome Temple", location: "Rome, Italy", year: 2019, size: "large", img: "images/temple card 5.webp" },
    { name: "Kyiv Temple", location: "Ukraine", year: 2010, size: "small", img: "images/temple card 6.webp" },
    { name: "Aba Temple", location: "Nigeria", year: 2005, size: "small", img: "images/temple card 7.webp" },
    { name: "São Paulo Temple", location: "Brazil", year: 1978, size: "large", img: "images/temple card 8.webp" },
    { name: "Nairobi Temple", location: "Kenya", year: 2022, size: "new", img: "images/temple card 9.webp" }
];

/* ------------------ DOM Cache ------------------ */
const container = document.getElementById('temples-container');
const buttons = document.querySelectorAll('nav button');
const searchInput = document.getElementById('searchInput');
const hamburger = document.getElementById('hamburger');
const topNav = document.getElementById('topNav');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');
const footerLeft = document.getElementById('footer-flower-left');
const footerRight = document.getElementById('footer-flower-right');

let currentFilter = 'home';
let searchTerm = '';

/* ------------------ SAFELY ENCODE PATHS (spaces in filenames) ------------------ */
function safePath(path){
    return encodeURI(path);
}

/* ------------------ RENDER ------------------ */
function renderTemples(filter = 'home', search = ''){
    container.innerHTML = '';
    const list = temples.filter(t => {
        const matchesFilter = (filter === 'home') ||
                              (filter === 'old' && t.year < 2000) ||
                              (filter === 'new' && t.year >= 2000) ||
                              (filter === 'large' && t.size === 'large') ||
                              (filter === 'small' && t.size === 'small');

        const matchesSearch = (t.name + ' ' + t.location).toLowerCase().includes(search.toLowerCase().trim());
        return matchesFilter && matchesSearch;
    });

    if(list.length === 0){
        container.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--muted); padding:20px;">No temples match your search/filter.</p>`;
        return;
    }

    list.forEach((t, idx) => {
        const card = document.createElement('article');
        card.className = 'temple-card';
        // use safePath for spaces
        const imgSrc = safePath(t.img);

        card.innerHTML = `
            <img src="${imgSrc}" alt="${escapeHtml(t.name)}">
            <div class="overlay">
                <strong>${escapeHtml(t.name)}</strong>
                <div class="meta">${escapeHtml(t.location)} • Built: ${t.year}</div>
            </div>
        `;

        // fade-in with slight delay for nicer look
        card.style.animationDelay = `${idx * 60}ms`;

        // open lightbox on click
        card.addEventListener('click', () => openLightbox(t));

        container.appendChild(card);
    });
}

/* ------------------ UTILS ------------------ */
function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[s]);
}

/* ------------------ LIGHTBOX ------------------ */
function openLightbox(t){
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden','false');
    lightboxImg.src = safePath(t.img);
    lightboxImg.alt = t.name;
    lightboxCaption.textContent = `${t.name} — ${t.location} (Built: ${t.year})`;
}
function closeLightbox(){
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
}

/* close button and ESC handling */
if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

/* ------------------ FILTER BUTTONS ------------------ */
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        renderTemples(currentFilter, searchInput.value || '');
    });
});

/* ------------------ SEARCH ------------------ */
searchInput.addEventListener('input', e => {
    searchTerm = e.target.value;
    renderTemples(currentFilter, searchTerm);
});

/* ------------------ HAMBURGER (small screens) ------------------ */
hamburger.addEventListener('click', () => {
    topNav.classList.toggle('show');
});

/* ------------------ FOOTER FLOWERS (use encodeURI) ------------------ */
footerLeft.src = safePath('images/flower 1.webp');
footerRight.src = safePath('images/flower 1.webp');

/* ------------------ INIT ------------------ */
document.getElementById('lastModified').textContent = document.lastModified || new Date().toLocaleDateString();
renderTemples();

/* ------------------ Accessibility: click outside lightbox closes it ------------------ */
lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
});
