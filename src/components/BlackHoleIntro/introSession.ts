const SESSION_KEY = "portfolio-intro-seen";

export function shouldShowIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "true";
  } catch {
    return true;
  }
}

export function rememberIntro() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // Storage is optional; the opening can still be dismissed.
  }
}

