/// <reference path="_references.js" />

var app = app || {};

app.imageDialog = (function () {
    var _dialog;

    function activateNewImageDialog() {
        _dialog.dialog({
            autoOpen: false,
            height: 150,
            width: 350,
            modal: true,
            buttons: [
                {   
                    text: "Lagre",
                    click: function () {
                        app.movieApi.addImage(
                            _dialog.find("#movieId").val(),
                            _dialog.find("#imageUrl").val(),
                            app.messages.publishMoviesUpdated);
                        $(this).dialog("close");
                    },
                },{
                    text: "Avbryt",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]        
        });      
};

function activateNewImageButtons(movieTable) {
    
    movieTable.on("click", ".nyttBildeKnapp", function () {        
        _dialog.dialog("open");
        _dialog.find("input[type=hidden]").val($(this).data("filmId"));
        _dialog.find("input[type=text]").val("");
    });
};
function init(dialog, movieTable) {    
    _dialog = dialog;
    
    activateNewImageDialog(movieTable);
    activateNewImageButtons(movieTable);
}

return { init: init };

})();