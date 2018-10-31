//import { HXPositionedElement } from './HXPositionedElement';
import { HXElement } from './HXElement';

import { makePositionable } from '../mixins/Positionable';
import { KEYS } from '../utils';

import shadowMarkup from './HXTooltipElement.html';
import shadowStyles from './HXTooltipElement.less';

const DELAY = 500;

/*
 * ADDED:
 *  - Refactored to use new shared HXPositionedElement behavior
 *
 * BREAKING:
 *  - remove click-to-open behavior
 *  - remove `.triggerEvent` prop and `[trigger-event]` attr
 *  - [role="tooltip"] ALWAYS!
 */

/**
 * Defines behavior for the `<hx-tooltip>` element.
 *
 * @extends HXElement
 * @mixes module:mixins/Positionable~Positionable
 * @hideconstructor
 * @since 0.2.0
 */
export class HXTooltipElement extends makePositionable(HXElement) {
    static get is () {
        return 'hx-tooltip';
    }

    static get template () {
        return `<style>${shadowStyles}</style>${shadowMarkup}`;
    }

    $onCreate () { // OK
        super.$onCreate();
        this._onCtrlBlur = this._onCtrlBlur.bind(this);
        this._onCtrlFocus = this._onCtrlFocus.bind(this);
        this._onCtrlMouseLeave = this._onCtrlMouseLeave.bind(this);
        this._onCtrlMouseEnter = this._onCtrlMouseEnter.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        this.id = this.id || `tip-${this.$generateId()}`; // TODO: What if id is blank ('' or ' ')?

        // configure instance
        this.DEFAULT_POSITION = 'top';
        this._hasArrow = true;
        this.setAttribute('role', 'tooltip');
    }

    $onConnect () {
        super.$onConnect();
        this.$upgradeProperty('for');
    }

    $onDisconnect () { // OK
        this._detachListeners();
    }

    static get $observedAttributes () {
        return super.$observedAttributes.concat([ 'for' ]);
    }
    $onAttributeChange (attr, oldVal, newVal) {
        super.$onAttributeChange(attr, oldVal, newVal);

        switch (attr) {
            case 'for':
                this._attrForChange(oldVal, newVal);
                break;
        }
    }

    $afterReposition (data) {
        this._elRoot.setAttribute('position', data.position);
    }

    /**
     * External element that controls tooltip visibility.
     *
     * @readonly
     * @returns {HTMLElement|Null}
     */
    get controlElement () { // TODO: is memoization necessary?
        if (this._controlElement) {
            return this._controlElement;
        }

        return this.getRootNode().getElementById(this.for);
    }

    /**
     * ID of alternate control element
     *
     * @type {String}
     */
    get for () {
        return this.getAttribute('for');
    }
    set for (value) {
        this.setAttribute('for', value);
    }

    /** @private */
    get _elRoot () {
        return this.shadowRoot.getElementById('hxTooltip');
    }

    /** @private */
    _attachListeners () {
        let ctrl = this._controlElement;

        if (!ctrl) {
            return;
        }

        this._enableFocusEvents(ctrl);
        this._enableMouseEvents(ctrl);

        //ctrl.addEventListener('focus', this._onCtrlFocus);
        //ctrl.addEventListener('mouseenter', this._onCtrlMouseEnter);
    }

    /** @private */
    _attrForChange () {
        // detach listeners from old control element
        this._detachListeners();

        // re-memoize control element
        delete this._controlElement;
        this._controlElement = this.controlElement;

        this._makeControlAccessible();

        // attach listeners to new control element
        this._attachListeners();
    }

    /**
     * Returns true if a control element is present and active/focused.
     * @private
     * @returns {Boolean}
     */
    get _ctrlHasFocus () {
        let ctrl = this._controlElement;

        if (!ctrl) {
            return false;
        }

        let res = (this.getRootNode().activeElement === ctrl);
        //console.log(`control ${res ? 'is' : 'is NOT'} focused`);
        return res;
    }

    /** @private */
    _detachListeners () {
        let ctrl = this._controlElement;

        if (!ctrl) {
            return;
        }

        ctrl.removeEventListener('blur', this._onCtrlBlur);
        ctrl.removeEventListener('focus', this._onCtrlFocus);
        ctrl.removeEventListener('keyup', this._onKeyUp);
        ctrl.removeEventListener('mouseenter', this._onCtrlMouseEnter);
        ctrl.removeEventListener('mouseleave', this._onCtrlMouseLeave);
    }

    /** @private */
    _disableFocusEvents (target) {
        //console.log('disable focus events');
        target.removeEventListener('blur', this._onCtrlBlur);
        target.removeEventListener('focus', this._onCtrlFocus);
    }

    /** @private */
    _disableMouseEvents (target) {
        //console.log('disable mouse events');
        target.removeEventListener('mouseenter', this._onCtrlMouseEnter);
        target.removeEventListener('mouseleave', this._onCtrlMouseLeave);
    }

    /** @private */
    _enableFocusEvents (target) {
        //console.log('enable focus events');
        target.addEventListener('focus', this._onCtrlFocus);
    }

    /** @private */
    _enableMouseEvents (target) {
        //console.log('enable mouse events');
        target.addEventListener('mouseenter', this._onCtrlMouseEnter);
    }

    /** @private */
    _hide () {
        //console.log('_hide');
        // cancel SHOW
        clearTimeout(this._showTimeout);

        if (this.open && !this._ctrlHasFocus) {
            // clear old timeout (if it exists)
            clearTimeout(this._hideTimeout);

            // schedule HIDE
            this._hideTimeout = setTimeout(() => {
                this.open = false;
            }, DELAY);
        }
    }

    /** @private */
    _makeControlAccessible () {
        let ctrl = this._controlElement;

        if (!ctrl) {
            return;
        }

        ctrl.setAttribute('aria-describedby', this.id);

        if (ctrl.tabIndex !== 0) {
            ctrl.tabIndex = 0;
        }
    }

    /** @private */
    _onCtrlBlur (event) {
        //console.log('_onCtrlBlur');
        event.target.removeEventListener('blur', this._onCtrlBlur);
        event.target.addEventListener('focus', this._onCtrlFocus);
        this._hide();
        this._enableMouseEvents(event.target);
    }

    /** @private */
    _onCtrlFocus (event) {
        //console.log('_onCtrlFocus');
        event.target.removeEventListener('focus', this._onCtrlFocus);
        event.target.addEventListener('blur', this._onCtrlBlur);
        document.addEventListener('keyup', this._onKeyUp);
        this._disableMouseEvents(event.target);
        this._show();
    }

    /** @private */
    _onCtrlMouseEnter (event) {
        //console.log('_onCtrlMouseEnter', event);
        if (!this._ctrlHasFocus) {
            event.target.removeEventListener('mouseenter', this._onCtrlMouseEnter);
            event.target.addEventListener('mouseleave', this._onCtrlMouseLeave);
            this._disableFocusEvents(event.target);
            this._show();
        }
    }

    /** @private */
    _onCtrlMouseLeave (event) {
        //console.log('_onCtrlMouseLeave');
        event.target.removeEventListener('mouseleave', this._onCtrlMouseLeave);
        event.target.addEventListener('mouseenter', this._onCtrlMouseEnter);
        this._hide();
        this._enableFocusEvents(event.target);
    }

    /** @private */
    _onKeyUp (event) {
        //console.log('_onKeyUp');
        if (event.keyCode === KEYS.Escape) {
            this._enableFocusEvents(this._controlElement);
            this.open = false;
            // remove itself on success
            document.removeEventListener('keyup', this._onKeyUp);
        }
    }

    /** @private */
    _show () {
        //console.log('_show');
        // cancel HIDE
        clearTimeout(this._hideTimeout);

        if (!this.open) {
            // clear old timeout (if it exists)
            clearTimeout(this._showTimeout);

            // schedule SHOW
            this._showTimeout = setTimeout(() => {
                this.open = true;
            }, DELAY);
        }
    }
}
