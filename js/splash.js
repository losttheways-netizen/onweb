/* ============================================================
   SPLASH SCREEN — วิดีโอเปิดหน้าเว็บ (เฉพาะจอเดสก์ท็อป)
   - เล่นวิดีโอ images/splash/sony.mp4 เต็มจอ 1 รอบตอนโหลดหน้า
   - พอวิดีโอจบ (หรือเล่นไม่ได้ / ติดปัญหา) จะ fade ออกแล้วลบทิ้ง
   - บนจอมือถือ/แท็บเล็ต (กว้าง <= 900px) จะไม่โหลดวิดีโอเลย ประหยัด bandwidth
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var splash = document.getElementById('splash-screen');
  if (!splash) return;

  var isDesktop = window.matchMedia('(min-width: 901px)').matches;

  if (!isDesktop) {
    splash.remove();
    return;
  }

  document.documentElement.classList.add('is-splashing');

  var video = document.getElementById('splash-video');
  var source = video ? video.querySelector('source') : null;

  function hideSplash() {
    if (!splash || splash.dataset.hidden === '1') return;
    splash.dataset.hidden = '1';
    splash.classList.add('splash-hide');
    document.documentElement.classList.remove('is-splashing');
    setTimeout(function () {
      splash.remove();
    }, 700); // ให้เวลา transition opacity ใน CSS เล่นจบก่อนค่อยลบออกจาก DOM
  }

  if (!video || !source) {
    hideSplash();
    return;
  }

  // กันเหนียว: ถ้าวิดีโอค้าง/โหลดไม่จบ ให้ตัดจบ splash อัตโนมัติหลัง 8 วิ
  var fallbackTimer = setTimeout(hideSplash, 8000);

  video.addEventListener('ended', function () {
    clearTimeout(fallbackTimer);
    hideSplash();
  });

  video.addEventListener('error', function () {
    clearTimeout(fallbackTimer);
    hideSplash();
  });

  // ตั้ง src ตอนนี้เท่านั้น (เดสก์ท็อปเท่านั้น) แล้วเริ่มเล่น
  source.src = source.getAttribute('data-src');
  video.load();

  var playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(function () {
      clearTimeout(fallbackTimer);
      hideSplash();
    });
  }
});
