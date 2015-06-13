'use strict';
var assert = require('assert');
var t9 = require('app');

it('should return list of words of length 3', function () {
    var words = t9.retrieveWordList('228');
    assert(words.length === 3);
});

it('should return \'cat\' \'bat\' and \'act\'', function () {
    var words = t9.retrieveWordList('228');
    assert(words.indexOf('cat') > -1);
    assert(words.indexOf('bat') > -1);
    assert(words.indexOf('act') > -1);
});

it('should return an empty list', function () {
    assert(t9.retrieveWordList('9842802').length === 0);
});

it('should return mocha as part of the list', function () {
    assert(t9.retrieveWordList('66242').indexOf('mocha') > -1);
});

it ('should return empty list if empty string', function () {
    assert(t9.retrieveWordList('').length === 0);
})