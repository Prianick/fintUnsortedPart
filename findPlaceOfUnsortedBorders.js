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

function arrayIsSorted (arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Если рассматривать эту формулировку https://gist.github.com/rusdevops/d85340e26aeac720c338874492adf637#gistcomment-3799156
 * тогда будем искать в каких крахних позитций поменяются числа после сортировки.
 *
 * Привет!
 * Дам другую формулировку данной задачи.
 *
 * Нужно вернуть индексы левого и правого концов закрытого интервала,
 * значения которых измениться если отсортировать исходный массив:
 *
 * 0 1 2 3 4 5 <- индексы
 * -----------
 * 1 4 3 2 3 4 <- исходный массив
 * 1 2 3 3 4 4 <- массив после сортировки
 * i     j
 * ответ: [1, 4]
 *
 *
 * @param arr
 * @returns {number[]|*[]}
 */
function findUnsortedBorders (arr) {
    if (arrayIsSorted(arr)) {
        return [-1, -1];
    }

    let sortedArr = arr.map(x => x);
    sortedArr.sort(function (a, b) {
        return a - b;
    });
    let location = [];

    if (arr.length == 0) {
        return [];
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != sortedArr[i]) {
            location[0] = i;
            break;
        }
    }

    if (location[0] == undefined) {
        return [-1, -1];
    }

    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] != sortedArr[i]) {
            location[1] = i;
            break;
        }
    }
    return location;
}

for (let id in arrays) {
    console.log('------------------------------------');
    let location = findUnsortedBorders(arrays[id]);
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
        console.log('>>> unsorted part', arrays[id].slice(location[0], location[1]));
        console.log('>>> sorted part', arrays[id].slice(0, location[0]), arrays[id].slice(location[1]));
        console.log('>>> location of unsorted array', location);
    }
    console.log('------------------------------------');
}