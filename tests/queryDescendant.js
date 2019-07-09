define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional",
], function (esquery, assert, test, conditional) {

    test.defineSuite("Pseudo matches query", {

        "conditional matches": function () {
            var matches = esquery(conditional, "Script IfStatement");
            assert.contains([
                conditional.statements[0],
                conditional.statements[1],
                conditional.statements[1].alternate
            ], matches);
        },

        "#8: descendant selector includes ancestor in search": function() {
            var matches = esquery(conditional, "IdentifierExpression[name=x]");
            assert.isSame(3, matches.length);
            matches = esquery(conditional, "IdentifierExpression [name=x]");
            assert.isSame(0, matches.length);
            matches = esquery(conditional, "BinaryExpression [name=x]");
            assert.isSame(3, matches.length);
            matches = esquery(conditional, "AssignmentExpression [name=x]");
            assert.isSame(1, matches.length);
        }

    });
});
