(function () {
  var D = window.AFS, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var anim = document.documentElement.classList.contains('anim');
  var inr = function (n) { return '₹' + n.toLocaleString('en-IN'); };

  /* ---------- Menu ---------- */
  var mtabs = $('#mtabs'), mlist = $('#mlist'), mimg = $('#mimg'), mcur = 0;
  D.menu.forEach(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = c.name; b.setAttribute('aria-pressed', i === 0);
    b.addEventListener('click', function () { mcur = i; $$('button', mtabs).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); showMenu(true); });
    mtabs.appendChild(b);
  });
  function showMenu(swap) {
    var c = D.menu[mcur];
    mimg.src = c.img; mimg.alt = c.alt;
    mlist.innerHTML = c.items.map(function (it, k) {
      return '<article class="mi' + (it.popular ? ' pop' : '') + '" style="--k:' + k + '"><div><h3>' + it.name + (it.popular ? '<em>Most loved</em>' : '') + '</h3><p>' + it.desc + '</p></div>' +
        (it.price ? '<span class="price">₹' + it.price + '</span>' : '') + '</article>';
    }).join('');
    if (swap) { var p = $('.menu-panel'); p.classList.remove('swap'); void p.offsetWidth; p.classList.add('swap'); }
  }
  showMenu(false);

  /* ---------- Outlets with live status (India time) ---------- */
  var olist = $('#olist');
  olist.innerHTML = D.outlets.map(function (o, i) {
    return '<article class="oc' + (o.head ? ' head' : '') + '" data-reveal style="--d:' + (i % 3) + '"><div class="oc-top"><span class="idx">0' + (i + 1) + '</span><span class="st"><i class="dot"></i><b></b></span></div>' +
      '<h3>' + o.name + '</h3><p>' + o.note + '</p><p class="hrs">Open daily, 7am to 10pm</p>' +
      '<a class="dir" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(o.q) + '" target="_blank" rel="noopener">Get directions <span aria-hidden="true">→</span></a></article>';
  }).join('') + '<a class="oc next" href="#franchise" data-reveal style="--d:2"><span>The next one</span><h3>Could be yours.</h3><span class="arrow" aria-hidden="true">→</span></a>';
  function fmtH(h) { var hh = Math.floor(h); return ((hh + 11) % 12 + 1) + (hh >= 12 ? 'pm' : 'am'); }
  function status() {
    var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    var h = +p.find(function (x) { return x.type === 'hour'; }).value % 24 + +p.find(function (x) { return x.type === 'minute'; }).value / 60;
    var open = h >= D.hours.open && h < D.hours.close;
    $$('.oc .st').forEach(function (s) {
      s.classList.toggle('on', open);
      $('b', s).textContent = open ? 'Open now, until ' + fmtH(D.hours.close) : 'Closed, opens ' + fmtH(D.hours.open);
    });
  }
  status(); setInterval(status, 60000);

  /* ---------- Franchise plan explorer ---------- */
  var plans = $('#plans'), pp = $('#pp'), pcur = 1, shown = D.plans[1].price, fplan = $('#fplan');
  D.plans.forEach(function (p, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-pressed', i === pcur);
    b.innerHTML = '<span class="pn">' + p.short + '</span><strong>' + inr(p.price) + '</strong><span class="pc">' + p.count + '</span>';
    b.addEventListener('click', function () { pcur = i; $$('button', plans).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); showPlan(true); });
    plans.appendChild(b);
  });
  function tween(el, to) {
    var from = shown, t0 = performance.now(), dur = anim ? 650 : 0; shown = to;
    if (!dur) { el.textContent = inr(to); return; }
    (function step(now) { var k = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = inr(Math.round(from + (to - from) * e)); if (k < 1) requestAnimationFrame(step); })(t0);
  }
  function showPlan(swap) {
    var p = D.plans[pcur];
    pp.innerHTML = '<div class="pp-head"><div><span class="pp-tag">' + p.tag + '</span><h3>' + p.short + '</h3></div><div class="pp-price"><small>Setup package</small><strong id="ppv">' + inr(shown) + '</strong></div></div>' +
      '<div class="pp-groups">' + p.groups.map(function (g, k) {
        return '<section style="--k:' + k + '"><h4>' + g.t + '</h4><ul>' + g.items.map(function (it) { return '<li>' + it + '</li>'; }).join('') + '</ul></section>';
      }).join('') + '</div><a class="btn mag" href="#enquire" data-plan="' + p.id + '">I\'m interested in this plan</a>';
    tween($('#ppv'), p.price);
    $('[data-plan]', pp).addEventListener('click', function () { fplan.value = p.id; });
    if (swap) { pp.classList.remove('swap'); void pp.offsetWidth; pp.classList.add('swap'); }
    if (window.AFSMotion && window.AFSMotion.bindMagnets) window.AFSMotion.bindMagnets(pp);
  }
  showPlan(false);

  /* ---------- FAQ ---------- */
  var faqs = $('#faqs');
  faqs.innerHTML = D.faq.map(function (f, i) {
    return '<div class="q"><button type="button" aria-expanded="' + (i === 0) + '" aria-controls="a' + i + '" id="q' + i + '">' + f[0] + '</button><div class="a" id="a' + i + '" role="region" aria-labelledby="q' + i + '"><div><p>' + f[1] + '</p></div></div></div>';
  }).join('');
  $$('button', faqs).forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      $$('button', faqs).forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
      b.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ---------- Enquiry form (opens WhatsApp) ---------- */
  fplan.innerHTML = D.plans.map(function (p) { return '<option value="' + p.id + '">' + p.short + ' (' + inr(p.price) + ')</option>'; }).join('') + '<option value="unsure" selected>Not sure yet</option>';
  var form = $('#enquire');
  function setErr(n, m) { var e = $('[data-for="' + n + '"]', form), f = form.elements[n]; e.textContent = m || ''; if (f) f.setAttribute('aria-invalid', m ? 'true' : 'false'); }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var f = form.elements, name = f.name.value.trim(), city = f.city.value.trim(), phone = f.phone.value.replace(/[\s-]/g, '').replace(/^(\+?91|0)/, '');
    var ok = true;
    setErr('name', name.length < 2 ? 'Please enter your name.' : ''); if (name.length < 2) ok = false;
    var pv = /^[6-9]\d{9}$/.test(phone); setErr('phone', pv ? '' : 'Please enter a valid 10-digit mobile number.'); if (!pv) ok = false;
    setErr('city', city.length < 2 ? 'Please enter your city.' : ''); if (city.length < 2) ok = false;
    if (!ok) { var bad = $('[aria-invalid="true"]', form); if (bad) bad.focus(); return; }
    var plan = f.plan.value === 'unsure' ? 'not sure which plan yet' : 'the ' + D.plans.filter(function (p) { return p.id === f.plan.value; })[0].short + ' plan';
    var msg = 'Hello AFS team, I am ' + name + ' from ' + city + '. I am interested in an AFS franchise and I am ' + (f.plan.value === 'unsure' ? plan : 'looking at ' + plan) + '. My number is ' + phone + '.' + (f.message.value.trim() ? ' ' + f.message.value.trim() : '');
    var url = 'https://wa.me/' + D.contact.wa + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank', 'noopener');
    $('#fok').innerHTML = 'Thank you, ' + name.replace(/</g, '') + '. WhatsApp is opening with your enquiry. If it does not, <a href="' + url + '" target="_blank" rel="noopener">tap here</a>.';
  });
  $$('input', form).forEach(function (i) { i.addEventListener('input', function () { setErr(i.name, ''); }); });

  /* ---------- Mobile drawer ---------- */
  var burger = $('#burger'), drawer = $('#drawer');
  function menu(open) {
    drawer.classList.toggle('open', open); document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.setAttribute('aria-hidden', String(!open));
    document.dispatchEvent(new CustomEvent('afs:menu', { detail: open }));
  }
  burger.addEventListener('click', function () { menu(!drawer.classList.contains('open')); });
  $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) { menu(false); burger.focus(); } });
  $('#yr').textContent = new Date().getFullYear();
})();
