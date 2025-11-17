const removeFromArray = function(arr, ele) {
    index = arr.indexOf(ele);
    return index === -1 ? arr : arr.slice(0, index).concat(arr.slice(index + 1));
};

// Do not edit below this line
module.exports = removeFromArray;
