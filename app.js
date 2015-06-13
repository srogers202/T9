/**

    usage:

    var T9 = require('app');
    var t9 = T9(); // loads the word list dictionary

    t9.retrieveWordList('228');

**/
module.exports = function() {

    // load dictionary
    var wordListJson = require('word-list-json');

    // create digit char map
    var digitCharMap = { 2: ['a', 'b', 'c'], 
                         3: ['d', 'e', 'f'], 
                         4: ['g', 'h', 'i'],
                         5: ['j', 'k', 'l'],
                         6: ['m', 'n', 'o'],
                         7: ['p', 'q', 'r', 's'],
                         8: ['t', 'u', 'v'],
                         9: ['w', 'x', 'y', 'z']
                   };

    // pull in t9 module
    var t9 = require('t9');

    // instantiate t9
    var myT9 = t9(wordListJson, digitCharMap);

    // return public method
    return {
        retrieveWordList: myT9.retrieveWordList
    };
}