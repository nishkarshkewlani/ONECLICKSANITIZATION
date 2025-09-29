
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.getElementById('analyzeBtn'); if(!btn) return;
  btn.addEventListener('click', async () => {
    const log=document.getElementById('analysisLog');
    const bar=document.getElementById('progressBar');
    const results=document.getElementById('analysisResults');
    const actions=document.getElementById('certActions');
    log.textContent=''; bar.style.width='0%'; results.style.display='none'; actions.style.display='none';
    const steps=['Collecting device telemetry...','Analyzing storage topology...','Checking hidden areas (HPA/DCO)...','Running AI model...','Selecting best package...','Ready!'];
    for(let i=0;i<steps.length;i++){log.textContent+=steps[i]+'\n';bar.style.width=((i+1)/steps.length*100)+'%';await new Promise(r=>setTimeout(r,1100));}
    results.style.display='flex'; actions.style.display='flex';
  });
});
