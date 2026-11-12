// 1. Split text into animated letters
document.querySelectorAll("[data-split]").forEach((el) => {
  const text = el.textContent.trim();
  el.setAttribute("aria-label", text);
  el.textContent = "";
  let i = 0;

  text.split(" ").forEach((word, w, arr) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";
    wordSpan.setAttribute("aria-hidden", "true");

    [...word].forEach((ch) => {
      const l = document.createElement("span");
      l.className = "letter";
      l.textContent = ch;
      l.style.setProperty("--i", i++);
      wordSpan.appendChild(l);
    });

    el.appendChild(wordSpan);
    if (w < arr.length - 1) {
      const sp = document.createElement("span");
      sp.className = "space";
      sp.innerHTML = "&nbsp;";
      el.appendChild(sp);
      i++;
    }
  });
});

// 2. Trigger animations when sections scroll into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".split, .reveal").forEach((n) => n.classList.add("in"));
        entry.target.classList.add("in");
      }
    });
  },
  { threshold: 0.35 }
);
document.querySelectorAll(".panel").forEach((p) => observer.observe(p));

// 3. Side navigation dots
const panels = [...document.querySelectorAll(".panel")];
const dots = document.getElementById("dots");
panels.forEach((p, idx) => {
  const a = document.createElement("a");
  a.href = "#" + p.id;
  a.title = p.id;
  if (idx === 0) a.classList.add("active");
  dots.appendChild(a);
});

const dotObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = panels.indexOf(entry.target);
        [...dots.children].forEach((d, i) => d.classList.toggle("active", i === idx));
      }
    });
  },
  { threshold: 0.6 }
);
panels.forEach((p) => dotObserver.observe(p));

// 4. Footer year
document.getElementById("year").textContent = new Date().getFullYear();