
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
    "./fixtures/forLoop",
    "./fixtures/simpleFunction",
    "./fixtures/simpleProgram"
], function (esquery, assert, test, conditional, forLoop, simpleFunction, simpleProgram) {

    test.defineSuite("Pseudo *-child query", {

        "conditional first child": function () {
            var matches = esquery(conditional, ":first-child");
            assert.contains([
                conditional.statements[0],
                conditional.statements[0].consequent.block.statements[0],
                conditional.statements[0].alternate.block.statements[0],
                conditional.statements[1].consequent.block.statements[0],
                conditional.statements[1].alternate.consequent.block.statements[0]
            ], matches);
        },

        "conditional last child": function () {
            var matches = esquery(conditional, ":last-child");
            assert.contains([
                conditional.statements[1],
                conditional.statements[0].consequent.block.statements[0],
                conditional.statements[0].alternate.block.statements[0],
                conditional.statements[1].consequent.block.statements[0],
                conditional.statements[1].alternate.consequent.block.statements[0]
            ], matches);
        },

        "conditional nth child": function () {
            var matches = esquery(conditional, ":nth-child(2)");
            assert.contains([
                conditional.statements[1]
            ], matches);

            matches = esquery(conditional, ":nth-last-child(2)");
            assert.contains([
                conditional.statements[0]
            ], matches);
        },

        "for loop first child": function () {
            var matches = esquery(forLoop, ":first-child");
            assert.contains([
                forLoop.statements[0],
                forLoop.statements[0].body.block.statements[0]
            ], matches);
        },

        "for loop last child": function () {
            var matches = esquery(forLoop, ":last-child");
            assert.contains([
                forLoop.statements[0],
                forLoop.statements[0].body.block.statements[0]
            ], matches);
        },

        "for loop nth child": function () {
            var matches = esquery(forLoop, ":nth-last-child(1)");
            assert.contains([
                forLoop.statements[0],
                forLoop.statements[0].body.block.statements[0]
            ], matches);
        },

        "simple function first child": function () {
            var matches = esquery(simpleFunction, ":first-child");
            assert.contains([
                simpleFunction.statements[0],
                simpleFunction.statements[0].params.items[0],
                simpleFunction.statements[0].body.statements[0],
                simpleFunction.statements[0].body.statements[0].declaration.declarators[0]
            ], matches);
        },

        "simple function last child": function () {
            var matches = esquery(simpleFunction, ":last-child");
            assert.contains([
                simpleFunction.statements[0],
                simpleFunction.statements[0].params.items[1],
                simpleFunction.statements[0].body.statements[2],
                simpleFunction.statements[0].body.statements[0].declaration.declarators[0]
            ], matches);
        },

        "simple function nth child": function () {
            var matches = esquery(simpleFunction, ":nth-child(2)");
            assert.contains([
                simpleFunction.statements[0].params.items[1],
                simpleFunction.statements[0].body.statements[1]
            ], matches);

            matches = esquery(simpleFunction, ":nth-child(3)");
            assert.contains([
                simpleFunction.statements[0].body.statements[2]
            ], matches);

            matches = esquery(simpleFunction, ":nth-last-child(2)");
            assert.contains([
                simpleFunction.statements[0].params.items[0],
                simpleFunction.statements[0].body.statements[1]
            ], matches);
        },

        "simple program first child": function () {
            var matches = esquery(simpleProgram, ":first-child");
            assert.contains([
                simpleProgram.statements[0],
                simpleProgram.statements[0].declaration.declarators[0],
                simpleProgram.statements[1].declaration.declarators[0],
                simpleProgram.statements[3].consequent.block.statements[0]
            ], matches);
        },

        "simple program last child": function () {
            var matches = esquery(simpleProgram, ":last-child");
            console.log(matches);
            assert.contains([
                simpleProgram.statements[3],
                simpleProgram.statements[0].declaration.declarators[0],
                simpleProgram.statements[1].declaration.declarators[0],
                simpleProgram.statements[3].consequent.block.statements[0]
            ], matches);
        },

        "simple program nth child": function () {
            var matches = esquery(simpleProgram, ":nth-child(2)");
            assert.contains([
                simpleProgram.statements[1]
            ], matches);

            matches = esquery(simpleProgram, ":nth-child(3)");
            assert.contains([
                simpleProgram.statements[2]
            ], matches);

            matches = esquery(simpleProgram, ":nth-last-child(2)");
            assert.contains([
                simpleProgram.statements[2]
            ], matches);
        }
    });
});
