# ইনস্টল বাটন চালু করার নিয়ম

১. এই জিপের ৫টা ফাইল (`manifest.json`, `sw.js`, `install.js`, `icon-192.png`, `icon-512.png`) GitHub-এ `index.html`-এর পাশে আপলোড করুন।

২. `index.html`-এর `<head>` এর ভেতরে এই তিন লাইন বসান:

```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#087c4b">
<link rel="apple-touch-icon" href="icon-192.png">
```

৩. `index.html`-এর `</body>` এর ঠিক আগে এই লাইন বসান:

```html
<script src="install.js"></script>
```

৪. ২-৩ মিনিট পর সাইট খুলুন। Chrome-এ নিচে সবুজ "অ্যাপ ইনস্টল করুন" বাটন আসবে।
