
function setupCarousel(id){
  const root=document.getElementById(id); if(!root) return;
  const track=root.querySelector('.track'); const slides=[...track.children];
  const dotsWrap=root.querySelector('.dots'); let i=0,N=slides.length,timer=null;
  slides.forEach((_,idx)=>{const d=document.createElement('span');d.className='dot'+(idx===0?' active':'');d.onclick=()=>go(idx);dotsWrap.appendChild(d);});
  const dots=[...dotsWrap.children];
  function go(idx){ i=(idx+N)%N; track.style.transform='translateX('+(-i*100)+'%)'; dots.forEach((d,k)=>d.classList.toggle('active',k===i)); restart(); }
  function next(){go(i+1);} function prev(){go(i-1);}
  root.querySelector('.arrow.left').addEventListener('click',prev);
  root.querySelector('.arrow.right').addEventListener('click',next);
  function restart(){ if(timer) clearInterval(timer); timer=setInterval(next,5000); }
  restart();
}
