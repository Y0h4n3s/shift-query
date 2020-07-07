

define(["shift-parser"], function ({ parseScript }) {

  return parseScript("class A {}\n function B() {}\n var a = 2;");

});
