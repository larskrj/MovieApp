/// <reference path="_references.js" />

var app = app || {};

app.plugins = (function($) {
    "use strict";

    function activateLightBoxPlugin() {        
        $('a.lightbox').lightBox({ fixedNavigation: true });        
    }

    function activateDatePickerPlugin() {
       $(".date").datepicker({ dateFormat: 'dd.mm.yy' });
    }

    return {
        activateLightBoxPlugin: activateLightBoxPlugin,
        activateDatePickerPlugin: activateDatePickerPlugin
    };
})(jQuery);
