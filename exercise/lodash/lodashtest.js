var _ =require('lodash');

var a1=_.chunk(['a','b','c','d'],2);
// → { ['a','b'],['c','d']}
var a2=_.chunk(['a','b','c','d'],3);
// → {['a','b','c'],['d']}
var b1=_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });
// → { 'a': 1, 'b': 2 }
var b2=_.partition([1, 2, 3, 4], n => n % 2);
// → [[1, 3], [2, 4]]
console.log('a1',a1)
console.log('a2',a2)
console.log('b1',b1)
console.log('b2',b2)