define(["shift-parser"], function ({parseScript}) {

    return parseScript("for (i = 0; i < foo.length; i++) { foo[i](); }");

});
