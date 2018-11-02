/**
 * @module HelixUI/Utils
 */
import Position from './position';

/**
 * Key/value map of key names and their keycode.
 *
 * - Alt / Option
 * - Backspace
 * - Ctrl / Control
 * - Del / Delete
 * - Down
 * - End
 * - Enter / Return
 * - Esc / Escape
 * - Home
 * - Ins / Insert
 * - Left
 * - PgDown / PageDown
 * - PgUp / PageUp
 * - Right
 * - Shift
 * - Space
 * - Tab
 * - Up
 * @enum {Integer}
 */
export const KEYS = {
    Alt: 18,
    Backspace: 8,
    Control: 17,
    Ctrl: 17,
    Del: 46,
    Delete: 46,
    Down: 40,
    End: 35,
    Enter: 13,
    Esc: 27,
    Escape: 27,
    Home: 36,
    Ins: 45,
    Insert: 45,
    Left: 37,
    Option: 18,
    PageDown: 34,
    PageUp: 33,
    PgDown: 34,
    PgUp: 33,
    Return: 13,
    Right: 39,
    Shift: 16,
    Space: 32,
    Tab: 9,
    Up: 38,
};

/**
 * Communicate scroll events from elements at arbitrary depths in the DOM tree
 * (because 'scroll' events do not bubble).
 *
 * The event is dispatched from the `document` object, instead of bubbling from
 * the original element, to avoid interfering with 'scroll' event listeners
 * attached to ancestor elements.
 *
 * We dispatch a CustomEvent so that we can communicate details about the
 * originating target via the `detail` property on the event.
 *
 * @param {Event} evt - "scroll" event object
 * @returns {Boolean}
 */
export function onScroll (evt) {
    let _evtScroll = new CustomEvent('scroll', {
        cancelable: true,
        bubbles: false,
        detail: {
            target: evt.target,
        },
    });

    return document.dispatchEvent(_evtScroll);
}//onScroll()

export default {
    KEYS,
    Position,
    onScroll,
};

export function mix (superclass) {
    class MixinBuilder {
        constructor (superclass) {
            this.superclass = superclass;
        }

        with (...mixins) {
            return mixins.reduce((c, mixin) => mixin(c), superclass);
        }
    }

    return new MixinBuilder();
}

