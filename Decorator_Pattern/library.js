// Object Decorator Pattern
// Used closure for move method
// Closure spans function body which is able to access
// outward variables successfully, in this case, obj
// and loc.
var carlike = function(obj, loc) {
    obj.loc = loc;
    obj.move = function() { obj.loc++; };
    return obj;
}