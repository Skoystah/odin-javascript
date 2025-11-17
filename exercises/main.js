// arr = [1, 2, 3, 4]
// const sum = (a, b) => { return a + b; }
// const isEven = a => { return a % 2 === 0; }
// const triple = a => { return a * 3; }
//
//
// function sumOfTripledEvens(arr) {
//     return (arr.filter(isEven).map(triple).reduce(sum));
// }
//
//
// console.log(sumOfTripledEvens(arr));


// const capitalize = (word) => {
//     if (!word) {
//         return '';
//     }
//
//     return word.slice(0, 1).toUpperCase() +
//         word.slice(1).toLowerCase();
// }
//
// const camelize = (s) => {
//     arr = s.split('-');
//     for (let i = 1; i < s.length; i++) {
//         arr[i] = capitalize(arr[i]);
//     }
//     return arr.join('');
// }
//
//
// console.log(camelize("this-is-not-camel"))
// console.log(camelize("-this-is-not-camel"))


// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };
//
// let arr = [pete, john, mary];
//
// function sortByAge(arr) {
//     return arr.sort((p1, p2) => {
//         return p1.age < p2.age ? -1 : p1.age > p2.age ? +1 : 0;
//     });
// }
// console.log(arr);
// console.log(sortByAge(arr));


let arr = [1, 2, 3, 4];

function getRandomInt(min, max) {
    // const minCeiled = Math.ceil(min);
    // const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function shuffle(arr) {
    let shuffled = [];

    let indexes = new Set();
    while (indexes.size < arr.length) {
        let index = getRandomInt(0, arr.length);
        indexes.add(index);
    }

    for (const index of indexes) {
        shuffled.push(arr[index]);
    }
    return shuffled;
}

console.log(shuffle(arr));


