const vault = document.querySelector(".vault");
const vaultDial = document.querySelector(".vault-hub");
const vaultStatus = document.querySelector("#vault-status");
const vaultClues = [
  "The first tumbler clicks.",
  "The second tumbler clicks.",
  "The vault is open.",
];
let currentClue = 0;

if (vault && vaultDial && vaultStatus) {
  vaultDial.addEventListener("click", () => {
    if (currentClue === vaultClues.length) {
      currentClue = 0;
      vault.classList.remove("vault-open");
      vaultDial.setAttribute("aria-label", "Turn the vault dial");
      vaultStatus.textContent = "The vault is sealed.";
      vault.style.setProperty("--vault-rotation", "-8deg");
      return;
    }

    const clue = vaultClues[currentClue];
    currentClue += 1;
    vaultStatus.textContent = clue;
    vault.style.setProperty(
      "--vault-rotation",
      `${-8 + currentClue * 48}deg`,
    );

    if (currentClue === vaultClues.length) {
      vault.classList.add("vault-open");
      vaultDial.setAttribute("aria-label", "Reset the vault mystery");
    } else {
      vaultDial.setAttribute(
        "aria-label",
        `Turn the vault dial, clue ${currentClue + 1} of ${vaultClues.length}`,
      );
    }
  });
}

const heroArt = document.querySelector(".hero-art");
const bankToggle = document.querySelector(".bank-door-toggle");
const bankStatus = document.querySelector("#mint-status");
const bankRegistration = document.querySelector("#bank-registration");

if (heroArt && bankToggle && bankStatus && bankRegistration) {
  bankToggle.addEventListener("click", () => {
    const isOpen = heroArt.classList.toggle("bank-open");
    bankToggle.setAttribute("aria-expanded", String(isOpen));
    bankToggle.setAttribute("aria-label", isOpen ? "Close the bank" : "Open the bank");
    bankToggle.querySelector(".bank-toggle-icon").textContent = isOpen
      ? "↙"
      : "↗";
    bankStatus.textContent = isOpen
      ? "The Royal Mint doors are open."
      : "The Royal Mint is sealed.";
    bankRegistration.setAttribute("aria-hidden", String(!isOpen));
    bankRegistration.tabIndex = isOpen ? 0 : -1;

    if (!isOpen && vault && vaultDial && vaultStatus) {
      currentClue = 0;
      vault.classList.remove("vault-open");
      vaultDial.setAttribute("aria-label", "Turn the vault dial");
      vaultStatus.textContent = "The vault is sealed.";
      vault.style.setProperty("--vault-rotation", "-8deg");
    }
  });
}

const revealTargets = document.querySelectorAll(
  ".about, .highlights, .details, .final-cta, .highlight-card, .detail-cell",
);
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  revealTargets.forEach((target) => {
    target.classList.add("scroll-reveal");
    revealObserver.observe(target);
  });
  document.documentElement.classList.add("scroll-reveal-ready");
}
