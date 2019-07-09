define(["shift-parser"], function ({parseScript}) {

    return parseScript(
        '[1, 2, 3, foo, bar, 4, 5, baz, qux, 6]'
    );

});
