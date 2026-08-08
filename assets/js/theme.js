(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme-toggle");
  var storageKey = "theme";

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function currentTheme() {
    return root.dataset.theme || systemTheme();
  }

  function setPressed(theme) {
    if (!button) return;
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    button.setAttribute("title", theme === "dark" ? "ライトモードに切り替える" : "ダークモードに切り替える");
  }

  setPressed(currentTheme());

  if (button) {
    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem(storageKey, next);
      setPressed(next);
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (!localStorage.getItem(storageKey)) {
      setPressed(systemTheme());
    }
  });
})();

