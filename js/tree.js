var nodes = [
	{
		"id": 1,
		"parentId": 0,
		"text": "You wake up lying down in a field.",
		"message":"",
		"level": 1,
		"children": null
	},
	{
		"id": 2,
		"parentId": 1,
		"text": "Sit up.",
		"message":"You see that you are in the middle of a forest.",
		"level": 2,
		"children": null
	},
	{
		"id": 3,
		"parentId": 1,
		"text": "Go back to sleep.",
		"message": "You die peacefully in your sleep.",
		"level": 2,
		"children": null
	},
	{
		"id": 4,
		"parentId": 2,
		"text": "Look at the trees.",
		"message":"The bark looks strange.",
		"level": 2,
		"children": null
	},
];


function Node(data) {
	this.data = data;
	this.parent = null;
	this.children = [];
}

function Tree(data) {
	var node = new Node(data);
	this._root = node;
}

Node.prototype.addChild = function(data) {
	var n = new Node(data);
	n.parent = this;
	children.push(n);

}

// Breadth-first search
Tree.prototype.traverseBF = function(callback) {
	var queue = new Queue();
	 
	queue.enqueue(this._root);
 
	currentTree = queue.dequeue();
 
	while(currentTree){
		for (var i = 0, length = currentTree.children.length; i < length; i++) {
			queue.enqueue(currentTree.children[i]);
		}
 
		callback(currentTree);
		currentTree = queue.dequeue();
	}
};

// method that will enable us to add a node to a specific node.  
Tree.prototype.add = function(data, toData, traversal) {
	var child = new Node(data),
		parent = null,
		callback = function(node) {
			if (node.data === toData) {
				parent = node;
			}
		};
 
	this.contains(callback, traversal);
 
	if (parent) {
		parent.children.push(child);
		child.parent = parent;
	} else {
		throw new Error('Cannot add node to a non-existent parent.');
	}
};

// using the array of JSON objects, populate a tree
// the tree is structured using the node id and the parent id
// the children array is filled
function generateTree() {
	for (var i = 0; i < nodes.length; i += 1) {
		node = nodes[i];
		node.children = [];
		map[node.id] = i; // use map to look-up the parents
		if (node.parentId !== 0) {
			nodes[map[node.parentId]].children.push(node);
		} else {
			roots.push(node);
		}
	}
	console.log(roots);
	console.log(nodes);
}

// when you select an action option, change the message and the next action options
function changeNode(childID) {
	// console.log(childID);

	// remove existing content
	$(".current").empty();
	$(".objects").empty();
	
	// display the slected action's effect
	$(".current").append("<h2>" + nodes[childID-1].message + "</h2>");

	// check if there are actions to be taken
	if (roots[childID]) {
		// output the different options
		for (var i = roots[childID].children.length - 1; i >= 0; i--) {
			$(".objects").append('<li onClick="changeNode(' + roots[childID].children[i].id + ')" >' + roots[childID].children[i].text + '</li>');
		}
	}
}


var map = {}, node, roots = [];
$(document).ready(function() {
	generateTree();

	$(".current").append("<h2>" + roots[0].text + "</h2>");
	for (var i = roots[0].children.length - 1; i >= 0; i--) {
		console.log(roots[0].children[i].id);
		$(".objects").append('<li onClick="changeNode(' + roots[0].children[i].id + ')" >' + roots[0].children[i].text + '</li>');
	}
	
});




