
document.addEventListener('DOMContentLoaded',()=>{
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  try{ if(sessionStorage.getItem('loggedIn')==='1') document.getElementById('logoutIcon').style.display='inline-block'; }catch(e){}
  const lo=document.getElementById('logoutIcon'); if(lo) lo.onclick=()=>{ try{sessionStorage.removeItem('loggedIn');}catch(e){} window.location='index.html'; };

  if(document.body.classList.contains('login-slideshow')){
    const imgs=(window.SLIDESHOW_IMAGES)||[];
    const a=document.createElement('div');a.className='bg-layer';
    const b=document.createElement('div');b.className='bg-layer';
    document.body.appendChild(a);document.body.appendChild(b);
    let idx=0,toggle=false;
    function showNext(){idx=(idx+1)%imgs.length;const el=toggle?a:b;const hide=toggle?b:a;el.style.backgroundImage='url('+imgs[idx]+')';el.classList.add('show');hide.classList.remove('show');toggle=!toggle;}
    if(imgs.length){ a.style.backgroundImage='url('+imgs[0]+')'; a.classList.add('show'); if(imgs.length>1){ b.style.backgroundImage='url('+imgs[1]+')'; } setInterval(showNext,5000); }
  }

  const form=document.getElementById('loginForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const email=document.getElementById('email').value.trim();
      const pass=document.getElementById('password').value.trim();
      if(email==='demo@securewipe.com' && pass==='password123'){
        try{ sessionStorage.setItem('loggedIn','1'); }catch(e){}
        window.location='dashboard.html';
      } else { alert('Invalid credentials'); }
    });
  }
});
