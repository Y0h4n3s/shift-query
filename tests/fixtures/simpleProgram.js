define(["shift-parser"], function ({parseScript}) {

    return parseScript(`
        var x = 1;
        var y = 'y';
        x = x * 2;
        if (y) { y += 'z'; }
    `);

});
