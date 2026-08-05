
// scroll reveal
const lines = document.querySelectorAll('.reveal-line');
lines.forEach((el,i)=> el.style.transitionDelay = (i*0.12)+'s');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.3});
lines.forEach(el=>io.observe(el));

// train trigger
const trainTrack = document.getElementById('trainTrack');
const trainIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) trainTrack.classList.add('playing'); });
},{threshold:0.2});
trainIO.observe(document.getElementById('trainSection'));

// parallax blossom
const bgBlossom = document.getElementById('bgBlossom');
window.addEventListener('scroll',()=>{
  bgBlossom.style.transform = 'translateY('+(window.scrollY*0.15)+'px)';
});

// pointer tracking (normalized -1..1), mouse + touch
let mouseX=0, mouseY=0;
function setPointer(x,y){
  mouseX = (x/window.innerWidth)*2-1;
  mouseY = (y/window.innerHeight)*2-1;
}
window.addEventListener('mousemove',(e)=> setPointer(e.clientX,e.clientY));
window.addEventListener('touchmove',(e)=>{
  if(e.touches[0]) setPointer(e.touches[0].clientX,e.touches[0].clientY);
},{passive:true});

// book: fixed 3D angle (no continuous spin), gentle float + subtle pointer tilt
const book = document.getElementById('book');
const bookShadow = document.getElementById('bookShadow');
const BASE_Y = -24, BASE_X = 8;
let tiltX=0, tiltY=0;
function animateBook(t){
  tiltX += ((mouseY*6) - tiltX)*0.04;
  tiltY += ((mouseX*8) - tiltY)*0.04;
  const bob = Math.sin(t/1400)*6;
  book.style.transform = `translateY(${bob}px) rotateY(${BASE_Y+tiltY}deg) rotateX(${BASE_X-tiltX}deg)`;
  bookShadow.style.opacity = 0.45 - Math.abs(bob)/40;
  requestAnimationFrame(animateBook);
}
requestAnimationFrame(animateBook);

// petals + sparkles
const petalLayer = document.getElementById('petal-layer');
const sparkLayer = document.getElementById('spark-layer');
const W = ()=>window.innerWidth, H=()=>window.innerHeight;

const isSmall = window.innerWidth < 640;
const petalCount = isSmall ? 8 : 16;
const sparkCount = isSmall ? 12 : 24;

const petals = Array.from({length:petalCount}).map(()=>{
  const el = document.createElement('div');
  el.className='petal';
  petalLayer.appendChild(el);
  return {
    el, x:Math.random()*W(), y:Math.random()*-H(),
    vy:0.4+Math.random()*0.6, sway:Math.random()*1.5,
    phase:Math.random()*Math.PI*2, rot:Math.random()*360
  };
});

for(let i=0;i<sparkCount;i++){
  const el=document.createElement('div');
  el.className='spark';
  el.style.left = Math.random()*100+'vw';
  el.style.top = Math.random()*100+'vh';
  el.style.animationDelay = (Math.random()*3)+'s';
  sparkLayer.appendChild(el);
}

function animateParticles(t){
  petals.forEach(p=>{
    p.y += p.vy;
    p.x += Math.sin(t/1000 + p.phase)*p.sway*0.3;
    // mouse repulsion
    const mx = (mouseX*0.5+0.5)*W(), my=(mouseY*0.5+0.5)*H();
    const dx = p.x-mx, dy=p.y-my, dist=Math.sqrt(dx*dx+dy*dy);
    if(dist<120){ p.x += (dx/dist)*2; p.y += (dy/dist)*1; }
    if(p.y > H()+20){ p.y = -20; p.x = Math.random()*W(); }
    p.rot += 0.3;
    p.el.style.transform = `translate(${p.x}px,${p.y}px) rotate(${p.rot}deg)`;
  });
  requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);
