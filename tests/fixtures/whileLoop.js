define(["shift-parser"], function ({parseScript}) {

    return parseScript(
        "x = 10;\n" +
        "while (x > 0) { x--; }"
    );

});
