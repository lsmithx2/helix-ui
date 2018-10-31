/** @module */
import debounce from 'lodash/debounce';
// TODO: migrate utils/position/offset.js to utils/offset.js
import { offsetFunctionMap } from '../utils/position/offset'; 

/* NOTES:
 * -----------------------------------------------------------------
 * Position: (String)
 *  - configured (user-entered configuration, HTML Attr OR JS Prop)
 *  - current ( memoized on reposition() )
 * Alignment: (Object)
 *  - configured (memoized on [position] change)
 *  - current (live value based on current position)
 * Collisions: (Object)
 *  - previous (info to prevent repositioning in the same direction more than once)
 *  - current (need a prop?)
 *  - future/calculated at coords (need a prop?)
 * Offset Options: (Object}
 *  - memoize on reposition()?
 *
 * Q: where do we store alignment changes
 * TODO: alphabetize
 * TODO: rename stuff to __privateMixinMember format
 * TODO: __repositionTowardCenter() logic to avoid repositioning in the same direction more than once
 */

const DEFAULT_POSITION = 'bottom';
const DEFAULT_ALIGNMENT = {
    vAlign: 'bottom',
    hAlign: 'center',
    mainAxis: 'x',
};

// TODO: jsdoc
export function getAlignment (position) {
    let hAlign = 'center';
    let vAlign = 'middle';
    let mainAxis = 'x';

    // https://regex101.com/r/1oRJf8/1
    if (/^(top|bottom)/.test(position)) {
        mainAxis = 'y';
    }

    // https://regex101.com/r/1oRJf8/4
    let vMatch = position.match(/^(top|bottom)|(top|bottom)$/);
    if (vMatch) {
        vAlign = vMatch[0];
    }

    // https://regex101.com/r/1oRJf8/5
    let hMatch = position.match(/^(left|right)|(left|right)$/);
    if (hMatch) {
        hAlign = hMatch[0];
    }

    // https://regex101.com/r/1oRJf8/7
    let startEndMatch = position.match(/(start|end)$/);
    if (startEndMatch) {
        if (mainAxis === 'x') {
            vAlign = startEndMatch[0];
        } else {
            hAlign = startEndMatch[0];
        }
    }

    return {
        hAlign,
        mainAxis,
        vAlign,
    };
}

// TODO: jsdoc
export function getNormalizedPosition (position) {
    let { hAlign, vAlign, mainAxis } = getAlignment(position);

    if (mainAxis === 'x') {
        return `${hAlign}-${vAlign}`;
    } else {
        return `${vAlign}-${hAlign}`;
    }
}

/**
 * Fires when a positionable element is concealed.
 *
 * @event Positionable:close
 * @since 0.15.0
 * @type {CustomEvent}
 */

/**
 * Fires when a positionable element is revealed.
 *
 * @event Positionable:open
 * @since 0.15.0
 * @type {CustomEvent}
 */

/**
 * @typedef {String} AlignmentString
 * Valid values are: left, center, right, top, middle, bottom, start, and end.
 */

/**
 * @typedef {Object} PositionMetadata
 * @prop {AlignmentString} vAlign - vertical alignment
 * @prop {AlignmentString} hAlign - horizontal alignment
 * @prop {String} mainAxis - 'x' or 'y'
 */

// NEW CONST
const VALID_POSITIONS = [
    'bottom',
    'bottom-center',
    'bottom-end',
    'bottom-left',
    'bottom-right',
    'bottom-start',
    'center',
    'center-middle',
    'left',
    'left-bottom',
    'left-end',
    'left-middle',
    'left-start',
    'left-top',
    'middle-center',
    'right',
    'right-bottom',
    'right-end',
    'right-middle',
    'right-start',
    'right-top',
    'top',
    'top-center',
    'top-end',
    'top-left',
    'top-right',
    'top-start',
];

// NEW CONST
const OPPOSITE_ALIGNMENTS = {
    bottom: 'top',
    center: 'center',
    end: 'start',
    left: 'right',
    middle: 'middle',
    right: 'bottom',
    start: 'end',
    top: 'bottom',
};


function getVSwapped (position) {
  let { hAlign, vAlign, mainAxis } = getAlignment(position);
  let newVAlign = OPPOSITE_ALIGNMENTS[vAlign];
  return mainAxis === 'x' ? `${hAlign}-${newVAlign}` : `${newVAlign}-${hAlign}`;
}

function getHSwapped (position) {
  let { hAlign, vAlign, mainAxis } = getAlignment(position);
  let newHAlign = OPPOSITE_ALIGNMENTS[hAlign];
  return mainAxis === 'x' ? `${newHAlign}-${vAlign}` : `${vAlign}-${newHAlign}`;
}

function getSwapped (position) {
  return getHSwapped(getVSwapped(position));
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
 * @name makePositionable
 * @param {Object} superclass
 * @returns {PositionedElement}
 */
export function makePositionable (superclass) {
    /**
     * @class
     * @hideconstructor
     * @name Positionable
     * @emits Positionable:close
     * @emits Positionable:open
     */
    class _Positionable extends superclass {
        /* @lends module:mixins/Positionable~Positionable */

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
            this.__onDocumentClick = this.__onDocumentClick.bind(this);
            this.__onDocumentScroll = this.__onDocumentScroll.bind(this);
            this.__onWindowResize = debounce(this.reposition, 100);

            // TODO: is there a better way to set these?
            this.DEFAULT_POSITION = DEFAULT_POSITION;
            this.DEFAULT_ALIGNMENT = DEFAULT_ALIGNMENT;

            this.__resetAlignment();
        }

        $onConnect () {
            this.$upgradeProperty('open');
            this.$upgradeProperty('position');
            this.$upgradeProperty('relativeTo');

            this.$defaultAttribute('position', this.DEFAULT_POSITION);

            this.setAttribute('aria-hidden', !this.open);
        }

        $onDisconnect () {
            this.__removeOpenListeners();
        }

        static get $observedAttributes () {
            return [ 'open', 'position' ];
        }
        $onAttributeChange (attr, oldVal, newVal) {
            switch (attr) {
                case 'open':
                    this.__attrOpenChange(attr, oldVal, newVal);
                    break;

                case 'position':
                    this.__attrPositionChange(oldVal, newVal);
                    break;
            }
        }

        /**
         * Metadata parsed from position value.
         *
         * @type {PositionMetadata}
         */
        get alignment () {
            return this._alignment || this.DEFAULT_ALIGNMENT;
        }

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
            return this._position; // || this.getAttribute('position') || this.DEFAULT_POSITION;
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

        // TODO: rename to calculateCoords()
        calculatePosition () {
            const DEFAULT_CONFIG = {
                margin: 0,
                offset: 0,
                position: 'center',
            };

            // getPositionWithArrow()
            let _config = Object.assign({}, DEFAULT_CONFIG, config);
            if (this._hasArrow) {
                _config.offset = 20;
            }

            /*
             * Remove offset if position is "top", "bottom", "left", or "right",
             * so that the point of the arrow always aligns to the center of
             * the reference element.
             */
            if (/^(left|right|top|bottom)$/.test(_config.position)) {
                _config.offset = 0;
            }

            //return getPosition(_config);
            
            // getPosition()
            //let _config = Object.assign({}, DEFAULT_CONFIG, config);

            if (!_config.reference) {
                throw 'The "reference" configuration property must be defined.';
            }

            let position = this.position; // TODO: should this be normalized?
            let coords = __getCoords(_config);
            let isOffscreen = this._collisionsAtCoords(coords);

            if (isOffscreen.anywhere) {
                let newConfig = Object.assign({}, _config);

                newConfig.position = __repositionTowardCenter(newConfig, isOffscreen);

                // recalculate coords
                let newCoords = __getCoords(newConfig);

                // double check collisions
                isOffscreen = this._collisionsAtCoords(newCoords);
                if (!isOffscreen.anywhere) {
                    coords = newCoords;
                    position = newConfig.position;
                }
            }

            let { x, y } = coords;

            return { position, x, y };
        }

        /**
         * Calculate and apply new (x,y) coordinates.
         *
         * Requires the element to be open and have a valid `relativeElement` prop.
         */
        // TODO: is there a better name for this? (wait until position lib pulled in)
        reposition () {
            if (this.relativeElement) {
                let data = _getPosition(); // TODO: update

                this.style.top = `${data.y}px`;
                this.style.left = `${data.x}px`;
                this.currentPosition = data.position;

                this.$afterReposition(data);
            }
        }

        /** @private */
        __attrOpenChange (attr, oldVal, newVal) {
            let isOpen = (newVal !== null);
            this.setAttribute('aria-hidden', !isOpen);
            this.$emit(isOpen ? 'open' : 'close');

            if (isOpen) {
                this.__addOpenListeners();
                this.reposition();
                this.$onOpen();
            } else {
                this.__removeOpenListeners();
                this.$onClose();
            }
        }

        /** @private */
        __attrPositionChange (oldVal, newVal) {
            this._position = newVal;
            // TODO: calculate and memoize this._alignment

            // TODO:
            // 0. parse alignment data from new value
            // 1. reset v/h alignment shift
            // 2. memoize alignment props (_vAlign, _hAlign, _mainAxis);
            this.__resetAlignment();
            // 3. save normalized position
            this._position = getNormalizedPosition(newVal);

            // 4. set attr to normalized value
            
            this.currentPosition = newVal;
            this.reposition();
        }

        /** @private */
        __addOpenListeners () {
            document.addEventListener('click', this.__onDocumentClick);
            document.addEventListener('scroll', this.__onDocumentScroll);
            window.addEventListener('resize', this.__onWindowResize);
        }

        /** @private */
        __onDocumentClick (evt) {
            let inComponent = this.contains(evt.target);
            let inControl = this.controlElement.contains(evt.target);
            let _isBackground = (!inComponent && !inControl);

            if (this.open && _isBackground) {
                this.open = false;
            }
        }

        /** @private */
        __onDocumentScroll () {
            this.reposition();
        }

        /** @private */
        __removeOpenListeners () {
            document.removeEventListener('click', this.__onDocumentClick);
            document.removeEventListener('scroll', this.__onDocumentScroll);
            window.removeEventListener('resize', this.__onWindowResize);
        }

        /** @private */
        __resetAlignment () {
            // re-memoize alignment metadata
            this._alignment = getAlignment(this.position);

            // TODO: should we do this another way?
            this._alignment.hasXChanged = false;
            this._alignment.hasYChanged = false;
        }

        /**
         * Determine if any side of an element is obscured by the viewport.
         *
         * @param {Object} coords - (x,y) coordinates
         *
         * @returns {ViewportCollisions}
         */
        __getCollisionsAtCoords (coords) {
            let rect = this._getRectAtCoords(coords);

            let bottom = rect.bottom > window.innerHeight;
            let left = rect.left < 0;
            let right = rect.right > window.innerWidth;
            let top = rect.top < 0;

            let vertically = (top || bottom);
            let horizontally = (left || right);
            let anywhere = (vertically || horizontally);

            return {
                anywhere,
                bottom,
                horizontally,
                left,
                right,
                top,
                vertically,
            };
        }

        /**
         * Calculate _fixed_ coordinates of an offset element in relation to a reference element,
         * based on configured position.
         *
         * Translates margin and offset to dX and dY
         *
         * @returns {Coordinates}
         */
        __getCoords () {
            let position = this.position; // TODO: get normalized?
            let offRect = this.getBoundingClientRect();
            let refRect = this.referenceElement.getBoundingClientRect();
            let opts = this._offsetOptions;

            let _fnOffset = offsetFunctionMap[position];

            let coords = _fnOffset(offRect, refRect, opts);

            return coords;
        }

        /**
         * Translate a position configuration into offset options
         *
         * @returns {OffsetOptions}
         */
        get _offsetOptions () {
            let position = this.position; // TODO: get normalized?
            // TODO: use this.alignment.mainAxis
            let isLeftOrRight = /^(left|right)/.test(position);

            let margin = this._margin || 0;
            let offset = this._offset || 0;

            // Deltas
            let dX = isLeftOrRight ? margin : offset;
            let dY = isLeftOrRight ? offset : margin;

            /*
             * Invert dX to shift positioned element LEFT
             *
             *  - top-right
             *  - top-end
             *  - bottom-right
             *  - bottom-end
             */
            if (/^(top|bottom)-(right|end)/.test(position)) {
                dX = -dX;
            }

            /*
             * Invert dY to shift positioned element UP
             *
             *  - left-bottom
             *  - left-end
             *  - right-bottom
             *  - right-end
             */
            if (/^(left|right)-(bottom|end)/.test(position)) {
                dY = -dY;
            }

            return { dX, dY };
        }

        /**
         * Calculate the top, right, bottom, and left x/y values of
         * the element at provided coordinates.
         *
         * @param {Coordinate} coords - { x, y } coordinates
         *
         * @returns {PositionRect}
         */
        _getRectAtCoords (coords) {
            let { x, y } = coords;
            let { height, width } = this.getBoundingClientRect();

            return {
                bottom: y + height,
                left: x,
                right: x + width,
                top: y,
            };
        }

        /**
         * Modify the position of an element so that it appears toward
         * the center of the viewport.
         *
         * @returns {String} corrected position
         */
        // TODO: rename to "__optimizePosition" or similar
        __repositionTowardCenter () {
            let position = this.position; // TODO: get normalized position
            let coords = this.__getCoords(); // TODO: verify
            let isOffscreen = this.__getCollisionsAtCoords(coords);

            // TODO: write logic to account for historical repositioning
            // if no current collisions:
            //      no previous collisions: nothing to do
            //      previous collision present: reposition to previous position
            // else if collisions currently detected
            //      if no previous collisions: reposition
            //      if previous collision

            // collide with same side more than once: do not recalculate
            // no longer colliding with previously collided side: recalculate
            // no previous collisions: recalculate

            return position;
        }
    }

    return _Positionable;
}
