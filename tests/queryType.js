
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
    "./fixtures/forLoop",
    "./fixtures/simpleFunction",
    "./fixtures/simpleProgram"
], function (esquery, assert, test, conditional, forLoop, simpleFunction, simpleProgram) {

    test.defineSuite("Type query", {

        "conditional": function () {
            var matches = esquery(conditional, "Script");
            assert.contains([conditional], matches);

            matches = esquery(conditional, "IfStatement");
            assert.contains([
                conditional.statements[0],
                conditional.statements[1],
                conditional.statements[1].alternate
            ], matches);

            matches = esquery(conditional, "BinaryExpression");
            assert.contains([
                conditional.statements[1].test,
                conditional.statements[1].test.left
            ], matches);

            matches = esquery(conditional, "ExpressionStatement");
            assert.contains([
                conditional.statements[0].consequent.block.statements[0],
                conditional.statements[0].alternate.block.statements[0],
                conditional.statements[1].consequent.block.statements[0],
                conditional.statements[1].alternate.consequent.block.statements[0]
            ], matches);
        },

        "for loop": function () {
            var matches = esquery(forLoop, "Script");
            assert.contains([forLoop], matches);

            matches = esquery(forLoop, "ForStatement");
            assert.contains([
                forLoop.statements[0]
            ], matches);

            matches = esquery(forLoop, "BinaryExpression");
            assert.contains([
                forLoop.statements[0].test
            ], matches);
        },

        "simple function": function () {
            var matches = esquery(simpleFunction, "Script");
            assert.contains([simpleFunction], matches);

            matches = esquery(simpleFunction, "VariableDeclarationStatement");
            assert.contains([
                simpleFunction.statements[0].body.statements[0]
            ], matches);

            matches = esquery(simpleFunction, "FunctionDeclaration");
            assert.contains([
                simpleFunction.statements[0]
            ], matches);

            matches = esquery(simpleFunction, "ReturnStatement");
            assert.contains([
                simpleFunction.statements[0].body.statements[2]
            ], matches);
        },

        "simple program": function () {
            var matches = esquery(simpleProgram, "Script");
            assert.contains([simpleProgram], matches);

            matches = esquery(simpleProgram, "VariableDeclarationStatement");
            assert.contains([
                simpleProgram.statements[0],
                simpleProgram.statements[1]
            ], matches);

            matches = esquery(simpleProgram, "AssignmentExpression");
            assert.contains([
                simpleProgram.statements[2].expression,
            ], matches);

            matches = esquery(simpleProgram, "CompoundAssignmentExpression");
            assert.contains([
                simpleProgram.statements[3].consequent.block.statements[0].expression
            ], matches);

            matches = esquery(simpleProgram, "BindingIdentifier");
            assert.contains([
                simpleProgram.statements[0].declaration.declarators[0].binding,
                simpleProgram.statements[1].declaration.declarators[0].binding,
            ], matches);
        },

        "# type": function () {
            var matches = esquery(forLoop, "#Script");
            assert.contains([
                forLoop
            ], matches);

            matches = esquery(forLoop, "#ForStatement");
            assert.contains([
                forLoop.statements[0]
            ], matches);

            matches = esquery(forLoop, "#BinaryExpression");
            assert.contains([
                forLoop.statements[0].test
            ], matches);
        },

        "case insensitive type": function () {
            var matches = esquery(forLoop, "Script");
            assert.contains([
                forLoop
            ], matches);

            matches = esquery(forLoop, "forStatement");
            assert.contains([
                forLoop.statements[0]
            ], matches);

            matches = esquery(forLoop, "binaryexpression");
            assert.contains([
                forLoop.statements[0].test
            ], matches);
        }
    });
});
