const CACHE = "mapp-v1";

const ASSETS = [

"/",

"/index.html",

"/manifest.json",

"/icons/icon-192.png",

"/icons/icon-512.png",

"https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap",

"https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",

"https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"

];

self.addEventListener("install",(event)=>{

event.waitUntil(

caches.open(CACHE)

.then(cache=>cache.addAll(ASSETS))

);

self.skipWaiting();

});

self.addEventListener("activate",(event)=>{

event.waitUntil(

caches.keys().then(keys=>

Promise.all(

keys.map(key=>{

if(key!==CACHE){

return caches.delete(key);

}

})

)

)

);

self.clients.claim();

});

self.addEventListener("fetch",(event)=>{

event.respondWith(

caches.match(event.request)

.then(response=>{

return response || fetch(event.request);

})

);

});
