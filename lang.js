// ===== 언어 전환 스위치 (日本語 / 한국어) =====
// 사용법: 번역하고 싶은 요소에 data-ko="한국어 문장" 만 적으면 됨
//   예) <a href="career.html" data-ko="경력">経歴</a>
// 일본어 원문은 처음 로딩 때 data-ja에 자동으로 보관됨
(function () {
  const sw = document.querySelector('.lang-switch');
  if (!sw) return;

  const targets = document.querySelectorAll('[data-ko]');
  targets.forEach(function (el) {
    el.dataset.ja = el.innerHTML;
  });

  function apply(lang) {
    targets.forEach(function (el) {
      el.innerHTML = lang === 'ko' ? el.dataset.ko : el.dataset.ja;
    });
    sw.classList.toggle('is-ko', lang === 'ko');   // 파란 배경을 오른쪽으로 이동
    sw.querySelectorAll('.lang-option').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  }

  // 다른 페이지로 이동해도 고른 언어 유지
  let saved = 'ja';
  try { saved = localStorage.getItem('lang') || 'ja'; } catch (e) {}

  // 페이지를 열 때는 애니메이션 없이 바로 그 위치에 표시
  sw.classList.add('no-anim');
  apply(saved);
  setTimeout(function () { sw.classList.remove('no-anim'); }, 50);

  sw.addEventListener('click', function (e) {
    const btn = e.target.closest('.lang-option');
    if (!btn) return;
    apply(btn.dataset.lang);
    try { localStorage.setItem('lang', btn.dataset.lang); } catch (e) {}
  });
})();
