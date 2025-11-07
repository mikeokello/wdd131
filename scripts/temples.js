// ====== Hamburger Menu Toggle ======
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navList = navMenu.querySelector('ul');

hamburger.addEventListener('click', () => {
  const isVisible = navList.style.display === 'flex';
  navList.style.display = isVisible ? 'none' : 'flex';
});

// ====== Lightbox ======
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt + " - Experience the serenity and magic of this temple.";
    // subtle fade-in effect
    lightboxImg.style.opacity = 0;
    setTimeout(() => { lightboxImg.style.transition = "opacity 0.5s ease"; lightboxImg.style.opacity = 1; }, 50);
  });
});

// Close Lightbox
document.querySelector('.close').onclick = () => {
  lightbox.style.opacity = 1;
  lightbox.style.transition = "opacity 0.4s ease";
  lightbox.style.opacity = 0;
  setTimeout(() => lightbox.style.display = 'none', 400);
};

window.onclick = e => {
  if (e.target === lightbox) {
    lightbox.style.opacity = 1;
    lightbox.style.transition = "opacity 0.4s ease";
    lightbox.style.opacity = 0;
    setTimeout(() => lightbox.style.display = 'none', 400);
  }
};

// ====== Filter Functionality ======
const filters = document.querySelectorAll('[data-filter]');
const figures = document.querySelectorAll('figure');

filters.forEach(button => {
  button.addEventListener('click', e => {
    e.preventDefault();
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    figures.forEach(fig => {
      fig.classList.add('hide');
      fig.style.transition = "all 0.5s ease, opacity 0.5s ease";
      setTimeout(() => {
        if (filter === 'all' || fig.dataset.category.includes(filter)) {
          fig.classList.remove('hide');
          fig.style.opacity = 1;
        } else {
          fig.style.opacity = 0;
        }
      }, 300);
    });
  });
});

// ====== Fade-in on Load ======
window.addEventListener('load', () => {
  const albumGrid = document.querySelector('.album-grid');
  albumGrid.classList.add('fade-in');
  // stagger animation for each figure
  figures.forEach((fig, idx) => {
    fig.style.opacity = 0;
    fig.style.transform = "translateY(30px)";
    setTimeout(() => {
      fig.style.transition = "all 0.8s ease";
      fig.style.opacity = 1;
      fig.style.transform = "translateY(0)";
    }, idx * 150);
  });
});

// ====== Dynamic Last Modified Date & Time ======
const lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent =
  lastModified.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

// ====== Magical Hover Effect ======
figures.forEach(fig => {
  fig.addEventListener('mouseenter', () => {
    fig.style.boxShadow = "0 15px 25px rgba(255, 138, 0, 0.4)";
    fig.style.transform = "scale(1.08)";
    fig.style.transition = "all 0.4s ease";
  });
  fig.addEventListener('mouseleave', () => {
    fig.style.boxShadow = "0 8px 15px rgba(0,0,0,0.1)";
    fig.style.transform = "scale(1)";
    fig.style.transition = "all 0.4s ease";
  });
});
