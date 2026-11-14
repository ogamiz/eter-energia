/* Version the shell per project path. GitHub Pages projects may share an origin. */
const prefix='eter-shell:'+self.registration.scope+':';
const cacheName=prefix+'1.4.2';
const files=['./index.html','./styles.css','./app.js','./energy.js','./sphere.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
const urls=new Set(files.map(file=>new URL(file,self.registration.scope).href));
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(files.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(n=>n.startsWith(prefix)&&n!==cacheName).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  const base=new URL(self.registration.scope);
  if(url.origin!==base.origin)return;
  url.search='';url.hash='';
  const home=url.href===base.href||url.href===new URL('index.html',base).href;
  if(!urls.has(url.href)&&!home)return;
  const key=home?new URL('index.html',base).href:url.href;
  event.respondWith(caches.open(cacheName).then(async cache=>(await cache.match(key))||fetch(event.request)));
});
