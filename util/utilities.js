'use strict'

class Utilities {
    static capitalize(str)
    {
        return str && str[0].toUpperCase() + str.slice(1);
    }

    static map_range(value, in_low, in_high, out_low, out_high)
    {
        return out_low + (out_high - out_low) * (value - in_low) / (in_high - in_low);
    }

    static isEmpty(obj) {
        // null and undefined are not empty
        if (obj == null) return false
        if(obj === false) return false
        if(obj === true) return false
        if(obj === "") return false

        if(typeof obj === "number") {
            return false
        }

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false
        if (obj.length === 0)  return true

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false
        }

        return true
    }
}

module.exports = Utilities
