'use strict'

class Utilities {
    static capitalize(str)
    {
        return str && str[0].toUpperCase() + str.slice(1);
    }

    static map_range(value, low1, high1, low2, high2)
    {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }
}

module.exports = Utilities
