/**
 * Fires when a positionable element is concealed.
 *
 * @event Revealable:close
 * @since 0.15.0
 * @type {CustomEvent}
 */

/**
 * Fires when a positionable element is revealed.
 *
 * @event Revealable:open
 * @since 0.15.0
 * @type {CustomEvent}
 */

/**
 * @description
 * Defines behavior for opening and closing an element.
 * @interface
 */
export const Revealable = (superclass) => {
    /** @lends Revealable */
    class _Revealable extends superclass {
        $onCreate () {
            super.$onCreate();

            this.$onOpen = this.$onOpen.bind(this);
            this.$onClose = this.$onClose.bind(this);
        }

        $onConnect () {
            super.$onConnect();

            this.$upgradeProperty('open');
            this.setAttribute('aria-hidden', !this.open);
        }

        static get $observedAttributes () {
            let attrs = super.$observedAttributes;
            return attrs.concat([ 'open' ]);
        }
        $onAttributeChange (attr, oldVal, newVal) {
            super.$onAttributeChange(attr, oldVal, newVal);

            if (attr === 'open') {
                let isOpen = (newVal !== null);
                this.setAttribute('aria-hidden', !isOpen);

                if (isOpen) {
                    this.$emit('open');
                    this.$onOpen();
                } else {
                    this.$emit('close');
                    this.$onClose();
                }
            }
        }

        /** @abstract */
        $onOpen () {}

        /** @abstract */
        $onClose () {}

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
    }

    return _Revealable;
};
