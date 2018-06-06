/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function stripIndent(rawString) {
    var match = rawString.match(/^[ \t]*(?=\S)/gm);

    if (!match) {
        return rawString;
    }

    var minIndent = Math.min.apply(Math, match.map(function (x) {
        return x.length;
    }));

    var reMinIndent = new RegExp('^[ \\t]{' + minIndent + '}', 'gm');

    var strReindented = rawString;
    if (minIndent > 0) {
        strReindented = rawString.replace(reMinIndent, '');
    }

    return strReindented.trim();
} //stripIndent()

function snippet(raw) {
    // https://regex101.com/r/hKMzZP/4
    var normalized = raw.replace(/(\s+^\s+$|\s+(?=>))/gm, '');
    return stripIndent(normalized);
}

/* harmony default export */ __webpack_exports__["a"] = ({
    snippet: snippet
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_accordions_accordion_demo__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_alerts_alert_demo__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_box_box_demo__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_box_box_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_box_box_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_busy_busy_demo__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_busy_busy_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_busy_busy_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_buttons_button_demo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_buttons_button_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_buttons_button_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_checkboxes_checkbox_demo__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_checkboxes_checkbox_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_checkboxes_checkbox_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_choice_tiles_choice_tile_demo__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_icons_icon_demo__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_icons_icon_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_icons_icon_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_lists_list_demo__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_lists_list_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_lists_list_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_panels_panel_demo__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_panels_panel_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_panels_panel_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_pills_pill_demo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_popovers_popover_demo__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_popovers_popover_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_popovers_popover_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_progress_progress_demo__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_reveals_reveal_demo__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_reveals_reveal_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_reveals_reveal_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_search_search_demo__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_status_pills_status_demo__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_status_pills_status_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__components_status_pills_status_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_stepper_stepper_demo__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_stepper_stepper_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__components_stepper_stepper_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_tables_table_demo__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_tables_table_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__components_tables_table_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_toasts_toast_demo__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_tooltips_tooltip_demo__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_tooltips_tooltip_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__components_tooltips_tooltip_demo__);























(function () {
    var hashAnchors = document.querySelectorAll('[href^="#"]');

    [].forEach.call(hashAnchors, function (anchor) {
        anchor.addEventListener('click', function (evt) {
            evt.preventDefault();
            document.location.hash = evt.target.getAttribute('href');
        });
    });
})();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


if (document.getElementById('vue-accordionDemo')) {
    new Vue({
        el: '#vue-accordionDemo',
        data: {
            isSinglePanel: false,
            currentPanel: 0
        },
        methods: {
            onOpen: function onOpen(evt) {
                if (this.isSinglePanel) {
                    var newIdx = evt.currentTarget.getAttribute('current-panel');
                    this.currentPanel = Number(newIdx);
                }
            },
            nextPanel: function nextPanel() {
                this.$refs.accordion.nextPanel();
            },
            prevPanel: function prevPanel() {
                this.$refs.accordion.previousPanel();
            }
        },
        computed: {
            snippet: function snippet() {
                return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].snippet('\n                    <hx-accordion ' + (this.isSinglePanel ? 'current-panel="' + this.currentPanel + '"' : '') + '>\n                      <hx-accordion-panel ' + (!this.isSinglePanel ? 'open' : '') + '>\n                        <header slot="header">Cupcake Ipsum</header>\n                        <div class="hxBox-md">\n                          <!-- body content goes here -->\n                        </div>\n                      </hx-accordion-panel>\n                      <hx-accordion-panel>...</hx-accordion-panel>\n                      <hx-accordion-panel ' + (!this.isSinglePanel ? 'open' : '') + '>...</hx-accordion-panel>\n                    </hx-accordion>\n                ');
            }
        }
    });
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


if (document.getElementById('vue-alertDemo')) {
    var TYPES = [{ label: 'Default', value: '' }, { label: 'Info', value: 'info' }, { label: 'Error', value: 'error' }, { label: 'Success', value: 'success' }, { label: 'Warning', value: 'warning' }];

    new Vue({
        el: '#vue-alertDemo',
        data: {
            content: 'Nope! Nope! Nope! Nope! Nope!',
            cta: 'burn it',
            isStatic: false,
            status: 'spider',
            type: TYPES[0],
            types: TYPES
        },
        methods: {
            onSubmit: function onSubmit() {
                alert('The spider didn\'t see that coming!');
            }
        },
        computed: {
            attrType: function attrType() {
                if (this.type.value !== '') {
                    return 'type="' + this.type.value + '"';
                } else {
                    return '';
                }
            },
            attrStatus: function attrStatus() {
                if (this.status !== '') {
                    return 'status="' + this.status + '"';
                } else {
                    return '';
                }
            },
            attrCta: function attrCta() {
                if (this.cta !== '') {
                    return 'cta="' + this.cta + '"';
                } else {
                    return '';
                }
            },
            snippet: function snippet() {
                return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].snippet('\n                    <hx-alert\n                        ' + this.attrCta + '\n                        ' + this.attrStatus + '\n                        ' + (this.isStatic ? 'static' : '') + '\n                        ' + this.attrType + '\n                    >\n                        ' + this.content + '\n                    </hx-alert>\n                ');
            }
        }
    });
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

if (document.getElementById('vue-boxDemo')) {
    new Vue({
        el: '#vue-boxDemo',
        data: {
            size: {
                label: 'Medium',
                value: 'hxBox-md'
            },
            sizes: [{ value: 'hxBox-xs', label: 'Extra Small' }, { value: 'hxBox-sm', label: 'Small' }, { value: 'hxBox-md', label: 'Medium' }, { value: 'hxBox-lg', label: 'Large' }, { value: 'hxBox-xl', label: 'Extra Large' }]
        }
    });
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

if (document.getElementById('vue-busyDemo')) {
    new Vue({
        el: '#vue-busyDemo',
        data: {
            isPaused: false
        }
    });
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

if (document.getElementById('vue-buttonDemo')) {
    var SIZES = [{ label: 'Small', val: 'hxSm' }, { label: 'Medium', val: '' }, { label: 'Large', val: 'hxLg' }];

    var VARIANTS = [{ label: 'Default', val: '' }, { label: 'Primary', val: 'hxPrimary' }, { label: 'Link', val: 'hxLink' }];

    new Vue({
        el: '#vue-buttonDemo',
        data: {
            size: SIZES[1],
            sizes: SIZES,
            variant: VARIANTS[0],
            variants: VARIANTS
        },
        computed: {
            loneClasses: function loneClasses() {
                var out = ['hxBtn'];
                if (this.size.val !== '') {
                    out.push(this.size.val);
                }
                if (this.variant.val !== '') {
                    out.push(this.variant.val);
                }
                return out.join(' ');
            }, //loneClasses()

            groupClasses: function groupClasses() {
                var out = ['hxBtnGroup'];
                if (this.size.val !== '') {
                    out.push(this.size.val);
                }
                if (this.variant.val !== '') {
                    out.push(this.variant.val);
                }
                return out.join(' ');
            } //groupClasses()
        }
    });
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

if (document.getElementById('vue-checkboxDemo')) {
    new Vue({
        el: '#vue-checkboxDemo',
        data: {
            isChecked: true,
            isDisabled: false,
            isIndeterminate: false,
            isInvalid: false
        },
        methods: {
            onChange: function onChange(evt) {
                // Use evt.currentTarget because evt.target is undefined in Firefox
                this.isChecked = evt.currentTarget.checked;
            }
        },
        computed: {
            snippet: function snippet() {
                var raw = '<hx-checkbox\n                    ' + (this.isChecked ? 'checked' : '') + '\n                    ' + (this.isDisabled ? 'disabled' : '') + '\n                    ' + (this.isIndeterminate ? 'indeterminate' : '') + '\n                    ' + (this.isInvalid ? 'invalid' : '') + '\n                ></hx-checkbox>';
                var rawCollapsed = raw.replace(/[\r\n\s]+/gm, ' ');
                var rawNormalized = rawCollapsed.replace(/(\s>)/gm, '>');
                return rawNormalized;
            }
        }
    });
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


if (document.getElementById('vue-choiceDemo')) {
    new Vue({
        el: '#vue-choiceDemo',
        data: {
            size: {
                label: 'Default',
                value: ''
            },
            sizes: [{ value: 'hxSm', label: 'Small' }, { value: '', label: 'Default' }, { value: 'hxLg', label: 'Large' }],
            description: 'A couple of descriptive lines or a small bit of help text.',
            isChecked: false,
            isDisabled: false,
            isInvalid: false,
            isSubdued: false
        },
        methods: {
            onClick: function onClick(evt) {
                this.isChecked = evt.target.checked;
            }
        },
        computed: {
            tileClasses: function tileClasses() {
                var out = [];
                out.push(this.size.value);
                if (this.isSubdued) {
                    out.push('hxSubdued');
                }
                return out.join(' ').trim();
            },
            hasClasses: function hasClasses() {
                return this.tileClasses !== '';
            },
            snippet: function snippet() {
                return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].snippet('\n                  <label class="hxChoice">\n                    <input type="radio"\n                        ' + (this.isChecked ? 'checked' : '') + '\n                        ' + (this.isDisabled ? 'disabled' : '') + '\n                        ' + (this.isInvalid ? 'invalid' : '') + '>\n                    <hx-tile ' + (this.hasClasses ? 'class="' + this.tileClasses + '"' : '') + '>\n                      <hx-icon type="checkmark"></hx-icon>\n                      <div class="hx-tile-icon">\n                        <hx-icon type="account"></hx-icon>\n                      </div>    \n                      <hx-tile-title>\n                      Title here\n                      </hx-tile-title>\n                      <hx-tile-description>\n                        ' + this.description + '\n                      </hx-tile-description>\n                    </hx-tile>\n                  </label>\n                ');
            }
        }
    });
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

if (document.getElementById('vue-iconDemo')) {
    var Icons = {
        fetchAll: function fetchAll() {
            return $.ajax({
                async: false,
                dataType: 'json',
                url: 'data/icons.json'
            });
        }
    }; //Icons

    new Vue({
        el: '#vue-iconDemo',
        data: {
            icons: [],
            filter: ''
        },
        beforeMount: function beforeMount() {
            var _this = this;

            Icons.fetchAll().then(function (data) {
                _this.icons = data;
            });
        },
        methods: {
            onFilterUpdate: function onFilterUpdate(evt) {
                this.filter = evt.currentTarget.value || '';
            },
            matchesName: function matchesName(icon) {
                var _name = icon.name.toLowerCase();
                return _name.indexOf(this.downcaseFilter) >= 0;
            },
            matchesAlias: function matchesAlias(icon) {
                if (!icon.alias) {
                    return false;
                }
                var _alias = icon.alias.toLowerCase();
                return _alias.indexOf(this.downcaseFilter) >= 0;
            },
            matchesKeyword: function matchesKeyword(icon) {
                var _this2 = this;

                if (!icon.keywords) {
                    return false;
                }

                return icon.keywords.some(function (keyword) {
                    return keyword.indexOf(_this2.downcaseFilter) >= 0;
                });
            }
        },
        computed: {
            downcaseFilter: function downcaseFilter() {
                return this.filter.toLowerCase();
            },
            hasFilter: function hasFilter() {
                return this.filter !== '';
            },
            filterConditions: function filterConditions() {
                return [this.matchesName, this.matchesAlias, this.matchesKeyword];
            },
            filteredIcons: function filteredIcons() {
                var _this3 = this;

                var filtered = this.icons;
                if (this.hasFilter) {
                    filtered = this.icons.filter(function (icon) {
                        return _this3.filterConditions.some(function (fn) {
                            return fn(icon);
                        });
                    });
                }
                return filtered;
            }
        }
    });
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

if (document.getElementById('vue-listDemo')) {
    new Vue({
        el: '#vue-listDemo',
        data: {
            isVertical: false
        },
        computed: {
            hxDlClasses: function hxDlClasses() {
                return this.isVertical ? 'hxVertical' : '';
            }
        }
    });
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

if (document.getElementById('vue-panelDemo')) {
    new Vue({
        el: '#vue-panelDemo',
        data: {
            hasHead: true,
            hasFoot: true
        }
    });
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


if (document.getElementById('vue-pillDemo')) {
    new Vue({
        el: '#vue-pillDemo',
        data: {
            content: 'status: unicorns!',
            isDismissable: false
        },
        computed: {
            snippet: function snippet() {
                return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].snippet('\n                    <hx-pill\n                        ' + (this.isDismissable ? 'dismissable' : '') + '\n                    >\n                        ' + this.content + '\n                    </hx-pill>\n                ');
            }
        }
    });
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

if (document.getElementById('vue-popoverDemo')) {
    var POSITIONS = [{ label: 'Top Left', value: 'top-left' }, { label: 'Top', value: 'top' }, { label: 'Top Right', value: 'top-right' }, { label: 'Right Top', value: 'right-top' }, { label: 'Right', value: 'right' }, { label: 'Right Bottom', value: 'right-bottom' }, { label: 'Bottom Right', value: 'bottom-right' }, { label: 'Bottom', value: 'bottom' }, { label: 'Bottom Left', value: 'bottom-left' }, { label: 'Left Bottom', value: 'left-bottom' }, { label: 'Left', value: 'left' }, { label: 'Left Top', value: 'left-top' }];

    new Vue({
        el: '#vue-popoverDemo',
        data: {
            position: POSITIONS[6],
            positions: POSITIONS
        }
    });
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


if (document.getElementById('vue-progressDemo')) {
    new Vue({
        el: '#vue-progressDemo',
        data: {
            pct: 42
        },
        computed: {
            snippet: function snippet() {
                return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].snippet('\n                    <hx-progress\n                        value="' + this.pct + '">\n                    </hx-progress>\n                ');
            }
        }
    });
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

if (document.getElementById('vue-revealDemo')) {
    new Vue({
        el: '#vue-revealDemo',
        data: {
            isDisabled: false
        }
    });
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


if (document.getElementById('vue-searchDemo')) {
    new Vue({
        el: '#vue-searchDemo',
        data: {
            isDisabled: false,
            isInvalid: false,
            searchValue: '',
            placeholder: ''
        },
        methods: {
            // fires on 'input' and 'clear' events
            onSearchUpdate: function onSearchUpdate(evt) {
                this.searchValue = evt.target.value;
            },
            onChkChange: function onChkChange(evt, datum) {
                this[datum] = evt.currentTarget.checked;
            }
        },
        computed: {
            hasPlaceholder: function hasPlaceholder() {
                return this.placeholder !== '';
            },
            hasValue: function hasValue() {
                return this.searchValue && this.searchValue !== '';
            },
            snippet: function snippet() {
                return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].snippet('\n                    <hx-search\n                        ' + (this.isDisabled ? 'disabled' : '') + '\n                        ' + (this.isInvalid ? 'invalid' : '') + '\n                        ' + (this.hasPlaceholder ? 'placeholder="' + this.placeholder + '"' : '') + '\n                        ' + (this.hasValue ? 'value="' + this.searchValue + '"' : '') + '>\n                        <!-- inner content will be removed -->\n                    </hx-search>\n                ');
            }
        }
    });
} //vue-searchDemo

if (document.getElementById('vue-searchAssistanceDemo')) {
    new Vue({
        el: '#vue-searchAssistanceDemo',
        data: {
            searchValue: ''
        },
        methods: {
            // fires on 'input' and 'clear' events
            onUpdate: function onUpdate(evt) {
                this.searchValue = evt.target.value;
            },
            onFocus: function onFocus() {
                this.$refs.search.open = true;
            },
            onBlur: function onBlur() {
                this.$refs.search.open = false;
            }
        },
        computed: {
            hasValue: function hasValue() {
                return this.searchValue && this.searchValue !== '';
            }
        }
    });
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

if (document.getElementById('vue-statusDemo')) {
    new Vue({
        el: '#vue-statusDemo',
        data: {
            isFilled: false,
            variant: {
                label: 'Default',
                value: ''
            },
            variants: [{ value: '', label: 'Default' }, { value: 'hxEmphasisGray', label: 'Emphasis Gray' }, { value: 'hxEmphasisPurple', label: 'Emphasis Purple' }, { value: 'hxSubdued', label: 'Subdued' }]
        },
        computed: {
            cssClasses: function cssClasses() {
                var out = [];
                if (this.variant.value !== '') {
                    out.push(this.variant.value);
                }
                if (this.isFilled) {
                    out.push('hxFill');
                }
                return out.join(' ');
            }
        }
    });
}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

if (document.getElementById('vue-stepperDemo')) {
    new Vue({
        el: '#vue-stepperDemo',
        data: {},
        methods: {
            nextStep: function nextStep() {
                this.$refs.accordion.nextPanel();
            },
            prevStep: function prevStep() {
                this.$refs.accordion.previousPanel();
            }
        }
    });
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

if (document.getElementById('vue-tableDemo')) {
    new Vue({
        el: '#vue-tableDemo',
        data: {
            isBound: false,
            isHoverable: false,
            isCondensed: false
        },
        computed: {
            cssClasses: function cssClasses() {
                var out = ['hxTable'];
                if (this.isCondensed) {
                    out.push('hxTable--condensed');
                }
                if (this.isBound) {
                    out.push('hxBound');
                }
                if (this.isHoverable) {
                    out.push('hxHoverable');
                }
                return out.join(' ');
            }
        }
    });
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


if (document.getElementById('vue-toastDemo')) {
    var TYPES = [{ label: 'Default', value: '' }, { label: 'Info', value: 'info' }, { label: 'Error', value: 'error' }, { label: 'Success', value: 'success' }];

    new Vue({
        el: '#vue-toastDemo',
        data: {
            content: 'The password has been reset for foo@bar.com.',
            cta: 'try again',
            type: TYPES[0],
            types: TYPES
        },
        methods: {
            onSubmit: function onSubmit() {
                alert('Unicorn pigeon puppy pop rainbows delight social pop!');
            }
        },
        computed: {
            attrType: function attrType() {
                if (this.type.value !== '') {
                    return 'type="' + this.type.value + '"';
                } else {
                    return '';
                }
            },
            attrCta: function attrCta() {
                if (this.cta !== '') {
                    return 'cta="' + this.cta + '"';
                } else {
                    return '';
                }
            },
            snippet: function snippet() {
                return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].snippet('\n                    <hx-toast\n                        ' + this.attrCta + '\n                        ' + this.attrType + '\n                    >\n                        ' + this.content + '\n                    </hx-toast>\n                ');
            }
        }
    });
}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

if (document.getElementById('vue-tooltipDemo')) {
    var POSITIONS = [{ label: 'Top Left', value: 'top-left' }, { label: 'Top', value: 'top' }, { label: 'Top Right', value: 'top-right' }, { label: 'Right Top', value: 'right-top' }, { label: 'Right', value: 'right' }, { label: 'Right Bottom', value: 'right-bottom' }, { label: 'Bottom Right', value: 'bottom-right' }, { label: 'Bottom', value: 'bottom' }, { label: 'Bottom Left', value: 'bottom-left' }, { label: 'Left Bottom', value: 'left-bottom' }, { label: 'Left', value: 'left' }, { label: 'Left Top', value: 'left-top' }];

    new Vue({
        el: '#vue-tooltipDemo',
        data: {
            position: POSITIONS[1], // Top
            positions: POSITIONS
        }
    });
}

/***/ })
/******/ ]);