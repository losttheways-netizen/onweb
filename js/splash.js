/* ============================================================
   SPLASH SCREEN — วิดีโอเปิดหน้าเว็บ
   - จอกว้าง (> 900px)   : เล่น images/splash/sony.mp4
   - จอแนวตั้ง/มือถือ (<= 900px) : เล่น images/splash/sony_Ver.mp4
   - เล่นวิดีโอเต็มจอ 1 รอบตอนโหลดหน้า พอจบ (หรือเล่นไม่ได้ / ติดปัญหา) จะ fade ออกแล้วลบทิ้ง
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var splash = document.getElementById('splash-screen');
  if (!splash) return;

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

  // เลือกไฟล์วิดีโอตามขนาดจอ ณ ตอนโหลดหน้า แล้วเริ่มเล่น
  var isDesktop = window.matchMedia('(min-width: 901px)').matches;
  var chosenSrc = isDesktop
    ? source.getAttribute('data-src-desktop')
    : source.getAttribute('data-src-mobile');
  source.src = chosenSrc;
  video.load();

  var playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(function () {
      clearTimeout(fallbackTimer);
      hideSplash();
    });
  }
});
