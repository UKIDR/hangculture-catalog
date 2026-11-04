(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.reading-toggle');
  const panel = document.querySelector('#reading-panel');
  const size = document.querySelector('#reading-size');
  const theme = document.querySelector('#reading-theme');
  const reset = document.querySelector('#reading-reset');
  if (!toggle || !panel || !size || !theme || !reset) return;
  const key = 'ukidr-reading-mode-v1';
  let state = { enabled: false, size: 'normal', theme: 'light' };
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && typeof saved === 'object') state = {
      enabled: saved.enabled === true,
      size: saved.size === 'large' ? 'large' : 'normal',
      theme: saved.theme === 'dark' ? 'dark' : 'light'
    };
  } catch { /* The controls also work when browser storage is unavailable. */ }
  function apply() {
    root.toggleAttribute('data-reading', state.enabled);
    root.dataset.readingSize = state.size;
    root.dataset.readingTheme = state.theme;
    panel.hidden = !state.enabled;
    toggle.setAttribute('aria-expanded', String(state.enabled));
    toggle.setAttribute('aria-pressed', String(state.enabled));
    size.value = state.size;
    theme.value = state.theme;
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }
  toggle.addEventListener('click', () => { state.enabled = !state.enabled; apply(); });
  size.addEventListener('change', () => { state.size = size.value; apply(); });
  theme.addEventListener('change', () => { state.theme = theme.value; apply(); });
  reset.addEventListener('click', () => {
    state = { enabled: false, size: 'normal', theme: 'light' };
    apply();
    toggle.focus();
  });
  apply();
})();
