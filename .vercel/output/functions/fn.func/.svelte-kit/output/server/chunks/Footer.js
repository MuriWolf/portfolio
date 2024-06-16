import { n as set_current_component, r as run_all, o as current_component, p as onDestroy, d as get_store_value, l as createEventDispatcher, c as create_ssr_component, f as compute_rest_props, i as spread, q as escape_attribute_value, j as escape_object, b as add_attribute, s as setContext, g as getContext, a as subscribe, k as each, v as validate_component, t as hasContext, e as escape } from "./ssr.js";
import { d as derived, w as writable, r as readable } from "./index2.js";
import "dequal";
import { clsx } from "clsx";
import { tv } from "tailwind-variants";
import { o as onMount } from "./ssr2.js";
import { nanoid } from "nanoid/non-secure";
import { flip, offset, shift, arrow, size, autoUpdate, computePosition } from "@floating-ui/dom";
import { t as textContent, l as languageSelected } from "./store.js";
import { twMerge } from "tailwind-merge";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name2) {
  return void_element_names.test(name2) || name2.toLowerCase() === "!doctype";
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function lightable(value) {
  function subscribe2(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe: subscribe2 };
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
function builder(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            });
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        });
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          });
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      }));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name: name2,
    attribute,
    selector,
    getEl
  };
}
const isBrowser = typeof document !== "undefined";
const isFunction = (v) => typeof v === "function";
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isElementDisabled(element) {
  const ariaDisabled = element.getAttribute("aria-disabled");
  const disabled = element.getAttribute("disabled");
  const dataDisabled = element.hasAttribute("data-disabled");
  if (ariaDisabled === "true" || disabled !== null || dataDisabled) {
    return true;
  }
  return false;
}
function isTouch(event) {
  return event.pointerType === "touch";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isReadable(value) {
  return isObject(value) && "subscribe" in value;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
const overridable = (store, onChange) => {
  const update2 = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update2(() => curr);
  };
  return {
    ...store,
    update: update2,
    set
  };
};
function generateId() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId();
    return acc;
  }, {});
}
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
const FIRST_KEYS = [kbd.ARROW_DOWN, kbd.PAGE_UP, kbd.HOME];
const LAST_KEYS = [kbd.ARROW_UP, kbd.PAGE_DOWN, kbd.END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const SELECTION_KEYS = [kbd.ENTER, kbd.SPACE];
function makeHull(points) {
  const newPoints = points.slice();
  newPoints.sort(POINT_COMPARATOR);
  return makeHullPresorted(newPoints);
}
function makeHullPresorted(points) {
  if (points.length <= 1)
    return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        upperHull.pop();
      else
        break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        lowerHull.pop();
      else
        break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length == 1 && lowerHull.length == 1 && upperHull[0].x == lowerHull[0].x && upperHull[0].y == lowerHull[0].y)
    return upperHull;
  else
    return upperHull.concat(lowerHull);
}
function POINT_COMPARATOR(a, b) {
  if (a.x < b.x)
    return -1;
  else if (a.x > b.x)
    return 1;
  else if (a.y < b.y)
    return -1;
  else if (a.y > b.y)
    return 1;
  else
    return 0;
}
function getPointsFromEl(el) {
  const rect = el.getBoundingClientRect();
  return [
    { x: rect.left, y: rect.top },
    { x: rect.right, y: rect.top },
    { x: rect.right, y: rect.bottom },
    { x: rect.left, y: rect.bottom }
  ];
}
function makeHullFromElements(els) {
  const points = els.flatMap((el) => getPointsFromEl(el));
  return makeHull(points);
}
function pointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > point.y !== yj > point.y && point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
const safeOnMount = (fn) => {
  try {
    onMount(fn);
  } catch {
    return fn();
  }
};
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn();
  }
};
function derivedWithUnsubscribe(stores, fn) {
  let unsubscribers = [];
  const onUnsubscribe = (cb) => {
    unsubscribers.push(cb);
  };
  const unsubscribe = () => {
    unsubscribers.forEach((fn2) => fn2());
    unsubscribers = [];
  };
  const derivedStore = derived(stores, ($storeValues) => {
    unsubscribe();
    return fn($storeValues, onUnsubscribe);
  });
  safeOnDestroy(unsubscribe);
  const subscribe2 = (...args) => {
    const unsub = derivedStore.subscribe(...args);
    return () => {
      unsub();
      unsubscribe();
    };
  };
  return {
    ...derivedStore,
    subscribe: subscribe2
  };
}
function effect(stores, fn) {
  const unsub = derivedWithUnsubscribe(stores, (stores2, onUnsubscribe) => {
    return {
      stores: stores2,
      onUnsubscribe
    };
  }).subscribe(({ stores: stores2, onUnsubscribe }) => {
    const returned = fn(stores2);
    if (returned) {
      onUnsubscribe(returned);
    }
  });
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = writable(value);
  });
  return result;
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  const portalParent = getPortalParent(node);
  if (portalProp !== void 0)
    return portalProp;
  if (portalParent === "body")
    return document.body;
  return null;
}
const documentClickStore = readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "pointerup", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
const useClickOutside = (node, config = {}) => {
  let options = { enabled: true, ...config };
  function isEnabled() {
    return typeof options.enabled === "boolean" ? options.enabled : get_store_value(options.enabled);
  }
  const unsubscribe = documentClickStore.subscribe((e) => {
    if (!isEnabled() || !e || e.target === node) {
      return;
    }
    const composedPath = e.composedPath();
    if (composedPath.includes(node))
      return;
    if (options.ignore) {
      if (isFunction(options.ignore)) {
        if (options.ignore(e))
          return;
      } else if (Array.isArray(options.ignore)) {
        if (options.ignore.length > 0 && options.ignore.some((ignoreEl) => {
          return ignoreEl && (e.target === ignoreEl || composedPath.includes(ignoreEl));
        }))
          return;
      }
    }
    options.handler?.(e);
  });
  return {
    update(params) {
      options = { ...options, ...params };
    },
    destroy() {
      unsubscribe();
    }
  };
};
const documentEscapeKeyStore = readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "keydown", keydown, {
    passive: false
  });
  return unsubscribe;
});
const useEscapeKeydown = (node, config = {}) => {
  let unsub = noop;
  function update2(config2 = {}) {
    unsub();
    const options = { enabled: true, ...config2 };
    const enabled = isReadable(options.enabled) ? options.enabled : readable(options.enabled);
    unsub = executeCallbacks(
      // Handle escape keydowns
      documentEscapeKeyStore.subscribe((e) => {
        if (!e || !get_store_value(enabled))
          return;
        const target = e.target;
        if (!isHTMLElement(target) || target.closest("[data-escapee]") !== node) {
          return;
        }
        e.preventDefault();
        if (options.ignore) {
          if (isFunction(options.ignore)) {
            if (options.ignore(e))
              return;
          } else if (Array.isArray(options.ignore)) {
            if (options.ignore.length > 0 && options.ignore.some((ignoreEl) => {
              return ignoreEl && target === ignoreEl;
            }))
              return;
          }
        }
        options.handler?.(e);
      }),
      effect(enabled, ($enabled) => {
        if ($enabled) {
          node.dataset.escapee = "";
        } else {
          delete node.dataset.escapee;
        }
      })
    );
  }
  update2(config);
  return {
    update: update2,
    destroy() {
      node.removeAttribute("data-escapee");
      unsub();
    }
  };
};
const defaultConfig = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop
    };
  const options = { ...defaultConfig, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`
      });
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x2 != null ? `${x2}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update2(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update2(target);
  return {
    update: update2,
    destroy
  };
};
const defaults = {
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  defaultOpen: false,
  closeOnPointerDown: true,
  openDelay: 1e3,
  closeDelay: 0,
  forceVisible: false,
  portal: "body",
  closeOnEscape: true,
  disableHoverableContent: false,
  group: void 0
};
const { name } = createElHelpers("tooltip");
const groupMap = /* @__PURE__ */ new Map();
const tooltipIdParts = ["trigger", "content"];
function createTooltip(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "open", "ids"));
  const { positioning, arrowSize, closeOnPointerDown, openDelay, closeDelay, forceVisible, portal, closeOnEscape, disableHoverableContent, group } = options;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const openReason = writable(null);
  const ids = toWritableStores({ ...generateIds(tooltipIdParts), ...withDefaults.ids });
  let clickedTrigger = false;
  const getEl = (part) => {
    if (!isBrowser)
      return null;
    return document.getElementById(get_store_value(ids[part]));
  };
  let openTimeout = null;
  let closeTimeout = null;
  function openTooltip(reason) {
    if (closeTimeout) {
      window.clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    if (!openTimeout) {
      openTimeout = window.setTimeout(() => {
        open.set(true);
        openReason.update((prev) => prev ?? reason);
        openTimeout = null;
      }, get_store_value(openDelay));
    }
  }
  function closeTooltip(isBlur) {
    if (openTimeout) {
      window.clearTimeout(openTimeout);
      openTimeout = null;
    }
    if (isBlur && isMouseInTooltipArea) {
      openReason.set("pointer");
      return;
    }
    if (!closeTimeout) {
      closeTimeout = window.setTimeout(() => {
        open.set(false);
        openReason.set(null);
        if (isBlur)
          clickedTrigger = false;
        closeTimeout = null;
      }, get_store_value(closeDelay));
    }
  }
  const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
    return $open || $forceVisible;
  });
  const trigger = builder(name("trigger"), {
    stores: [ids.content, ids.trigger, open],
    returned: ([$contentId, $triggerId, $open]) => {
      return {
        "aria-describedby": $contentId,
        id: $triggerId,
        "data-state": $open ? "open" : "closed"
      };
    },
    action: (node) => {
      const keydownHandler = (e) => {
        if (get_store_value(closeOnEscape) && e.key === kbd.ESCAPE) {
          if (openTimeout) {
            window.clearTimeout(openTimeout);
            openTimeout = null;
          }
          open.set(false);
        }
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", () => {
        const $closeOnPointerDown = get_store_value(closeOnPointerDown);
        if (!$closeOnPointerDown)
          return;
        open.set(false);
        clickedTrigger = true;
        if (openTimeout) {
          window.clearTimeout(openTimeout);
          openTimeout = null;
        }
      }), addMeltEventListener(node, "pointerenter", (e) => {
        if (isTouch(e))
          return;
        openTooltip("pointer");
      }), addMeltEventListener(node, "pointerleave", (e) => {
        if (isTouch(e))
          return;
        if (openTimeout) {
          window.clearTimeout(openTimeout);
          openTimeout = null;
        }
      }), addMeltEventListener(node, "focus", () => {
        if (clickedTrigger)
          return;
        openTooltip("focus");
      }), addMeltEventListener(node, "blur", () => closeTooltip(true)), addMeltEventListener(node, "keydown", keydownHandler), addEventListener(document, "keydown", keydownHandler));
      return {
        destroy: unsub
      };
    }
  });
  const content = builder(name("content"), {
    stores: [isVisible, open, portal, ids.content],
    returned: ([$isVisible, $open, $portal, $contentId]) => {
      return {
        role: "tooltip",
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $contentId,
        "data-portal": $portal ? "" : void 0,
        "data-state": $open ? "open" : "closed"
      };
    },
    action: (node) => {
      let unsubFloating = noop;
      let unsubPortal = noop;
      const unsubDerived = effect([isVisible, positioning, portal], ([$isVisible, $positioning, $portal]) => {
        const triggerEl = getEl("trigger");
        if (!$isVisible || !triggerEl) {
          unsubPortal();
          unsubFloating();
          return;
        }
        const floatingReturn = useFloating(triggerEl, node, $positioning);
        unsubFloating = floatingReturn.destroy;
        if (!$portal) {
          unsubPortal();
          return;
        }
        const portalDest = getPortalDestination(node, $portal);
        if (portalDest) {
          const portalReturn = usePortal(node, portalDest);
          if (portalReturn && portalReturn.destroy) {
            unsubPortal = portalReturn.destroy;
          }
        }
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "pointerenter", () => openTooltip("pointer")), addMeltEventListener(node, "pointerdown", () => openTooltip("pointer")));
      return {
        destroy() {
          unsubEvents();
          unsubPortal();
          unsubFloating();
          unsubDerived();
        }
      };
    }
  });
  const arrow2 = builder(name("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  let isMouseInTooltipArea = false;
  effect(open, ($open) => {
    const currentGroup = get_store_value(group);
    if (currentGroup === void 0 || currentGroup === false) {
      return;
    }
    if (!$open) {
      if (groupMap.get(currentGroup) === open) {
        groupMap.delete(currentGroup);
      }
      return;
    }
    const currentOpen = groupMap.get(currentGroup);
    currentOpen?.set(false);
    groupMap.set(currentGroup, open);
  });
  effect([open, openReason], ([$open, $openReason]) => {
    if (!$open || !isBrowser)
      return;
    return executeCallbacks(addEventListener(document, "mousemove", (e) => {
      const contentEl = getEl("content");
      const triggerEl = getEl("trigger");
      if (!contentEl || !triggerEl)
        return;
      const polygonElements = get_store_value(disableHoverableContent) ? [triggerEl] : [triggerEl, contentEl];
      const polygon = makeHullFromElements(polygonElements);
      isMouseInTooltipArea = pointInPolygon({
        x: e.clientX,
        y: e.clientY
      }, polygon);
      if ($openReason !== "pointer")
        return;
      if (!isMouseInTooltipArea) {
        closeTooltip();
      }
    }));
  });
  return {
    ids,
    elements: {
      trigger,
      content,
      arrow: arrow2
    },
    states: { open },
    options
  };
}
function createBitAttrs(bit, parts) {
  const attrs = {};
  parts.forEach((part) => {
    attrs[part] = {
      [`data-${bit}-${part}`]: ""
    };
  });
  return (part) => attrs[part];
}
function createDispatcher() {
  const dispatch = createEventDispatcher();
  return (e) => {
    const { originalEvent } = e.detail;
    const { cancelable } = e;
    const type = originalEvent.type;
    const shouldContinue = dispatch(type, { originalEvent, currentTarget: originalEvent.currentTarget }, { cancelable });
    if (!shouldContinue) {
      e.preventDefault();
    }
  };
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder2) => {
    Object.keys(builder2).forEach((key) => {
      if (key !== "action") {
        attrs[key] = builder2[key];
      }
    });
  });
  return attrs;
}
const Button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "type", "builders", "el"]);
  let { href = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { builders = [] } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-button-root": "" };
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0)
    $$bindings.builders(builders);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  return `${builders && builders.length ? ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        {
          type: escape_attribute_value(href ? void 0 : type)
        },
        { href: escape_attribute_value(href) },
        { tabindex: "0" },
        escape_object(getAttrs(builders)),
        escape_object($$restProps),
        escape_object(attrs)
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}` : ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        {
          type: escape_attribute_value(href ? void 0 : type)
        },
        { href: escape_attribute_value(href) },
        { tabindex: "0" },
        escape_object($$restProps),
        escape_object(attrs)
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}`}`;
});
function getPositioningUpdater(store) {
  return (props = {}) => {
    return updatePositioning$1(store, props);
  };
}
function updatePositioning$1(store, props) {
  const defaultPositioningProps = {
    side: "bottom",
    align: "center",
    sideOffset: 0,
    alignOffset: 0,
    sameWidth: false,
    avoidCollisions: true,
    collisionPadding: 8,
    fitViewport: false,
    strategy: "absolute",
    overlap: false
  };
  const withDefaults = { ...defaultPositioningProps, ...props };
  store.update((prev) => {
    return {
      ...prev,
      placement: joinPlacement(withDefaults.side, withDefaults.align),
      offset: {
        ...prev.offset,
        mainAxis: withDefaults.sideOffset,
        crossAxis: withDefaults.alignOffset
      },
      gutter: 0,
      sameWidth: withDefaults.sameWidth,
      flip: withDefaults.avoidCollisions,
      overflowPadding: withDefaults.collisionPadding,
      boundary: withDefaults.collisionBoundary,
      fitViewport: withDefaults.fitViewport,
      strategy: withDefaults.strategy,
      overlap: withDefaults.overlap
    };
  });
}
function joinPlacement(side, align) {
  if (align === "center")
    return side;
  return `${side}-${align}`;
}
function getTooltipData() {
  const NAME = "tooltip";
  const PARTS = ["arrow", "content", "trigger"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getTooltipData();
  const getAttrs2 = createBitAttrs(NAME, PARTS);
  const tooltip = {
    ...createTooltip({
      positioning: {
        placement: "top",
        gutter: 0
      },
      openDelay: 700,
      ...removeUndefined(props),
      forceVisible: true
    }),
    getAttrs: getAttrs2
  };
  setContext(NAME, tooltip);
  return {
    ...tooltip,
    updateOption: getOptionUpdater(tooltip.options)
  };
}
function getCtx() {
  const { NAME } = getTooltipData();
  return getContext(NAME);
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "top",
    align: "center",
    sideOffset: 1
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater({ ...withDefaults });
}
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { closeOnEscape = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { closeOnPointerDown = void 0 } = $$props;
  let { openDelay = void 0 } = $$props;
  let { closeDelay = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { disableHoverableContent = void 0 } = $$props;
  let { group = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx({
    closeOnEscape,
    portal,
    closeOnPointerDown,
    openDelay,
    closeDelay,
    forceVisible: true,
    defaultOpen: open,
    disableHoverableContent,
    group,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    },
    positioning: { gutter: 0, offset: { mainAxis: 1 } }
  });
  const idValues = derived([ids.content, ids.trigger], ([$contentId, $triggerId]) => ({ content: $contentId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  if ($$props.closeOnPointerDown === void 0 && $$bindings.closeOnPointerDown && closeOnPointerDown !== void 0)
    $$bindings.closeOnPointerDown(closeOnPointerDown);
  if ($$props.openDelay === void 0 && $$bindings.openDelay && openDelay !== void 0)
    $$bindings.openDelay(openDelay);
  if ($$props.closeDelay === void 0 && $$bindings.closeDelay && closeDelay !== void 0)
    $$bindings.closeDelay(closeDelay);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0)
    $$bindings.onOpenChange(onOpenChange);
  if ($$props.disableHoverableContent === void 0 && $$bindings.disableHoverableContent && disableHoverableContent !== void 0)
    $$bindings.disableHoverableContent(disableHoverableContent);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("closeOnPointerDown", closeOnPointerDown);
  }
  {
    updateOption("openDelay", openDelay);
  }
  {
    updateOption("closeDelay", closeDelay);
  }
  {
    updateOption("group", group);
  }
  {
    updateOption("disableHoverableContent", disableHoverableContent);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Tooltip_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $open, $$unsubscribe_open;
  let $content, $$unsubscribe_content;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "top" } = $$props;
  let { align = "center" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids, getAttrs: getAttrs2 } = getCtx();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const attrs = getAttrs2("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0)
    $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0)
    $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0)
    $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0)
    $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0)
    $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0)
    $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0)
    $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0)
    $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0)
    $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder2 = $content;
  {
    Object.assign(builder2, attrs);
  }
  {
    if ($open) {
      updatePositioning({
        side,
        align,
        sideOffset,
        alignOffset,
        collisionPadding,
        avoidCollisions,
        collisionBoundary,
        sameWidth,
        fitViewport,
        strategy,
        overlap
      });
    }
  }
  $$unsubscribe_open();
  $$unsubscribe_content();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Tooltip_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getAttrs: getAttrs2 } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs2("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder2 = $trigger;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<button${spread([escape_object(builder2), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</button>`}`;
});
const techIcons = [
  {
    title: "Linux",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
  },
  {
    title: "Docker",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg"
  },
  {
    title: "Typescript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  },
  {
    title: "Svelte",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg"
  },
  { title: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  {
    title: "Tailwind",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
  },
  {
    title: "Figma",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
  },
  {
    title: "Gimp",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gimp/gimp-original.svg"
  },
  {
    title: "Flutter",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
  },
  {
    title: "JQuery",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg"
  },
  {
    title: "MySQL",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg"
  },
  { title: "php", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  {
    title: "Python",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    title: "SASS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"
  },
  {
    title: "CSS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  },
  {
    title: "Javascript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    title: "Vue",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
  }
];
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;
    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;
    return valueB;
  };
  const styleToString2 = (style2) => {
    return Object.keys(style2).reduce((str, key) => {
      if (style2[key] === void 0)
        return str;
      return str + `${key}:${style2[key]};`;
    }, "");
  };
  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
      return styleToString2({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};
const logo = "data:image/svg+xml,%3csvg%20width='86'%20height='75'%20viewBox='0%200%2086%2075'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M39.5%200H37.5C16.7893%200%200%2016.7893%200%2037.5C0%2058.2107%2016.7893%2075%2037.5%2075H39.5C60.2107%2075%2077%2058.2107%2077%2037.5C77%2016.7893%2060.2107%200%2039.5%200Z'%20fill='%230E1116'/%3e%3cg%20clip-path='url(%23clip0_156_38)'%3e%3cg%20clip-path='url(%23clip1_156_38)'%3e%3cg%20clip-path='url(%23clip2_156_38)'%3e%3cg%20clip-path='url(%23clip3_156_38)'%3e%3cg%20clip-path='url(%23clip4_156_38)'%3e%3cg%20clip-path='url(%23clip5_156_38)'%3e%3cg%20clip-path='url(%23clip6_156_38)'%3e%3cg%20clip-path='url(%23clip7_156_38)'%3e%3cg%20clip-path='url(%23clip8_156_38)'%3e%3cpath%20d='M23.3322%2045.5055V29.5323H26.6809L32.6817%2035.359L38.6825%2029.5323H42.0312V45.5055H38.6825V34.0196L32.6817%2039.6076L26.6809%2034.0196V45.5055H23.3322ZM51.8826%2045.5055L44.5968%2029.5323H48.2483L52.7306%2039.8421L53.7646%2042.3368L54.578%2039.8421L56.2264%2036.0832L53.2584%2029.5323H56.7023L57.9137%2032.6508L59.0472%2029.5323H62.4868L59.5188%2036.0832L61.2018%2039.9258L62.2142%2042.3368L62.9973%2039.8839L67.4968%2029.5323H71.1483L63.8626%2045.5055H60.5442L59.0775%2042.3368L57.8834%2039.2602L56.6893%2042.3368L55.201%2045.5055H51.8826Z'%20fill='%23E8AEB7'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cpath%20d='M8.55217%2037.5189C8.55217%2024.5989%2019.378%2014.125%2032.7321%2014.125C42.4403%2014.125%2050.8123%2019.6604%2054.6599%2027.6469H53.8355C50.0421%2020.0702%2042.0177%2014.8452%2032.7321%2014.8452C19.789%2014.8452%209.29654%2024.9966%209.29654%2037.5189C9.29654%2050.0413%2019.789%2060.1927%2032.7321%2060.1927C42.0177%2060.1927%2050.0421%2054.9678%2053.8355%2047.3909H54.6599C50.8121%2055.3774%2042.4403%2060.9129%2032.7321%2060.9129C19.378%2060.9129%208.55217%2050.439%208.55217%2037.5189Z'%20fill='%2354588C'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_156_38'%3e%3crect%20width='77.5199'%20height='46.75'%20fill='white'%20transform='translate(8.48011%2014.1439)'/%3e%3c/clipPath%3e%3cclipPath%20id='clip1_156_38'%3e%3crect%20width='77.3758'%20height='46.7879'%20fill='white'%20transform='translate(8.55217%2014.125)'/%3e%3c/clipPath%3e%3cclipPath%20id='clip2_156_38'%3e%3crect%20width='77.3758'%20height='46.7879'%20fill='white'%20transform='translate(8.55217%2014.125)'/%3e%3c/clipPath%3e%3cclipPath%20id='clip3_156_38'%3e%3crect%20width='47.8182'%20height='15.9731'%20fill='white'%20transform='translate(23.3309%2029.5323)'/%3e%3c/clipPath%3e%3cclipPath%20id='clip4_156_38'%3e%3crect%20width='47.8182'%20height='15.9731'%20fill='white'%20transform='translate(23.3309%2029.5323)'/%3e%3c/clipPath%3e%3cclipPath%20id='clip5_156_38'%3e%3crect%20width='47.8182'%20height='15.9731'%20fill='white'%20transform='translate(23.3309%2029.5323)'/%3e%3c/clipPath%3e%3cclipPath%20id='clip6_156_38'%3e%3crect%20width='47.8182'%20height='15.9731'%20fill='white'%20transform='translate(23.3309%2029.5323)'/%3e%3c/clipPath%3e%3cclipPath%20id='clip7_156_38'%3e%3crect%20width='47.8182'%20height='15.9731'%20fill='white'%20transform='translate(23.3309%2029.5323)'/%3e%3c/clipPath%3e%3cclipPath%20id='clip8_156_38'%3e%3crect%20width='47.8182'%20height='15.9731'%20fill='white'%20transform='translate(23.3309%2029.5323)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
/**
 * @license lucide-svelte v0.321.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const defaultAttributes$1 = defaultAttributes;
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
  let { name: name2 } = $$props;
  let { color = "currentColor" } = $$props;
  let { size: size2 = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { absoluteStrokeWidth = false } = $$props;
  let { iconNode } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0)
    $$bindings.name(name2);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size2 !== void 0)
    $$bindings.size(size2);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0)
    $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0)
    $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes$1),
      escape_object($$restProps),
      { width: escape_attribute_value(size2) },
      { height: escape_attribute_value(size2) },
      { stroke: escape_attribute_value(color) },
      {
        "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size2) : strokeWidth)
      },
      {
        class: escape_attribute_value(`lucide-icon lucide lucide-${name2} ${$$props.class ?? ""}`)
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Icon$1 = Icon;
const Tooltip_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "sideOffset", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = { y: 12, duration: 150 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Tooltip_content$1, "TooltipPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      { sideOffset },
      {
        class: cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Root = Tooltip;
const Trigger = Tooltip_trigger;
const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");
function setEmblaContex(config) {
  setContext(EMBLA_CAROUSEL_CONTEXT, config);
  return config;
}
function getEmblaContext(name2 = "This component") {
  if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
    throw new Error(`${name2} must be used within a <Carousel.Root> component`);
  }
  return getContext(EMBLA_CAROUSEL_CONTEXT);
}
const Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["opts", "plugins", "api", "orientation", "class"]);
  let { opts = {} } = $$props;
  let { plugins = [] } = $$props;
  let { api = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { class: className = void 0 } = $$props;
  const apiStore = writable(void 0);
  const orientationStore = writable(orientation);
  const canScrollPrev = writable(false);
  const canScrollNext = writable(false);
  const optionsStore = writable(opts);
  const pluginStore = writable(plugins);
  function scrollPrev() {
    api?.scrollPrev();
  }
  function scrollNext() {
    api?.scrollNext();
  }
  function onSelect(api2) {
    if (!api2)
      return;
    canScrollPrev.set(api2.canScrollPrev());
    canScrollNext.set(api2.canScrollNext());
  }
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  }
  setEmblaContex({
    api: apiStore,
    scrollPrev,
    scrollNext,
    orientation: orientationStore,
    canScrollNext,
    canScrollPrev,
    handleKeyDown,
    options: optionsStore,
    plugins: pluginStore,
    onInit
  });
  function onInit(event) {
    api = event.detail;
    apiStore.set(api);
  }
  onDestroy(() => {
    api?.off("select", onSelect);
  });
  if ($$props.opts === void 0 && $$bindings.opts && opts !== void 0)
    $$bindings.opts(opts);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.api === void 0 && $$bindings.api && api !== void 0)
    $$bindings.api(api);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  {
    orientationStore.set(orientation);
  }
  {
    pluginStore.set(plugins);
  }
  {
    optionsStore.set(opts);
  }
  {
    if (api) {
      onSelect(api);
      api.on("select", onSelect);
      api.on("reInit", onSelect);
    }
  }
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("relative", className))
      },
      { role: "region" },
      { "aria-roledescription": "carousel" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Carousel_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $$unsubscribe_options;
  let $orientation, $$unsubscribe_orientation;
  let $$unsubscribe_plugins;
  let { class: className = void 0 } = $$props;
  const { orientation, options, plugins, onInit } = getEmblaContext("<Carousel.Content/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_options = subscribe(options, (value) => value);
  $$unsubscribe_plugins = subscribe(plugins, (value) => value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_options();
  $$unsubscribe_orientation();
  $$unsubscribe_plugins();
  return `<div class="overflow-hidden"><div${spread(
    [
      {
        class: escape_attribute_value(cn(
          "flex",
          $orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ))
      },
      { "data-embla-container": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Carousel_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $orientation, $$unsubscribe_orientation;
  let { class: className = void 0 } = $$props;
  const { orientation } = getEmblaContext("<Carousel.Item/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  $$unsubscribe_orientation();
  return `<div${spread(
    [
      { role: "group" },
      { "aria-roledescription": "slide" },
      {
        class: escape_attribute_value(cn("min-w-0 shrink-0 grow-0 basis-full", $orientation === "horizontal" ? "pl-4" : "pt-4", className))
      },
      { "data-embla-slide": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "builders"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size: size2 = "default" } = $$props;
  let { builders = [] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size2 !== void 0)
    $$bindings.size(size2);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0)
    $$bindings.builders(builders);
  return `${validate_component(Button$1, "ButtonPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { builders },
      {
        class: cn(buttonVariants({ variant, size: size2, className }))
      },
      { type: "button" },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const Arrow_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m12 19-7-7 7-7" }], ["path", { "d": "M19 12H5" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "arrow-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ArrowLeft = Arrow_left;
const Arrow_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "m12 5 7 7-7 7" }]];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "arrow-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ArrowRight = Arrow_right;
const Carousel_previous = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size"]);
  let $orientation, $$unsubscribe_orientation;
  let $canScrollPrev, $$unsubscribe_canScrollPrev;
  let { class: className = void 0 } = $$props;
  let { variant = "outline" } = $$props;
  let { size: size2 = "icon" } = $$props;
  const { orientation, canScrollPrev, scrollPrev, handleKeyDown } = getEmblaContext("<Carousel.Previous/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_canScrollPrev = subscribe(canScrollPrev, (value) => $canScrollPrev = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size2 !== void 0)
    $$bindings.size(size2);
  $$unsubscribe_orientation();
  $$unsubscribe_canScrollPrev();
  return `${validate_component(Button, "Button").$$render(
    $$result,
    Object.assign(
      {},
      { variant },
      { size: size2 },
      {
        class: cn(
          "absolute h-8 w-8 rounded-full touch-manipulation",
          $orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )
      },
      { disabled: !$canScrollPrev },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ` ${validate_component(ArrowLeft, "ArrowLeft").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1tx67gn">Previous slide</span> `}`;
      }
    }
  )}`;
});
const Carousel_next = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size"]);
  let $orientation, $$unsubscribe_orientation;
  let $canScrollNext, $$unsubscribe_canScrollNext;
  let { class: className = void 0 } = $$props;
  let { variant = "outline" } = $$props;
  let { size: size2 = "icon" } = $$props;
  const { orientation, canScrollNext, scrollNext, handleKeyDown } = getEmblaContext("<Carousel.Next/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_canScrollNext = subscribe(canScrollNext, (value) => $canScrollNext = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size2 !== void 0)
    $$bindings.size(size2);
  $$unsubscribe_orientation();
  $$unsubscribe_canScrollNext();
  return `${validate_component(Button, "Button").$$render(
    $$result,
    Object.assign(
      {},
      { variant },
      { size: size2 },
      {
        class: cn(
          "absolute h-8 w-8 rounded-full touch-manipulation",
          $orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )
      },
      { disabled: !$canScrollNext },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ` ${validate_component(ArrowRight, "ArrowRight").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-vmesmf">Next slide</span> `}`;
      }
    }
  )}`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $textContent, $$unsubscribe_textContent;
  let $languageSelected, $$unsubscribe_languageSelected;
  $$unsubscribe_textContent = subscribe(textContent, (value) => $textContent = value);
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  const date = /* @__PURE__ */ new Date();
  const currentYear = date.getFullYear();
  $$unsubscribe_textContent();
  $$unsubscribe_languageSelected();
  return ` <footer class="max-w-[1340px] mx-auto"><div class="flex-col relative text-center gradient-blue-ish border-2 border-white/70 mx-2 md:mx-8 py-10 px-8 lg:px-16 rounded-2xl flex justify-center mb-2 md:mb-8"><img${add_attribute("src", logo, 0)} alt="logo" class="max-sm:mb-4 sm:absolute sm:left-1/2 sm:-translate-x-[275%] mx-auto max-w-[82px] max-h-[82px]"> <p class="text-c-body-text font-semibold">${escape($textContent.footer.authorship[$languageSelected])}</p> ${validate_component(Root, "Tooltip.Root").$$render($$result, { openDelay: 300 }, {}, {
    default: () => {
      return `${validate_component(Trigger, "Tooltip.Trigger").$$render($$result, {}, {}, {
        default: () => {
          return `<p class="text-c-body-text-light font-bold text-lg" data-svelte-h="svelte-1ielljw">@ Murillo Pinheiro de Oliveira</p>`;
        }
      })} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<p class="font-semibold bg-opacity-0 shadow-none">${escape($textContent.footer.love[$languageSelected])}</p>`;
        }
      })}`;
    }
  })} <p class="text-c-body-text font-semibold">${escape(currentYear ?? 2024)}</p></div></footer> `;
});
export {
  createBitAttrs as A,
  removeUndefined as B,
  getOptionUpdater as C,
  getPositioningUpdater as D,
  createDispatcher as E,
  FIRST_LAST_KEYS as F,
  cn as G,
  flyAndScale as H,
  logo as I,
  Tooltip_content as J,
  techIcons as K,
  Carousel as L,
  Carousel_content as M,
  Carousel_item as N,
  Button as O,
  Carousel_previous as P,
  Carousel_next as Q,
  Root as R,
  SELECTION_KEYS as S,
  Trigger as T,
  Footer as U,
  isHTMLElement as a,
  isFunction as b,
  useFloating as c,
  useClickOutside as d,
  useEscapeKeydown as e,
  executeCallbacks as f,
  createElHelpers as g,
  derivedWithUnsubscribe as h,
  isBrowser as i,
  toWritableStores as j,
  generateIds as k,
  builder as l,
  effect as m,
  noop as n,
  getPortalDestination as o,
  addMeltEventListener as p,
  kbd as q,
  isElementDisabled as r,
  styleToString as s,
  tick as t,
  usePortal as u,
  safeOnMount as v,
  addEventListener as w,
  overridable as x,
  disabledAttr as y,
  omit as z
};
