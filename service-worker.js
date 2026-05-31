const CACHE_NAME = 'mebv-static-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/books.html',
  '/video.html',
  '/videos.html',
  '/python.html',
  '/vacancies.html',
  '/services.html',
  '/blog.html',
  '/about.html',
  '/contact.html',
  '/register.html',
  '/login.html',
  '/profile.html',
  '/admin.html',
  '/css/style.css',
  '/manifest.json',
  '/assets/LOGO.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }
      return fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('/index.html'));
    })
  );
});
