
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
    "./fixtures/forLoop",
    "./fixtures/simpleFunction",
    "./fixtures/simpleProgram"
], function (esquery, assert, test, conditional, forLoop, simpleFunction, simpleProgram) {

    test.defineSuite("Wildcard query", {

        "empty": function () {
            var matches = esquery(conditional, "");
            assert.isEqual(0, matches.length);
        },

        "conditional": function () {
            var matches = esquery(conditional, "*");
            assert.isEqual(39, matches.length);
        },

        "for loop": function () {
            var matches = esquery(forLoop, "*");
            assert.isEqual(18, matches.length);
        },

        "simple function": function () {
            var matches = esquery(simpleFunction, "*");
            assert.isEqual(19, matches.length);
        },

        "simple program": function () {
            var matches = esquery(simpleProgram, "*");
            assert.isEqual(25, matches.length);
        },

    });
});
