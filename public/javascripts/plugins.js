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

    function init() {
        $("textarea").TextAreaResizer();
        $(".date").datepicker({ dateFormat: 'dd.mm.yy' });
    }

    return {
        activateTablePlugins: activateTablePlugins,
        init: init
    };
})(jQuery);
