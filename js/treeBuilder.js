var addNum = 1;
var entryNum = 2;
var addButtonText = '<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>';
var removeButtonText = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
var liContentClass = 'branch';
var btnDeleteClass = 'btn btn-primary delete';
var btnAddClass = 'btn btn-default addBranch';
var ulClass = 'tree list-group-item';

/* ------------------------------------------------------------------------- */ 
/* | When a .addBranch item is clicked, update the modal data to store the | */
/* | id number of the add button so it is known for save                   | */
/* ------------------------------------------------------------------------- */
$('ul').delegate('.addBranch', 'click', function () {
	var addID = $(this).attr('id');
	var number = addID.substring(3, addID.length);
	// console.log("add id :" + number);

	$('#addItemModal').modal('show');
	$('#addItemModal').data('index', number);
	// console.log("modal index: " + $('#addItemModal').data('index'));

	// var level = $(this).data('level');
	// $('#addItemModal').data('level', level);
});

/* ------------------------------------------------------------------------- */ 
/* | When .save is clicked from modal, take values from input and use them | */
/* | to create an entry before the add button                              | */
/* |     [ ul ]                                                            | */
/* |          [ li ] [ x ]                                                 | */
/* |               [ + ]                                                   | */
/* |          [ /li ]                                                      | */
/* |     [ /ul ]                                                           | */
/* ------------------------------------------------------------------------- */
$('.save').click(function() {
	console.log('saving...');
	$modal = $(this).parent().parent().parent().parent();
	option = $('.option-name').val();
	result = $('.effect-name').val();

	// get the add button that was clicked
	$newBranch = $('#add' + $modal.data('index')).parent();
	addNum++;
	$newBranch.before('<li class="branch" data-option="' + option + '" data-result="' + result + '" data-add="' + $modal.data('index') + '" data-entry="' + entryNum + '">' + option + ' --> ' + result + '<button class="btn btn-primary delete">' + removeButtonText + '</button><ul class="tree list-group-item" data-level="' + (parseInt($newBranch.parent().data('level')) + 1) + '"><li class="branch"><button class="btn btn-default addBranch" id="add' + addNum + '"">' + addButtonText + '</button></li></ul></li>');
	entryNum++;

	$('.option-name').val('');
	$('.effect-name').val('');
});

/* ------------------------------------------------------------------------- */ 
/* | When .delete is clicked from tree, remove self and all child nodes    | */
/* |                                                                       | */
/* ------------------------------------------------------------------------- */
$('ul').delegate('.delete', 'click', function () {
	$(this).parent().remove();
});

/* ------------------------------------------------------------------------- */ 
/* | When #convert button is clicked, turn the existing tree into an       | */
/* | object array that could be used to play the game                      | */
/* ------------------------------------------------------------------------- */
var tree = [];
$('#convert').click(function () {
	tree = [];
	var firstNode = {
		"id": 1,
		"parentId": 0,
		"text": $('#firstOption').val(),
		"message": $('#firstResult').val(),
		"level": 1,
		"children": null
	}
	tree.push(firstNode);

	console.log("create tree object");
	$('#base').find('.delete').each(function (i) {
		$('#firstEntry').data('option', $('#firstOption').val());
		$('#firstEntry').data('result', $('#firstResult').val());

		
		$listElem = $(this).parent();
		$listParent = $listElem.parent();

		var id = $listElem.data('entry');
		// console.log("id      : " + id);
		
		var parentId = $listParent.parent().data('entry');
		// console.log("parentId: " + parentId);

		var text = $listElem.data('option');
		// console.log("text    : " + text);

		var message = $listElem.data('result');
		// console.log("message : " + message);

		var level = $listParent.data('level');
		// console.log("level   : " + level);

		// console.log("----------------------------");
		var node = {
			"id": parseInt(id),
			"parentId": parseInt(parentId),
			"text": text,
			"message": message,
			"level": parseInt(level),
			"children": null
		};
		tree.push(node);
	});

	
	games.push(tree);
	console.log(games);
});

/* ------------------------------------------------------------------------- */ 
/* | Switch modes such that you can play the game you created or another   | */
/* | game in the system                                                    | */
/* ------------------------------------------------------------------------- */
$('#playthegame').click(function () {
	$('#storybuilder').attr('class', '');
	$(this).attr('class', 'active');
	$('#storybuilder').children().attr('class', 'btn btn-default');
	$(this).children().attr('class', 'btn btn-primary');
	$('.outline').hide();
	$('#convert').hide();

	$('.gameOptions').show();
	$('.current').hide();
	$('.objects').hide();
	$('.reset').hide();
	$('.gameOptions').empty();
	for (var i = 0; i < games.length; i++) {
		$('.gameOptions').append('<div class="col-xs-6 col-lg-4 play" data-gameid="' + i + '"><h2 class="btn btn-primary">Play Game ' + i + '</h2></div>');
	}
});

/* ------------------------------------------------------------------------- */ 
/* | Generation the game that you have selected                            | */
/* |                                                                       | */
/* ------------------------------------------------------------------------- */
$('.gameOptions').delegate('.play', 'click', function () {
	nodes = games[$(this).data('gameid')];

	$('.gameOptions').hide();
	$('.current').show();
	$('.objects').show();
	$('#reset').show();

	generateTree();

	// add the outline
	// $(".tree").append(buildULTree(roots[0]));

	setupGame();
	
	$("#reset").click(function() {
		console.log("reset");

		$(".current").empty();
		$(".objects").empty();

		setupGame();
	});
});

/* ------------------------------------------------------------------------- */ 
/* | Switch back to the story builder mode                                 | */
/* |                                                                       | */
/* ------------------------------------------------------------------------- */
$('#storybuilder').click(function () {
	$('#playthegame').attr('class', '');
	$(this).attr('class', 'active');
	$('#playthegame').children().attr('class', 'btn btn-default');
	$(this).children().attr('class', 'btn btn-primary');
	$('.outline').show();
	$('#convert').show();

	$('.gameOptions').hide();
	$('.current').hide();
	$('.objects').hide();
	$('#reset').hide();
});

$(document).ready(function() {
	$('.gameOptions').hide();
	$('.current').hide();
	$('.objects').hide();
	$('#reset').hide();

});

function addStorage() {
    console.log("Add storage");
    var key = "testkey";
    var data = "testdata";
    var nic = "testnic";

    //localStorage setItem
    if ("localStorage" in window) {
        console.log("Setting item " + key + " to " + data +
                    " in localStorage");
        localStorage.setItem(key, data, nic);
    } else {
        alert("no localStorage in window");
    }
}

window.onload = function () {
    console.log("onLoad");
    var localhtml = "";
    
    addStorage();

    //localStorage key and getItembr
    for (var i = 0; i < localStorage.length; i++) {
        localhtml += "<li>" + localStorage.key(i) + " " +
            localStorage.getItem(localStorage.key(i)) + "</li>";
    }

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
    	// localStorage.removeItem(keys[i]);
        values.push( localStorage.getItem(keys[i]) );
        
    }

    console.log(values);
    
    console.log(localhtml);
    // document.getElementById('localStorageData').innerHTML = localhtml;
};