(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement, anim = root.classList.contains('anim');
  var finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var M = window.AFSMotion = { bindMagnets: function () {} };

  /* ---------- Marquee: duplicate the track so the loop is seamless ---------- */
  var track = $('#track'); track.innerHTML += track.innerHTML;

  /* ---------- Nav, scroll cup, dock (no libraries needed) ---------- */
  var nav = $('#nav'), cup = $('#cupfill'), dock = $('#dock'), last = scrollY, queued = false;
  function onScroll() {
    if (queued) return; queued = true;
    requestAnimationFrame(function () {
      var y = scrollY, max = Math.max(1, root.scrollHeight - innerHeight), p = Math.min(1, y / max);
      cup.setAttribute('y', (32 - p * 26).toFixed(1));
      nav.classList.toggle('solid', y > 30);
      nav.classList.toggle('hide', y > last && y > 360 && !document.body.classList.contains('menu-open'));
      dock.classList.toggle('show', y > 520);
      last = y; queued = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Magnetic buttons (mouse only) ---------- */
  M.bindMagnets = function (scope) {
    if (!(anim && finePointer)) return;
    $$('.mag', scope || document).forEach(function (el) {
      if (el._m) return; el._m = true;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.2 + 'px,' + (e.clientY - r.top - r.height / 2) * 0.28 + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  };
  M.bindMagnets();

  /* ---------- Everything below needs GSAP; fall back to a static page if it is missing ---------- */
  if (!anim || !window.gsap || !window.ScrollTrigger) { root.classList.remove('anim'); return; }
  gsap.registerPlugin(ScrollTrigger);

  /* Smooth scrolling */
  var lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.addEventListener('afs:menu', function (e) { e.detail ? lenis.stop() : lenis.start(); });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute('href'); if (id.length < 2) return;
    var t = $(id); if (!t) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(t, { offset: -64, duration: 1.3 }); else t.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', id);
  });

  /* Hero intro */
  var hero = $('.hero'), heroReveals = $$('.hero [data-reveal]');
  var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.fromTo('.hero .w>span', { yPercent: 115, visibility: 'visible' }, { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0.15)
    .fromTo('.hero .arch', { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 28px 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 28px 28px)', duration: 1.5, ease: 'power3.inOut' }, 0.25)
    .fromTo(heroReveals, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, clearProps: 'transform' }, 0.75)
    .fromTo('.badge', { scale: 0, rotate: -120, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: 'back.out(1.6)', clearProps: 'transform' }, 1.0)
    .fromTo('.coin', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'elastic.out(1,.5)', clearProps: 'transform' }, 1.2);

  /* Scroll reveals */
  $$('[data-stagger]').forEach(function (p) { [].slice.call(p.children).forEach(function (c, i) { c.setAttribute('data-reveal', ''); c.style.setProperty('--d', i); }); });
  var items = $$('[data-reveal]').filter(function (el) { return !hero.contains(el); });
  ScrollTrigger.batch(items, {
    start: 'top 90%', once: true,
    onEnter: function (batch) {
      batch.forEach(function (b) { b.classList.add('in'); });
      gsap.fromTo(batch, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95, stagger: 0.09, ease: 'power3.out', overwrite: true, clearProps: 'transform' });
    }
  });

  /* Count-up numbers */
  $$('[data-count]').forEach(function (el) {
    var to = parseFloat(el.dataset.count), pre = el.dataset.prefix || '', o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () {
      gsap.to(o, { v: to, duration: 1.6, ease: 'power2.out', onUpdate: function () { el.textContent = pre + Math.round(o.v); } });
    } });
  });

  /* Gentle image parallax */
  [['.arch', '.arch img'], ['.founder .pic', '.founder .pic img'], ['.menu-fig', '.menu-fig img']].forEach(function (pair) {
    var w = $(pair[0]), i = $(pair[1]); if (!w || !i) return;
    gsap.fromTo(i, { yPercent: -5, scale: 1.1 }, { yPercent: 5, scale: 1.1, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* Video poster slow zoom while it scrolls through */
  var vid = $('#intro');
  if (vid) gsap.fromTo(vid, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.vid', start: 'top bottom', end: 'center center', scrub: true } });

  addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
