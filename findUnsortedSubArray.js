let arrays = {
    1: [1, 2, 3, 5, 6, 7, 9, 8, 4, 3, 4, 33, 41],
    2: [1, 2, 2, 345, 345, 65, 46, 45, 73, 34, 7, 9, 8, 4, 3, 4, 33, 41],
    3: [9, 5, 5, 2, 3, 5, 6, 7, 9, 8, 4, 3, 4, 33, 41],
    4: [4, 6, 3, 5, 6, 347, 95, 6, 8, 4, 3, 4, 33, 41],
    5: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    6: [7, 6, 5, 4, 3, 3, 2, 1],
    7: [],
    8: [1],
    9: [2, 2, 2, 2, 2],
    10: [3, 2, 1],
    11: [1, 4, 3, 2, 3, 4],
    12: [1, 4, 3, 6, 2, 3, 4]
};

/**
 * XVII Задача о поиске не отсортированного подмассива ⭐⭐
 *
 * Дана коллекция частично отсортированных целых неотрицательных чисел
 * Нужно реализовать алгоритм поиска не отсортированного подмассива
 *
 * func findUnsortedSubarray(array []uint) (left uint, right uint)
 *
 * Если исходить из исловия задачи, то можно считать массив из обного число отсортированным массивом.
 * Таком образом получается, что в массиве [3,2,1], массив [3] отсортирован и координаты не отсортированного массива будут [1,2].
 * В условии не сказано в какую торону должен быть отсортирован массив, поэтому будем решать эту задачу с условием,
 * что массив должен быть отсортирован по возростанию.
 *
 *
 * @param arr
 * @returns {number[]|*[]}
 */
function findUnsortedPart (arr) {
    let location = [];
    if (arr.length == 1) {
        return [-1, -1];
    }
    if (arr.length == 0) {
        return [0, 0];
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
            location.push(i + 1);
            break;
        }
    }
    if (location[0] == undefined) {
        return [-1, -1];
    }

    for (let j = arr.length - 1; j > location[0]; j--) {
        if (arr[location[0]] > arr[j]) {
            location.push(j);
            break;
        }
        if (arr[j] < arr[j - 1] || arr[location[0] - 1] > arr[j - 1]) {
            location.push(j - 1);
            break;
        }
    }
    return location;
}

for (let id in arrays) {
    console.log('------------------------------------');
    let location = findUnsortedPart(arrays[id]);
    if (location[0] < 0) {
        console.log('>>> source array', arrays[id]);
        console.log('>>> array is sorted');
    }
    else if (location == []) {
        console.log('>>> source array', arrays[id]);
        console.log('>>> array is empty');
    }
    else {
        console.log('>>> source array', arrays[id]);
        console.log('>>> unsorted part', arrays[id].slice(location[0], location[1] + 1));
        console.log('>>> sorted part', arrays[id].slice(0, location[0]), arrays[id].slice(location[1] + 1));
        console.log('>>> location of unsorted array', location);
    }
    console.log('------------------------------------');
}
