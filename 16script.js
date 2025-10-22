// 16script.js — simple interactivity for 16top.html
document.addEventListener('DOMContentLoaded', ()=>{
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = Array.from(document.querySelectorAll('.card'));

  // filter by country
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const country = btn.dataset.country;
      cards.forEach(c=>{
        if(country === 'all' || c.dataset.country === country){
          c.style.display = '';
          // trigger reveal animation
          requestAnimationFrame(()=>{ c.dataset.revealed = 'true'; c.setAttribute('data-revealed',''); });
        } else {
          c.style.display = 'none';
        }
      });
    });
  });

  // reveal on scroll — IntersectionObserver
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.dataset.revealed = 'true';
          io.unobserve(ent.target);
        }
      });
    },{threshold:0.12});
    cards.forEach(c=>io.observe(c));
  } else {
    // fallback: reveal all
    cards.forEach(c=>c.dataset.revealed = 'true');
  }

  // small keyboard accessibility: filter with number keys 1-5
  document.addEventListener('keydown', (e)=>{
    if(document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
    if(e.key >= '1' && e.key <= '6'){
      const idx = parseInt(e.key,10)-1;
      if(buttons[idx]) buttons[idx].click();
    }
  });

  // micro animation: shuffle highlight one card periodically
  setInterval(()=>{
    const visible = cards.filter(c=>c.style.display !== 'none');
    if(visible.length === 0) return;
    const pick = visible[Math.floor(Math.random()*visible.length)];
    pick.style.boxShadow = '0 18px 48px rgba(125,211,252,0.06), inset 0 0 24px rgba(255,255,255,0.02)';
    setTimeout(()=>{ pick.style.boxShadow = ''; }, 900);
  }, 3000);
});
