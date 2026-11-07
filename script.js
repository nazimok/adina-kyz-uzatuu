// Баштапкы конвертти ачуу
const envelopeScreen = document.getElementById("envelopeScreen");
const envelope = document.getElementById("envelope");
const openInvitation = document.getElementById("openInvitation");
document.body.classList.add("envelope-locked");
let invitationOpened = false;
function openEnvelope() {
  if (invitationOpened) return;
  invitationOpened = true;
  envelopeScreen.classList.add("opened");
  window.setTimeout(() => {
    envelopeScreen.classList.add("is-opening");
    document.body.classList.remove("envelope-locked");
  }, 850);
  window.setTimeout(() => envelopeScreen.remove(), 1900);
}
openInvitation.addEventListener("click", openEnvelope);
envelope.addEventListener("click", openEnvelope);
envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openEnvelope();
  }
});

// Дата белгилүү болгондо ушул жердеги маанини өзгөртөбүз.
// Формат: YYYY-MM-DDTHH:MM:SS+06:00
const EVENT_DATE = null; // Мисалы: "2027-01-15T17:00:00+06:00"

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Кайра саноо. Дата азырынча белгисиз болгондуктан нөлдөр көрсөтүлөт.
const countdownIds = ["days", "hours", "minutes", "seconds"];
function updateCountdown() {
  if (!EVENT_DATE) {
    countdownIds.forEach((id) => document.getElementById(id).textContent = "00");
    return;
  }

  const difference = new Date(EVENT_DATE).getTime() - Date.now();
  if (Number.isNaN(difference) || difference <= 0) {
    countdownIds.forEach((id) => document.getElementById(id).textContent = "00");
    return;
  }

  const values = [
    Math.floor(difference / (1000 * 60 * 60 * 24)),
    Math.floor((difference / (1000 * 60 * 60)) % 24),
    Math.floor((difference / (1000 * 60)) % 60),
    Math.floor((difference / 1000) % 60)
  ];

  countdownIds.forEach((id, index) => {
    document.getElementById(id).textContent = String(values[index]).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Жумшак көрүнүү эффекти. Бул гүлдөрдүн өзүнө анимация кошпойт.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Азырынча форма тесттик: Telegram же серверге маалымат жөнөтпөйт.
const rsvpForm = document.getElementById("rsvpForm");
const formFeedback = document.getElementById("formFeedback");

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const guestName = document.getElementById("guestName").value.trim();
  if (!guestName) return;

  formFeedback.textContent = `Рахмат, ${guestName}! Жообуңуз кабыл алынды.`;
  formFeedback.style.display = "block";
  rsvpForm.reset();
});
