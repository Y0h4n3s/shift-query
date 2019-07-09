define(["shift-parser"], function ({parseScript}) {

    return parseScript(
`
function foo() {
    var x = 1;
    function bar() {
      x = 2;
    }
  }
  `
    );

});
