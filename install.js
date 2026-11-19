// ভোক্তার কণ্ঠ — "অ্যাপ ইনস্টল করুন" বাটন
(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  var standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (standalone) return; // ইনস্টল করা অ্যাপের ভেতরে বাটন দেখাবে না

  var deferred = null;
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = '📲 অ্যাপ ইনস্টল করুন';
  btn.style.cssText =
    'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:99999;' +
    'display:none;padding:13px 22px;border:0;border-radius:999px;background:#087c4b;color:#fff;' +
    'font:600 16px system-ui,"Noto Sans Bengali",sans-serif;box-shadow:0 8px 22px rgba(8,124,75,.4);cursor:pointer';
  document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(btn); });

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    btn.style.display = 'block';
  });

  btn.addEventListener('click', function () {
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.finally(function () { deferred = null; btn.style.display = 'none'; });
    } else {
      alert('ব্রাউজারের মেনু (⋮) থেকে "Add to Home screen" বা "Install app" চাপুন।');
    }
  });

  window.addEventListener('appinstalled', function () { btn.style.display = 'none'; });

  // iPhone/Safari-তে স্বয়ংক্রিয় ইনস্টল প্রম্পট নেই, তাই নির্দেশনা দেখাই
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  if (ios) {
    document.addEventListener('DOMContentLoaded', function () {
      btn.style.display = 'block';
      btn.onclick = function () {
        alert('Safari-তে Share (⬆️) চাপুন, তারপর "Add to Home Screen" চাপুন।');
      };
    });
  }
})();
