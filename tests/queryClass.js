
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/allClasses"
], function (esquery, assert, test, ast) {

    test.defineSuite("Class query", {

        ":statement": function () {
            var matches = esquery(ast, ":statement");
            assert.contains([
              ast.statements[0],
              ast.statements[0].body.statements[0],
              ast.statements[0].body.statements[1],
              ast.statements[0].body.statements[2],
              ast.statements[0].body.statements[3]
            ], matches);
            assert.isSame(5, matches.length);
        },

        ":expression": function () {
            var matches = esquery(ast, ":Expression");
            assert.contains([
              ast.statements[0].body.statements[0].expression,
              ast.statements[0].body.statements[0].expression.expression,
              ast.statements[0].body.statements[0].expression.expression.body,
              ast.statements[0].body.statements[1].expression,
              ast.statements[0].body.statements[2].expression,
              ast.statements[0].body.statements[3].expression,
              ast.statements[0].body.statements[3].expression.elements[1]
            ], matches);
            assert.isSame(7, matches.length);
        },

        ":function": function () {
            var matches = esquery(ast, ":FUNCTION");
            assert.contains([
              ast.statements[0],
              ast.statements[0].body.statements[0].expression.expression
            ], matches);
            assert.isSame(2, matches.length);
        },

        ":declaration": function () {
            var matches = esquery(ast, ":declaratioN");
            assert.contains([
              ast.statements[0]
            ], matches);
            assert.isSame(1, matches.length);
        },

        ":target": function () {
            var matches = esquery(ast, ":taRGet");
            assert.contains([
              ast.statements[0].body.statements[0].expression.binding,
            ], matches);
            assert.isSame(1, matches.length);
        }

    });
});
