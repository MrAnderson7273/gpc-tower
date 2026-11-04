/* GPC Tower 1.7.0 service worker: same-origin only (never touches the live feed), network-first for the app so iPhone never runs a stale build. */
const C='gpc-tower-1.7.0';const F=['./','./index.html','./app.enc.json','./manifest.json','./apple-touch-icon.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;
 e.respondWith(fetch(r,{cache:'no-store'}).then(n=>{if(n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));}return n;}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./index.html'))));});
