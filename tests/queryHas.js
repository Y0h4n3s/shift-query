
define([
    "shift-query",
    "jstestr/assert",
    "jstestr/test",
    "./fixtures/conditional"
], function (esquery, assert, test, conditional) {

    test.defineSuite("Parent selector query", {

        "conditional": function () {
            var matches = esquery(conditional, 'ExpressionStatement:has([name="foo"][type="IdentifierExpression"])');
            assert.isEqual(1, matches.length);
        },

        "one of": function () {
            var matches = esquery(conditional, 'IfStatement:has(BinaryExpression [name="foo"], BinaryExpression [name="x"])');
            assert.isEqual(2, matches.length);
        },

        "chaining": function () {
            var matches = esquery(conditional, 'BinaryExpression:has(IdentifierExpression[name="x"]):has(LiteralStringExpression[value="test"])');
            assert.isEqual(3, matches.length);
        },

        "nesting": function () {
            var matches = esquery(conditional, 'Script:has(IfStatement:has(LiteralBooleanExpression[value=true], LiteralBooleanExpression[value=false]))');
            assert.isEqual(1, matches.length);
        },

        "non-matching": function () {
            var matches = esquery(conditional, ':has([value="impossible"])');
            assert.isEqual(0, matches.length);
        }

    });
});
