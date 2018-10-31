//import { HXPositionedElement } from './HXPositionedElement';
import { HXElement } from './HXElement';

import { makePositionable } from '../mixins/Positionable';

import shadowMarkup from './HXPopoverElement.html';
import shadowStyles from './HXPopoverElement.less';

/**
 * Defines behavior for the `<hx-popover>` element.
 *
 * @hideconstructor
 * @extends HXElement
 * @mixes module:mixins/Positionable~Positionable
 * @since 0.2.0
 */
export class HXPopoverElement extends makePositionable(HXElement) {
    static get is () {
        return 'hx-popover';
    }

    static get template () {
        return `<style>${shadowStyles}</style>${shadowMarkup}`;
    }

    $onCreate () {
        super.$onCreate();
        this.DEFAULT_POSITION = 'bottom-right';
        this._hasArrow = true;
    }

    get currentPosition () {
        return this._elRoot.getAttribute('position') || this.DEFAULT_POSITION;
    }
    set currentPosition (value) {
        this._elRoot.setAttribute('position', value);
    }

    /** @private */
    get _elRoot () {
        return this.shadowRoot.getElementById('hxPopover');
    }
}
