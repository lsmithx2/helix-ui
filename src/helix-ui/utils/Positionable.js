import debounce from 'lodash/debounce';

import { getPosition, getPositionWithArrow } from './position';
import { offsetFunctionMap } from './offset';

/*
 * * top-start              -> ( v: top,    h: start }
 * * top-left               -> { v: top,    h: left }
 * * top / top-center       -> { v: top,    h: center }
 * * top-right              -> { v: top,    h: right }
 * * top-end                -> { v: top,    h: end }
 *
 * * bottom-start           -> ( v: bottom, h: start }
 * * bottom-left            -> { v: bottom, h: left }
 * * bottom / bottom-center -> { v: bottom, h: center }
 * * bottom-right           -> { v: bottom, h: right }
 * * bottom-end             -> { v: bottom, h: end }
 *
 * * left-start             -> { v: start,  h: left }
 * * left-top               -> { v: top,    h: left }
 * * left / left-middle     -> { v: middle, h: left }
 * * left-bottom            -> { v: bottom, h: left }
 * * left-end               -> { v: end,    h: left }
 *
 * * right-start            -> { v: start,  h: right }
 * * right-top              -> { v: top,    h: right }
 * * right / right-middle   -> { v: middle, h: right }
 * * right-bottom           -> { v: bottom, h: right }
 * * right-end              -> { v: end,    h: right }
 *
 * * center / center-middle -> { v: middle, h: center }
 */

/*
 * OPPOSITES
 * vertical:
 *  - top => bottom
 *  - bottom => top
 *  - start => end
 *  - end => start
 *  - middle => middle (no change)
 *
 * horizontal:
 *  - left => right
 *  - right => left
 *  - start => end
 *  - end => start
 *  - center => center (no change)
 */

// TODO: TEST!
function parsePosition (value) {
    let vAlign = 'middle';
    let hAlign = 'center';

    // PRIMARILY VERTICAL
    // TODO: DRY up regex (if possible)
    if (/^(top|bottom)|(top|bottom)$/.match(value)) {
        // vertical alignment
        // TODO: vAlign = matched group
        if (/^top|top$/.match(value)) {
            vAlign = 'top';
        }
        if (/(^bottom|bottom$)/.match(value)) {
            vAlign = 'bottom';
        }

        // horizontal alignment
        // TODO: hAlign = matched group
        if (/start$/.match(value)) {
            hAlign = "start"
        }
        if (/end$/.match(value)) {
            hAlign = "end"
        }
    }

    // PRIMARILY HORIZONTAL
    if (/^(left|right)|(left|right)$/.match(value)) {
        // horizontal alignment
        // TODO: hAlign = matched group
        if (/^left|left$/.match(value)) {
            hAlign = 'left';
        }
        if (/^left|left$/.match(value)) {
            hAlign = 'left';
        }

        // vertical alignment
        // TODO: vAlign = matched group
        if (/start$/.match(value)) {
            vAlign = "start"
        }
        if (/end$/.match(value)) {
            vAlign = "end"
        }
    }

    return {
        vAlign,
        hAlign,
    };
}

/**
 * PROPS
 *  - position {PositionString} = desired position (may not be displayed position)
 *  - relativeTo {HTMLElement} = which element to position against
 *
 *  - controlElement {HTMLElement} - element that triggers display of the positioned element
 *    (can be overridden)
 *
 *  _position -> currentPosition
 */

/**
 * Fires when the element is concealed.
 *
 * @event Positionable:close
 * @since 0.15.0
 * @type {CustomEvent}
 */

/**
 * Fires when the element is revealed.
 *
 * @event Positionable:open
 * @since 0.15.0
 * @type {CustomEvent}
 */

/*
 * @mixin
 * @name Positionable
 * @description
 * Defines behavior needed to calculate absolute coordinates
 * and apply them to an instance.
 *
 * @param {Object} superclass
 * @since 0.15.0
 */

/**
 * Positionable builder mixin
 * @mixin
 * @name makePositionable
 * @function
 * @param {Object} superclass
 */
export default function makePositionable (superclass) {
    /**
     * @class
     * @emits Positionable:close
     * @emits Positionable:open
     */
    class Positionable extends superclass {
        /**
         * Called after element is repositioned
         *
         * @abstract
         * @param {Position} - calculated position data (x, y, position)
         */
        $afterReposition (data) {} // eslint-disable-line no-unused-vars

        /**
         * Called when the positioned element is closed
         * @abstract
         * @ignore
         */
        $onClose () {}

        /**
         * Called when the positioned element is opened
         * @abstract
         * @ignore
         */
        $onOpen () {}

        $onCreate () {
            this.reposition = this.reposition.bind(this);
            this._$onDocumentClick = this._$onDocumentClick.bind(this);
            this._$onDocumentScroll = this._$onDocumentScroll.bind(this);
            this._$onWindowResize = debounce(this.reposition, 100);

            this.DEFAULT_POSITION = 'bottom';
        }

        $onConnect () {
            this.$upgradeProperty('open');
            this.$upgradeProperty('position');
            this.$upgradeProperty('relativeTo');

            this.$defaultAttribute('position', this.DEFAULT_POSITION);

            this.setAttribute('aria-hidden', !this.open);
        }

        $onDisconnect () {
            this._$removeOpenListeners();
        }

        static get $observedAttributes () {
            return [ 'open', 'position' ];
        }
        $onAttributeChange (attr, oldVal, newVal) {
            switch (attr) {
                case 'open':
                    this._$attrOpenChange(attr, oldVal, newVal);
                    break;

                case 'position':
                    this.currentPosition = newVal;
                    this.reposition();
                    break;
            }
        }

        /* ============================================================ *\
         * 1. [position] = desired position (doesn't mean it will always be in that position)
         * 2. .currentPosition = recalculated position based on viewport collisions and previous recalculations
        \* ============================================================ */
        // vertical positions
        // * left-start <-> left-end
        // * left-top <-> left-bottom
        // * right-start <-> right-end
        // * right-top <-> right-bottom
        // * top(-center) <-> bottom(-center)

        // horizontal positions
        // * left(-middle) <-> right(-middle)
        // * top-start <-> top-end
        // * bottom-start <-> bottom-end
        // * top-left <-> top-right
        // * bottom-left <-> bottom-right



        // no current collisions:
            // no previous collisions: nothing to do
            // previous collision present: reposition to previous position
        // collisions currently detected
            // if no previous collisions: reposition
            // if previous collision

        // collide with same side more than once: do not recalculate
        // no longer colliding with previously collided side: recalculate
        // no previous collisions: recalculate

        /**
         * External element that controls positioned element visibility.
         * This is commonly a `<button>` or `<hx-disclosure>`.
         *
         * @readonly
         * @type {HTMLElement}
         */
        get controlElement () {
            return this.getRootNode().querySelector(`[aria-controls="${this.id}"]`);
        }

        /**
         * Calculated position based on element locations
         * and viewport collisions.
         *
         * Returns either the calculated position (internally defined)
         * or the configured position (`position` attr/prop).
         *
         * This may not match the `position` property value.
         *
         * @readonly
         * @type {PositionString}
         */
        // NOTE: may not be useful to logic, but may be useful for introspection
        get currentPosition () {
            console.log('Positionable#currentPosition');
            return this._currentPosition || this.position;
        }
        set currentPosition (value) {
            // pares value into _vPosition and _hPosition


            this._currentPosition = value;
        }

        /**
         * Determines if the element is revealed.
         *
         * @default false
         * @type {Boolean}
         */
        get open () {
            return this.hasAttribute('open');
        }
        set open (value) {
            if (value) {
                this.setAttribute('open', '');
            } else {
                this.removeAttribute('open');
            }
        }

        /**
         * Where to position the element against its relativeElement.
         *
         * @type {PositionString}
         */
        get position () {
            return this.getAttribute('position') || this.DEFAULT_POSITION;
        }
        set position (value) {
            this.setAttribute('position', value);
        }

        /**
         * Reference element used to calculate popover position.
         *
         * @readonly
         * @type {HTMLElement}
         */
        get relativeElement () {
            if (this.relativeTo) {
                return this.getRootNode().getElementById(this.relativeTo);
            } else {
                return this.controlElement;
            }
        }

        /**
         * ID of an element to relatively position against.
         *
         * @type {String}
         */
        get relativeTo () {
            return this.getAttribute('relative-to');
        }
        set relativeTo (value) {
            this.setAttribute('relative-to', value);
        }

        /**
         * Calculate and apply new (x,y) coordinates.
         *
         * Requires the element to be open and have a valid `relativeElement` prop.
         */
        // TODO: is there a better name for this? (wait until position lib pulled in)
        reposition () {
            if (this.relativeElement) {
                let _getPosition = this._hasArrow ? getPositionWithArrow : getPosition;

                let data = _getPosition({
                    element: this,
                    reference: this.relativeElement,
                    position: this.position,
                });

                this.style.top = `${data.y}px`;
                this.style.left = `${data.x}px`;
                this.currentPosition = data.position;

                this.$afterReposition(data);
            }
        }

        /** @private */
        _$attrOpenChange (attr, oldVal, newVal) {
            let isOpen = (newVal !== null);
            this.setAttribute('aria-hidden', !isOpen);
            this.$emit(isOpen ? 'open' : 'close');

            if (isOpen) {
                this._$addOpenListeners();
                this.reposition();
                this.$onOpen();
            } else {
                this._$removeOpenListeners();
                this.$onClose();
            }
        }

        /** @private */
        _$addOpenListeners () {
            document.addEventListener('click', this._$onDocumentClick);
            document.addEventListener('scroll', this._$onDocumentScroll);
            window.addEventListener('resize', this._$onWindowResize);
        }

        /** @private */
        _$onDocumentClick (evt) {
            let inComponent = this.contains(evt.target);
            let inControl = this.controlElement.contains(evt.target);
            let _isBackground = (!inComponent && !inControl);

            if (this.open && _isBackground) {
                this.open = false;
            }
        }

        /** @private */
        _$onDocumentScroll () {
            this.reposition();
        }

        /** @private */
        _$removeOpenListeners () {
            document.removeEventListener('click', this._$onDocumentClick);
            document.removeEventListener('scroll', this._$onDocumentScroll);
            window.removeEventListener('resize', this._$onWindowResize);
        }
    };

    return Positionable;
}
