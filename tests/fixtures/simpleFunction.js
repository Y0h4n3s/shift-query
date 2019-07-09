define(["shift-parser"], function ({parseScript}) {

    return parseScript(`
    function foo(x, y) {
        var z = x + y;
        z++;
        return z;
      }    `
    );

});
