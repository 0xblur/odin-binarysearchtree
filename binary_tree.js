const someArr = [41, 21, 66, 13, 43, 23, 83, 104, 33, 23];

function createBinaryTreeRecursive(arr) {
	const root = new Node(arr[0]);
	for (let i = 1; i < arr.length; i++) {
		insertNode(root, new Node(arr[i]));
	}
	return root;
}

class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

function insertNode(parent, child) {
	if (child.value < parent.value) {
		if (parent.left === null) {
			parent.left = child;
		} else {
			insertNode(parent.left, child);
		}
	} else if (child.value >= parent.value) {
		if (parent.right === null) {
			parent.right = child;
		} else {
			insertNode(parent.right, child);
		}
	}
}

console.log(createBinaryTreeRecursive(someArr));
