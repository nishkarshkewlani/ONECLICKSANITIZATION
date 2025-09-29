// script.js - interactive bits for landing page

document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // counters animation
  const counters = document.querySelectorAll('.impact-card .big');
  counters.forEach(el => {
    const target = Number(el.dataset.target || 0);
    animateCounter(el, target, 1800);
  });

  // demo UI
  const startBtn = document.getElementById('startWipe');
  const progressFill = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');
  const progressLog = document.getElementById('progressLog');
  const progressCard = document.getElementById('progressCard');
  const demoActions = document.getElementById('demoActions');
  const downloadJSON = document.getElementById('downloadJSON');
  const viewCert = document.getElementById('viewCert');

  const certModal = document.getElementById('certModal');
  const certBody = document.getElementById('certBody');
  const closeModal = document.getElementById('closeModal');
  const downloadCertJson = document.getElementById('downloadCertJson');
  const closeCert = document.getElementById('closeCert');

  // start simulated wipe
  startBtn.addEventListener('click', () => {
    progressCard.setAttribute('aria-hidden', 'false');
    demoActions.style.display = 'none';
    progressFill.style.width = '0%';
    progressLabel.textContent = '0%';
    progressLog.textContent = 'Initializing secure wipe...';
    simulateWipe();
  });

  // simulate the wipe process (non-destructive demo)
  function simulateWipe() {
    const steps = [
      { text: 'Detecting device and partitions...', time: 900 },
      { text: 'Checking hidden areas (HPA/DCO)...', time: 1000 },
      { text: 'Applying secure wipe algorithm (simulated)...', time: 1600 },
      { text: 'Overwriting sectors (simulated passes)...', time: 2200 },
      { text: 'Verifying erase integrity...', time: 1200 },
      { text: 'Finalizing and generating certificate...', time: 900 }
    ];
    let progress = 0;
    let idx = 0;

    function next() {
      if (idx >= steps.length) {
        progress = 100;
        updateProgress(progress);
        progressLog.textContent = 'Wipe complete — certificate ready.';
        demoActions.style.display = 'flex';
        // show certificate data prepared
        window.currentCertificate = generateCertificate();
        return;
      }
      const step = steps[idx];
      progress += Math.round(100 / steps.length);
      updateProgress(progress);
      progressLog.textContent = step.text;
      idx++;
      setTimeout(next, step.time);
    }
    next();
  }

  function updateProgress(pct) {
    progressFill.style.width = pct + '%';
    progressLabel.textContent = pct + '%';
  }

  // create a simulated JSON certificate (sample)
  function generateCertificate() {
    const deviceType = document.getElementById('deviceType').value;
    const wipeLevel = document.getElementById('wipeLevel').value;
    const cert = {
      certificate_id: 'SW-' + Date.now().toString(36).toUpperCase(),
      issued_at: new Date().toISOString(),
      device: {
        platform: deviceType,
        identifier: 'SIM-DEVICE-0000',
        wipe_level: wipeLevel
      },
      wipe_summary: {
        method: 'Simulated secure wipe',
        passes: wipeLevel.includes('3-pass') ? 3 : (wipeLevel.includes('7-pass') ? 7 : 1),
        verification: 'Simulated checksum validation (demo)'
      },
      issuer: {
        name: 'SecureWipe (Demo)',
        contact: 'team@securewipe.example'
      },
      signature: {
        algorithm: 'SHA256withRSA (placeholder)',
        signature: 'SIG_PLACEHOLDER_BASE64'
      }
    };
    return cert;
  }

  // download button
  downloadJSON.addEventListener('click', () => {
    if (!window.currentCertificate) return alert('No certificate yet — run the demo first.');
    downloadObjectAsJson(window.currentCertificate, 'securewipe-certificate');
  });

  // view certificate in modal
  viewCert.addEventListener('click', () => {
    if (!window.currentCertificate) return alert('No certificate yet — run the demo first.');
    const jsonText = JSON.stringify(window.currentCertificate, null, 2);
    certBody.textContent = jsonText;
    certModal.setAttribute('aria-hidden', 'false');
    certModal.style.display = 'flex';
  });

  // modal handling
  closeModal.addEventListener('click', () => {
    certModal.setAttribute('aria-hidden', 'true');
    certModal.style.display = 'none';
  });
  closeCert.addEventListener('click', () => {
    certModal.setAttribute('aria-hidden', 'true');
    certModal.style.display = 'none';
  });

  downloadCertJson.addEventListener('click', () => {
    if (!window.currentCertificate) return;
    downloadObjectAsJson(window.currentCertificate, 'securewipe-certificate');
  });

  // helper: download JSON
  function downloadObjectAsJson(exportObj, exportName){
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", exportName + ".json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  }

  // animate counters (simple)
  function animateCounter(el, target, duration = 1500) {
    const start = 0;
    const range = target - start;
    const stepTime = Math.max(Math.floor(duration / (range || 1)), 20);
    let current = start;
    const increment = Math.max(1, Math.floor(range / (duration / stepTime)));
    const ticker = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(ticker);
      }
      // format big numbers
      el.textContent = formatNumber(current);
    }, stepTime);
  }

  function formatNumber(n) {
    if (n >= 1e9) return Math.floor(n / 1e9) + 'B';
    if (n >= 1e6) return Math.floor(n / 1e6) + 'M';
    if (n >= 1e3) return Math.floor(n / 1e3) + 'K';
    return n.toString();
  }

});