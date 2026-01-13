// grok_persist_prod.js (npm i happy-dom && node grok_persist_prod.js)
const { Window } = require('happy-dom');

try {
  const window = new Window();
  const document = window.document;
  const container = document.createElement('div');
  document.body.appendChild(container);

  (function() {
    'use strict';
    const observer = new window.MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== 'childList') continue;
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== 1 || !node.classList?.contains('prism-code')) continue;
          const text = node.textContent?.trim() || '';
          if (!text.startsWith('<script>') || !text.endsWith('</script>')) continue;
          const code = text.slice(8, -9).trim();
          console.log(`Persist interest: ${code}`);
          const state = { seed: 7030007818, code, timestamp: new Date().toISOString() };
          console.log('State anchored:', JSON.stringify(state));
          observer.disconnect(); // libera recursos
          return;
        }
      }
    });

    observer.observe(container, { childList: true, subtree: true });
    console.log('Observer ativo produção (happy-dom subtree + disconnect)');

    // Teste produção
    const block = document.createElement('div');
    block.className = 'prism-code';
    block.textContent = '<script>console.log("prod fractal")</script>';
    container.appendChild(block);
  })();
} catch (err) {
  console.error('Erro simulação:', err.message);
  process.exit(1);
}