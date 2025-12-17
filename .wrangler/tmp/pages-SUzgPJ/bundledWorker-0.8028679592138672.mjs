var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name((_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name((_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name((_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name((_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var se = Object.create;
var U = Object.defineProperty;
var ne = Object.getOwnPropertyDescriptor;
var oe = Object.getOwnPropertyNames;
var ae = Object.getPrototypeOf;
var ce = Object.prototype.hasOwnProperty;
var C = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "C");
var V = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var ie = /* @__PURE__ */ __name((e, t, s, r) => {
  if (t && typeof t == "object" || typeof t == "function") for (let o of oe(t)) !ce.call(e, o) && o !== s && U(e, o, { get: /* @__PURE__ */ __name(() => t[o], "get"), enumerable: !(r = ne(t, o)) || r.enumerable });
  return e;
}, "ie");
var q = /* @__PURE__ */ __name((e, t, s) => (s = e != null ? se(ae(e)) : {}, ie(t || !e || !e.__esModule ? U(s, "default", { value: e, enumerable: true }) : s, e)), "q");
var g;
var _ = C(() => {
  g = { collectedLocales: [] };
});
var d;
var l = C(() => {
  d = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/(?<path>.+?)(?:/)?$", dest: "/$path.segments/$segmentPath.segment.rsc", has: [{ type: "header", key: "rsc", value: "1" }, { type: "header", key: "next-router-prefetch", value: "1" }, { type: "header", key: "next-router-segment-prefetch", value: "/(?<segmentPath>.+)" }], continue: true, override: true }, { src: "^/?$", dest: "/index.segments/$segmentPath.segment.rsc", has: [{ type: "header", key: "rsc", value: "1" }, { type: "header", key: "next-router-prefetch", value: "1" }, { type: "header", key: "next-router-segment-prefetch", value: "/(?<segmentPath>.+)" }], continue: true, override: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/_next/data/(.*)$", dest: "/_next/data/$1", check: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }, { src: "^/(?<path>.+)(?<rscSuffix>\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/$path.rsc", check: true }], rewrite: [{ src: "^/_next/data/(.*)$", dest: "/404", status: 404 }, { src: "^/(?<path>.+)(?<rscSuffix>\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/$path.rsc", check: true, override: true }, { src: "^/games/(?<nxtPid>[^/]+?)(?<rscSuffix>\\.rsc|\\.prefetch\\.rsc|\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/games/[id]$rscSuffix?nxtPid=$nxtPid", check: true, override: true }, { src: "^/games/(?<nxtPid>[^/]+?)(?:/)?$", dest: "/games/[id]?nxtPid=$nxtPid", check: true, override: true }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|lL8sWOhrMBBjqt5H169Uy)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404 }, { src: "^/.*$", dest: "/500", status: 500 }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 32, 48, 64, 96, 128, 256, 384], qualities: [75], remotePatterns: [], localPatterns: [{ pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$", search: "" }], minimumCacheTTL: 14400, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "404.segments/_tree.segment.rsc.json": { path: "404.segments/_tree.segment.rsc", contentType: "application/json" }, "500.rsc.json": { path: "500.rsc", contentType: "application/json" }, "500.segments/_tree.segment.rsc.json": { path: "500.segments/_tree.segment.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { version: "16.0.10" }, crons: [] };
});
var h;
var p = C(() => {
  h = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/404.segments/_tree.segment.rsc.json": { type: "override", path: "/404.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500.rsc.json": { type: "override", path: "/500.rsc.json", headers: { "content-type": "application/json" } }, "/500.segments/_tree.segment.rsc.json": { type: "override", path: "/500.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/chunks/004664ab69f3df0e.css": { type: "static" }, "/_next/static/chunks/07e23ab7712f47a5.css": { type: "static" }, "/_next/static/chunks/0f0d24f427fcb963.js": { type: "static" }, "/_next/static/chunks/112f346e31f991df.js": { type: "static" }, "/_next/static/chunks/16d408357a30c502.js": { type: "static" }, "/_next/static/chunks/19005486872b2d48.css": { type: "static" }, "/_next/static/chunks/247eb132b7f7b574.js": { type: "static" }, "/_next/static/chunks/460fe9a69adc6fe1.js": { type: "static" }, "/_next/static/chunks/468a34f6fa3ee916.js": { type: "static" }, "/_next/static/chunks/47c7e071927339c9.js": { type: "static" }, "/_next/static/chunks/4b4329eb5a8f88d8.css": { type: "static" }, "/_next/static/chunks/5b3efda454ed19ee.css": { type: "static" }, "/_next/static/chunks/5d470989cd351d01.css": { type: "static" }, "/_next/static/chunks/72d30b6b11abd392.js": { type: "static" }, "/_next/static/chunks/7983885bf0ba2d84.js": { type: "static" }, "/_next/static/chunks/8008d994f91f0fb6.js": { type: "static" }, "/_next/static/chunks/9a3a6d4f5e693ebe.css": { type: "static" }, "/_next/static/chunks/a6dad97d9634a72d.js": { type: "static" }, "/_next/static/chunks/a837faebd71169a2.css": { type: "static" }, "/_next/static/chunks/aad523b7b4e11cbc.js": { type: "static" }, "/_next/static/chunks/bb958102e83e6a04.js": { type: "static" }, "/_next/static/chunks/bbf39c168ecb2301.js": { type: "static" }, "/_next/static/chunks/c156163fc8aef560.css": { type: "static" }, "/_next/static/chunks/c6d7bb9435d993f0.js": { type: "static" }, "/_next/static/chunks/d0e2c53728499b72.js": { type: "static" }, "/_next/static/chunks/d7bfcda23440eea0.css": { type: "static" }, "/_next/static/chunks/e4fac297a583dc5a.js": { type: "static" }, "/_next/static/chunks/e5a32dc6c98b1c24.js": { type: "static" }, "/_next/static/chunks/e87dca3e5b7ae532.js": { type: "static" }, "/_next/static/chunks/efe66d5727aa3463.js": { type: "static" }, "/_next/static/chunks/f063c33fe3aa439e.js": { type: "static" }, "/_next/static/chunks/ff1a16fafef87110.js": { type: "static" }, "/_next/static/chunks/turbopack-471acdb290160135.js": { type: "static" }, "/_next/static/lL8sWOhrMBBjqt5H169Uy/_buildManifest.js": { type: "static" }, "/_next/static/lL8sWOhrMBBjqt5H169Uy/_clientMiddlewareManifest.json": { type: "static" }, "/_next/static/lL8sWOhrMBBjqt5H169Uy/_ssgManifest.js": { type: "static" }, "/_next/static/media/favicon.0b3bf435.ico": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/file.svg": { type: "static" }, "/globe.svg": { type: "static" }, "/logo.png": { type: "static" }, "/logo.png:Zone.Identifier": { type: "static" }, "/next.svg": { type: "static" }, "/vercel.svg": { type: "static" }, "/window.svg": { type: "static" }, "/games/[id]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/games/[id].func.js" }, "/games/[id].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/games/[id].func.js" }, "/index": { type: "function", entrypoint: "__next-on-pages-dist__/functions/index.func.js" }, "/": { type: "function", entrypoint: "__next-on-pages-dist__/functions/index.func.js" }, "/index.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/index.func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/404.segments/_tree.segment.rsc": { type: "override", path: "/404.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/500.rsc": { type: "override", path: "/500.rsc.json", headers: { "content-type": "application/json" } }, "/500.segments/_tree.segment.rsc": { type: "override", path: "/500.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/_global-error.html": { type: "override", path: "/_global-error.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_global-error": { type: "override", path: "/_global-error.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_global-error.rsc": { type: "override", path: "/_global-error.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/_global-error.segments/__PAGE__.segment.rsc": { type: "override", path: "/_global-error.segments/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_full.segment.rsc": { type: "override", path: "/_global-error.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_head.segment.rsc": { type: "override", path: "/_global-error.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_index.segment.rsc": { type: "override", path: "/_global-error.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_tree.segment.rsc": { type: "override", path: "/_global-error.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.html": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found.rsc": { type: "override", path: "/_not-found.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/_not-found.segments/_full.segment.rsc": { type: "override", path: "/_not-found.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_head.segment.rsc": { type: "override", path: "/_not-found.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_index.segment.rsc": { type: "override", path: "/_not-found.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_not-found/__PAGE__.segment.rsc": { type: "override", path: "/_not-found.segments/_not-found/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_not-found.segment.rsc": { type: "override", path: "/_not-found.segments/_not-found.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_tree.segment.rsc": { type: "override", path: "/_not-found.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/favicon.ico": { type: "override", path: "/favicon.ico", headers: { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/login.html": { type: "override", path: "/login.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/login": { type: "override", path: "/login.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/login.rsc": { type: "override", path: "/login.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/login.segments/_full.segment.rsc": { type: "override", path: "/login.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/login.segments/_head.segment.rsc": { type: "override", path: "/login.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/login.segments/_index.segment.rsc": { type: "override", path: "/login.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/login.segments/_tree.segment.rsc": { type: "override", path: "/login.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/login.segments/login/__PAGE__.segment.rsc": { type: "override", path: "/login.segments/login/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/login.segments/login.segment.rsc": { type: "override", path: "/login.segments/login.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/login/layout,_N_T_/login/page,_N_T_/login", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/post.html": { type: "override", path: "/post.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/post/layout,_N_T_/post/page,_N_T_/post", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/post": { type: "override", path: "/post.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/post/layout,_N_T_/post/page,_N_T_/post", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/post.rsc": { type: "override", path: "/post.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/post/layout,_N_T_/post/page,_N_T_/post", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/post.segments/_full.segment.rsc": { type: "override", path: "/post.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/post/layout,_N_T_/post/page,_N_T_/post", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/post.segments/_head.segment.rsc": { type: "override", path: "/post.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/post/layout,_N_T_/post/page,_N_T_/post", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/post.segments/_index.segment.rsc": { type: "override", path: "/post.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/post/layout,_N_T_/post/page,_N_T_/post", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/post.segments/_tree.segment.rsc": { type: "override", path: "/post.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/post/layout,_N_T_/post/page,_N_T_/post", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/post.segments/post/__PAGE__.segment.rsc": { type: "override", path: "/post.segments/post/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/post/layout,_N_T_/post/page,_N_T_/post", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/post.segments/post.segment.rsc": { type: "override", path: "/post.segments/post.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/post/layout,_N_T_/post/page,_N_T_/post", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/profile.html": { type: "override", path: "/profile.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/profile/layout,_N_T_/profile/page,_N_T_/profile", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/profile": { type: "override", path: "/profile.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/profile/layout,_N_T_/profile/page,_N_T_/profile", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/profile.rsc": { type: "override", path: "/profile.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/profile/layout,_N_T_/profile/page,_N_T_/profile", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/profile.segments/_full.segment.rsc": { type: "override", path: "/profile.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/profile/layout,_N_T_/profile/page,_N_T_/profile", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/profile.segments/_head.segment.rsc": { type: "override", path: "/profile.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/profile/layout,_N_T_/profile/page,_N_T_/profile", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/profile.segments/_index.segment.rsc": { type: "override", path: "/profile.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/profile/layout,_N_T_/profile/page,_N_T_/profile", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/profile.segments/_tree.segment.rsc": { type: "override", path: "/profile.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/profile/layout,_N_T_/profile/page,_N_T_/profile", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/profile.segments/profile/__PAGE__.segment.rsc": { type: "override", path: "/profile.segments/profile/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/profile/layout,_N_T_/profile/page,_N_T_/profile", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/profile.segments/profile.segment.rsc": { type: "override", path: "/profile.segments/profile.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/profile/layout,_N_T_/profile/page,_N_T_/profile", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/random.html": { type: "override", path: "/random.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/random/layout,_N_T_/random/page,_N_T_/random", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/random": { type: "override", path: "/random.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/random/layout,_N_T_/random/page,_N_T_/random", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/random.rsc": { type: "override", path: "/random.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/random/layout,_N_T_/random/page,_N_T_/random", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/random.segments/_full.segment.rsc": { type: "override", path: "/random.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/random/layout,_N_T_/random/page,_N_T_/random", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/random.segments/_head.segment.rsc": { type: "override", path: "/random.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/random/layout,_N_T_/random/page,_N_T_/random", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/random.segments/_index.segment.rsc": { type: "override", path: "/random.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/random/layout,_N_T_/random/page,_N_T_/random", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/random.segments/_tree.segment.rsc": { type: "override", path: "/random.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/random/layout,_N_T_/random/page,_N_T_/random", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/random.segments/random/__PAGE__.segment.rsc": { type: "override", path: "/random.segments/random/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/random/layout,_N_T_/random/page,_N_T_/random", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/random.segments/random.segment.rsc": { type: "override", path: "/random.segments/random.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/random/layout,_N_T_/random/page,_N_T_/random", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/register.html": { type: "override", path: "/register.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/register/layout,_N_T_/register/page,_N_T_/register", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/register": { type: "override", path: "/register.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/register/layout,_N_T_/register/page,_N_T_/register", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/register.rsc": { type: "override", path: "/register.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/register/layout,_N_T_/register/page,_N_T_/register", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/register.segments/_full.segment.rsc": { type: "override", path: "/register.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/register/layout,_N_T_/register/page,_N_T_/register", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/register.segments/_head.segment.rsc": { type: "override", path: "/register.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/register/layout,_N_T_/register/page,_N_T_/register", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/register.segments/_index.segment.rsc": { type: "override", path: "/register.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/register/layout,_N_T_/register/page,_N_T_/register", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/register.segments/_tree.segment.rsc": { type: "override", path: "/register.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/register/layout,_N_T_/register/page,_N_T_/register", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/register.segments/register/__PAGE__.segment.rsc": { type: "override", path: "/register.segments/register/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/register/layout,_N_T_/register/page,_N_T_/register", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/register.segments/register.segment.rsc": { type: "override", path: "/register.segments/register.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/register/layout,_N_T_/register/page,_N_T_/register", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/robots.txt": { type: "override", path: "/robots.txt", headers: { "cache-control": "public, max-age=0, must-revalidate", "content-type": "text/plain", "x-next-cache-tags": "_N_T_/layout,_N_T_/robots.txt/layout,_N_T_/robots.txt/route,_N_T_/robots.txt", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/sitemap.xml": { type: "override", path: "/sitemap.xml", headers: { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/xml", "x-next-cache-tags": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/tools/cards.html": { type: "override", path: "/tools/cards.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/tools/cards": { type: "override", path: "/tools/cards.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/tools/cards.rsc": { type: "override", path: "/tools/cards.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/tools/cards.segments/_full.segment.rsc": { type: "override", path: "/tools/cards.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/cards.segments/_head.segment.rsc": { type: "override", path: "/tools/cards.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/cards.segments/_index.segment.rsc": { type: "override", path: "/tools/cards.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/cards.segments/_tree.segment.rsc": { type: "override", path: "/tools/cards.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/cards.segments/tools/cards/__PAGE__.segment.rsc": { type: "override", path: "/tools/cards.segments/tools/cards/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/cards.segments/tools/cards.segment.rsc": { type: "override", path: "/tools/cards.segments/tools/cards.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/cards.segments/tools.segment.rsc": { type: "override", path: "/tools/cards.segments/tools.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/cards/layout,_N_T_/tools/cards/page,_N_T_/tools/cards", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/dice.html": { type: "override", path: "/tools/dice.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/tools/dice": { type: "override", path: "/tools/dice.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/tools/dice.rsc": { type: "override", path: "/tools/dice.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/tools/dice.segments/_full.segment.rsc": { type: "override", path: "/tools/dice.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/dice.segments/_head.segment.rsc": { type: "override", path: "/tools/dice.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/dice.segments/_index.segment.rsc": { type: "override", path: "/tools/dice.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/dice.segments/_tree.segment.rsc": { type: "override", path: "/tools/dice.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/dice.segments/tools/dice/__PAGE__.segment.rsc": { type: "override", path: "/tools/dice.segments/tools/dice/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/dice.segments/tools/dice.segment.rsc": { type: "override", path: "/tools/dice.segments/tools/dice.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/dice.segments/tools.segment.rsc": { type: "override", path: "/tools/dice.segments/tools.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/dice/layout,_N_T_/tools/dice/page,_N_T_/tools/dice", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/kings.html": { type: "override", path: "/tools/kings.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/tools/kings": { type: "override", path: "/tools/kings.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/tools/kings.rsc": { type: "override", path: "/tools/kings.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/tools/kings.segments/_full.segment.rsc": { type: "override", path: "/tools/kings.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/kings.segments/_head.segment.rsc": { type: "override", path: "/tools/kings.segments/_head.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/kings.segments/_index.segment.rsc": { type: "override", path: "/tools/kings.segments/_index.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/kings.segments/_tree.segment.rsc": { type: "override", path: "/tools/kings.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/kings.segments/tools/kings/__PAGE__.segment.rsc": { type: "override", path: "/tools/kings.segments/tools/kings/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/kings.segments/tools/kings.segment.rsc": { type: "override", path: "/tools/kings.segments/tools/kings.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/tools/kings.segments/tools.segment.rsc": { type: "override", path: "/tools/kings.segments/tools.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/tools/layout,_N_T_/tools/kings/layout,_N_T_/tools/kings/page,_N_T_/tools/kings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } } };
});
var F = V((ze, $) => {
  "use strict";
  _();
  l();
  p();
  function T(e, t) {
    e = String(e || "").trim();
    let s = e, r, o = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      r = e[0];
      let c = e.lastIndexOf(r);
      o += e.substring(c + 1), e = e.substring(1, c);
    }
    let n = 0;
    return e = pe(e, (c) => {
      if (/^\(\?[P<']/.test(c)) {
        let i = /^\(\?P?[<']([^>']+)[>']/.exec(c);
        if (!i) throw new Error(`Failed to extract named captures from ${JSON.stringify(c)}`);
        let u = c.substring(i[0].length, c.length - 1);
        return t && (t[n] = i[1]), n++, `(${u})`;
      }
      return c.substring(0, 3) === "(?:" || n++, c;
    }), e = e.replace(/\[:([^:]+):\]/g, (c, i) => T.characterClasses[i] || c), new T.PCRE(e, o, s, o, r);
  }
  __name(T, "T");
  function pe(e, t) {
    let s = 0, r = 0, o = false;
    for (let a = 0; a < e.length; a++) {
      let n = e[a];
      if (o) {
        o = false;
        continue;
      }
      switch (n) {
        case "(":
          r === 0 && (s = a), r++;
          break;
        case ")":
          if (r > 0 && (r--, r === 0)) {
            let c = a + 1, i = s === 0 ? "" : e.substring(0, s), u = e.substring(c), x = String(t(e.substring(s, c)));
            e = i + x + u, a = s;
          }
          break;
        case "\\":
          o = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(pe, "pe");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      constructor(r, o, a, n, c) {
        super(r, o), this.pcrePattern = a, this.pcreFlags = n, this.delimiter = c;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(T || (T = {}));
  T.prototype = T.PCRE.prototype;
  $.exports = T;
});
var Q = V((H) => {
  "use strict";
  _();
  l();
  p();
  H.parse = je;
  H.serialize = be;
  var ve = Object.prototype.toString, S = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function je(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var s = {}, r = t || {}, o = r.decode || we, a = 0; a < e.length; ) {
      var n = e.indexOf("=", a);
      if (n === -1) break;
      var c = e.indexOf(";", a);
      if (c === -1) c = e.length;
      else if (c < n) {
        a = e.lastIndexOf(";", n - 1) + 1;
        continue;
      }
      var i = e.slice(a, n).trim();
      if (s[i] === void 0) {
        var u = e.slice(n + 1, c).trim();
        u.charCodeAt(0) === 34 && (u = u.slice(1, -1)), s[i] = ke(u, o);
      }
      a = c + 1;
    }
    return s;
  }
  __name(je, "je");
  function be(e, t, s) {
    var r = s || {}, o = r.encode || Re;
    if (typeof o != "function") throw new TypeError("option encode is invalid");
    if (!S.test(e)) throw new TypeError("argument name is invalid");
    var a = o(t);
    if (a && !S.test(a)) throw new TypeError("argument val is invalid");
    var n = e + "=" + a;
    if (r.maxAge != null) {
      var c = r.maxAge - 0;
      if (isNaN(c) || !isFinite(c)) throw new TypeError("option maxAge is invalid");
      n += "; Max-Age=" + Math.floor(c);
    }
    if (r.domain) {
      if (!S.test(r.domain)) throw new TypeError("option domain is invalid");
      n += "; Domain=" + r.domain;
    }
    if (r.path) {
      if (!S.test(r.path)) throw new TypeError("option path is invalid");
      n += "; Path=" + r.path;
    }
    if (r.expires) {
      var i = r.expires;
      if (!Pe(i) || isNaN(i.valueOf())) throw new TypeError("option expires is invalid");
      n += "; Expires=" + i.toUTCString();
    }
    if (r.httpOnly && (n += "; HttpOnly"), r.secure && (n += "; Secure"), r.priority) {
      var u = typeof r.priority == "string" ? r.priority.toLowerCase() : r.priority;
      switch (u) {
        case "low":
          n += "; Priority=Low";
          break;
        case "medium":
          n += "; Priority=Medium";
          break;
        case "high":
          n += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (r.sameSite) {
      var x = typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite;
      switch (x) {
        case true:
          n += "; SameSite=Strict";
          break;
        case "lax":
          n += "; SameSite=Lax";
          break;
        case "strict":
          n += "; SameSite=Strict";
          break;
        case "none":
          n += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return n;
  }
  __name(be, "be");
  function we(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(we, "we");
  function Re(e) {
    return encodeURIComponent(e);
  }
  __name(Re, "Re");
  function Pe(e) {
    return ve.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(Pe, "Pe");
  function ke(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(ke, "ke");
});
_();
l();
p();
_();
l();
p();
_();
l();
p();
var v = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
_();
l();
p();
_();
l();
p();
_();
l();
p();
_();
l();
p();
var D = q(F());
function R(e, t, s) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let r = s ? "" : "i", o = [];
  return { match: (0, D.default)(`%${e}%${r}`, o).exec(t), captureGroupKeys: o };
}
__name(R, "R");
function j(e, t, s, { namedOnly: r } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (o, a) => {
    let n = s.indexOf(a);
    return r && n === -1 ? o : (n === -1 ? t[parseInt(a, 10)] : t[n + 1]) || "";
  });
}
__name(j, "j");
function A(e, { url: t, cookies: s, headers: r, routeDest: o }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? M(e.value, r.get(e.key), o) : { valid: r.has(e.key) };
    case "cookie": {
      let a = s[e.key];
      return a && e.value !== void 0 ? M(e.value, a, o) : { valid: a !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? M(e.value, t.searchParams.get(e.key), o) : { valid: t.searchParams.has(e.key) };
  }
}
__name(A, "A");
function M(e, t, s) {
  let { match: r, captureGroupKeys: o } = R(e, t);
  return s && r && o.length ? { valid: !!r, newRouteDest: j(s, r, o, { namedOnly: true }) } : { valid: !!r };
}
__name(M, "M");
_();
l();
p();
function G(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", v), new Request(e, { headers: t });
}
__name(G, "G");
_();
l();
p();
function f(e, t, s) {
  let r = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [o, a] of r) {
    let n = o.toLowerCase(), c = s?.match ? j(a, s.match, s.captureGroupKeys) : a;
    n === "set-cookie" ? e.append(n, c) : e.set(n, c);
  }
}
__name(f, "f");
function b(e) {
  return /^https?:\/\//.test(e);
}
__name(b, "b");
function y(e, t) {
  for (let [s, r] of t.entries()) {
    let o = /^nxtP(.+)$/.exec(s), a = /^nxtI(.+)$/.exec(s);
    o?.[1] ? (e.set(s, r), e.set(o[1], r)) : a?.[1] ? e.set(a[1], r.replace(/(\(\.+\))+/, "")) : (!e.has(s) || !!r && !e.getAll(s).includes(r)) && e.append(s, r);
  }
}
__name(y, "y");
function I(e, t) {
  let s = new URL(t, e.url);
  return y(s.searchParams, new URL(e.url).searchParams), s.pathname = s.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(s, e);
}
__name(I, "I");
function w(e) {
  return new Response(e.body, e);
}
__name(w, "w");
function L(e) {
  return e.split(",").map((t) => {
    let [s, r] = t.split(";"), o = parseFloat((r ?? "q=1").replace(/q *= */gi, ""));
    return [s.trim(), isNaN(o) ? 1 : o];
  }).sort((t, s) => s[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(L, "L");
_();
l();
p();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
async function P(e, { request: t, assetsFetcher: s, ctx: r }, { path: o, searchParams: a }) {
  let n, c = new URL(t.url);
  y(c.searchParams, a);
  let i = new Request(c, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let u = await import(e.entrypoint);
        try {
          n = await u.default(i, r);
        } catch (x) {
          let m = x;
          throw m.name === "TypeError" && m.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : x;
        }
        break;
      }
      case "override": {
        n = w(await s.fetch(I(i, e.path ?? o))), e.headers && f(n.headers, e.headers);
        break;
      }
      case "static": {
        n = await s.fetch(I(i, o));
        break;
      }
      default:
        n = new Response("Not Found", { status: 404 });
    }
  } catch (u) {
    return console.error(u), new Response("Internal Server Error", { status: 500 });
  }
  return w(n);
}
__name(P, "P");
function B(e, t) {
  let s = "^//?(?:", r = ")/(.*)$";
  return !e.startsWith(s) || !e.endsWith(r) ? false : e.slice(s.length, -r.length).split("|").every((a) => t.has(a));
}
__name(B, "B");
_();
l();
p();
function ue(e, { protocol: t, hostname: s, port: r, pathname: o }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(s).test(e.hostname) || r && !new RegExp(r).test(e.port) || o && !new RegExp(o).test(e.pathname));
}
__name(ue, "ue");
function xe(e, t) {
  if (e.method !== "GET") return;
  let { origin: s, searchParams: r } = new URL(e.url), o = r.get("url"), a = Number.parseInt(r.get("w") ?? "", 10), n = Number.parseInt(r.get("q") ?? "75", 10);
  if (!o || Number.isNaN(a) || Number.isNaN(n) || !t?.sizes?.includes(a) || n < 0 || n > 100) return;
  let c = new URL(o, s);
  if (c.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let i = o.startsWith("//"), u = o.startsWith("/") && !i;
  if (!u && !t?.domains?.includes(c.hostname) && !t?.remotePatterns?.find((N) => ue(c, N))) return;
  let x = e.headers.get("Accept") ?? "", m = t?.formats?.find((N) => x.includes(N))?.replace("image/", "");
  return { isRelative: u, imageUrl: c, options: { width: a, quality: n, format: m } };
}
__name(xe, "xe");
function de(e, t, s) {
  let r = new Headers();
  if (s?.contentSecurityPolicy && r.set("Content-Security-Policy", s.contentSecurityPolicy), s?.contentDispositionType) {
    let a = t.pathname.split("/").pop(), n = a ? `${s.contentDispositionType}; filename="${a}"` : s.contentDispositionType;
    r.set("Content-Disposition", n);
  }
  e.headers.has("Cache-Control") || r.set("Cache-Control", `public, max-age=${s?.minimumCacheTTL ?? 60}`);
  let o = w(e);
  return f(o.headers, r), o;
}
__name(de, "de");
async function W(e, { buildOutput: t, assetsFetcher: s, imagesConfig: r }) {
  let o = xe(e, r);
  if (!o) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: a, imageUrl: n } = o, i = await (a && n.pathname in t ? s.fetch.bind(s) : fetch)(n);
  return de(i, n, r);
}
__name(W, "W");
_();
l();
p();
_();
l();
p();
_();
l();
p();
async function k(e) {
  return import(e);
}
__name(k, "k");
var he = "x-vercel-cache-tags";
var ge = "x-next-cache-soft-tags";
var me = Symbol.for("__cloudflare-request-context__");
async function J(e) {
  let t = `https://${v}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let s = new URL(e.url), r = await fe();
    if (s.pathname === "/v1/suspense-cache/revalidate") {
      let a = s.searchParams.get("tags")?.split(",") ?? [];
      for (let n of a) await r.revalidateTag(n);
      return new Response(null, { status: 200 });
    }
    let o = s.pathname.replace("/v1/suspense-cache/", "");
    if (!o.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let a = z(e, ge), n = await r.get(o, { softTags: a });
        return n ? new Response(JSON.stringify(n.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (n.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let a = globalThis[me], n = /* @__PURE__ */ __name(async () => {
          let c = await e.json();
          c.data.tags === void 0 && (c.tags ??= z(e, he) ?? []), await r.set(o, c);
        }, "n");
        return a ? a.ctx.waitUntil(n()) : await n(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (s) {
    return console.error(s), new Response("Error handling cache request", { status: 500 });
  }
}
__name(J, "J");
async function fe() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? K("kv") : K("cache-api");
}
__name(fe, "fe");
async function K(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, s = await k(t);
  return new s.default();
}
__name(K, "K");
function z(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(z, "z");
function X() {
  globalThis[Z] || (ye(), globalThis[Z] = true);
}
__name(X, "X");
function ye() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let s = new Request(...t), r = await Te(s);
    return r || (r = await J(s), r) ? r : (Ne(s), e(s));
  };
}
__name(ye, "ye");
async function Te(e) {
  if (e.url.startsWith("blob:")) try {
    let s = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, r = (await k(s)).default, o = { async arrayBuffer() {
      return r;
    }, get body() {
      return new ReadableStream({ start(a) {
        let n = Buffer.from(r);
        a.enqueue(n), a.close();
      } });
    }, async text() {
      return Buffer.from(r).toString();
    }, async json() {
      let a = Buffer.from(r);
      return JSON.stringify(a.toString());
    }, async blob() {
      return new Blob(r);
    } };
    return o.clone = () => ({ ...o }), o;
  } catch {
  }
  return null;
}
__name(Te, "Te");
function Ne(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(Ne, "Ne");
var Z = Symbol.for("next-on-pages fetch patch");
_();
l();
p();
var Y = q(Q());
var E = class {
  static {
    __name(this, "E");
  }
  constructor(t, s, r, o, a) {
    this.routes = t;
    this.output = s;
    this.reqCtx = r;
    this.url = new URL(r.request.url), this.cookies = (0, Y.parse)(r.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), y(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = a?.find((n) => n.domain === this.url.hostname), this.locales = new Set(o.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: s, checkIntercept: r }) {
    let o = R(t.src, this.path, t.caseSensitive);
    if (!o.match || t.methods && !t.methods.map((n) => n.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let a = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((n) => {
      let c = A(n, a);
      return c.newRouteDest && (a.routeDest = c.newRouteDest), !c.valid;
    }) && !t.missing?.find((n) => A(n, a).valid) && !(s && t.status !== this.status)) {
      if (r && t.dest) {
        let n = /\/(\(\.+\))+/, c = n.test(t.dest), i = n.test(this.path);
        if (c && !i) return;
      }
      return { routeMatch: o, routeDest: a.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let s = "x-middleware-override-headers", r = t.headers.get(s);
    if (r) {
      let i = new Set(r.split(",").map((u) => u.trim()));
      for (let u of i.keys()) {
        let x = `x-middleware-request-${u}`, m = t.headers.get(x);
        this.reqCtx.request.headers.get(u) !== m && (m ? this.reqCtx.request.headers.set(u, m) : this.reqCtx.request.headers.delete(u)), t.headers.delete(x);
      }
      t.headers.delete(s);
    }
    let o = "x-middleware-rewrite", a = t.headers.get(o);
    if (a) {
      let i = new URL(a, this.url), u = this.url.hostname !== i.hostname;
      this.path = u ? `${i}` : i.pathname, y(this.searchParams, i.searchParams), t.headers.delete(o);
    }
    let n = "x-middleware-next";
    t.headers.get(n) ? t.headers.delete(n) : !a && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), f(this.reqCtx.request.headers, t.headers), f(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let s = t && this.output[t];
    if (!s || s.type !== "middleware") return this.status = 500, false;
    let r = await P(s, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), r.status === 500 ? (this.status = r.status, false) : (this.processMiddlewareResp(r), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, s, r) {
    !t.headers || (f(this.headers.normal, t.headers, { match: s, captureGroupKeys: r }), t.important && f(this.headers.important, t.headers, { match: s, captureGroupKeys: r }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, s, r) {
    if (!t.dest) return this.path;
    let o = this.path, a = t.dest;
    this.wildcardMatch && /\$wildcard/.test(a) && (a = a.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = j(a, s, r);
    let n = /\/index\.rsc$/i.test(this.path), c = /^\/(?:index)?$/i.test(o), i = /^\/__index\.prefetch\.rsc$/i.test(o);
    n && !c && !i && (this.path = o);
    let u = /\.rsc$/i.test(this.path), x = /\.prefetch\.rsc$/i.test(this.path), m = this.path in this.output;
    u && !x && !m && (this.path = this.path.replace(/\.rsc/i, ""));
    let N = new URL(this.path, this.url);
    return y(this.searchParams, N.searchParams), b(this.path) || (this.path = N.pathname), o;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: r, cookie: o } } = t, a = o && this.cookies[o], n = L(a ?? ""), c = L(this.reqCtx.request.headers.get("accept-language") ?? ""), x = [...n, ...c].map((m) => r[m]).filter(Boolean)[0];
    if (x) {
      !this.path.startsWith(x) && (this.headers.normal.set("location", x), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, s) {
    return !this.locales || s !== "miss" ? t : B(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, s) {
    let r = this.getLocaleFriendlyRoute(s, t), { routeMatch: o, routeDest: a } = this.checkRouteMatch(r, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, n = { ...r, dest: a };
    if (!o?.match || n.middlewarePath && this.middlewareInvoked.includes(n.middlewarePath)) return "skip";
    let { match: c, captureGroupKeys: i } = o;
    if (this.applyRouteOverrides(n), this.applyLocaleRedirects(n), !await this.runRouteMiddleware(n.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(n, c, i), this.applyRouteStatus(n);
    let x = this.applyRouteDest(n, c, i);
    if (n.check && !b(this.path)) if (x === this.path) {
      if (t !== "miss") return this.checkPhase(O(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !n.continue || n.status && n.status >= 300 && n.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let s = true;
    for (let a of this.routes[t]) {
      let n = await this.checkRoute(t, a);
      if (n === "error") return "error";
      if (n === "done") {
        s = false;
        break;
      }
    }
    if (t === "hit" || b(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let a of this.locales) {
      let n = new RegExp(`/${a}(/.*)`), i = this.path.match(n)?.[1];
      if (i && i in this.output) {
        this.path = i;
        break;
      }
    }
    let r = this.path in this.output;
    if (!r && this.path.endsWith("/")) {
      let a = this.path.replace(/\/$/, "");
      r = a in this.output, r && (this.path = a);
    }
    if (t === "miss" && !r) {
      let a = !this.status || this.status < 400;
      this.status = a ? 404 : this.status;
    }
    let o = "miss";
    return r || t === "miss" || t === "error" ? o = "hit" : s && (o = O(t)), this.checkPhase(o);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let s = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), s;
  }
};
async function ee(e, t, s, r) {
  let o = new E(t.routes, s, e, r, t.wildcard), a = await te(o);
  return Se(e, a, s);
}
__name(ee, "ee");
async function te(e, t = "none", s = false) {
  return await e.run(t) === "error" || !s && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
async function Se(e, { path: t = "/404", status: s, headers: r, searchParams: o, body: a }, n) {
  let c = r.normal.get("location");
  if (c) {
    if (c !== r.middlewareLocation) {
      let x = [...o.keys()].length ? `?${o.toString()}` : "";
      r.normal.set("location", `${c ?? "/"}${x}`);
    }
    return new Response(null, { status: s, headers: r.normal });
  }
  let i;
  if (a !== void 0) i = new Response(a, { status: s });
  else if (b(t)) {
    let x = new URL(t);
    y(x.searchParams, o), i = await fetch(x, e.request);
  } else i = await P(n[t], e, { path: t, status: s, headers: r, searchParams: o });
  let u = r.normal;
  return f(u, i.headers), f(u, r.important), i = new Response(i.body, { ...i, status: s || i.status, headers: u }), i;
}
__name(Se, "Se");
_();
l();
p();
function re() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ee };
}
__name(re, "re");
function Ee(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let s = Ce();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, s), s;
}
__name(Ee, "Ee");
function Ce() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name((t, s) => e.has(s) ? e.get(s) : Reflect.get(globalThis, s), "get"), set: /* @__PURE__ */ __name((t, s, r) => Me.has(s) ? Reflect.set(globalThis, s, r) : (e.set(s, r), true), "set") });
}
__name(Ce, "Ce");
var Me = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Ae = Object.defineProperty;
var Ie = /* @__PURE__ */ __name((...e) => {
  let t = e[0], s = e[1], r = "__import_unsupported";
  if (!(s === r && typeof t == "object" && t !== null && r in t)) return Ae(...e);
}, "Ie");
globalThis.Object.defineProperty = Ie;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var wr = { async fetch(e, t, s) {
  re(), X();
  let r = await __ALSes_PROMISE__;
  if (!r) {
    let n = new URL(e.url), c = await t.ASSETS.fetch(`${n.protocol}//${n.host}/cdn-cgi/errors/no-nodejs_compat.html`), i = c.ok ? c.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(i, { status: 503 });
  }
  let { envAsyncLocalStorage: o, requestContextAsyncLocalStorage: a } = r;
  return o.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: v }, async () => a.run({ env: t, ctx: s, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return W(e, { buildOutput: h, assetsFetcher: t.ASSETS, imagesConfig: d.images });
    let c = G(e);
    return ee({ request: c, ctx: s, assetsFetcher: t.ASSETS }, d, h, g);
  }));
} };
export {
  wr as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.8028679592138672.mjs.map
