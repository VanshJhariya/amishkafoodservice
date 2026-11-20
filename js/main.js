(function () {
  var v = document.getElementById('intro'), play = document.getElementById('vplay'), mute = document.getElementById('vmute');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, userPaused = reduce;

  function label() {
    play.textContent = v.paused ? 'Play' : 'Pause';
    play.setAttribute('aria-label', v.paused ? 'Play video' : 'Pause video');
    mute.textContent = v.muted ? 'Sound on' : 'Sound off';
    mute.setAttribute('aria-label', v.muted ? 'Turn sound on' : 'Turn sound off');
  }
  play.addEventListener('click', function () {
    if (v.paused) { userPaused = false; v.play().catch(function () {}); } else { userPaused = true; v.pause(); }
    label();
  });
  mute.addEventListener('click', function () { v.muted = !v.muted; label(); });

  /* Play only while on screen, and never against the visitor's wishes */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !userPaused) v.play().catch(function () {}); else if (!e.isIntersecting) v.pause();
        label();
      });
    }, { threshold: 0.25 }).observe(v);
  }
  label();
  window.__afsReady = true;
})();
