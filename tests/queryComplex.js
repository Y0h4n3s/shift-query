
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
    "./fixtures/forLoop",
    "./fixtures/simpleFunction",
    "./fixtures/simpleProgram",
    "./fixtures/nestedFunctions"
], function (esquery, assert, test, conditional, forLoop, simpleFunction, simpleProgram, nestedFunctions) {

    test.defineSuite("Complex selector query", {

        "two types child": function () {
            var matches = esquery(conditional, "IfStatement > BinaryExpression");
            assert.contains([
                conditional.statements[0].test
            ], matches);
        },

        "three types child": function () {
            var matches = esquery(conditional, "IfStatement > BinaryExpression > IdentifierExpression");
            assert.contains([
                conditional.statements[0].test.left
            ], matches);
        },

        "two types descendant": function () {
            var matches = esquery(conditional, "IfStatement BinaryExpression");
            assert.contains([
                conditional.statements[0].test
            ], matches);
        },

        "two types sibling": function () {
            var matches = esquery(simpleProgram, "VariableDeclarationStatement ~ IfStatement");
            assert.contains([
                simpleProgram.statements[3]
            ], matches);
        },

        "two types adjacent": function () {
            var matches = esquery(simpleProgram, "VariableDeclarationStatement + ExpressionStatement");
            assert.contains([
                simpleProgram.statements[2]
            ], matches);
        }
    });
});
