
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
    "./fixtures/forLoop",
    "./fixtures/simpleFunction",
    "./fixtures/simpleProgram"
], function (esquery, assert, test, conditional, forLoop, simpleFunction, simpleProgram) {

    test.defineSuite("Compound query", {

        "two attributes": function () {
            var matches = esquery(conditional, '[left.name="x"][right.value=1]');

            assert.contains([
                conditional.statements[0].test
            ], matches);
        },

        "type and pseudo": function () {
            var matches = esquery(conditional, '[left.name="x"]:matches(*)');
            assert.contains([
                conditional.statements[0].test
            ], matches);
        }
    });
});
