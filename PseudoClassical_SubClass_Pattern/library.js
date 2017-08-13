// Pseudoclassical Subclass Pattern
var Car = function(loc) {
    this.loc = loc;
};

Car.prototype.move = function() {
    this.loc++;
};

var Van = function(loc) {
    Car.call(this, loc);
};

Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van;
Van.prototype.grab = function() { /*...*/ };