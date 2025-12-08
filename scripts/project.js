// MOBILE MENU TOGGLE
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
        menu.style.flexDirection = "column";
    }
}

// CLOSE MENU ON MOBILE LINK CLICK
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
            document.getElementById("navMenu").style.display = "none";
        }
    });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(a.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ACTIVE LINK HIGHLIGHT ON SCROLL
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 150) {
            current = sec.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});
