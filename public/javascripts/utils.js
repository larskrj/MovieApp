var app = app || {};

app.utils = (function($, _) {
    function konverterDato(datoEpoch) {
        var dato = new Date(datoEpoch);

        var addZeroIfOneDigit = function (number) {
            if (number < 10) return "0" + number;
            return number;
        };

        return addZeroIfOneDigit(dato.getDate()) + "." + addZeroIfOneDigit(dato.getMonth() + 1) + "." + dato.getFullYear();
    };

    return {
        convertToNorwegianDate: konverterDato
    };
}(jQuery, _));
