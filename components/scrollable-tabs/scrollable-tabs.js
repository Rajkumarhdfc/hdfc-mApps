var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Tabs } from 'ionic-angular';
var ScrollableTabs = /** @class */ (function () {
    function ScrollableTabs(elemRef, renderer) {
        this.elemRef = elemRef;
        this.renderer = renderer;
        this.opts = {};
        this.tabs = [];
    }
    ScrollableTabs.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.hasOwnProperty('opts')) {
            if (changes['opts'].currentValue.refresh) {
                setTimeout(function () {
                    _this.setAnchorStyles();
                    _this.scrollToselectedTab();
                }, 300);
            }
        }
    };
    ScrollableTabs.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.nativeTabbar = this.ionTabs._tabbar.nativeElement;
        this.tabs = this.ionTabs._tabs;
        this.currentTabIndex = typeof (this.ionTabs.selectedIndex) == "undefined" ? 0 : this.ionTabs.selectedIndex;
        this.ionTabs.ionChange.subscribe(function () {
            _this.scrollToselectedTab();
        });
        var _loop_1 = function (i) {
            this_1.tabs[i].ionSelect.subscribe(function () {
                _this.currentTabIndex = i;
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.tabs.length; i++) {
            _loop_1(i);
        }
        // set tabbar overflow-x: scroll
        this.renderer.setElementStyle(this.nativeTabbar, "overflow-x", "scroll");
        // set tabbar overflow-y: hidden
        this.renderer.setElementStyle(this.nativeTabbar, "overflow-y", "hidden");
        this.setAnchorStyles();
        this.scrollToselectedTab();
    };
    ScrollableTabs.prototype.onResize = function (event) {
        var _this = this;
        this.setAnchorStyles();
        setTimeout(function () {
            _this.scrollToselectedTab();
        }, 300);
    };
    ScrollableTabs.prototype.setAnchorStyles = function () {
        if (typeof (this.nativeTabbar) != "undefined") {
            var tabBar_width = this.nativeTabbar.clientWidth;
            var numOfTabs = this.tabs.length;
            var numOfVisibleAnchors = 0;
            var sumOfVisibleAnchorWidth = 0;
            // loop through tab elements in tabs
            for (var i = 0; i < numOfTabs; i++) {
                var element = this.nativeTabbar.children[i];
                // when Tab visible (effecting show property)
                if (this.tabs[i]._isShown) {
                    numOfVisibleAnchors++;
                    // set <a> display: inline-table
                    this.renderer.setElementStyle(element, 'display', 'inline-table');
                    // set <a> width: 6rem
                    this.renderer.setElementStyle(element, 'width', '6rem');
                    // extra padding for title-only tags only
                    if (element.classList.contains("has-title-only")) {
                        // set <a> padding-top: 1.5rem
                        this.renderer.setElementStyle(element, 'padding-top', '1.5rem');
                    }
                    sumOfVisibleAnchorWidth += element.clientWidth;
                }
                else {
                    // set <a> display: none
                    this.renderer.setElementStyle(element, 'display', 'none');
                }
            }
            // to prevent extra space at end
            if (sumOfVisibleAnchorWidth < tabBar_width) {
                var anchorWidth = tabBar_width / numOfVisibleAnchors;
                for (var i = 0; i < numOfTabs; i++) {
                    var element = this.nativeTabbar.children[i];
                    // when Tab not not visible effecting show property
                    if (!element.classList.contains("tab-hidden")) {
                        this.renderer.setElementStyle(element, 'width', anchorWidth + 'px');
                    }
                }
            }
        }
    };
    ScrollableTabs.prototype.scrollToselectedTab = function () {
        if (typeof this.nativeTabbar != 'undefined') {
            var tabBar_width = this.nativeTabbar.clientWidth;
            var selectedTab = this.nativeTabbar.children[this.currentTabIndex];
            var selectedTab_Width = selectedTab.clientWidth;
            var selectedTab_LeftOffset = document.getElementById(selectedTab.id).offsetLeft;
            var selectedTab_mid = selectedTab_LeftOffset + (selectedTab_Width / 2);
            var newScrollLeft = selectedTab_mid - (tabBar_width / 2);
            this.scrollXTo(newScrollLeft, 300).then(function () { });
        }
    };
    ScrollableTabs.prototype.scrollXTo = function (x, duration) {
        if (duration === void 0) { duration = 300; }
        // scroll animation loop w/ easing
        var tabbar = this.nativeTabbar;
        if (!tabbar) {
            // invalid element
            return Promise.resolve();
        }
        x = x || 0;
        var originalRaf = (window[window['Zone']['__symbol__']('requestAnimationFrame')] || window[window['Zone']['__symbol__']('webkitRequestAnimationFrame')]);
        var nativeRaf = originalRaf !== undefined ? originalRaf['bind'](window) : window.requestAnimationFrame.bind(window);
        var fromX = tabbar.scrollLeft;
        var maxAttempts = (duration / 16) + 100;
        return new Promise(function (resolve) {
            var startTime;
            var attempts = 0;
            var isPlaying;
            // scroll loop
            function step() {
                attempts++;
                if (!tabbar || !isPlaying || attempts > maxAttempts) {
                    isPlaying = false;
                    resolve();
                    return;
                }
                var time = Math.min(1, ((Date.now() - startTime) / duration));
                // where .5 would be 50% of time on a linear scale easedT gives a
                // fraction based on the easing method
                var easedT = (--time) * time * time + 1;
                if (fromX !== x) {
                    tabbar.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
                }
                if (easedT < 1) {
                    nativeRaf(step);
                }
                else {
                    // done
                    resolve();
                }
            }
            // start scroll loop
            isPlaying = true;
            // chill out for a frame first
            nativeRaf(function () {
                startTime = Date.now();
                nativeRaf(step);
            });
        });
    };
    __decorate([
        Input('scrollable-tabs'),
        __metadata("design:type", Tabs)
    ], ScrollableTabs.prototype, "ionTabs", void 0);
    __decorate([
        Input('opts'),
        __metadata("design:type", Object)
    ], ScrollableTabs.prototype, "opts", void 0);
    ScrollableTabs = __decorate([
        Directive({
            selector: '[scrollable-tabs]',
            host: {
                '(window:resize)': 'onResize($event)'
            }
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer])
    ], ScrollableTabs);
    return ScrollableTabs;
}());
export { ScrollableTabs };
//# sourceMappingURL=scrollable-tabs.js.map