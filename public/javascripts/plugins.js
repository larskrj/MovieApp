/// <reference path="_references.js" />

var app = app || {};

app.plugins = (function($) {
    
    function activateTablePlugins() {        
        $('a.lightbox').lightBox({ fixedNavigation: true });
        $("table.tablesorter").tablesorter({ widgets: ['zebra'] });
    }

    function activateFormPlugins() {
       $(".date").datepicker({ dateFormat: 'dd.mm.yy' });
    }

    return {
        activateTablePlugins: activateTablePlugins,
        activateFormPlugins: activateFormPlugins
    };
})(jQuery);
