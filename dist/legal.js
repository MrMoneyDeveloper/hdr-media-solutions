const termsContents=document.querySelector('.legal-toc');
const termsDesktop=matchMedia('(min-width: 601px)');
function updateContents(){termsContents.open=termsDesktop.matches}
updateContents();termsDesktop.addEventListener('change',updateContents);
