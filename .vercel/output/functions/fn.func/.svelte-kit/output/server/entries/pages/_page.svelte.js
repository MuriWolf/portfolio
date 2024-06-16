import { d as get_store_value, c as create_ssr_component, f as compute_rest_props, h as add_styles, i as spread, j as escape_object, b as add_attribute, g as getContext, s as setContext, a as subscribe, v as validate_component, e as escape, k as each, l as createEventDispatcher } from "../../chunks/ssr.js";
import "dequal";
import { n as noop, i as isBrowser, a as isHTMLElement, t as tick, b as isFunction, u as usePortal, c as useFloating, d as useClickOutside, e as useEscapeKeydown, f as executeCallbacks, g as createElHelpers, h as derivedWithUnsubscribe, j as toWritableStores, k as generateIds, l as builder, s as styleToString, m as effect, o as getPortalDestination, p as addMeltEventListener, F as FIRST_LAST_KEYS, q as kbd, S as SELECTION_KEYS, r as isElementDisabled, v as safeOnMount, w as addEventListener, x as overridable, y as disabledAttr, z as omit, A as createBitAttrs, B as removeUndefined, C as getOptionUpdater, D as getPositioningUpdater, E as createDispatcher, G as cn, H as flyAndScale, I as logo, R as Root$1, T as Trigger$1, J as Tooltip_content, K as techIcons, L as Carousel, M as Carousel_content, N as Carousel_item, O as Button, P as Carousel_previous, Q as Carousel_next, U as Footer } from "../../chunks/Footer.js";
import { t as textContent, l as languageSelected, p as projectName, o as openAsideMobile } from "../../chunks/store.js";
import "devalue";
import "../../chunks/client.js";
import { nanoid } from "nanoid/non-secure";
import { d as derived, w as writable, a as readonly } from "../../chunks/index2.js";
import { createFocusTrap as createFocusTrap$1 } from "focus-trap";
import "clsx";
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function addHighlight(element) {
  element.setAttribute("data-highlighted", "");
}
function removeHighlight(element) {
  element.removeAttribute("data-highlighted");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function debounce(fn, wait = 500) {
  let timeout = null;
  return function(...args) {
    const later = () => {
      timeout = null;
      fn(...args);
    };
    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = _document ?? document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
function handleRovingFocus(nextElement) {
  if (!isBrowser)
    return;
  sleep(1).then(() => {
    const currentFocusedElement = document.activeElement;
    if (!isHTMLElement(currentFocusedElement) || currentFocusedElement === nextElement)
      return;
    currentFocusedElement.tabIndex = -1;
    if (nextElement) {
      nextElement.tabIndex = 0;
      nextElement.focus();
    }
  });
}
function getFocusableElements() {
  return Array.from(document.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'));
}
function getNextFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const nextIndex = currentIndex + 1;
  const nextElement = focusableElements[nextIndex];
  if (nextIndex < focusableElements.length && isHTMLElement(nextElement)) {
    return nextElement;
  }
  return null;
}
function getPreviousFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const previousIndex = currentIndex - 1;
  const prevElement = focusableElements[previousIndex];
  if (previousIndex >= 0 && isHTMLElement(prevElement)) {
    return prevElement;
  }
  return null;
}
const ignoredKeys = /* @__PURE__ */ new Set(["Shift", "Control", "Alt", "Meta", "CapsLock", "NumLock"]);
const defaults$3 = {
  onMatch: handleRovingFocus,
  getCurrentItem: () => document.activeElement
};
function createTypeaheadSearch(args = {}) {
  const withDefaults = { ...defaults$3, ...args };
  const typed = writable([]);
  const resetTyped = debounce(() => {
    typed.update(() => []);
  });
  const handleTypeaheadSearch = (key, items) => {
    if (ignoredKeys.has(key))
      return;
    const currentItem = withDefaults.getCurrentItem();
    const $typed = get_store_value(typed);
    if (!Array.isArray($typed)) {
      return;
    }
    $typed.push(key.toLowerCase());
    typed.set($typed);
    const candidateItems = items.filter((item) => {
      if (item.getAttribute("disabled") === "true" || item.getAttribute("aria-disabled") === "true" || item.hasAttribute("data-disabled")) {
        return false;
      }
      return true;
    });
    const isRepeated = $typed.length > 1 && $typed.every((char) => char === $typed[0]);
    const normalizeSearch = isRepeated ? $typed[0] : $typed.join("");
    const currentItemIndex = isHTMLElement(currentItem) ? candidateItems.indexOf(currentItem) : -1;
    let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0));
    const excludeCurrentItem = normalizeSearch.length === 1;
    if (excludeCurrentItem) {
      wrappedItems = wrappedItems.filter((v) => v !== currentItem);
    }
    const nextItem = wrappedItems.find((item) => item?.innerText && item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()));
    if (isHTMLElement(nextItem) && nextItem !== currentItem) {
      withDefaults.onMatch(nextItem);
    }
    resetTyped();
  };
  return {
    typed,
    resetTyped,
    handleTypeaheadSearch
  };
}
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement(el))
      return;
    el.focus();
  } else if (isHTMLElement(returned)) {
    returned.focus();
  }
}
function createFocusTrap(config = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = config;
  const hasFocus = writable(false);
  const isPaused = writable(false);
  const activate = (opts) => trap?.activate(opts);
  const deactivate = (opts) => {
    trap?.deactivate(opts);
  };
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.set(true);
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.set(false);
    }
  };
  const useFocusTrap = (node) => {
    trap = createFocusTrap$1(node, {
      ...focusTrapOptions,
      onActivate() {
        hasFocus.set(true);
        config.onActivate?.();
      },
      onDeactivate() {
        hasFocus.set(false);
        config.onDeactivate?.();
      }
    });
    if (immediate) {
      activate();
    }
    return {
      destroy() {
        deactivate();
        trap = void 0;
      }
    };
  };
  return {
    useFocusTrap,
    hasFocus: readonly(hasFocus),
    isPaused: readonly(isPaused),
    activate,
    deactivate,
    pause,
    unpause
  };
}
const defaultConfig = {
  floating: {},
  focusTrap: {},
  clickOutside: {},
  escapeKeydown: {},
  portal: "body"
};
const usePopper = (popperElement, args) => {
  popperElement.dataset.escapee = "";
  const { anchorElement, open, options } = args;
  if (!anchorElement || !open || !options) {
    return { destroy: noop };
  }
  const opts = { ...defaultConfig, ...options };
  const callbacks = [];
  if (opts.portal !== null) {
    const portal = usePortal(popperElement, opts.portal);
    if (portal?.destroy) {
      callbacks.push(portal.destroy);
    }
  }
  callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
  if (opts.focusTrap !== null) {
    const { useFocusTrap } = createFocusTrap({
      immediate: true,
      escapeDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: false,
      fallbackFocus: popperElement,
      ...opts.focusTrap
    });
    const usedFocusTrap = useFocusTrap(popperElement);
    if (usedFocusTrap?.destroy) {
      callbacks.push(usedFocusTrap.destroy);
    }
  }
  if (opts.clickOutside !== null) {
    callbacks.push(useClickOutside(popperElement, {
      enabled: open,
      handler: (e) => {
        if (e.defaultPrevented)
          return;
        if (isHTMLElement(anchorElement) && !anchorElement.contains(e.target)) {
          open.set(false);
          anchorElement.focus();
        }
      },
      ...opts.clickOutside
    }).destroy);
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(useEscapeKeydown(popperElement, {
      enabled: open,
      handler: () => {
        open.set(false);
      },
      ...opts.escapeKeydown
    }).destroy);
  }
  const unsubscribe = executeCallbacks(...callbacks);
  return {
    destroy() {
      unsubscribe();
    }
  };
};
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, kbd.ARROW_RIGHT],
  rtl: [...SELECTION_KEYS, kbd.ARROW_LEFT]
};
const SUB_CLOSE_KEYS = {
  ltr: [kbd.ARROW_LEFT],
  rtl: [kbd.ARROW_RIGHT]
};
const menuIdParts = ["menu", "trigger"];
const defaults$2 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: "body",
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  typeahead: true,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createMenuBuilder(opts) {
  const { name, selector } = createElHelpers(opts.selector);
  const { preventScroll, arrowSize, positioning, closeOnEscape, closeOnOutsideClick, portal, forceVisible, typeahead, loop, closeFocus, disableFocusFirstItem, closeOnItemClick, onOutsideClick } = opts.rootOptions;
  const rootOpen = opts.rootOpen;
  const rootActiveTrigger = opts.rootActiveTrigger;
  const nextFocusable = opts.nextFocusable;
  const prevFocusable = opts.prevFocusable;
  const isUsingKeyboard = writable(false);
  const lastPointerX = writable(0);
  const pointerGraceIntent = writable(null);
  const pointerDir = writable("right");
  const currentFocusedItem = writable(null);
  const pointerMovingToSubmenu = derivedWithUnsubscribe([pointerDir, pointerGraceIntent], ([$pointerDir, $pointerGraceIntent]) => {
    return (e) => {
      const isMovingTowards = $pointerDir === $pointerGraceIntent?.side;
      return isMovingTowards && isPointerInGraceArea(e, $pointerGraceIntent?.area);
    };
  });
  const { typed, handleTypeaheadSearch } = createTypeaheadSearch();
  const rootIds = toWritableStores({ ...generateIds(menuIdParts), ...opts.ids });
  const isVisible = derivedVisible({
    open: rootOpen,
    forceVisible,
    activeTrigger: rootActiveTrigger
  });
  const rootMenu = builder(name(), {
    stores: [isVisible, portal, rootIds.menu, rootIds.trigger],
    returned: ([$isVisible, $portal, $rootMenuId, $rootTriggerId]) => {
      return {
        role: "menu",
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $rootMenuId,
        "aria-labelledby": $rootTriggerId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": $portal ? "" : void 0,
        tabindex: -1
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, rootActiveTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $rootActiveTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$rootActiveTrigger)
          return;
        tick().then(() => {
          setMeltMenuAttribute(node, selector);
          const popper = usePopper(node, {
            anchorElement: $rootActiveTrigger,
            open: rootOpen,
            options: {
              floating: $positioning,
              clickOutside: $closeOnOutsideClick ? {
                handler: (e) => {
                  get_store_value(onOutsideClick)?.(e);
                  if (e.defaultPrevented)
                    return;
                  if (isHTMLElement($rootActiveTrigger) && !$rootActiveTrigger.contains(e.target)) {
                    rootOpen.set(false);
                    $rootActiveTrigger.focus();
                  }
                }
              } : null,
              portal: getPortalDestination(node, $portal),
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          });
          if (popper && popper.destroy) {
            unsubPopper = popper.destroy;
          }
        });
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        const target = e.target;
        const menuEl = e.currentTarget;
        if (!isHTMLElement(target) || !isHTMLElement(menuEl))
          return;
        const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
        if (!isKeyDownInside)
          return;
        if (FIRST_LAST_KEYS.includes(e.key)) {
          handleMenuNavigation(e, get_store_value(loop) ?? false);
        }
        if (e.key === kbd.TAB) {
          e.preventDefault();
          rootOpen.set(false);
          handleTabNavigation(e, nextFocusable, prevFocusable);
          return;
        }
        const isCharacterKey = e.key.length === 1;
        const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
        if (!isModifierKey && isCharacterKey && get_store_value(typeahead) === true) {
          handleTypeaheadSearch(e.key, getMenuItems(menuEl));
        }
      }));
      return {
        destroy() {
          unsubDerived();
          unsubEvents();
          unsubPopper();
        }
      };
    }
  });
  const rootTrigger = builder(name("trigger"), {
    stores: [rootOpen, rootIds.menu, rootIds.trigger],
    returned: ([$rootOpen, $rootMenuId, $rootTriggerId]) => {
      return {
        "aria-controls": $rootMenuId,
        "aria-expanded": $rootOpen,
        "data-state": $rootOpen ? "open" : "closed",
        id: $rootTriggerId,
        tabindex: 0
      };
    },
    action: (node) => {
      applyAttrsIfDisabled(node);
      rootActiveTrigger.update((p) => {
        if (p)
          return p;
        return node;
      });
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const $rootOpen = get_store_value(rootOpen);
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        handleOpen(triggerEl);
        if (!$rootOpen)
          e.preventDefault();
      }), addMeltEventListener(node, "keydown", (e) => {
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        if (!(SELECTION_KEYS.includes(e.key) || e.key === kbd.ARROW_DOWN))
          return;
        e.preventDefault();
        handleOpen(triggerEl);
        const menuId = triggerEl.getAttribute("aria-controls");
        if (!menuId)
          return;
        const menu = document.getElementById(menuId);
        if (!menu)
          return;
        const menuItems = getMenuItems(menu);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const rootArrow = builder(name("arrow"), {
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
  const item = builder(name("item"), {
    returned: () => {
      return {
        role: "menuitem",
        tabindex: -1,
        "data-orientation": "vertical"
      };
    },
    action: (node) => {
      setMeltMenuAttribute(node, selector);
      applyAttrsIfDisabled(node);
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
      }), addMeltEventListener(node, "click", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
        if (e.defaultPrevented) {
          handleRovingFocus(itemEl);
          return;
        }
        if (get_store_value(closeOnItemClick)) {
          sleep(1).then(() => {
            rootOpen.set(false);
          });
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        onItemKeyDown(e);
      }), addMeltEventListener(node, "pointermove", (e) => {
        onMenuItemPointerMove(e);
      }), addMeltEventListener(node, "pointerleave", (e) => {
        onMenuItemPointerLeave(e);
      }), addMeltEventListener(node, "focusin", (e) => {
        onItemFocusIn(e);
      }), addMeltEventListener(node, "focusout", (e) => {
        onItemFocusOut(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const group = builder(name("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = builder(name("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const checkboxItemDefaults = {
    defaultChecked: false,
    disabled: false
  };
  const createCheckboxItem = (props) => {
    const withDefaults = { ...checkboxItemDefaults, ...props };
    const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked ?? null);
    const checked = overridable(checkedWritable, withDefaults.onCheckedChange);
    const disabled = writable(withDefaults.disabled);
    const checkboxItem = builder(name("checkbox-item"), {
      stores: [checked, disabled],
      returned: ([$checked, $disabled]) => {
        return {
          role: "menuitemcheckbox",
          tabindex: -1,
          "data-orientation": "vertical",
          "aria-checked": isIndeterminate($checked) ? "mixed" : $checked ? "true" : "false",
          "data-disabled": disabledAttr($disabled),
          "data-state": getCheckedState($checked)
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            handleRovingFocus(itemEl);
            return;
          }
          checked.update((prev) => {
            if (isIndeterminate(prev))
              return true;
            return !prev;
          });
          if (get_store_value(closeOnItemClick)) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(checked, ($checked) => $checked === true);
    const _isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
    return {
      elements: {
        checkboxItem
      },
      states: {
        checked
      },
      helpers: {
        isChecked,
        isIndeterminate: _isIndeterminate
      },
      options: {
        disabled
      }
    };
  };
  const createMenuRadioGroup = (args = {}) => {
    const valueWritable = args.value ?? writable(args.defaultValue ?? null);
    const value = overridable(valueWritable, args.onValueChange);
    const radioGroup = builder(name("radio-group"), {
      returned: () => ({
        role: "group"
      })
    });
    const radioItemDefaults = {
      disabled: false
    };
    const radioItem = builder(name("radio-item"), {
      stores: [value],
      returned: ([$value]) => {
        return (itemProps) => {
          const { value: itemValue, disabled } = { ...radioItemDefaults, ...itemProps };
          const checked = $value === itemValue;
          return {
            disabled,
            role: "menuitemradio",
            "data-state": checked ? "checked" : "unchecked",
            "aria-checked": checked,
            "data-disabled": disabledAttr(disabled),
            "data-value": itemValue,
            "data-orientation": "vertical",
            tabindex: -1
          };
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            if (!isHTMLElement(itemEl))
              return;
            handleRovingFocus(itemEl);
            return;
          }
          value.set(itemValue);
          if (get_store_value(closeOnItemClick)) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(value, ($value) => {
      return (itemValue) => {
        return $value === itemValue;
      };
    });
    return {
      elements: {
        radioGroup,
        radioItem
      },
      states: {
        value
      },
      helpers: {
        isChecked
      }
    };
  };
  const { elements: { root: separator } } = createSeparator({
    orientation: "horizontal"
  });
  const subMenuDefaults = {
    ...defaults$2,
    disabled: false,
    positioning: {
      placement: "right-start",
      gutter: 8
    }
  };
  const createSubmenu = (args) => {
    const withDefaults = { ...subMenuDefaults, ...args };
    const subOpenWritable = withDefaults.open ?? writable(false);
    const subOpen = overridable(subOpenWritable, withDefaults?.onOpenChange);
    const options = toWritableStores(omit(withDefaults, "ids"));
    const { positioning: positioning2, arrowSize: arrowSize2, disabled } = options;
    const subActiveTrigger = writable(null);
    const subOpenTimer = writable(null);
    const pointerGraceTimer = writable(0);
    const subIds = toWritableStores({ ...generateIds(menuIdParts), ...withDefaults.ids });
    safeOnMount(() => {
      const subTrigger2 = document.getElementById(get_store_value(subIds.trigger));
      if (subTrigger2) {
        subActiveTrigger.set(subTrigger2);
      }
    });
    const subIsVisible = derivedVisible({
      open: subOpen,
      forceVisible,
      activeTrigger: subActiveTrigger
    });
    const subMenu = builder(name("submenu"), {
      stores: [subIsVisible, subIds.menu, subIds.trigger],
      returned: ([$subIsVisible, $subMenuId, $subTriggerId]) => {
        return {
          role: "menu",
          hidden: $subIsVisible ? void 0 : true,
          style: styleToString({
            display: $subIsVisible ? void 0 : "none"
          }),
          id: $subMenuId,
          "aria-labelledby": $subTriggerId,
          "data-state": $subIsVisible ? "open" : "closed",
          // unit tests fail on `.closest` if the id starts with a number
          // so using a data attribute
          "data-id": $subMenuId,
          tabindex: -1
        };
      },
      action: (node) => {
        let unsubPopper = noop;
        const unsubDerived = effect([subIsVisible, positioning2], ([$subIsVisible, $positioning]) => {
          unsubPopper();
          if (!$subIsVisible)
            return;
          const activeTrigger = get_store_value(subActiveTrigger);
          if (!activeTrigger)
            return;
          tick().then(() => {
            const parentMenuEl = getParentMenu(activeTrigger);
            const popper = usePopper(node, {
              anchorElement: activeTrigger,
              open: subOpen,
              options: {
                floating: $positioning,
                portal: isHTMLElement(parentMenuEl) ? parentMenuEl : void 0,
                clickOutside: null,
                focusTrap: null,
                escapeKeydown: null
              }
            });
            if (popper && popper.destroy) {
              unsubPopper = popper.destroy;
            }
          });
        });
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
          if (e.key === kbd.ESCAPE) {
            return;
          }
          const target = e.target;
          const menuEl = e.currentTarget;
          if (!isHTMLElement(target) || !isHTMLElement(menuEl))
            return;
          const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
          if (!isKeyDownInside)
            return;
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.stopImmediatePropagation();
            handleMenuNavigation(e, get_store_value(loop) ?? false);
            return;
          }
          const isCloseKey = SUB_CLOSE_KEYS["ltr"].includes(e.key);
          const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
          const isCharacterKey = e.key.length === 1;
          if (isCloseKey) {
            const $subActiveTrigger = get_store_value(subActiveTrigger);
            e.preventDefault();
            subOpen.update(() => {
              if ($subActiveTrigger) {
                handleRovingFocus($subActiveTrigger);
              }
              return false;
            });
            return;
          }
          if (e.key === kbd.TAB) {
            e.preventDefault();
            rootOpen.set(false);
            handleTabNavigation(e, nextFocusable, prevFocusable);
            return;
          }
          if (!isModifierKey && isCharacterKey && get_store_value(typeahead) === true) {
            handleTypeaheadSearch(e.key, getMenuItems(menuEl));
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          onMenuPointerMove(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          const $subActiveTrigger = get_store_value(subActiveTrigger);
          if (get_store_value(isUsingKeyboard)) {
            const target = e.target;
            const submenuEl = document.getElementById(get_store_value(subIds.menu));
            if (!isHTMLElement(submenuEl) || !isHTMLElement(target))
              return;
            if (!submenuEl.contains(target) && target !== $subActiveTrigger) {
              subOpen.set(false);
            }
          } else {
            const menuEl = e.currentTarget;
            const relatedTarget = e.relatedTarget;
            if (!isHTMLElement(relatedTarget) || !isHTMLElement(menuEl))
              return;
            if (!menuEl.contains(relatedTarget) && relatedTarget !== $subActiveTrigger) {
              subOpen.set(false);
            }
          }
        }));
        return {
          destroy() {
            unsubDerived();
            unsubPopper();
            unsubEvents();
          }
        };
      }
    });
    const subTrigger = builder(name("subtrigger"), {
      stores: [subOpen, disabled, subIds.menu, subIds.trigger],
      returned: ([$subOpen, $disabled, $subMenuId, $subTriggerId]) => {
        return {
          role: "menuitem",
          id: $subTriggerId,
          tabindex: -1,
          "aria-controls": $subMenuId,
          "aria-expanded": $subOpen,
          "data-state": $subOpen ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "aria-haspopop": "menu"
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        subActiveTrigger.update((p) => {
          if (p)
            return p;
          return node;
        });
        const unsubTimer = () => {
          clearTimerStore(subOpenTimer);
          window.clearTimeout(get_store_value(pointerGraceTimer));
          pointerGraceIntent.set(null);
        };
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "click", (e) => {
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          handleRovingFocus(triggerEl);
          if (!get_store_value(subOpen)) {
            subOpen.update((prev) => {
              const isAlreadyOpen = prev;
              if (!isAlreadyOpen) {
                subActiveTrigger.set(triggerEl);
                return !prev;
              }
              return prev;
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          const $typed = get_store_value(typed);
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          const isTypingAhead = $typed.length > 0;
          if (isTypingAhead && e.key === kbd.SPACE)
            return;
          if (SUB_OPEN_KEYS["ltr"].includes(e.key)) {
            if (!get_store_value(subOpen)) {
              triggerEl.click();
              e.preventDefault();
              return;
            }
            const menuId = triggerEl.getAttribute("aria-controls");
            if (!menuId)
              return;
            const menuEl = document.getElementById(menuId);
            if (!isHTMLElement(menuEl))
              return;
            const firstItem = getMenuItems(menuEl)[0];
            handleRovingFocus(firstItem);
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          if (!isMouse(e))
            return;
          onItemEnter(e);
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          if (!isFocusWithinSubmenu(get_store_value(subIds.menu))) {
            handleRovingFocus(triggerEl);
          }
          const openTimer = get_store_value(subOpenTimer);
          if (!get_store_value(subOpen) && !openTimer && !isElementDisabled(triggerEl)) {
            subOpenTimer.set(window.setTimeout(() => {
              subOpen.update(() => {
                subActiveTrigger.set(triggerEl);
                return true;
              });
              clearTimerStore(subOpenTimer);
            }, 100));
          }
        }), addMeltEventListener(node, "pointerleave", (e) => {
          if (!isMouse(e))
            return;
          clearTimerStore(subOpenTimer);
          const submenuEl = document.getElementById(get_store_value(subIds.menu));
          const contentRect = submenuEl?.getBoundingClientRect();
          if (contentRect) {
            const side = submenuEl?.dataset.side;
            const rightSide = side === "right";
            const bleed = rightSide ? -5 : 5;
            const contentNearEdge = contentRect[rightSide ? "left" : "right"];
            const contentFarEdge = contentRect[rightSide ? "right" : "left"];
            pointerGraceIntent.set({
              area: [
                // Apply a bleed on clientX to ensure that our exit point is
                // consistently within polygon bounds
                { x: e.clientX + bleed, y: e.clientY },
                { x: contentNearEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.bottom },
                { x: contentNearEdge, y: contentRect.bottom }
              ],
              side
            });
            window.clearTimeout(get_store_value(pointerGraceTimer));
            pointerGraceTimer.set(window.setTimeout(() => {
              pointerGraceIntent.set(null);
            }, 300));
          } else {
            onTriggerLeave(e);
            if (e.defaultPrevented)
              return;
            pointerGraceIntent.set(null);
          }
        }), addMeltEventListener(node, "focusout", (e) => {
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          removeHighlight(triggerEl);
          const relatedTarget = e.relatedTarget;
          if (!isHTMLElement(relatedTarget))
            return;
          const menuId = triggerEl.getAttribute("aria-controls");
          if (!menuId)
            return;
          const menu = document.getElementById(menuId);
          if (menu && !menu.contains(relatedTarget)) {
            subOpen.set(false);
          }
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }));
        return {
          destroy() {
            unsubTimer();
            unsubEvents();
          }
        };
      }
    });
    const subArrow = builder(name("subarrow"), {
      stores: arrowSize2,
      returned: ($arrowSize) => ({
        "data-arrow": true,
        style: styleToString({
          position: "absolute",
          width: `var(--arrow-size, ${$arrowSize}px)`,
          height: `var(--arrow-size, ${$arrowSize}px)`
        })
      })
    });
    effect([rootOpen], ([$rootOpen]) => {
      if (!$rootOpen) {
        subActiveTrigger.set(null);
        subOpen.set(false);
      }
    });
    effect([pointerGraceIntent], ([$pointerGraceIntent]) => {
      if (!isBrowser || $pointerGraceIntent)
        return;
      window.clearTimeout(get_store_value(pointerGraceTimer));
    });
    effect([subOpen], ([$subOpen]) => {
      if (!isBrowser)
        return;
      sleep(1).then(() => {
        const menuEl = document.getElementById(get_store_value(subIds.menu));
        if (!menuEl)
          return;
        if ($subOpen && get_store_value(isUsingKeyboard)) {
          const menuItems = getMenuItems(menuEl);
          if (!menuItems.length)
            return;
          handleRovingFocus(menuItems[0]);
        }
        if (!$subOpen) {
          const focusedItem = get_store_value(currentFocusedItem);
          if (focusedItem && menuEl.contains(focusedItem)) {
            removeHighlight(focusedItem);
          }
        }
        if (menuEl && !$subOpen) {
          const subTriggerEl = document.getElementById(get_store_value(subIds.trigger));
          if (!subTriggerEl || document.activeElement === subTriggerEl)
            return;
          removeHighlight(subTriggerEl);
        }
      });
    });
    return {
      ids: subIds,
      elements: {
        subTrigger,
        subMenu,
        subArrow
      },
      states: {
        subOpen
      },
      options
    };
  };
  safeOnMount(() => {
    const triggerEl = document.getElementById(get_store_value(rootIds.trigger));
    if (isHTMLElement(triggerEl) && get_store_value(rootOpen)) {
      rootActiveTrigger.set(triggerEl);
    }
    const unsubs = [];
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = () => {
      isUsingKeyboard.set(true);
      unsubs.push(executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true })));
    };
    const keydownListener = (e) => {
      if (e.key === kbd.ESCAPE && get_store_value(closeOnEscape)) {
        rootOpen.set(false);
        return;
      }
    };
    unsubs.push(addEventListener(document, "keydown", handleKeyDown, { capture: true }));
    unsubs.push(addEventListener(document, "keydown", keydownListener));
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect([rootOpen, currentFocusedItem], ([$rootOpen, $currentFocusedItem]) => {
    if (!$rootOpen && $currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
  });
  effect([rootOpen], ([$rootOpen]) => {
    if (!isBrowser)
      return;
    if (!$rootOpen) {
      const $rootActiveTrigger = get_store_value(rootActiveTrigger);
      if (!$rootActiveTrigger)
        return;
      const $closeFocus = get_store_value(closeFocus);
      if (!$rootOpen && $rootActiveTrigger) {
        handleFocus({ prop: $closeFocus, defaultEl: $rootActiveTrigger });
      }
    }
  });
  effect([rootOpen, preventScroll], ([$rootOpen, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if (opts.removeScroll && $rootOpen && $preventScroll) {
      unsubs.push(removeScroll());
    }
    sleep(1).then(() => {
      const menuEl = document.getElementById(get_store_value(rootIds.menu));
      if (menuEl && $rootOpen && get_store_value(isUsingKeyboard)) {
        if (get_store_value(disableFocusFirstItem)) {
          handleRovingFocus(menuEl);
          return;
        }
        const menuItems = getMenuItems(menuEl);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }
    });
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect(rootOpen, ($rootOpen) => {
    if (!isBrowser)
      return;
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = (e) => {
      isUsingKeyboard.set(true);
      if (e.key === kbd.ESCAPE && $rootOpen && get_store_value(closeOnEscape)) {
        rootOpen.set(false);
        return;
      }
    };
    return executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true }), addEventListener(document, "keydown", handleKeyDown, { capture: true }));
  });
  function handleOpen(triggerEl) {
    rootOpen.update((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        nextFocusable.set(getNextFocusable(triggerEl));
        prevFocusable.set(getPreviousFocusable(triggerEl));
        rootActiveTrigger.set(triggerEl);
      }
      return isOpen;
    });
  }
  function onItemFocusIn(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    const $currentFocusedItem = get_store_value(currentFocusedItem);
    if ($currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
    addHighlight(itemEl);
    currentFocusedItem.set(itemEl);
  }
  function onItemFocusOut(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    removeHighlight(itemEl);
  }
  function onItemEnter(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onItemLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    const parentMenuEl = getParentMenu(target);
    if (!parentMenuEl)
      return;
    handleRovingFocus(parentMenuEl);
  }
  function onTriggerLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onMenuPointerMove(e) {
    if (!isMouse(e))
      return;
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget) || !isHTMLElement(target))
      return;
    const $lastPointerX = get_store_value(lastPointerX);
    const pointerXHasChanged = $lastPointerX !== e.clientX;
    if (currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = e.clientX > $lastPointerX ? "right" : "left";
      pointerDir.set(newDir);
      lastPointerX.set(e.clientX);
    }
  }
  function onMenuItemPointerMove(e, currTarget = null) {
    if (!isMouse(e))
      return;
    onItemEnter(e);
    if (e.defaultPrevented)
      return;
    if (currTarget) {
      handleRovingFocus(currTarget);
      return;
    }
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
      return;
    handleRovingFocus(currentTarget);
  }
  function onMenuItemPointerLeave(e) {
    if (!isMouse(e))
      return;
    onItemLeave(e);
  }
  function onItemKeyDown(e) {
    const $typed = get_store_value(typed);
    const isTypingAhead = $typed.length > 0;
    if (isTypingAhead && e.key === kbd.SPACE) {
      e.preventDefault();
      return;
    }
    if (SELECTION_KEYS.includes(e.key)) {
      e.preventDefault();
      const itemEl = e.currentTarget;
      if (!isHTMLElement(itemEl))
        return;
      itemEl.click();
    }
  }
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  function isPointerMovingToSubmenu(e) {
    return get_store_value(pointerMovingToSubmenu)(e);
  }
  function getParentMenu(element) {
    const parentMenuEl = element.closest('[role="menu"]');
    if (!isHTMLElement(parentMenuEl))
      return null;
    return parentMenuEl;
  }
  return {
    ids: rootIds,
    trigger: rootTrigger,
    menu: rootMenu,
    open: rootOpen,
    item,
    group,
    groupLabel,
    arrow: rootArrow,
    options: opts.rootOptions,
    createCheckboxItem,
    createSubmenu,
    createMenuRadioGroup,
    separator,
    handleTypeaheadSearch
  };
}
function handleTabNavigation(e, nextFocusable, prevFocusable) {
  if (e.shiftKey) {
    const $prevFocusable = get_store_value(prevFocusable);
    if ($prevFocusable) {
      e.preventDefault();
      sleep(1).then(() => $prevFocusable.focus());
      prevFocusable.set(null);
    }
  } else {
    const $nextFocusable = get_store_value(nextFocusable);
    if ($nextFocusable) {
      e.preventDefault();
      sleep(1).then(() => $nextFocusable.focus());
      nextFocusable.set(null);
    }
  }
}
function getMenuItems(menuElement) {
  return Array.from(menuElement.querySelectorAll(`[data-melt-menu-id="${menuElement.id}"]`)).filter((item) => isHTMLElement(item));
}
function applyAttrsIfDisabled(element) {
  if (!element || !isElementDisabled(element))
    return;
  element.setAttribute("data-disabled", "");
  element.setAttribute("aria-disabled", "true");
}
function clearTimerStore(timerStore) {
  if (!isBrowser)
    return;
  const timer = get_store_value(timerStore);
  if (timer) {
    window.clearTimeout(timer);
    timerStore.set(null);
  }
}
function isMouse(e) {
  return e.pointerType === "mouse";
}
function setMeltMenuAttribute(element, selector) {
  if (!element)
    return;
  const menuEl = element.closest(`${selector()}, ${selector("submenu")}`);
  if (!isHTMLElement(menuEl))
    return;
  element.setAttribute("data-melt-menu-id", menuEl.id);
}
function handleMenuNavigation(e, loop) {
  e.preventDefault();
  const currentFocusedItem = document.activeElement;
  const currentTarget = e.currentTarget;
  if (!isHTMLElement(currentFocusedItem) || !isHTMLElement(currentTarget))
    return;
  const menuItems = getMenuItems(currentTarget);
  if (!menuItems.length)
    return;
  const candidateNodes = menuItems.filter((item) => {
    if (item.hasAttribute("data-disabled") || item.getAttribute("disabled") === "true") {
      return false;
    }
    return true;
  });
  const currentIndex = candidateNodes.indexOf(currentFocusedItem);
  let nextIndex;
  switch (e.key) {
    case kbd.ARROW_DOWN:
      if (loop) {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : currentIndex;
      }
      break;
    case kbd.ARROW_UP:
      if (loop) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : candidateNodes.length - 1;
      } else {
        nextIndex = currentIndex < 0 ? candidateNodes.length - 1 : currentIndex > 0 ? currentIndex - 1 : 0;
      }
      break;
    case kbd.HOME:
      nextIndex = 0;
      break;
    case kbd.END:
      nextIndex = candidateNodes.length - 1;
      break;
    default:
      return;
  }
  handleRovingFocus(candidateNodes[nextIndex]);
}
function isPointerInGraceArea(e, area) {
  if (!area)
    return false;
  const cursorPos = { x: e.clientX, y: e.clientY };
  return isPointInPolygon(cursorPos, area);
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isFocusWithinSubmenu(submenuId) {
  const activeEl = document.activeElement;
  if (!isHTMLElement(activeEl))
    return false;
  const submenuEl = activeEl.closest(`[data-id="${submenuId}"]`);
  return isHTMLElement(submenuEl);
}
const defaults$1 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  forceVisible: false,
  typeahead: true,
  closeFocus: void 0,
  disableFocusFirstItem: false,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createDropdownMenu(props) {
  const withDefaults = { ...defaults$1, ...props };
  const rootOptions = toWritableStores(omit(withDefaults, "ids"));
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const rootOpen = overridable(openWritable, withDefaults?.onOpenChange);
  const rootActiveTrigger = writable(null);
  const nextFocusable = writable(null);
  const prevFocusable = writable(null);
  const { trigger, menu, item, arrow, createSubmenu, createCheckboxItem, createMenuRadioGroup, separator, group, groupLabel, ids } = createMenuBuilder({
    rootOptions,
    rootOpen,
    rootActiveTrigger,
    nextFocusable,
    prevFocusable,
    selector: "dropdown-menu",
    removeScroll: true,
    ids: withDefaults.ids
  });
  return {
    ids,
    elements: {
      trigger,
      menu,
      item,
      arrow,
      separator,
      group,
      groupLabel
    },
    states: {
      open: rootOpen
    },
    builders: {
      createCheckboxItem,
      createSubmenu,
      createMenuRadioGroup
    },
    options: rootOptions
  };
}
const defaults = {
  orientation: "horizontal",
  decorative: false
};
const createSeparator = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(withDefaults);
  const { orientation, decorative } = options;
  const root = builder("separator", {
    stores: [orientation, decorative],
    returned: ([$orientation, $decorative]) => {
      const ariaOrientation = $orientation === "vertical" ? $orientation : void 0;
      return {
        role: $decorative ? "none" : "separator",
        "aria-orientation": ariaOrientation,
        "aria-hidden": $decorative,
        "data-orientation": $orientation
      };
    }
  });
  return {
    elements: {
      root
    },
    options
  };
};
function generateId() {
  return nanoid(10);
}
const Aspect_ratio$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ratio", "el"]);
  let { ratio = 1 / 1 } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-aspect-ratio-root": "" };
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
    $$bindings.ratio(ratio);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  return `<div${add_styles({
    "position": `relative`,
    "width": `100%`,
    "padding-bottom": `${ratio ? 100 / ratio : 0}%`
  })}><div${spread([escape_object($$restProps), escape_object(attrs)], {
    styles: {
      "position": `absolute`,
      "top": `0`,
      "right": `0`,
      "bottom": `0`,
      "left": `0`
    }
  })}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
function getMenuData() {
  const NAME = "menu";
  const SUB_NAME = "menu-submenu";
  const RADIO_GROUP_NAME = "menu-radiogroup";
  const CHECKBOX_ITEM_NAME = "menu-checkboxitem";
  const RADIO_ITEM_NAME = "menu-radioitem";
  const GROUP_NAME = "menu-group";
  const PARTS = [
    "arrow",
    "checkbox-indicator",
    "checkbox-item",
    "content",
    "group",
    "item",
    "label",
    "radio-group",
    "radio-item",
    "radio-indicator",
    "separator",
    "sub-content",
    "sub-trigger",
    "trigger"
  ];
  return {
    NAME,
    SUB_NAME,
    RADIO_GROUP_NAME,
    CHECKBOX_ITEM_NAME,
    RADIO_ITEM_NAME,
    GROUP_NAME,
    PARTS
  };
}
function getCtx() {
  const { NAME } = getMenuData();
  return getContext(NAME);
}
function setCtx$1(props) {
  const { NAME, PARTS } = getMenuData();
  const getAttrs = createBitAttrs("menu", PARTS);
  const dropdownMenu = {
    ...createDropdownMenu({ ...removeUndefined(props), forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dropdownMenu);
  return {
    ...dropdownMenu,
    updateOption: getOptionUpdater(dropdownMenu.options)
  };
}
function setGroupCtx() {
  const { GROUP_NAME } = getMenuData();
  const { elements: { group }, getAttrs } = getCtx();
  const id = generateId();
  setContext(GROUP_NAME, id);
  return { group, id, getAttrs };
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
const Menu_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $group, $$unsubscribe_group;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { group, id, getAttrs } = setGroupCtx();
  $$unsubscribe_group = subscribe(group, (value) => $group = value);
  const attrs = getAttrs("group");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $group(id);
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_group();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>`}`;
});
const Menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $separator, $$unsubscribe_separator;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { separator }, getAttrs } = getCtx();
  $$unsubscribe_separator = subscribe(separator, (value) => $separator = value);
  const attrs = getAttrs("separator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder2 = $separator;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_separator();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<div${spread([escape_object($separator), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { preventScroll = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { dir = void 0 } = $$props;
  let { typeahead = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { disableFocusFirstItem = void 0 } = $$props;
  let { closeOnItemClick = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx$1({
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    forceVisible: true,
    defaultOpen: open,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    closeOnItemClick,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0)
    $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0)
    $$bindings.onOpenChange(onOpenChange);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0)
    $$bindings.preventScroll(preventScroll);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0)
    $$bindings.loop(loop);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0)
    $$bindings.dir(dir);
  if ($$props.typeahead === void 0 && $$bindings.typeahead && typeahead !== void 0)
    $$bindings.typeahead(typeahead);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0)
    $$bindings.closeFocus(closeFocus);
  if ($$props.disableFocusFirstItem === void 0 && $$bindings.disableFocusFirstItem && disableFocusFirstItem !== void 0)
    $$bindings.disableFocusFirstItem(disableFocusFirstItem);
  if ($$props.closeOnItemClick === void 0 && $$bindings.closeOnItemClick && closeOnItemClick !== void 0)
    $$bindings.closeOnItemClick(closeOnItemClick);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0)
    $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("dir", dir);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("disableFocusFirstItem", disableFocusFirstItem);
  }
  {
    updateOption("typeahead", typeahead);
  }
  {
    updateOption("closeOnItemClick", closeOnItemClick);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let $menu, $$unsubscribe_menu;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "bottom" } = $$props;
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
  const { elements: { menu }, states: { open }, ids, getAttrs } = getCtx();
  $$unsubscribe_menu = subscribe(menu, (value) => $menu = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const attrs = getAttrs("content");
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
      ids.menu.set(id);
    }
  }
  builder2 = $menu;
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
  $$unsubscribe_menu();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder: builder2 }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Menu_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
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
function getSeparatorData() {
  const NAME = "separator";
  const PARTS = ["root"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getSeparatorData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const separator = { ...createSeparator(removeUndefined(props)), getAttrs };
  return {
    ...separator,
    updateOption: getOptionUpdater(separator.options)
  };
}
const Separator$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder2;
  let $$restProps = compute_rest_props($$props, ["orientation", "decorative", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { orientation = "horizontal" } = $$props;
  let { decorative = true } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, updateOption, getAttrs } = setCtx({ orientation, decorative });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  const attrs = getAttrs("root");
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0)
    $$bindings.decorative(decorative);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("decorative", decorative);
  }
  builder2 = $root;
  {
    Object.assign(builder2, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder: builder2 }) : ``}` : `<div${spread([escape_object(builder2), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const Separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "orientation", "decorative"]);
  let { class: className = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { decorative = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0)
    $$bindings.decorative(decorative);
  return `${validate_component(Separator$1, "SeparatorPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )
      },
      { orientation },
      { decorative },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const GithubIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none"><path d="M10.3687 24.8375C10.3687 24.9625 10.225 25.0625 10.0437 25.0625C9.8375 25.0812 9.69375 24.9812 9.69375 24.8375C9.69375 24.7125 9.8375 24.6125 10.0188 24.6125C10.2063 24.5938 10.3687 24.6938 10.3687 24.8375ZM8.425 24.5562C8.38125 24.6812 8.50625 24.825 8.69375 24.8625C8.85625 24.925 9.04375 24.8625 9.08125 24.7375C9.11875 24.6125 9 24.4688 8.8125 24.4125C8.65 24.3687 8.46875 24.4312 8.425 24.5562ZM11.1875 24.45C11.0063 24.4938 10.8812 24.6125 10.9 24.7563C10.9187 24.8813 11.0813 24.9625 11.2688 24.9188C11.45 24.875 11.575 24.7563 11.5562 24.6313C11.5375 24.5125 11.3687 24.4313 11.1875 24.45ZM15.3 0.5C6.63125 0.5 0 7.08125 0 15.75C0 22.6812 4.3625 28.6125 10.5938 30.7C11.3938 30.8438 11.675 30.35 11.675 29.9438C11.675 29.5562 11.6562 27.4188 11.6562 26.1063C11.6562 26.1063 7.28125 27.0437 6.3625 24.2437C6.3625 24.2437 5.65 22.425 4.625 21.9562C4.625 21.9562 3.19375 20.975 4.725 20.9937C4.725 20.9937 6.28125 21.1188 7.1375 22.6063C8.50625 25.0188 10.8 24.325 11.6938 23.9125C11.8375 22.9125 12.2438 22.2188 12.6938 21.8062C9.2 21.4187 5.675 20.9125 5.675 14.9C5.675 13.1812 6.15 12.3188 7.15 11.2188C6.9875 10.8125 6.45625 9.1375 7.3125 6.975C8.61875 6.56875 11.625 8.6625 11.625 8.6625C12.875 8.3125 14.2188 8.13125 15.55 8.13125C16.8813 8.13125 18.225 8.3125 19.475 8.6625C19.475 8.6625 22.4813 6.5625 23.7875 6.975C24.6438 9.14375 24.1125 10.8125 23.95 11.2188C24.95 12.325 25.5625 13.1875 25.5625 14.9C25.5625 20.9312 21.8813 21.4125 18.3875 21.8062C18.9625 22.3 19.45 23.2375 19.45 24.7062C19.45 26.8125 19.4312 29.4187 19.4312 29.9312C19.4312 30.3375 19.7188 30.8312 20.5125 30.6875C26.7625 28.6125 31 22.6812 31 15.75C31 7.08125 23.9688 0.5 15.3 0.5ZM6.075 22.0562C5.99375 22.1187 6.0125 22.2625 6.11875 22.3813C6.21875 22.4813 6.3625 22.525 6.44375 22.4438C6.525 22.3813 6.50625 22.2375 6.4 22.1187C6.3 22.0187 6.15625 21.975 6.075 22.0562ZM5.4 21.55C5.35625 21.6312 5.41875 21.7313 5.54375 21.7938C5.64375 21.8563 5.76875 21.8375 5.8125 21.75C5.85625 21.6688 5.79375 21.5688 5.66875 21.5063C5.54375 21.4688 5.44375 21.4875 5.4 21.55ZM7.425 23.775C7.325 23.8562 7.3625 24.0438 7.50625 24.1625C7.65 24.3062 7.83125 24.325 7.9125 24.225C7.99375 24.1438 7.95625 23.9562 7.83125 23.8375C7.69375 23.6938 7.50625 23.675 7.425 23.775ZM6.7125 22.8563C6.6125 22.9188 6.6125 23.0813 6.7125 23.225C6.8125 23.3687 6.98125 23.4312 7.0625 23.3687C7.1625 23.2875 7.1625 23.125 7.0625 22.9813C6.975 22.8375 6.8125 22.775 6.7125 22.8563Z" fill="currentColor"></path></svg>`;
});
const LinkedinIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M26 2H1.99375C0.89375 2 0 2.90625 0 4.01875V27.9813C0 29.0938 0.89375 30 1.99375 30H26C27.1 30 28 29.0938 28 27.9813V4.01875C28 2.90625 27.1 2 26 2ZM8.4625 26H4.3125V12.6375H8.46875V26H8.4625ZM6.3875 10.8125C5.05625 10.8125 3.98125 9.73125 3.98125 8.40625C3.98125 7.08125 5.05625 6 6.3875 6C7.7125 6 8.79375 7.08125 8.79375 8.40625C8.79375 9.7375 7.71875 10.8125 6.3875 10.8125ZM24.0187 26H19.8687V19.5C19.8687 17.95 19.8375 15.9563 17.7125 15.9563C15.55 15.9563 15.2188 17.6438 15.2188 19.3875V26H11.0688V12.6375H15.05V14.4625H15.1062C15.6625 13.4125 17.0188 12.3062 19.0375 12.3062C23.2375 12.3062 24.0187 15.075 24.0187 18.675V26Z" fill="currentColor"></path></svg>`;
});
const TelegramIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none"><g clip-path="url(#clip0_95_115)"><path d="M15.5 0.5C6.9375 0.5 0 7.4375 0 16C0 24.5625 6.9375 31.5 15.5 31.5C24.0625 31.5 31 24.5625 31 16C31 7.4375 24.0625 0.5 15.5 0.5ZM22.6875 11.0437C22.4562 13.4937 21.4438 19.4438 20.9312 22.1875C20.7125 23.35 20.2875 23.7375 19.875 23.775C18.975 23.8562 18.2938 23.1813 17.4188 22.6063C16.0563 21.7125 15.2812 21.1562 13.9625 20.2812C12.4312 19.275 13.425 18.7188 14.2937 17.8125C14.525 17.575 18.4875 13.9688 18.5625 13.6438C18.575 13.6 18.5812 13.45 18.4875 13.3687C18.3937 13.2875 18.2625 13.3187 18.1688 13.3375C18.0312 13.3667 15.8521 14.8062 11.6313 17.6562C11.0146 18.0812 10.4542 18.2875 9.95 18.275C9.39375 18.2625 8.33125 17.9625 7.5375 17.7062C6.56875 17.3937 5.79375 17.225 5.8625 16.6875C5.89583 16.4083 6.28125 16.1229 7.01875 15.8313C11.5354 13.8646 14.5479 12.5667 16.0562 11.9375C20.3625 10.15 21.2563 9.8375 21.8375 9.825C21.9688 9.825 22.25 9.85625 22.4375 10.0063C22.5599 10.1138 22.6378 10.2631 22.6562 10.425C22.69 10.6294 22.7005 10.837 22.6875 11.0437Z" fill="currentColor"></path></g><defs><clipPath id="clip0_95_115"><rect width="31" height="32" fill="white"></rect></clipPath></defs></svg>`;
});
const RedditIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M4 2H24C26.2062 2 28 3.79375 28 6V26C28 28.2062 26.2062 30 24 30H4C1.79375 30 0 28.2062 0 26V6C0 3.79375 1.79375 2 4 2ZM19.1187 10.4C20.4062 10.4 21.45 9.35625 21.45 8.06875C21.45 6.78125 20.4062 5.7375 19.1187 5.7375C17.9937 5.7375 17.05 6.5375 16.8312 7.6C14.9437 7.8 13.4688 9.4 13.4688 11.3438V11.3562C11.4187 11.4437 9.54375 12.025 8.05625 12.95C7.50625 12.525 6.8125 12.2688 6.05625 12.2688C4.25 12.2688 2.7875 13.7313 2.7875 15.5375C2.7875 16.85 3.55625 17.975 4.66875 18.5C4.775 22.2938 8.9125 25.35 14 25.35C19.0875 25.35 23.225 22.2937 23.3312 18.4937C24.4375 17.9688 25.2 16.8438 25.2 15.5375C25.2 13.7313 23.7375 12.2688 21.9312 12.2688C21.1812 12.2688 20.4937 12.5188 19.9375 12.9438C18.4375 12.0125 16.5438 11.4312 14.4688 11.3562V11.35C14.4688 9.9625 15.5 8.80625 16.8375 8.61875C17.0812 9.65 18.0063 10.4125 19.1063 10.4125L19.1187 10.4ZM9.6875 15.5063C10.6 15.5063 11.3 16.4688 11.25 17.6562C11.2 18.8438 10.5125 19.275 9.59375 19.275C8.675 19.275 7.875 18.7938 7.93125 17.6063C7.9875 16.4188 8.775 15.5125 9.6875 15.5125V15.5063ZM20.0875 17.6C20.1437 18.7875 19.3375 19.2687 18.425 19.2687C17.5125 19.2687 16.825 18.8375 16.7687 17.65C16.7125 16.4625 17.4125 15.5 18.3312 15.5C19.25 15.5 20.0375 16.4125 20.0875 17.5938V17.6ZM17.4562 20.7C16.8937 22.0438 15.5625 22.9937 14.0125 22.9937C12.4625 22.9937 11.1313 22.05 10.5688 20.7C10.5 20.5375 10.6125 20.3625 10.7812 20.3438C11.7875 20.2437 12.875 20.1875 14.0125 20.1875C15.15 20.1875 16.2375 20.2437 17.2437 20.3438C17.4125 20.3625 17.525 20.5375 17.4562 20.7Z" fill="currentColor"></path></svg>`;
});
const HeaderMobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const internalLinks = [
    { id: 1, name: "Intro", link: "hero" },
    { id: 2, name: "About", link: "about" },
    {
      id: 3,
      name: "Techs",
      link: "technologies"
    },
    {
      id: 4,
      name: "Projects",
      link: "projects"
    },
    {
      id: 5,
      name: "Testimonials",
      link: "testimonials"
    },
    { id: 6, name: "Contact", link: "contact" }
  ];
  const socialMedias = [
    {
      id: 1,
      name: "GitHub",
      icon: GithubIcon,
      link: ""
    },
    {
      id: 2,
      name: "Linkedin",
      icon: LinkedinIcon,
      link: ""
    },
    {
      id: 3,
      name: "Telegram",
      icon: TelegramIcon,
      link: ""
    },
    {
      id: 4,
      name: "Reddit",
      icon: RedditIcon,
      link: ""
    }
  ];
  return `<div class="fixed z-50 top-0 w-screen h-screen bg-black bg-opacity-10 backdrop-blur-xl"><section class="${"h-[90%] border-b-4 border-white/80 rounded-b-2xl flex bg-black/60 transition-all p-6 shadow-inner-md " + escape("", true)}"><div class="flex-2"><nav class="text-c-body-text text-2xl font-medium"><ol class="ml-0 flex flex-col gap-4 w-full">${each(internalLinks, (internalLink) => {
    return `${``}`;
  })}</ol></nav></div> <div class="flex-1 h-full flex flex-col"><button class="w-8 h-8 ml-auto block hover:opacity-65 text-c-body-text-light transition-all duration-100 ease-in" data-svelte-h="svelte-1py4ffk"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill="currentColor"></path></svg></button> <ul class="flex flex-col gap-y-4 mt-auto ml-auto items-end justify-center text-c-body-text"><li class="ml-4 -mb-1" data-svelte-h="svelte-i2f5ej"><button><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 36 36" fill="none"><path d="M17.85 33L24.675 15H27.825L34.65 33H31.5L29.8875 28.425H22.6125L21 33H17.85ZM6 28.5L3.9 26.4L11.475 18.825C10.6 17.95 9.80625 16.95 9.09375 15.825C8.38125 14.7 7.725 13.425 7.125 12H10.275C10.775 12.975 11.275 13.825 11.775 14.55C12.275 15.275 12.875 16 13.575 16.725C14.4 15.9 15.2563 14.7438 16.1438 13.2563C17.0313 11.7688 17.7 10.35 18.15 9H1.5V6H12V3H15V6H25.5V9H21.15C20.625 10.8 19.8375 12.65 18.7875 14.55C17.7375 16.45 16.7 17.9 15.675 18.9L19.275 22.575L18.15 25.65L13.575 20.9625L6 28.5ZM23.55 25.8H28.95L26.25 18.15L23.55 25.8Z" fill="white"></path></svg></button></li> ${validate_component(Separator, "Separator").$$render($$result, { class: "mb-3 w-8 border-2 rounded" }, {}, {})} ${each(socialMedias, (socialMedia) => {
    return `<li class="hover:opacity-65 text-c-body-text-light hover:scale-110 transition-all ease-in">${``} </li>`;
  })}</ul></div></section></div>`;
});
const Saos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { animation = "none" } = $$props;
  let { animation_out = "none; opacity: 0" } = $$props;
  let { once = false } = $$props;
  let { top = 0 } = $$props;
  let { bottom = 0 } = $$props;
  let { css_observer = "" } = $$props;
  let { css_animation = "" } = $$props;
  const dispatch = createEventDispatcher();
  let observing = true;
  const countainer = `__saos-${Math.random()}__`;
  if ($$props.animation === void 0 && $$bindings.animation && animation !== void 0)
    $$bindings.animation(animation);
  if ($$props.animation_out === void 0 && $$bindings.animation_out && animation_out !== void 0)
    $$bindings.animation_out(animation_out);
  if ($$props.once === void 0 && $$bindings.once && once !== void 0)
    $$bindings.once(once);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0)
    $$bindings.bottom(bottom);
  if ($$props.css_observer === void 0 && $$bindings.css_observer && css_observer !== void 0)
    $$bindings.css_observer(css_observer);
  if ($$props.css_animation === void 0 && $$bindings.css_animation && css_animation !== void 0)
    $$bindings.css_animation(css_animation);
  {
    dispatch("update", { observing });
  }
  return `<div${add_attribute("id", countainer, 0)}${add_attribute("style", css_observer, 0)}>${`<div style="${"animation: " + escape(animation, true) + "; " + escape(css_animation, true)}">${slots.default ? slots.default({}) : ``}</div>`}</div>`;
});
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $textContent, $$unsubscribe_textContent;
  let $languageSelected, $$unsubscribe_languageSelected;
  $$unsubscribe_textContent = subscribe(textContent, (value) => $textContent = value);
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  $$unsubscribe_textContent();
  $$unsubscribe_languageSelected();
  return `${validate_component(Saos, "Saos").$$render(
    $$result,
    {
      animation: "from-left 0.3s cubic-bezier(0.35, 0.5, 0.65, 0.95) both",
      once: true
    },
    {},
    {}
  )} <section id="about" class="max-[956px]:col-span-2 relative flex justify-between shadow-xl py-12 px-4 xs:px-6 sm:px-8 rounded-2xl gap-4 gradient-white"><div class="sm:w-1/2 w-full flex flex-col gap-y-4 md:gap-y-6"><h2 class="font-title font-bold text-2xl xs:text-3xl text-black mb-2 lowercase">2. ${escape($textContent.about.title[$languageSelected] ?? "about")}</h2> ${each($textContent.about.paragraphs, (paragraph) => {
    return `<p class="text-black">${escape(paragraph[$languageSelected])}</p>`;
  })}</div> <div class="sm:flex-1 hidden sm:block" data-svelte-h="svelte-1n8jddh"><img src="/images/photos/me2.png" width="240" height="240" draggable="false" class="max-[660px]:w-40 max-[660px]:h-40 max-[956px]:w-60 max-[956px]:h-60 w-40 h-40 lg:w-48 lg:h-48 xl:w-60 xl:h-60 ml-auto border-4 rounded-[10px] border-black shadow-2xl select-none" alt="onwner of the website"></div>  </section>`;
});
const Dropdown_menu_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "sideOffset", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0)
    $$bindings.sideOffset(sideOffset);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Menu_content, "DropdownMenuPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      { sideOffset },
      {
        class: cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none", className)
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
const Dropdown_menu_separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Menu_separator, "DropdownMenuPrimitive.Separator").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("-mx-1 my-1 h-px bg-muted", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Root = Menu;
const Trigger = Menu_trigger;
const Group = Menu_group;
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $textContent, $$unsubscribe_textContent;
  let $languageSelected, $$unsubscribe_languageSelected;
  $$unsubscribe_textContent = subscribe(textContent, (value) => $textContent = value);
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  let languageSwitcherForm;
  $$unsubscribe_textContent();
  $$unsubscribe_languageSelected();
  return `<header class="flex justify-between items-center"><img${add_attribute("src", logo, 0)} alt="logo"> <nav class="ml-auto hidden min-[980px]:block"><ul class="flex gap-x-8 list-decimal text-c-body-text text-lg">${$textContent ? `${each($textContent.nav, (item) => {
    return `<li class="hover:text-black text-c-body-text-light transition-all duration-200 ease-in font-semibold"><a${add_attribute("href", `#${item.en.toLowerCase()}`, 0)}>${escape(item[$languageSelected])}</a> </li>`;
  })}` : ``}</ul></nav> ${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, {}, {}, {
        default: () => {
          return `<button class="ml-4 hidden min-[980px]:block text-white hover:text-black transition-all duration-200 ease-in" data-svelte-h="svelte-qc0b46"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M17.85 33L24.675 15H27.825L34.65 33H31.5L29.8875 28.425H22.6125L21 33H17.85ZM6 28.5L3.9 26.4L11.475 18.825C10.6 17.95 9.80625 16.95 9.09375 15.825C8.38125 14.7 7.725 13.425 7.125 12H10.275C10.775 12.975 11.275 13.825 11.775 14.55C12.275 15.275 12.875 16 13.575 16.725C14.4 15.9 15.2563 14.7438 16.1438 13.2563C17.0313 11.7688 17.7 10.35 18.15 9H1.5V6H12V3H15V6H25.5V9H21.15C20.625 10.8 19.8375 12.65 18.7875 14.55C17.7375 16.45 16.7 17.9 15.675 18.9L19.275 22.575L18.15 25.65L13.575 20.9625L6 28.5ZM23.55 25.8H28.95L26.25 18.15L23.55 25.8Z" fill="currentColor"></path></svg></button>`;
        }
      })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, { class: "p-0" }, {}, {
        default: () => {
          return `${validate_component(Group, "DropdownMenu.Group").$$render($$result, {}, {}, {
            default: () => {
              return `<form method="POST"${add_attribute("this", languageSwitcherForm, 0)}><button formaction="/?/setLanguage&language=pt" class="flex gap-x-2 items-center hover:bg-gray-100 p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full" data-svelte-h="svelte-rsjsaq"><img src="images/flags/br.svg" width="32" alt="brazil flag"> <p>Português</p></button> ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, { class: "my-0" }, {}, {})} <button formaction="/?/setLanguage&language=en" class="flex gap-x-2 items-center hover:bg-gray-100 p-3 transition-all duration-150 hover:cursor-pointer font-semibold w-full" data-svelte-h="svelte-16yir9m"><img src="images/flags/us.svg" width="32" alt="United States of America flag"> <p>English</p></button></form>`;
            }
          })}`;
        }
      })}`;
    }
  })} <button class="min-[980px]:hidden text-[#f7f7f7] hover:text-black transition-all ease-in" data-svelte-h="svelte-1bh1n9m"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.28571 0H13.7143C14.3205 0 14.9019 0.337142 15.3305 0.937258C15.7592 1.53737 16 2.35131 16 3.2C16 4.04869 15.7592 4.86263 15.3305 5.46274C14.9019 6.06286 14.3205 6.4 13.7143 6.4H2.28571C1.67951 6.4 1.09812 6.06286 0.66947 5.46274C0.240816 4.86263 0 4.04869 0 3.2C0 2.35131 0.240816 1.53737 0.66947 0.937258C1.09812 0.337142 1.67951 0 2.28571 0ZM18.2857 25.6H29.7143C30.3205 25.6 30.9019 25.9371 31.3305 26.5373C31.7592 27.1374 32 27.9513 32 28.8C32 29.6487 31.7592 30.4626 31.3305 31.0627C30.9019 31.6629 30.3205 32 29.7143 32H18.2857C17.6795 32 17.0981 31.6629 16.6695 31.0627C16.2408 30.4626 16 29.6487 16 28.8C16 27.9513 16.2408 27.1374 16.6695 26.5373C17.0981 25.9371 17.6795 25.6 18.2857 25.6ZM2.28571 12.8H29.7143C30.3205 12.8 30.9019 13.1371 31.3305 13.7373C31.7592 14.3374 32 15.1513 32 16C32 16.8487 31.7592 17.6626 31.3305 18.2627C30.9019 18.8629 30.3205 19.2 29.7143 19.2H2.28571C1.67951 19.2 1.09812 18.8629 0.66947 18.2627C0.240816 17.6626 0 16.8487 0 16C0 15.1513 0.240816 14.3374 0.66947 13.7373C1.09812 13.1371 1.67951 12.8 2.28571 12.8Z" fill="currentColor"></path></svg></button></header>`;
});
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $textContent, $$unsubscribe_textContent;
  let $languageSelected, $$unsubscribe_languageSelected;
  $$unsubscribe_textContent = subscribe(textContent, (value) => $textContent = value);
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  $$unsubscribe_textContent();
  $$unsubscribe_languageSelected();
  return ` <section id="intro" class="relative col-span-2 px-4 xs:px-6 sm:px-8 md:px-16 pt-8 pb-12 xs:pb-24 gradient-blue-ish border-2 border-white/70 rounded-2xl shadow-xl shadow-stone-900">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <hgroup class="relative z-10">${$textContent ? `<h1 class="text-4xl xs:text-5xl lg:text-7xl mt-6 xs:mt-16 text-c-body-text-light font-title font-bold"><span class="text-black">${escape($textContent.hero.title.greeting[$languageSelected])}</span><br>
				Murillo Pinheiro de Oliveira,<br> <span class="text-black/40" data-svelte-h="svelte-zzoi42">Web Dev.</span></h1> <p class="max-w-lg mt-3 xs:mt-6 text-sm xs:text-base sm:text-lg text-gray-200 leading-6 font-semibold">${escape($textContent.hero.subtitle[$languageSelected])}</p>` : ``}</hgroup> <nav class="max-w-lg mr-auto text-gray-200 relative z-10" data-svelte-h="svelte-rdnbva"><ul class="flex gap-x-4 justify-end mt-4"><li class="hover:text-black transition-all duration-200 ease-in"><a href="https://github.com/muriWolf" target="_blank" rel="author"><svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none"><path d="M10.3687 24.8375C10.3687 24.9625 10.225 25.0625 10.0437 25.0625C9.8375 25.0812 9.69375 24.9812 9.69375 24.8375C9.69375 24.7125 9.8375 24.6125 10.0188 24.6125C10.2063 24.5938 10.3687 24.6938 10.3687 24.8375ZM8.425 24.5562C8.38125 24.6812 8.50625 24.825 8.69375 24.8625C8.85625 24.925 9.04375 24.8625 9.08125 24.7375C9.11875 24.6125 9 24.4688 8.8125 24.4125C8.65 24.3687 8.46875 24.4312 8.425 24.5562ZM11.1875 24.45C11.0063 24.4938 10.8812 24.6125 10.9 24.7563C10.9187 24.8813 11.0813 24.9625 11.2688 24.9188C11.45 24.875 11.575 24.7563 11.5562 24.6313C11.5375 24.5125 11.3687 24.4313 11.1875 24.45ZM15.3 0.5C6.63125 0.5 0 7.08125 0 15.75C0 22.6812 4.3625 28.6125 10.5938 30.7C11.3938 30.8438 11.675 30.35 11.675 29.9438C11.675 29.5562 11.6562 27.4188 11.6562 26.1063C11.6562 26.1063 7.28125 27.0437 6.3625 24.2437C6.3625 24.2437 5.65 22.425 4.625 21.9562C4.625 21.9562 3.19375 20.975 4.725 20.9937C4.725 20.9937 6.28125 21.1188 7.1375 22.6063C8.50625 25.0188 10.8 24.325 11.6938 23.9125C11.8375 22.9125 12.2438 22.2188 12.6938 21.8062C9.2 21.4187 5.675 20.9125 5.675 14.9C5.675 13.1812 6.15 12.3188 7.15 11.2188C6.9875 10.8125 6.45625 9.1375 7.3125 6.975C8.61875 6.56875 11.625 8.6625 11.625 8.6625C12.875 8.3125 14.2188 8.13125 15.55 8.13125C16.8813 8.13125 18.225 8.3125 19.475 8.6625C19.475 8.6625 22.4813 6.5625 23.7875 6.975C24.6438 9.14375 24.1125 10.8125 23.95 11.2188C24.95 12.325 25.5625 13.1875 25.5625 14.9C25.5625 20.9312 21.8813 21.4125 18.3875 21.8062C18.9625 22.3 19.45 23.2375 19.45 24.7062C19.45 26.8125 19.4312 29.4187 19.4312 29.9312C19.4312 30.3375 19.7188 30.8312 20.5125 30.6875C26.7625 28.6125 31 22.6812 31 15.75C31 7.08125 23.9688 0.5 15.3 0.5ZM6.075 22.0562C5.99375 22.1187 6.0125 22.2625 6.11875 22.3813C6.21875 22.4813 6.3625 22.525 6.44375 22.4438C6.525 22.3813 6.50625 22.2375 6.4 22.1187C6.3 22.0187 6.15625 21.975 6.075 22.0562ZM5.4 21.55C5.35625 21.6312 5.41875 21.7313 5.54375 21.7938C5.64375 21.8563 5.76875 21.8375 5.8125 21.75C5.85625 21.6688 5.79375 21.5688 5.66875 21.5063C5.54375 21.4688 5.44375 21.4875 5.4 21.55ZM7.425 23.775C7.325 23.8562 7.3625 24.0438 7.50625 24.1625C7.65 24.3062 7.83125 24.325 7.9125 24.225C7.99375 24.1438 7.95625 23.9562 7.83125 23.8375C7.69375 23.6938 7.50625 23.675 7.425 23.775ZM6.7125 22.8563C6.6125 22.9188 6.6125 23.0813 6.7125 23.225C6.8125 23.3687 6.98125 23.4312 7.0625 23.3687C7.1625 23.2875 7.1625 23.125 7.0625 22.9813C6.975 22.8375 6.8125 22.775 6.7125 22.8563Z" fill="currentColor"></path></svg></a></li> <li class="hover:text-black transition-all duration-200 ease-in"><a href="https://www.linkedin.com/in/murillo-pinheiro-de-oliveira-2b931724a/" target="_blank" rel="author"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M26 2H1.99375C0.89375 2 0 2.90625 0 4.01875V27.9813C0 29.0938 0.89375 30 1.99375 30H26C27.1 30 28 29.0938 28 27.9813V4.01875C28 2.90625 27.1 2 26 2ZM8.4625 26H4.3125V12.6375H8.46875V26H8.4625ZM6.3875 10.8125C5.05625 10.8125 3.98125 9.73125 3.98125 8.40625C3.98125 7.08125 5.05625 6 6.3875 6C7.7125 6 8.79375 7.08125 8.79375 8.40625C8.79375 9.7375 7.71875 10.8125 6.3875 10.8125ZM24.0187 26H19.8687V19.5C19.8687 17.95 19.8375 15.9563 17.7125 15.9563C15.55 15.9563 15.2188 17.6438 15.2188 19.3875V26H11.0688V12.6375H15.05V14.4625H15.1062C15.6625 13.4125 17.0188 12.3062 19.0375 12.3062C23.2375 12.3062 24.0187 15.075 24.0187 18.675V26Z" fill="currentColor"></path></svg></a></li> <li class="hover:text-black transition-all duration-200 ease-in"><a href="https://web.telegram.org/k/#@MuriWolf" target="_blank" rel="author"><svg xmlns="http://www.w3.org/2000/svg" width="31" height="32" viewBox="0 0 31 32" fill="none"><g clip-path="url(#clip0_95_115)"><path d="M15.5 0.5C6.9375 0.5 0 7.4375 0 16C0 24.5625 6.9375 31.5 15.5 31.5C24.0625 31.5 31 24.5625 31 16C31 7.4375 24.0625 0.5 15.5 0.5ZM22.6875 11.0437C22.4562 13.4937 21.4438 19.4438 20.9312 22.1875C20.7125 23.35 20.2875 23.7375 19.875 23.775C18.975 23.8562 18.2938 23.1813 17.4188 22.6063C16.0563 21.7125 15.2812 21.1562 13.9625 20.2812C12.4312 19.275 13.425 18.7188 14.2937 17.8125C14.525 17.575 18.4875 13.9688 18.5625 13.6438C18.575 13.6 18.5812 13.45 18.4875 13.3687C18.3937 13.2875 18.2625 13.3187 18.1688 13.3375C18.0312 13.3667 15.8521 14.8062 11.6313 17.6562C11.0146 18.0812 10.4542 18.2875 9.95 18.275C9.39375 18.2625 8.33125 17.9625 7.5375 17.7062C6.56875 17.3937 5.79375 17.225 5.8625 16.6875C5.89583 16.4083 6.28125 16.1229 7.01875 15.8313C11.5354 13.8646 14.5479 12.5667 16.0562 11.9375C20.3625 10.15 21.2563 9.8375 21.8375 9.825C21.9688 9.825 22.25 9.85625 22.4375 10.0063C22.5599 10.1138 22.6378 10.2631 22.6562 10.425C22.69 10.6294 22.7005 10.837 22.6875 11.0437Z" fill="currentColor"></path></g><defs><clipPath id="clip0_95_115"><rect width="31" height="32" fill="white"></rect></clipPath></defs></svg></a></li> <li class="hover:text-black transition-all duration-200 ease-in"><a href="https://www.reddit.com/user/MuriWolf/" target="_blank" rel="author"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M4 2H24C26.2062 2 28 3.79375 28 6V26C28 28.2062 26.2062 30 24 30H4C1.79375 30 0 28.2062 0 26V6C0 3.79375 1.79375 2 4 2ZM19.1187 10.4C20.4062 10.4 21.45 9.35625 21.45 8.06875C21.45 6.78125 20.4062 5.7375 19.1187 5.7375C17.9937 5.7375 17.05 6.5375 16.8312 7.6C14.9437 7.8 13.4688 9.4 13.4688 11.3438V11.3562C11.4187 11.4437 9.54375 12.025 8.05625 12.95C7.50625 12.525 6.8125 12.2688 6.05625 12.2688C4.25 12.2688 2.7875 13.7313 2.7875 15.5375C2.7875 16.85 3.55625 17.975 4.66875 18.5C4.775 22.2938 8.9125 25.35 14 25.35C19.0875 25.35 23.225 22.2937 23.3312 18.4937C24.4375 17.9688 25.2 16.8438 25.2 15.5375C25.2 13.7313 23.7375 12.2688 21.9312 12.2688C21.1812 12.2688 20.4937 12.5188 19.9375 12.9438C18.4375 12.0125 16.5438 11.4312 14.4688 11.3562V11.35C14.4688 9.9625 15.5 8.80625 16.8375 8.61875C17.0812 9.65 18.0063 10.4125 19.1063 10.4125L19.1187 10.4ZM9.6875 15.5063C10.6 15.5063 11.3 16.4688 11.25 17.6562C11.2 18.8438 10.5125 19.275 9.59375 19.275C8.675 19.275 7.875 18.7938 7.93125 17.6063C7.9875 16.4188 8.775 15.5125 9.6875 15.5125V15.5063ZM20.0875 17.6C20.1437 18.7875 19.3375 19.2687 18.425 19.2687C17.5125 19.2687 16.825 18.8375 16.7687 17.65C16.7125 16.4625 17.4125 15.5 18.3312 15.5C19.25 15.5 20.0375 16.4125 20.0875 17.5938V17.6ZM17.4562 20.7C16.8937 22.0438 15.5625 22.9937 14.0125 22.9937C12.4625 22.9937 11.1313 22.05 10.5688 20.7C10.5 20.5375 10.6125 20.3625 10.7812 20.3438C11.7875 20.2437 12.875 20.1875 14.0125 20.1875C15.15 20.1875 16.2375 20.2437 17.2437 20.3438C17.4125 20.3625 17.525 20.5375 17.4562 20.7Z" fill="currentColor"></path></svg></a></li></ul></nav> </section> `;
});
const Technologies = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $textContent, $$unsubscribe_textContent;
  let $languageSelected, $$unsubscribe_languageSelected;
  $$unsubscribe_textContent = subscribe(textContent, (value) => $textContent = value);
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  $$unsubscribe_textContent();
  $$unsubscribe_languageSelected();
  return ` <section id="techs" class="col-span-1 max-[956px]:col-span-2 gradient-white py-12 h-full px-4 xs:px-6 sm:px-8 rounded-2xl shadow-xl shadow-stone-900 bg-test"><h2 class="font-title font-bold text-2xl xs:text-3xl text-c-body-text mb-6 lowercase">3. ${escape($textContent.techs.title[$languageSelected] ?? "TECHNOLOGIES")}</h2> <p class="text-c-body-text">${escape($textContent.techs.subtitle[$languageSelected] ?? "")}</p> <div class="w-full grid techs-grid gap-4 mt-6"> ${each(techIcons, (item) => {
    return `${validate_component(Root$1, "Tooltip.Root").$$render($$result, { openDelay: 250 }, {}, {
      default: () => {
        return `${validate_component(Trigger$1, "Tooltip.Trigger").$$render(
          $$result,
          {
            class: "backdrop-blur-[1.5px] bg-black text-c-body-text bg-opacity-[0.05] backdrop-brightness-150 shadow-md hover:shadow-sm  hover:shadow-white rounded-xl overflow-hidden p-1 hover:bg-opacity-0 focus:bg-opacity-0 focus:outline-none duration-500 ease-in-out "
          },
          {},
          {
            default: () => {
              return `<img${add_attribute("src", item.url, 0)}${add_attribute("alt", `${item.title} icon`, 0)} class="rounded-xl p-1"> `;
            }
          }
        )} ${validate_component(Tooltip_content, "Tooltip.Content").$$render($$result, { sideOffset: 12 }, {}, {
          default: () => {
            return `<p class="font-semibold">${escape(item.title)}</p> `;
          }
        })} `;
      }
    })}`;
  })}</div></section>`;
});
const Aspect_ratio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ratio"]);
  let { ratio = 4 / 3 } = $$props;
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
    $$bindings.ratio(ratio);
  return `${validate_component(Aspect_ratio$1, "AspectRatioPrimitive.Root").$$render($$result, Object.assign({}, { ratio }, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Projects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $languageSelected, $$unsubscribe_languageSelected;
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  let { projects } = $$props;
  let api;
  let current = 0;
  if ($$props.projects === void 0 && $$bindings.projects && projects !== void 0)
    $$bindings.projects(projects);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (api) {
        api.scrollSnapList().length;
        current = api.selectedScrollSnap() + 1;
        api.on("select", () => {
          current = api.selectedScrollSnap() + 1;
        });
      }
    }
    $$rendered = ` <section id="projects" class="gradient-blue-ish border-2 border-white/70 py-12 pb-10 xs:px-6 sm:px-8 rounded-2xl shadow-xl shadow-stone-900"><h2 class="font-title font-bold text-2xl xs:text-3xl text-c-body-text-light mb-6 max-xs:px-4 lowercase">4. ${escape($languageSelected == "en" ? "PROJECTS" : "Projetos")}</h2> ${validate_component(Carousel, "Carousel.Root").$$render(
      $$result,
      {
        opts: {
          skipSnaps: true,
          loop: true,
          breakpoints: {}
        },
        plugins: [],
        // Autoplay({
        class: "w-full rounded-xl overflow-hidden bg-opacity-0 bg-black",
        api
      },
      {
        api: ($$value) => {
          api = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, {}, {}, {
            default: () => {
              return `${projects ? `${each(projects, (project) => {
                return `${validate_component(Carousel_item, "Carousel.Item").$$render(
                  $$result,
                  {
                    class: "basis-[92%] lg:basis-1/2 flex flex-col gap-5"
                  },
                  {},
                  {
                    default: () => {
                      return `${validate_component(Aspect_ratio, "AspectRatio").$$render(
                        $$result,
                        {
                          ratio: 16 / 9,
                          class: "z-10 bg-gray-300 shadow-xl bg-opacity-0 relative rounded-xl overflow-hidden"
                        },
                        {},
                        {
                          default: () => {
                            return `<img${add_attribute("src", `${project.images[0]}`, 0)}${add_attribute("alt", `${project.title[$languageSelected]} project screenshot`, 0)} class="rounded-xl object-cover h-full w-full"> `;
                          }
                        }
                      )} <div class="flex flex-wrap justify-between gap-y-6 p-4 rounded-xl gradient-form border-[1px] border-gray-400"><hgroup class=""><h3 class="font-title text-c-body-text-light font-bold text-xl xs:text-2xl">${escape(project.title.pt)}</h3> <p class="text-black text-xs font-semibold" data-svelte-h="svelte-15919zt">website</p></hgroup> <div class="flex gap-2 md:gap-4"><a${add_attribute("href", project.liveUrl, 0)} target="_blank" class="flex w-8 h-8 sm:w-12 sm:h-12 justify-center items-center bg-white shadow-lg p-1 sm:p-3 rounded-[5px]"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"></path></svg></a> ${project.codeUrl != "private" ? `<a${add_attribute("href", project.codeUrl, 0)} target="_blank" class="flex w-8 h-8 sm:w-12 sm:h-12 justify-center items-center bg-black shadow-lg p-1 sm:p-3 rounded-[5px]"><svg xmlns="http://www.w3.org/2000/svg" width="22.5" height="18" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" fill="#f7f7f7"></path></svg> </a>` : ``}</div> <a${add_attribute("href", `/projects/${project.slug}`, 0)} class="block w-full">${validate_component(Button, "Button").$$render(
                        $$result,
                        {
                          class: "bg-black flex-1 w-full min-w-full block text-white font-title font-semibold text-xl rounded-[5px] shadow-[#00000066] active:bg-black hover:bg-black hover:brightness-90 active:scale-95 transition-all "
                        },
                        {},
                        {
                          default: () => {
                            return `Discover More`;
                          }
                        }
                      )} </a></div> `;
                    }
                  }
                )}`;
              })}` : ``}`;
            }
          })} <footer class="p-2 mt-6 flex items-center justify-center gap-4 max-xs:px-4">${validate_component(Carousel_previous, "Carousel.Previous").$$render($$result, { style: "all: unset;" }, {}, {
            default: () => {
              return `<button class="text-gray-50 active:scale-90 transition-all ease-in-out duration-150 flex" data-svelte-h="svelte-1pi0azz"><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"></path></svg></button>`;
            }
          })} <div class="flex gap-4 items-center justify-center">${each(projects, (project) => {
            return `<button class="${"w-4 h-4 border-2 border-green-50 transition-all duration-300 rounded-full " + escape(
              current == project.id + 1 ? " relative rotate-45 bg-gray-50" : "",
              true
            )}"></button>`;
          })}</div>  ${validate_component(Carousel_next, "Carousel.Next").$$render($$result, { style: "all: unset;" }, {}, {
            default: () => {
              return `<button class="text-gray-50 active:scale-90 transition-all ease-in-out duration-150" data-svelte-h="svelte-aas79w"><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg></button>`;
            }
          })}</footer>`;
        }
      }
    )}</section>`;
  } while (!$$settled);
  $$unsubscribe_languageSelected();
  return $$rendered;
});
const css$2 = {
  code: "@property --testimonial-bg-c1{syntax:'<color>';initial-value:#f7f7f75d;inherits:false}@property --testimonial-bg-c2{syntax:'<color>';initial-value:#f7f7f717;inherits:false}.caroucel-testimonial-item.svelte-ofsdu3{background:linear-gradient(135deg, var(--testimonial-bg-c1), var(--testimonial-bg-c2));transition:--testimonial-bg-c1 500ms,\n			--testimonial-bg-c2 500ms}.caroucel-testimonial-item.svelte-ofsdu3:hover{--testimonial-bg-c1:#f7f7f744;--testimonial-bg-c2:#e8aeb72c}",
  map: null
};
const Testimonials = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $textContent, $$unsubscribe_textContent;
  let $languageSelected, $$unsubscribe_languageSelected;
  $$unsubscribe_textContent = subscribe(textContent, (value) => $textContent = value);
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  let api;
  let current = 0;
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (api) {
        api.scrollSnapList().length;
        current = api.selectedScrollSnap() + 1;
        api.on("select", () => {
          current = api.selectedScrollSnap() + 1;
        });
      }
    }
    $$rendered = ` <section id="testimonials" class="relative bg-black py-12 xs:px-6 sm:px-8 rounded-2xl z-0 shadow-xl shadow-stone-900"> <hgroup class="mb-8 sm:mb-16 max-xs:px-4"><h2 class="font-title font-bold text-2xl xs:text-3xl text-c-body-text-light mb-6 lowercase">5. ${escape($textContent.testimonials.title[$languageSelected] ?? "TESTIMONIALS")}</h2> ${$textContent ? `<p class="xs:text-lg text-c-body-text-light/85 max-w-2xl">${escape($textContent.testimonials.subtitle[$languageSelected])}</p>` : ``}</hgroup> <div class="flex gap-16 relative z-10 w-full">${validate_component(Carousel, "Carousel.Root").$$render(
      $$result,
      {
        opts: { skipSnaps: true, loop: true },
        plugins: [],
        // Autoplay({
        class: "w-full rounded-xl overflow-hidden",
        api
      },
      {
        api: ($$value) => {
          api = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, {}, {}, {
            default: () => {
              return `${each(Array(4), (_, i) => {
                return `${validate_component(Carousel_item, "Carousel.Item").$$render(
                  $$result,
                  {
                    class: "basis-[92%] xs:mx-4 sm:basis-[60%] min-[960px]:basis-1/3 relative z-10"
                  },
                  {},
                  {
                    default: () => {
                      return `<div class="py-6 px-7 rounded-[10px] backdrop-blur-md text-c-body-text-light/85 caroucel-testimonial-item svelte-ofsdu3" data-svelte-h="svelte-ddsf8s"><svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7.5C0 3.35625 3.35625 0 7.5 0H8C9.10625 0 10 0.89375 10 2C10 3.10625 9.10625 4 8 4H7.5C5.56875 4 4 5.56875 4 7.5V8H8C10.2063 8 12 9.79375 12 12V16C12 18.2062 10.2063 20 8 20H4C1.79375 20 0 18.2062 0 16V14V12V7.5ZM16 7.5C16 3.35625 19.3563 0 23.5 0H24C25.1063 0 26 0.89375 26 2C26 3.10625 25.1063 4 24 4H23.5C21.5688 4 20 5.56875 20 7.5V8H24C26.2062 8 28 9.79375 28 12V16C28 18.2062 26.2062 20 24 20H20C17.7938 20 16 18.2062 16 16V14V12V7.5Z" fill="#ffff"></path></svg> <p class="mt-3">Estou completamente impressionado com a expertise e dedicação desta empresa. Seu
								comprometimento em superar expectativas é evidente em cada interação. Recomendo sem
								hesitar.
							</p></div> <div class="flex items-center gap-4 py-3.5 px-7 bg-[#EFEFEF] rounded-[10px] mt-4 shadow-claymorphism" data-svelte-h="svelte-1pgdb07"><img src="" alt="" height="36" width="36" class="rounded-full"> <hgroup><h2 class="text-c-darker-background font-title font-bold text-lg">Default Name</h2> <h3 class="text-xs text-black/70 font-title font-bold">Student of GFY</h3> </hgroup></div> `;
                    }
                  }
                )}`;
              })}`;
            }
          })} <footer class="p-2 mt-6 flex items-center justify-center gap-4 max-xs:px-4">${validate_component(Carousel_previous, "Carousel.Previous").$$render($$result, { style: "all: unset;" }, {}, {
            default: () => {
              return `<button class="text-white active:scale-90 transition-all ease-in-out duration-150 flex" data-svelte-h="svelte-bici3d"><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"></path></svg></button>`;
            }
          })} ${each(Array(4), (_, i) => {
            return `<button class="${"w-4 h-4 rounded-full border-2 border-green-50 transition-all duration-300 " + escape(current == i + 1 ? "bg-white" : "", true)}"></button>`;
          })}  ${validate_component(Carousel_next, "Carousel.Next").$$render($$result, { style: "all: unset;" }, {}, {
            default: () => {
              return `<button class="text-white active:scale-90 transition-all ease-in-out duration-150" data-svelte-h="svelte-1p648da"><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"></path></svg></button>`;
            }
          })}</footer>`;
        }
      }
    )}</div> <img src="Torus.png" alt="" class="absolute top-1/2 -translate-y-1/2 right-20 z-0 hidden md:block" draggable="false"> </section>`;
  } while (!$$settled);
  $$unsubscribe_textContent();
  $$unsubscribe_languageSelected();
  return $$rendered;
});
const colorExplosion = "/_app/immutable/assets/colorExplosion.tntvlgM7.png";
const css$1 = {
  code: "form.svelte-1wjhq8n .svelte-1wjhq8n::-webkit-scrollbar-track{background-color:#f9f9f9 !important}",
  map: null
};
const Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $textContent, $$unsubscribe_textContent;
  let $languageSelected, $$unsubscribe_languageSelected;
  $$unsubscribe_textContent = subscribe(textContent, (value) => $textContent = value);
  $$unsubscribe_languageSelected = subscribe(languageSelected, (value) => $languageSelected = value);
  $$result.css.add(css$1);
  $$unsubscribe_textContent();
  $$unsubscribe_languageSelected();
  return `${validate_component(Saos, "Saos").$$render($$result, {}, {}, {
    default: () => {
      return ` <section id="contact" class="col-span-2 bg-black rounded-2xl py-12 px-4 xs:px-6 sm:px-8 gradient-dark-one overflow-x-hidden overflow-y-hidden"><h2 class="font-title font-bold text-2xl xs:text-3xl text-c-body-text-light mb-6 lowercase">5. ${escape($textContent.contact.title[$languageSelected] ?? "CONTACT")}</h2> <div class="relative max-w-4xl mx-auto mt-8 md:mt-24 flex max-md:flex-col-reverse gap-8"><div class="md:hidden relative z-10 bg-white gradient-white rounded-xl p-6"><h2 class="text-black text-lg xs:text-xl font-title font-bold text-center" data-svelte-h="svelte-mo967x">Social Media</h2> <nav class="max-w-lg mx-auto text-black"><ul class="flex gap-x-4 justify-center mt-5 mb-2"><li class="hover:text-black hover:scale-110 transition-all"><a href=".">${validate_component(GithubIcon, "GithubIcon").$$render($$result, {}, {}, {})}</a></li> <li class="hover:text-black hover:scale-110 transition-all"><a href=".">${validate_component(LinkedinIcon, "LinkedinIcon").$$render($$result, {}, {}, {})}</a></li> <li class="hover:text-black hover:scale-110 transition-all"><a href=".">${validate_component(TelegramIcon, "TelegramIcon").$$render($$result, {}, {}, {})}</a></li> <li class="hover:text-black hover:scale-110 transition-all"><a href=".">${validate_component(RedditIcon, "RedditIcon").$$render($$result, {}, {}, {})}</a></li></ul></nav></div> <form method="POST" action="?/submitForm" class="relative z-10 flex flex-col gap-y-6 py-6 px-4 xs:px-6 bg-gray-300 bg-opacity-0 rounded-xl flex-[7] gradient-form backdrop-blur-3xl svelte-1wjhq8n">${$textContent ? `<label class="text-c-body-text-light font-semibold svelte-1wjhq8n"><h3 class="text-lg svelte-1wjhq8n">${escape($textContent.contact.form.name.title[$languageSelected])}</h3> <input required name="name" type="text"${add_attribute("placeholder", $textContent.contact.form.name.placeholder[$languageSelected], 0)} class="input-form svelte-1wjhq8n"></label> <label class="text-c-body-text-light font-semibold svelte-1wjhq8n"><h3 class="text-lg svelte-1wjhq8n">${escape($textContent.contact.form.email.title[$languageSelected])}</h3> <input required name="email" type="email"${add_attribute("placeholder", $textContent.contact.form.email.placeholder[$languageSelected], 0)} class="input-form svelte-1wjhq8n"></label> <label class="text-c-body-text-light font-semibold h-full svelte-1wjhq8n"><h3 class="text-lg svelte-1wjhq8n">${escape($textContent.contact.form.message.title[$languageSelected])}</h3> <textarea required name="message"${add_attribute("placeholder", $textContent.contact.form.message.placeholder[$languageSelected], 0)} rows="6" class="input-form resize-none svelte-1wjhq8n"></textarea></label> ${validate_component(Button, "Button").$$render(
        $$result,
        {
          type: "submit",
          class: "bg-black flex-1 w-full min-w-full block text-white font-title font-bold text-lg xs:text-xl rounded-[5px]  shadow-[#000000bb] active:bg-c-tertiary hover:bg-c-tertiary hover:brightness-90 active:scale-90 transition-all "
        },
        {},
        {
          default: () => {
            return `${escape($textContent.contact.form.submitButton[$languageSelected])}`;
          }
        }
      )}` : ``}</form>  <img${add_attribute("src", colorExplosion, 0)} alt="" class="absolute z-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 scale-[1.2]">   <div class="relative z-10 flex flex-col gap-y-7 flex-[5]"><div class="bg-white gradient-white rounded-xl p-6 mt-auto relative transition-all perspective-400 ease-[cubic-bezier(0.645,0.045,0.355,1.000)] duration-2000"><h2 class="text-black text-lg xs:text-xl font-title font-bold text-center mb-5">${escape($textContent.contact.description[$languageSelected])}</h2> <svg class="mx-auto mb-2" width="100" height="93" viewBox="0 0 100 93" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50.5312 53.3695L35.4062 61.8955C32.8906 63.3092 32.4062 65.854 34.3125 67.6701C36.3281 69.6058 40.25 69.9865 42.9531 68.5183L58.4688 60.1228C59.5625 59.5356 61.125 59.6661 61.9844 60.4273C62.8438 61.1886 62.6406 62.2761 61.5469 62.8742L58.2812 64.636L85.9688 82.384H92.5C96.6406 82.384 100 80.0458 100 77.164V63.244C100 60.3621 96.6406 58.024 92.5 58.024H80.625H80H79.8906L79.2812 57.7521L67.9375 52.6952C65.5469 51.6295 62.75 51.064 59.9062 51.064C56.5 51.064 53.1875 51.8796 50.5312 53.3695ZM54.0938 66.898L46.0156 71.2697C41.0938 73.945 33.9531 73.249 30.2656 69.7255C26.7969 66.4086 27.6719 61.7758 32.25 59.1985L45.25 51.8796C43.4375 51.3467 41.4844 51.0748 39.5 51.0748C36.5625 51.064 33.7031 51.673 31.25 52.804L20 58.024H7.5C3.35938 58.024 0 60.3621 0 63.244V77.164C0 80.0458 3.35938 82.384 7.5 82.384H24.4062L38.6875 91.4537C41.75 93.4003 46.4844 93.2481 49.2812 91.1166C50.1406 90.4532 50.7188 89.6811 51.0156 88.8763L53.6719 90.5728C56.7188 92.5195 61.4688 92.3781 64.2656 90.2575C64.9688 89.7246 65.4844 89.1047 65.8125 88.4631C68.8438 89.8768 72.9688 89.5832 75.5156 87.6475C78.3125 85.5268 78.1094 82.2208 75.0625 80.2742L54.0938 66.898Z" fill="#111"></path><path d="M28.6875 6.25C26.0996 6.25 24 8.34961 24 10.9375C24 12.4121 24.6934 13.7988 25.875 14.6875L47.125 30.625C48.2383 31.4551 49.7617 31.4551 50.875 30.625L72.125 14.6875C73.3066 13.7988 74 12.4121 74 10.9375C74 8.34961 71.9004 6.25 69.3125 6.25H28.6875ZM24 17.1875V37.5C24 40.9473 26.8027 43.75 30.25 43.75H67.75C71.1973 43.75 74 40.9473 74 37.5V17.1875L52.75 33.125C50.5234 34.7949 47.4766 34.7949 45.25 33.125L24 17.1875Z" fill="#111"></path></svg></div> <div class="max-md:hidden bg-white gradient-white rounded-xl p-6"><h2 class="text-black text-lg xs:text-xl font-title font-bold text-center">${escape($languageSelected == "en" ? "Social Media" : "Mídias sociais")}</h2> <nav class="max-w-lg mx-auto text-gray-200"><ul class="flex gap-x-4 justify-center mt-5 mb-2"><li class="hover:text-black text-stone-600 transition-all duration-200 ease-in"><a href="https://github.com/muriWolf" target="_blank" rel="author">${validate_component(GithubIcon, "GithubIcon").$$render($$result, {}, {}, {})}</a></li> <li class="hover:text-black text-stone-600 transition-all duration-200 ease-in"><a href="https://www.linkedin.com/in/murillo-pinheiro-de-oliveira-2b931724a/" target="_blank" rel="author">${validate_component(LinkedinIcon, "LinkedinIcon").$$render($$result, {}, {}, {})}</a></li> <li class="hover:text-black text-stone-600 transition-all duration-200 ease-in"><a href="https://web.telegram.org/k/#@MuriWolf" target="_blank" rel="author">${validate_component(TelegramIcon, "TelegramIcon").$$render($$result, {}, {}, {})}</a></li> <li class="hover:text-black text-stone-600 transition-all duration-200 ease-in"><a href="https://www.reddit.com/user/MuriWolf/" target="_blank" rel="author">${validate_component(RedditIcon, "RedditIcon").$$render($$result, {}, {}, {})}</a></li></ul></nav></div></div></div></section>`;
    }
  })}`;
});
const css = {
  code: "#container.svelte-1w5tmhx{scroll-snap-type:both mandatory}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_projectName;
  let $openAsideMobile, $$unsubscribe_openAsideMobile;
  $$unsubscribe_projectName = subscribe(projectName, (value) => value);
  $$unsubscribe_openAsideMobile = subscribe(openAsideMobile, (value) => $openAsideMobile = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_projectName();
  $$unsubscribe_openAsideMobile();
  return `${$openAsideMobile ? `${validate_component(HeaderMobile, "HeaderMobile").$$render($$result, {}, {}, {})}` : ``} <main class="max-w-[1340px] w-full mx-auto my-2 sm:my-8"><div id="container" class="flex flex-col gap-x-2 gap-y-2 sm:gap-x-8 sm:gap-y-8 mx-2 sm:mx-8 svelte-1w5tmhx" style="-webkit-perspective: 1000;">${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})} <div class="flex max-[956px]:flex-col gap-x-2 gap-y-2 sm:gap-x-8 sm:gap-y-8"><div class="flex-1">${validate_component(About, "About").$$render($$result, {}, {}, {})}</div> <div class="flex-1">${validate_component(Technologies, "Technologies").$$render($$result, {}, {}, {})}</div></div> ${validate_component(Projects, "Projects").$$render($$result, { projects: data.projects ?? {} }, {}, {})} ${validate_component(Testimonials, "Testimonials").$$render($$result, {}, {}, {})} ${validate_component(Contact, "Contact").$$render($$result, {}, {}, {})}</div></main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
