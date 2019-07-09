define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
    "./fixtures/forLoop",
    "./fixtures/simpleFunction",
    "./fixtures/simpleProgram",
    "./fixtures/nestedFunctions",
    "./fixtures/bigArray"
], function (esquery, assert, test, conditional, forLoop, simpleFunction, simpleProgram, nestedFunctions, bigArray) {

    test.defineSuite("Query subject", {

        // TODO this actually seems broken, need to fix.
        "//type subject": function () {
            var matches = esquery(conditional, "!IfStatement IdentifierExpression");

            assert.contains([
                conditional.statements[0],
                conditional.statements[1],
                conditional.statements[1].alternate
            ], matches);
        },

        "* subject": function () {
            var matches = esquery(forLoop, '!* > [name="foo"]');
            assert.contains([
                forLoop.statements[0].test.right,
                forLoop.statements[0].body.block.statements[0].expression.callee
            ], matches);
        },

        ":nth-child subject": function () {
            var matches = esquery(simpleFunction, '!:nth-child(1) [name="y"]');
            assert.contains([
                simpleFunction.statements[0],
                simpleFunction.statements[0].body.statements[0],
                simpleFunction.statements[0].body.statements[0].declaration.declarators[0]
            ], matches);
        },

        ":nth-last-child subject": function () {
            var matches = esquery(simpleProgram, '!:nth-last-child(1) [name="y"]');
            assert.contains([
                simpleProgram.statements[3],
                simpleProgram.statements[1].declaration.declarators[0],
                simpleProgram.statements[3].consequent.block.statements[0]
            ], matches);
        },

        "attribute literal subject": function () {
            var matches = esquery(simpleProgram, '![test] [name="y"]');
            assert.contains([
                simpleProgram.statements[3]
            ], matches);
        },

        "attribute type subject": function () {
            var matches = esquery(nestedFunctions, '![isGenerator=type(boolean)] > FunctionBody');
            assert.contains([
                nestedFunctions.statements[0],
                nestedFunctions.statements[0].body.statements[1]
            ], matches);
        },

        "attribute regexp subject": function () {
            var matches = esquery(conditional, '![operator=/=+/] > [name="x"]');
            assert.contains([
                conditional.statements[0].test,
                conditional.statements[1].test.left.left
            ], matches);
        },

        "field subject": function () {
            var matches = esquery(forLoop, '!.test');
            assert.contains([
                forLoop.statements[0].test
            ], matches);
        },

        ":matches subject": function () {
            var matches = esquery(forLoop, '!:matches(*) > [name="foo"]');
            assert.contains([
                forLoop.statements[0].test.right,
                forLoop.statements[0].body.block.statements[0].expression.callee
            ], matches);
        },

        ":not subject": function () {
            var matches = esquery(nestedFunctions, '!:not(BlockStatement) > [name="foo"]');
            assert.contains([
                nestedFunctions.statements[0]
            ], matches);
        },

        "compound attributes subject": function () {
            var matches = esquery(conditional, '![left.name="x"][right.value=1]');
            assert.contains([
                conditional.statements[0].test
            ], matches);
        },

        "decendent right subject": function () {
            var matches = esquery(forLoop, '* !AssignmentExpression');
            assert.contains([
                forLoop.statements[0].init
            ], matches);
        },

        "child right subject": function () {
            var matches = esquery(forLoop, '* > !AssignmentExpression');
            assert.contains([
                forLoop.statements[0].init
            ], matches);
        },

        "sibling left subject": function () {
            var matches = esquery(simpleProgram, "!VariableDeclarationStatement ~ IfStatement");
            assert.contains([
                simpleProgram.statements[0],
                simpleProgram.statements[1]
            ], matches);
        },

        "sibling right subject": function () {
            var matches = esquery(simpleProgram, "!VariableDeclarationStatement ~ !IfStatement");
            assert.contains([
                simpleProgram.statements[0],
                simpleProgram.statements[1],
                simpleProgram.statements[3]
            ], matches);
        },

        "adjacent right subject": function () {
            var matches = esquery(simpleProgram, "!VariableDeclarationStatement + !ExpressionStatement");
            assert.contains([
                simpleProgram.statements[1],
                simpleProgram.statements[2]
            ], matches);
        },

        "multiple adjacent siblings": function () {
            var matches = esquery(bigArray, "IdentifierExpression + IdentifierExpression");
            assert.contains([
                bigArray.statements[0].expression.elements[4],
                bigArray.statements[0].expression.elements[8]
            ], matches);
            assert.isSame(2, matches.length);
        },

        "multiple siblings": function () {
            var matches = esquery(bigArray, "IdentifierExpression ~ IdentifierExpression");
            assert.contains([
                bigArray.statements[0].expression.elements[4],
                bigArray.statements[0].expression.elements[7],
                bigArray.statements[0].expression.elements[8]
            ], matches);
            assert.isSame(3, matches.length);
        }
    });
});
