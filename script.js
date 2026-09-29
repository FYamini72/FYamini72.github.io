(function ($) {
  "use strict";

  // Add verified destinations here when they are available. Empty values stay inert.
  const destinations = Object.assign(
    {
      resume: "",
      experience: "",
      "all-projects": "",
      "all-technologies": "",
      "project-1": "",
      "project-2": "",
      "project-3": "",
      github: "",
      linkedin: "",
      email: "",
    },
    window.portfolioLinks || {},
  );

  const i18n = window.portfolioI18n;
  const themeStorageKey = "farzam-portfolio-theme";
  const supportedThemes = ["dark", "light"];
  const supportedLocales = Object.keys(i18n.locales);
  let localeAnimationRunning = false;
  let queuedLocaleRequest = null;

  function readSavedLocale() {
    try {
      const savedLocale = localStorage.getItem(i18n.storageKey);
      if (supportedLocales.includes(savedLocale)) return savedLocale;
    } catch (error) {}
    return i18n.defaultLocale;
  }

  function saveLocale(locale) {
    try {
      localStorage.setItem(i18n.storageKey, locale);
    } catch (error) {}
  }

  function readSavedTheme() {
    try {
      const savedTheme = localStorage.getItem(themeStorageKey);
      if (supportedThemes.includes(savedTheme)) return savedTheme;
    } catch (error) {}
    return "dark";
  }

  function updateThemeToggle() {
    const isLight = document.documentElement.dataset.theme === "light";
    const dictionary = i18n.locales[document.documentElement.lang];
    const key = isLight ? "theme-toggle-dark" : "theme-toggle-light";
    $(".theme-toggle")
      .attr("aria-pressed", String(isLight))
      .attr("aria-label", dictionary.attributes[key])
      .attr("data-i18n-aria-label", key)
      .find("use")
      .attr("href", isLight ? "#i-moon" : "#i-sun");
  }

  window.setPortfolioTheme = function (theme, options) {
    const nextTheme = supportedThemes.includes(theme) ? theme : "dark";
    document.documentElement.dataset.theme = nextTheme;
    $("meta[name='theme-color']").attr("content", nextTheme === "light" ? "#f7f9fc" : "#101824");
    updateThemeToggle();
    if (!options || options.persist !== false) {
      try {
        localStorage.setItem(themeStorageKey, nextTheme);
      } catch (error) {}
    }
    return nextTheme;
  };

  function updateMobileMenuLabel(dictionary) {
    const menuOpen = $("#main-nav").hasClass("open");
    const key = menuOpen ? "mobile-menu-close" : "mobile-menu-open";
    $(".mobile-menu-button")
      .attr("aria-label", dictionary.attributes[key])
      .attr("data-i18n-aria-label", key);
  }

  window.portfolioTranslations = i18n.locales;
  window.applyPortfolioContent = function (locale, dictionary, options) {
    if (!dictionary || !dictionary.text || !dictionary.attributes || !dictionary.meta) {
      return false;
    }
    const shouldPersist = !options || options.persist !== false;
    const bootstrapStylesheet = $("#bootstrap-stylesheet");

    document.documentElement.lang = locale;
    document.documentElement.dir = dictionary.direction;
    document.documentElement.dataset.locale = locale;
    document.title = dictionary.meta.title;
    $('meta[name="description"]').attr("content", dictionary.meta.description);
    bootstrapStylesheet.attr(
      "href",
      dictionary.bootstrap === "rtl"
        ? bootstrapStylesheet.data("rtl-href")
        : bootstrapStylesheet.data("ltr-href"),
    );

    $("[data-i18n]").each(function () {
      const translation = dictionary.text[this.dataset.i18n];
      if (translation !== undefined) $(this).text(translation);
    });
    $("[data-i18n-aria-label]").each(function () {
      const translation = dictionary.attributes[this.dataset.i18nAriaLabel];
      if (translation !== undefined) this.setAttribute("aria-label", translation);
    });
    $("[data-i18n-alt]").each(function () {
      const translation = dictionary.attributes[this.dataset.i18nAlt];
      if (translation !== undefined) this.setAttribute("alt", translation);
    });
    $(".language-button").each(function () {
      const selected = this.dataset.locale === locale;
      $(this).toggleClass("active", selected).attr("aria-pressed", String(selected));
    });
    updateMobileMenuLabel(dictionary);
    updateThemeToggle();
    scheduleActiveNavUpdate();
    if (shouldPersist) saveLocale(locale);
    return true;
  };

  window.setPortfolioLocale = function (locale, options) {
    if (!supportedLocales.includes(locale)) locale = i18n.defaultLocale;
    if (options && options.animate) return requestAnimatedLocale(locale, options);
    return window.applyPortfolioContent(locale, i18n.locales[locale], options);
  };

  function requestAnimatedLocale(locale, options) {
    const currentLocale = document.documentElement.lang;
    if (!localeAnimationRunning && locale === currentLocale) return false;

    queuedLocaleRequest = { locale, persist: options.persist !== false };
    if (localeAnimationRunning) return true;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const request = queuedLocaleRequest;
      queuedLocaleRequest = null;
      return window.applyPortfolioContent(request.locale, i18n.locales[request.locale], {
        persist: request.persist,
      });
    }

    runLocaleAnimation();
    return true;
  }

  function runLocaleAnimation() {
    if (!queuedLocaleRequest) return;
    localeAnimationRunning = true;
    const headerInner = $(".header-inner");
    let activeRequest = queuedLocaleRequest;
    queuedLocaleRequest = null;

    headerInner.attr("aria-busy", "true").addClass("locale-exit");

    window.setTimeout(function () {
      if (queuedLocaleRequest) {
        activeRequest = queuedLocaleRequest;
        queuedLocaleRequest = null;
      }
      if (activeRequest.locale !== document.documentElement.lang) {
        window.applyPortfolioContent(activeRequest.locale, i18n.locales[activeRequest.locale], {
          persist: activeRequest.persist,
        });
      }

      headerInner.removeClass("locale-exit").addClass("locale-enter");
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          headerInner.removeClass("locale-enter");
        });
      });

      window.setTimeout(function () {
        headerInner.removeClass("locale-enter").removeAttr("aria-busy");
        localeAnimationRunning = false;
        if (queuedLocaleRequest) {
          if (queuedLocaleRequest.locale === document.documentElement.lang) {
            queuedLocaleRequest = null;
          } else {
            runLocaleAnimation();
          }
        }
      }, 170);
    }, 150);
  }

  $(".language-button").on("click", function () {
    window.setPortfolioLocale(this.dataset.locale, { animate: true });
  });

  $(".theme-toggle").on("click", function () {
    window.setPortfolioTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  $(".mobile-menu-button").on("click", function () {
    const open = !$("#main-nav").hasClass("open");
    $("#main-nav").toggleClass("open", open);
    $(this)
      .attr("aria-expanded", String(open))
      .attr("data-i18n-aria-label", open ? "mobile-menu-close" : "mobile-menu-open");
    $(this)
      .find("use")
      .attr("href", open ? "#i-close" : "#i-menu");
    updateMobileMenuLabel(i18n.locales[document.documentElement.lang]);
  });
  $("#main-nav a").on("click", function () {
    $("#main-nav").removeClass("open");
    $(".mobile-menu-button")
      .attr("aria-expanded", "false")
      .attr("data-i18n-aria-label", "mobile-menu-open")
      .find("use")
      .attr("href", "#i-menu");
    updateMobileMenuLabel(i18n.locales[document.documentElement.lang]);
    setActiveNav(this.getAttribute("href"));
  });

  $("[data-config-key]").each(function () {
    const destination = destinations[this.dataset.configKey];
    if (typeof destination !== "string" || !destination.trim()) return;
    $(this).removeClass("unconfigured").removeAttr("aria-disabled");
    if (this.tagName === "A") this.href = destination;
    else
      $(this).on("click", function () {
        window.location.href = destination;
      });
  });
  $("[data-config-key].unconfigured").on("click", function (event) {
    event.preventDefault();
  });

  const navLinks = $('#main-nav a[href^="#"]');
  const navEntries = navLinks
    .toArray()
    .map(function (link) {
      const hash = link.getAttribute("href");
      return { hash, target: document.getElementById(hash.slice(1)) };
    })
    .filter(function (entry) {
      return entry.target;
    });
  function setActiveNav(hash) {
    navLinks.each(function () {
      const active = this.getAttribute("href") === hash;
      this.classList.toggle("active", active);
      if (active) this.setAttribute("aria-current", "location");
      else this.removeAttribute("aria-current");
    });
  }

  function updateActiveNav() {
    const headerHeight = document.querySelector(".site-header").getBoundingClientRect().height;
    const activationLine = headerHeight + 16;
    const ordered = navEntries.slice().sort(function (a, b) {
      return a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top;
    });

    let current = "#home";
    ordered.forEach(function (entry) {
      if (entry.target.getBoundingClientRect().top <= activationLine) current = entry.hash;
    });

    const contact = document.getElementById("contact");
    const contactRect = contact.getBoundingClientRect();
    const atPageEnd =
      document.documentElement.scrollHeight - (window.scrollY + window.innerHeight) <= 2;
    const contactVisibleAtEnd =
      atPageEnd &&
      contactRect.top < window.innerHeight * 0.75 &&
      contactRect.bottom > window.innerHeight * 0.5;
    if (contactVisibleAtEnd) current = "#contact";
    setActiveNav(current);
  }

  let scrollUpdatePending = false;
  function scheduleActiveNavUpdate() {
    if (scrollUpdatePending) return;
    scrollUpdatePending = true;
    window.requestAnimationFrame(function () {
      scrollUpdatePending = false;
      updateActiveNav();
    });
  }

  $(window).on("scroll resize hashchange pageshow", scheduleActiveNavUpdate);
  window.setPortfolioLocale(readSavedLocale(), { persist: false });
  window.setPortfolioTheme(readSavedTheme(), { persist: false });
  updateActiveNav();
})(jQuery);
