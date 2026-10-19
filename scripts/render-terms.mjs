import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';

const markdown = readFileSync(new URL('../content/terms-of-service.md', import.meta.url), 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const inline = text => escape(text)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/https:\/\/hdrmediasolutions\.co\.za/g, '<a href="https://hdrmediasolutions.co.za">https://hdrmediasolutions.co.za</a>')
  .replace(/privacy@hdrmediasolutions\.co\.za/g, '<a href="mailto:privacy@hdrmediasolutions.co.za">privacy@hdrmediasolutions.co.za</a>')
  .replace(/  \n/g, '<br>');
const headings = [];
const body = markdown.trim().split(/\n\s*\n/).map(block => {
  if (block.startsWith('# ')) return `<h1>${inline(block.slice(2))}</h1>`;
  if (block.startsWith('## ')) {
    const title = block.slice(3);
    const id = `terms-${title.match(/^\d+/)[0]}`;
    headings.push({ title, id });
    return `<h2 id="${id}">${inline(title)}</h2>`;
  }
  if (block.startsWith('- ')) return `<ul>${block.split('\n').map(line => `<li>${inline(line.slice(2))}</li>`).join('')}</ul>`;
  return `<p>${inline(block)}</p>`;
}).join('\n');
const html = `<!doctype html>
<html lang="en-ZA">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#090909"><title>Terms of Service | HDR Media Solutions</title><meta name="description" content="Terms of Service for HDR Media Solutions (Pty) Ltd, effective 14 October 2026."><link rel="canonical" href="https://hdrmediasolutions.co.za/terms-of-service/"><meta name="robots" content="index,follow"><link rel="icon" href="../assets/hdr-favicon-a4172264d2.webp"><link rel="stylesheet" href="../vendor/bootstrap.e670c73068.css"><link rel="stylesheet" href="../style.css?v=12"><link rel="stylesheet" href="../direction-v2.css?v=14"></head>
<body class="legal-page"><a class="skip" href="#main">Skip to content</a><header class="header"><a href="../#home" class="brand" aria-label="HDR Media Solutions home"><img src="../assets/hdr-logo-4f168f658f.webp" alt="HDR Media Solutions" width="220" height="84" decoding="async"></a><a class="header-cta" href="../#home">Back to website <span><svg class="ui-icon icon-arrow-up-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></header>
<main id="main" class="legal-layout container"><details class="legal-toc"><summary class="eyebrow">ON THIS PAGE <span aria-hidden="true">+</span></summary><nav aria-label="Terms of Service contents">${headings.map(({title,id}) => `<a href="#${id}">${escape(title)}</a>`).join('')}</nav></details><article class="legal-content">${body}</article></main>
<footer class="container"><a href="../#home" class="brand"><img src="../assets/hdr-logo-4f168f658f.webp" alt="HDR Media Solutions" width="220" height="84" loading="lazy" decoding="async"></a><a href="../#home">Back to website <svg class="ui-icon icon-arrow-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V4m-7 7 7-7 7 7"/></svg></a><small>© 2026 HDR Media Solutions</small><div class="footer-links"><a href="./" aria-current="page">Terms of Service</a><a href="https://www.instagram.com/hdrmediasolutions/" target="_blank" rel="noopener noreferrer">Instagram <svg class="ui-icon icon-arrow-up-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19 19 5M5 5h14v14"/></svg></a><a href="https://www.facebook.com/hdrmediasolutions" target="_blank" rel="noopener noreferrer">Facebook <svg class="ui-icon icon-arrow-up-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div></footer><script defer src="../legal.js?v=9"></script></body></html>
`;
const output = new URL('../dist/terms-of-service/', import.meta.url);
mkdirSync(output, { recursive: true });
writeFileSync(new URL('index.html', output), html);
console.log(`Rendered ${headings.length} supplied Terms of Service sections.`);
