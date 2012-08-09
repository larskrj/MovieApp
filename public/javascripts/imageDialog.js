/// <reference path="_references.js" />

var app = app || {};

app.imageDialog = (function () {
    var dialogId;


    function activateNewImageDialog(tabellId) {
        var dialog = $(dialogId);

        dialog.dialog({
            autoOpen: false,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Lagre": function () {
                    $.post(
                        //dialog.find("form").attr("action"),
                        "api/movies/" + dialog.find("input[type=hidden]").val() + "/images",
                        dialog.find("form").serialize(),
                        function (movies) {
                            $.publish(app.messages.moviesUpdated);
                        },
                        "json"
                    );
                    $(this).dialog("close");
                },
                "Avbryt": function () {
                    $(this).dialog("close");
                }
            }
        });
    };

    function activateNewImageButtons() {
        $(".nyttBildeKnapp").live("click", function () {
            $(dialogId).dialog("open");
            $(dialogId).find("input[type=hidden]").val($(this).data("filmId"));
            $(dialogId).find("input[type=text]").val("");
        });
    };
    function init() {
        dialogId = "#nyttBilde"
        activateNewImageDialog("#filmtabell");
        activateNewImageButtons();
    }

    return { init: init };

})();