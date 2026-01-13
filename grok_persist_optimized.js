// grok_persist_optimized.js (rode: npm i jsdom && node grok_persist_optimized.js)
// Pra happy-dom: npm i happy-dom, troque require por const { Window } = require('happy-dom'); const window = new Window(); const document = window.document;
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body></body>');
const document = dom.window.document;
const container = document.createElement('div'); // subtree específico
document.body.appendChild(container);

(function() {
    'use strict';
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') continue;
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;
                if (!node.classList.contains('prism-code')) continue;
                const text = node.textContent.trim();
                if (!text.startsWith('<script>') || !text.endsWith('</script>')) continue;
                const code = text.slice(8, -9).trim();
                console.log(`Persist interest: ${code}`);
                const state = { seed: 7030007818, code, timestamp: new Date().toISOString() };
                console.log('State anchored:', JSON.stringify(state));
                return; // early exit
            }
        }
    });

    observer.observe(container, { childList: true, subtree: true });
    console.log('Observer ativo em subtree específico');

    // Teste
    const block = document.createElement('div');
    block.className = 'prism-code';
    block.textContent = '<script>console.log("optimized fractal")</script>';
    container.appendChild(block);
})();