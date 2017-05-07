var tree = [];
var node = 0;


$(".delete").click(function() {
	console.log("delete");
	$(this).parent().remove();
});

function newTree(n) {
	console.log(n);
	$('.entries-' + n).append('<li><button type="button" class="btn btn-default" id="addItemIn' + n + '" data-toggle="modal" data-target=".item-modal">Add item</button></li>');

	$('.save').click(function() {
		var action = $(".option-name").val();
		var effect = $(".effect-name").val();

		$('<li>' + action + '&nbsp;-->&nbsp;' + effect + '&nbsp;<button type="button" class="delete btn btn-primary">X</button><ul class="entries-' + (n+1) + ' "></ul></li>').insertBefore('#addItemIn' + n);

		// $('.entries-' + n).prepend('<li>' + action + '&nbsp;-->&nbsp;' + effect + '&nbsp;<button type="button" class="delete btn btn-primary">X</button><ul><li>Nested</li></ul></li>');
		newTree(n+1);


		$(".delete").click(function() {
			console.log("delete");
			$(this).parent().remove();
		});
	})


}


function buildOutline() {
	$(".outline").append('<ul class="entries"></ul>');

	$(".entries").append('<li><button type="button" class="btn btn-default" data-toggle="modal" data-target=".item-modal">Add item</button></li>');

	$(".outline").append('<div class="item-modal modal fade bs-example-modal-md" tabindex="-1" role="dialog" aria-labelledby="myMediumModalLabel"></div>');
	$(".item-modal").append('<div class="modal-dialog modal-md" role="document"><div class="item-modal-content modal-content"></div></div>');
	$(".item-modal-content").append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="gridSystemModalLabel">Add Option</h4></div>');
	$(".item-modal-content").append('<div class="modal-body"><div class="row"><div class="col-md-12 col-lg-12"><input type="text" class="form-control option-name" placeholder="Something happens"></div><div class="col-md-12 col-lg-12"><input type="text" class="form-control effect-name" placeholder="And the effect is ..."></div></div></div>');
	$(".item-modal-content").append('<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="save btn btn-primary" data-dismiss="modal">Save changes</button></div>');

	$(".save").click(function() {
		var action = $(".option-name").val();
		var effect = $(".effect-name").val();

		$(".entries").prepend('<li>' + action + '&nbsp;-->&nbsp;' + effect + '&nbsp;<button type="button" class="delete btn btn-primary">X</button><ul><li>Nested</li></ul></li>');
		
		$(".delete").click(function() {
			console.log("delete");
			$(this).parent().remove();
		});

		console.log(action);
		console.log(effect);
	});


}

function build(n) {
	$(".entries-" + n).append('<li><button type="button" class="btn btn-default" id="addItemIn' + n + '" data-toggle="modal" data-target=".item-modal">Add item</button></li>');

	$('.save').click(function() {
		var action = $(".option-name").val();
		var effect = $(".effect-name").val();

		$('<li>' + action + '&nbsp;-->&nbsp;' + effect + '&nbsp;<button type="button" class="delete btn btn-primary">X</button><ul><li>Nested</li></ul></li>').insertBefore(".entries" + n);
	});


}




$(document).ready(function() {
	// buildOutline();

	$(".outline").append('<ul class="entries"></ul>');
	


	$(".outline").append('<div class="item-modal modal fade bs-example-modal-md" tabindex="-1" role="dialog" aria-labelledby="myMediumModalLabel"></div>');
	$(".item-modal").append('<div class="modal-dialog modal-md" role="document"><div class="item-modal-content modal-content"></div></div>');
	$(".item-modal-content").append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="gridSystemModalLabel">Add Option</h4></div>');
	$(".item-modal-content").append('<div class="modal-body"><div class="row"><div class="col-md-12 col-lg-12"><input type="text" class="form-control option-name" placeholder="Something happens"></div><div class="col-md-12 col-lg-12"><input type="text" class="form-control effect-name" placeholder="And the effect is ..."></div></div></div>');
	$(".item-modal-content").append('<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="save btn btn-primary" data-dismiss="modal">Save changes</button></div>');

	build(0);

});