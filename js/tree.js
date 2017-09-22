var games = [];
var gameOne = [
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
		"message": "You are robbed in your sleep.",
		"level": 2,
		"children": null
	},
	{
		"id": 4,
		"parentId": 2,
		"text": "Look at the trees.",
		"message":"The bark looks a strange blue-ish color.",
		"level": 3,
		"children": null
	},
	{
		"id": 5,
		"parentId": 2,
		"text": "Walk through the trees.",
		"message":"The forest is eerily quiet.",
		"level": 3,
		"children": null
	},
	{
		"id": 6,
		"parentId": 4,
		"text": "Touch the bark.",
		"message":"A slimy green liquid rushes to meet your skin.",
		"level": 4,
		"children": null
	},
	{
		"id": 7,
		"parentId": 4,
		"text": "Smell the bark.",
		"message":"A foul and nauseating smell comes through your nose as you fall hard to the ground asleep.",
		"level": 4,
		"children": null
	},
	{
		"id": 8,
		"parentId": 4,
		"text": "Step away from the tree.",
		"message":"The forest is eerily quiet.",
		"level": 4,
		"children": null
	},
	{
		"id": 9,
		"parentId": 5,
		"text": "Check if there's anything on the ground.",
		"message":"You see leaves, dirt, and something... shiny?",
		"level": 4,
		"children": null
	},
	{
		"id": 10,
		"parentId": 5,
		"text": "Start walking through the trees.",
		"message":"Trees trees trees so many trees.",
		"level": 4,
		"children": null
	},
];

games.push(gameOne);

// if (localStorage.getItem("storedGames") != null) {
	
// }

var nodes = games[0];


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
	console.log("roots:");
	console.log(roots);
	console.log("nodes:");
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
	// if (roots[childID]) {
		// output the different options
		for (var i = nodes[childID-1].children.length - 1; i >= 0; i--) {
			$(".objects").append('<button type="button" class="btn btn-default" onClick="changeNode(' + nodes[childID-1].children[i].id + ')" >' + nodes[childID-1].children[i].text + '</button>');
		}
	// }
}

// Append the initial mesage prompt and print the action options
function setupGame() {
	$(".current").empty();
	$(".objects").empty();
	$(".current").append("<h2>" + roots[0].text + "</h2>");
	for (var i = roots[0].children.length - 1; i >= 0; i--) {
		// console.log("id: " + roots[0].children[i].id);
		$(".objects").append('<button type="button" class="btn btn-default" onClick="changeNode(' + roots[0].children[i].id + ')" >' + roots[0].children[i].text + '</button>');
	}
}

// build an outline of the options available to choose
function buildULTree(n) {
	var ul = '<ul>';
	var ulClose = '</ul>';

	var output = ul;

	for (var i = n.children.length - 1; i >= 0; i--) {
		output += '<li>' + n.children[i].text + '</li>' + buildULTree(n.children[i]);
	}

	output += ulClose;

	return output;
}



var map = {}, node, roots = [];
// $(document).ready(function() {
// 	generateTree();

// 	// add the outline
// 	// $(".tree").append(buildULTree(roots[0]));

// 	setupGame();
	
// 	$("#reset").click(function() {
// 		console.log("reset");

// 		$(".current").empty();
// 		$(".objects").empty();

// 		setupGame();
// 	});
// });




