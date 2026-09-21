(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Navbar: shrink + blur past the hero fold.
  var nav = document.querySelector(".topnav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Hero headline: line-by-line reveal on load.
  var heroLines = document.querySelector(".hero h1");
  if (heroLines) {
    requestAnimationFrame(function () {
      heroLines.classList.add("lines-in");
    });
  }

  // Generic scroll-triggered reveal.
  var revealEls = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Animated counters: count up once, exponential ease-out, matches stat-row data-count.
  var counters = document.querySelectorAll("[data-count]");
  var animateCounter = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduced || isNaN(target)) {
      el.textContent = target + suffix;
      return;
    }
    var duration = 1400;
    var start = null;
    var ease = function (x) { return x === 1 ? 1 : 1 - Math.pow(2, -10 * x); };
    var tick = function (ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var value = Math.round(ease(p) * target);
      el.textContent = value + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (counters.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
    } else {
      var cio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) { cio.observe(el); });
    }
  }
})();
