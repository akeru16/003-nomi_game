var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");

// ../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
var unenvProcess = new Process({
  env: globalProcess.env,
  // `hrtime` is only available from workerd process v2
  hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  // Always implemented by workerd
  env,
  // Only implemented in workerd v2
  hrtime: hrtime3,
  // Always implemented by workerd
  nextTick
} = unenvProcess;
var {
  _channel,
  _disconnect,
  _events,
  _eventsCount,
  _handleQueue,
  _maxListeners,
  _pendingMessage,
  _send,
  assert,
  disconnect,
  mainModule
} = unenvProcess;
var {
  // @ts-expect-error `_debugEnd` is missing typings
  _debugEnd,
  // @ts-expect-error `_debugProcess` is missing typings
  _debugProcess,
  // @ts-expect-error `_exiting` is missing typings
  _exiting,
  // @ts-expect-error `_fatalException` is missing typings
  _fatalException,
  // @ts-expect-error `_getActiveHandles` is missing typings
  _getActiveHandles,
  // @ts-expect-error `_getActiveRequests` is missing typings
  _getActiveRequests,
  // @ts-expect-error `_kill` is missing typings
  _kill,
  // @ts-expect-error `_linkedBinding` is missing typings
  _linkedBinding,
  // @ts-expect-error `_preload_modules` is missing typings
  _preload_modules,
  // @ts-expect-error `_rawDebug` is missing typings
  _rawDebug,
  // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
  _startProfilerIdleNotifier,
  // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
  _stopProfilerIdleNotifier,
  // @ts-expect-error `_tickCallback` is missing typings
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  availableMemory,
  // @ts-expect-error `binding` is missing typings
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // @ts-expect-error `domain` is missing typings
  domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  // @ts-expect-error `initgroups` is missing typings
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // @ts-expect-error `moduleLoadList` is missing typings
  moduleLoadList,
  off,
  on,
  once,
  // @ts-expect-error `openStdin` is missing typings
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // @ts-expect-error `reallyExit` is missing typings
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = isWorkerdProcessV2 ? workerdProcess : unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// .wrangler/tmp/pages-SUzgPJ/bundledWorker-0.8028679592138672.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
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
        ownKeys: /* @__PURE__ */ __name2(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name2((_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name2((_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name2((_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name2(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name2((_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name2((_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name2((_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
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
var C = /* @__PURE__ */ __name2((e, t) => () => (e && (t = e(e = 0)), t), "C");
var V = /* @__PURE__ */ __name2((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var ie = /* @__PURE__ */ __name2((e, t, s, r) => {
  if (t && typeof t == "object" || typeof t == "function") for (let o of oe(t)) !ce.call(e, o) && o !== s && U(e, o, { get: /* @__PURE__ */ __name2(() => t[o], "get"), enumerable: !(r = ne(t, o)) || r.enumerable });
  return e;
}, "ie");
var q = /* @__PURE__ */ __name2((e, t, s) => (s = e != null ? se(ae(e)) : {}, ie(t || !e || !e.__esModule ? U(s, "default", { value: e, enumerable: true }) : s, e)), "q");
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
  __name2(T, "T");
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
  __name2(pe, "pe");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      static {
        __name2(this, "t");
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
  __name2(je, "je");
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
  __name2(be, "be");
  function we(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(we, "we");
  __name2(we, "we");
  function Re(e) {
    return encodeURIComponent(e);
  }
  __name(Re, "Re");
  __name2(Re, "Re");
  function Pe(e) {
    return ve.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(Pe, "Pe");
  __name2(Pe, "Pe");
  function ke(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(ke, "ke");
  __name2(ke, "ke");
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
__name2(R, "R");
function j(e, t, s, { namedOnly: r } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (o, a) => {
    let n = s.indexOf(a);
    return r && n === -1 ? o : (n === -1 ? t[parseInt(a, 10)] : t[n + 1]) || "";
  });
}
__name(j, "j");
__name2(j, "j");
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
__name2(A, "A");
function M(e, t, s) {
  let { match: r, captureGroupKeys: o } = R(e, t);
  return s && r && o.length ? { valid: !!r, newRouteDest: j(s, r, o, { namedOnly: true }) } : { valid: !!r };
}
__name(M, "M");
__name2(M, "M");
_();
l();
p();
function G(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", v), new Request(e, { headers: t });
}
__name(G, "G");
__name2(G, "G");
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
__name2(f, "f");
function b(e) {
  return /^https?:\/\//.test(e);
}
__name(b, "b");
__name2(b, "b");
function y(e, t) {
  for (let [s, r] of t.entries()) {
    let o = /^nxtP(.+)$/.exec(s), a = /^nxtI(.+)$/.exec(s);
    o?.[1] ? (e.set(s, r), e.set(o[1], r)) : a?.[1] ? e.set(a[1], r.replace(/(\(\.+\))+/, "")) : (!e.has(s) || !!r && !e.getAll(s).includes(r)) && e.append(s, r);
  }
}
__name(y, "y");
__name2(y, "y");
function I(e, t) {
  let s = new URL(t, e.url);
  return y(s.searchParams, new URL(e.url).searchParams), s.pathname = s.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(s, e);
}
__name(I, "I");
__name2(I, "I");
function w(e) {
  return new Response(e.body, e);
}
__name(w, "w");
__name2(w, "w");
function L(e) {
  return e.split(",").map((t) => {
    let [s, r] = t.split(";"), o = parseFloat((r ?? "q=1").replace(/q *= */gi, ""));
    return [s.trim(), isNaN(o) ? 1 : o];
  }).sort((t, s) => s[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(L, "L");
__name2(L, "L");
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
__name2(O, "O");
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
__name2(P, "P");
function B(e, t) {
  let s = "^//?(?:", r = ")/(.*)$";
  return !e.startsWith(s) || !e.endsWith(r) ? false : e.slice(s.length, -r.length).split("|").every((a) => t.has(a));
}
__name(B, "B");
__name2(B, "B");
_();
l();
p();
function ue(e, { protocol: t, hostname: s, port: r, pathname: o }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(s).test(e.hostname) || r && !new RegExp(r).test(e.port) || o && !new RegExp(o).test(e.pathname));
}
__name(ue, "ue");
__name2(ue, "ue");
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
__name2(xe, "xe");
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
__name2(de, "de");
async function W(e, { buildOutput: t, assetsFetcher: s, imagesConfig: r }) {
  let o = xe(e, r);
  if (!o) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: a, imageUrl: n } = o, i = await (a && n.pathname in t ? s.fetch.bind(s) : fetch)(n);
  return de(i, n, r);
}
__name(W, "W");
__name2(W, "W");
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
__name2(k, "k");
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
        let a = globalThis[me], n = /* @__PURE__ */ __name2(async () => {
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
__name2(J, "J");
async function fe() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? K("kv") : K("cache-api");
}
__name(fe, "fe");
__name2(fe, "fe");
async function K(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, s = await k(t);
  return new s.default();
}
__name(K, "K");
__name2(K, "K");
function z(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(z, "z");
__name2(z, "z");
function X() {
  globalThis[Z] || (ye(), globalThis[Z] = true);
}
__name(X, "X");
__name2(X, "X");
function ye() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let s = new Request(...t), r = await Te(s);
    return r || (r = await J(s), r) ? r : (Ne(s), e(s));
  };
}
__name(ye, "ye");
__name2(ye, "ye");
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
__name2(Te, "Te");
function Ne(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(Ne, "Ne");
__name2(Ne, "Ne");
var Z = Symbol.for("next-on-pages fetch patch");
_();
l();
p();
var Y = q(Q());
var E = class {
  static {
    __name(this, "E");
  }
  static {
    __name2(this, "E");
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
__name2(ee, "ee");
async function te(e, t = "none", s = false) {
  return await e.run(t) === "error" || !s && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
__name2(te, "te");
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
__name2(Se, "Se");
_();
l();
p();
function re() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ee };
}
__name(re, "re");
__name2(re, "re");
function Ee(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let s = Ce();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, s), s;
}
__name(Ee, "Ee");
__name2(Ee, "Ee");
function Ce() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name2((t, s) => e.has(s) ? e.get(s) : Reflect.get(globalThis, s), "get"), set: /* @__PURE__ */ __name2((t, s, r) => Me.has(s) ? Reflect.set(globalThis, s, r) : (e.set(s, r), true), "set") });
}
__name(Ce, "Ce");
__name2(Ce, "Ce");
var Me = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Ae = Object.defineProperty;
var Ie = /* @__PURE__ */ __name2((...e) => {
  let t = e[0], s = e[1], r = "__import_unsupported";
  if (!(s === r && typeof t == "object" && t !== null && r in t)) return Ae(...e);
}, "Ie");
globalThis.Object.defineProperty = Ie;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name2(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name2(() => {
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

// ../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-dev-util.ts
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-SUzgPJ/a1dvkikilvm.js
var define_ROUTES_default = { version: 1, description: "Built with @cloudflare/next-on-pages@1.13.16.", include: ["/*"], exclude: ["/_next/static/*"] };
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env2, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env2.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = wr;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env2, context);
      }
    }
    return env2.ASSETS.fetch(request);
  }
};

// ../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-2xf7Lz/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_dev_pipeline_default;

// ../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-2xf7Lz/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=a1dvkikilvm.js.map
