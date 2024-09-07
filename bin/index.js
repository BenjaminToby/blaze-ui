#!/usr/bin/env node
import {createRequire} from "node:module";
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// node_modules/async/internal/once.js
var require_once = __commonJS((exports, module) => {
  function once(fn) {
    function wrapper(...args) {
      if (fn === null)
        return;
      var callFn = fn;
      fn = null;
      callFn.apply(this, args);
    }
    Object.assign(wrapper, fn);
    return wrapper;
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = once;
  module.exports = exports["default"];
});

// node_modules/async/internal/isArrayLike.js
var require_isArrayLike = __commonJS((exports, module) => {
  function isArrayLike(value2) {
    return value2 && typeof value2.length === "number" && value2.length >= 0 && value2.length % 1 === 0;
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isArrayLike;
  module.exports = exports["default"];
});

// node_modules/async/internal/getIterator.js
var require_getIterator = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(coll) {
    return coll[Symbol.iterator] && coll[Symbol.iterator]();
  };
  module.exports = exports["default"];
});

// node_modules/async/internal/iterator.js
var require_iterator = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function createArrayIterator(coll) {
    var i2 = -1;
    var len = coll.length;
    return function next() {
      return ++i2 < len ? { value: coll[i2], key: i2 } : null;
    };
  }
  function createES2015Iterator(iterator) {
    var i2 = -1;
    return function next() {
      var item2 = iterator.next();
      if (item2.done)
        return null;
      i2++;
      return { value: item2.value, key: i2 };
    };
  }
  function createObjectIterator(obj) {
    var okeys = obj ? Object.keys(obj) : [];
    var i2 = -1;
    var len = okeys.length;
    return function next() {
      var key = okeys[++i2];
      if (key === "__proto__") {
        return next();
      }
      return i2 < len ? { value: obj[key], key } : null;
    };
  }
  function createIterator(coll) {
    if ((0, _isArrayLike2.default)(coll)) {
      return createArrayIterator(coll);
    }
    var iterator = (0, _getIterator2.default)(coll);
    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createIterator;
  var _isArrayLike = require_isArrayLike();
  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
  var _getIterator = require_getIterator();
  var _getIterator2 = _interopRequireDefault(_getIterator);
  module.exports = exports["default"];
});

// node_modules/async/internal/onlyOnce.js
var require_onlyOnce = __commonJS((exports, module) => {
  function onlyOnce(fn) {
    return function(...args) {
      if (fn === null)
        throw new Error("Callback was already called.");
      var callFn = fn;
      fn = null;
      callFn.apply(this, args);
    };
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = onlyOnce;
  module.exports = exports["default"];
});

// node_modules/async/internal/initialParams.js
var require_initialParams = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(fn) {
    return function(...args) {
      var callback = args.pop();
      return fn.call(this, args, callback);
    };
  };
  module.exports = exports["default"];
});

// node_modules/async/internal/setImmediate.js
var require_setImmediate = __commonJS((exports) => {
  function fallback(fn) {
    setTimeout(fn, 0);
  }
  function wrap(defer) {
    return (fn, ...args) => defer(() => fn(...args));
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fallback = fallback;
  exports.wrap = wrap;
  var hasQueueMicrotask = exports.hasQueueMicrotask = typeof queueMicrotask === "function" && queueMicrotask;
  var hasSetImmediate = exports.hasSetImmediate = typeof setImmediate === "function" && setImmediate;
  var hasNextTick = exports.hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
  var _defer;
  if (hasQueueMicrotask) {
    _defer = queueMicrotask;
  } else if (hasSetImmediate) {
    _defer = setImmediate;
  } else if (hasNextTick) {
    _defer = process.nextTick;
  } else {
    _defer = fallback;
  }
  exports.default = wrap(_defer);
});

// node_modules/async/asyncify.js
var require_asyncify = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function asyncify(func) {
    if ((0, _wrapAsync.isAsync)(func)) {
      return function(...args) {
        const callback = args.pop();
        const promise = func.apply(this, args);
        return handlePromise(promise, callback);
      };
    }
    return (0, _initialParams2.default)(function(args, callback) {
      var result;
      try {
        result = func.apply(this, args);
      } catch (e) {
        return callback(e);
      }
      if (result && typeof result.then === "function") {
        return handlePromise(result, callback);
      } else {
        callback(null, result);
      }
    });
  }
  function handlePromise(promise, callback) {
    return promise.then((value2) => {
      invokeCallback(callback, null, value2);
    }, (err) => {
      invokeCallback(callback, err && err.message ? err : new Error(err));
    });
  }
  function invokeCallback(callback, error, value2) {
    try {
      callback(error, value2);
    } catch (err) {
      (0, _setImmediate2.default)((e) => {
        throw e;
      }, err);
    }
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = asyncify;
  var _initialParams = require_initialParams();
  var _initialParams2 = _interopRequireDefault(_initialParams);
  var _setImmediate = require_setImmediate();
  var _setImmediate2 = _interopRequireDefault(_setImmediate);
  var _wrapAsync = require_wrapAsync();
  module.exports = exports["default"];
});

// node_modules/async/internal/wrapAsync.js
var require_wrapAsync = __commonJS((exports) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function isAsync(fn) {
    return fn[Symbol.toStringTag] === "AsyncFunction";
  }
  function isAsyncGenerator(fn) {
    return fn[Symbol.toStringTag] === "AsyncGenerator";
  }
  function isAsyncIterable(obj) {
    return typeof obj[Symbol.asyncIterator] === "function";
  }
  function wrapAsync(asyncFn) {
    if (typeof asyncFn !== "function")
      throw new Error("expected a function");
    return isAsync(asyncFn) ? (0, _asyncify2.default)(asyncFn) : asyncFn;
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isAsyncIterable = exports.isAsyncGenerator = exports.isAsync = undefined;
  var _asyncify = require_asyncify();
  var _asyncify2 = _interopRequireDefault(_asyncify);
  exports.default = wrapAsync;
  exports.isAsync = isAsync;
  exports.isAsyncGenerator = isAsyncGenerator;
  exports.isAsyncIterable = isAsyncIterable;
});

// node_modules/async/internal/breakLoop.js
var require_breakLoop = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var breakLoop = {};
  exports.default = breakLoop;
  module.exports = exports["default"];
});

// node_modules/async/internal/asyncEachOfLimit.js
var require_asyncEachOfLimit = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function asyncEachOfLimit(generator, limit, iteratee, callback) {
    let done = false;
    let canceled = false;
    let awaiting = false;
    let running = 0;
    let idx = 0;
    function replenish() {
      if (running >= limit || awaiting || done)
        return;
      awaiting = true;
      generator.next().then(({ value: value2, done: iterDone }) => {
        if (canceled || done)
          return;
        awaiting = false;
        if (iterDone) {
          done = true;
          if (running <= 0) {
            callback(null);
          }
          return;
        }
        running++;
        iteratee(value2, idx, iterateeCallback);
        idx++;
        replenish();
      }).catch(handleError);
    }
    function iterateeCallback(err, result) {
      running -= 1;
      if (canceled)
        return;
      if (err)
        return handleError(err);
      if (err === false) {
        done = true;
        canceled = true;
        return;
      }
      if (result === _breakLoop2.default || done && running <= 0) {
        done = true;
        return callback(null);
      }
      replenish();
    }
    function handleError(err) {
      if (canceled)
        return;
      awaiting = false;
      done = true;
      callback(err);
    }
    replenish();
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = asyncEachOfLimit;
  var _breakLoop = require_breakLoop();
  var _breakLoop2 = _interopRequireDefault(_breakLoop);
  module.exports = exports["default"];
});

// node_modules/async/internal/eachOfLimit.js
var require_eachOfLimit = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _once = require_once();
  var _once2 = _interopRequireDefault(_once);
  var _iterator = require_iterator();
  var _iterator2 = _interopRequireDefault(_iterator);
  var _onlyOnce = require_onlyOnce();
  var _onlyOnce2 = _interopRequireDefault(_onlyOnce);
  var _wrapAsync = require_wrapAsync();
  var _asyncEachOfLimit = require_asyncEachOfLimit();
  var _asyncEachOfLimit2 = _interopRequireDefault(_asyncEachOfLimit);
  var _breakLoop = require_breakLoop();
  var _breakLoop2 = _interopRequireDefault(_breakLoop);
  exports.default = (limit) => {
    return (obj, iteratee, callback) => {
      callback = (0, _once2.default)(callback);
      if (limit <= 0) {
        throw new RangeError("concurrency limit cannot be less than 1");
      }
      if (!obj) {
        return callback(null);
      }
      if ((0, _wrapAsync.isAsyncGenerator)(obj)) {
        return (0, _asyncEachOfLimit2.default)(obj, limit, iteratee, callback);
      }
      if ((0, _wrapAsync.isAsyncIterable)(obj)) {
        return (0, _asyncEachOfLimit2.default)(obj[Symbol.asyncIterator](), limit, iteratee, callback);
      }
      var nextElem = (0, _iterator2.default)(obj);
      var done = false;
      var canceled = false;
      var running = 0;
      var looping = false;
      function iterateeCallback(err, value2) {
        if (canceled)
          return;
        running -= 1;
        if (err) {
          done = true;
          callback(err);
        } else if (err === false) {
          done = true;
          canceled = true;
        } else if (value2 === _breakLoop2.default || done && running <= 0) {
          done = true;
          return callback(null);
        } else if (!looping) {
          replenish();
        }
      }
      function replenish() {
        looping = true;
        while (running < limit && !done) {
          var elem = nextElem();
          if (elem === null) {
            done = true;
            if (running <= 0) {
              callback(null);
            }
            return;
          }
          running += 1;
          iteratee(elem.value, elem.key, (0, _onlyOnce2.default)(iterateeCallback));
        }
        looping = false;
      }
      replenish();
    };
  };
  module.exports = exports["default"];
});

// node_modules/async/internal/withoutIndex.js
var require_withoutIndex = __commonJS((exports, module) => {
  function _withoutIndex(iteratee) {
    return (value2, index, callback) => iteratee(value2, callback);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _withoutIndex;
  module.exports = exports["default"];
});

// node_modules/async/internal/awaitify.js
var require_awaitify = __commonJS((exports, module) => {
  function awaitify(asyncFn, arity = asyncFn.length) {
    if (!arity)
      throw new Error("arity is undefined");
    function awaitable(...args) {
      if (typeof args[arity - 1] === "function") {
        return asyncFn.apply(this, args);
      }
      return new Promise((resolve, reject) => {
        args[arity - 1] = (err, ...cbArgs) => {
          if (err)
            return reject(err);
          resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
        };
        asyncFn.apply(this, args);
      });
    }
    return awaitable;
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = awaitify;
  module.exports = exports["default"];
});

// node_modules/async/eachLimit.js
var require_eachLimit = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function eachLimit(coll, limit, iteratee, callback) {
    return (0, _eachOfLimit2.default)(limit)(coll, (0, _withoutIndex2.default)((0, _wrapAsync2.default)(iteratee)), callback);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _eachOfLimit = require_eachOfLimit();
  var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);
  var _withoutIndex = require_withoutIndex();
  var _withoutIndex2 = _interopRequireDefault(_withoutIndex);
  var _wrapAsync = require_wrapAsync();
  var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  exports.default = (0, _awaitify2.default)(eachLimit, 4);
  module.exports = exports["default"];
});

// node_modules/async/eachSeries.js
var require_eachSeries = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function eachSeries(coll, iteratee, callback) {
    return (0, _eachLimit2.default)(coll, 1, iteratee, callback);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _eachLimit = require_eachLimit();
  var _eachLimit2 = _interopRequireDefault(_eachLimit);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  exports.default = (0, _awaitify2.default)(eachSeries, 3);
  module.exports = exports["default"];
});

// node_modules/async/internal/filter.js
var require_filter = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function filterArray(eachfn, arr, iteratee, callback) {
    var truthValues = new Array(arr.length);
    eachfn(arr, (x, index, iterCb) => {
      iteratee(x, (err, v) => {
        truthValues[index] = !!v;
        iterCb(err);
      });
    }, (err) => {
      if (err)
        return callback(err);
      var results = [];
      for (var i2 = 0;i2 < arr.length; i2++) {
        if (truthValues[i2])
          results.push(arr[i2]);
      }
      callback(null, results);
    });
  }
  function filterGeneric(eachfn, coll, iteratee, callback) {
    var results = [];
    eachfn(coll, (x, index, iterCb) => {
      iteratee(x, (err, v) => {
        if (err)
          return iterCb(err);
        if (v) {
          results.push({ index, value: x });
        }
        iterCb(err);
      });
    }, (err) => {
      if (err)
        return callback(err);
      callback(null, results.sort((a, b) => a.index - b.index).map((v) => v.value));
    });
  }
  function _filter(eachfn, coll, iteratee, callback) {
    var filter = (0, _isArrayLike2.default)(coll) ? filterArray : filterGeneric;
    return filter(eachfn, coll, (0, _wrapAsync2.default)(iteratee), callback);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _filter;
  var _isArrayLike = require_isArrayLike();
  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
  var _wrapAsync = require_wrapAsync();
  var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
  module.exports = exports["default"];
});

// node_modules/async/internal/reject.js
var require_reject = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function reject(eachfn, arr, _iteratee, callback) {
    const iteratee = (0, _wrapAsync2.default)(_iteratee);
    return (0, _filter2.default)(eachfn, arr, (value2, cb) => {
      iteratee(value2, (err, v) => {
        cb(err, !v);
      });
    }, callback);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = reject;
  var _filter = require_filter();
  var _filter2 = _interopRequireDefault(_filter);
  var _wrapAsync = require_wrapAsync();
  var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
  module.exports = exports["default"];
});

// node_modules/async/eachOfLimit.js
var require_eachOfLimit2 = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function eachOfLimit(coll, limit, iteratee, callback) {
    return (0, _eachOfLimit3.default)(limit)(coll, (0, _wrapAsync2.default)(iteratee), callback);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _eachOfLimit2 = require_eachOfLimit();
  var _eachOfLimit3 = _interopRequireDefault(_eachOfLimit2);
  var _wrapAsync = require_wrapAsync();
  var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  exports.default = (0, _awaitify2.default)(eachOfLimit, 4);
  module.exports = exports["default"];
});

// node_modules/async/eachOfSeries.js
var require_eachOfSeries = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function eachOfSeries(coll, iteratee, callback) {
    return (0, _eachOfLimit2.default)(coll, 1, iteratee, callback);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _eachOfLimit = require_eachOfLimit2();
  var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  exports.default = (0, _awaitify2.default)(eachOfSeries, 3);
  module.exports = exports["default"];
});

// node_modules/async/rejectSeries.js
var require_rejectSeries = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function rejectSeries(coll, iteratee, callback) {
    return (0, _reject3.default)(_eachOfSeries2.default, coll, iteratee, callback);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _reject2 = require_reject();
  var _reject3 = _interopRequireDefault(_reject2);
  var _eachOfSeries = require_eachOfSeries();
  var _eachOfSeries2 = _interopRequireDefault(_eachOfSeries);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  exports.default = (0, _awaitify2.default)(rejectSeries, 3);
  module.exports = exports["default"];
});

// node_modules/mute-stream/mute.js
var require_mute = __commonJS((exports, module) => {
  function MuteStream(opts) {
    Stream.apply(this);
    opts = opts || {};
    this.writable = this.readable = true;
    this.muted = false;
    this.on("pipe", this._onpipe);
    this.replace = opts.replace;
    this._prompt = opts.prompt || null;
    this._hadControl = false;
  }
  function onPipe(src) {
    this._src = src;
  }
  function getIsTTY() {
    return this._dest ? this._dest.isTTY : this._src ? this._src.isTTY : false;
  }
  function setIsTTY(isTTY) {
    Object.defineProperty(this, "isTTY", {
      value: isTTY,
      enumerable: true,
      writable: true,
      configurable: true
    });
  }
  function proxy(fn) {
    return function() {
      var d = this._dest;
      var s = this._src;
      if (d && d[fn])
        d[fn].apply(d, arguments);
      if (s && s[fn])
        s[fn].apply(s, arguments);
    };
  }
  var Stream = __require("stream");
  module.exports = MuteStream;
  MuteStream.prototype = Object.create(Stream.prototype);
  Object.defineProperty(MuteStream.prototype, "constructor", {
    value: MuteStream,
    enumerable: false
  });
  MuteStream.prototype.mute = function() {
    this.muted = true;
  };
  MuteStream.prototype.unmute = function() {
    this.muted = false;
  };
  Object.defineProperty(MuteStream.prototype, "_onpipe", {
    value: onPipe,
    enumerable: false,
    writable: true,
    configurable: true
  });
  Object.defineProperty(MuteStream.prototype, "isTTY", {
    get: getIsTTY,
    set: setIsTTY,
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MuteStream.prototype, "rows", {
    get: function() {
      return this._dest ? this._dest.rows : this._src ? this._src.rows : undefined;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MuteStream.prototype, "columns", {
    get: function() {
      return this._dest ? this._dest.columns : this._src ? this._src.columns : undefined;
    },
    enumerable: true,
    configurable: true
  });
  MuteStream.prototype.pipe = function(dest, options) {
    this._dest = dest;
    return Stream.prototype.pipe.call(this, dest, options);
  };
  MuteStream.prototype.pause = function() {
    if (this._src)
      return this._src.pause();
  };
  MuteStream.prototype.resume = function() {
    if (this._src)
      return this._src.resume();
  };
  MuteStream.prototype.write = function(c) {
    if (this.muted) {
      if (!this.replace)
        return true;
      if (c.match(/^\u001b/)) {
        if (c.indexOf(this._prompt) === 0) {
          c = c.substr(this._prompt.length);
          c = c.replace(/./g, this.replace);
          c = this._prompt + c;
        }
        this._hadControl = true;
        return this.emit("data", c);
      } else {
        if (this._prompt && this._hadControl && c.indexOf(this._prompt) === 0) {
          this._hadControl = false;
          this.emit("data", this._prompt);
          c = c.substr(this._prompt.length);
        }
        c = c.toString().replace(/./g, this.replace);
      }
    }
    this.emit("data", c);
  };
  MuteStream.prototype.end = function(c) {
    if (this.muted) {
      if (c && this.replace) {
        c = c.toString().replace(/./g, this.replace);
      } else {
        c = null;
      }
    }
    if (c)
      this.emit("data", c);
    this.emit("end");
  };
  MuteStream.prototype.destroy = proxy("destroy");
  MuteStream.prototype.destroySoon = proxy("destroySoon");
  MuteStream.prototype.close = proxy("close");
});

// node_modules/read/lib/read.js
var require_read = __commonJS((exports, module) => {
  function read(opts, cb) {
    if (opts.num) {
      throw new Error("read() no longer accepts a char number limit");
    }
    if (typeof opts.default !== "undefined" && typeof opts.default !== "string" && typeof opts.default !== "number") {
      throw new Error("default value must be string or number");
    }
    var input = opts.input || process.stdin;
    var output = opts.output || process.stdout;
    var prompt = (opts.prompt || "").trim() + " ";
    var silent = opts.silent;
    var editDef = false;
    var timeout = opts.timeout;
    var def = opts.default || "";
    if (def) {
      if (silent) {
        prompt += "(<default hidden>) ";
      } else if (opts.edit) {
        editDef = true;
      } else {
        prompt += "(" + def + ") ";
      }
    }
    var terminal = !!(opts.terminal || output.isTTY);
    var m = new Mute({ replace: opts.replace, prompt });
    m.pipe(output, { end: false });
    output = m;
    var rlOpts = { input, output, terminal };
    if (process.version.match(/^v0\.6/)) {
      var rl = readline.createInterface(rlOpts.input, rlOpts.output);
    } else {
      var rl = readline.createInterface(rlOpts);
    }
    output.unmute();
    rl.setPrompt(prompt);
    rl.prompt();
    if (silent) {
      output.mute();
    } else if (editDef) {
      rl.line = def;
      rl.cursor = def.length;
      rl._refreshLine();
    }
    var called = false;
    rl.on("line", onLine);
    rl.on("error", onError);
    rl.on("SIGINT", function() {
      rl.close();
      onError(new Error("canceled"));
    });
    var timer;
    if (timeout) {
      timer = setTimeout(function() {
        onError(new Error("timed out"));
      }, timeout);
    }
    function done() {
      called = true;
      rl.close();
      if (process.version.match(/^v0\.6/)) {
        rl.input.removeAllListeners("data");
        rl.input.removeAllListeners("keypress");
        rl.input.pause();
      }
      clearTimeout(timer);
      output.mute();
      output.end();
    }
    function onError(er) {
      if (called)
        return;
      done();
      return cb(er);
    }
    function onLine(line) {
      if (called)
        return;
      if (silent && terminal) {
        output.unmute();
        output.write("\r\n");
      }
      done();
      line = line.replace(/\r?\n$/, "");
      var isDefault = !!(editDef && line === def);
      if (def && !line) {
        isDefault = true;
        line = def;
      }
      cb(null, line, isDefault);
    }
  }
  module.exports = read;
  var readline = __require("readline");
  var Mute = require_mute();
});

// node_modules/revalidator/lib/revalidator.js
var require_revalidator = __commonJS((exports, module) => {
  (function(exports2) {
    exports2.validate = validate;
    exports2.mixin = mixin;
    function validate(object, schema, options) {
      options = mixin({}, options, validate.defaults);
      var errors = [];
      validateObject(object, schema, options, errors);
      return {
        valid: !errors.length,
        errors
      };
    }
    validate.defaults = {
      validateFormats: true,
      validateFormatsStrict: false,
      validateFormatExtensions: true
    };
    validate.messages = {
      required: "is required",
      allowEmpty: "must not be empty",
      minLength: "is too short (minimum is %{expected} characters)",
      maxLength: "is too long (maximum is %{expected} characters)",
      pattern: "invalid input",
      minimum: "must be greater than or equal to %{expected}",
      maximum: "must be less than or equal to %{expected}",
      exclusiveMinimum: "must be greater than %{expected}",
      exclusiveMaximum: "must be less than %{expected}",
      divisibleBy: "must be divisible by %{expected}",
      minItems: "must contain more than %{expected} items",
      maxItems: "must contain less than %{expected} items",
      uniqueItems: "must hold a unique set of values",
      format: "is not a valid %{expected}",
      conform: "must conform to given constraint",
      type: "must be of %{expected} type"
    };
    validate.messages["enum"] = "must be present in given enumerator";
    validate.formats = {
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
      "ip-address": /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
      ipv6: /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/,
      "date-time": /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d{1,3})?Z$/,
      date: /^\d{4}-\d{2}-\d{2}$/,
      time: /^\d{2}:\d{2}:\d{2}$/,
      color: /^#[a-z0-9]{6}|#[a-z0-9]{3}|(?:rgb\(\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*\))aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow$/i,
      "host-name": /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])/,
      "utc-millisec": {
        test: function(value2) {
          return typeof value2 === "number" && value2 >= 0;
        }
      },
      regex: {
        test: function(value2) {
          try {
            new RegExp(value2);
          } catch (e) {
            return false;
          }
          return true;
        }
      }
    };
    validate.formatExtensions = {
      url: /^(https?|ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    };
    function mixin(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      while (sources.length) {
        var source = sources.shift();
        if (!source) {
          continue;
        }
        if (typeof source !== "object") {
          throw new TypeError("mixin non-object");
        }
        for (var p in source) {
          if (source.hasOwnProperty(p)) {
            obj[p] = source[p];
          }
        }
      }
      return obj;
    }
    function validateObject(object, schema, options, errors) {
      var props, allProps = Object.keys(object), visitedProps = [];
      if (schema.properties) {
        props = schema.properties;
        for (var p in props) {
          if (props.hasOwnProperty(p)) {
            visitedProps.push(p);
            validateProperty(object, object[p], p, props[p], options, errors);
          }
        }
      }
      if (schema.patternProperties) {
        props = schema.patternProperties;
        for (var p in props) {
          if (props.hasOwnProperty(p)) {
            var re = new RegExp(p);
            for (var k in object) {
              if (object.hasOwnProperty(k)) {
                visitedProps.push(k);
                if (re.exec(k) !== null) {
                  validateProperty(object, object[k], p, props[p], options, errors);
                }
              }
            }
          }
        }
      }
      if (schema.additionalProperties !== undefined) {
        var i2, l;
        var unvisitedProps = allProps.filter(function(k2) {
          return visitedProps.indexOf(k2) === -1;
        });
        if (schema.additionalProperties === false && unvisitedProps.length > 0) {
          for (i2 = 0, l = unvisitedProps.length;i2 < l; i2++) {
            error("additionalProperties", unvisitedProps[i2], object[unvisitedProps[i2]], false, errors);
          }
        } else if (typeof schema.additionalProperties == "object" && unvisitedProps.length > 0) {
          for (i2 = 0, l = unvisitedProps.length;i2 < l; i2++) {
            validateProperty(object, object[unvisitedProps[i2]], unvisitedProps[i2], schema.unvisitedProperties, options, errors);
          }
        }
      }
    }
    function validateProperty(object, value2, property, schema, options, errors) {
      var format, valid, spec, type;
      function constrain(name2, value3, assert) {
        if (schema[name2] !== undefined && !assert(value3, schema[name2])) {
          error(name2, property, value3, schema, errors);
        }
      }
      if (value2 === undefined) {
        if (schema.required && schema.type !== "any") {
          return error("required", property, undefined, schema, errors);
        } else {
          return;
        }
      }
      if (options.cast) {
        if ((schema.type === "integer" || schema.type === "number") && value2 == +value2) {
          value2 = +value2;
          object[property] = value2;
        }
        if (schema.type === "boolean") {
          if (value2 === "true" || value2 === "1" || value2 === 1) {
            value2 = true;
            object[property] = value2;
          }
          if (value2 === "false" || value2 === "0" || value2 === 0) {
            value2 = false;
            object[property] = value2;
          }
        }
      }
      if (schema.format && options.validateFormats) {
        format = schema.format;
        if (options.validateFormatExtensions) {
          spec = validate.formatExtensions[format];
        }
        if (!spec) {
          spec = validate.formats[format];
        }
        if (!spec) {
          if (options.validateFormatsStrict) {
            return error("format", property, value2, schema, errors);
          }
        } else {
          if (!spec.test(value2)) {
            return error("format", property, value2, schema, errors);
          }
        }
      }
      if (schema["enum"] && schema["enum"].indexOf(value2) === -1) {
        error("enum", property, value2, schema, errors);
      }
      if (typeof schema.dependencies === "string" && object[schema.dependencies] === undefined) {
        error("dependencies", property, null, schema, errors);
      }
      if (isArray(schema.dependencies)) {
        for (var i2 = 0, l = schema.dependencies.length;i2 < l; i2++) {
          if (object[schema.dependencies[i2]] === undefined) {
            error("dependencies", property, null, schema, errors);
          }
        }
      }
      if (typeof schema.dependencies === "object") {
        validateObject(object, schema.dependencies, options, errors);
      }
      checkType(value2, schema.type, function(err, type2) {
        if (err)
          return error("type", property, typeof value2, schema, errors);
        constrain("conform", value2, function(a, e) {
          return e(a, object);
        });
        switch (type2 || (isArray(value2) ? "array" : typeof value2)) {
          case "string":
            constrain("allowEmpty", value2, function(a, e) {
              return e ? e : a !== "";
            });
            constrain("minLength", value2.length, function(a, e) {
              return a >= e;
            });
            constrain("maxLength", value2.length, function(a, e) {
              return a <= e;
            });
            constrain("pattern", value2, function(a, e) {
              e = typeof e === "string" ? e = new RegExp(e) : e;
              return e.test(a);
            });
            break;
          case "integer":
          case "number":
            constrain("minimum", value2, function(a, e) {
              return a >= e;
            });
            constrain("maximum", value2, function(a, e) {
              return a <= e;
            });
            constrain("exclusiveMinimum", value2, function(a, e) {
              return a > e;
            });
            constrain("exclusiveMaximum", value2, function(a, e) {
              return a < e;
            });
            constrain("divisibleBy", value2, function(a, e) {
              var multiplier = Math.max((a - Math.floor(a)).toString().length - 2, (e - Math.floor(e)).toString().length - 2);
              multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;
              return a * multiplier % (e * multiplier) === 0;
            });
            break;
          case "array":
            constrain("items", value2, function(a, e) {
              for (var i3 = 0, l2 = a.length;i3 < l2; i3++) {
                validateProperty(object, a[i3], property, e, options, errors);
              }
              return true;
            });
            constrain("minItems", value2, function(a, e) {
              return a.length >= e;
            });
            constrain("maxItems", value2, function(a, e) {
              return a.length <= e;
            });
            constrain("uniqueItems", value2, function(a) {
              var h = {};
              for (var i3 = 0, l2 = a.length;i3 < l2; i3++) {
                var key = JSON.stringify(a[i3]);
                if (h[key])
                  return false;
                h[key] = true;
              }
              return true;
            });
            break;
          case "object":
            if (schema.properties || schema.patternProperties || schema.additionalProperties) {
              validateObject(value2, schema, options, errors);
            }
            break;
        }
      });
    }
    function checkType(val, type, callback) {
      var result = false, types = isArray(type) ? type : [type];
      if (type === undefined)
        return callback(null, type);
      for (var i2 = 0, l = types.length;i2 < l; i2++) {
        type = types[i2].toLowerCase().trim();
        if (type === "string" ? typeof val === "string" : type === "array" ? isArray(val) : type === "object" ? val && typeof val === "object" && !isArray(val) : type === "number" ? typeof val === "number" : type === "integer" ? typeof val === "number" && ~~val === val : type === "null" ? val === null : type === "boolean" ? typeof val === "boolean" : type === "date" ? isDate(val) : type === "any" ? typeof val !== "undefined" : false) {
          return callback(null, type);
        }
      }
      callback(true);
    }
    function error(attribute, property, actual, schema, errors) {
      var lookup = { expected: schema[attribute], actual, attribute, property };
      var message = schema.messages && schema.messages[attribute] || schema.message || validate.messages[attribute] || "no default message";
      message = message.replace(/%\{([a-z]+)\}/ig, function(_, match) {
        return lookup[match.toLowerCase()] || "";
      });
      errors.push({
        attribute,
        property,
        expected: schema[attribute],
        actual,
        message
      });
    }
    function isArray(value2) {
      var s = typeof value2;
      if (s === "object") {
        if (value2) {
          if (typeof value2.length === "number" && !value2.propertyIsEnumerable("length") && typeof value2.splice === "function") {
            return true;
          }
        }
      }
      return false;
    }
    function isDate(value2) {
      var s = typeof value2;
      if (s === "object") {
        if (value2) {
          if (typeof value2.getTime === "function") {
            return true;
          }
        }
      }
      return false;
    }
  })(typeof module === "object" && module && exports ? exports : window);
});

// node_modules/winston/package.json
var require_package = __commonJS((exports, module) => {
  module.exports = {
    name: "winston",
    description: "A multi-transport async logging library for Node.js",
    version: "2.4.7",
    author: "Charlie Robbins <charlie.robbins@gmail.com>",
    maintainers: [
      "Jarrett Cruger <jcrugzz@gmail.com>",
      "Alberto Pose <albertopose@gmail.com>"
    ],
    repository: {
      type: "git",
      url: "https://github.com/winstonjs/winston.git"
    },
    keywords: [
      "winston",
      "logging",
      "sysadmin",
      "tools"
    ],
    dependencies: {
      async: "^2.6.4",
      colors: "1.0.x",
      cycle: "1.0.x",
      eyes: "0.1.x",
      isstream: "0.1.x",
      "stack-trace": "0.0.x"
    },
    devDependencies: {
      "cross-spawn-async": "^2.0.0",
      hock: "1.x.x",
      "std-mocks": "~1.0.0",
      vows: "0.7.x"
    },
    main: "./lib/winston",
    scripts: {
      test: "vows --dot-matrix --isolate"
    },
    types: "./index.d.ts",
    engines: {
      node: ">= 0.10.0"
    },
    license: "MIT"
  };
});

// node_modules/cycle/cycle.js
var require_cycle = __commonJS((exports, module) => {
  var cycle = exports;
  cycle.decycle = function decycle(object) {
    var objects = [], paths = [];
    return function derez(value2, path2) {
      var i2, name2, nu;
      if (typeof value2 === "object" && value2 !== null && !(value2 instanceof Boolean) && !(value2 instanceof Date) && !(value2 instanceof Number) && !(value2 instanceof RegExp) && !(value2 instanceof String)) {
        for (i2 = 0;i2 < objects.length; i2 += 1) {
          if (objects[i2] === value2) {
            return { $ref: paths[i2] };
          }
        }
        objects.push(value2);
        paths.push(path2);
        if (Object.prototype.toString.apply(value2) === "[object Array]") {
          nu = [];
          for (i2 = 0;i2 < value2.length; i2 += 1) {
            nu[i2] = derez(value2[i2], path2 + "[" + i2 + "]");
          }
        } else {
          nu = {};
          for (name2 in value2) {
            if (Object.prototype.hasOwnProperty.call(value2, name2)) {
              nu[name2] = derez(value2[name2], path2 + "[" + JSON.stringify(name2) + "]");
            }
          }
        }
        return nu;
      }
      return value2;
    }(object, "$");
  };
  cycle.retrocycle = function retrocycle($) {
    var px = /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;
    (function rez(value) {
      var i, item, name, path;
      if (value && typeof value === "object") {
        if (Object.prototype.toString.apply(value) === "[object Array]") {
          for (i = 0;i < value.length; i += 1) {
            item = value[i];
            if (item && typeof item === "object") {
              path = item.$ref;
              if (typeof path === "string" && px.test(path)) {
                value[i] = eval(path);
              } else {
                rez(item);
              }
            }
          }
        } else {
          for (name in value) {
            if (typeof value[name] === "object") {
              item = value[name];
              if (item) {
                path = item.$ref;
                if (typeof path === "string" && px.test(path)) {
                  value[name] = eval(path);
                } else {
                  rez(item);
                }
              }
            }
          }
        }
      }
    })($);
    return $;
  };
});

// node_modules/colors/lib/styles.js
var require_styles = __commonJS((exports, module) => {
  var styles = {};
  module["exports"] = styles;
  var codes = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49]
  };
  Object.keys(codes).forEach(function(key) {
    var val = codes[key];
    var style = styles[key] = [];
    style.open = "\x1B[" + val[0] + "m";
    style.close = "\x1B[" + val[1] + "m";
  });
});

// node_modules/colors/lib/system/supports-colors.js
var require_supports_colors = __commonJS((exports, module) => {
  var argv = process.argv;
  module.exports = function() {
    if (argv.indexOf("--no-color") !== -1 || argv.indexOf("--color=false") !== -1) {
      return false;
    }
    if (argv.indexOf("--color") !== -1 || argv.indexOf("--color=true") !== -1 || argv.indexOf("--color=always") !== -1) {
      return true;
    }
    if (process.stdout && !process.stdout.isTTY) {
      return false;
    }
    if (process.platform === "win32") {
      return true;
    }
    if ("COLORTERM" in process.env) {
      return true;
    }
    if (process.env.TERM === "dumb") {
      return false;
    }
    if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
      return true;
    }
    return false;
  }();
});

// node_modules/colors/lib/custom/trap.js
var require_trap = __commonJS((exports, module) => {
  module["exports"] = function runTheTrap(text, options) {
    var result = "";
    text = text || "Run the trap, drop the bass";
    text = text.split("");
    var trap = {
      a: ["@", "\u0104", "\u023A", "\u0245", "\u0394", "\u039B", "\u0414"],
      b: ["\xDF", "\u0181", "\u0243", "\u026E", "\u03B2", "\u0E3F"],
      c: ["\xA9", "\u023B", "\u03FE"],
      d: ["\xD0", "\u018A", "\u0500", "\u0501", "\u0502", "\u0503"],
      e: ["\xCB", "\u0115", "\u018E", "\u0258", "\u03A3", "\u03BE", "\u04BC", "\u0A6C"],
      f: ["\u04FA"],
      g: ["\u0262"],
      h: ["\u0126", "\u0195", "\u04A2", "\u04BA", "\u04C7", "\u050A"],
      i: ["\u0F0F"],
      j: ["\u0134"],
      k: ["\u0138", "\u04A0", "\u04C3", "\u051E"],
      l: ["\u0139"],
      m: ["\u028D", "\u04CD", "\u04CE", "\u0520", "\u0521", "\u0D69"],
      n: ["\xD1", "\u014B", "\u019D", "\u0376", "\u03A0", "\u048A"],
      o: ["\xD8", "\xF5", "\xF8", "\u01FE", "\u0298", "\u047A", "\u05DD", "\u06DD", "\u0E4F"],
      p: ["\u01F7", "\u048E"],
      q: ["\u09CD"],
      r: ["\xAE", "\u01A6", "\u0210", "\u024C", "\u0280", "\u042F"],
      s: ["\xA7", "\u03DE", "\u03DF", "\u03E8"],
      t: ["\u0141", "\u0166", "\u0373"],
      u: ["\u01B1", "\u054D"],
      v: ["\u05D8"],
      w: ["\u0428", "\u0460", "\u047C", "\u0D70"],
      x: ["\u04B2", "\u04FE", "\u04FC", "\u04FD"],
      y: ["\xA5", "\u04B0", "\u04CB"],
      z: ["\u01B5", "\u0240"]
    };
    text.forEach(function(c) {
      c = c.toLowerCase();
      var chars = trap[c] || [" "];
      var rand = Math.floor(Math.random() * chars.length);
      if (typeof trap[c] !== "undefined") {
        result += trap[c][rand];
      } else {
        result += c;
      }
    });
    return result;
  };
});

// node_modules/colors/lib/custom/zalgo.js
var require_zalgo = __commonJS((exports, module) => {
  module["exports"] = function zalgo(text, options) {
    text = text || "   he is here   ";
    var soul = {
      up: [
        "\u030D",
        "\u030E",
        "\u0304",
        "\u0305",
        "\u033F",
        "\u0311",
        "\u0306",
        "\u0310",
        "\u0352",
        "\u0357",
        "\u0351",
        "\u0307",
        "\u0308",
        "\u030A",
        "\u0342",
        "\u0313",
        "\u0308",
        "\u034A",
        "\u034B",
        "\u034C",
        "\u0303",
        "\u0302",
        "\u030C",
        "\u0350",
        "\u0300",
        "\u0301",
        "\u030B",
        "\u030F",
        "\u0312",
        "\u0313",
        "\u0314",
        "\u033D",
        "\u0309",
        "\u0363",
        "\u0364",
        "\u0365",
        "\u0366",
        "\u0367",
        "\u0368",
        "\u0369",
        "\u036A",
        "\u036B",
        "\u036C",
        "\u036D",
        "\u036E",
        "\u036F",
        "\u033E",
        "\u035B",
        "\u0346",
        "\u031A"
      ],
      down: [
        "\u0316",
        "\u0317",
        "\u0318",
        "\u0319",
        "\u031C",
        "\u031D",
        "\u031E",
        "\u031F",
        "\u0320",
        "\u0324",
        "\u0325",
        "\u0326",
        "\u0329",
        "\u032A",
        "\u032B",
        "\u032C",
        "\u032D",
        "\u032E",
        "\u032F",
        "\u0330",
        "\u0331",
        "\u0332",
        "\u0333",
        "\u0339",
        "\u033A",
        "\u033B",
        "\u033C",
        "\u0345",
        "\u0347",
        "\u0348",
        "\u0349",
        "\u034D",
        "\u034E",
        "\u0353",
        "\u0354",
        "\u0355",
        "\u0356",
        "\u0359",
        "\u035A",
        "\u0323"
      ],
      mid: [
        "\u0315",
        "\u031B",
        "\u0300",
        "\u0301",
        "\u0358",
        "\u0321",
        "\u0322",
        "\u0327",
        "\u0328",
        "\u0334",
        "\u0335",
        "\u0336",
        "\u035C",
        "\u035D",
        "\u035E",
        "\u035F",
        "\u0360",
        "\u0362",
        "\u0338",
        "\u0337",
        "\u0361",
        " \u0489"
      ]
    }, all = [].concat(soul.up, soul.down, soul.mid), zalgo = {};
    function randomNumber(range) {
      var r = Math.floor(Math.random() * range);
      return r;
    }
    function is_char(character) {
      var bool = false;
      all.filter(function(i2) {
        bool = i2 === character;
      });
      return bool;
    }
    function heComes(text2, options2) {
      var result = "", counts, l;
      options2 = options2 || {};
      options2["up"] = options2["up"] || true;
      options2["mid"] = options2["mid"] || true;
      options2["down"] = options2["down"] || true;
      options2["size"] = options2["size"] || "maxi";
      text2 = text2.split("");
      for (l in text2) {
        if (is_char(l)) {
          continue;
        }
        result = result + text2[l];
        counts = { up: 0, down: 0, mid: 0 };
        switch (options2.size) {
          case "mini":
            counts.up = randomNumber(8);
            counts.min = randomNumber(2);
            counts.down = randomNumber(8);
            break;
          case "maxi":
            counts.up = randomNumber(16) + 3;
            counts.min = randomNumber(4) + 1;
            counts.down = randomNumber(64) + 3;
            break;
          default:
            counts.up = randomNumber(8) + 1;
            counts.mid = randomNumber(6) / 2;
            counts.down = randomNumber(8) + 1;
            break;
        }
        var arr = ["up", "mid", "down"];
        for (var d in arr) {
          var index = arr[d];
          for (var i2 = 0;i2 <= counts[index]; i2++) {
            if (options2[index]) {
              result = result + soul[index][randomNumber(soul[index].length)];
            }
          }
        }
      }
      return result;
    }
    return heComes(text);
  };
});

// node_modules/colors/lib/maps/america.js
var require_america = __commonJS((exports, module) => {
  var colors = require_colors();
  module["exports"] = function() {
    return function(letter, i2, exploded) {
      if (letter === " ")
        return letter;
      switch (i2 % 3) {
        case 0:
          return colors.red(letter);
        case 1:
          return colors.white(letter);
        case 2:
          return colors.blue(letter);
      }
    };
  }();
});

// node_modules/colors/lib/maps/zebra.js
var require_zebra = __commonJS((exports, module) => {
  var colors = require_colors();
  module["exports"] = function(letter, i2, exploded) {
    return i2 % 2 === 0 ? letter : colors.inverse(letter);
  };
});

// node_modules/colors/lib/maps/rainbow.js
var require_rainbow = __commonJS((exports, module) => {
  var colors = require_colors();
  module["exports"] = function() {
    var rainbowColors = ["red", "yellow", "green", "blue", "magenta"];
    return function(letter, i2, exploded) {
      if (letter === " ") {
        return letter;
      } else {
        return colors[rainbowColors[i2++ % rainbowColors.length]](letter);
      }
    };
  }();
});

// node_modules/colors/lib/maps/random.js
var require_random = __commonJS((exports, module) => {
  var colors = require_colors();
  module["exports"] = function() {
    var available = ["underline", "inverse", "grey", "yellow", "red", "green", "blue", "white", "cyan", "magenta"];
    return function(letter, i2, exploded) {
      return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 1))]](letter);
    };
  }();
});

// node_modules/colors/lib/colors.js
var require_colors = __commonJS((exports, module) => {
  function build(_styles) {
    var builder = function builder() {
      return applyStyle.apply(builder, arguments);
    };
    builder._styles = _styles;
    builder.__proto__ = proto;
    return builder;
  }
  function applyStyle() {
    var args = arguments;
    var argsLen = args.length;
    var str = argsLen !== 0 && String(arguments[0]);
    if (argsLen > 1) {
      for (var a = 1;a < argsLen; a++) {
        str += " " + args[a];
      }
    }
    if (!colors.enabled || !str) {
      return str;
    }
    var nestedStyles = this._styles;
    var i2 = nestedStyles.length;
    while (i2--) {
      var code = ansiStyles[nestedStyles[i2]];
      str = code.open + str.replace(code.closeRe, code.open) + code.close;
    }
    return str;
  }
  function applyTheme(theme) {
    for (var style in theme) {
      (function(style2) {
        colors[style2] = function(str) {
          return colors[theme[style2]](str);
        };
      })(style);
    }
  }
  function init() {
    var ret = {};
    Object.keys(styles).forEach(function(name2) {
      ret[name2] = {
        get: function() {
          return build([name2]);
        }
      };
    });
    return ret;
  }
  var colors = {};
  module["exports"] = colors;
  colors.themes = {};
  var ansiStyles = colors.styles = require_styles();
  var defineProps = Object.defineProperties;
  colors.supportsColor = require_supports_colors();
  if (typeof colors.enabled === "undefined") {
    colors.enabled = colors.supportsColor;
  }
  colors.stripColors = colors.strip = function(str) {
    return ("" + str).replace(/\x1B\[\d+m/g, "");
  };
  var stylize = colors.stylize = function stylize(str, style) {
    return ansiStyles[style].open + str + ansiStyles[style].close;
  };
  var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
  var escapeStringRegexp = function(str) {
    if (typeof str !== "string") {
      throw new TypeError("Expected a string");
    }
    return str.replace(matchOperatorsRe, "\\$&");
  };
  var styles = function() {
    var ret = {};
    ansiStyles.grey = ansiStyles.gray;
    Object.keys(ansiStyles).forEach(function(key) {
      ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
      ret[key] = {
        get: function() {
          return build(this._styles.concat(key));
        }
      };
    });
    return ret;
  }();
  var proto = defineProps(function colors() {
  }, styles);
  colors.setTheme = function(theme) {
    if (typeof theme === "string") {
      try {
        colors.themes[theme] = __require(theme);
        applyTheme(colors.themes[theme]);
        return colors.themes[theme];
      } catch (err) {
        console.log(err);
        return err;
      }
    } else {
      applyTheme(theme);
    }
  };
  var sequencer = function sequencer(map2, str) {
    var exploded = str.split(""), i2 = 0;
    exploded = exploded.map(map2);
    return exploded.join("");
  };
  colors.trap = require_trap();
  colors.zalgo = require_zalgo();
  colors.maps = {};
  colors.maps.america = require_america();
  colors.maps.zebra = require_zebra();
  colors.maps.rainbow = require_rainbow();
  colors.maps.random = require_random();
  for (map in colors.maps) {
    (function(map2) {
      colors[map2] = function(str) {
        return sequencer(colors.maps[map2], str);
      };
    })(map);
  }
  var map;
  defineProps(colors, init());
});

// node_modules/colors/safe.js
var require_safe = __commonJS((exports, module) => {
  var colors = require_colors();
  module["exports"] = colors;
});

// node_modules/winston/lib/winston/config/cli-config.js
var require_cli_config = __commonJS((exports) => {
  var cliConfig = exports;
  cliConfig.levels = {
    error: 0,
    warn: 1,
    help: 2,
    data: 3,
    info: 4,
    debug: 5,
    prompt: 6,
    verbose: 7,
    input: 8,
    silly: 9
  };
  cliConfig.colors = {
    error: "red",
    warn: "yellow",
    help: "cyan",
    data: "grey",
    info: "green",
    debug: "blue",
    prompt: "grey",
    verbose: "cyan",
    input: "grey",
    silly: "magenta"
  };
});

// node_modules/winston/lib/winston/config/npm-config.js
var require_npm_config = __commonJS((exports) => {
  var npmConfig = exports;
  npmConfig.levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  };
  npmConfig.colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    verbose: "cyan",
    debug: "blue",
    silly: "magenta"
  };
});

// node_modules/winston/lib/winston/config/syslog-config.js
var require_syslog_config = __commonJS((exports) => {
  var syslogConfig = exports;
  syslogConfig.levels = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
  };
  syslogConfig.colors = {
    emerg: "red",
    alert: "yellow",
    crit: "red",
    error: "red",
    warning: "red",
    notice: "yellow",
    info: "green",
    debug: "blue"
  };
});

// node_modules/winston/lib/winston/config.js
var require_config = __commonJS((exports) => {
  function mixin(target) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.forEach(function(a) {
      var keys = Object.keys(a);
      for (var i2 = 0;i2 < keys.length; i2++) {
        target[keys[i2]] = a[keys[i2]];
      }
    });
    return target;
  }
  var colors = require_safe();
  colors.enabled = true;
  var config = exports;
  var allColors = exports.allColors = {};
  config.addColors = function(colors2) {
    mixin(allColors, colors2);
  };
  config.colorize = function(level, message) {
    if (typeof message === "undefined")
      message = level;
    var colorized = message;
    if (allColors[level] instanceof Array) {
      for (var i2 = 0, l = allColors[level].length;i2 < l; ++i2) {
        colorized = colors[allColors[level][i2]](colorized);
      }
    } else if (allColors[level].match(/\s/)) {
      var colorArr = allColors[level].split(/\s+/);
      for (var i2 = 0;i2 < colorArr.length; ++i2) {
        colorized = colors[colorArr[i2]](colorized);
      }
      allColors[level] = colorArr;
    } else {
      colorized = colors[allColors[level]](colorized);
    }
    return colorized;
  };
  config.cli = require_cli_config();
  config.npm = require_npm_config();
  config.syslog = require_syslog_config();
  config.addColors(config.cli.colors);
  config.addColors(config.npm.colors);
  config.addColors(config.syslog.colors);
});

// node_modules/winston/lib/winston/common.js
var require_common = __commonJS((exports) => {
  function clone(obj) {
    var copy = Array.isArray(obj) ? [] : {};
    for (var i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        if (Array.isArray(obj[i2])) {
          copy[i2] = obj[i2].slice(0);
        } else if (obj[i2] instanceof Buffer) {
          copy[i2] = obj[i2].slice(0);
        } else if (typeof obj[i2] != "function") {
          copy[i2] = obj[i2] instanceof Object ? exports.clone(obj[i2]) : obj[i2];
        } else if (typeof obj[i2] === "function") {
          copy[i2] = obj[i2];
        }
      }
    }
    return copy;
  }
  function nop() {
  }
  var util = __require("util");
  var crypto = __require("crypto");
  var cycle = require_cycle();
  var fs = __require("fs");
  var StringDecoder = __require("string_decoder").StringDecoder;
  var Stream = __require("stream").Stream;
  var config = require_config();
  exports.setLevels = function(target, past, current, isDefault) {
    var self2 = this;
    if (past) {
      Object.keys(past).forEach(function(level) {
        delete target[level];
      });
    }
    target.levels = current || config.npm.levels;
    if (target.padLevels) {
      target.levelLength = exports.longestElement(Object.keys(target.levels));
    }
    Object.keys(target.levels).forEach(function(level) {
      if (level === "log") {
        console.warn('Log level named "log" will clash with the method "log". Consider using a different name.');
        return;
      }
      target[level] = function(msg) {
        var args = [level].concat(Array.prototype.slice.call(arguments));
        target.log.apply(target, args);
      };
    });
    return target;
  };
  exports.longestElement = function(xs) {
    return Math.max.apply(null, xs.map(function(x) {
      return x.length;
    }));
  };
  exports.clone = function(obj) {
    if (obj instanceof Error) {
      var copy = { message: obj.message };
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        copy[key] = obj[key];
      });
      return cycle.decycle(copy);
    } else if (!(obj instanceof Object)) {
      return obj;
    } else if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    return clone(cycle.decycle(obj));
  };
  exports.log = function(options) {
    var timestampFn = typeof options.timestamp === "function" ? options.timestamp : exports.timestamp, timestamp = options.timestamp ? timestampFn() : null, showLevel = options.showLevel === undefined ? true : options.showLevel, meta = options.meta !== null && options.meta !== undefined ? exports.clone(options.meta) : options.meta || null, output;
    if (options.raw) {
      if (typeof meta !== "object" && meta != null) {
        meta = { meta };
      }
      output = exports.clone(meta) || {};
      output.level = options.level;
      output.message = options.message.stripColors ? options.message.stripColors : options.message;
      return JSON.stringify(output);
    }
    if (options.json || options.logstash === true) {
      if (typeof meta !== "object" && meta != null) {
        meta = { meta };
      }
      output = exports.clone(meta) || {};
      output.level = options.level;
      output.message = output.message || "";
      if (options.label) {
        output.label = options.label;
      }
      if (options.message) {
        output.message = options.message;
      }
      if (timestamp) {
        output.timestamp = timestamp;
      }
      if (options.logstash === true) {
        var logstashOutput = {};
        if (output.message !== undefined) {
          logstashOutput["@message"] = output.message;
          delete output.message;
        }
        if (output.timestamp !== undefined) {
          logstashOutput["@timestamp"] = output.timestamp;
          delete output.timestamp;
        }
        logstashOutput["@fields"] = exports.clone(output);
        output = logstashOutput;
      }
      if (typeof options.stringify === "function") {
        return options.stringify(output);
      }
      return JSON.stringify(output, function(key, value2) {
        return value2 instanceof Buffer ? value2.toString("base64") : value2;
      });
    }
    if (typeof options.formatter == "function") {
      options.meta = meta || options.meta;
      if (options.meta instanceof Error) {
        options.meta = exports.clone(options.meta);
      }
      return String(options.formatter(exports.clone(options)));
    }
    output = timestamp ? timestamp + " - " : "";
    if (showLevel) {
      output += options.colorize === "all" || options.colorize === "level" || options.colorize === true ? config.colorize(options.level) : options.level;
    }
    output += options.align ? "\t" : "";
    output += timestamp || showLevel ? ": " : "";
    output += options.label ? "[" + options.label + "] " : "";
    output += options.colorize === "all" || options.colorize === "message" ? config.colorize(options.level, options.message) : options.message;
    if (meta !== null && meta !== undefined) {
      if (typeof meta !== "object") {
        output += " " + meta;
      } else if (Object.keys(meta).length > 0) {
        if (typeof options.prettyPrint === "function") {
          output += " " + options.prettyPrint(meta);
        } else if (options.prettyPrint) {
          output += " " + "\n" + util.inspect(meta, false, options.depth || null, options.colorize);
        } else if (options.humanReadableUnhandledException && Object.keys(meta).length >= 5 && meta.hasOwnProperty("date") && meta.hasOwnProperty("process") && meta.hasOwnProperty("os") && meta.hasOwnProperty("trace") && meta.hasOwnProperty("stack")) {
          var stack = meta.stack;
          delete meta.stack;
          delete meta.trace;
          output += " " + exports.serialize(meta);
          if (stack) {
            output += "\n" + stack.join("\n");
          }
        } else {
          output += " " + exports.serialize(meta);
        }
      }
    }
    return output;
  };
  exports.capitalize = function(str) {
    return str && str[0].toUpperCase() + str.slice(1);
  };
  exports.hash = function(str) {
    return crypto.createHash("sha1").update(str).digest("hex");
  };
  exports.pad = function(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
  };
  exports.timestamp = function() {
    return new Date().toISOString();
  };
  exports.serialize = function(obj, key) {
    if (typeof key === "symbol") {
      key = key.toString();
    }
    if (typeof obj === "symbol") {
      obj = obj.toString();
    }
    if (obj === null) {
      obj = "null";
    } else if (obj === undefined) {
      obj = "undefined";
    } else if (obj === false) {
      obj = "false";
    }
    if (typeof obj !== "object") {
      return key ? key + "=" + obj : obj;
    }
    if (obj instanceof Buffer) {
      return key ? key + "=" + obj.toString("base64") : obj.toString("base64");
    }
    var msg = "", keys = Object.keys(obj), length = keys.length;
    for (var i2 = 0;i2 < length; i2++) {
      if (Array.isArray(obj[keys[i2]])) {
        msg += keys[i2] + "=[";
        for (var j = 0, l = obj[keys[i2]].length;j < l; j++) {
          msg += exports.serialize(obj[keys[i2]][j]);
          if (j < l - 1) {
            msg += ", ";
          }
        }
        msg += "]";
      } else if (obj[keys[i2]] instanceof Date) {
        msg += keys[i2] + "=" + obj[keys[i2]];
      } else {
        msg += exports.serialize(obj[keys[i2]], keys[i2]);
      }
      if (i2 < length - 1) {
        msg += ", ";
      }
    }
    return msg;
  };
  exports.tailFile = function(options, callback) {
    var buffer = Buffer.alloc(64 * 1024), decode = new StringDecoder("utf8"), stream = new Stream, buff = "", pos = 0, row = 0;
    if (options.start === -1) {
      delete options.start;
    }
    stream.readable = true;
    stream.destroy = function() {
      stream.destroyed = true;
      stream.emit("end");
      stream.emit("close");
    };
    fs.open(options.file, "a+", "0644", function(err, fd) {
      if (err) {
        if (!callback) {
          stream.emit("error", err);
        } else {
          callback(err);
        }
        stream.destroy();
        return;
      }
      (function read() {
        if (stream.destroyed) {
          fs.close(fd, nop);
          return;
        }
        return fs.read(fd, buffer, 0, buffer.length, pos, function(err2, bytes) {
          if (err2) {
            if (!callback) {
              stream.emit("error", err2);
            } else {
              callback(err2);
            }
            stream.destroy();
            return;
          }
          if (!bytes) {
            if (buff) {
              if (options.start == null || row > options.start) {
                if (!callback) {
                  stream.emit("line", buff);
                } else {
                  callback(null, buff);
                }
              }
              row++;
              buff = "";
            }
            return setTimeout(read, 1000);
          }
          var data = decode.write(buffer.slice(0, bytes));
          if (!callback) {
            stream.emit("data", data);
          }
          var data = (buff + data).split(/\n+/), l = data.length - 1, i2 = 0;
          for (;i2 < l; i2++) {
            if (options.start == null || row > options.start) {
              if (!callback) {
                stream.emit("line", data[i2]);
              } else {
                callback(null, data[i2]);
              }
            }
            row++;
          }
          buff = data[l];
          pos += bytes;
          return read();
        });
      })();
    });
    if (!callback) {
      return stream;
    }
    return stream.destroy;
  };
  exports.stringArrayToSet = function(strArray, errMsg) {
    if (typeof errMsg === "undefined") {
      errMsg = "Cannot make set from Array with non-string elements";
    }
    return strArray.reduce(function(set, el) {
      if (!(typeof el === "string" || el instanceof String)) {
        throw new Error(errMsg);
      }
      set[el] = true;
      return set;
    }, Object.create(null));
  };
});

// node_modules/winston/lib/winston/transports/transport.js
var require_transport = __commonJS((exports) => {
  var events = __require("events");
  var util = __require("util");
  var Transport = exports.Transport = function(options) {
    events.EventEmitter.call(this);
    options = options || {};
    this.silent = options.silent || false;
    this.raw = options.raw || false;
    this.name = options.name || this.name;
    this.formatter = options.formatter;
    this.level = options.level;
    this.handleExceptions = options.handleExceptions || false;
    this.exceptionsLevel = options.exceptionsLevel || "error";
    this.humanReadableUnhandledException = options.humanReadableUnhandledException || false;
  };
  util.inherits(Transport, events.EventEmitter);
  Transport.prototype.formatQuery = function(query) {
    return query;
  };
  Transport.prototype.normalizeQuery = function(options) {
    options = options || {};
    options.rows = options.rows || options.limit || 10;
    options.start = options.start || 0;
    options.until = options.until || new Date;
    if (typeof options.until !== "object") {
      options.until = new Date(options.until);
    }
    options.from = options.from || options.until - 24 * 60 * 60 * 1000;
    if (typeof options.from !== "object") {
      options.from = new Date(options.from);
    }
    options.order = options.order || "desc";
    options.fields = options.fields;
    return options;
  };
  Transport.prototype.formatResults = function(results, options) {
    return results;
  };
  Transport.prototype.logException = function(msg, meta, callback) {
    var self2 = this, called;
    if (this.silent) {
      return callback();
    }
    function onComplete() {
      if (!called) {
        called = true;
        self2.removeListener("logged", onComplete);
        self2.removeListener("error", onComplete);
        callback();
      }
    }
    this.once("logged", onComplete);
    this.once("error", onComplete);
    this.log(self2.exceptionsLevel, msg, meta, function() {
    });
  };
});

// node_modules/winston/lib/winston/transports/console.js
var require_console = __commonJS((exports) => {
  var events = __require("events");
  var os = __require("os");
  var util = __require("util");
  var common = require_common();
  var Transport = require_transport().Transport;
  var Console = exports.Console = function(options) {
    Transport.call(this, options);
    options = options || {};
    this.json = options.json || false;
    this.colorize = options.colorize || false;
    this.prettyPrint = options.prettyPrint || false;
    this.timestamp = typeof options.timestamp !== "undefined" ? options.timestamp : false;
    this.showLevel = options.showLevel === undefined ? true : options.showLevel;
    this.label = options.label || null;
    this.logstash = options.logstash || false;
    this.depth = options.depth || null;
    this.align = options.align || false;
    this.stderrLevels = setStderrLevels(options.stderrLevels, options.debugStdout);
    this.eol = options.eol || os.EOL;
    if (this.json) {
      this.stringify = options.stringify || function(obj) {
        return JSON.stringify(obj, null, 2);
      };
    }
    function setStderrLevels(levels, debugStdout) {
      var defaultMsg = "Cannot have non-string elements in stderrLevels Array";
      if (debugStdout) {
        if (levels) {
          throw new Error("Cannot set debugStdout and stderrLevels together");
        }
        return common.stringArrayToSet(["error"], defaultMsg);
      }
      if (!levels) {
        return common.stringArrayToSet(["error", "debug"], defaultMsg);
      } else if (!Array.isArray(levels)) {
        throw new Error("Cannot set stderrLevels to type other than Array");
      }
      return common.stringArrayToSet(levels, defaultMsg);
    }
  };
  util.inherits(Console, Transport);
  Console.prototype.name = "console";
  Console.prototype.log = function(level, msg, meta, callback) {
    if (this.silent) {
      return callback(null, true);
    }
    var self2 = this, output;
    output = common.log({
      colorize: this.colorize,
      json: this.json,
      level,
      message: msg,
      meta,
      stringify: this.stringify,
      timestamp: this.timestamp,
      showLevel: this.showLevel,
      prettyPrint: this.prettyPrint,
      raw: this.raw,
      label: this.label,
      logstash: this.logstash,
      depth: this.depth,
      formatter: this.formatter,
      align: this.align,
      humanReadableUnhandledException: this.humanReadableUnhandledException
    });
    if (this.stderrLevels[level]) {
      process.stderr.write(output + this.eol);
    } else {
      process.stdout.write(output + this.eol);
    }
    self2.emit("logged");
    callback(null, true);
  };
});

// node_modules/winston/node_modules/async/dist/async.js
var require_async = __commonJS((exports, module) => {
  (function(global2, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.async = global2.async || {});
  })(exports, function(exports2) {
    function slice(arrayLike, start) {
      start = start | 0;
      var newLen = Math.max(arrayLike.length - start, 0);
      var newArr = Array(newLen);
      for (var idx = 0;idx < newLen; idx++) {
        newArr[idx] = arrayLike[start + idx];
      }
      return newArr;
    }
    var apply = function(fn) {
      var args = slice(arguments, 1);
      return function() {
        var callArgs = slice(arguments);
        return fn.apply(null, args.concat(callArgs));
      };
    };
    var initialParams = function(fn) {
      return function() {
        var args = slice(arguments);
        var callback = args.pop();
        fn.call(this, args, callback);
      };
    };
    function isObject(value2) {
      var type = typeof value2;
      return value2 != null && (type == "object" || type == "function");
    }
    var hasSetImmediate = typeof setImmediate === "function" && setImmediate;
    var hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
    function fallback(fn) {
      setTimeout(fn, 0);
    }
    function wrap(defer) {
      return function(fn) {
        var args = slice(arguments, 1);
        defer(function() {
          fn.apply(null, args);
        });
      };
    }
    var _defer;
    if (hasSetImmediate) {
      _defer = setImmediate;
    } else if (hasNextTick) {
      _defer = process.nextTick;
    } else {
      _defer = fallback;
    }
    var setImmediate$1 = wrap(_defer);
    function asyncify(func) {
      return initialParams(function(args, callback) {
        var result;
        try {
          result = func.apply(this, args);
        } catch (e) {
          return callback(e);
        }
        if (isObject(result) && typeof result.then === "function") {
          result.then(function(value2) {
            invokeCallback(callback, null, value2);
          }, function(err) {
            invokeCallback(callback, err.message ? err : new Error(err));
          });
        } else {
          callback(null, result);
        }
      });
    }
    function invokeCallback(callback, error, value2) {
      try {
        callback(error, value2);
      } catch (e) {
        setImmediate$1(rethrow, e);
      }
    }
    function rethrow(error) {
      throw error;
    }
    var supportsSymbol = typeof Symbol === "function";
    function isAsync(fn) {
      return supportsSymbol && fn[Symbol.toStringTag] === "AsyncFunction";
    }
    function wrapAsync(asyncFn) {
      return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
    }
    function applyEach$1(eachfn) {
      return function(fns) {
        var args = slice(arguments, 1);
        var go = initialParams(function(args2, callback) {
          var that = this;
          return eachfn(fns, function(fn, cb) {
            wrapAsync(fn).apply(that, args2.concat(cb));
          }, callback);
        });
        if (args.length) {
          return go.apply(this, args);
        } else {
          return go;
        }
      };
    }
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var Symbol$1 = root.Symbol;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;
    function getRawTag(value2) {
      var isOwn = hasOwnProperty.call(value2, symToStringTag$1), tag = value2[symToStringTag$1];
      try {
        value2[symToStringTag$1] = undefined;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value2);
      if (unmasked) {
        if (isOwn) {
          value2[symToStringTag$1] = tag;
        } else {
          delete value2[symToStringTag$1];
        }
      }
      return result;
    }
    var objectProto$1 = Object.prototype;
    var nativeObjectToString$1 = objectProto$1.toString;
    function objectToString(value2) {
      return nativeObjectToString$1.call(value2);
    }
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;
    function baseGetTag(value2) {
      if (value2 == null) {
        return value2 === undefined ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value2) ? getRawTag(value2) : objectToString(value2);
    }
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value2) {
      if (!isObject(value2)) {
        return false;
      }
      var tag = baseGetTag(value2);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value2) {
      return typeof value2 == "number" && value2 > -1 && value2 % 1 == 0 && value2 <= MAX_SAFE_INTEGER;
    }
    function isArrayLike(value2) {
      return value2 != null && isLength(value2.length) && !isFunction(value2);
    }
    var breakLoop = {};
    function noop() {
    }
    function once(fn) {
      return function() {
        if (fn === null)
          return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
      };
    }
    var iteratorSymbol = typeof Symbol === "function" && Symbol.iterator;
    var getIterator = function(coll) {
      return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
    };
    function baseTimes(n, iteratee) {
      var index2 = -1, result = Array(n);
      while (++index2 < n) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    function isObjectLike(value2) {
      return value2 != null && typeof value2 == "object";
    }
    var argsTag = "[object Arguments]";
    function baseIsArguments(value2) {
      return isObjectLike(value2) && baseGetTag(value2) == argsTag;
    }
    var objectProto$3 = Object.prototype;
    var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
    var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value2) {
      return isObjectLike(value2) && hasOwnProperty$2.call(value2, "callee") && !propertyIsEnumerable.call(value2, "callee");
    };
    var isArray = Array.isArray;
    function stubFalse() {
      return false;
    }
    var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : undefined;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined;
    var isBuffer = nativeIsBuffer || stubFalse;
    var MAX_SAFE_INTEGER$1 = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value2, length) {
      var type = typeof value2;
      length = length == null ? MAX_SAFE_INTEGER$1 : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value2)) && (value2 > -1 && value2 % 1 == 0 && value2 < length);
    }
    var argsTag$1 = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag$1 = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value2) {
      return isObjectLike(value2) && isLength(value2.length) && !!typedArrayTags[baseGetTag(value2)];
    }
    function baseUnary(func) {
      return function(value2) {
        return func(value2);
      };
    }
    var freeExports$1 = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
    var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
    var freeProcess = moduleExports$1 && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    var objectProto$2 = Object.prototype;
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
    function arrayLikeKeys(value2, inherited) {
      var isArr = isArray(value2), isArg = !isArr && isArguments(value2), isBuff = !isArr && !isArg && isBuffer(value2), isType = !isArr && !isArg && !isBuff && isTypedArray(value2), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value2.length, String) : [], length = result.length;
      for (var key in value2) {
        if ((inherited || hasOwnProperty$1.call(value2, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    var objectProto$5 = Object.prototype;
    function isPrototype(value2) {
      var Ctor = value2 && value2.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
      return value2 === proto;
    }
    function overArg(func, transform2) {
      return function(arg) {
        return func(transform2(arg));
      };
    }
    var nativeKeys = overArg(Object.keys, Object);
    var objectProto$4 = Object.prototype;
    var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty$3.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function createArrayIterator(coll) {
      var i2 = -1;
      var len = coll.length;
      return function next() {
        return ++i2 < len ? { value: coll[i2], key: i2 } : null;
      };
    }
    function createES2015Iterator(iterator2) {
      var i2 = -1;
      return function next() {
        var item2 = iterator2.next();
        if (item2.done)
          return null;
        i2++;
        return { value: item2.value, key: i2 };
      };
    }
    function createObjectIterator(obj) {
      var okeys = keys(obj);
      var i2 = -1;
      var len = okeys.length;
      return function next() {
        var key = okeys[++i2];
        if (key === "__proto__") {
          return next();
        }
        return i2 < len ? { value: obj[key], key } : null;
      };
    }
    function iterator(coll) {
      if (isArrayLike(coll)) {
        return createArrayIterator(coll);
      }
      var iterator2 = getIterator(coll);
      return iterator2 ? createES2015Iterator(iterator2) : createObjectIterator(coll);
    }
    function onlyOnce(fn) {
      return function() {
        if (fn === null)
          throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
      };
    }
    function _eachOfLimit(limit) {
      return function(obj, iteratee, callback) {
        callback = once(callback || noop);
        if (limit <= 0 || !obj) {
          return callback(null);
        }
        var nextElem = iterator(obj);
        var done = false;
        var running = 0;
        var looping = false;
        function iterateeCallback(err, value2) {
          running -= 1;
          if (err) {
            done = true;
            callback(err);
          } else if (value2 === breakLoop || done && running <= 0) {
            done = true;
            return callback(null);
          } else if (!looping) {
            replenish();
          }
        }
        function replenish() {
          looping = true;
          while (running < limit && !done) {
            var elem = nextElem();
            if (elem === null) {
              done = true;
              if (running <= 0) {
                callback(null);
              }
              return;
            }
            running += 1;
            iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
          }
          looping = false;
        }
        replenish();
      };
    }
    function eachOfLimit(coll, limit, iteratee, callback) {
      _eachOfLimit(limit)(coll, wrapAsync(iteratee), callback);
    }
    function doLimit(fn, limit) {
      return function(iterable, iteratee, callback) {
        return fn(iterable, limit, iteratee, callback);
      };
    }
    function eachOfArrayLike(coll, iteratee, callback) {
      callback = once(callback || noop);
      var index2 = 0, completed = 0, length = coll.length;
      if (length === 0) {
        callback(null);
      }
      function iteratorCallback(err, value2) {
        if (err) {
          callback(err);
        } else if (++completed === length || value2 === breakLoop) {
          callback(null);
        }
      }
      for (;index2 < length; index2++) {
        iteratee(coll[index2], index2, onlyOnce(iteratorCallback));
      }
    }
    var eachOfGeneric = doLimit(eachOfLimit, Infinity);
    var eachOf = function(coll, iteratee, callback) {
      var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
      eachOfImplementation(coll, wrapAsync(iteratee), callback);
    };
    function doParallel(fn) {
      return function(obj, iteratee, callback) {
        return fn(eachOf, obj, wrapAsync(iteratee), callback);
      };
    }
    function _asyncMap(eachfn, arr, iteratee, callback) {
      callback = callback || noop;
      arr = arr || [];
      var results = [];
      var counter = 0;
      var _iteratee = wrapAsync(iteratee);
      eachfn(arr, function(value2, _, callback2) {
        var index2 = counter++;
        _iteratee(value2, function(err, v) {
          results[index2] = v;
          callback2(err);
        });
      }, function(err) {
        callback(err, results);
      });
    }
    var map = doParallel(_asyncMap);
    var applyEach = applyEach$1(map);
    function doParallelLimit(fn) {
      return function(obj, limit, iteratee, callback) {
        return fn(_eachOfLimit(limit), obj, wrapAsync(iteratee), callback);
      };
    }
    var mapLimit = doParallelLimit(_asyncMap);
    var mapSeries = doLimit(mapLimit, 1);
    var applyEachSeries = applyEach$1(mapSeries);
    function arrayEach(array, iteratee) {
      var index2 = -1, length = array == null ? 0 : array.length;
      while (++index2 < length) {
        if (iteratee(array[index2], index2, array) === false) {
          break;
        }
      }
      return array;
    }
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index2];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    var baseFor = createBaseFor();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index2-- : ++index2 < length) {
        if (predicate(array[index2], index2, array)) {
          return index2;
        }
      }
      return -1;
    }
    function baseIsNaN(value2) {
      return value2 !== value2;
    }
    function strictIndexOf(array, value2, fromIndex) {
      var index2 = fromIndex - 1, length = array.length;
      while (++index2 < length) {
        if (array[index2] === value2) {
          return index2;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value2, fromIndex) {
      return value2 === value2 ? strictIndexOf(array, value2, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    var auto = function(tasks, concurrency, callback) {
      if (typeof concurrency === "function") {
        callback = concurrency;
        concurrency = null;
      }
      callback = once(callback || noop);
      var keys$$1 = keys(tasks);
      var numTasks = keys$$1.length;
      if (!numTasks) {
        return callback(null);
      }
      if (!concurrency) {
        concurrency = numTasks;
      }
      var results = {};
      var runningTasks = 0;
      var hasError = false;
      var listeners = Object.create(null);
      var readyTasks = [];
      var readyToCheck = [];
      var uncheckedDependencies = {};
      baseForOwn(tasks, function(task, key) {
        if (!isArray(task)) {
          enqueueTask(key, [task]);
          readyToCheck.push(key);
          return;
        }
        var dependencies = task.slice(0, task.length - 1);
        var remainingDependencies = dependencies.length;
        if (remainingDependencies === 0) {
          enqueueTask(key, task);
          readyToCheck.push(key);
          return;
        }
        uncheckedDependencies[key] = remainingDependencies;
        arrayEach(dependencies, function(dependencyName) {
          if (!tasks[dependencyName]) {
            throw new Error("async.auto task `" + key + "` has a non-existent dependency `" + dependencyName + "` in " + dependencies.join(", "));
          }
          addListener(dependencyName, function() {
            remainingDependencies--;
            if (remainingDependencies === 0) {
              enqueueTask(key, task);
            }
          });
        });
      });
      checkForDeadlocks();
      processQueue();
      function enqueueTask(key, task) {
        readyTasks.push(function() {
          runTask(key, task);
        });
      }
      function processQueue() {
        if (readyTasks.length === 0 && runningTasks === 0) {
          return callback(null, results);
        }
        while (readyTasks.length && runningTasks < concurrency) {
          var run = readyTasks.shift();
          run();
        }
      }
      function addListener(taskName, fn) {
        var taskListeners = listeners[taskName];
        if (!taskListeners) {
          taskListeners = listeners[taskName] = [];
        }
        taskListeners.push(fn);
      }
      function taskComplete(taskName) {
        var taskListeners = listeners[taskName] || [];
        arrayEach(taskListeners, function(fn) {
          fn();
        });
        processQueue();
      }
      function runTask(key, task) {
        if (hasError)
          return;
        var taskCallback = onlyOnce(function(err, result) {
          runningTasks--;
          if (arguments.length > 2) {
            result = slice(arguments, 1);
          }
          if (err) {
            var safeResults = {};
            baseForOwn(results, function(val, rkey) {
              safeResults[rkey] = val;
            });
            safeResults[key] = result;
            hasError = true;
            listeners = Object.create(null);
            callback(err, safeResults);
          } else {
            results[key] = result;
            taskComplete(key);
          }
        });
        runningTasks++;
        var taskFn = wrapAsync(task[task.length - 1]);
        if (task.length > 1) {
          taskFn(results, taskCallback);
        } else {
          taskFn(taskCallback);
        }
      }
      function checkForDeadlocks() {
        var currentTask;
        var counter = 0;
        while (readyToCheck.length) {
          currentTask = readyToCheck.pop();
          counter++;
          arrayEach(getDependents(currentTask), function(dependent) {
            if (--uncheckedDependencies[dependent] === 0) {
              readyToCheck.push(dependent);
            }
          });
        }
        if (counter !== numTasks) {
          throw new Error("async.auto cannot execute tasks due to a recursive dependency");
        }
      }
      function getDependents(taskName) {
        var result = [];
        baseForOwn(tasks, function(task, key) {
          if (isArray(task) && baseIndexOf(task, taskName, 0) >= 0) {
            result.push(key);
          }
        });
        return result;
      }
    };
    function arrayMap(array, iteratee) {
      var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index2 < length) {
        result[index2] = iteratee(array[index2], index2, array);
      }
      return result;
    }
    var symbolTag = "[object Symbol]";
    function isSymbol(value2) {
      return typeof value2 == "symbol" || isObjectLike(value2) && baseGetTag(value2) == symbolTag;
    }
    var INFINITY = 1 / 0;
    var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined;
    var symbolToString = symbolProto ? symbolProto.toString : undefined;
    function baseToString(value2) {
      if (typeof value2 == "string") {
        return value2;
      }
      if (isArray(value2)) {
        return arrayMap(value2, baseToString) + "";
      }
      if (isSymbol(value2)) {
        return symbolToString ? symbolToString.call(value2) : "";
      }
      var result = value2 + "";
      return result == "0" && 1 / value2 == -INFINITY ? "-0" : result;
    }
    function baseSlice(array, start, end) {
      var index2 = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index2 < length) {
        result[index2] = array[index2 + start];
      }
      return result;
    }
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index2 = strSymbols.length;
      while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
      }
      return index2;
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index2 = -1, length = strSymbols.length;
      while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
      }
      return index2;
    }
    function asciiToArray(string) {
      return string.split("");
    }
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsZWJ = "\\u200d";
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    var rsAstralRange$1 = "\\ud800-\\udfff";
    var rsComboMarksRange$1 = "\\u0300-\\u036f";
    var reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange$1 = "\\u20d0-\\u20ff";
    var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
    var rsVarRange$1 = "\\ufe0e\\ufe0f";
    var rsAstral = "[" + rsAstralRange$1 + "]";
    var rsCombo = "[" + rsComboRange$1 + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange$1 + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsZWJ$1 = "\\u200d";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange$1 + "]?";
    var rsOptJoin = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function toString(value2) {
      return value2 == null ? "" : baseToString(value2);
    }
    var reTrim = /^\s+|\s+$/g;
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, "");
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
      return castSlice(strSymbols, start, end).join("");
    }
    var FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /(=.+)?(\s*)$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    function parseParams(func) {
      func = func.toString().replace(STRIP_COMMENTS, "");
      func = func.match(FN_ARGS)[2].replace(" ", "");
      func = func ? func.split(FN_ARG_SPLIT) : [];
      func = func.map(function(arg) {
        return trim(arg.replace(FN_ARG, ""));
      });
      return func;
    }
    function autoInject(tasks, callback) {
      var newTasks = {};
      baseForOwn(tasks, function(taskFn, key) {
        var params;
        var fnIsAsync = isAsync(taskFn);
        var hasNoDeps = !fnIsAsync && taskFn.length === 1 || fnIsAsync && taskFn.length === 0;
        if (isArray(taskFn)) {
          params = taskFn.slice(0, -1);
          taskFn = taskFn[taskFn.length - 1];
          newTasks[key] = params.concat(params.length > 0 ? newTask : taskFn);
        } else if (hasNoDeps) {
          newTasks[key] = taskFn;
        } else {
          params = parseParams(taskFn);
          if (taskFn.length === 0 && !fnIsAsync && params.length === 0) {
            throw new Error("autoInject task functions require explicit parameters.");
          }
          if (!fnIsAsync)
            params.pop();
          newTasks[key] = params.concat(newTask);
        }
        function newTask(results, taskCb) {
          var newArgs = arrayMap(params, function(name2) {
            return results[name2];
          });
          newArgs.push(taskCb);
          wrapAsync(taskFn).apply(null, newArgs);
        }
      });
      auto(newTasks, callback);
    }
    function DLL() {
      this.head = this.tail = null;
      this.length = 0;
    }
    function setInitial(dll, node) {
      dll.length = 1;
      dll.head = dll.tail = node;
    }
    DLL.prototype.removeLink = function(node) {
      if (node.prev)
        node.prev.next = node.next;
      else
        this.head = node.next;
      if (node.next)
        node.next.prev = node.prev;
      else
        this.tail = node.prev;
      node.prev = node.next = null;
      this.length -= 1;
      return node;
    };
    DLL.prototype.empty = function() {
      while (this.head)
        this.shift();
      return this;
    };
    DLL.prototype.insertAfter = function(node, newNode) {
      newNode.prev = node;
      newNode.next = node.next;
      if (node.next)
        node.next.prev = newNode;
      else
        this.tail = newNode;
      node.next = newNode;
      this.length += 1;
    };
    DLL.prototype.insertBefore = function(node, newNode) {
      newNode.prev = node.prev;
      newNode.next = node;
      if (node.prev)
        node.prev.next = newNode;
      else
        this.head = newNode;
      node.prev = newNode;
      this.length += 1;
    };
    DLL.prototype.unshift = function(node) {
      if (this.head)
        this.insertBefore(this.head, node);
      else
        setInitial(this, node);
    };
    DLL.prototype.push = function(node) {
      if (this.tail)
        this.insertAfter(this.tail, node);
      else
        setInitial(this, node);
    };
    DLL.prototype.shift = function() {
      return this.head && this.removeLink(this.head);
    };
    DLL.prototype.pop = function() {
      return this.tail && this.removeLink(this.tail);
    };
    DLL.prototype.toArray = function() {
      var arr = Array(this.length);
      var curr = this.head;
      for (var idx = 0;idx < this.length; idx++) {
        arr[idx] = curr.data;
        curr = curr.next;
      }
      return arr;
    };
    DLL.prototype.remove = function(testFn) {
      var curr = this.head;
      while (curr) {
        var next = curr.next;
        if (testFn(curr)) {
          this.removeLink(curr);
        }
        curr = next;
      }
      return this;
    };
    function queue(worker, concurrency, payload) {
      if (concurrency == null) {
        concurrency = 1;
      } else if (concurrency === 0) {
        throw new Error("Concurrency must not be zero");
      }
      var _worker = wrapAsync(worker);
      var numRunning = 0;
      var workersList = [];
      var processingScheduled = false;
      function _insert(data, insertAtFront, callback) {
        if (callback != null && typeof callback !== "function") {
          throw new Error("task callback must be a function");
        }
        q.started = true;
        if (!isArray(data)) {
          data = [data];
        }
        if (data.length === 0 && q.idle()) {
          return setImmediate$1(function() {
            q.drain();
          });
        }
        for (var i2 = 0, l = data.length;i2 < l; i2++) {
          var item2 = {
            data: data[i2],
            callback: callback || noop
          };
          if (insertAtFront) {
            q._tasks.unshift(item2);
          } else {
            q._tasks.push(item2);
          }
        }
        if (!processingScheduled) {
          processingScheduled = true;
          setImmediate$1(function() {
            processingScheduled = false;
            q.process();
          });
        }
      }
      function _next(tasks) {
        return function(err) {
          numRunning -= 1;
          for (var i2 = 0, l = tasks.length;i2 < l; i2++) {
            var task = tasks[i2];
            var index2 = baseIndexOf(workersList, task, 0);
            if (index2 === 0) {
              workersList.shift();
            } else if (index2 > 0) {
              workersList.splice(index2, 1);
            }
            task.callback.apply(task, arguments);
            if (err != null) {
              q.error(err, task.data);
            }
          }
          if (numRunning <= q.concurrency - q.buffer) {
            q.unsaturated();
          }
          if (q.idle()) {
            q.drain();
          }
          q.process();
        };
      }
      var isProcessing = false;
      var q = {
        _tasks: new DLL,
        concurrency,
        payload,
        saturated: noop,
        unsaturated: noop,
        buffer: concurrency / 4,
        empty: noop,
        drain: noop,
        error: noop,
        started: false,
        paused: false,
        push: function(data, callback) {
          _insert(data, false, callback);
        },
        kill: function() {
          q.drain = noop;
          q._tasks.empty();
        },
        unshift: function(data, callback) {
          _insert(data, true, callback);
        },
        remove: function(testFn) {
          q._tasks.remove(testFn);
        },
        process: function() {
          if (isProcessing) {
            return;
          }
          isProcessing = true;
          while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
            var tasks = [], data = [];
            var l = q._tasks.length;
            if (q.payload)
              l = Math.min(l, q.payload);
            for (var i2 = 0;i2 < l; i2++) {
              var node = q._tasks.shift();
              tasks.push(node);
              workersList.push(node);
              data.push(node.data);
            }
            numRunning += 1;
            if (q._tasks.length === 0) {
              q.empty();
            }
            if (numRunning === q.concurrency) {
              q.saturated();
            }
            var cb = onlyOnce(_next(tasks));
            _worker(data, cb);
          }
          isProcessing = false;
        },
        length: function() {
          return q._tasks.length;
        },
        running: function() {
          return numRunning;
        },
        workersList: function() {
          return workersList;
        },
        idle: function() {
          return q._tasks.length + numRunning === 0;
        },
        pause: function() {
          q.paused = true;
        },
        resume: function() {
          if (q.paused === false) {
            return;
          }
          q.paused = false;
          setImmediate$1(q.process);
        }
      };
      return q;
    }
    function cargo(worker, payload) {
      return queue(worker, 1, payload);
    }
    var eachOfSeries = doLimit(eachOfLimit, 1);
    function reduce(coll, memo, iteratee, callback) {
      callback = once(callback || noop);
      var _iteratee = wrapAsync(iteratee);
      eachOfSeries(coll, function(x, i2, callback2) {
        _iteratee(memo, x, function(err, v) {
          memo = v;
          callback2(err);
        });
      }, function(err) {
        callback(err, memo);
      });
    }
    function seq() {
      var _functions = arrayMap(arguments, wrapAsync);
      return function() {
        var args = slice(arguments);
        var that = this;
        var cb = args[args.length - 1];
        if (typeof cb == "function") {
          args.pop();
        } else {
          cb = noop;
        }
        reduce(_functions, args, function(newargs, fn, cb2) {
          fn.apply(that, newargs.concat(function(err) {
            var nextargs = slice(arguments, 1);
            cb2(err, nextargs);
          }));
        }, function(err, results) {
          cb.apply(that, [err].concat(results));
        });
      };
    }
    var compose = function() {
      return seq.apply(null, slice(arguments).reverse());
    };
    var _concat = Array.prototype.concat;
    var concatLimit = function(coll, limit, iteratee, callback) {
      callback = callback || noop;
      var _iteratee = wrapAsync(iteratee);
      mapLimit(coll, limit, function(val, callback2) {
        _iteratee(val, function(err) {
          if (err)
            return callback2(err);
          return callback2(null, slice(arguments, 1));
        });
      }, function(err, mapResults) {
        var result = [];
        for (var i2 = 0;i2 < mapResults.length; i2++) {
          if (mapResults[i2]) {
            result = _concat.apply(result, mapResults[i2]);
          }
        }
        return callback(err, result);
      });
    };
    var concat = doLimit(concatLimit, Infinity);
    var concatSeries = doLimit(concatLimit, 1);
    var constant = function() {
      var values = slice(arguments);
      var args = [null].concat(values);
      return function() {
        var callback = arguments[arguments.length - 1];
        return callback.apply(this, args);
      };
    };
    function identity(value2) {
      return value2;
    }
    function _createTester(check, getResult) {
      return function(eachfn, arr, iteratee, cb) {
        cb = cb || noop;
        var testPassed = false;
        var testResult;
        eachfn(arr, function(value2, _, callback) {
          iteratee(value2, function(err, result) {
            if (err) {
              callback(err);
            } else if (check(result) && !testResult) {
              testPassed = true;
              testResult = getResult(true, value2);
              callback(null, breakLoop);
            } else {
              callback();
            }
          });
        }, function(err) {
          if (err) {
            cb(err);
          } else {
            cb(null, testPassed ? testResult : getResult(false));
          }
        });
      };
    }
    function _findGetResult(v, x) {
      return x;
    }
    var detect = doParallel(_createTester(identity, _findGetResult));
    var detectLimit = doParallelLimit(_createTester(identity, _findGetResult));
    var detectSeries = doLimit(detectLimit, 1);
    function consoleFunc(name2) {
      return function(fn) {
        var args = slice(arguments, 1);
        args.push(function(err) {
          var args2 = slice(arguments, 1);
          if (typeof console === "object") {
            if (err) {
              if (console.error) {
                console.error(err);
              }
            } else if (console[name2]) {
              arrayEach(args2, function(x) {
                console[name2](x);
              });
            }
          }
        });
        wrapAsync(fn).apply(null, args);
      };
    }
    var dir = consoleFunc("dir");
    function doDuring(fn, test, callback) {
      callback = onlyOnce(callback || noop);
      var _fn = wrapAsync(fn);
      var _test = wrapAsync(test);
      function next(err) {
        if (err)
          return callback(err);
        var args = slice(arguments, 1);
        args.push(check);
        _test.apply(this, args);
      }
      function check(err, truth) {
        if (err)
          return callback(err);
        if (!truth)
          return callback(null);
        _fn(next);
      }
      check(null, true);
    }
    function doWhilst(iteratee, test, callback) {
      callback = onlyOnce(callback || noop);
      var _iteratee = wrapAsync(iteratee);
      var next = function(err) {
        if (err)
          return callback(err);
        var args = slice(arguments, 1);
        if (test.apply(this, args))
          return _iteratee(next);
        callback.apply(null, [null].concat(args));
      };
      _iteratee(next);
    }
    function doUntil(iteratee, test, callback) {
      doWhilst(iteratee, function() {
        return !test.apply(this, arguments);
      }, callback);
    }
    function during(test, fn, callback) {
      callback = onlyOnce(callback || noop);
      var _fn = wrapAsync(fn);
      var _test = wrapAsync(test);
      function next(err) {
        if (err)
          return callback(err);
        _test(check);
      }
      function check(err, truth) {
        if (err)
          return callback(err);
        if (!truth)
          return callback(null);
        _fn(next);
      }
      _test(check);
    }
    function _withoutIndex(iteratee) {
      return function(value2, index2, callback) {
        return iteratee(value2, callback);
      };
    }
    function eachLimit(coll, iteratee, callback) {
      eachOf(coll, _withoutIndex(wrapAsync(iteratee)), callback);
    }
    function eachLimit$1(coll, limit, iteratee, callback) {
      _eachOfLimit(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
    }
    var eachSeries = doLimit(eachLimit$1, 1);
    function ensureAsync(fn) {
      if (isAsync(fn))
        return fn;
      return initialParams(function(args, callback) {
        var sync = true;
        args.push(function() {
          var innerArgs = arguments;
          if (sync) {
            setImmediate$1(function() {
              callback.apply(null, innerArgs);
            });
          } else {
            callback.apply(null, innerArgs);
          }
        });
        fn.apply(this, args);
        sync = false;
      });
    }
    function notId(v) {
      return !v;
    }
    var every = doParallel(_createTester(notId, notId));
    var everyLimit = doParallelLimit(_createTester(notId, notId));
    var everySeries = doLimit(everyLimit, 1);
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }
    function filterArray(eachfn, arr, iteratee, callback) {
      var truthValues = new Array(arr.length);
      eachfn(arr, function(x, index2, callback2) {
        iteratee(x, function(err, v) {
          truthValues[index2] = !!v;
          callback2(err);
        });
      }, function(err) {
        if (err)
          return callback(err);
        var results = [];
        for (var i2 = 0;i2 < arr.length; i2++) {
          if (truthValues[i2])
            results.push(arr[i2]);
        }
        callback(null, results);
      });
    }
    function filterGeneric(eachfn, coll, iteratee, callback) {
      var results = [];
      eachfn(coll, function(x, index2, callback2) {
        iteratee(x, function(err, v) {
          if (err) {
            callback2(err);
          } else {
            if (v) {
              results.push({ index: index2, value: x });
            }
            callback2();
          }
        });
      }, function(err) {
        if (err) {
          callback(err);
        } else {
          callback(null, arrayMap(results.sort(function(a, b) {
            return a.index - b.index;
          }), baseProperty("value")));
        }
      });
    }
    function _filter(eachfn, coll, iteratee, callback) {
      var filter2 = isArrayLike(coll) ? filterArray : filterGeneric;
      filter2(eachfn, coll, wrapAsync(iteratee), callback || noop);
    }
    var filter = doParallel(_filter);
    var filterLimit = doParallelLimit(_filter);
    var filterSeries = doLimit(filterLimit, 1);
    function forever(fn, errback) {
      var done = onlyOnce(errback || noop);
      var task = wrapAsync(ensureAsync(fn));
      function next(err) {
        if (err)
          return done(err);
        task(next);
      }
      next();
    }
    var groupByLimit = function(coll, limit, iteratee, callback) {
      callback = callback || noop;
      var _iteratee = wrapAsync(iteratee);
      mapLimit(coll, limit, function(val, callback2) {
        _iteratee(val, function(err, key) {
          if (err)
            return callback2(err);
          return callback2(null, { key, val });
        });
      }, function(err, mapResults) {
        var result = {};
        var hasOwnProperty2 = Object.prototype.hasOwnProperty;
        for (var i2 = 0;i2 < mapResults.length; i2++) {
          if (mapResults[i2]) {
            var key = mapResults[i2].key;
            var val = mapResults[i2].val;
            if (hasOwnProperty2.call(result, key)) {
              result[key].push(val);
            } else {
              result[key] = [val];
            }
          }
        }
        return callback(err, result);
      });
    };
    var groupBy = doLimit(groupByLimit, Infinity);
    var groupBySeries = doLimit(groupByLimit, 1);
    var log = consoleFunc("log");
    function mapValuesLimit(obj, limit, iteratee, callback) {
      callback = once(callback || noop);
      var newObj = {};
      var _iteratee = wrapAsync(iteratee);
      eachOfLimit(obj, limit, function(val, key, next) {
        _iteratee(val, key, function(err, result) {
          if (err)
            return next(err);
          newObj[key] = result;
          next();
        });
      }, function(err) {
        callback(err, newObj);
      });
    }
    var mapValues = doLimit(mapValuesLimit, Infinity);
    var mapValuesSeries = doLimit(mapValuesLimit, 1);
    function has(obj, key) {
      return key in obj;
    }
    function memoize(fn, hasher) {
      var memo = Object.create(null);
      var queues = Object.create(null);
      hasher = hasher || identity;
      var _fn = wrapAsync(fn);
      var memoized = initialParams(function memoized(args, callback) {
        var key = hasher.apply(null, args);
        if (has(memo, key)) {
          setImmediate$1(function() {
            callback.apply(null, memo[key]);
          });
        } else if (has(queues, key)) {
          queues[key].push(callback);
        } else {
          queues[key] = [callback];
          _fn.apply(null, args.concat(function() {
            var args2 = slice(arguments);
            memo[key] = args2;
            var q = queues[key];
            delete queues[key];
            for (var i2 = 0, l = q.length;i2 < l; i2++) {
              q[i2].apply(null, args2);
            }
          }));
        }
      });
      memoized.memo = memo;
      memoized.unmemoized = fn;
      return memoized;
    }
    var _defer$1;
    if (hasNextTick) {
      _defer$1 = process.nextTick;
    } else if (hasSetImmediate) {
      _defer$1 = setImmediate;
    } else {
      _defer$1 = fallback;
    }
    var nextTick = wrap(_defer$1);
    function _parallel(eachfn, tasks, callback) {
      callback = callback || noop;
      var results = isArrayLike(tasks) ? [] : {};
      eachfn(tasks, function(task, key, callback2) {
        wrapAsync(task)(function(err, result) {
          if (arguments.length > 2) {
            result = slice(arguments, 1);
          }
          results[key] = result;
          callback2(err);
        });
      }, function(err) {
        callback(err, results);
      });
    }
    function parallelLimit(tasks, callback) {
      _parallel(eachOf, tasks, callback);
    }
    function parallelLimit$1(tasks, limit, callback) {
      _parallel(_eachOfLimit(limit), tasks, callback);
    }
    var queue$1 = function(worker, concurrency) {
      var _worker = wrapAsync(worker);
      return queue(function(items, cb) {
        _worker(items[0], cb);
      }, concurrency, 1);
    };
    var priorityQueue = function(worker, concurrency) {
      var q = queue$1(worker, concurrency);
      q.push = function(data, priority, callback) {
        if (callback == null)
          callback = noop;
        if (typeof callback !== "function") {
          throw new Error("task callback must be a function");
        }
        q.started = true;
        if (!isArray(data)) {
          data = [data];
        }
        if (data.length === 0) {
          return setImmediate$1(function() {
            q.drain();
          });
        }
        priority = priority || 0;
        var nextNode = q._tasks.head;
        while (nextNode && priority >= nextNode.priority) {
          nextNode = nextNode.next;
        }
        for (var i2 = 0, l = data.length;i2 < l; i2++) {
          var item2 = {
            data: data[i2],
            priority,
            callback
          };
          if (nextNode) {
            q._tasks.insertBefore(nextNode, item2);
          } else {
            q._tasks.push(item2);
          }
        }
        setImmediate$1(q.process);
      };
      delete q.unshift;
      return q;
    };
    function race(tasks, callback) {
      callback = once(callback || noop);
      if (!isArray(tasks))
        return callback(new TypeError("First argument to race must be an array of functions"));
      if (!tasks.length)
        return callback();
      for (var i2 = 0, l = tasks.length;i2 < l; i2++) {
        wrapAsync(tasks[i2])(callback);
      }
    }
    function reduceRight(array, memo, iteratee, callback) {
      var reversed = slice(array).reverse();
      reduce(reversed, memo, iteratee, callback);
    }
    function reflect(fn) {
      var _fn = wrapAsync(fn);
      return initialParams(function reflectOn(args, reflectCallback) {
        args.push(function callback(error, cbArg) {
          if (error) {
            reflectCallback(null, { error });
          } else {
            var value2;
            if (arguments.length <= 2) {
              value2 = cbArg;
            } else {
              value2 = slice(arguments, 1);
            }
            reflectCallback(null, { value: value2 });
          }
        });
        return _fn.apply(this, args);
      });
    }
    function reflectAll(tasks) {
      var results;
      if (isArray(tasks)) {
        results = arrayMap(tasks, reflect);
      } else {
        results = {};
        baseForOwn(tasks, function(task, key) {
          results[key] = reflect.call(this, task);
        });
      }
      return results;
    }
    function reject$1(eachfn, arr, iteratee, callback) {
      _filter(eachfn, arr, function(value2, cb) {
        iteratee(value2, function(err, v) {
          cb(err, !v);
        });
      }, callback);
    }
    var reject = doParallel(reject$1);
    var rejectLimit = doParallelLimit(reject$1);
    var rejectSeries = doLimit(rejectLimit, 1);
    function constant$1(value2) {
      return function() {
        return value2;
      };
    }
    function retry(opts, task, callback) {
      var DEFAULT_TIMES = 5;
      var DEFAULT_INTERVAL = 0;
      var options = {
        times: DEFAULT_TIMES,
        intervalFunc: constant$1(DEFAULT_INTERVAL)
      };
      function parseTimes(acc, t) {
        if (typeof t === "object") {
          acc.times = +t.times || DEFAULT_TIMES;
          acc.intervalFunc = typeof t.interval === "function" ? t.interval : constant$1(+t.interval || DEFAULT_INTERVAL);
          acc.errorFilter = t.errorFilter;
        } else if (typeof t === "number" || typeof t === "string") {
          acc.times = +t || DEFAULT_TIMES;
        } else {
          throw new Error("Invalid arguments for async.retry");
        }
      }
      if (arguments.length < 3 && typeof opts === "function") {
        callback = task || noop;
        task = opts;
      } else {
        parseTimes(options, opts);
        callback = callback || noop;
      }
      if (typeof task !== "function") {
        throw new Error("Invalid arguments for async.retry");
      }
      var _task = wrapAsync(task);
      var attempt = 1;
      function retryAttempt() {
        _task(function(err) {
          if (err && attempt++ < options.times && (typeof options.errorFilter != "function" || options.errorFilter(err))) {
            setTimeout(retryAttempt, options.intervalFunc(attempt));
          } else {
            callback.apply(null, arguments);
          }
        });
      }
      retryAttempt();
    }
    var retryable = function(opts, task) {
      if (!task) {
        task = opts;
        opts = null;
      }
      var _task = wrapAsync(task);
      return initialParams(function(args, callback) {
        function taskFn(cb) {
          _task.apply(null, args.concat(cb));
        }
        if (opts)
          retry(opts, taskFn, callback);
        else
          retry(taskFn, callback);
      });
    };
    function series(tasks, callback) {
      _parallel(eachOfSeries, tasks, callback);
    }
    var some = doParallel(_createTester(Boolean, identity));
    var someLimit = doParallelLimit(_createTester(Boolean, identity));
    var someSeries = doLimit(someLimit, 1);
    function sortBy(coll, iteratee, callback) {
      var _iteratee = wrapAsync(iteratee);
      map(coll, function(x, callback2) {
        _iteratee(x, function(err, criteria) {
          if (err)
            return callback2(err);
          callback2(null, { value: x, criteria });
        });
      }, function(err, results) {
        if (err)
          return callback(err);
        callback(null, arrayMap(results.sort(comparator), baseProperty("value")));
      });
      function comparator(left, right) {
        var a = left.criteria, b = right.criteria;
        return a < b ? -1 : a > b ? 1 : 0;
      }
    }
    function timeout(asyncFn, milliseconds, info) {
      var fn = wrapAsync(asyncFn);
      return initialParams(function(args, callback) {
        var timedOut = false;
        var timer;
        function timeoutCallback() {
          var name2 = asyncFn.name || "anonymous";
          var error = new Error('Callback function "' + name2 + '" timed out.');
          error.code = "ETIMEDOUT";
          if (info) {
            error.info = info;
          }
          timedOut = true;
          callback(error);
        }
        args.push(function() {
          if (!timedOut) {
            callback.apply(null, arguments);
            clearTimeout(timer);
          }
        });
        timer = setTimeout(timeoutCallback, milliseconds);
        fn.apply(null, args);
      });
    }
    var nativeCeil = Math.ceil;
    var nativeMax = Math.max;
    function baseRange(start, end, step, fromRight) {
      var index2 = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
      while (length--) {
        result[fromRight ? length : ++index2] = start;
        start += step;
      }
      return result;
    }
    function timeLimit(count, limit, iteratee, callback) {
      var _iteratee = wrapAsync(iteratee);
      mapLimit(baseRange(0, count, 1), limit, _iteratee, callback);
    }
    var times = doLimit(timeLimit, Infinity);
    var timesSeries = doLimit(timeLimit, 1);
    function transform(coll, accumulator, iteratee, callback) {
      if (arguments.length <= 3) {
        callback = iteratee;
        iteratee = accumulator;
        accumulator = isArray(coll) ? [] : {};
      }
      callback = once(callback || noop);
      var _iteratee = wrapAsync(iteratee);
      eachOf(coll, function(v, k, cb) {
        _iteratee(accumulator, v, k, cb);
      }, function(err) {
        callback(err, accumulator);
      });
    }
    function tryEach(tasks, callback) {
      var error = null;
      var result;
      callback = callback || noop;
      eachSeries(tasks, function(task, callback2) {
        wrapAsync(task)(function(err, res) {
          if (arguments.length > 2) {
            result = slice(arguments, 1);
          } else {
            result = res;
          }
          error = err;
          callback2(!err);
        });
      }, function() {
        callback(error, result);
      });
    }
    function unmemoize(fn) {
      return function() {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    }
    function whilst(test, iteratee, callback) {
      callback = onlyOnce(callback || noop);
      var _iteratee = wrapAsync(iteratee);
      if (!test())
        return callback(null);
      var next = function(err) {
        if (err)
          return callback(err);
        if (test())
          return _iteratee(next);
        var args = slice(arguments, 1);
        callback.apply(null, [null].concat(args));
      };
      _iteratee(next);
    }
    function until(test, iteratee, callback) {
      whilst(function() {
        return !test.apply(this, arguments);
      }, iteratee, callback);
    }
    var waterfall = function(tasks, callback) {
      callback = once(callback || noop);
      if (!isArray(tasks))
        return callback(new Error("First argument to waterfall must be an array of functions"));
      if (!tasks.length)
        return callback();
      var taskIndex = 0;
      function nextTask(args) {
        var task = wrapAsync(tasks[taskIndex++]);
        args.push(onlyOnce(next));
        task.apply(null, args);
      }
      function next(err) {
        if (err || taskIndex === tasks.length) {
          return callback.apply(null, arguments);
        }
        nextTask(slice(arguments, 1));
      }
      nextTask([]);
    };
    var index = {
      apply,
      applyEach,
      applyEachSeries,
      asyncify,
      auto,
      autoInject,
      cargo,
      compose,
      concat,
      concatLimit,
      concatSeries,
      constant,
      detect,
      detectLimit,
      detectSeries,
      dir,
      doDuring,
      doUntil,
      doWhilst,
      during,
      each: eachLimit,
      eachLimit: eachLimit$1,
      eachOf,
      eachOfLimit,
      eachOfSeries,
      eachSeries,
      ensureAsync,
      every,
      everyLimit,
      everySeries,
      filter,
      filterLimit,
      filterSeries,
      forever,
      groupBy,
      groupByLimit,
      groupBySeries,
      log,
      map,
      mapLimit,
      mapSeries,
      mapValues,
      mapValuesLimit,
      mapValuesSeries,
      memoize,
      nextTick,
      parallel: parallelLimit,
      parallelLimit: parallelLimit$1,
      priorityQueue,
      queue: queue$1,
      race,
      reduce,
      reduceRight,
      reflect,
      reflectAll,
      reject,
      rejectLimit,
      rejectSeries,
      retry,
      retryable,
      seq,
      series,
      setImmediate: setImmediate$1,
      some,
      someLimit,
      someSeries,
      sortBy,
      timeout,
      times,
      timesLimit: timeLimit,
      timesSeries,
      transform,
      tryEach,
      unmemoize,
      until,
      waterfall,
      whilst,
      all: every,
      allLimit: everyLimit,
      allSeries: everySeries,
      any: some,
      anyLimit: someLimit,
      anySeries: someSeries,
      find: detect,
      findLimit: detectLimit,
      findSeries: detectSeries,
      forEach: eachLimit,
      forEachSeries: eachSeries,
      forEachLimit: eachLimit$1,
      forEachOf: eachOf,
      forEachOfSeries: eachOfSeries,
      forEachOfLimit: eachOfLimit,
      inject: reduce,
      foldl: reduce,
      foldr: reduceRight,
      select: filter,
      selectLimit: filterLimit,
      selectSeries: filterSeries,
      wrapSync: asyncify
    };
    exports2["default"] = index;
    exports2.apply = apply;
    exports2.applyEach = applyEach;
    exports2.applyEachSeries = applyEachSeries;
    exports2.asyncify = asyncify;
    exports2.auto = auto;
    exports2.autoInject = autoInject;
    exports2.cargo = cargo;
    exports2.compose = compose;
    exports2.concat = concat;
    exports2.concatLimit = concatLimit;
    exports2.concatSeries = concatSeries;
    exports2.constant = constant;
    exports2.detect = detect;
    exports2.detectLimit = detectLimit;
    exports2.detectSeries = detectSeries;
    exports2.dir = dir;
    exports2.doDuring = doDuring;
    exports2.doUntil = doUntil;
    exports2.doWhilst = doWhilst;
    exports2.during = during;
    exports2.each = eachLimit;
    exports2.eachLimit = eachLimit$1;
    exports2.eachOf = eachOf;
    exports2.eachOfLimit = eachOfLimit;
    exports2.eachOfSeries = eachOfSeries;
    exports2.eachSeries = eachSeries;
    exports2.ensureAsync = ensureAsync;
    exports2.every = every;
    exports2.everyLimit = everyLimit;
    exports2.everySeries = everySeries;
    exports2.filter = filter;
    exports2.filterLimit = filterLimit;
    exports2.filterSeries = filterSeries;
    exports2.forever = forever;
    exports2.groupBy = groupBy;
    exports2.groupByLimit = groupByLimit;
    exports2.groupBySeries = groupBySeries;
    exports2.log = log;
    exports2.map = map;
    exports2.mapLimit = mapLimit;
    exports2.mapSeries = mapSeries;
    exports2.mapValues = mapValues;
    exports2.mapValuesLimit = mapValuesLimit;
    exports2.mapValuesSeries = mapValuesSeries;
    exports2.memoize = memoize;
    exports2.nextTick = nextTick;
    exports2.parallel = parallelLimit;
    exports2.parallelLimit = parallelLimit$1;
    exports2.priorityQueue = priorityQueue;
    exports2.queue = queue$1;
    exports2.race = race;
    exports2.reduce = reduce;
    exports2.reduceRight = reduceRight;
    exports2.reflect = reflect;
    exports2.reflectAll = reflectAll;
    exports2.reject = reject;
    exports2.rejectLimit = rejectLimit;
    exports2.rejectSeries = rejectSeries;
    exports2.retry = retry;
    exports2.retryable = retryable;
    exports2.seq = seq;
    exports2.series = series;
    exports2.setImmediate = setImmediate$1;
    exports2.some = some;
    exports2.someLimit = someLimit;
    exports2.someSeries = someSeries;
    exports2.sortBy = sortBy;
    exports2.timeout = timeout;
    exports2.times = times;
    exports2.timesLimit = timeLimit;
    exports2.timesSeries = timesSeries;
    exports2.transform = transform;
    exports2.tryEach = tryEach;
    exports2.unmemoize = unmemoize;
    exports2.until = until;
    exports2.waterfall = waterfall;
    exports2.whilst = whilst;
    exports2.all = every;
    exports2.allLimit = everyLimit;
    exports2.allSeries = everySeries;
    exports2.any = some;
    exports2.anyLimit = someLimit;
    exports2.anySeries = someSeries;
    exports2.find = detect;
    exports2.findLimit = detectLimit;
    exports2.findSeries = detectSeries;
    exports2.forEach = eachLimit;
    exports2.forEachSeries = eachSeries;
    exports2.forEachLimit = eachLimit$1;
    exports2.forEachOf = eachOf;
    exports2.forEachOfSeries = eachOfSeries;
    exports2.forEachOfLimit = eachOfLimit;
    exports2.inject = reduce;
    exports2.foldl = reduce;
    exports2.foldr = reduceRight;
    exports2.select = filter;
    exports2.selectLimit = filterLimit;
    exports2.selectSeries = filterSeries;
    exports2.wrapSync = asyncify;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
});

// node_modules/isstream/isstream.js
var require_isstream = __commonJS((exports, module) => {
  function isStream(obj) {
    return obj instanceof stream.Stream;
  }
  function isReadable(obj) {
    return isStream(obj) && typeof obj._read == "function" && typeof obj._readableState == "object";
  }
  function isWritable(obj) {
    return isStream(obj) && typeof obj._write == "function" && typeof obj._writableState == "object";
  }
  function isDuplex(obj) {
    return isReadable(obj) && isWritable(obj);
  }
  var stream = __require("stream");
  module.exports = isStream;
  module.exports.isReadable = isReadable;
  module.exports.isWritable = isWritable;
  module.exports.isDuplex = isDuplex;
});

// node_modules/winston/lib/winston/transports/file.js
var require_file = __commonJS((exports) => {
  var events = __require("events");
  var fs = __require("fs");
  var path2 = __require("path");
  var util = __require("util");
  var async = require_async();
  var zlib = __require("zlib");
  var common = require_common();
  var Transport = require_transport().Transport;
  var isWritable = require_isstream().isWritable;
  var Stream = __require("stream").Stream;
  var os = __require("os");
  var File = exports.File = function(options) {
    var self2 = this;
    Transport.call(this, options);
    function throwIf(target) {
      Array.prototype.slice.call(arguments, 1).forEach(function(name2) {
        if (options[name2]) {
          throw new Error("Cannot set " + name2 + " and " + target + "together");
        }
      });
    }
    if (options.filename || options.dirname) {
      throwIf("filename or dirname", "stream");
      this._basename = this.filename = options.filename ? path2.basename(options.filename) : "winston.log";
      this.dirname = options.dirname || path2.dirname(options.filename);
      this.options = options.options || { flags: "a" };
      this.options.highWaterMark = this.options.highWaterMark || 24;
    } else if (options.stream) {
      throwIf("stream", "filename", "maxsize");
      this._stream = options.stream;
      this._isStreams2 = isWritable(this._stream);
      this._stream.on("error", function(error) {
        self2.emit("error", error);
      });
      this._stream.setMaxListeners(Infinity);
    } else {
      throw new Error("Cannot log to file without filename or stream.");
    }
    this.json = options.json !== false;
    this.logstash = options.logstash || false;
    this.colorize = options.colorize || false;
    this.maxsize = options.maxsize || null;
    this.rotationFormat = options.rotationFormat || false;
    this.zippedArchive = options.zippedArchive || false;
    this.maxFiles = options.maxFiles || null;
    this.prettyPrint = options.prettyPrint || false;
    this.label = options.label || null;
    this.timestamp = options.timestamp != null ? options.timestamp : true;
    this.eol = options.eol || os.EOL;
    this.tailable = options.tailable || false;
    this.depth = options.depth || null;
    this.showLevel = options.showLevel === undefined ? true : options.showLevel;
    this.maxRetries = options.maxRetries || 2;
    if (this.json) {
      this.stringify = options.stringify;
    }
    this._size = 0;
    this._created = 0;
    this._buffer = [];
    this._draining = false;
    this._opening = false;
    this._failures = 0;
    this._archive = null;
  };
  util.inherits(File, Transport);
  File.prototype.name = "file";
  File.prototype.log = function(level, msg, meta, callback) {
    if (this.silent) {
      return callback(null, true);
    }
    if (this._failures >= this.maxRetries) {
      return callback(new Error("Transport is in a failed state."));
    }
    var self2 = this;
    if (typeof msg !== "string") {
      msg = "" + msg;
    }
    var output = common.log({
      level,
      message: msg,
      meta,
      json: this.json,
      logstash: this.logstash,
      colorize: this.colorize,
      prettyPrint: this.prettyPrint,
      timestamp: this.timestamp,
      showLevel: this.showLevel,
      stringify: this.stringify,
      label: this.label,
      depth: this.depth,
      formatter: this.formatter,
      humanReadableUnhandledException: this.humanReadableUnhandledException
    });
    if (typeof output === "string") {
      output += this.eol;
    }
    if (!this.filename) {
      this._write(output, callback);
      this._size += output.length;
      this._lazyDrain();
    } else {
      this.open(function(err) {
        if (err) {
          return self2._buffer.push([output, callback]);
        }
        self2._write(output, callback);
        self2._size += output.length;
        self2._lazyDrain();
      });
    }
  };
  File.prototype._write = function(data, callback) {
    if (this._isStreams2) {
      this._stream.write(data);
      return callback && process.nextTick(function() {
        callback(null, true);
      });
    }
    var ret = this._stream.write(data);
    if (!callback)
      return;
    if (ret === false) {
      return this._stream.once("drain", function() {
        callback(null, true);
      });
    }
    process.nextTick(function() {
      callback(null, true);
    });
  };
  File.prototype.query = function(options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    var file = path2.join(this.dirname, this.filename), options = this.normalizeQuery(options), buff = "", results = [], row = 0;
    var stream = fs.createReadStream(file, {
      encoding: "utf8"
    });
    stream.on("error", function(err) {
      if (stream.readable) {
        stream.destroy();
      }
      if (!callback)
        return;
      return err.code !== "ENOENT" ? callback(err) : callback(null, results);
    });
    stream.on("data", function(data) {
      var data = (buff + data).split(/\n+/), l = data.length - 1, i2 = 0;
      for (;i2 < l; i2++) {
        if (!options.start || row >= options.start) {
          add(data[i2]);
        }
        row++;
      }
      buff = data[l];
    });
    stream.on("close", function() {
      if (buff)
        add(buff, true);
      if (options.order === "desc") {
        results = results.reverse();
      }
      if (callback)
        callback(null, results);
    });
    function add(buff2, attempt) {
      try {
        var log = JSON.parse(buff2);
        if (check(log))
          push(log);
      } catch (e) {
        if (!attempt) {
          stream.emit("error", e);
        }
      }
    }
    function push(log) {
      if (options.rows && results.length >= options.rows && options.order != "desc") {
        if (stream.readable) {
          stream.destroy();
        }
        return;
      }
      if (options.fields) {
        var obj = {};
        options.fields.forEach(function(key) {
          obj[key] = log[key];
        });
        log = obj;
      }
      if (options.order === "desc") {
        if (results.length >= options.rows) {
          results.shift();
        }
      }
      results.push(log);
    }
    function check(log) {
      if (!log)
        return;
      if (typeof log !== "object")
        return;
      var time = new Date(log.timestamp);
      if (options.from && time < options.from || options.until && time > options.until || options.level && options.level !== log.level) {
        return;
      }
      return true;
    }
  };
  File.prototype.stream = function(options) {
    var file = path2.join(this.dirname, this.filename), options = options || {}, stream = new Stream;
    var tail = {
      file,
      start: options.start
    };
    stream.destroy = common.tailFile(tail, function(err, line) {
      if (err) {
        return stream.emit("error", err);
      }
      try {
        stream.emit("data", line);
        line = JSON.parse(line);
        stream.emit("log", line);
      } catch (e) {
        stream.emit("error", e);
      }
    });
    return stream;
  };
  File.prototype.open = function(callback) {
    if (this.opening) {
      return callback(true);
    } else if (!this._stream || this.maxsize && this._size >= this.maxsize) {
      callback(true);
      return this._createStream();
    }
    this._archive = this.zippedArchive ? this._stream.path : null;
    callback();
  };
  File.prototype.close = function() {
    var self2 = this;
    if (this._stream) {
      this._stream.end();
      this._stream.destroySoon();
      this._stream.once("finish", function() {
        self2.emit("flush");
        self2.emit("closed");
      });
    }
  };
  File.prototype.flush = function() {
    var self2 = this;
    if (!this._buffer.length) {
      return self2.emit("flush");
    }
    this._buffer.forEach(function(item2) {
      var str = item2[0], callback = item2[1];
      process.nextTick(function() {
        self2._write(str, callback);
        self2._size += str.length;
      });
    });
    self2._buffer.length = 0;
    self2._stream.once("drain", function() {
      self2.emit("flush");
      self2.emit("logged");
    });
  };
  File.prototype._createStream = function() {
    var self2 = this;
    this.opening = true;
    (function checkFile(target) {
      var fullname = path2.join(self2.dirname, target);
      function createAndFlush(size) {
        if (self2._stream) {
          self2._stream.end();
          self2._stream.destroySoon();
        }
        self2._size = size;
        self2.filename = target;
        self2._stream = fs.createWriteStream(fullname, self2.options);
        self2._isStreams2 = isWritable(self2._stream);
        self2._stream.on("error", function(error) {
          if (self2._failures < self2.maxRetries) {
            self2._createStream();
            self2._failures++;
          } else {
            self2.emit("error", error);
          }
        });
        self2._stream.setMaxListeners(Infinity);
        self2.once("flush", function() {
          self2.flush();
          self2.opening = false;
          self2.emit("open", fullname);
        });
        self2.flush();
        compressFile();
      }
      function compressFile() {
        if (self2._archive) {
          var gzip = zlib.createGzip();
          var inp = fs.createReadStream(String(self2._archive));
          var out = fs.createWriteStream(self2._archive + ".gz");
          inp.pipe(gzip).pipe(out);
          fs.unlink(String(self2._archive), function() {
          });
          self2._archive = "";
        }
      }
      fs.stat(fullname, function(err, stats) {
        if (err) {
          if (err.code !== "ENOENT") {
            return self2.emit("error", err);
          }
          return createAndFlush(0);
        }
        if (!stats || self2.maxsize && stats.size >= self2.maxsize) {
          return self2._incFile(function() {
            checkFile(self2._getFile());
          });
        }
        createAndFlush(stats.size);
      });
    })(this._getFile());
  };
  File.prototype._incFile = function(callback) {
    var ext = path2.extname(this._basename), basename = path2.basename(this._basename, ext), oldest, target;
    if (!this.tailable) {
      this._created += 1;
      this._checkMaxFilesIncrementing(ext, basename, callback);
    } else {
      this._checkMaxFilesTailable(ext, basename, callback);
    }
  };
  File.prototype._getFile = function() {
    var ext = path2.extname(this._basename), basename = path2.basename(this._basename, ext);
    return !this.tailable && this._created ? basename + (this.rotationFormat ? this.rotationFormat() : this._created) + ext : basename + ext;
  };
  File.prototype._checkMaxFilesIncrementing = function(ext, basename, callback) {
    var oldest, target, self2 = this;
    if (self2.zippedArchive) {
      self2._archive = path2.join(self2.dirname, basename + (self2._created === 1 ? "" : self2._created - 1) + ext);
    }
    if (!self2.maxFiles || self2._created < self2.maxFiles) {
      return callback();
    }
    oldest = self2._created - self2.maxFiles;
    target = path2.join(self2.dirname, basename + (oldest !== 0 ? oldest : "") + ext + (self2.zippedArchive ? ".gz" : ""));
    fs.unlink(target, callback);
  };
  File.prototype._checkMaxFilesTailable = function(ext, basename, callback) {
    var tasks = [], self2 = this;
    if (!this.maxFiles)
      return;
    for (var x = this.maxFiles - 1;x > 0; x--) {
      tasks.push(function(i2) {
        return function(cb) {
          var tmppath = path2.join(self2.dirname, basename + (i2 - 1) + ext + (self2.zippedArchive ? ".gz" : ""));
          fs.exists(tmppath, function(exists) {
            if (!exists) {
              return cb(null);
            }
            fs.rename(tmppath, path2.join(self2.dirname, basename + i2 + ext + (self2.zippedArchive ? ".gz" : "")), cb);
          });
        };
      }(x));
    }
    if (self2.zippedArchive) {
      self2._archive = path2.join(self2.dirname, basename + 1 + ext);
    }
    async.series(tasks, function(err) {
      fs.rename(path2.join(self2.dirname, basename + ext), path2.join(self2.dirname, basename + 1 + ext), callback);
    });
  };
  File.prototype._lazyDrain = function() {
    var self2 = this;
    if (!this._draining && this._stream) {
      this._draining = true;
      this._stream.once("drain", function() {
        self2._draining = false;
        self2.emit("logged");
      });
    }
  };
});

// node_modules/winston/lib/winston/transports/http.js
var require_http = __commonJS((exports) => {
  var util = __require("util");
  var winston = require_winston();
  var http = __require("http");
  var https = __require("https");
  var Stream = __require("stream").Stream;
  var Transport = require_transport().Transport;
  var Http = exports.Http = function(options) {
    Transport.call(this, options);
    options = options || {};
    this.name = "http";
    this.ssl = !!options.ssl;
    this.host = options.host || "localhost";
    this.port = options.port;
    this.auth = options.auth;
    this.path = options.path || "";
    this.agent = options.agent;
    this.headers = options.headers || {};
    this.headers["content-type"] = "application/json";
    if (!this.port) {
      this.port = this.ssl ? 443 : 80;
    }
  };
  util.inherits(Http, winston.Transport);
  Http.prototype.name = "http";
  Http.prototype._request = function(options, callback) {
    options = options || {};
    var auth = options.auth || this.auth, path2 = options.path || this.path || "", req;
    delete options.auth;
    delete options.path;
    req = (this.ssl ? https : http).request({
      host: this.host,
      port: this.port,
      path: "/" + path2.replace(/^\//, ""),
      method: "POST",
      headers: this.headers,
      agent: this.agent,
      auth: auth ? auth.username + ":" + auth.password : ""
    });
    req.on("error", callback);
    req.on("response", function(res) {
      var body = "";
      res.on("data", function(chunk) {
        body += chunk;
      });
      res.on("end", function() {
        callback(null, res, body);
      });
      res.resume();
    });
    req.end(new Buffer.from(JSON.stringify(options), "utf8"));
  };
  Http.prototype.log = function(level, msg, meta, callback) {
    var self2 = this;
    if (typeof meta === "function") {
      callback = meta;
      meta = {};
    }
    var options = {
      method: "collect",
      params: {
        level,
        message: msg,
        meta
      }
    };
    if (meta) {
      if (meta.path) {
        options.path = meta.path;
        delete meta.path;
      }
      if (meta.auth) {
        options.auth = meta.auth;
        delete meta.auth;
      }
    }
    this._request(options, function(err, res) {
      if (res && res.statusCode !== 200) {
        err = new Error("HTTP Status Code: " + res.statusCode);
      }
      if (err)
        return callback(err);
      self2.emit("logged");
      if (callback)
        callback(null, true);
    });
  };
  Http.prototype.query = function(options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    var self2 = this, options = this.normalizeQuery(options);
    options = {
      method: "query",
      params: options
    };
    if (options.params.path) {
      options.path = options.params.path;
      delete options.params.path;
    }
    if (options.params.auth) {
      options.auth = options.params.auth;
      delete options.params.auth;
    }
    this._request(options, function(err, res, body) {
      if (res && res.statusCode !== 200) {
        err = new Error("HTTP Status Code: " + res.statusCode);
      }
      if (err)
        return callback(err);
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return callback(e);
        }
      }
      callback(null, body);
    });
  };
  Http.prototype.stream = function(options) {
    options = options || {};
    var self2 = this, stream = new Stream, req, buff;
    stream.destroy = function() {
      req.destroy();
    };
    options = {
      method: "stream",
      params: options
    };
    if (options.params.path) {
      options.path = options.params.path;
      delete options.params.path;
    }
    if (options.params.auth) {
      options.auth = options.params.auth;
      delete options.params.auth;
    }
    req = this._request(options);
    buff = "";
    req.on("data", function(data) {
      var data = (buff + data).split(/\n+/), l = data.length - 1, i2 = 0;
      for (;i2 < l; i2++) {
        try {
          stream.emit("log", JSON.parse(data[i2]));
        } catch (e) {
          stream.emit("error", e);
        }
      }
      buff = data[l];
    });
    req.on("error", function(err) {
      stream.emit("error", err);
    });
    return stream;
  };
});

// node_modules/winston/lib/winston/transports/memory.js
var require_memory = __commonJS((exports) => {
  var events = __require("events");
  var util = __require("util");
  var common = require_common();
  var Transport = require_transport().Transport;
  var Memory = exports.Memory = function(options) {
    Transport.call(this, options);
    options = options || {};
    this.errorOutput = [];
    this.writeOutput = [];
    this.json = options.json || false;
    this.colorize = options.colorize || false;
    this.prettyPrint = options.prettyPrint || false;
    this.timestamp = typeof options.timestamp !== "undefined" ? options.timestamp : false;
    this.showLevel = options.showLevel === undefined ? true : options.showLevel;
    this.label = options.label || null;
    this.depth = options.depth || null;
    if (this.json) {
      this.stringify = options.stringify || function(obj) {
        return JSON.stringify(obj, null, 2);
      };
    }
  };
  util.inherits(Memory, Transport);
  Memory.prototype.name = "memory";
  Memory.prototype.log = function(level, msg, meta, callback) {
    if (this.silent) {
      return callback(null, true);
    }
    var self2 = this, output;
    output = common.log({
      colorize: this.colorize,
      json: this.json,
      level,
      message: msg,
      meta,
      stringify: this.stringify,
      timestamp: this.timestamp,
      prettyPrint: this.prettyPrint,
      raw: this.raw,
      label: this.label,
      depth: this.depth,
      formatter: this.formatter,
      humanReadableUnhandledException: this.humanReadableUnhandledException
    });
    if (level === "error" || level === "debug") {
      this.errorOutput.push(output);
    } else {
      this.writeOutput.push(output);
    }
    self2.emit("logged");
    callback(null, true);
  };
  Memory.prototype.clearLogs = function() {
    this.errorOutput = [];
    this.writeOutput = [];
  };
});

// node_modules/winston/lib/winston/transports.js
var require_transports = __commonJS((exports) => {
  Object.defineProperty(exports, "Console", {
    configurable: true,
    enumerable: true,
    get: function() {
      return require_console().Console;
    }
  });
  Object.defineProperty(exports, "File", {
    configurable: true,
    enumerable: true,
    get: function() {
      return require_file().File;
    }
  });
  Object.defineProperty(exports, "Http", {
    configurable: true,
    enumerable: true,
    get: function() {
      return require_http().Http;
    }
  });
  Object.defineProperty(exports, "Memory", {
    configurable: true,
    enumerable: true,
    get: function() {
      return require_memory().Memory;
    }
  });
});

// node_modules/stack-trace/lib/stack-trace.js
var require_stack_trace = __commonJS((exports) => {
  function CallSite(properties) {
    for (var property in properties) {
      this[property] = properties[property];
    }
  }
  exports.get = function(belowFn) {
    var oldLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = Infinity;
    var dummyObject = {};
    var v8Handler = Error.prepareStackTrace;
    Error.prepareStackTrace = function(dummyObject2, v8StackTrace2) {
      return v8StackTrace2;
    };
    Error.captureStackTrace(dummyObject, belowFn || exports.get);
    var v8StackTrace = dummyObject.stack;
    Error.prepareStackTrace = v8Handler;
    Error.stackTraceLimit = oldLimit;
    return v8StackTrace;
  };
  exports.parse = function(err) {
    if (!err.stack) {
      return [];
    }
    var self2 = this;
    var lines = err.stack.split("\n").slice(1);
    return lines.map(function(line) {
      if (line.match(/^\s*[-]{4,}$/)) {
        return self2._createParsedCallSite({
          fileName: line,
          lineNumber: null,
          functionName: null,
          typeName: null,
          methodName: null,
          columnNumber: null,
          native: null
        });
      }
      var lineMatch = line.match(/at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/);
      if (!lineMatch) {
        return;
      }
      var object = null;
      var method = null;
      var functionName = null;
      var typeName = null;
      var methodName = null;
      var isNative = lineMatch[5] === "native";
      if (lineMatch[1]) {
        functionName = lineMatch[1];
        var methodStart = functionName.lastIndexOf(".");
        if (functionName[methodStart - 1] == ".")
          methodStart--;
        if (methodStart > 0) {
          object = functionName.substr(0, methodStart);
          method = functionName.substr(methodStart + 1);
          var objectEnd = object.indexOf(".Module");
          if (objectEnd > 0) {
            functionName = functionName.substr(objectEnd + 1);
            object = object.substr(0, objectEnd);
          }
        }
        typeName = null;
      }
      if (method) {
        typeName = object;
        methodName = method;
      }
      if (method === "<anonymous>") {
        methodName = null;
        functionName = null;
      }
      var properties = {
        fileName: lineMatch[2] || null,
        lineNumber: parseInt(lineMatch[3], 10) || null,
        functionName,
        typeName,
        methodName,
        columnNumber: parseInt(lineMatch[4], 10) || null,
        native: isNative
      };
      return self2._createParsedCallSite(properties);
    }).filter(function(callSite) {
      return !!callSite;
    });
  };
  var strProperties = [
    "this",
    "typeName",
    "functionName",
    "methodName",
    "fileName",
    "lineNumber",
    "columnNumber",
    "function",
    "evalOrigin"
  ];
  var boolProperties = [
    "topLevel",
    "eval",
    "native",
    "constructor"
  ];
  strProperties.forEach(function(property) {
    CallSite.prototype[property] = null;
    CallSite.prototype["get" + property[0].toUpperCase() + property.substr(1)] = function() {
      return this[property];
    };
  });
  boolProperties.forEach(function(property) {
    CallSite.prototype[property] = false;
    CallSite.prototype["is" + property[0].toUpperCase() + property.substr(1)] = function() {
      return this[property];
    };
  });
  exports._createParsedCallSite = function(properties) {
    return new CallSite(properties);
  };
});

// node_modules/winston/lib/winston/exception.js
var require_exception = __commonJS((exports) => {
  var os = __require("os");
  var stackTrace = require_stack_trace();
  var exception = exports;
  exception.getAllInfo = function(err) {
    return {
      date: new Date().toString(),
      process: exception.getProcessInfo(),
      os: exception.getOsInfo(),
      trace: exception.getTrace(err),
      stack: err.stack && err.stack.split("\n")
    };
  };
  exception.getProcessInfo = function() {
    return {
      pid: process.pid,
      uid: process.getuid ? process.getuid() : null,
      gid: process.getgid ? process.getgid() : null,
      cwd: process.cwd(),
      execPath: process.execPath,
      version: process.version,
      argv: process.argv,
      memoryUsage: process.memoryUsage()
    };
  };
  exception.getOsInfo = function() {
    return {
      loadavg: os.loadavg(),
      uptime: os.uptime()
    };
  };
  exception.getTrace = function(err) {
    var trace = err ? stackTrace.parse(err) : stackTrace.get();
    return trace.map(function(site) {
      return {
        column: site.getColumnNumber(),
        file: site.getFileName(),
        function: site.getFunctionName(),
        line: site.getLineNumber(),
        method: site.getMethodName(),
        native: site.isNative()
      };
    });
  };
});

// node_modules/winston/lib/winston/container.js
var require_container = __commonJS((exports) => {
  var common = require_common();
  var winston = require_winston();
  var extend = __require("util")._extend;
  var Container = exports.Container = function(options) {
    this.loggers = {};
    this.options = options || {};
    this.default = {
      transports: [
        new winston.transports.Console({
          level: "silly",
          colorize: false
        })
      ]
    };
  };
  Container.prototype.get = Container.prototype.add = function(id, options) {
    var self2 = this, existing;
    if (!this.loggers[id]) {
      options = extend({}, options || this.options || this.default);
      existing = options.transports || this.options.transports;
      options.transports = existing ? existing.slice() : [];
      if (options.transports.length === 0 && (!options || !options["console"])) {
        options.transports.push(this.default.transports[0]);
      }
      Object.keys(options).forEach(function(key) {
        if (key === "transports" || key === "filters" || key === "rewriters") {
          return;
        }
        var name2 = common.capitalize(key);
        if (!winston.transports[name2]) {
          throw new Error("Cannot add unknown transport: " + name2);
        }
        var namedOptions = options[key];
        namedOptions.id = id;
        options.transports.push(new winston.transports[name2](namedOptions));
      });
      options.id = id;
      this.loggers[id] = new winston.Logger(options);
      this.loggers[id].on("close", function() {
        self2._delete(id);
      });
    }
    return this.loggers[id];
  };
  Container.prototype.has = function(id) {
    return !!this.loggers[id];
  };
  Container.prototype.close = function(id) {
    var self2 = this;
    function _close(id2) {
      if (!self2.loggers[id2]) {
        return;
      }
      self2.loggers[id2].close();
      self2._delete(id2);
    }
    return id ? _close(id) : Object.keys(this.loggers).forEach(function(id2) {
      _close(id2);
    });
  };
  Container.prototype._delete = function(id) {
    delete this.loggers[id];
  };
});

// node_modules/winston/lib/winston/logger.js
var require_logger = __commonJS((exports) => {
  function ProfileHandler(logger) {
    this.logger = logger;
    this.start = Date.now();
  }
  var events = __require("events");
  var util = __require("util");
  var async = require_async();
  var config = require_config();
  var common = require_common();
  var exception = require_exception();
  var Stream = __require("stream").Stream;
  var formatRegExp = /%[sdj%]/g;
  var Logger = exports.Logger = function(options) {
    events.EventEmitter.call(this);
    this.configure(options);
  };
  util.inherits(Logger, events.EventEmitter);
  Logger.prototype.configure = function(options) {
    var self2 = this;
    if (Array.isArray(this._names) && this._names.length) {
      this.clear();
    }
    options = options || {};
    this.transports = {};
    this._names = [];
    if (options.transports) {
      options.transports.forEach(function(transport) {
        self2.add(transport, null, true);
      });
    }
    this.padLevels = options.padLevels || false;
    this.setLevels(options.levels);
    if (options.colors) {
      config.addColors(options.colors);
    }
    this.id = options.id || null;
    this.level = options.level || "info";
    this.emitErrs = options.emitErrs || false;
    this.stripColors = options.stripColors || false;
    this.exitOnError = typeof options.exitOnError !== "undefined" ? options.exitOnError : true;
    this.exceptionHandlers = {};
    this.profilers = {};
    ["rewriters", "filters"].forEach(function(kind) {
      self2[kind] = Array.isArray(options[kind]) ? options[kind] : [];
    });
    if (options.exceptionHandlers) {
      this.handleExceptions(options.exceptionHandlers);
    }
  };
  Logger.prototype.log = function(level) {
    var args = Array.prototype.slice.call(arguments, 1), self2 = this, transports;
    while (args[args.length - 1] === null) {
      args.pop();
    }
    var callback = typeof args[args.length - 1] === "function" ? args.pop() : null;
    function onError(err) {
      if (callback) {
        callback(err);
      } else if (self2.emitErrs) {
        self2.emit("error", err);
      }
    }
    if (this._names.length === 0) {
      return onError(new Error("Cannot log with no transports."));
    } else if (typeof self2.levels[level] === "undefined") {
      return onError(new Error("Unknown log level: " + level));
    }
    var targets = this._names.filter(function(name2) {
      var transport = self2.transports[name2];
      return transport.level && self2.levels[transport.level] >= self2.levels[level] || !transport.level && self2.levels[self2.level] >= self2.levels[level];
    });
    if (!targets.length) {
      if (callback) {
        callback();
      }
      return;
    }
    var msg, meta = {}, validMeta = false;
    var hasFormat = args && args[0] && args[0].match && args[0].match(formatRegExp) !== null;
    var tokens = hasFormat ? args[0].match(formatRegExp) : [];
    var ptokens = tokens.filter(function(t) {
      return t === "%%";
    });
    if (args.length - 1 - (tokens.length - ptokens.length) > 0 || args.length === 1) {
      meta = args[args.length - 1] || args;
      var metaType = Object.prototype.toString.call(meta);
      validMeta = metaType === "[object Object]" || metaType === "[object Error]" || metaType === "[object Array]";
      meta = validMeta ? args.pop() : {};
    }
    msg = util.format.apply(null, args);
    function finish(err) {
      if (callback) {
        if (err)
          return callback(err);
        callback(null, level, msg, meta);
      }
      callback = null;
      if (!err) {
        self2.emit("logged", level, msg, meta);
      }
    }
    if (this.padLevels) {
      msg = new Array(this.levelLength - level.length + 1).join(" ") + msg;
    }
    this.rewriters.forEach(function(rewriter) {
      meta = rewriter(level, msg, meta, self2);
    });
    this.filters.forEach(function(filter) {
      var filtered = filter(level, msg, meta, self2);
      if (typeof filtered === "string")
        msg = filtered;
      else {
        msg = filtered.msg;
        meta = filtered.meta;
      }
    });
    if (this.stripColors) {
      var code = /\u001b\[(\d+(;\d+)*)?m/g;
      msg = ("" + msg).replace(code, "");
    }
    function transportLog(name2, next) {
      var transport = self2.transports[name2];
      transport.log(level, msg, meta, function(err) {
        if (err) {
          err.transport = transport;
          finish(err);
          return next();
        }
        self2.emit("logging", transport, level, msg, meta);
        next();
      });
    }
    async.forEach(targets, transportLog, finish);
    return this;
  };
  Logger.prototype.query = function(options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    var self2 = this, options = options || {}, results = {}, query = common.clone(options.query) || {}, transports;
    function queryTransport(transport, next) {
      if (options.query) {
        options.query = transport.formatQuery(query);
      }
      transport.query(options, function(err, results2) {
        if (err) {
          return next(err);
        }
        next(null, transport.formatResults(results2, options.format));
      });
    }
    function addResults(transport, next) {
      queryTransport(transport, function(err, result) {
        if (next) {
          result = err || result;
          if (result) {
            results[transport.name] = result;
          }
          next();
        }
        next = null;
      });
    }
    if (options.transport) {
      options.transport = options.transport.toLowerCase();
      return queryTransport(this.transports[options.transport], callback);
    }
    transports = this._names.map(function(name2) {
      return self2.transports[name2];
    }).filter(function(transport) {
      return !!transport.query;
    });
    async.forEach(transports, addResults, function() {
      callback(null, results);
    });
  };
  Logger.prototype.stream = function(options) {
    var self2 = this, options = options || {}, out = new Stream, streams = [], transports;
    if (options.transport) {
      var transport = this.transports[options.transport];
      delete options.transport;
      if (transport && transport.stream) {
        return transport.stream(options);
      }
    }
    out._streams = streams;
    out.destroy = function() {
      var i2 = streams.length;
      while (i2--)
        streams[i2].destroy();
    };
    transports = this._names.map(function(name2) {
      return self2.transports[name2];
    }).filter(function(transport2) {
      return !!transport2.stream;
    });
    transports.forEach(function(transport2) {
      var stream = transport2.stream(options);
      if (!stream)
        return;
      streams.push(stream);
      stream.on("log", function(log) {
        log.transport = log.transport || [];
        log.transport.push(transport2.name);
        out.emit("log", log);
      });
      stream.on("error", function(err) {
        err.transport = err.transport || [];
        err.transport.push(transport2.name);
        out.emit("error", err);
      });
    });
    return out;
  };
  Logger.prototype.close = function() {
    var self2 = this;
    this._names.forEach(function(name2) {
      var transport = self2.transports[name2];
      if (transport && transport.close) {
        transport.close();
      }
    });
    this.emit("close");
  };
  Logger.prototype.handleExceptions = function() {
    var args = Array.prototype.slice.call(arguments), handlers = [], self2 = this;
    args.forEach(function(a) {
      if (Array.isArray(a)) {
        handlers = handlers.concat(a);
      } else {
        handlers.push(a);
      }
    });
    this.exceptionHandlers = this.exceptionHandlers || {};
    handlers.forEach(function(handler) {
      self2.exceptionHandlers[handler.name] = handler;
    });
    this._hnames = Object.keys(self2.exceptionHandlers);
    if (!this.catchExceptions) {
      this.catchExceptions = this._uncaughtException.bind(this);
      process.on("uncaughtException", this.catchExceptions);
    }
  };
  Logger.prototype.unhandleExceptions = function() {
    var self2 = this;
    if (this.catchExceptions) {
      Object.keys(this.exceptionHandlers).forEach(function(name2) {
        var handler = self2.exceptionHandlers[name2];
        if (handler.close) {
          handler.close();
        }
      });
      this.exceptionHandlers = {};
      Object.keys(this.transports).forEach(function(name2) {
        var transport = self2.transports[name2];
        if (transport.handleExceptions) {
          transport.handleExceptions = false;
        }
      });
      process.removeListener("uncaughtException", this.catchExceptions);
      this.catchExceptions = false;
    }
  };
  Logger.prototype.add = function(transport, options, created) {
    var instance = created ? transport : new transport(options);
    if (!instance.name && !instance.log) {
      throw new Error("Unknown transport with no log() method");
    } else if (this.transports[instance.name]) {
      throw new Error("Transport already attached: " + instance.name + ", assign a different name");
    }
    this.transports[instance.name] = instance;
    this._names = Object.keys(this.transports);
    instance._onError = this._onError.bind(this, instance);
    if (!created) {
      instance.on("error", instance._onError);
    }
    if (instance.handleExceptions && !this.catchExceptions) {
      this.handleExceptions();
    }
    return this;
  };
  Logger.prototype.clear = function() {
    Object.keys(this.transports).forEach(function(name2) {
      this.remove({ name: name2 });
    }, this);
  };
  Logger.prototype.remove = function(transport) {
    var name2 = typeof transport !== "string" ? transport.name || transport.prototype.name : transport;
    if (!this.transports[name2]) {
      throw new Error("Transport " + name2 + " not attached to this instance");
    }
    var instance = this.transports[name2];
    delete this.transports[name2];
    this._names = Object.keys(this.transports);
    if (instance.close) {
      instance.close();
    }
    if (instance._onError) {
      instance.removeListener("error", instance._onError);
    }
    return this;
  };
  Logger.prototype.startTimer = function() {
    return new ProfileHandler(this);
  };
  Logger.prototype.profile = function(id) {
    var now = Date.now(), then, args, msg, meta, callback;
    if (this.profilers[id]) {
      then = this.profilers[id];
      delete this.profilers[id];
      args = Array.prototype.slice.call(arguments);
      callback = typeof args[args.length - 1] === "function" ? args.pop() : null;
      meta = typeof args[args.length - 1] === "object" ? args.pop() : {};
      msg = args.length === 2 ? args[1] : id;
      meta.durationMs = now - then;
      return this.info(msg, meta, callback);
    } else {
      this.profilers[id] = now;
    }
    return this;
  };
  Logger.prototype.setLevels = function(target) {
    return common.setLevels(this, this.levels, target);
  };
  Logger.prototype.cli = function() {
    this.padLevels = true;
    this.setLevels(config.cli.levels);
    config.addColors(config.cli.colors);
    if (this.transports.console) {
      this.transports.console.colorize = this.transports.console.colorize || true;
      this.transports.console.timestamp = this.transports.console.timestamp || false;
    }
    return this;
  };
  Logger.prototype._uncaughtException = function(err) {
    var self2 = this, responded = false, info = exception.getAllInfo(err), handlers = this._getExceptionHandlers(), timeout, doExit;
    doExit = typeof this.exitOnError === "function" ? this.exitOnError(err) : this.exitOnError;
    function logAndWait(transport, next) {
      transport.logException("uncaughtException: " + (err.message || err), info, next, err);
    }
    function gracefulExit() {
      if (doExit && !responded) {
        clearTimeout(timeout);
        responded = true;
        process.exit(1);
      }
    }
    if (!handlers || handlers.length === 0) {
      return gracefulExit();
    }
    async.forEach(handlers, logAndWait, gracefulExit);
    if (doExit) {
      timeout = setTimeout(gracefulExit, 3000);
    }
  };
  Logger.prototype._getExceptionHandlers = function() {
    var self2 = this;
    return this._hnames.map(function(name2) {
      return self2.exceptionHandlers[name2];
    }).concat(this._names.map(function(name2) {
      return self2.transports[name2].handleExceptions && self2.transports[name2];
    })).filter(Boolean);
  };
  Logger.prototype._onError = function(transport, err) {
    if (this.emitErrs) {
      this.emit("error", err, transport);
    }
  };
  ProfileHandler.prototype.done = function(msg) {
    var args = Array.prototype.slice.call(arguments), callback = typeof args[args.length - 1] === "function" ? args.pop() : null, meta = typeof args[args.length - 1] === "object" ? args.pop() : {};
    meta.duration = Date.now() - this.start + "ms";
    return this.logger.info(msg, meta, callback);
  };
});

// node_modules/winston/lib/winston.js
var require_winston = __commonJS((exports) => {
  var winston = exports;
  winston.version = require_package().version;
  winston.transports = require_transports();
  var common = require_common();
  winston.hash = common.hash;
  winston.clone = common.clone;
  winston.longestElement = common.longestElement;
  winston.exception = require_exception();
  winston.config = require_config();
  winston.addColors = winston.config.addColors;
  winston.Container = require_container().Container;
  winston.Logger = require_logger().Logger;
  winston.Transport = require_transport().Transport;
  winston.loggers = new winston.Container;
  var defaultLogger = new winston.Logger({
    transports: [new winston.transports.Console]
  });
  var methods = [
    "log",
    "query",
    "stream",
    "add",
    "remove",
    "clear",
    "profile",
    "startTimer",
    "extend",
    "cli",
    "handleExceptions",
    "unhandleExceptions",
    "configure"
  ];
  winston.padLevels = false;
  common.setLevels(winston, null, defaultLogger.levels);
  methods.forEach(function(method) {
    winston[method] = function() {
      return defaultLogger[method].apply(defaultLogger, arguments);
    };
  });
  winston.cli = function() {
    winston.padLevels = true;
    common.setLevels(winston, defaultLogger.levels, winston.config.cli.levels);
    defaultLogger.setLevels(winston.config.cli.levels);
    winston.config.addColors(winston.config.cli.colors);
    if (defaultLogger.transports.console) {
      defaultLogger.transports.console.colorize = true;
      defaultLogger.transports.console.timestamp = false;
    }
    return winston;
  };
  winston.setLevels = function(target) {
    common.setLevels(winston, defaultLogger.levels, target);
    defaultLogger.setLevels(target);
  };
  Object.defineProperty(winston, "level", {
    get: function() {
      return defaultLogger.level;
    },
    set: function(val) {
      defaultLogger.level = val;
      Object.keys(defaultLogger.transports).forEach(function(key) {
        defaultLogger.transports[key].level = val;
      });
    }
  });
  ["emitErrs", "exitOnError", "padLevels", "levelLength", "stripColors"].forEach(function(prop) {
    Object.defineProperty(winston, prop, {
      get: function() {
        return defaultLogger[prop];
      },
      set: function(val) {
        defaultLogger[prop] = val;
      }
    });
  });
  Object.defineProperty(winston, "default", {
    get: function() {
      return {
        transports: defaultLogger.transports,
        exceptionHandlers: defaultLogger.exceptionHandlers
      };
    }
  });
});

// node_modules/@colors/colors/lib/styles.js
var require_styles2 = __commonJS((exports, module) => {
  var styles = {};
  module["exports"] = styles;
  var codes = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],
    brightRed: [91, 39],
    brightGreen: [92, 39],
    brightYellow: [93, 39],
    brightBlue: [94, 39],
    brightMagenta: [95, 39],
    brightCyan: [96, 39],
    brightWhite: [97, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],
    bgBrightRed: [101, 49],
    bgBrightGreen: [102, 49],
    bgBrightYellow: [103, 49],
    bgBrightBlue: [104, 49],
    bgBrightMagenta: [105, 49],
    bgBrightCyan: [106, 49],
    bgBrightWhite: [107, 49],
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49]
  };
  Object.keys(codes).forEach(function(key) {
    var val = codes[key];
    var style = styles[key] = [];
    style.open = "\x1B[" + val[0] + "m";
    style.close = "\x1B[" + val[1] + "m";
  });
});

// node_modules/@colors/colors/lib/system/has-flag.js
var require_has_flag = __commonJS((exports, module) => {
  module.exports = function(flag, argv) {
    argv = argv || process.argv;
    var terminatorPos = argv.indexOf("--");
    var prefix = /^-{1,2}/.test(flag) ? "" : "--";
    var pos = argv.indexOf(prefix + flag);
    return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
  };
});

// node_modules/@colors/colors/lib/system/supports-colors.js
var require_supports_colors2 = __commonJS((exports, module) => {
  function translateLevel(level) {
    if (level === 0) {
      return false;
    }
    return {
      level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3
    };
  }
  function supportsColor(stream) {
    if (forceColor === false) {
      return 0;
    }
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
    if (stream && !stream.isTTY && forceColor !== true) {
      return 0;
    }
    var min = forceColor ? 1 : 0;
    if (process.platform === "win32") {
      var osRelease = os.release().split(".");
      if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ("CI" in env) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(sign) {
        return sign in env;
      }) || env.CI_NAME === "codeship") {
        return 1;
      }
      return min;
    }
    if ("TEAMCITY_VERSION" in env) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if ("TERM_PROGRAM" in env) {
      var version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (env.TERM_PROGRAM) {
        case "iTerm.app":
          return version >= 3 ? 3 : 2;
        case "Hyper":
          return 3;
        case "Apple_Terminal":
          return 2;
      }
    }
    if (/-256(color)?$/i.test(env.TERM)) {
      return 2;
    }
    if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
      return 1;
    }
    if ("COLORTERM" in env) {
      return 1;
    }
    if (env.TERM === "dumb") {
      return min;
    }
    return min;
  }
  function getSupportLevel(stream) {
    var level = supportsColor(stream);
    return translateLevel(level);
  }
  var os = __require("os");
  var hasFlag = require_has_flag();
  var env = process.env;
  var forceColor = undefined;
  if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
    forceColor = false;
  } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    forceColor = true;
  }
  if ("FORCE_COLOR" in env) {
    forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
  }
  module.exports = {
    supportsColor: getSupportLevel,
    stdout: getSupportLevel(process.stdout),
    stderr: getSupportLevel(process.stderr)
  };
});

// node_modules/@colors/colors/lib/custom/trap.js
var require_trap2 = __commonJS((exports, module) => {
  module["exports"] = function runTheTrap(text, options) {
    var result = "";
    text = text || "Run the trap, drop the bass";
    text = text.split("");
    var trap = {
      a: ["@", "\u0104", "\u023A", "\u0245", "\u0394", "\u039B", "\u0414"],
      b: ["\xDF", "\u0181", "\u0243", "\u026E", "\u03B2", "\u0E3F"],
      c: ["\xA9", "\u023B", "\u03FE"],
      d: ["\xD0", "\u018A", "\u0500", "\u0501", "\u0502", "\u0503"],
      e: [
        "\xCB",
        "\u0115",
        "\u018E",
        "\u0258",
        "\u03A3",
        "\u03BE",
        "\u04BC",
        "\u0A6C"
      ],
      f: ["\u04FA"],
      g: ["\u0262"],
      h: ["\u0126", "\u0195", "\u04A2", "\u04BA", "\u04C7", "\u050A"],
      i: ["\u0F0F"],
      j: ["\u0134"],
      k: ["\u0138", "\u04A0", "\u04C3", "\u051E"],
      l: ["\u0139"],
      m: ["\u028D", "\u04CD", "\u04CE", "\u0520", "\u0521", "\u0D69"],
      n: ["\xD1", "\u014B", "\u019D", "\u0376", "\u03A0", "\u048A"],
      o: [
        "\xD8",
        "\xF5",
        "\xF8",
        "\u01FE",
        "\u0298",
        "\u047A",
        "\u05DD",
        "\u06DD",
        "\u0E4F"
      ],
      p: ["\u01F7", "\u048E"],
      q: ["\u09CD"],
      r: ["\xAE", "\u01A6", "\u0210", "\u024C", "\u0280", "\u042F"],
      s: ["\xA7", "\u03DE", "\u03DF", "\u03E8"],
      t: ["\u0141", "\u0166", "\u0373"],
      u: ["\u01B1", "\u054D"],
      v: ["\u05D8"],
      w: ["\u0428", "\u0460", "\u047C", "\u0D70"],
      x: ["\u04B2", "\u04FE", "\u04FC", "\u04FD"],
      y: ["\xA5", "\u04B0", "\u04CB"],
      z: ["\u01B5", "\u0240"]
    };
    text.forEach(function(c) {
      c = c.toLowerCase();
      var chars = trap[c] || [" "];
      var rand = Math.floor(Math.random() * chars.length);
      if (typeof trap[c] !== "undefined") {
        result += trap[c][rand];
      } else {
        result += c;
      }
    });
    return result;
  };
});

// node_modules/@colors/colors/lib/custom/zalgo.js
var require_zalgo2 = __commonJS((exports, module) => {
  module["exports"] = function zalgo(text, options) {
    text = text || "   he is here   ";
    var soul = {
      up: [
        "\u030D",
        "\u030E",
        "\u0304",
        "\u0305",
        "\u033F",
        "\u0311",
        "\u0306",
        "\u0310",
        "\u0352",
        "\u0357",
        "\u0351",
        "\u0307",
        "\u0308",
        "\u030A",
        "\u0342",
        "\u0313",
        "\u0308",
        "\u034A",
        "\u034B",
        "\u034C",
        "\u0303",
        "\u0302",
        "\u030C",
        "\u0350",
        "\u0300",
        "\u0301",
        "\u030B",
        "\u030F",
        "\u0312",
        "\u0313",
        "\u0314",
        "\u033D",
        "\u0309",
        "\u0363",
        "\u0364",
        "\u0365",
        "\u0366",
        "\u0367",
        "\u0368",
        "\u0369",
        "\u036A",
        "\u036B",
        "\u036C",
        "\u036D",
        "\u036E",
        "\u036F",
        "\u033E",
        "\u035B",
        "\u0346",
        "\u031A"
      ],
      down: [
        "\u0316",
        "\u0317",
        "\u0318",
        "\u0319",
        "\u031C",
        "\u031D",
        "\u031E",
        "\u031F",
        "\u0320",
        "\u0324",
        "\u0325",
        "\u0326",
        "\u0329",
        "\u032A",
        "\u032B",
        "\u032C",
        "\u032D",
        "\u032E",
        "\u032F",
        "\u0330",
        "\u0331",
        "\u0332",
        "\u0333",
        "\u0339",
        "\u033A",
        "\u033B",
        "\u033C",
        "\u0345",
        "\u0347",
        "\u0348",
        "\u0349",
        "\u034D",
        "\u034E",
        "\u0353",
        "\u0354",
        "\u0355",
        "\u0356",
        "\u0359",
        "\u035A",
        "\u0323"
      ],
      mid: [
        "\u0315",
        "\u031B",
        "\u0300",
        "\u0301",
        "\u0358",
        "\u0321",
        "\u0322",
        "\u0327",
        "\u0328",
        "\u0334",
        "\u0335",
        "\u0336",
        "\u035C",
        "\u035D",
        "\u035E",
        "\u035F",
        "\u0360",
        "\u0362",
        "\u0338",
        "\u0337",
        "\u0361",
        " \u0489"
      ]
    };
    var all = [].concat(soul.up, soul.down, soul.mid);
    function randomNumber(range) {
      var r = Math.floor(Math.random() * range);
      return r;
    }
    function isChar(character) {
      var bool = false;
      all.filter(function(i2) {
        bool = i2 === character;
      });
      return bool;
    }
    function heComes(text2, options2) {
      var result = "";
      var counts;
      var l;
      options2 = options2 || {};
      options2["up"] = typeof options2["up"] !== "undefined" ? options2["up"] : true;
      options2["mid"] = typeof options2["mid"] !== "undefined" ? options2["mid"] : true;
      options2["down"] = typeof options2["down"] !== "undefined" ? options2["down"] : true;
      options2["size"] = typeof options2["size"] !== "undefined" ? options2["size"] : "maxi";
      text2 = text2.split("");
      for (l in text2) {
        if (isChar(l)) {
          continue;
        }
        result = result + text2[l];
        counts = { up: 0, down: 0, mid: 0 };
        switch (options2.size) {
          case "mini":
            counts.up = randomNumber(8);
            counts.mid = randomNumber(2);
            counts.down = randomNumber(8);
            break;
          case "maxi":
            counts.up = randomNumber(16) + 3;
            counts.mid = randomNumber(4) + 1;
            counts.down = randomNumber(64) + 3;
            break;
          default:
            counts.up = randomNumber(8) + 1;
            counts.mid = randomNumber(6) / 2;
            counts.down = randomNumber(8) + 1;
            break;
        }
        var arr = ["up", "mid", "down"];
        for (var d in arr) {
          var index = arr[d];
          for (var i2 = 0;i2 <= counts[index]; i2++) {
            if (options2[index]) {
              result = result + soul[index][randomNumber(soul[index].length)];
            }
          }
        }
      }
      return result;
    }
    return heComes(text, options);
  };
});

// node_modules/@colors/colors/lib/maps/america.js
var require_america2 = __commonJS((exports, module) => {
  module["exports"] = function(colors) {
    return function(letter, i2, exploded) {
      if (letter === " ")
        return letter;
      switch (i2 % 3) {
        case 0:
          return colors.red(letter);
        case 1:
          return colors.white(letter);
        case 2:
          return colors.blue(letter);
      }
    };
  };
});

// node_modules/@colors/colors/lib/maps/zebra.js
var require_zebra2 = __commonJS((exports, module) => {
  module["exports"] = function(colors) {
    return function(letter, i2, exploded) {
      return i2 % 2 === 0 ? letter : colors.inverse(letter);
    };
  };
});

// node_modules/@colors/colors/lib/maps/rainbow.js
var require_rainbow2 = __commonJS((exports, module) => {
  module["exports"] = function(colors) {
    var rainbowColors = ["red", "yellow", "green", "blue", "magenta"];
    return function(letter, i2, exploded) {
      if (letter === " ") {
        return letter;
      } else {
        return colors[rainbowColors[i2++ % rainbowColors.length]](letter);
      }
    };
  };
});

// node_modules/@colors/colors/lib/maps/random.js
var require_random2 = __commonJS((exports, module) => {
  module["exports"] = function(colors) {
    var available = [
      "underline",
      "inverse",
      "grey",
      "yellow",
      "red",
      "green",
      "blue",
      "white",
      "cyan",
      "magenta",
      "brightYellow",
      "brightRed",
      "brightGreen",
      "brightBlue",
      "brightWhite",
      "brightCyan",
      "brightMagenta"
    ];
    return function(letter, i2, exploded) {
      return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 2))]](letter);
    };
  };
});

// node_modules/@colors/colors/lib/colors.js
var require_colors2 = __commonJS((exports, module) => {
  function build(_styles) {
    var builder = function builder() {
      return applyStyle.apply(builder, arguments);
    };
    builder._styles = _styles;
    builder.__proto__ = proto;
    return builder;
  }
  function applyStyle() {
    var args = Array.prototype.slice.call(arguments);
    var str = args.map(function(arg) {
      if (arg != null && arg.constructor === String) {
        return arg;
      } else {
        return util.inspect(arg);
      }
    }).join(" ");
    if (!colors.enabled || !str) {
      return str;
    }
    var newLinesPresent = str.indexOf("\n") != -1;
    var nestedStyles = this._styles;
    var i2 = nestedStyles.length;
    while (i2--) {
      var code = ansiStyles[nestedStyles[i2]];
      str = code.open + str.replace(code.closeRe, code.open) + code.close;
      if (newLinesPresent) {
        str = str.replace(newLineRegex, function(match) {
          return code.close + match + code.open;
        });
      }
    }
    return str;
  }
  function init() {
    var ret = {};
    Object.keys(styles).forEach(function(name2) {
      ret[name2] = {
        get: function() {
          return build([name2]);
        }
      };
    });
    return ret;
  }
  var colors = {};
  module["exports"] = colors;
  colors.themes = {};
  var util = __require("util");
  var ansiStyles = colors.styles = require_styles2();
  var defineProps = Object.defineProperties;
  var newLineRegex = new RegExp(/[\r\n]+/g);
  colors.supportsColor = require_supports_colors2().supportsColor;
  if (typeof colors.enabled === "undefined") {
    colors.enabled = colors.supportsColor() !== false;
  }
  colors.enable = function() {
    colors.enabled = true;
  };
  colors.disable = function() {
    colors.enabled = false;
  };
  colors.stripColors = colors.strip = function(str) {
    return ("" + str).replace(/\x1B\[\d+m/g, "");
  };
  var stylize = colors.stylize = function stylize(str, style) {
    if (!colors.enabled) {
      return str + "";
    }
    var styleMap = ansiStyles[style];
    if (!styleMap && style in colors) {
      return colors[style](str);
    }
    return styleMap.open + str + styleMap.close;
  };
  var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
  var escapeStringRegexp = function(str) {
    if (typeof str !== "string") {
      throw new TypeError("Expected a string");
    }
    return str.replace(matchOperatorsRe, "\\$&");
  };
  var styles = function() {
    var ret = {};
    ansiStyles.grey = ansiStyles.gray;
    Object.keys(ansiStyles).forEach(function(key) {
      ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
      ret[key] = {
        get: function() {
          return build(this._styles.concat(key));
        }
      };
    });
    return ret;
  }();
  var proto = defineProps(function colors() {
  }, styles);
  colors.setTheme = function(theme) {
    if (typeof theme === "string") {
      console.log("colors.setTheme now only accepts an object, not a string.  " + "If you are trying to set a theme from a file, it is now your (the " + "caller\'s) responsibility to require the file.  The old syntax " + "looked like colors.setTheme(__dirname + " + "\'/../themes/generic-logging.js\'); The new syntax looks like " + "colors.setTheme(require(__dirname + " + "\'/../themes/generic-logging.js\'));");
      return;
    }
    for (var style in theme) {
      (function(style2) {
        colors[style2] = function(str) {
          if (typeof theme[style2] === "object") {
            var out = str;
            for (var i2 in theme[style2]) {
              out = colors[theme[style2][i2]](out);
            }
            return out;
          }
          return colors[theme[style2]](str);
        };
      })(style);
    }
  };
  var sequencer = function sequencer(map2, str) {
    var exploded = str.split("");
    exploded = exploded.map(map2);
    return exploded.join("");
  };
  colors.trap = require_trap2();
  colors.zalgo = require_zalgo2();
  colors.maps = {};
  colors.maps.america = require_america2()(colors);
  colors.maps.zebra = require_zebra2()(colors);
  colors.maps.rainbow = require_rainbow2()(colors);
  colors.maps.random = require_random2()(colors);
  for (map in colors.maps) {
    (function(map2) {
      colors[map2] = function(str) {
        return sequencer(colors.maps[map2], str);
      };
    })(map);
  }
  var map;
  defineProps(colors, init());
});

// node_modules/@colors/colors/safe.js
var require_safe2 = __commonJS((exports, module) => {
  var colors = require_colors2();
  module["exports"] = colors;
});

// node_modules/prompt/package.json
var require_package2 = __commonJS((exports, module) => {
  module.exports = {
    name: "prompt",
    version: "1.3.0",
    description: "A beautiful command-line prompt for node.js",
    author: "Nodejitsu Inc. <info@nodejitsu.com>",
    maintainers: [
      "indexzero <charlie@nodejitsu.com>",
      "jesusabdullah <josh@nodejitsu.com>"
    ],
    repository: {
      type: "git",
      url: "http://github.com/flatiron/prompt.git"
    },
    keywords: [
      "prompt",
      "command-line",
      "customize",
      "validation"
    ],
    dependencies: {
      "@colors/colors": "1.5.0",
      async: "3.2.3",
      read: "1.0.x",
      revalidator: "0.1.x",
      winston: "2.x"
    },
    devDependencies: {
      eslint: "^7.32.0",
      vows: "^0.7.0"
    },
    main: "./lib/prompt",
    scripts: {
      test: "vows test/prompt-test.js --spec",
      "test-all": "vows --spec"
    },
    license: "MIT",
    engines: {
      node: ">= 6.0.0"
    }
  };
});

// node_modules/prompt/lib/prompt.js
var require_prompt = __commonJS((exports, module) => {
  function convert(schema) {
    var newProps = Object.keys(validate.messages), newSchema = false, key;
    newProps = newProps.concat(["description", "dependencies"]);
    for (key in schema) {
      if (newProps.indexOf(key) > 0) {
        newSchema = true;
        break;
      }
    }
    if (!newSchema || schema.validator || schema.warning || typeof schema.empty !== "undefined") {
      if (typeof schema.message !== "undefined") {
        schema.description = schema.message;
      }
      if (typeof schema.warning !== "undefined") {
        schema.message = schema.warning;
      }
      if (typeof schema.validator === "function") {
        schema.conform = schema.validator;
      } else {
        schema.pattern = schema.validator;
      }
      if (typeof schema.empty !== "undefined") {
        schema.required = !schema.empty;
      }
      delete schema.warning;
      delete schema.validator;
      delete schema.empty;
    }
    return schema;
  }
  var events = __require("events");
  var readline = __require("readline");
  var eachSeries = require_eachSeries();
  var rejectSeries = require_rejectSeries();
  var read = require_read();
  var validate = require_revalidator().validate;
  var winston = require_winston();
  var colors = require_safe2();
  readline.Interface.prototype.setPrompt = function(prompt2, length) {
    this._prompt = prompt2;
    if (length) {
      this._promptLength = length;
    } else {
      var lines = prompt2.split(/[\r\n]/);
      var lastLine = lines[lines.length - 1];
      this._promptLength = lastLine.replace(/\u001b\[(\d+(;\d+)*)?m/g, "").length;
    }
  };
  exports.version = require_package2().version;
  var stdin;
  var stdout;
  var history = [];
  var prompt = module.exports = Object.create(events.EventEmitter.prototype);
  var logger = prompt.logger = new winston.Logger({
    transports: [new winston.transports.Console]
  });
  prompt.started = false;
  prompt.paused = false;
  prompt.stopped = true;
  prompt.allowEmpty = false;
  prompt.message = "prompt";
  prompt.delimiter = ": ";
  prompt.colors = true;
  prompt.properties = {};
  logger.cli();
  prompt.start = function(options) {
    if (prompt.started) {
      return;
    }
    options = options || {};
    stdin = options.stdin || process.stdin;
    stdout = options.stdout || process.stdout;
    prompt.memory = options.memory || 10;
    prompt.allowEmpty = options.allowEmpty || false;
    prompt.message = options.message || prompt.message;
    prompt.delimiter = options.delimiter || prompt.delimiter;
    prompt.colors = options.colors || prompt.colors;
    if (!options.noHandleSIGINT) {
      if (process.platform !== "win32") {
        process.on("SIGINT", function() {
          stdout.write("\n");
          process.exit(1);
        });
      } else {
        stdin.on("keypress", function(char, key) {
          if (key && key.ctrl && key.name == "c") {
            stdout.write("\n");
            process.emit("SIGINT");
            process.exit(1);
          }
        });
      }
    }
    prompt.emit("start");
    prompt.started = true;
    prompt.stopped = false;
    return prompt;
  };
  prompt.pause = function() {
    if (!prompt.started || prompt.stopped || prompt.paused) {
      return;
    }
    stdin.pause();
    prompt.emit("pause");
    prompt.paused = true;
    return prompt;
  };
  prompt.stop = function() {
    if (prompt.stopped || !prompt.started) {
      return;
    }
    stdin.destroy();
    prompt.emit("stop");
    prompt.stopped = true;
    prompt.started = false;
    prompt.paused = false;
    return prompt;
  };
  prompt.resume = function() {
    if (!prompt.started || !prompt.paused) {
      return;
    }
    stdin.resume();
    prompt.emit("resume");
    prompt.paused = false;
    return prompt;
  };
  prompt.history = function(search) {
    if (typeof search === "number") {
      return history[search] || {};
    }
    var names = history.map(function(pair) {
      return typeof pair.property === "string" ? pair.property : pair.property.name;
    });
    if (!~names.indexOf(search)) {
      return null;
    }
    return history.filter(function(pair) {
      return typeof pair.property === "string" ? pair.property === search : pair.property.name === search;
    })[0];
  };
  prompt.get = function(schema, callback) {
    if (typeof callback === "function")
      return prompt._get(schema, callback);
    return new Promise(function(resolve, reject) {
      prompt._get(schema, function(err, result) {
        return err ? reject(err) : resolve(result);
      });
    });
  };
  prompt._get = function(schema, callback) {
    function untangle(schema2, path2) {
      var results = [];
      path2 = path2 || [];
      if (schema2.properties) {
        Object.keys(schema2.properties).forEach(function(key) {
          var obj = {};
          obj[key] = schema2.properties[key];
          results = results.concat(untangle(obj[key], path2.concat(key)));
        });
        return results;
      }
      return {
        path: path2,
        schema: schema2
      };
    }
    function iterate(schema2, get, done) {
      var iterator = [], result = {};
      if (typeof schema2 === "string") {
        iterator.push({
          path: [schema2],
          schema: prompt.properties[schema2.toLowerCase()] || {}
        });
      } else if (Array.isArray(schema2)) {
        iterator = schema2.map(function(element) {
          if (typeof element === "string") {
            return {
              path: [element],
              schema: prompt.properties[element.toLowerCase()] || {}
            };
          } else if (element.properties) {
            return {
              path: [Object.keys(element.properties)[0]],
              schema: element.properties[Object.keys(element.properties)[0]]
            };
          } else if (element.path && element.schema) {
            return element;
          } else {
            return {
              path: [element.name || "question"],
              schema: element
            };
          }
        });
      } else if (schema2.properties) {
        iterator = untangle(schema2);
      } else {
        iterator = [{
          schema: schema2.schema ? schema2.schema : schema2,
          path: schema2.path || [schema2.name || "question"]
        }];
      }
      eachSeries(iterator, function(branch, next) {
        get(branch, function assembler(err, line) {
          if (err) {
            return next(err);
          }
          function build(path2, line2) {
            var obj = {};
            if (path2.length) {
              obj[path2[0]] = build(path2.slice(1), line2);
              return obj;
            }
            return line2;
          }
          function attach(obj, attr) {
            var keys;
            if (typeof attr !== "object" || attr instanceof Array) {
              return attr;
            }
            keys = Object.keys(attr);
            if (keys.length) {
              if (!obj[keys[0]]) {
                obj[keys[0]] = {};
              }
              obj[keys[0]] = attach(obj[keys[0]], attr[keys[0]]);
            }
            return obj;
          }
          result = attach(result, build(branch.path, line));
          next();
        });
      }, function(err) {
        return err ? done(err) : done(null, result);
      });
    }
    iterate(schema, function get(target, next) {
      prompt.getInput(target, function(err, line) {
        return err ? next(err) : next(null, line);
      });
    }, callback);
    return prompt;
  };
  prompt.confirm = function() {
    var args = Array.prototype.slice.call(arguments), msg = args.shift(), callback = args.pop(), opts = args.shift(), vars = !Array.isArray(msg) ? [msg] : msg, RX_Y = /^[yt]{1}/i, RX_YN = /^[yntf]{1}/i;
    function confirm(target, next) {
      var yes = target.yes || RX_Y, options = {
        description: typeof target === "string" ? target : target.description || "yes/no",
        pattern: target.pattern || RX_YN,
        name: "confirm",
        message: target.message || "yes/no"
      };
      for (var k in opts || {}) {
        if (opts.hasOwnProperty(k)) {
          options[k] = opts[k];
        }
      }
      prompt.get([options], function(err, result) {
        next(null, err ? false : yes.test(result[options.name]));
      });
    }
    rejectSeries(vars, confirm, function(err, result) {
      callback(null, result.length === 0);
    });
  };
  var tmp = [];
  prompt.getInput = function(prop, callback) {
    var schema = prop.schema || prop, propName = prop.path && prop.path.join(":") || prop, storedSchema = prompt.properties[propName.toLowerCase()], delim = prompt.delimiter, defaultLine, against, hidden, length, valid, name2, raw, msg;
    if (schema instanceof Object && !Object.keys(schema).length && typeof storedSchema !== "undefined") {
      schema = storedSchema;
    }
    if (typeof prop === "string" && !storedSchema) {
      schema = {};
    }
    schema = convert(schema);
    defaultLine = schema.default;
    name2 = prop.description || schema.description || propName;
    raw = prompt.colors ? [colors.grey(name2), colors.grey(delim)] : [name2, delim];
    if (prompt.message)
      raw.unshift(prompt.message, delim);
    prop = {
      schema,
      path: propName.split(":")
    };
    if (!schema.properties) {
      schema = function() {
        var obj = { properties: {} };
        obj.properties[propName] = schema;
        return obj;
      }();
    }
    if (prompt.override && prompt.override.hasOwnProperty(propName)) {
      if (prompt._performValidation(name2, prop, prompt.override, schema, -1, callback)) {
        return callback(null, prompt.override[propName]);
      }
      delete prompt.override[propName];
    }
    if (typeof prop.schema.ask === "function" && !prop.schema.ask()) {
      return callback(null, prop.schema.default || "");
    }
    var type = (schema.properties && schema.properties[propName] && schema.properties[propName].type || "").toLowerCase().trim(), wait = type === "array";
    if (type === "array") {
      length = prop.schema.maxItems;
      if (length) {
        msg = (tmp.length + 1).toString() + "/" + length.toString();
      } else {
        msg = (tmp.length + 1).toString();
      }
      msg += delim;
      raw.push(prompt.colors ? colors.grey(msg) : msg);
    }
    length = raw.join("").length;
    msg = raw.join("");
    if (schema.help) {
      schema.help.forEach(function(line) {
        logger.help(line);
      });
    }
    prompt.emit("prompt", prop);
    if (typeof defaultLine === "function") {
      defaultLine = defaultLine();
    }
    if (typeof defaultLine === "undefined") {
      defaultLine = "";
    }
    defaultLine = defaultLine.toString();
    read({
      prompt: msg,
      silent: prop.schema && prop.schema.hidden,
      replace: prop.schema && prop.schema.replace,
      default: defaultLine,
      input: stdin,
      output: stdout
    }, function(err, line) {
      if (err && wait === false) {
        return callback(err);
      }
      var against2 = {}, numericInput, isValid;
      if (line !== "") {
        if (schema.properties[propName]) {
          var type2 = (schema.properties[propName].type || "").toLowerCase().trim() || undefined;
          if (type2 === "number" || type2 === "integer") {
            line = Number(line);
          }
          if (type2 == "boolean") {
            if (line.toLowerCase() === "true" || line.toLowerCase() === "t") {
              line = true;
            } else if (line.toLowerCase() === "false" || line.toLowerCase() === "f") {
              line = false;
            }
          }
          if (type2 == "array") {
            var length2 = prop.schema.maxItems;
            if (err) {
              if (err.message == "canceled") {
                wait = false;
                stdout.write("\n");
              }
            } else {
              if (length2) {
                if (tmp.length + 1 < length2) {
                  isValid = false;
                  wait = true;
                } else {
                  isValid = true;
                  wait = false;
                }
              } else {
                isValid = false;
                wait = true;
              }
              tmp.push(line);
            }
            line = tmp;
          }
        }
        against2[propName] = line;
      }
      if (prop && prop.schema.before) {
        line = prop.schema.before(line);
      }
      if (isValid === undefined)
        isValid = prompt._performValidation(name2, prop, against2, schema, line, callback);
      if (!isValid) {
        return prompt.getInput(prop, callback);
      }
      logger.input(line.yellow);
      prompt._remember(propName, line);
      callback(null, line);
      tmp = [];
    });
  };
  prompt._performValidation = function(name2, prop, against, schema, line, callback) {
    var numericInput, valid, msg;
    try {
      valid = validate(against, schema);
    } catch (err) {
      return line !== -1 ? callback(err) : false;
    }
    if (!valid.valid) {
      if (prop.schema.message) {
        logger.error(prop.schema.message);
      } else {
        msg = line !== -1 ? "Invalid input for " : "Invalid command-line input for ";
        if (prompt.colors) {
          logger.error(msg + colors.grey(name2));
        } else {
          logger.error(msg + name2);
        }
      }
      prompt.emit("invalid", prop, line);
    }
    return valid.valid;
  };
  prompt.addProperties = function(obj, properties, callback) {
    properties = properties.filter(function(prop) {
      return typeof obj[prop] === "undefined";
    });
    if (properties.length === 0) {
      return callback(null, obj);
    }
    prompt.get(properties, function(err, results) {
      if (err) {
        return callback(err);
      } else if (!results) {
        return callback(null, obj);
      }
      function putNested(obj2, path2, value2) {
        var last = obj2, key;
        while (path2.length > 1) {
          key = path2.shift();
          if (!last[key]) {
            last[key] = {};
          }
          last = last[key];
        }
        last[path2.shift()] = value2;
      }
      Object.keys(results).forEach(function(key) {
        putNested(obj, key.split("."), results[key]);
      });
      callback(null, obj);
    });
    return prompt;
  };
  prompt._remember = function(property, value2) {
    history.unshift({
      property,
      value: value2
    });
    if (history.length > prompt.memory) {
      history.splice(prompt.memory, history.length - prompt.memory);
    }
  };
});

// bin/init.ts
var import_prompt = __toESM(require_prompt(), 1);
var safe = __toESM(require_safe2(), 1);
import fs from "fs";
import path2 from "path";
var __dirname = "/media/benoti/Ubuntu-Disk/Github/ui-library/bin";
var promptSchema = [
  {
    description: "What directory is your project located?",
    message: "Name must be only letters, spaces, or dashes",
    required: true,
    default: ".",
    name: "root-directory"
  }
];
function init_default() {
  import_prompt.default.message = safe.default.blue("Q");
  import_prompt.default.start();
  const blazeDefaultsDir = path2.resolve(__dirname, "../blaze");
  import_prompt.default.get(promptSchema, function(err, result) {
    if (err) {
      console.log(err.message);
      process.exit();
    }
    try {
      const dirInput = String(result["root-directory"]);
      const rootDir = path2.resolve(process.cwd(), dirInput);
      const blazeDir = path2.join(rootDir, "blaze");
      if (!fs.existsSync(blazeDir)) {
        fs.mkdirSync(blazeDir, { recursive: true });
        fs.cpSync(blazeDefaultsDir, blazeDir, {
          recursive: true,
          force: true
        });
      }
    } catch (error) {
    }
  });
}

// node_modules/chroma-js/src/utils/limit.js
var limit_default = (x, low = 0, high = 1) => {
  return min(max(low, x), high);
};

// node_modules/chroma-js/src/utils/clip_rgb.js
var clip_rgb_default = (rgb) => {
  rgb._clipped = false;
  rgb._unclipped = rgb.slice(0);
  for (let i2 = 0;i2 <= 3; i2++) {
    if (i2 < 3) {
      if (rgb[i2] < 0 || rgb[i2] > 255)
        rgb._clipped = true;
      rgb[i2] = limit_default(rgb[i2], 0, 255);
    } else if (i2 === 3) {
      rgb[i2] = limit_default(rgb[i2], 0, 1);
    }
  }
  return rgb;
};
// node_modules/chroma-js/src/utils/type.js
var classToType = {};
for (let name2 of [
  "Boolean",
  "Number",
  "String",
  "Function",
  "Array",
  "Date",
  "RegExp",
  "Undefined",
  "Null"
]) {
  classToType[`[object ${name2}]`] = name2.toLowerCase();
}
function type_default(obj) {
  return classToType[Object.prototype.toString.call(obj)] || "object";
}
// node_modules/chroma-js/src/utils/unpack.js
var unpack_default = (args, keyOrder = null) => {
  if (args.length >= 3)
    return Array.prototype.slice.call(args);
  if (type_default(args[0]) == "object" && keyOrder) {
    return keyOrder.split("").filter((k) => args[0][k] !== undefined).map((k) => args[0][k]);
  }
  return args[0];
};
// node_modules/chroma-js/src/utils/last.js
var last_default = (args) => {
  if (args.length < 2)
    return null;
  const l = args.length - 1;
  if (type_default(args[l]) == "string")
    return args[l].toLowerCase();
  return null;
};

// node_modules/chroma-js/src/utils/index.js
var { PI, min, max } = Math;
var TWOPI = PI * 2;
var PITHIRD = PI / 3;
var DEG2RAD = PI / 180;
var RAD2DEG = 180 / PI;

// node_modules/chroma-js/src/io/input.js
var input_default = {
  format: {},
  autodetect: []
};

// node_modules/chroma-js/src/Color.js
class Color {
  constructor(...args) {
    const me = this;
    if (type_default(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
      return args[0];
    }
    let mode = last_default(args);
    let autodetect = false;
    if (!mode) {
      autodetect = true;
      if (!input_default.sorted) {
        input_default.autodetect = input_default.autodetect.sort((a, b) => b.p - a.p);
        input_default.sorted = true;
      }
      for (let chk of input_default.autodetect) {
        mode = chk.test(...args);
        if (mode)
          break;
      }
    }
    if (input_default.format[mode]) {
      const rgb = input_default.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
      me._rgb = clip_rgb_default(rgb);
    } else {
      throw new Error("unknown format: " + args);
    }
    if (me._rgb.length === 3)
      me._rgb.push(1);
  }
  toString() {
    if (type_default(this.hex) == "function")
      return this.hex();
    return `[${this._rgb.join(",")}]`;
  }
}
var Color_default = Color;

// node_modules/chroma-js/src/version.js
var version = "2.6.0";

// node_modules/chroma-js/src/chroma.js
var chroma = (...args) => {
  return new chroma.Color(...args);
};
chroma.Color = Color_default;
chroma.version = version;
var chroma_default = chroma;

// node_modules/chroma-js/src/io/cmyk/cmyk2rgb.js
var cmyk2rgb = (...args) => {
  args = unpack_default(args, "cmyk");
  const [c, m, y, k] = args;
  const alpha = args.length > 4 ? args[4] : 1;
  if (k === 1)
    return [0, 0, 0, alpha];
  return [
    c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
    m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
    y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
    alpha
  ];
};
var cmyk2rgb_default = cmyk2rgb;

// node_modules/chroma-js/src/io/cmyk/rgb2cmyk.js
var { max: max2 } = Math;
var rgb2cmyk = (...args) => {
  let [r, g, b] = unpack_default(args, "rgb");
  r = r / 255;
  g = g / 255;
  b = b / 255;
  const k = 1 - max2(r, max2(g, b));
  const f = k < 1 ? 1 / (1 - k) : 0;
  const c = (1 - r - k) * f;
  const m = (1 - g - k) * f;
  const y = (1 - b - k) * f;
  return [c, m, y, k];
};
var rgb2cmyk_default = rgb2cmyk;

// node_modules/chroma-js/src/io/cmyk/index.js
Color_default.prototype.cmyk = function() {
  return rgb2cmyk_default(this._rgb);
};
chroma_default.cmyk = (...args) => new Color_default(...args, "cmyk");
input_default.format.cmyk = cmyk2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "cmyk");
    if (type_default(args) === "array" && args.length === 4) {
      return "cmyk";
    }
  }
});

// node_modules/chroma-js/src/io/css/hsl2css.js
var rnd = (a) => Math.round(a * 100) / 100;
var hsl2css = (...args) => {
  const hsla = unpack_default(args, "hsla");
  let mode = last_default(args) || "lsa";
  hsla[0] = rnd(hsla[0] || 0);
  hsla[1] = rnd(hsla[1] * 100) + "%";
  hsla[2] = rnd(hsla[2] * 100) + "%";
  if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
    hsla[3] = hsla.length > 3 ? hsla[3] : 1;
    mode = "hsla";
  } else {
    hsla.length = 3;
  }
  return `${mode}(${hsla.join(",")})`;
};
var hsl2css_default = hsl2css;

// node_modules/chroma-js/src/io/hsl/rgb2hsl.js
var rgb2hsl = (...args) => {
  args = unpack_default(args, "rgba");
  let [r, g, b] = args;
  r /= 255;
  g /= 255;
  b /= 255;
  const minRgb = min(r, g, b);
  const maxRgb = max(r, g, b);
  const l = (maxRgb + minRgb) / 2;
  let s, h;
  if (maxRgb === minRgb) {
    s = 0;
    h = Number.NaN;
  } else {
    s = l < 0.5 ? (maxRgb - minRgb) / (maxRgb + minRgb) : (maxRgb - minRgb) / (2 - maxRgb - minRgb);
  }
  if (r == maxRgb)
    h = (g - b) / (maxRgb - minRgb);
  else if (g == maxRgb)
    h = 2 + (b - r) / (maxRgb - minRgb);
  else if (b == maxRgb)
    h = 4 + (r - g) / (maxRgb - minRgb);
  h *= 60;
  if (h < 0)
    h += 360;
  if (args.length > 3 && args[3] !== undefined)
    return [h, s, l, args[3]];
  return [h, s, l];
};
var rgb2hsl_default = rgb2hsl;

// node_modules/chroma-js/src/io/css/rgb2css.js
var { round } = Math;
var rgb2css = (...args) => {
  const rgba = unpack_default(args, "rgba");
  let mode = last_default(args) || "rgb";
  if (mode.substr(0, 3) == "hsl") {
    return hsl2css_default(rgb2hsl_default(rgba), mode);
  }
  rgba[0] = round(rgba[0]);
  rgba[1] = round(rgba[1]);
  rgba[2] = round(rgba[2]);
  if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
    rgba[3] = rgba.length > 3 ? rgba[3] : 1;
    mode = "rgba";
  }
  return `${mode}(${rgba.slice(0, mode === "rgb" ? 3 : 4).join(",")})`;
};
var rgb2css_default = rgb2css;

// node_modules/chroma-js/src/io/hsl/hsl2rgb.js
var { round: round2 } = Math;
var hsl2rgb = (...args) => {
  args = unpack_default(args, "hsl");
  const [h, s, l] = args;
  let r, g, b;
  if (s === 0) {
    r = g = b = l * 255;
  } else {
    const t3 = [0, 0, 0];
    const c = [0, 0, 0];
    const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const t1 = 2 * l - t2;
    const h_ = h / 360;
    t3[0] = h_ + 1 / 3;
    t3[1] = h_;
    t3[2] = h_ - 1 / 3;
    for (let i2 = 0;i2 < 3; i2++) {
      if (t3[i2] < 0)
        t3[i2] += 1;
      if (t3[i2] > 1)
        t3[i2] -= 1;
      if (6 * t3[i2] < 1)
        c[i2] = t1 + (t2 - t1) * 6 * t3[i2];
      else if (2 * t3[i2] < 1)
        c[i2] = t2;
      else if (3 * t3[i2] < 2)
        c[i2] = t1 + (t2 - t1) * (2 / 3 - t3[i2]) * 6;
      else
        c[i2] = t1;
    }
    [r, g, b] = [round2(c[0] * 255), round2(c[1] * 255), round2(c[2] * 255)];
  }
  if (args.length > 3) {
    return [r, g, b, args[3]];
  }
  return [r, g, b, 1];
};
var hsl2rgb_default = hsl2rgb;

// node_modules/chroma-js/src/io/css/css2rgb.js
var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
var { round: round3 } = Math;
var css2rgb = (css) => {
  css = css.toLowerCase().trim();
  let m;
  if (input_default.format.named) {
    try {
      return input_default.format.named(css);
    } catch (e) {
    }
  }
  if (m = css.match(RE_RGB)) {
    const rgb = m.slice(1, 4);
    for (let i2 = 0;i2 < 3; i2++) {
      rgb[i2] = +rgb[i2];
    }
    rgb[3] = 1;
    return rgb;
  }
  if (m = css.match(RE_RGBA)) {
    const rgb = m.slice(1, 5);
    for (let i2 = 0;i2 < 4; i2++) {
      rgb[i2] = +rgb[i2];
    }
    return rgb;
  }
  if (m = css.match(RE_RGB_PCT)) {
    const rgb = m.slice(1, 4);
    for (let i2 = 0;i2 < 3; i2++) {
      rgb[i2] = round3(rgb[i2] * 2.55);
    }
    rgb[3] = 1;
    return rgb;
  }
  if (m = css.match(RE_RGBA_PCT)) {
    const rgb = m.slice(1, 5);
    for (let i2 = 0;i2 < 3; i2++) {
      rgb[i2] = round3(rgb[i2] * 2.55);
    }
    rgb[3] = +rgb[3];
    return rgb;
  }
  if (m = css.match(RE_HSL)) {
    const hsl = m.slice(1, 4);
    hsl[1] *= 0.01;
    hsl[2] *= 0.01;
    const rgb = hsl2rgb_default(hsl);
    rgb[3] = 1;
    return rgb;
  }
  if (m = css.match(RE_HSLA)) {
    const hsl = m.slice(1, 4);
    hsl[1] *= 0.01;
    hsl[2] *= 0.01;
    const rgb = hsl2rgb_default(hsl);
    rgb[3] = +m[4];
    return rgb;
  }
};
css2rgb.test = (s) => {
  return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
};
var css2rgb_default = css2rgb;

// node_modules/chroma-js/src/io/css/index.js
Color_default.prototype.css = function(mode) {
  return rgb2css_default(this._rgb, mode);
};
chroma_default.css = (...args) => new Color_default(...args, "css");
input_default.format.css = css2rgb_default;
input_default.autodetect.push({
  p: 5,
  test: (h, ...rest) => {
    if (!rest.length && type_default(h) === "string" && css2rgb_default.test(h)) {
      return "css";
    }
  }
});

// node_modules/chroma-js/src/io/gl/index.js
input_default.format.gl = (...args) => {
  const rgb = unpack_default(args, "rgba");
  rgb[0] *= 255;
  rgb[1] *= 255;
  rgb[2] *= 255;
  return rgb;
};
chroma_default.gl = (...args) => new Color_default(...args, "gl");
Color_default.prototype.gl = function() {
  const rgb = this._rgb;
  return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
};

// node_modules/chroma-js/src/io/hcg/hcg2rgb.js
var { floor } = Math;
var hcg2rgb = (...args) => {
  args = unpack_default(args, "hcg");
  let [h, c, _g] = args;
  let r, g, b;
  _g = _g * 255;
  const _c = c * 255;
  if (c === 0) {
    r = g = b = _g;
  } else {
    if (h === 360)
      h = 0;
    if (h > 360)
      h -= 360;
    if (h < 0)
      h += 360;
    h /= 60;
    const i2 = floor(h);
    const f = h - i2;
    const p = _g * (1 - c);
    const q = p + _c * (1 - f);
    const t = p + _c * f;
    const v = p + _c;
    switch (i2) {
      case 0:
        [r, g, b] = [v, t, p];
        break;
      case 1:
        [r, g, b] = [q, v, p];
        break;
      case 2:
        [r, g, b] = [p, v, t];
        break;
      case 3:
        [r, g, b] = [p, q, v];
        break;
      case 4:
        [r, g, b] = [t, p, v];
        break;
      case 5:
        [r, g, b] = [v, p, q];
        break;
    }
  }
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var hcg2rgb_default = hcg2rgb;

// node_modules/chroma-js/src/io/hcg/rgb2hcg.js
var rgb2hcg = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const minRgb = min(r, g, b);
  const maxRgb = max(r, g, b);
  const delta = maxRgb - minRgb;
  const c = delta * 100 / 255;
  const _g = minRgb / (255 - delta) * 100;
  let h;
  if (delta === 0) {
    h = Number.NaN;
  } else {
    if (r === maxRgb)
      h = (g - b) / delta;
    if (g === maxRgb)
      h = 2 + (b - r) / delta;
    if (b === maxRgb)
      h = 4 + (r - g) / delta;
    h *= 60;
    if (h < 0)
      h += 360;
  }
  return [h, c, _g];
};
var rgb2hcg_default = rgb2hcg;

// node_modules/chroma-js/src/io/hcg/index.js
Color_default.prototype.hcg = function() {
  return rgb2hcg_default(this._rgb);
};
chroma_default.hcg = (...args) => new Color_default(...args, "hcg");
input_default.format.hcg = hcg2rgb_default;
input_default.autodetect.push({
  p: 1,
  test: (...args) => {
    args = unpack_default(args, "hcg");
    if (type_default(args) === "array" && args.length === 3) {
      return "hcg";
    }
  }
});

// node_modules/chroma-js/src/io/hex/hex2rgb.js
var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
var hex2rgb = (hex) => {
  if (hex.match(RE_HEX)) {
    if (hex.length === 4 || hex.length === 7) {
      hex = hex.substr(1);
    }
    if (hex.length === 3) {
      hex = hex.split("");
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const u = parseInt(hex, 16);
    const r = u >> 16;
    const g = u >> 8 & 255;
    const b = u & 255;
    return [r, g, b, 1];
  }
  if (hex.match(RE_HEXA)) {
    if (hex.length === 5 || hex.length === 9) {
      hex = hex.substr(1);
    }
    if (hex.length === 4) {
      hex = hex.split("");
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    const u = parseInt(hex, 16);
    const r = u >> 24 & 255;
    const g = u >> 16 & 255;
    const b = u >> 8 & 255;
    const a = Math.round((u & 255) / 255 * 100) / 100;
    return [r, g, b, a];
  }
  throw new Error(`unknown hex color: ${hex}`);
};
var hex2rgb_default = hex2rgb;

// node_modules/chroma-js/src/io/hex/rgb2hex.js
var { round: round4 } = Math;
var rgb2hex = (...args) => {
  let [r, g, b, a] = unpack_default(args, "rgba");
  let mode = last_default(args) || "auto";
  if (a === undefined)
    a = 1;
  if (mode === "auto") {
    mode = a < 1 ? "rgba" : "rgb";
  }
  r = round4(r);
  g = round4(g);
  b = round4(b);
  const u = r << 16 | g << 8 | b;
  let str = "000000" + u.toString(16);
  str = str.substr(str.length - 6);
  let hxa = "0" + round4(a * 255).toString(16);
  hxa = hxa.substr(hxa.length - 2);
  switch (mode.toLowerCase()) {
    case "rgba":
      return `#${str}${hxa}`;
    case "argb":
      return `#${hxa}${str}`;
    default:
      return `#${str}`;
  }
};
var rgb2hex_default = rgb2hex;

// node_modules/chroma-js/src/io/hex/index.js
Color_default.prototype.hex = function(mode) {
  return rgb2hex_default(this._rgb, mode);
};
chroma_default.hex = (...args) => new Color_default(...args, "hex");
input_default.format.hex = hex2rgb_default;
input_default.autodetect.push({
  p: 4,
  test: (h, ...rest) => {
    if (!rest.length && type_default(h) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
      return "hex";
    }
  }
});

// node_modules/chroma-js/src/io/hsi/hsi2rgb.js
var { cos } = Math;
var hsi2rgb = (...args) => {
  args = unpack_default(args, "hsi");
  let [h, s, i2] = args;
  let r, g, b;
  if (isNaN(h))
    h = 0;
  if (isNaN(s))
    s = 0;
  if (h > 360)
    h -= 360;
  if (h < 0)
    h += 360;
  h /= 360;
  if (h < 1 / 3) {
    b = (1 - s) / 3;
    r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
    g = 1 - (b + r);
  } else if (h < 2 / 3) {
    h -= 1 / 3;
    r = (1 - s) / 3;
    g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
    b = 1 - (r + g);
  } else {
    h -= 2 / 3;
    g = (1 - s) / 3;
    b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
    r = 1 - (g + b);
  }
  r = limit_default(i2 * r * 3);
  g = limit_default(i2 * g * 3);
  b = limit_default(i2 * b * 3);
  return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
};
var hsi2rgb_default = hsi2rgb;

// node_modules/chroma-js/src/io/hsi/rgb2hsi.js
var { min: min2, sqrt, acos } = Math;
var rgb2hsi = (...args) => {
  let [r, g, b] = unpack_default(args, "rgb");
  r /= 255;
  g /= 255;
  b /= 255;
  let h;
  const min_ = min2(r, g, b);
  const i2 = (r + g + b) / 3;
  const s = i2 > 0 ? 1 - min_ / i2 : 0;
  if (s === 0) {
    h = NaN;
  } else {
    h = (r - g + (r - b)) / 2;
    h /= sqrt((r - g) * (r - g) + (r - b) * (g - b));
    h = acos(h);
    if (b > g) {
      h = TWOPI - h;
    }
    h /= TWOPI;
  }
  return [h * 360, s, i2];
};
var rgb2hsi_default = rgb2hsi;

// node_modules/chroma-js/src/io/hsi/index.js
Color_default.prototype.hsi = function() {
  return rgb2hsi_default(this._rgb);
};
chroma_default.hsi = (...args) => new Color_default(...args, "hsi");
input_default.format.hsi = hsi2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "hsi");
    if (type_default(args) === "array" && args.length === 3) {
      return "hsi";
    }
  }
});

// node_modules/chroma-js/src/io/hsl/index.js
Color_default.prototype.hsl = function() {
  return rgb2hsl_default(this._rgb);
};
chroma_default.hsl = (...args) => new Color_default(...args, "hsl");
input_default.format.hsl = hsl2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "hsl");
    if (type_default(args) === "array" && args.length === 3) {
      return "hsl";
    }
  }
});

// node_modules/chroma-js/src/io/hsv/hsv2rgb.js
var { floor: floor2 } = Math;
var hsv2rgb = (...args) => {
  args = unpack_default(args, "hsv");
  let [h, s, v] = args;
  let r, g, b;
  v *= 255;
  if (s === 0) {
    r = g = b = v;
  } else {
    if (h === 360)
      h = 0;
    if (h > 360)
      h -= 360;
    if (h < 0)
      h += 360;
    h /= 60;
    const i2 = floor2(h);
    const f = h - i2;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));
    switch (i2) {
      case 0:
        [r, g, b] = [v, t, p];
        break;
      case 1:
        [r, g, b] = [q, v, p];
        break;
      case 2:
        [r, g, b] = [p, v, t];
        break;
      case 3:
        [r, g, b] = [p, q, v];
        break;
      case 4:
        [r, g, b] = [t, p, v];
        break;
      case 5:
        [r, g, b] = [v, p, q];
        break;
    }
  }
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var hsv2rgb_default = hsv2rgb;

// node_modules/chroma-js/src/io/hsv/rgb2hsv.js
var { min: min3, max: max3 } = Math;
var rgb2hsl4 = (...args) => {
  args = unpack_default(args, "rgb");
  let [r, g, b] = args;
  const min_ = min3(r, g, b);
  const max_ = max3(r, g, b);
  const delta = max_ - min_;
  let h, s, v;
  v = max_ / 255;
  if (max_ === 0) {
    h = Number.NaN;
    s = 0;
  } else {
    s = delta / max_;
    if (r === max_)
      h = (g - b) / delta;
    if (g === max_)
      h = 2 + (b - r) / delta;
    if (b === max_)
      h = 4 + (r - g) / delta;
    h *= 60;
    if (h < 0)
      h += 360;
  }
  return [h, s, v];
};
var rgb2hsv_default = rgb2hsl4;

// node_modules/chroma-js/src/io/hsv/index.js
Color_default.prototype.hsv = function() {
  return rgb2hsv_default(this._rgb);
};
chroma_default.hsv = (...args) => new Color_default(...args, "hsv");
input_default.format.hsv = hsv2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "hsv");
    if (type_default(args) === "array" && args.length === 3) {
      return "hsv";
    }
  }
});

// node_modules/chroma-js/src/io/lab/lab-constants.js
var lab_constants_default = {
  Kn: 18,
  Xn: 0.95047,
  Yn: 1,
  Zn: 1.08883,
  t0: 0.137931034,
  t1: 0.206896552,
  t2: 0.12841855,
  t3: 0.008856452
};

// node_modules/chroma-js/src/io/lab/lab2rgb.js
var { pow } = Math;
var lab2rgb = (...args) => {
  args = unpack_default(args, "lab");
  const [l, a, b] = args;
  let x, y, z, r, g, b_;
  y = (l + 16) / 116;
  x = isNaN(a) ? y : y + a / 500;
  z = isNaN(b) ? y : y - b / 200;
  y = lab_constants_default.Yn * lab_xyz(y);
  x = lab_constants_default.Xn * lab_xyz(x);
  z = lab_constants_default.Zn * lab_xyz(z);
  r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
  g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
  b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
  return [r, g, b_, args.length > 3 ? args[3] : 1];
};
var xyz_rgb = (r) => {
  return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055);
};
var lab_xyz = (t) => {
  return t > lab_constants_default.t1 ? t * t * t : lab_constants_default.t2 * (t - lab_constants_default.t0);
};
var lab2rgb_default = lab2rgb;

// node_modules/chroma-js/src/io/lab/rgb2lab.js
var { pow: pow2 } = Math;
var rgb2lab = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const [x, y, z] = rgb2xyz(r, g, b);
  const l = 116 * y - 16;
  return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
};
var rgb_xyz = (r) => {
  if ((r /= 255) <= 0.04045)
    return r / 12.92;
  return pow2((r + 0.055) / 1.055, 2.4);
};
var xyz_lab = (t) => {
  if (t > lab_constants_default.t3)
    return pow2(t, 1 / 3);
  return t / lab_constants_default.t2 + lab_constants_default.t0;
};
var rgb2xyz = (r, g, b) => {
  r = rgb_xyz(r);
  g = rgb_xyz(g);
  b = rgb_xyz(b);
  const x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / lab_constants_default.Xn);
  const y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / lab_constants_default.Yn);
  const z = xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / lab_constants_default.Zn);
  return [x, y, z];
};
var rgb2lab_default = rgb2lab;

// node_modules/chroma-js/src/io/lab/index.js
Color_default.prototype.lab = function() {
  return rgb2lab_default(this._rgb);
};
chroma_default.lab = (...args) => new Color_default(...args, "lab");
input_default.format.lab = lab2rgb_default;
input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, "lab");
    if (type_default(args) === "array" && args.length === 3) {
      return "lab";
    }
  }
});

// node_modules/chroma-js/src/io/lch/lch2lab.js
var { sin, cos: cos2 } = Math;
var lch2lab = (...args) => {
  let [l, c, h] = unpack_default(args, "lch");
  if (isNaN(h))
    h = 0;
  h = h * DEG2RAD;
  return [l, cos2(h) * c, sin(h) * c];
};
var lch2lab_default = lch2lab;

// node_modules/chroma-js/src/io/lch/lch2rgb.js
var lch2rgb = (...args) => {
  args = unpack_default(args, "lch");
  const [l, c, h] = args;
  const [L, a, b_] = lch2lab_default(l, c, h);
  const [r, g, b] = lab2rgb_default(L, a, b_);
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var lch2rgb_default = lch2rgb;

// node_modules/chroma-js/src/io/lch/hcl2rgb.js
var hcl2rgb = (...args) => {
  const hcl = unpack_default(args, "hcl").reverse();
  return lch2rgb_default(...hcl);
};
var hcl2rgb_default = hcl2rgb;

// node_modules/chroma-js/src/io/lch/lab2lch.js
var { sqrt: sqrt2, atan2, round: round5 } = Math;
var lab2lch = (...args) => {
  const [l, a, b] = unpack_default(args, "lab");
  const c = sqrt2(a * a + b * b);
  let h = (atan2(b, a) * RAD2DEG + 360) % 360;
  if (round5(c * 1e4) === 0)
    h = Number.NaN;
  return [l, c, h];
};
var lab2lch_default = lab2lch;

// node_modules/chroma-js/src/io/lch/rgb2lch.js
var rgb2lch = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const [l, a, b_] = rgb2lab_default(r, g, b);
  return lab2lch_default(l, a, b_);
};
var rgb2lch_default = rgb2lch;

// node_modules/chroma-js/src/io/lch/index.js
Color_default.prototype.lch = function() {
  return rgb2lch_default(this._rgb);
};
Color_default.prototype.hcl = function() {
  return rgb2lch_default(this._rgb).reverse();
};
chroma_default.lch = (...args) => new Color_default(...args, "lch");
chroma_default.hcl = (...args) => new Color_default(...args, "hcl");
input_default.format.lch = lch2rgb_default;
input_default.format.hcl = hcl2rgb_default;
["lch", "hcl"].forEach((m) => input_default.autodetect.push({
  p: 2,
  test: (...args) => {
    args = unpack_default(args, m);
    if (type_default(args) === "array" && args.length === 3) {
      return m;
    }
  }
}));

// node_modules/chroma-js/src/colors/w3cx11.js
var w3cx11 = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  laserlemon: "#ffff54",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrod: "#fafad2",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  maroon2: "#7f0000",
  maroon3: "#b03060",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  purple2: "#7f007f",
  purple3: "#a020f0",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
var w3cx11_default = w3cx11;

// node_modules/chroma-js/src/io/named/index.js
Color_default.prototype.name = function() {
  const hex = rgb2hex_default(this._rgb, "rgb");
  for (let n of Object.keys(w3cx11_default)) {
    if (w3cx11_default[n] === hex)
      return n.toLowerCase();
  }
  return hex;
};
input_default.format.named = (name2) => {
  name2 = name2.toLowerCase();
  if (w3cx11_default[name2])
    return hex2rgb_default(w3cx11_default[name2]);
  throw new Error("unknown color name: " + name2);
};
input_default.autodetect.push({
  p: 5,
  test: (h, ...rest) => {
    if (!rest.length && type_default(h) === "string" && w3cx11_default[h.toLowerCase()]) {
      return "named";
    }
  }
});

// node_modules/chroma-js/src/io/num/num2rgb.js
var num2rgb = (num) => {
  if (type_default(num) == "number" && num >= 0 && num <= 16777215) {
    const r = num >> 16;
    const g = num >> 8 & 255;
    const b = num & 255;
    return [r, g, b, 1];
  }
  throw new Error("unknown num color: " + num);
};
var num2rgb_default = num2rgb;

// node_modules/chroma-js/src/io/num/rgb2num.js
var rgb2num = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  return (r << 16) + (g << 8) + b;
};
var rgb2num_default = rgb2num;

// node_modules/chroma-js/src/io/num/index.js
Color_default.prototype.num = function() {
  return rgb2num_default(this._rgb);
};
chroma_default.num = (...args) => new Color_default(...args, "num");
input_default.format.num = num2rgb_default;
input_default.autodetect.push({
  p: 5,
  test: (...args) => {
    if (args.length === 1 && type_default(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
      return "num";
    }
  }
});

// node_modules/chroma-js/src/io/rgb/index.js
var { round: round6 } = Math;
Color_default.prototype.rgb = function(rnd2 = true) {
  if (rnd2 === false)
    return this._rgb.slice(0, 3);
  return this._rgb.slice(0, 3).map(round6);
};
Color_default.prototype.rgba = function(rnd2 = true) {
  return this._rgb.slice(0, 4).map((v, i2) => {
    return i2 < 3 ? rnd2 === false ? v : round6(v) : v;
  });
};
chroma_default.rgb = (...args) => new Color_default(...args, "rgb");
input_default.format.rgb = (...args) => {
  const rgba = unpack_default(args, "rgba");
  if (rgba[3] === undefined)
    rgba[3] = 1;
  return rgba;
};
input_default.autodetect.push({
  p: 3,
  test: (...args) => {
    args = unpack_default(args, "rgba");
    if (type_default(args) === "array" && (args.length === 3 || args.length === 4 && type_default(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
      return "rgb";
    }
  }
});

// node_modules/chroma-js/src/io/temp/temperature2rgb.js
var { log } = Math;
var temperature2rgb = (kelvin) => {
  const temp = kelvin / 100;
  let r, g, b;
  if (temp < 66) {
    r = 255;
    g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
    b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
  } else {
    r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
    g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
    b = 255;
  }
  return [r, g, b, 1];
};
var temperature2rgb_default = temperature2rgb;

// node_modules/chroma-js/src/io/temp/rgb2temperature.js
var { round: round7 } = Math;
var rgb2temperature = (...args) => {
  const rgb = unpack_default(args, "rgb");
  const r = rgb[0], b = rgb[2];
  let minTemp = 1000;
  let maxTemp = 40000;
  const eps = 0.4;
  let temp;
  while (maxTemp - minTemp > eps) {
    temp = (maxTemp + minTemp) * 0.5;
    const rgb2 = temperature2rgb_default(temp);
    if (rgb2[2] / rgb2[0] >= b / r) {
      maxTemp = temp;
    } else {
      minTemp = temp;
    }
  }
  return round7(temp);
};
var rgb2temperature_default = rgb2temperature;

// node_modules/chroma-js/src/io/temp/index.js
Color_default.prototype.temp = Color_default.prototype.kelvin = Color_default.prototype.temperature = function() {
  return rgb2temperature_default(this._rgb);
};
chroma_default.temp = chroma_default.kelvin = chroma_default.temperature = (...args) => new Color_default(...args, "temp");
input_default.format.temp = input_default.format.kelvin = input_default.format.temperature = temperature2rgb_default;

// node_modules/chroma-js/src/io/oklab/oklab2rgb.js
function lrgb2rgb(c) {
  const abs = Math.abs(c);
  if (abs > 0.0031308) {
    return (sign(c) || 1) * (1.055 * pow3(abs, 1 / 2.4) - 0.055);
  }
  return c * 12.92;
}
var { pow: pow3, sign } = Math;
var oklab2rgb = (...args) => {
  args = unpack_default(args, "lab");
  const [L, a, b] = args;
  const l = pow3(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = pow3(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = pow3(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return [
    255 * lrgb2rgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
    args.length > 3 ? args[3] : 1
  ];
};
var oklab2rgb_default = oklab2rgb;

// node_modules/chroma-js/src/io/oklab/rgb2oklab.js
function rgb2lrgb(c) {
  const abs = Math.abs(c);
  if (abs < 0.04045) {
    return c / 12.92;
  }
  return (sign2(c) || 1) * pow4((abs + 0.055) / 1.055, 2.4);
}
var { cbrt, pow: pow4, sign: sign2 } = Math;
var rgb2oklab = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const [lr, lg, lb] = [
    rgb2lrgb(r / 255),
    rgb2lrgb(g / 255),
    rgb2lrgb(b / 255)
  ];
  const l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  ];
};
var rgb2oklab_default = rgb2oklab;

// node_modules/chroma-js/src/io/oklab/index.js
Color_default.prototype.oklab = function() {
  return rgb2oklab_default(this._rgb);
};
chroma_default.oklab = (...args) => new Color_default(...args, "oklab");
input_default.format.oklab = oklab2rgb_default;
input_default.autodetect.push({
  p: 3,
  test: (...args) => {
    args = unpack_default(args, "oklab");
    if (type_default(args) === "array" && args.length === 3) {
      return "oklab";
    }
  }
});

// node_modules/chroma-js/src/io/oklch/oklch2rgb.js
var oklch2rgb = (...args) => {
  args = unpack_default(args, "lch");
  const [l, c, h] = args;
  const [L, a, b_] = lch2lab_default(l, c, h);
  const [r, g, b] = oklab2rgb_default(L, a, b_);
  return [r, g, b, args.length > 3 ? args[3] : 1];
};
var oklch2rgb_default = oklch2rgb;

// node_modules/chroma-js/src/io/oklch/rgb2oklch.js
var rgb2oklch = (...args) => {
  const [r, g, b] = unpack_default(args, "rgb");
  const [l, a, b_] = rgb2oklab_default(r, g, b);
  return lab2lch_default(l, a, b_);
};
var rgb2oklch_default = rgb2oklch;

// node_modules/chroma-js/src/io/oklch/index.js
Color_default.prototype.oklch = function() {
  return rgb2oklch_default(this._rgb);
};
chroma_default.oklch = (...args) => new Color_default(...args, "oklch");
input_default.format.oklch = oklch2rgb_default;
input_default.autodetect.push({
  p: 3,
  test: (...args) => {
    args = unpack_default(args, "oklch");
    if (type_default(args) === "array" && args.length === 3) {
      return "oklch";
    }
  }
});

// node_modules/chroma-js/src/ops/alpha.js
Color_default.prototype.alpha = function(a, mutate = false) {
  if (a !== undefined && type_default(a) === "number") {
    if (mutate) {
      this._rgb[3] = a;
      return this;
    }
    return new Color_default([this._rgb[0], this._rgb[1], this._rgb[2], a], "rgb");
  }
  return this._rgb[3];
};

// node_modules/chroma-js/src/ops/clipped.js
Color_default.prototype.clipped = function() {
  return this._rgb._clipped || false;
};

// node_modules/chroma-js/src/ops/darken.js
Color_default.prototype.darken = function(amount = 1) {
  const me = this;
  const lab2 = me.lab();
  lab2[0] -= lab_constants_default.Kn * amount;
  return new Color_default(lab2, "lab").alpha(me.alpha(), true);
};
Color_default.prototype.brighten = function(amount = 1) {
  return this.darken(-amount);
};
Color_default.prototype.darker = Color_default.prototype.darken;
Color_default.prototype.brighter = Color_default.prototype.brighten;

// node_modules/chroma-js/src/ops/get.js
Color_default.prototype.get = function(mc) {
  const [mode, channel] = mc.split(".");
  const src = this[mode]();
  if (channel) {
    const i2 = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
    if (i2 > -1)
      return src[i2];
    throw new Error(`unknown channel ${channel} in mode ${mode}`);
  } else {
    return src;
  }
};

// node_modules/chroma-js/src/ops/luminance.js
var { pow: pow5 } = Math;
var EPS = 0.0000001;
var MAX_ITER = 20;
Color_default.prototype.luminance = function(lum, mode = "rgb") {
  if (lum !== undefined && type_default(lum) === "number") {
    if (lum === 0) {
      return new Color_default([0, 0, 0, this._rgb[3]], "rgb");
    }
    if (lum === 1) {
      return new Color_default([255, 255, 255, this._rgb[3]], "rgb");
    }
    let cur_lum = this.luminance();
    let max_iter = MAX_ITER;
    const test = (low, high) => {
      const mid = low.interpolate(high, 0.5, mode);
      const lm = mid.luminance();
      if (Math.abs(lum - lm) < EPS || !max_iter--) {
        return mid;
      }
      return lm > lum ? test(low, mid) : test(mid, high);
    };
    const rgb = (cur_lum > lum ? test(new Color_default([0, 0, 0]), this) : test(this, new Color_default([255, 255, 255]))).rgb();
    return new Color_default([...rgb, this._rgb[3]]);
  }
  return rgb2luminance(...this._rgb.slice(0, 3));
};
var rgb2luminance = (r, g, b) => {
  r = luminance_x(r);
  g = luminance_x(g);
  b = luminance_x(b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
var luminance_x = (x) => {
  x /= 255;
  return x <= 0.03928 ? x / 12.92 : pow5((x + 0.055) / 1.055, 2.4);
};

// node_modules/chroma-js/src/interpolator/index.js
var interpolator_default = {};

// node_modules/chroma-js/src/generator/mix.js
var mix_default = (col1, col2, f = 0.5, ...rest) => {
  let mode = rest[0] || "lrgb";
  if (!interpolator_default[mode] && !rest.length) {
    mode = Object.keys(interpolator_default)[0];
  }
  if (!interpolator_default[mode]) {
    throw new Error(`interpolation mode ${mode} is not defined`);
  }
  if (type_default(col1) !== "object")
    col1 = new Color_default(col1);
  if (type_default(col2) !== "object")
    col2 = new Color_default(col2);
  return interpolator_default[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
};

// node_modules/chroma-js/src/ops/mix.js
Color_default.prototype.mix = Color_default.prototype.interpolate = function(col2, f = 0.5, ...rest) {
  return mix_default(this, col2, f, ...rest);
};

// node_modules/chroma-js/src/ops/premultiply.js
Color_default.prototype.premultiply = function(mutate = false) {
  const rgb = this._rgb;
  const a = rgb[3];
  if (mutate) {
    this._rgb = [rgb[0] * a, rgb[1] * a, rgb[2] * a, a];
    return this;
  } else {
    return new Color_default([rgb[0] * a, rgb[1] * a, rgb[2] * a, a], "rgb");
  }
};

// node_modules/chroma-js/src/ops/saturate.js
Color_default.prototype.saturate = function(amount = 1) {
  const me = this;
  const lch2 = me.lch();
  lch2[1] += lab_constants_default.Kn * amount;
  if (lch2[1] < 0)
    lch2[1] = 0;
  return new Color_default(lch2, "lch").alpha(me.alpha(), true);
};
Color_default.prototype.desaturate = function(amount = 1) {
  return this.saturate(-amount);
};

// node_modules/chroma-js/src/ops/set.js
Color_default.prototype.set = function(mc, value2, mutate = false) {
  const [mode, channel] = mc.split(".");
  const src = this[mode]();
  if (channel) {
    const i2 = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
    if (i2 > -1) {
      if (type_default(value2) == "string") {
        switch (value2.charAt(0)) {
          case "+":
            src[i2] += +value2;
            break;
          case "-":
            src[i2] += +value2;
            break;
          case "*":
            src[i2] *= +value2.substr(1);
            break;
          case "/":
            src[i2] /= +value2.substr(1);
            break;
          default:
            src[i2] = +value2;
        }
      } else if (type_default(value2) === "number") {
        src[i2] = value2;
      } else {
        throw new Error(`unsupported value for Color.set`);
      }
      const out = new Color_default(src, mode);
      if (mutate) {
        this._rgb = out._rgb;
        return this;
      }
      return out;
    }
    throw new Error(`unknown channel ${channel} in mode ${mode}`);
  } else {
    return src;
  }
};

// node_modules/chroma-js/src/ops/shade.js
Color_default.prototype.tint = function(f = 0.5, ...rest) {
  return mix_default(this, "white", f, ...rest);
};
Color_default.prototype.shade = function(f = 0.5, ...rest) {
  return mix_default(this, "black", f, ...rest);
};

// node_modules/chroma-js/src/interpolator/rgb.js
var rgb = (col1, col2, f) => {
  const xyz0 = col1._rgb;
  const xyz1 = col2._rgb;
  return new Color_default(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "rgb");
};
interpolator_default.rgb = rgb;

// node_modules/chroma-js/src/interpolator/lrgb.js
var { sqrt: sqrt3, pow: pow6 } = Math;
var lrgb = (col1, col2, f) => {
  const [x1, y1, z1] = col1._rgb;
  const [x2, y2, z2] = col2._rgb;
  return new Color_default(sqrt3(pow6(x1, 2) * (1 - f) + pow6(x2, 2) * f), sqrt3(pow6(y1, 2) * (1 - f) + pow6(y2, 2) * f), sqrt3(pow6(z1, 2) * (1 - f) + pow6(z2, 2) * f), "rgb");
};
interpolator_default.lrgb = lrgb;

// node_modules/chroma-js/src/interpolator/lab.js
var lab4 = (col1, col2, f) => {
  const xyz0 = col1.lab();
  const xyz1 = col2.lab();
  return new Color_default(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "lab");
};
interpolator_default.lab = lab4;

// node_modules/chroma-js/src/interpolator/_hsx.js
var _hsx_default = (col1, col2, f, m) => {
  let xyz0, xyz1;
  if (m === "hsl") {
    xyz0 = col1.hsl();
    xyz1 = col2.hsl();
  } else if (m === "hsv") {
    xyz0 = col1.hsv();
    xyz1 = col2.hsv();
  } else if (m === "hcg") {
    xyz0 = col1.hcg();
    xyz1 = col2.hcg();
  } else if (m === "hsi") {
    xyz0 = col1.hsi();
    xyz1 = col2.hsi();
  } else if (m === "lch" || m === "hcl") {
    m = "hcl";
    xyz0 = col1.hcl();
    xyz1 = col2.hcl();
  } else if (m === "oklch") {
    xyz0 = col1.oklch().reverse();
    xyz1 = col2.oklch().reverse();
  }
  let hue0, hue1, sat0, sat1, lbv0, lbv1;
  if (m.substr(0, 1) === "h" || m === "oklch") {
    [hue0, sat0, lbv0] = xyz0;
    [hue1, sat1, lbv1] = xyz1;
  }
  let sat, hue, lbv, dh;
  if (!isNaN(hue0) && !isNaN(hue1)) {
    if (hue1 > hue0 && hue1 - hue0 > 180) {
      dh = hue1 - (hue0 + 360);
    } else if (hue1 < hue0 && hue0 - hue1 > 180) {
      dh = hue1 + 360 - hue0;
    } else {
      dh = hue1 - hue0;
    }
    hue = hue0 + f * dh;
  } else if (!isNaN(hue0)) {
    hue = hue0;
    if ((lbv1 == 1 || lbv1 == 0) && m != "hsv")
      sat = sat0;
  } else if (!isNaN(hue1)) {
    hue = hue1;
    if ((lbv0 == 1 || lbv0 == 0) && m != "hsv")
      sat = sat1;
  } else {
    hue = Number.NaN;
  }
  if (sat === undefined)
    sat = sat0 + f * (sat1 - sat0);
  lbv = lbv0 + f * (lbv1 - lbv0);
  return m === "oklch" ? new Color_default([lbv, sat, hue], m) : new Color_default([hue, sat, lbv], m);
};

// node_modules/chroma-js/src/interpolator/lch.js
var lch3 = (col1, col2, f) => {
  return _hsx_default(col1, col2, f, "lch");
};
interpolator_default.lch = lch3;
interpolator_default.hcl = lch3;

// node_modules/chroma-js/src/interpolator/num.js
var num2 = (col1, col2, f) => {
  const c1 = col1.num();
  const c2 = col2.num();
  return new Color_default(c1 + f * (c2 - c1), "num");
};
interpolator_default.num = num2;

// node_modules/chroma-js/src/interpolator/hcg.js
var hcg2 = (col1, col2, f) => {
  return _hsx_default(col1, col2, f, "hcg");
};
interpolator_default.hcg = hcg2;

// node_modules/chroma-js/src/interpolator/hsi.js
var hsi2 = (col1, col2, f) => {
  return _hsx_default(col1, col2, f, "hsi");
};
interpolator_default.hsi = hsi2;

// node_modules/chroma-js/src/interpolator/hsl.js
var hsl2 = (col1, col2, f) => {
  return _hsx_default(col1, col2, f, "hsl");
};
interpolator_default.hsl = hsl2;

// node_modules/chroma-js/src/interpolator/hsv.js
var hsv2 = (col1, col2, f) => {
  return _hsx_default(col1, col2, f, "hsv");
};
interpolator_default.hsv = hsv2;

// node_modules/chroma-js/src/interpolator/oklab.js
var oklab2 = (col1, col2, f) => {
  const xyz0 = col1.oklab();
  const xyz1 = col2.oklab();
  return new Color_default(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), "oklab");
};
interpolator_default.oklab = oklab2;

// node_modules/chroma-js/src/interpolator/oklch.js
var oklch = (col1, col2, f) => {
  return _hsx_default(col1, col2, f, "oklch");
};
interpolator_default.oklch = oklch;

// node_modules/chroma-js/src/generator/average.js
var { pow: pow7, sqrt: sqrt4, PI: PI2, cos: cos3, sin: sin2, atan2: atan22 } = Math;
var average_default = (colors2, mode = "lrgb", weights = null) => {
  const l = colors2.length;
  if (!weights)
    weights = Array.from(new Array(l)).map(() => 1);
  const k = l / weights.reduce(function(a, b) {
    return a + b;
  });
  weights.forEach((w, i2) => {
    weights[i2] *= k;
  });
  colors2 = colors2.map((c) => new Color_default(c));
  if (mode === "lrgb") {
    return _average_lrgb(colors2, weights);
  }
  const first = colors2.shift();
  const xyz = first.get(mode);
  const cnt = [];
  let dx = 0;
  let dy = 0;
  for (let i2 = 0;i2 < xyz.length; i2++) {
    xyz[i2] = (xyz[i2] || 0) * weights[0];
    cnt.push(isNaN(xyz[i2]) ? 0 : weights[0]);
    if (mode.charAt(i2) === "h" && !isNaN(xyz[i2])) {
      const A = xyz[i2] / 180 * PI2;
      dx += cos3(A) * weights[0];
      dy += sin2(A) * weights[0];
    }
  }
  let alpha = first.alpha() * weights[0];
  colors2.forEach((c, ci) => {
    const xyz2 = c.get(mode);
    alpha += c.alpha() * weights[ci + 1];
    for (let i2 = 0;i2 < xyz.length; i2++) {
      if (!isNaN(xyz2[i2])) {
        cnt[i2] += weights[ci + 1];
        if (mode.charAt(i2) === "h") {
          const A = xyz2[i2] / 180 * PI2;
          dx += cos3(A) * weights[ci + 1];
          dy += sin2(A) * weights[ci + 1];
        } else {
          xyz[i2] += xyz2[i2] * weights[ci + 1];
        }
      }
    }
  });
  for (let i2 = 0;i2 < xyz.length; i2++) {
    if (mode.charAt(i2) === "h") {
      let A = atan22(dy / cnt[i2], dx / cnt[i2]) / PI2 * 180;
      while (A < 0)
        A += 360;
      while (A >= 360)
        A -= 360;
      xyz[i2] = A;
    } else {
      xyz[i2] = xyz[i2] / cnt[i2];
    }
  }
  alpha /= l;
  return new Color_default(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
};
var _average_lrgb = (colors2, weights) => {
  const l = colors2.length;
  const xyz = [0, 0, 0, 0];
  for (let i2 = 0;i2 < colors2.length; i2++) {
    const col = colors2[i2];
    const f = weights[i2] / l;
    const rgb2 = col._rgb;
    xyz[0] += pow7(rgb2[0], 2) * f;
    xyz[1] += pow7(rgb2[1], 2) * f;
    xyz[2] += pow7(rgb2[2], 2) * f;
    xyz[3] += rgb2[3] * f;
  }
  xyz[0] = sqrt4(xyz[0]);
  xyz[1] = sqrt4(xyz[1]);
  xyz[2] = sqrt4(xyz[2]);
  if (xyz[3] > 0.9999999)
    xyz[3] = 1;
  return new Color_default(clip_rgb_default(xyz));
};

// node_modules/chroma-js/src/generator/scale.js
function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i2 = left;ascending ? i2 < end : i2 > end; ascending ? i2++ : i2--) {
    range.push(i2);
  }
  return range;
}
var { pow: pow8 } = Math;
function scale_default(colors2) {
  let _mode = "rgb";
  let _nacol = chroma_default("#ccc");
  let _spread = 0;
  let _domain = [0, 1];
  let _pos = [];
  let _padding = [0, 0];
  let _classes = false;
  let _colors = [];
  let _out = false;
  let _min = 0;
  let _max = 1;
  let _correctLightness = false;
  let _colorCache = {};
  let _useCache = true;
  let _gamma = 1;
  const setColors = function(colors3) {
    colors3 = colors3 || ["#fff", "#000"];
    if (colors3 && type_default(colors3) === "string" && chroma_default.brewer && chroma_default.brewer[colors3.toLowerCase()]) {
      colors3 = chroma_default.brewer[colors3.toLowerCase()];
    }
    if (type_default(colors3) === "array") {
      if (colors3.length === 1) {
        colors3 = [colors3[0], colors3[0]];
      }
      colors3 = colors3.slice(0);
      for (let c = 0;c < colors3.length; c++) {
        colors3[c] = chroma_default(colors3[c]);
      }
      _pos.length = 0;
      for (let c = 0;c < colors3.length; c++) {
        _pos.push(c / (colors3.length - 1));
      }
    }
    resetCache();
    return _colors = colors3;
  };
  const getClass = function(value2) {
    if (_classes != null) {
      const n = _classes.length - 1;
      let i2 = 0;
      while (i2 < n && value2 >= _classes[i2]) {
        i2++;
      }
      return i2 - 1;
    }
    return 0;
  };
  let tMapLightness = (t) => t;
  let tMapDomain = (t) => t;
  const getColor = function(val, bypassMap) {
    let col, t;
    if (bypassMap == null) {
      bypassMap = false;
    }
    if (isNaN(val) || val === null) {
      return _nacol;
    }
    if (!bypassMap) {
      if (_classes && _classes.length > 2) {
        const c = getClass(val);
        t = c / (_classes.length - 2);
      } else if (_max !== _min) {
        t = (val - _min) / (_max - _min);
      } else {
        t = 1;
      }
    } else {
      t = val;
    }
    t = tMapDomain(t);
    if (!bypassMap) {
      t = tMapLightness(t);
    }
    if (_gamma !== 1) {
      t = pow8(t, _gamma);
    }
    t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
    t = limit_default(t, 0, 1);
    const k = Math.floor(t * 1e4);
    if (_useCache && _colorCache[k]) {
      col = _colorCache[k];
    } else {
      if (type_default(_colors) === "array") {
        for (let i2 = 0;i2 < _pos.length; i2++) {
          const p = _pos[i2];
          if (t <= p) {
            col = _colors[i2];
            break;
          }
          if (t >= p && i2 === _pos.length - 1) {
            col = _colors[i2];
            break;
          }
          if (t > p && t < _pos[i2 + 1]) {
            t = (t - p) / (_pos[i2 + 1] - p);
            col = chroma_default.interpolate(_colors[i2], _colors[i2 + 1], t, _mode);
            break;
          }
        }
      } else if (type_default(_colors) === "function") {
        col = _colors(t);
      }
      if (_useCache) {
        _colorCache[k] = col;
      }
    }
    return col;
  };
  var resetCache = () => _colorCache = {};
  setColors(colors2);
  const f = function(v) {
    const c = chroma_default(getColor(v));
    if (_out && c[_out]) {
      return c[_out]();
    } else {
      return c;
    }
  };
  f.classes = function(classes) {
    if (classes != null) {
      if (type_default(classes) === "array") {
        _classes = classes;
        _domain = [classes[0], classes[classes.length - 1]];
      } else {
        const d = chroma_default.analyze(_domain);
        if (classes === 0) {
          _classes = [d.min, d.max];
        } else {
          _classes = chroma_default.limits(d, "e", classes);
        }
      }
      return f;
    }
    return _classes;
  };
  f.domain = function(domain) {
    if (!arguments.length) {
      return _domain;
    }
    _min = domain[0];
    _max = domain[domain.length - 1];
    _pos = [];
    const k = _colors.length;
    if (domain.length === k && _min !== _max) {
      for (let d of Array.from(domain)) {
        _pos.push((d - _min) / (_max - _min));
      }
    } else {
      for (let c = 0;c < k; c++) {
        _pos.push(c / (k - 1));
      }
      if (domain.length > 2) {
        const tOut = domain.map((d, i2) => i2 / (domain.length - 1));
        const tBreaks = domain.map((d) => (d - _min) / (_max - _min));
        if (!tBreaks.every((val, i2) => tOut[i2] === val)) {
          tMapDomain = (t) => {
            if (t <= 0 || t >= 1)
              return t;
            let i2 = 0;
            while (t >= tBreaks[i2 + 1])
              i2++;
            const f2 = (t - tBreaks[i2]) / (tBreaks[i2 + 1] - tBreaks[i2]);
            const out = tOut[i2] + f2 * (tOut[i2 + 1] - tOut[i2]);
            return out;
          };
        }
      }
    }
    _domain = [_min, _max];
    return f;
  };
  f.mode = function(_m) {
    if (!arguments.length) {
      return _mode;
    }
    _mode = _m;
    resetCache();
    return f;
  };
  f.range = function(colors3, _pos2) {
    setColors(colors3, _pos2);
    return f;
  };
  f.out = function(_o) {
    _out = _o;
    return f;
  };
  f.spread = function(val) {
    if (!arguments.length) {
      return _spread;
    }
    _spread = val;
    return f;
  };
  f.correctLightness = function(v) {
    if (v == null) {
      v = true;
    }
    _correctLightness = v;
    resetCache();
    if (_correctLightness) {
      tMapLightness = function(t) {
        const L0 = getColor(0, true).lab()[0];
        const L1 = getColor(1, true).lab()[0];
        const pol = L0 > L1;
        let L_actual = getColor(t, true).lab()[0];
        const L_ideal = L0 + (L1 - L0) * t;
        let L_diff = L_actual - L_ideal;
        let t0 = 0;
        let t1 = 1;
        let max_iter = 20;
        while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
          (function() {
            if (pol) {
              L_diff *= -1;
            }
            if (L_diff < 0) {
              t0 = t;
              t += (t1 - t) * 0.5;
            } else {
              t1 = t;
              t += (t0 - t) * 0.5;
            }
            L_actual = getColor(t, true).lab()[0];
            return L_diff = L_actual - L_ideal;
          })();
        }
        return t;
      };
    } else {
      tMapLightness = (t) => t;
    }
    return f;
  };
  f.padding = function(p) {
    if (p != null) {
      if (type_default(p) === "number") {
        p = [p, p];
      }
      _padding = p;
      return f;
    } else {
      return _padding;
    }
  };
  f.colors = function(numColors, out) {
    if (arguments.length < 2) {
      out = "hex";
    }
    let result = [];
    if (arguments.length === 0) {
      result = _colors.slice(0);
    } else if (numColors === 1) {
      result = [f(0.5)];
    } else if (numColors > 1) {
      const dm = _domain[0];
      const dd = _domain[1] - dm;
      result = __range__(0, numColors, false).map((i2) => f(dm + i2 / (numColors - 1) * dd));
    } else {
      colors2 = [];
      let samples = [];
      if (_classes && _classes.length > 2) {
        for (let i2 = 1, end = _classes.length, asc = 1 <= end;asc ? i2 < end : i2 > end; asc ? i2++ : i2--) {
          samples.push((_classes[i2 - 1] + _classes[i2]) * 0.5);
        }
      } else {
        samples = _domain;
      }
      result = samples.map((v) => f(v));
    }
    if (chroma_default[out]) {
      result = result.map((c) => c[out]());
    }
    return result;
  };
  f.cache = function(c) {
    if (c != null) {
      _useCache = c;
      return f;
    } else {
      return _useCache;
    }
  };
  f.gamma = function(g) {
    if (g != null) {
      _gamma = g;
      return f;
    } else {
      return _gamma;
    }
  };
  f.nodata = function(d) {
    if (d != null) {
      _nacol = chroma_default(d);
      return f;
    } else {
      return _nacol;
    }
  };
  return f;
}

// node_modules/chroma-js/src/generator/bezier.js
var binom_row = function(n) {
  let row = [1, 1];
  for (let i2 = 1;i2 < n; i2++) {
    let newrow = [1];
    for (let j = 1;j <= row.length; j++) {
      newrow[j] = (row[j] || 0) + row[j - 1];
    }
    row = newrow;
  }
  return row;
};
var bezier = function(colors2) {
  let I, lab0, lab1, lab22;
  colors2 = colors2.map((c) => new Color_default(c));
  if (colors2.length === 2) {
    [lab0, lab1] = colors2.map((c) => c.lab());
    I = function(t) {
      const lab6 = [0, 1, 2].map((i2) => lab0[i2] + t * (lab1[i2] - lab0[i2]));
      return new Color_default(lab6, "lab");
    };
  } else if (colors2.length === 3) {
    [lab0, lab1, lab22] = colors2.map((c) => c.lab());
    I = function(t) {
      const lab6 = [0, 1, 2].map((i2) => (1 - t) * (1 - t) * lab0[i2] + 2 * (1 - t) * t * lab1[i2] + t * t * lab22[i2]);
      return new Color_default(lab6, "lab");
    };
  } else if (colors2.length === 4) {
    let lab32;
    [lab0, lab1, lab22, lab32] = colors2.map((c) => c.lab());
    I = function(t) {
      const lab6 = [0, 1, 2].map((i2) => (1 - t) * (1 - t) * (1 - t) * lab0[i2] + 3 * (1 - t) * (1 - t) * t * lab1[i2] + 3 * (1 - t) * t * t * lab22[i2] + t * t * t * lab32[i2]);
      return new Color_default(lab6, "lab");
    };
  } else if (colors2.length >= 5) {
    let labs, row, n;
    labs = colors2.map((c) => c.lab());
    n = colors2.length - 1;
    row = binom_row(n);
    I = function(t) {
      const u = 1 - t;
      const lab6 = [0, 1, 2].map((i2) => labs.reduce((sum, el, j) => sum + row[j] * u ** (n - j) * t ** j * el[i2], 0));
      return new Color_default(lab6, "lab");
    };
  } else {
    throw new RangeError("No point in running bezier with only one color.");
  }
  return I;
};
var bezier_default = (colors2) => {
  const f = bezier(colors2);
  f.scale = () => scale_default(f);
  return f;
};

// node_modules/chroma-js/src/generator/blend.js
var blend = (bottom, top, mode) => {
  if (!blend[mode]) {
    throw new Error("unknown blend mode " + mode);
  }
  return blend[mode](bottom, top);
};
var blend_f = (f) => (bottom, top) => {
  const c0 = chroma_default(top).rgb();
  const c1 = chroma_default(bottom).rgb();
  return chroma_default.rgb(f(c0, c1));
};
var each = (f) => (c0, c1) => {
  const out = [];
  out[0] = f(c0[0], c1[0]);
  out[1] = f(c0[1], c1[1]);
  out[2] = f(c0[2], c1[2]);
  return out;
};
var normal = (a) => a;
var multiply = (a, b) => a * b / 255;
var darken = (a, b) => a > b ? b : a;
var lighten = (a, b) => a > b ? a : b;
var screen = (a, b) => 255 * (1 - (1 - a / 255) * (1 - b / 255));
var overlay = (a, b) => b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
var burn = (a, b) => 255 * (1 - (1 - b / 255) / (a / 255));
var dodge = (a, b) => {
  if (a === 255)
    return 255;
  a = 255 * (b / 255) / (1 - a / 255);
  return a > 255 ? 255 : a;
};
blend.normal = blend_f(each(normal));
blend.multiply = blend_f(each(multiply));
blend.screen = blend_f(each(screen));
blend.overlay = blend_f(each(overlay));
blend.darken = blend_f(each(darken));
blend.lighten = blend_f(each(lighten));
blend.dodge = blend_f(each(dodge));
blend.burn = blend_f(each(burn));
var blend_default = blend;

// node_modules/chroma-js/src/generator/cubehelix.js
var { pow: pow9, sin: sin3, cos: cos4 } = Math;
function cubehelix_default(start = 300, rotations = -1.5, hue = 1, gamma = 1, lightness = [0, 1]) {
  let dh = 0, dl;
  if (type_default(lightness) === "array") {
    dl = lightness[1] - lightness[0];
  } else {
    dl = 0;
    lightness = [lightness, lightness];
  }
  const f = function(fract) {
    const a = TWOPI * ((start + 120) / 360 + rotations * fract);
    const l = pow9(lightness[0] + dl * fract, gamma);
    const h = dh !== 0 ? hue[0] + fract * dh : hue;
    const amp = h * l * (1 - l) / 2;
    const cos_a = cos4(a);
    const sin_a = sin3(a);
    const r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
    const g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
    const b = l + amp * (1.97294 * cos_a);
    return chroma_default(clip_rgb_default([r * 255, g * 255, b * 255, 1]));
  };
  f.start = function(s) {
    if (s == null) {
      return start;
    }
    start = s;
    return f;
  };
  f.rotations = function(r) {
    if (r == null) {
      return rotations;
    }
    rotations = r;
    return f;
  };
  f.gamma = function(g) {
    if (g == null) {
      return gamma;
    }
    gamma = g;
    return f;
  };
  f.hue = function(h) {
    if (h == null) {
      return hue;
    }
    hue = h;
    if (type_default(hue) === "array") {
      dh = hue[1] - hue[0];
      if (dh === 0) {
        hue = hue[1];
      }
    } else {
      dh = 0;
    }
    return f;
  };
  f.lightness = function(h) {
    if (h == null) {
      return lightness;
    }
    if (type_default(h) === "array") {
      lightness = h;
      dl = h[1] - h[0];
    } else {
      lightness = [h, h];
      dl = 0;
    }
    return f;
  };
  f.scale = () => chroma_default.scale(f);
  f.hue(hue);
  return f;
}

// node_modules/chroma-js/src/generator/random.js
var digits = "0123456789abcdef";
var { floor: floor3, random } = Math;
var random_default = () => {
  let code = "#";
  for (let i2 = 0;i2 < 6; i2++) {
    code += digits.charAt(floor3(random() * 16));
  }
  return new Color_default(code, "hex");
};

// node_modules/chroma-js/src/utils/analyze.js
function analyze(data, key = null) {
  const r = {
    min: Number.MAX_VALUE,
    max: Number.MAX_VALUE * -1,
    sum: 0,
    values: [],
    count: 0
  };
  if (type_default(data) === "object") {
    data = Object.values(data);
  }
  data.forEach((val) => {
    if (key && type_default(val) === "object")
      val = val[key];
    if (val !== undefined && val !== null && !isNaN(val)) {
      r.values.push(val);
      r.sum += val;
      if (val < r.min)
        r.min = val;
      if (val > r.max)
        r.max = val;
      r.count += 1;
    }
  });
  r.domain = [r.min, r.max];
  r.limits = (mode, num3) => limits(r, mode, num3);
  return r;
}
function limits(data, mode = "equal", num3 = 7) {
  if (type_default(data) == "array") {
    data = analyze(data);
  }
  const { min: min4, max: max4 } = data;
  const values = data.values.sort((a, b) => a - b);
  if (num3 === 1) {
    return [min4, max4];
  }
  const limits2 = [];
  if (mode.substr(0, 1) === "c") {
    limits2.push(min4);
    limits2.push(max4);
  }
  if (mode.substr(0, 1) === "e") {
    limits2.push(min4);
    for (let i2 = 1;i2 < num3; i2++) {
      limits2.push(min4 + i2 / num3 * (max4 - min4));
    }
    limits2.push(max4);
  } else if (mode.substr(0, 1) === "l") {
    if (min4 <= 0) {
      throw new Error("Logarithmic scales are only possible for values > 0");
    }
    const min_log = Math.LOG10E * log2(min4);
    const max_log = Math.LOG10E * log2(max4);
    limits2.push(min4);
    for (let i2 = 1;i2 < num3; i2++) {
      limits2.push(pow10(10, min_log + i2 / num3 * (max_log - min_log)));
    }
    limits2.push(max4);
  } else if (mode.substr(0, 1) === "q") {
    limits2.push(min4);
    for (let i2 = 1;i2 < num3; i2++) {
      const p = (values.length - 1) * i2 / num3;
      const pb = floor4(p);
      if (pb === p) {
        limits2.push(values[pb]);
      } else {
        const pr = p - pb;
        limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
      }
    }
    limits2.push(max4);
  } else if (mode.substr(0, 1) === "k") {
    let cluster;
    const n = values.length;
    const assignments = new Array(n);
    const clusterSizes = new Array(num3);
    let repeat = true;
    let nb_iters = 0;
    let centroids = null;
    centroids = [];
    centroids.push(min4);
    for (let i2 = 1;i2 < num3; i2++) {
      centroids.push(min4 + i2 / num3 * (max4 - min4));
    }
    centroids.push(max4);
    while (repeat) {
      for (let j = 0;j < num3; j++) {
        clusterSizes[j] = 0;
      }
      for (let i2 = 0;i2 < n; i2++) {
        const value2 = values[i2];
        let mindist = Number.MAX_VALUE;
        let best;
        for (let j = 0;j < num3; j++) {
          const dist = abs(centroids[j] - value2);
          if (dist < mindist) {
            mindist = dist;
            best = j;
          }
          clusterSizes[best]++;
          assignments[i2] = best;
        }
      }
      const newCentroids = new Array(num3);
      for (let j = 0;j < num3; j++) {
        newCentroids[j] = null;
      }
      for (let i2 = 0;i2 < n; i2++) {
        cluster = assignments[i2];
        if (newCentroids[cluster] === null) {
          newCentroids[cluster] = values[i2];
        } else {
          newCentroids[cluster] += values[i2];
        }
      }
      for (let j = 0;j < num3; j++) {
        newCentroids[j] *= 1 / clusterSizes[j];
      }
      repeat = false;
      for (let j = 0;j < num3; j++) {
        if (newCentroids[j] !== centroids[j]) {
          repeat = true;
          break;
        }
      }
      centroids = newCentroids;
      nb_iters++;
      if (nb_iters > 200) {
        repeat = false;
      }
    }
    const kClusters = {};
    for (let j = 0;j < num3; j++) {
      kClusters[j] = [];
    }
    for (let i2 = 0;i2 < n; i2++) {
      cluster = assignments[i2];
      kClusters[cluster].push(values[i2]);
    }
    let tmpKMeansBreaks = [];
    for (let j = 0;j < num3; j++) {
      tmpKMeansBreaks.push(kClusters[j][0]);
      tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
    }
    tmpKMeansBreaks = tmpKMeansBreaks.sort((a, b) => a - b);
    limits2.push(tmpKMeansBreaks[0]);
    for (let i2 = 1;i2 < tmpKMeansBreaks.length; i2 += 2) {
      const v = tmpKMeansBreaks[i2];
      if (!isNaN(v) && limits2.indexOf(v) === -1) {
        limits2.push(v);
      }
    }
  }
  return limits2;
}
var { log: log2, pow: pow10, floor: floor4, abs } = Math;

// node_modules/chroma-js/src/utils/contrast.js
var contrast_default = (a, b) => {
  a = new Color_default(a);
  b = new Color_default(b);
  const l1 = a.luminance();
  const l2 = b.luminance();
  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

// node_modules/chroma-js/src/utils/delta-e.js
var { sqrt: sqrt5, pow: pow11, min: min4, max: max4, atan2: atan23, abs: abs2, cos: cos5, sin: sin4, exp, PI: PI3 } = Math;
function delta_e_default(a, b, Kl = 1, Kc = 1, Kh = 1) {
  var rad2deg = function(rad) {
    return 360 * rad / (2 * PI3);
  };
  var deg2rad = function(deg) {
    return 2 * PI3 * deg / 360;
  };
  a = new Color_default(a);
  b = new Color_default(b);
  const [L1, a1, b1] = Array.from(a.lab());
  const [L2, a2, b2] = Array.from(b.lab());
  const avgL = (L1 + L2) / 2;
  const C1 = sqrt5(pow11(a1, 2) + pow11(b1, 2));
  const C2 = sqrt5(pow11(a2, 2) + pow11(b2, 2));
  const avgC = (C1 + C2) / 2;
  const G = 0.5 * (1 - sqrt5(pow11(avgC, 7) / (pow11(avgC, 7) + pow11(25, 7))));
  const a1p = a1 * (1 + G);
  const a2p = a2 * (1 + G);
  const C1p = sqrt5(pow11(a1p, 2) + pow11(b1, 2));
  const C2p = sqrt5(pow11(a2p, 2) + pow11(b2, 2));
  const avgCp = (C1p + C2p) / 2;
  const arctan1 = rad2deg(atan23(b1, a1p));
  const arctan2 = rad2deg(atan23(b2, a2p));
  const h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
  const h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
  const avgHp = abs2(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
  const T = 1 - 0.17 * cos5(deg2rad(avgHp - 30)) + 0.24 * cos5(deg2rad(2 * avgHp)) + 0.32 * cos5(deg2rad(3 * avgHp + 6)) - 0.2 * cos5(deg2rad(4 * avgHp - 63));
  let deltaHp = h2p - h1p;
  deltaHp = abs2(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
  deltaHp = 2 * sqrt5(C1p * C2p) * sin4(deg2rad(deltaHp) / 2);
  const deltaL = L2 - L1;
  const deltaCp = C2p - C1p;
  const sl = 1 + 0.015 * pow11(avgL - 50, 2) / sqrt5(20 + pow11(avgL - 50, 2));
  const sc = 1 + 0.045 * avgCp;
  const sh = 1 + 0.015 * avgCp * T;
  const deltaTheta = 30 * exp(-pow11((avgHp - 275) / 25, 2));
  const Rc = 2 * sqrt5(pow11(avgCp, 7) / (pow11(avgCp, 7) + pow11(25, 7)));
  const Rt = -Rc * sin4(2 * deg2rad(deltaTheta));
  const result = sqrt5(pow11(deltaL / (Kl * sl), 2) + pow11(deltaCp / (Kc * sc), 2) + pow11(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)));
  return max4(0, min4(100, result));
}

// node_modules/chroma-js/src/utils/distance.js
function distance_default(a, b, mode = "lab") {
  a = new Color_default(a);
  b = new Color_default(b);
  const l1 = a.get(mode);
  const l2 = b.get(mode);
  let sum_sq = 0;
  for (let i2 in l1) {
    const d = (l1[i2] || 0) - (l2[i2] || 0);
    sum_sq += d * d;
  }
  return Math.sqrt(sum_sq);
}

// node_modules/chroma-js/src/utils/valid.js
var valid_default = (...args) => {
  try {
    new Color_default(...args);
    return true;
  } catch (e) {
    return false;
  }
};

// node_modules/chroma-js/src/utils/scales.js
var scales_default = {
  cool() {
    return scale_default([chroma_default.hsl(180, 1, 0.9), chroma_default.hsl(250, 0.7, 0.4)]);
  },
  hot() {
    return scale_default(["#000", "#f00", "#ff0", "#fff"], [0, 0.25, 0.75, 1]).mode("rgb");
  }
};

// node_modules/chroma-js/src/colors/colorbrewer.js
var colorbrewer = {
  OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
  PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
  BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
  Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
  BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
  YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
  YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
  Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
  RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
  Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
  YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
  Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
  GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
  Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
  YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
  PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
  Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
  PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
  Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
  Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
  RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
  RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
  PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
  PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
  RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
  BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
  RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
  PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
  Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
  Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
  Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
  Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
  Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
  Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
  Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
  Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
};
for (let key of Object.keys(colorbrewer)) {
  colorbrewer[key.toLowerCase()] = colorbrewer[key];
}
var colorbrewer_default = colorbrewer;

// node_modules/chroma-js/index.js
Object.assign(chroma_default, {
  average: average_default,
  bezier: bezier_default,
  blend: blend_default,
  cubehelix: cubehelix_default,
  mix: mix_default,
  interpolate: mix_default,
  random: random_default,
  scale: scale_default,
  analyze,
  contrast: contrast_default,
  deltaE: delta_e_default,
  distance: distance_default,
  limits,
  valid: valid_default,
  scales: scales_default,
  input: input_default,
  colors: w3cx11_default,
  brewer: colorbrewer_default
});
var chroma_js_default = chroma_default;

// node_modules/kanastra-palette/src/utils.ts
function determineBaseStep(color) {
  const luminance3 = color.luminance();
  if (luminance3 > 0.8)
    return 100;
  if (luminance3 > 0.6)
    return 200;
  if (luminance3 > 0.4)
    return 300;
  if (luminance3 > 0.3)
    return 400;
  if (luminance3 > 0.2)
    return 500;
  if (luminance3 > 0.1)
    return 600;
  if (luminance3 > 0.05)
    return 700;
  return 800;
}

// node_modules/kanastra-palette/src/index.ts
function createPaletteFromColor(name2, hex2, options = {}) {
  if (!chroma_js_default.valid(hex2)) {
    throw new Error(`Invalid color: ${hex2}`);
  }
  const baseColor = chroma_js_default(hex2);
  const palette = {};
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const baseStep = determineBaseStep(baseColor);
  steps.forEach((step) => {
    let color;
    if (step < baseStep) {
      const mixRatio = 1 - step / baseStep;
      color = chroma_js_default.mix(baseColor, "white", mixRatio, "rgb");
    } else if (step > baseStep) {
      const mixRatio = (step - baseStep) / (900 - baseStep);
      color = chroma_js_default.mix(baseColor, "black", mixRatio, "rgb");
      if (step === 900 && color.hex() === "#000000") {
        color = chroma_js_default.mix(baseColor, "black", mixRatio * 0.9, "rgb");
      }
    } else {
      color = baseColor;
    }
    palette[step] = color.hex();
  });
  return { [name2]: palette };
}

// utils/colors/palette-generator.ts
import path3 from "path";
import fs2 from "fs";
function generateCSS({
  prefix,
  colors: colors2,
  css: css2
}) {
  Object.keys(colors2).forEach((key) => {
    const colorRule = `${prefix}-${key}: ${colors2[key]};`;
    css2 += `\n    ${colorRule}`;
  });
}
function palleteGenerator() {
  try {
    const colorCSSPath = path3.resolve(process.cwd(), "./blaze/styles/color.css");
    const colorJSON = fs2.readFileSync(path3.resolve(process.cwd(), "./blaze/theme/color.json"), "utf8");
    const colorObj = JSON.parse(colorJSON);
    const colorTitleIndex = process.argv.findIndex((v) => Boolean(v.match(/--base/)));
    if (!colorObj.main) {
      console.log("Please enter a valid base color");
      process.exit();
    }
    let palleteObj = {};
    const baseColor = process.argv[colorTitleIndex + 1];
    const primaryPalette = createPaletteFromColor("primary", baseColor);
    palleteObj = { ...primaryPalette };
    const secColorTitleIndex = process.argv.findIndex((v) => Boolean(v.match(/--sec/)));
    if (secColorTitleIndex > 0 && process.argv[secColorTitleIndex + 1]) {
      const secColor = process.argv[secColorTitleIndex + 1];
      const secPalette = createPaletteFromColor("sec", secColor);
      palleteObj = { ...palleteObj, ...secPalette };
    } else {
      const secPalette = createPaletteFromColor("sec", "#1C8F5B");
      palleteObj = { ...palleteObj, ...secPalette };
    }
    const accentColorTitleIndex = process.argv.findIndex((v) => Boolean(v.match(/--accent/)));
    if (accentColorTitleIndex > 0 && Boolean(process.argv[accentColorTitleIndex + 1])) {
      const accentColor = process.argv[accentColorTitleIndex + 1];
      const accentPalette = createPaletteFromColor("accent", accentColor);
      palleteObj = { ...palleteObj, ...accentPalette };
    } else {
      const accentPalette = createPaletteFromColor("accent", "#3a3fa8");
      palleteObj = { ...palleteObj, ...accentPalette };
    }
    const grayColorTitleIndex = process.argv.findIndex((v) => Boolean(v.match(/--gr(a|e)y/)));
    if (grayColorTitleIndex > 0 && Boolean(process.argv[grayColorTitleIndex + 1])) {
      const grayColor = process.argv[grayColorTitleIndex + 1];
      const grayPalette = createPaletteFromColor("gray", grayColor);
      palleteObj = { ...palleteObj, ...grayPalette };
    } else {
      const grayPalette = createPaletteFromColor("gray", "#475569");
      palleteObj = { ...palleteObj, ...grayPalette };
    }
    let colorTxt = `:root {`;
    generateCSS({
      prefix: "--main-color",
      colors: palleteObj.primary,
      css: colorTxt
    });
    if (palleteObj.sec)
      generateCSS({
        prefix: "--sec-color",
        colors: palleteObj.sec,
        css: colorTxt
      });
    if (palleteObj.accent)
      generateCSS({
        prefix: "--accent-color",
        colors: palleteObj.accent,
        css: colorTxt
      });
    if (palleteObj.gray)
      generateCSS({
        prefix: "--gray-color",
        colors: palleteObj.gray,
        css: colorTxt
      });
    colorTxt += `\n}`;
    if (fs2.existsSync(colorCSSPath)) {
      fs2.writeFileSync(colorCSSPath, colorTxt, "utf8");
      console.log("Colors Updated Successfully");
    } else {
      console.log("Please run this function from your root directory");
    }
  } catch (error) {
    console.log(error);
  }
}

// bin/index.ts
var initIndex = process.argv.findIndex((v) => v.match(/--init/));
var themeindex = process.argv.findIndex((v) => v.match(/--theme/));
var isInit = initIndex > 0;
var isTheme = themeindex > 0;
if (isInit) {
  init_default();
} else if (isTheme) {
  palleteGenerator();
} else {
  console.log("Please enter a flag to use the CLI. --init to initialize, --theme to setup theme");
  process.exit();
}
