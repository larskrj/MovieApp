/// <reference path="_references.js" />

var app = app || {};

app.utils = (function () {
    "use strict";
    
    function addZeroIfOneDigit (number) {
            if (number < 10) return "0" + number;
            return number;
        }; 
    
    function convertToNorwegianDate(datoEpoch) {
        var dato = new Date(datoEpoch);

        return addZeroIfOneDigit(dato.getDate()) + "." + addZeroIfOneDigit(dato.getMonth() + 1) + "." + dato.getFullYear();
    };

    function logError(error) {
        if (console && console.log)
            console.log("Det oppsto en feil: " + error);
    }

    return {
        logError: logError,
        convertToNorwegianDate: convertToNorwegianDate
    };
})();
