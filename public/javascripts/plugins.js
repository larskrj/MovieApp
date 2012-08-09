/// <reference path="_references.js" />

var app = app || {};

app.plugins = (function($) {

    function activateTableFilter() {
        $(".tablefilter").keyup(function() {
            var tabellId = $(".tablefilter").data("tabellId");
            $.uiTableFilter($("table"), this.value);
        });
    }

    function activateTablePlugins() {
        activateTableFilter();
        $('a.lightbox').lightBox({ fixedNavigation: true });
        $("table").tablesorter({ widgets: ['zebra'] });
    }

    function activateFormPlugins() {
       $(".date").datepicker({ dateFormat: 'dd.mm.yy' });
    }

    return {
        activateTablePlugins: activateTablePlugins,
        activateFormPlugins: activateFormPlugins
    };
})(jQuery);
