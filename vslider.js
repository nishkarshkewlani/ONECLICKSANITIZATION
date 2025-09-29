
function setupVCarousel(id){
  const root=document.getElementById(id); if(!root) return;
  const track=root.querySelector('.v-track'); const slides=[...root.querySelectorAll('.v-slide')];
  const dotsWrap=root.querySelector('.v-dots'); let i=0,N=slides.length,timer=null,height=root.clientHeight;
  window.addEventListener('resize',()=>{height=root.clientHeight; go(i,false);});
  slides.forEach((_,idx)=>{const d=document.createElement('div');d.className='v-dot'+(idx===0?' active':'');d.onclick=()=>go(idx);dotsWrap.appendChild(d);});
  const dots=[...dotsWrap.children];
  function go(idx,doRestart=true){ i=(idx+N)%N; track.style.transform='translateY('+(-i*height)+'px)'; dots.forEach((d,k)=>d.classList.toggle('active',k===i)); if(doRestart) restart(); }
  function next(){go(i+1);} function prev(){go(i-1);}
  const U=root.querySelector('.v-arrow.up'), D=root.querySelector('.v-arrow.down');
  if(U) U.addEventListener('click',prev); if(D) D.addEventListener('click',next);
  function restart(){ if(timer) clearInterval(timer); timer=setInterval(next,5000); }
  restart(); go(0,false);
}
