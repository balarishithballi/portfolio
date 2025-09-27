function openDocument(){
  window.open('/assets/INFILTR8.pdf', '_blank');
}

// Smooth scroll for navbar
document.querySelectorAll('.nav-link').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Animate progress bars after visible
const io = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.progress-bar').forEach(bar=>{
        const val = bar.getAttribute('data-value') || 0;
        bar.style.setProperty('--target', val + '%');
        bar.style.width = val + '%';
      });
      io.unobserve(entry.target);
    }
  });
},{threshold:0.25});
document.querySelectorAll('#skills').forEach(sec=>io.observe(sec));

// Subtle animated grid background on canvas
(function(){
  const c = document.getElementById('grid-canvas');
  const ctx = c.getContext('2d');
  let w, h, t = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  function resize(){
    w = c.width = innerWidth * DPR;
    h = c.height = innerHeight * DPR;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  window.addEventListener('resize', resize); resize();

  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = 'rgba(0,255,195,0.12)';
    ctx.lineWidth = 1;
    const grid = 36;
    const ox = Math.sin(t/1200)*12;
    const oy = Math.cos(t/1400)*12;
    for(let x = ox; x < innerWidth+grid; x += grid){
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,innerHeight); ctx.stroke();
    }
    for(let y = oy; y < innerHeight+grid; y += grid){
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(innerWidth,y); ctx.stroke();
    }
    t += 16;
    requestAnimationFrame(draw);
  }
  draw();
})();

// Re-trigger typewriter on load
window.addEventListener('load', ()=>{
  document.querySelectorAll('.typewriter').forEach(el=>{
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
});
