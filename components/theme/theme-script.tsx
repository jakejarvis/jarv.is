// loaded in <head> by layout.tsx to avoid blinding flash of unstyled content (FOUC). irrelevant after the first render
// when <ThemeProvider /> takes over.
// unminified JS: https://gist.github.com/jakejarvis/79b0ec8506bc843023546d0d29861bf0
export const ThemeScript = () => (
  <script
    id="restore-theme"
    dangerouslySetInnerHTML={{
      __html:
        "(()=>{try{const e=document.documentElement,t='undefined'!=typeof Storage?window.localStorage.getItem('theme'):null,a=(t&&'dark'===t)??window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';e.dataset.theme=a,e.style.colorScheme=a}catch(e){}})()",
    }}
  />
);
