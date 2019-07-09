
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
    "./fixtures/forLoop",
    "./fixtures/simpleFunction",
    "./fixtures/simpleProgram"
], function (esquery, assert, test, conditional, forLoop, simpleFunction, simpleProgram) {

    test.defineSuite("Pseudo matches query", {

        "conditional": function () {
            var matches = esquery(conditional, ":not(LiteralBooleanExpression)");
            assert.isEqual(37, matches.length);
        },

        "for loop": function () {
            var matches = esquery(forLoop, ':not([name="x"])');
            assert.isEqual(18, matches.length);
        },

        "simple function": function () {
            var matches = esquery(simpleFunction, ":not(*)");
            assert.isEqual(0, matches.length);
        },

        "simple program": function () {
            var matches = esquery(simpleProgram, ":not(IdentifierExpression, IfStatement)");
            assert.isEqual(22, matches.length);
        },

    });
});
