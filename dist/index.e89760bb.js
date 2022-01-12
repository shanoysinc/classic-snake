// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fOQa2":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "7de6b00ee89760bb";
"use strict";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"ftAGR":[function(require,module,exports) {
var _types = require("./types/types");
var _index = require("./constants/index");
var _index1 = require("./DomElements/index");
var _generateGrid = require("./helpers/generateGrid");
var _generateInitSnake = require("./helpers/generateInitSnake");
var _snake = require("./utils/snake");
var _snakeBodyCache = require("./utils/snakeBodyCache");
var _gameHighScore = require("./utils/gameHighScore");
var _increaseSnakeSize = require("./helpers/increaseSnakeSize");
var _removeSnakeBody = require("./helpers/removeSnakeBody");
var _moveSnake = require("./helpers/moveSnake");
let playGame = undefined;
let SnakeSpeed = 100;
let scoreCount = 0;
let isPause = false;
let hasGameStarted = false;
let isGameOver = false;
const snake = new _snake.Snake();
const snakeBodyCache = new _snakeBodyCache.SnakeBodyCache(snake);
_generateInitSnake.generateInitSnake(snake);
// document.addEventListener("DOMContentLoaded", () => {
let applePos = Math.floor(Math.random() * _index.GRID_SIZE);
_generateGrid.gridBlockElements[applePos].classList.add("apple");
const highScore = _gameHighScore.getHighScore();
_index1.highScoreElement && (_index1.highScoreElement.textContent = highScore.toString());
function drawSnake() {
    snake.forEach((index)=>{
        _generateGrid.gridBlockElements[index].classList.add("snakeBody");
    });
}
drawSnake();
function snakeControl(e) {
    // user can click the button R to restart game
    if (e.keyCode === 82) _index1.restartBtn?.click();
    // space bar keycode
    if (e.keyCode === 32) {
        if (isGameOver) return;
        if (isPause) {
            _index1.startBtn?.click();
            isPause = false;
            return;
        }
        _index1.pauseBtn?.click();
        isPause = true;
    }
    if (e.keyCode === 40) {
        //prevent user from clicking multiply times to move the snake
        if (snake.direction === _types.SnakeDirection.DOWN || snake.direction === _types.SnakeDirection.UP) return;
        snake.direction = _types.SnakeDirection.DOWN;
    } else if (e.keyCode === 39) {
        //prevent user from clicking multiply times to move the snake
        if (snake.direction === _types.SnakeDirection.RIGHT || snake.direction === _types.SnakeDirection.LEFT) return;
        snake.direction = _types.SnakeDirection.RIGHT;
    } else if (e.keyCode === 38) {
        //prevent user from clicking multiply times to move the snake
        if (snake.direction === _types.SnakeDirection.UP || snake.direction === _types.SnakeDirection.DOWN) return;
        snake.direction = _types.SnakeDirection.UP;
    } else if (e.keyCode === 37) {
        if (snake.direction === _types.SnakeDirection.UP || snake.direction === _types.SnakeDirection.DOWN) snake.direction = _types.SnakeDirection.LEFT;
    }
}
document.addEventListener("keyup", snakeControl);
function StopGame() {
    clearInterval(playGame);
    playGame = undefined;
    hasGameStarted = false;
}
_index1.startBtn?.addEventListener("click", ()=>{
    if (hasGameStarted) return;
    hasGameStarted = true;
    // I use window.setInterval instead of setInterval to avoid conflict with Nodejs
    // setInterval and to fix Typescript type infer
    playGame = window.setInterval(()=>{
        switch(snake.direction){
            case _types.SnakeDirection.RIGHT:
                _moveSnake.moveSnake(snake, snake.moveRight(), snakeBodyCache);
                break;
            case _types.SnakeDirection.DOWN:
                _moveSnake.moveSnake(snake, snake.moveDown(), snakeBodyCache);
                break;
            case _types.SnakeDirection.UP:
                _moveSnake.moveSnake(snake, snake.moveUp(), snakeBodyCache);
                break;
            case _types.SnakeDirection.LEFT:
                _moveSnake.moveSnake(snake, snake.moveLeft(), snakeBodyCache);
                break;
            default:
                break;
        }
        if (scoreCount > highScore) {
            _index1.highScoreElement && (_index1.highScoreElement.textContent = scoreCount.toString());
            _gameHighScore.setHighScore(scoreCount);
        }
        const snakeHeadIndx = snake.head?.value;
        if (snakeHeadIndx) {
            if (snakeHeadIndx < 0) snake.insertAtBegin(600 + snakeHeadIndx);
            if (snakeHeadIndx > 599) snake.insertAtBegin(600 - snakeHeadIndx);
            //check if the snake head collides with its the body
            const isSnakeHeadEqualToBodyIndx = snakeBodyCache.hasIndex(snakeHeadIndx);
            if (isSnakeHeadEqualToBodyIndx) {
                isGameOver = true;
                _index1.gameOverModalElement && (_index1.gameOverModalElement.style.display = "block");
                StopGame();
            }
        }
        const isSnakeBodyEqualToApplePos = snakeBodyCache.hasIndex(applePos);
        const isSnakeHeadEqualToApplePos = snakeHeadIndx === applePos;
        if (isSnakeHeadEqualToApplePos || isSnakeBodyEqualToApplePos) {
            scoreCount++;
            _index1.scoreElement && (_index1.scoreElement.innerHTML = scoreCount.toString());
            _generateGrid.gridBlockElements[applePos].classList.remove("apple");
            applePos = Math.floor(Math.random() * _index.GRID_SIZE);
            _generateGrid.gridBlockElements[applePos].classList.add("apple");
            if (scoreCount >= 15 && scoreCount % 2 === 0) {
                _increaseSnakeSize.increaseSnakeSize(snake);
                _increaseSnakeSize.increaseSnakeSize(snake);
            } else if (scoreCount % 2 === 0) _increaseSnakeSize.increaseSnakeSize(snake);
            if (scoreCount % 4 === 0 && SnakeSpeed > 60) {
                // increase snake speed
                SnakeSpeed -= 5;
                //restart interval to adjust snake speed when it is decrease
                StopGame();
                _index1.startBtn?.click();
            }
        }
    }, SnakeSpeed);
});
_index1.pauseBtn?.addEventListener("click", ()=>{
    StopGame();
});
function restartGame() {
    isGameOver = false;
    StopGame();
    snake.forEach((index)=>{
        _removeSnakeBody.removeSnakeBody(index);
        snakeBodyCache.removeBodyIndx(index);
    });
    scoreCount = 0;
    SnakeSpeed = 100;
    _index1.scoreElement && (_index1.scoreElement.innerHTML = scoreCount.toString());
    _generateInitSnake.generateInitSnake(snake);
    _index1.gameOverModalElement && (_index1.gameOverModalElement.style.display = "none");
    _index1.startBtn?.click();
}
_index1.restartBtn?.addEventListener("click", restartGame);
_index1.modalRestartBtn?.addEventListener("click", restartGame);

},{"./types/types":"kqsfB","./constants/index":"aJFLt","./DomElements/index":"cX0QQ","./helpers/generateGrid":"2L8ok","./helpers/generateInitSnake":"5fqvP","./utils/snake":"9GalK","./utils/snakeBodyCache":"l6ptT","./utils/gameHighScore":"bu6K1","./helpers/increaseSnakeSize":"6YAt5","./helpers/removeSnakeBody":"bgXQ6","./helpers/moveSnake":"klUSv"}],"kqsfB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SnakeDirection", ()=>SnakeDirection
);
let SnakeDirection;
(function(SnakeDirection1) {
    SnakeDirection1["LEFT"] = "LEFT";
    SnakeDirection1["RIGHT"] = "RIGHT";
    SnakeDirection1["UP"] = "UP";
    SnakeDirection1["DOWN"] = "DOWN";
})(SnakeDirection || (SnakeDirection = {
}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"aJFLt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GRID_SIZE", ()=>GRID_SIZE
);
const GRID_SIZE = 600;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cX0QQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "startBtn", ()=>startBtn
);
parcelHelpers.export(exports, "pauseBtn", ()=>pauseBtn
);
parcelHelpers.export(exports, "modalRestartBtn", ()=>modalRestartBtn
);
parcelHelpers.export(exports, "restartBtn", ()=>restartBtn
);
parcelHelpers.export(exports, "snakeGrid", ()=>snakeGrid
);
parcelHelpers.export(exports, "gameOverModalElement", ()=>gameOverModalElement
);
parcelHelpers.export(exports, "highScoreElement", ()=>highScoreElement
);
parcelHelpers.export(exports, "scoreElement", ()=>scoreElement
);
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const modalRestartBtn = document.querySelector(".modal__restartBtn");
const restartBtn = document.querySelector(".restartBtn");
const snakeGrid = document.getElementById("snakeGrid");
const gameOverModalElement = document.getElementById("gameOver__modal");
const highScoreElement = document.getElementById("highscore");
const scoreElement = document.getElementById("score-count");

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2L8ok":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "gridBlockElements", ()=>gridBlockElements
);
var _index = require("../constants/index");
var _index1 = require("../DomElements/index");
function generateGrid() {
    for(let index = 0; index < _index.GRID_SIZE; index++){
        const divElement = document.createElement("div");
        divElement.classList.add(`gridIndx-${index}`);
        _index1.snakeGrid?.appendChild(divElement);
    }
}
function getGridBlockElements() {
    const gridBlockElements1 = document.querySelectorAll("#snakeGrid div");
    return gridBlockElements1;
}
function initGrid() {
    generateGrid();
    const gridBlockElements2 = getGridBlockElements();
    return {
        gridBlockElements: gridBlockElements2
    };
}
const { gridBlockElements  } = initGrid();

},{"../constants/index":"aJFLt","../DomElements/index":"cX0QQ","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5fqvP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateInitSnake", ()=>generateInitSnake
);
function generateInitSnake(snake) {
    snake.head = null;
    snake.insertAtEnd(103);
    snake.insertAtEnd(102);
    snake.insertAtEnd(101);
    snake.insertAtEnd(100);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"9GalK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Snake", ()=>Snake
);
var _types = require("../types/types");
var _doubleLinklist = require("./doubleLinklist");
class Snake extends _doubleLinklist.DoubleLinkList {
    constructor(){
        super();
        this.direction = _types.SnakeDirection.RIGHT;
    }
    moveUp() {
        // because we want to minus 30 from the head value we pass the arg -30
        // -1 to move Up
        return this.moveSnake(-30);
    }
    moveRight() {
        return this.moveSnake(1);
    }
    moveDown() {
        return this.moveSnake(30);
    }
    moveLeft() {
        // because we want to minus 1 from the head value we pass the arg -1
        // -1 to move left
        return this.moveSnake(-1);
    }
    moveSnake(directionValue) {
        if (this.head) {
            let newHeadValue = this.head.value + directionValue;
            const newHeadIndx = this.insertAtBegin(newHeadValue);
            const oldTailIndx = this.removeEndNode();
            return {
                newHeadIndx,
                oldTailIndx
            };
        }
    }
}

},{"../types/types":"kqsfB","./doubleLinklist":"eBW0h","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"eBW0h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DoubleLinkList", ()=>DoubleLinkList
);
class LinkListNode {
    constructor(value){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class DoubleLinkList {
    constructor(){
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    insertAtBegin(value) {
        const newNode = new LinkListNode(value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            const oldHead = this.head;
            newNode.next = oldHead;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
        return value;
    }
    insertAtEnd(value) {
        const newNode = new LinkListNode(value);
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
        } else if (this.tail) {
            const temp = this.tail;
            this.tail = newNode;
            this.tail.prev = temp;
            this.tail.prev.next = this.tail;
        }
        this.size++;
        return value;
    }
    removeEndNode() {
        if (this.tail) {
            const deletedTailValue = this.tail.value;
            let prevNode = this.tail.prev;
            prevNode?.prev && (prevNode.next = null);
            this.tail = prevNode;
            this.size--;
            return deletedTailValue;
        }
    }
    forEach(callback) {
        let currentNode = this.head;
        let index = 0;
        while(currentNode){
            callback(currentNode.value, index);
            currentNode = currentNode.next;
            index += 1;
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"l6ptT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SnakeBodyCache", ()=>SnakeBodyCache
);
class SnakeBodyCache {
    constructor(snake){
        this.cache = {
        };
        snake.forEach((bdyIndx, index)=>{
            if (index !== 0) this.addToCache(bdyIndx);
        });
    }
    hasIndex(headIndx) {
        if (this.cache[headIndx]) return true;
        return false;
    }
    addBodyIndx(snake) {
        if (snake.head?.next) {
            let snakeBodyIndx = snake.head?.next.value;
            this.addToCache(snakeBodyIndx);
        }
    }
    removeBodyIndx(oldTailIndx) {
        if (oldTailIndx) {
            if (this.cache[oldTailIndx]) this.cache[oldTailIndx] = false;
        }
    }
    addToCache(index) {
        if (!this.cache[index]) this.cache[index] = true;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bu6K1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// fetch the highscore from localstorage if there is a value
parcelHelpers.export(exports, "getHighScore", ()=>getHighScore
);
// set the highscore in localstorage
parcelHelpers.export(exports, "setHighScore", ()=>setHighScore
);
function getHighScore() {
    const highScore = localStorage.getItem("lost-Snake#HS");
    if (!highScore) return 0;
    return parseInt(highScore);
}
function setHighScore(newHighScore) {
    localStorage.setItem("lost-Snake#HS", newHighScore.toString());
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6YAt5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "increaseSnakeSize", ()=>increaseSnakeSize
);
var _generateGrid = require("../helpers/generateGrid");
function increaseSnakeSize(snake) {
    if (snake.head && snake.tail) {
        const newTailIndx = snake.tail.value - 1;
        snake.insertAtEnd(newTailIndx);
        _generateGrid.gridBlockElements[newTailIndx].classList.add("snakeBody");
    }
}

},{"../helpers/generateGrid":"2L8ok","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bgXQ6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "removeSnakeBody", ()=>removeSnakeBody
);
var _index = require("../constants/index");
var _generateGrid = require("../helpers/generateGrid");
function removeSnakeBody(index) {
    if (index < 0 || index > _index.GRID_SIZE - 1) return;
    _generateGrid.gridBlockElements[index].classList.remove("snakeBody");
}

},{"../constants/index":"aJFLt","../helpers/generateGrid":"2L8ok","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"klUSv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// import { gridBlockElement } from "../DomElements";
parcelHelpers.export(exports, "moveSnake", ()=>moveSnake
);
var _addSnakeBody = require("./addSnakeBody");
var _removeSnakeBody = require("./removeSnakeBody");
function moveSnake(snake, snakeBody, snakeBodyCache) {
    // adding the previous head to cache
    snakeBodyCache.addBodyIndx(snake);
    if (snakeBody?.oldTailIndx) {
        snakeBodyCache.removeBodyIndx(snakeBody.oldTailIndx);
        _removeSnakeBody.removeSnakeBody(snakeBody.oldTailIndx);
    }
    if (snakeBody?.newHeadIndx) _addSnakeBody.addSnakeBody(snakeBody.newHeadIndx);
}

},{"./addSnakeBody":"2OCls","./removeSnakeBody":"bgXQ6","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"2OCls":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addSnakeBody", ()=>addSnakeBody
);
var _index = require("../constants/index");
var _generateGrid = require("../helpers/generateGrid");
function addSnakeBody(index) {
    if (index < 0 || index > _index.GRID_SIZE - 1) return;
    _generateGrid.gridBlockElements[index].classList.add("snakeBody");
}

},{"../constants/index":"aJFLt","../helpers/generateGrid":"2L8ok","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["fOQa2","ftAGR"], "ftAGR", "parcelRequired430")

//# sourceMappingURL=index.e89760bb.js.map
