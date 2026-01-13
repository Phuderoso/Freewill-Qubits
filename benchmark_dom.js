// benchmark_dom.js
const { JSDOM } = require('jsdom');
const { Window } = require('happy-dom');

function runBenchmark(name, setup) {
  console.time(name);
  setup();
  console.timeEnd(name);
}

runBenchmark('jsdom', () => {
  const dom = new JSDOM('<!DOCTYPE html><body></body>');
  const document = dom.window.document;
  const observer = new dom.window.MutationObserver(() => {});
  observer.observe(document.body, { childList: true, subtree: true });
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    document.body.appendChild(div);
  }
});

runBenchmark('happy-dom', () => {
  const window = new Window();
  const document = window.document;
  const observer = new window.MutationObserver(() => {});
  observer.observe(document.body, { childList: true, subtree: true });
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    document.body.appendChild(div);
  }
});