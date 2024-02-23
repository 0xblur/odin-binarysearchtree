class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(arr) {
		this.root = this.buildTree(arr);
	}

	buildTree(arr) {
		//First sort the MF arr
		const sortedArr = arr.sort((a, b) => (a > b ? 1 : -1));
		const start = 0;
		const end = sortedArr.length - 1;
		const tree = balancedBSTGenerator(sortedArr, start, end);

		function balancedBSTGenerator(sortedArr, start, end) {
			if (start > end) {
				return null;
			}
			const middle = Math.floor((start + end) / 2);
			const root = new Node(sortedArr[middle]);
			root.left = balancedBSTGenerator(sortedArr, start, middle - 1);
			root.right = balancedBSTGenerator(sortedArr, middle + 1, end);
			return root;
		}
		return tree;
	}

	insert(value) {
		const node = new Node(value);
		const root = this.root;
		let current = root;
		while (true) {
			if (node.value < current.value) {
				if (current.left === null) {
					current.left = node;
					break;
				}
				current = current.left;
			} else if (node.value > current.value) {
				if (current.right === null) {
					current.right = node;
					break;
				}
				current = current.right;
			}
		}
	}

	/**
	 * @param {number} target
	 * @returns {Node|null}
	 */
	find(target, root = this.root) {
		if (!root) {
			return null;
		}

		if (root.value === target) {
			return root;
		} else if (target < root.value) {
			return this.find(target, root.left);
		} else {
			return this.find(target, root.right);
		}
	}

	findWithParent(target, root = this.root) {
		const parent = root;
		if (!root) return null;
		if (root.value === target) {
			return [parent, root];
		} else if (root.left.value === target) {
			return [parent, root.left];
		} else if (root.right.value === target) {
			return [parent, root.right];
		} else if (target < root.value) {
			return this.findWithParent(target, root.left);
		} else {
			return this.findWithParent(target, root.right);
		}
	}

	levelOrder(root = this.root, acc = [], cb = null) {
		const queu = [];
		enqueu(root, queu);
		while (queu.length !== 0) {
			dequeu(queu);
		}

		function enqueu(node, queu) {
			queu.push(node);
		}
		function dequeu(queu) {
			const node = queu.shift();
			if (node.left) {
				enqueu(node.left, queu);
			}
			if (node.right) {
				enqueu(node.right, queu);
			}
			if (cb) {
				cb(node);
			} else {
				acc.push(node);
			}
		}
		return cb || acc;
	}

	preOrder(root = this.root, acc = [], cb = console.log) {
		if (root === null) return acc;

		const value = root.value;
		if (Array.isArray(acc)) {
			acc.push(value);
    }
		if (cb) {
			cb(value);
		}
		this.preOrder(root.left, acc, cb);
		this.preOrder(root.right, acc, cb);

		return acc;
	}

	/**
	 * @param {int[]} [acc=[]] Accumulator array
	 */
	inOrder(root = this.root, acc = [], cb = null) {
		if (!root) return;

		this.inOrder(root.left, acc, cb);
		const value = root.value;
    acc.push(value)
		if (cb) {
			cb(value);
		}
		this.inOrder(root.right, acc, cb);

		return acc;
	}

	/**
	 * @returns {Array|any}
	 */
	postOrder(root = this.root, acc = [], cb = console.log) {
		if (root === null) return;

		this.postOrder(root.left, acc);
		this.postOrder(root.right, acc);
		const node = root;
		if (Array.isArray(acc)) {
			acc.push(node.value);
    }
		if (cb) {
			cb(value);
		}
		return acc;
	}

	delete(value, root = this.root) {
		const [parent, node] = this.findWithParent(value);
		//Leaf node
		if (node.left === null && node.right === null) {
			if (parent.left === node) {
				parent.left = null;
			} else {
				parent.right = null;
			}
			//Node with both children
		} else if (node.left !== null && node.right !== null) {
			//Replace with successor
			if (node.right !== null) {
				//Successor is the leftmost node of the right child
				let rightChild = node.right;
				while (rightChild.left !== null) {
					var parentOfSuccessor = rightChild;
					rightChild = rightChild.left;
				}
				const successor = rightChild;
				// In case node have no parent or is root node
				if (parent === node) {
					parent.value = successor.value;
					parentOfSuccessor.left = null;
				} else if (parent.left === node) {
					parent.left.value = successor.value;
					parentOfSuccessor.left = null;
				} else if (parent.right === node) {
					parent.right.value = successor.value;
					parentOfSuccessor.left = null;
				}
				// Else replace with predecessor
			} else if (node.left !== null) {
				//Predecessor is the rightmost node of the left child
				let leftChild = node.left;
				while (leftChild.right !== null) {
					var parentOfPredecessor = leftChild;
					leftChild = leftChild.right;
				}
				const predecessor = leftChild;
				if (parent.left === node) {
					parent.left.value = predecessor.value;
					parentOfPredecessor.right = null;
				} else {
					parent.right.value = predecessor.value;
					parentOfPredecessor.right = null;
				}
			}
			//Node with single children
		} else {
			const successor = node.left || node.right;
			if (parent.left === node) {
				parent.left = successor;
			} else {
				parent.right = successor;
			}
		}
	}

	height(root = this.root) {
		const queu = [];
		let maxHeightFound = 0;
		queu.push(root, 0);
		while (queu.length !== 0) {
			dequeu(queu);
		}

		function dequeu(queu) {
			const node = queu.shift();
			const level = queu.shift();
			if (level > maxHeightFound) {
				maxHeightFound = level;
			}
			if (node.left) {
				queu.push(node.left);
				queu.push(level + 1);
			}
			if (node.right) {
				queu.push(node.right);
				queu.push(level + 1);
			}
		}
		return maxHeightFound;
	}

  depth(target, root = this.root, counter = 0) {
		if (!root) {
			return counter
		}


		if (root.value === target) {
			return counter;
		} else if (target < root.value) {
			return this.depth(target, root.left, counter+1);
		} else {
			return this.depth(target, root.right, counter+1);
		}
  }

  isBalanced(root = this.root) {
    if (Math.abs(this.height(root.left) - this.height(root.right)) > 1) {
      return false
    }
    return true
  }

  rebalance() {
    const sorted_arr = this.inOrder(this.root)
    this.root = this.buildTree(sorted_arr)
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

function createRandomArr() {
  const arr = [];
  while (arr.length <= 15) {
    const number = Math.floor(Math.random() * 100)
    arr.push(number)
  }
  return arr
}

function unBalanceTree(tree) {
  for (let i = 0; i < 15; i++) {
    const number = Math.floor(Math.random() * 500 + 100)
    tree.insert(number)
  }
}

const randomArr = createRandomArr()
const t = new Tree(randomArr);
console.log(t.isBalanced())
prettyPrint(t.root)
unBalanceTree(t)
prettyPrint(t.root)
console.log(t.isBalanced())
t.rebalance()
prettyPrint(t.root)
console.log(t.isBalanced())
