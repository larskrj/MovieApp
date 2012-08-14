/// <reference path="../libs/jquery-1.6.3.js" />
/// <reference path="Libs/qunit.js" />
/// <reference path="Libs/sinon.js" />
/// <reference path="../utils.js" />
/// <reference path="Libs/sinon-qunit.js" />
/// <reference path="../utils.js" />

(function () {

    module("utils");

    test("convertToNorwegianDate should return expected result", function () {
        // Arrange
        var expectedResult = "13.12.2012";
        var date = new Date(2012, 11, 13);

        // Act
        var result = app.utils.convertToNorwegianDate(date);

        // Assert
        equal(result, expectedResult);
    });

    test("convertToNorwegianDate should return expected result with zeros", function () {
        // Arrange
        var expectedResult = "03.06.2012";
        var date = new Date(2012, 5, 3);

        // Act
        var result = app.utils.convertToNorwegianDate(date);

        // Assert
        equal(result, expectedResult);
    });
})();