/* 상담 전환 클릭 측정 (GA4) */
(function () {
  function send(name, params) {
    if (typeof gtag !== 'function') return;
    params.transport_type = 'beacon';
    gtag('event', name, params);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var text = (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 40);
    var base = { link_url: href, link_text: text, page_path: location.pathname };

    if (href.indexOf('forms.gle') > -1 || href.indexOf('docs.google.com/forms') > -1) {
      send('click_consult_form', base);
    } else if (href.indexOf('tel:') === 0) {
      send('click_call', base);
    } else if (href.indexOf('pf.kakao.com') > -1) {
      send('click_kakao', base);
    } else if (/blog\.naver\.com|youtube\.com|instagram\.com/.test(href)) {
      base.channel = /naver/.test(href) ? 'naver_blog' : /youtube/.test(href) ? 'youtube' : 'instagram';
      send('click_channel', base);
    } else if (/map\.naver\.com|google\.com\/maps/.test(href)) {
      send('click_map', base);
    }
  }, true);
})();
