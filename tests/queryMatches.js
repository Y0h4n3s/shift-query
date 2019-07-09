
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

        "conditional matches": function () {
            var matches = esquery(conditional, ":matches(IfStatement)");
            assert.contains([
                conditional.statements[0],
                conditional.statements[1].alternate
            ], matches);
        },

        "for loop matches": function () {
            var matches = esquery(forLoop, ":matches(BinaryExpression, ComputedMemberExpression)");
            assert.contains([
                forLoop.statements[0].test,
                forLoop.statements[0].body.block.statements[0].expression.callee
            ], matches);
        },

        "simple function matches": function () {
            var matches = esquery(simpleFunction, ':matches([name="foo"], ReturnStatement)');
            assert.contains([
                simpleFunction.statements[0].name,
                simpleFunction.statements[0].body.statements[2]
            ], matches);
        },

        "simple program matches": function () {
            var matches = esquery(simpleProgram, ":matches(AssignmentExpression, CompoundAssignmentExpression)");
            assert.contains([
                simpleProgram.statements[2].expression,
                simpleProgram.statements[3].consequent.block.statements[0].expression,
            ], matches);
        },

        "implicit matches": function () {
            var matches = esquery(simpleProgram, "AssignmentExpression, CompoundAssignmentExpression, NonExistant");
            assert.contains([
                simpleProgram.statements[2].expression,
                simpleProgram.statements[3].consequent.block.statements[0].expression,
            ], matches);
        }
    });
});
