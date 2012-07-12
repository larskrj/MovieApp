var app = app || {};

app.main = (function() {
    var _rowTemplate, _table, _form;


    function loadMovies() {
        return app.apiRepository
                  .getMovies()
                  .done(addMoviesToTable);
    }

    function addMoviesToTable(movies) {
        var source = _rowTemplate.html();
        var template = Handlebars.compile(source);
        Handlebars.registerHelper("konverterDato", app.utils.convertToNorwegianDate);
        _table.find("tbody").append(template(movies));
    }

    function lagreFilmer(event) {
        event.preventDefault();
        var lagreKnapp = $(this);

        if(_form.validate().form()) {
            lagreKnapp.attr("disabled", "disabled");

            app.apiRepository.addNewMovie(_form.serialize())
	            .done(leggInnFilmer)
	            .always(function() { lagreKnapp.removeAttr("disabled"); })
	            .fail(function(error) { console.log(error); });
        }
    };

    function leggInnFilmer(filmer) {
        addMoviesToTable(filmer);
        _form[0].reset();
        if(true) {
            lagreFilmer
        }
    }

    function init(table, form, rowTemplate) {
        _rowTemplate = rowTemplate;
        _table = table;
        _form = form;
        app.plugins.init()
        loadMovies().done(function() { app.plugins.activateTablePlugins(_table); });

        _form.find("input[type=submit]").click(lagreFilmer);
    }

    return {
        init: init
    };
} ());