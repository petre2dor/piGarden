'use strict'

class Utilities {
    static capitalize(str)
    {
        return str && str[0].toUpperCase() + str.slice(1);
    }
}

module.exports = Utilities
