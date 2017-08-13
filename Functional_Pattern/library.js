// Functional Class Pattern
// Function is defined outside to prevent duplicating it for every object.
// obj is setting up a prototype chain to methods property.
var Car = function(loc) {
    var obj = Object.create(Car.prototype);
    obj.loc = loc;
    return obj;
};

Car.prototype.move = function() {
    this.loc++;
};