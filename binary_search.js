someArr = [4, 12, 21, 33, 55, 88, 89, 101];
function binarySearch(arr, target) {
	let start = 0;
	let end = arr.length;
	while (true) {
		const workingArr = arr.slice(start, end);
		const middle = Math.floor(workingArr.length / 2);
		if (workingArr[middle] === target) {
			return start + middle;
		} else if (workingArr[middle] < target) {
			start += middle + 1;
			continue;
		} else if (workingArr[middle] > target) {
			end -= middle;
			continue;
		} else {
			break;
		}
	}
}
