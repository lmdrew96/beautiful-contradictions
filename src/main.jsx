import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// Remove browser extension style tags that interfere with Tailwind gradients
// (e.g., BetterCanvas injects @property declarations that break CSS inheritance)
function removeExtensionStyles() {
  const extensionStyles = document.querySelectorAll('style[wxt-shadow-root-document-styles]');
  extensionStyles.forEach(style => style.remove());
}

// Run immediately and observe for dynamically injected styles
removeExtensionStyles();
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === 'STYLE' && node.hasAttribute('wxt-shadow-root-document-styles')) {
        node.remove();
      }
    });
  });
});
observer.observe(document.head, { childList: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
