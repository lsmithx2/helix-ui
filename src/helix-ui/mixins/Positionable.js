import { offsetFunctionMap } from '../utils/position/offset';
import { mix } from '../utils';
import { Revealable } from './Revealable';

/**
 * @description
 * Defines behavior needed to calculate absolute coordinates
 * and apply them to an instance.
 *
 * @implements Revealable
 * @interface
 * @since 0.15.0
 */
export const Positionable = (superclass) => {
    class ProtoClass extends mix(superclass).with(Revealable) {}

    /** @lends Positionable */
    class _Positionable extends ProtoClass {
        constructor () {
            super();

            this.reposition = this.reposition.bind(this);
            this.__onDocumentClick = this.__onDocumentClick.bind(this);
            this.__onDocumentScroll = this.__onDocumentScroll.bind(this);
            this.__onWindowResize = this.__onWindowResize.bind(this);

            this.DEFAULT_POSITION = 'bottom';
        }

        $onConnect () {
            super.$onConnect();

            this.$upgradeProperty('position');
            this.$upgradeProperty('relativeTo');

            this.$defaultAttribute('position', this.DEFAULT_POSITION);
        }

        $onDisconnect () {
            super.$onDisconnect();
            this.__removeOpenListeners();
        }

        static get $observedAttributes () {
            let attrs = super.$observedAttributes;
            return attrs.concat([ 'position' ]);
        }
        $onAttributeChange (attr, oldVal, newVal) {
            super.$onAttributeChange(attr, oldVal, newVal);

            if (attr === 'position') {
                this.reposition();
            }
        }

        /** @override */
        $onOpen () {
            if (this.relativeElement) {
                document.addEventListener('click', this.__onDocumentClick);
                document.addEventListener('scroll', this.__onDocumentScroll, { passive: true });
                window.addEventListener('resize', this.__onWindowResize, { passive: true });
            }
            this.reposition();
        }

        /** @override */
        $onClose () {
            this.__removeOpenListeners();
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
         * Where to position the element against its relativeElement.
         *
         * @type {String}
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
         * Calculate fixed {x,y} coordinates relative to another HTML element.
         *
         * @returns {Object} Coordinate object with `x` and `y` properties.
         */
        getCoordinates () {
            let posRect = this.getBoundingClientRect();
            let relRect = this.relativeElement.getBoundingClientRect();
            let calculate = offsetFunctionMap[this.position];
            let opts = this.__getDeltas();

            return calculate(posRect, relRect, opts);
        }

        /**
         * Calculate and apply new (x,y) coordinates.
         *
         * Requires the element to have a valid `relativeElement`
         */
        reposition () {
            if (this.open && this.relativeElement) {
                let { x, y } = this.getCoordinates();

                this.style.top = `${y}px`;
                this.style.left = `${x}px`;

                this.$emit('reposition');
            }
        }

        // Calculate X and Y adjustments
        __getDeltas () {
            let isLeftOrRight = /^(left|right)/.test(this.position);
            let margin = parseInt(this.dataset.margin) || 0;
            let offset = parseInt(this.dataset.offset) || 0;

            /*
             * Remove offset if position is "top", "bottom", "left", or "right",
             * so that the point of the arrow always aligns to the center of
             * the reference element.
             */
            if (/^(left|right|top|bottom)$/.test(this.position)) {
                offset = 0;
            }

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
            if (/^(top|bottom)-(right|end)/.test(this.position)) {
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
            if (/^(left|right)-(bottom|end)/.test(this.position)) {
                dY = -dY;
            }

            return { dX, dY };
        }

        __onDocumentClick (evt) {
            let inComponent = this.contains(evt.target);
            let inControl = this.controlElement.contains(evt.target);
            let isBackground = (!inComponent && !inControl);

            if (this.open && isBackground) {
                this.open = false;
            }
        }

        __onDocumentScroll () {
            this.reposition();
        }

        __onWindowResize () {
            this.reposition();
        }

        __removeOpenListeners () {
            document.removeEventListener('click', this.__onDocumentClick);
            document.removeEventListener('scroll', this.__onDocumentScroll);
            window.removeEventListener('resize', this.__onWindowResize);
        }
    }

    return _Positionable;
};

