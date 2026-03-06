const lightThemeBtn = document.getElementById("theme-light-btn");
const darkThemeBtn = document.getElementById("theme-dark-btn");
const systemThemeBtn = document.getElementById("theme-system-btn");
const themeToggleIcon = document.getElementById("theme-toggle-icon");
const themeToggleText = document.getElementById("theme-toggle-text");

function updateToggleButton(theme) {
  let icon = "desktop_windows";
  let text = "System";
  if (theme === "light") {
    icon = "light_mode";
    text = "Light";
  } else if (theme === "dark") {
    icon = "dark_mode";
    text = "Dark";
  }
  themeToggleIcon.innerText = icon;
  themeToggleText.innerText = text;
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function setSystemTheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}

lightThemeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "light");
  applyTheme("light");
  updateToggleButton("light");
});

darkThemeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", "dark");
  applyTheme("dark");
  updateToggleButton("dark");
});

systemThemeBtn.addEventListener("click", () => {
  localStorage.removeItem("theme");
  setSystemTheme();
  updateToggleButton("system");
});

// Initial theme setup
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
  updateToggleButton(savedTheme);
} else {
  setSystemTheme();
  updateToggleButton("system");
}

// Watch for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        applyTheme("dark");
      } else {
        applyTheme("light");
      }
    }
  });

// Contact form email handler
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email-address").value.trim();
    const message = document.getElementById("message-box").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields before sending.");
      return;
    }

    // change this address to your real email
    const toAddress = "your-email@example.com";
    const subject = encodeURIComponent("New message from " + (name || "Website visitor"));
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    // open user's mail client
    window.location.href = `mailto:${toAddress}?subject=${subject}&body=${body}`;

    // confirmation popup
    alert("A new email has been opened in your mail client. Please send it to complete the message.");
    // optionally clear the form
    contactForm.reset();
  });
}