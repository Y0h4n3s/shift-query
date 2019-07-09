
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
    "./fixtures/forLoop",
    "./fixtures/simpleFunction",
    "./fixtures/simpleProgram"
], function (esquery, assert, test, conditional, forLoop, simpleFunction, simpleProgram) {

    test.defineSuite("Field query", {

        "single field": function () {
            var matches = esquery(conditional, ".test");
            assert.contains([
                conditional.statements[0].test,
                conditional.statements[1].test,
                conditional.statements[1].alternate.test
            ], matches);
        },

        "field sequence": function () {
            var matches = esquery(simpleProgram, ".declarators.init");
            assert.contains([
                simpleProgram.statements[0].declaration.declarators[0].init,
                simpleProgram.statements[1].declaration.declarators[0].init
            ], matches);
        }
    });
});
