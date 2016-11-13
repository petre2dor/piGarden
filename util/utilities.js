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
}

module.exports = Utilities
