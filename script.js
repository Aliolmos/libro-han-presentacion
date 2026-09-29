
(function(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var c = document.getElementById('petals'), ctx = c.getContext('2d'), W, H, dpr, petals = [];
  function size(){ dpr = Math.min(window.devicePixelRatio||1, 2); W = innerWidth; H = innerHeight; c.width = W*dpr; c.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
  size(); addEventListener('resize', size);
  var N = innerWidth < 600 ? 12 : 22;
  function mk(top){ return { x: Math.random()*W, y: top ? -20 : Math.random()*H, s: 5+Math.random()*7, vy: .35+Math.random()*.6, vx: .2+Math.random()*.5, r: Math.random()*6.28, vr: (Math.random()-.5)*.03, sw: Math.random()*6.28, a: .35+Math.random()*.4 }; }
  for (var i=0;i<N;i++) petals.push(mk(false));
  function petal(p){
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.scale(1, Math.abs(Math.cos(p.sw))*.6+.4);
    ctx.globalAlpha = p.a;
    var g = ctx.createLinearGradient(-p.s,0,p.s,0); g.addColorStop(0,'#f8d6ee'); g.addColorStop(1,'#c08ad8');
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(0,-p.s); ctx.bezierCurveTo(p.s,-p.s*.6,p.s*.8,p.s*.7,0,p.s); ctx.bezierCurveTo(-p.s*.8,p.s*.7,-p.s,-p.s*.6,-p.s*.15,-p.s*.85);
    ctx.lineTo(0,-p.s*.55); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  function tick(){
    ctx.clearRect(0,0,W,H);
    for (var i=0;i<petals.length;i++){
      var p = petals[i]; p.sw += .02; p.y += p.vy; p.x += p.vx + Math.sin(p.sw)*.4; p.r += p.vr;
      if (p.y > H+20 || p.x > W+20) petals[i] = mk(true);
      petal(p);
    }
    requestAnimationFrame(tick);
  }
  tick();
})();
