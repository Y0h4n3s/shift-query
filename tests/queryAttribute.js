
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
    "./fixtures/forLoop",
    "./fixtures/simpleFunction",
    "./fixtures/simpleProgram"
], function (esquery, assert, test, conditional, forLoop, simpleFunction, simpleProgram) {

    test.defineSuite("Attribute query", {

        "conditional": function () {
            var matches = esquery(conditional, "[name=\"x\"]");
            assert.contains([
                conditional.statements[0].test.left,
                conditional.statements[0].alternate.block.statements[0].expression.binding,
                conditional.statements[1].test.left.left.left,
                conditional.statements[1].test.right
            ], matches);

            matches = esquery(conditional, "[callee.name=\"foo\"]");
            assert.contains([
                conditional.statements[0].consequent.block.statements[0].expression
            ], matches);

            matches = esquery(conditional, "[operator]");
            assert.contains([
                conditional.statements[0].test,
                conditional.statements[1].test,
                conditional.statements[1].test.left,
                conditional.statements[1].consequent.block.statements[0].expression.expression,
                conditional.statements[1].test.left.left
            ], matches);

            matches = esquery(conditional, "[value=false]");
            assert.contains([
                conditional.statements[1].alternate.test
            ], matches);
        },

        "for loop": function () {
            var matches = esquery(forLoop, "[operator=\"<\"]");
            assert.contains([
                forLoop.statements[0].test
            ], matches);

            var matches = esquery(forLoop, "[object.name=\"foo\"]");
            assert.contains([
                forLoop.statements[0].test.right
            ], matches);

            matches = esquery(forLoop, "[operator]");
            assert.contains([
                forLoop.statements[0].test,
                forLoop.statements[0].update
            ], matches);
        },

        "simple function": function () {
            var matches = esquery(simpleFunction, "[kind=\"var\"]");
            assert.contains([
                simpleFunction.statements[0].body.statements[0].declaration
            ], matches);

            matches = esquery(simpleFunction, "[name.name=\"foo\"]");
            assert.contains([
                simpleFunction.statements[0]
            ], matches);

            matches = esquery(simpleFunction, "[binding]");
            assert.contains([
                simpleFunction.statements[0].body.statements[0].declaration.declarators[0]
            ], matches);
        },

        "simple program": function () {
            var matches = esquery(simpleProgram, "[kind=\"var\"]");
            assert.contains([
                simpleProgram.statements[0].declaration,
                simpleProgram.statements[1].declaration
            ], matches);

            matches = esquery(simpleProgram, "[binding.name=\"y\"]");
            assert.contains([
                simpleProgram.statements[1].declaration.declarators[0]
            ], matches);

            matches = esquery(simpleProgram, "[block]");
            assert.contains([
                simpleProgram.statements[3].consequent
            ], matches);
        },

        "conditional regexp": function () {
            var matches = esquery(conditional, "[name=/x|foo/]");
            assert.contains([
                conditional.statements[0].test.left,
                conditional.statements[0].consequent.block.statements[0].expression.callee,
                conditional.statements[0].alternate.block.statements[0].expression.binding
            ], matches);
        },

        "simple function regexp": function () {
            var matches = esquery(simpleFunction, "[name=/x|foo/]");
            assert.contains([
                simpleFunction.statements[0].name,
                simpleFunction.statements[0].params.items[0],
            ], matches);
        },

        "simple function numeric": function () {
            var matches = esquery(simpleFunction, "FunctionDeclaration[params.items.0.name=x]");
            assert.contains([
                simpleFunction.statements[0]
            ], matches);
        },

        "simple program regexp": function () {
            var matches = esquery(simpleProgram, "[name=/[asdfy]/]");
            assert.contains([
                simpleProgram.statements[1].declaration.declarators[0].binding,
                simpleProgram.statements[3].test,
                simpleProgram.statements[3].consequent.block.statements[0].expression.binding
            ], matches);
        },

        "for loop regexp": function () {
            var matches = esquery(forLoop, "[name=/i|foo/]");
            assert.contains([
                forLoop.statements[0].init.binding,
                forLoop.statements[0].test.left,
                forLoop.statements[0].test.right.object,
                forLoop.statements[0].update.operand,
                forLoop.statements[0].body.block.statements[0].expression.callee.object,
                forLoop.statements[0].body.block.statements[0].expression.callee.expression
            ], matches);
        },

        "nonexistent attribute regexp": function () {
            var matches = esquery(conditional, '[foobar=/./]');
            assert.isSame(0, matches.length);
        },

        // TODO: This test seems bad. Shouldn't this query return much more than two nodes?
        "//not string": function () {
            var matches = esquery(conditional, '[name!="x"]');
            assert.contains([
                conditional.statements[0].consequent.block.statements[0].expression.callee,
                conditional.statements[1].consequent.block.statements[0].expression.binding
            ], matches);
        },

        "not type": function () {
            var matches = esquery(conditional, '[value!=type(number)]');
            assert.contains([
                conditional.statements[1].test.left.left.right,
                conditional.statements[1].test.left.right,
                conditional.statements[1].alternate
            ], matches);
        },

        "not regexp": function () {
            var matches = esquery(conditional, '[name!=/x|y/]');
            assert.contains([
                conditional.statements[0].consequent.block.statements[0].expression.callee
            ], matches);
        },

        "less than": function () {
            var matches = esquery(conditional, "[statements.length<2]");
            assert.contains([
                conditional.statements[0].consequent.block,
                conditional.statements[0].alternate.block,
                conditional.statements[1].consequent.block,
                conditional.statements[1].alternate.consequent.block
            ], matches);
        },

        "greater than": function () {
            var matches = esquery(conditional, "[statements.length>1]");
            assert.contains([
                conditional
            ], matches);
        },

        "less than or equal": function () {
            var matches = esquery(conditional, "[statements.length<=2]");
            assert.contains([
                conditional,
                conditional.statements[0].consequent.block,
                conditional.statements[0].alternate.block,
                conditional.statements[1].consequent.block,
                conditional.statements[1].alternate.consequent.block
            ], matches);
        },

        "greater than or equal": function () {
            var matches = esquery(conditional, "[statements.length>=1]");
            assert.contains([
                conditional,
                conditional.statements[0].consequent.block,
                conditional.statements[0].alternate.block,
                conditional.statements[1].consequent.block,
                conditional.statements[1].alternate.consequent.block
            ], matches);
        },

        "attribute type": function () {
            var matches = esquery(conditional, "[test=type(object)]");
            assert.contains([
                conditional.statements[0],
                conditional.statements[1],
                conditional.statements[1].alternate
            ], matches);

            matches = esquery(conditional, "[value=type(boolean)]");
            assert.contains([
                conditional.statements[1].test.left.right,
                conditional.statements[1].alternate.test
            ], matches);
        }
    });
});
