var tree = [];
var node = 0;


$(".delete").click(function() {
	console.log("delete");
	$(this).parent().remove();
});

function newTree(n) {
	console.log("newTree( " + n + " )");
	$('.entries-' + n).append('<li><button type="button" class="btn btn-default" id="addItemIn' + n + '" data-toggle="modal" data-target=".item-modal">Add item</button></li>');

	/*
	$('.save').click(function() {
		var action = $(".option-name").val();
		var effect = $(".effect-name").val();

		$('<li>' + action + '&nbsp;-->&nbsp;' + effect + '&nbsp;<button type="button" class="delete btn btn-primary">X</button><ul class="entries-' + (n+1) + ' "></ul></li>').insertBefore('#addItemIn' + n);

		'<li>' 
			+ action + '&nbsp;-->&nbsp;' + effect + '&nbsp;
			<button type="button" class="delete btn btn-primary">X</button>
			<ul class="entries-' + (n+1) + ' ">
			</ul>
		</li>'

		// $('.entries-' + n).prepend('<li>' + action + '&nbsp;-->&nbsp;' + effect + '&nbsp;<button type="button" class="delete btn btn-primary">X</button><ul><li>Nested</li></ul></li>');
		newTree(n+1);

		$(".delete").click(function() {
			console.log("delete");
			$(this).parent().remove();
		});
	})
	*/
}

function buildOutline() {
	$(".outline").append('<ul class="entries"></ul>');

	$(".entries").append('<li><button type="button" class="btn btn-default" data-toggle="modal" data-target=".item-modal">Add item</button></li>');

	$(".outline").append('<div class="item-modal modal fade bs-example-modal-md" tabindex="-1" role="dialog" aria-labelledby="myMediumModalLabel"></div>');
	$(".item-modal").append('<div class="modal-dialog modal-md" role="document"><div class="item-modal-content modal-content"></div></div>');
	$(".item-modal-content").append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="gridSystemModalLabel">Add Option</h4></div>');
	$(".item-modal-content").append('<div class="modal-body"><div class="row"><div class="col-md-12 col-lg-12"><input type="text" class="form-control option-name" placeholder="Something happens"></div><div class="col-md-12 col-lg-12"><input type="text" class="form-control effect-name" placeholder="And the effect is ..."></div></div></div>');
	$(".item-modal-content").append('<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="save btn btn-primary" data-dismiss="modal">Save changes</button></div>');

	/*
	$(".save").click(function() {
		var action = $(".option-name").val();
		var effect = $(".effect-name").val();

		$(".entries").prepend('<li>' + action + '&nbsp;-->&nbsp;' + effect + '&nbsp;<button type="button" class="delete btn btn-primary">X</button><ul><li>Nested</li></ul></li>');
		
		//
		<li>
			' + action + '&nbsp;-->&nbsp;' + effect + '&nbsp;
			<button type="button" class="delete btn btn-primary">X</button>
			<ul>
				<li>Nested</li>
			</ul>
		</li>

		//


		$(".delete").click(function() {
			console.log("delete");
			$(this).parent().remove();
		});

		console.log("action: " + action);
		console.log("effect: " + effect);
	});
	*/
}

function build(n) {
	var out = '<div class="item-modal modal fade bs-example-modal-md" tabindex="-1" role="dialog" aria-labelledby="myMediumModalLabel"><div class="modal-dialog modal-md" role="document"><div class="item-modal-content modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="gridSystemModalLabel">Add Option</h4></div><div class="modal-body"><div class="row"><div class="col-md-12 col-lg-12"><input type="text" class="form-control option-name" placeholder="Something happens"></div><div class="col-md-12 col-lg-12"><input type="text" class="form-control effect-name" placeholder="And the effect is ..."></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="save btn btn-primary" data-dismiss="modal">Save changes</button></div></div></div></div>';

	$(".outline").append(out);

	$(".entries").append('<li id="parent' + n + '"><button type="button" class="btn btn-default" id="addItemIn' + n + '" data-toggle="modal" data-target=".item-modal">Add item</button></li>');

	/*
	<li id="parent' + n + '">
		<button type="button" class="btn btn-default" id="addItemIn' + n + '" data-toggle="modal" data-target=".item-modal">
			Add item
		</button>
	</li>
	*/

	/*
	$('.save').click(function() {
		console.log("saving...");

		var action = $(".option-name").val();
		var effect = $(".effect-name").val();

		console.log("action: " + action);
		console.log("effect: " + effect);

		$('<li>' + action + '&nbsp;-->&nbsp;' + effect + '&nbsp;<button type="button" class="delete btn btn-primary">X</button><ul><li>Nested</li></ul></li>').insertBefore(".entries");
	});
	*/
}

var addNum = 1;
var entryNum = 1;
var addButtonText = '<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>';
var removeButtonText = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
var liContentClass = 'branch';
var btnDeleteClass = 'btn btn-primary delete';
var btnAddClass = 'btn btn-default addBranch';
var ulClass = 'tree list-group-item';

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

$('.save').click(function() {
	console.log('saving...');
	$modal = $(this).parent().parent().parent().parent();
	// console.log($modal);

	option = $('.option-name').val();
	result = $('.effect-name').val();

	// console.log("save modal index: " + $modal.data('index'));

	$newBranch = $('#add' + $modal.data('index'));
	addNum++;
	$newBranch.before('<li class="branch" data-option="' + option + '" data-result="' + result + '">' + option + ' --> ' + result + '<button class="btn btn-primary delete">' + removeButtonText + '</button><ul class="tree list-group-item"><li class="branch"><button class="btn btn-default addBranch" id="add' + addNum + '"">' + addButtonText + '</button></li></ul></li>');

	// entryNum++;
});

$('ul').delegate('.delete', 'click', function () {
	$(this).parent().remove();
});

$('#convert').click(function () {
	console.log($('#base .branch').first());
	console.log($('#base .branch').first().children());

	$('#base').children('li').each(function(i) { 
		console.log($(this).attr('class'));
	});
});

$(document).ready(function() {

});