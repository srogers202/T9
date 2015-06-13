module.exports = function(dictionary, digitCharMap) {

    // processed vars
    var digitsWordMap = {},
    charDigitMap = {};

    // reverse input mapping of digits to chars
    var reverseDigitCharMap = function() {
        if (typeof digitCharMap !== 'object') {
            throw 'Invalid input: Digit-Char Map';
        }

        charDigitMap = {};

        // iterate over each digit in map (2, 3, 4, ...)
        for (var digit in digitCharMap) {
            if (digitCharMap.hasOwnProperty(digit)) {

                // iterate over all chars for each digit ('a', 'b', 'c', ...)
                var chars = digitCharMap[digit];
                for (var i = 0; i < chars.length; i++) {

                    // store the mapping of char to digit (1to1) 
                    /// {'a': 2, 'b': 2, 'c': 2, 'd': 3, ...}
                    charDigitMap[chars[i]] = digit;
                }
            }
        }
    }

    // store a mapping for each possible digits key (i.e. '228': ['cat', ...])
    // in this example, the mapping is stored in memory, but ideally this will
    // be stored in a DB or persistent cache. A service like Redis would work
    // well for this
    var processDictionary = function() {
        if (typeof dictionary !== 'object') {
            throw "Invalid input: dictionary";
        }

        // iterate over all words in dictionary
        for (var i = 0; i < dictionary.length; i++) {
            // make sure the word is a string
            if (typeof dictionary[i] !== 'string') {
                continue;
            }

            var word = dictionary[i],
                digitsKey = '';

            // iterate over each char in the word
            for (var j = 0; j < word.length; j++) {

                // look up digit for each char and appened to digitsKey
                digitsKey += charDigitMap[word[j]];
            }

            // create array for each digitsKey on demand
            digitsWordMap[digitsKey] = digitsWordMap[digitsKey] || [];

            // store word in array for digitsKey
            digitsWordMap[digitsKey].push(word);
        }
    }

    // this will be the method used by the UI. It runs extremely efficiently
    // because it is doing a simple hash lookup ( O(c) )
    var retrieveWordList = function(digitsKey) {
        return digitsWordMap[digitsKey] || [];
    }
    
    // initialize
    reverseDigitCharMap();
    processDictionary();

    // expose API
    return {
        'retrieveWordList': retrieveWordList
    };
}