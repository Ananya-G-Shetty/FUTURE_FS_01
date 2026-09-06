const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const year = document.getElementById("year");
const cursorGlow = document.querySelector(".cursor-glow");

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("anya-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  themeToggle.textContent = dark ? "☀" : "☾";
  localStorage.setItem("anya-theme", dark ? "dark" : "light");
});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "×" : "☰";
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

document.querySelectorAll(".project-card, .hobby-card, .stat-card").forEach(card => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.transform = `perspective(700px) rotateX(${y * -1.5}deg) rotateY(${x * 1.5}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* =========================================================
   CERTIFICATE VIEWER
   ========================================================= */

const certificateModal = document.getElementById("certificateModal");
const certificateModalImage = document.getElementById("certificateModalImage");
const certificateModalTitle = document.getElementById("certificateModalTitle");
const certificateClose = document.getElementById("certificateClose");
const certificateBackdrop = document.querySelector(".certificate-modal-backdrop");

const certificateLinks = document.querySelectorAll(".certificate-view");


certificateLinks.forEach(link => {

  link.addEventListener("click", function(event) {

    event.preventDefault();

    const imageSource = this.getAttribute("href");
    const title = this.getAttribute("data-title") || "Certificate";

    certificateModalImage.src = imageSource;
    certificateModalImage.alt = title;
    certificateModalTitle.textContent = title;

    certificateModal.classList.add("active");

    document.body.classList.add("certificate-open");

  });

});


function closeCertificate() {

  certificateModal.classList.remove("active");

  document.body.classList.remove("certificate-open");

  setTimeout(() => {
    certificateModalImage.src = "";
  }, 300);

}


certificateClose.addEventListener("click", closeCertificate);

certificateBackdrop.addEventListener("click", closeCertificate);


document.addEventListener("keydown", function(event) {

  if (
    event.key === "Escape" &&
    certificateModal.classList.contains("active")
  ) {
    closeCertificate();
  }

});