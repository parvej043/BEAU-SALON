const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const header = document.getElementById("header");

menuBtn?.addEventListener("click", () => nav.classList.toggle("active"));
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("active"));
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 50);
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 30);
    obs.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(el => counterObserver.observe(el));

const form = document.getElementById("bookingForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value || "Flexible";
  const time = document.getElementById("time").value || "Flexible";
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim() || "No additional message";

  if (!/^[0-9+\s()-]{10,15}$/.test(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  const text =
`Hello BEAU Unisex Salon,

I would like to make an appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred Date: ${date}
Preferred Time: ${time}
Message: ${message}

Please let me know the availability and appointment details.`;

  window.open(`https://wa.me/919820172273?text=${encodeURIComponent(text)}`, "_blank");
});

document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.background = "linear-gradient(135deg,#2a1b16,#100b09)";
  });
});
