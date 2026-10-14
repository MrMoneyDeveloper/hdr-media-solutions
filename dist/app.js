const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.textContent=open?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');menu.textContent='☰'}));
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const hash=link.getAttribute('href');if(!hash||hash==='#')return;const target=document.getElementById(hash.slice(1));if(!target)return;event.preventDefault();history.pushState(null,'',hash);target.scrollIntoView({behavior:'smooth',block:'start'})}));
// Keep the poster's dimensions while loading one requested YouTube player at a time.
let activeVideoFrame=null;
function resetVideo(){if(activeVideoFrame){activeVideoFrame.querySelector('iframe')?.remove();activeVideoFrame.querySelector('.video-launch').hidden=false;activeVideoFrame=null}}
document.querySelectorAll('.video-launch').forEach(link=>link.addEventListener('click',event=>{
 if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 const videoId=link.dataset.video;if(!videoId){resetVideo();return}if(!/^[\w-]{11}$/.test(videoId))return;
 event.preventDefault();
 resetVideo();
 const frame=link.closest('.video-frame'),player=document.createElement('iframe');
 player.src=`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
 player.title=link.dataset.title;player.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';player.allowFullscreen=true;player.referrerPolicy='strict-origin-when-cross-origin';
 link.hidden=true;frame.append(player);activeVideoFrame=frame;player.focus();
}));
const loaded=new Map();function loadScript(src){if(loaded.has(src))return loaded.get(src);const promise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.append(s)});loaded.set(src,promise);return promise}function loadStyle(href){if(document.querySelector(`link[href="${href}"]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;document.head.append(l)}
function near(element,callback){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();callback()}},{rootMargin:'350px'});observer.observe(element)}
near(document.querySelector('#testimonials'),async()=>{try{loadStyle('vendor/splide.6405c89826.css');await loadScript('vendor/splide.159b16ec7d.js');new Splide('.splide',{type:'slide',perPage:1,arrows:true,pagination:false,autoplay:false,speed:650,reducedMotion:{speed:650}}).mount()}catch{document.querySelectorAll('.splide__slide').forEach(s=>s.style.display='block')}});
const motionEnabled=true, motionOverride=true;let motionContext;
async function animate(){if(!motionEnabled)return;try{await loadScript('vendor/gsap.96c01b81f4.js');await loadScript('vendor/scrolltrigger.308219390e.js');gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});if(!motionEnabled)return;motionContext=gsap.matchMedia();motionContext.add(motionOverride?'(min-width: 0px)':'(prefers-reduced-motion: no-preference)',()=>{
 gsap.from('.hero-copy .line',{y:95,rotation:5,opacity:0,duration:1.3,stagger:.13,ease:'power4.out'});
 gsap.from('.kinetic-art',{scale:.65,rotation:-12,opacity:0,duration:1.5,ease:'power3.out'});
 const kinetic=gsap.timeline({repeat:-1});kinetic.to('.orbit-one',{rotation:'+=360',duration:26,ease:'none'},0).to('.orbit-two',{rotation:'-=360',duration:34,ease:'none'},0).to('.orbit-three',{rotation:'+=180',duration:26,ease:'none'},0);
 const float=gsap.timeline({repeat:-1,yoyo:true});float.to('.floating-frame',{y:-23,rotation:3,duration:3.6,ease:'sine.inOut'},0).to('.art-core',{y:12,rotation:-4,duration:4,ease:'sine.inOut'},0).to('.orbit-dot',{y:90,x:-25,duration:4,ease:'sine.inOut'},0);
 const cross=gsap.to('.art-cross',{rotation:360,duration:15,repeat:-1,ease:'none'});
 const words=['an impact.','heads turn.','stories move.'];let wordIndex=0;const word=document.querySelector('#hero-word');
 const wordTimer=gsap.delayedCall(3.4,cycleWord);function cycleWord(){if(!motionEnabled)return;gsap.to(word,{y:-24,opacity:0,duration:.35,ease:'power2.in',onComplete:()=>{if(!motionEnabled)return;word.textContent=words[++wordIndex%words.length];gsap.fromTo(word,{y:32,opacity:0},{y:0,opacity:1,duration:.65,ease:'power3.out'});wordTimer.restart(true);if(document.hidden||!ScrollTrigger.isInViewport(word))wordTimer.pause()}})}
 const cleanups=[];function govern(selector,tweens){let visible=false;const update=()=>tweens.forEach(t=>visible&&!document.hidden?t.resume():t.pause());tweens.forEach(t=>t.pause());const observer=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);update()},{rootMargin:'100px'});observer.observe(document.querySelector(selector));document.addEventListener('visibilitychange',update);cleanups.push(()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);tweens.forEach(t=>t.kill())})}
 govern('.hero-stage',[kinetic,float,cross,wordTimer]);
 const marqueeLoop=gsap.to('.marquee div',{xPercent:-50,duration:22,repeat:-1,ease:'none'});govern('.marquee',[marqueeLoop]);
 const reelWave=gsap.to('.reel-wave span',{scaleY:.25,duration:.75,stagger:.06,repeat:-1,yoyo:true,ease:'sine.inOut'});govern('#showreel',[reelWave]);
 const filmStar=gsap.to('.film-graphic',{rotation:360,duration:24,repeat:-1,ease:'none'});govern('#films',[filmStar]);
 const contactFloat=gsap.to('.contact-orb',{y:-10,rotation:12,duration:2.4,repeat:-1,yoyo:true,ease:'sine.inOut'});govern('#contact',[contactFloat]);
 ScrollTrigger.batch('.approved-brand',{start:'top 95%',once:true,onEnter:batch=>gsap.fromTo(batch,{y:18,opacity:.3},{y:0,opacity:1,duration:.6,stagger:.035,ease:'power2.out',overwrite:'auto',clearProps:'transform,opacity'})});
 gsap.utils.toArray('.video-card,.google-card').forEach(el=>gsap.from(el,{y:30,opacity:.3,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
 gsap.utils.toArray('.section-heading h2,.about-copy h2,.contact h2').forEach(el=>gsap.from(el,{y:80,rotation:2,opacity:.05,duration:1.2,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
 gsap.utils.toArray('.service-icon').forEach(el=>gsap.to(el,{rotation:90,scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}}));
 return()=>{cleanups.forEach(fn=>fn());gsap.killTweensOf(word)};
});
motionContext.add(motionOverride?'(min-width: 992px) and (pointer: fine)':'(min-width: 992px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
 gsap.to('.kinetic-art',{y:100,rotation:8,scrollTrigger:{trigger:'.hero-stage',start:'top top',end:'bottom top',scrub:1}});

});
}catch{/* Content and native navigation remain visible. */}}
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>window.ScrollTrigger?.refresh()));
const cursor=document.createElement('div');cursor.className='mouse-cursor';cursor.setAttribute('aria-hidden','true');document.body.append(cursor);
if(matchMedia('(pointer: fine)').matches){let cursorTick=false,cursorX=0,cursorY=0;addEventListener('pointermove',e=>{cursorX=e.clientX;cursorY=e.clientY;if(!cursorTick){cursorTick=true;requestAnimationFrame(()=>{if(!motionEnabled||document.hidden){cursorTick=false;return}cursor.style.transform=`translate3d(${cursorX-7}px,${cursorY-7}px,0)`;cursorTick=false})}},{passive:true});document.querySelectorAll('a,button,summary').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('hover'));el.addEventListener('pointerleave',()=>cursor.classList.remove('hover'))})}
(window.requestIdleCallback||((cb)=>setTimeout(cb,100)))(animate);
let progressPending=false;addEventListener('scroll',()=>{if(progressPending)return;progressPending=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=`${max>0?scrollY/max*100:0}%`;progressPending=false})},{passive:true});
