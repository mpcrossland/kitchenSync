const kitchenSyncApp = {};

kitchenSyncApp.apiKey = '9a66b44b16e1f61a6de62ec8b670f9b1';
kitchenSyncApp.appID = 'bcebee4d';


kitchenSyncApp.init = function() {
	$('#ingredients').on('submit', function(e) {
		e.preventDefault(); 
		var firstIngredient = $(".ingredientOne").val(); 
		var secondIngredient = $(".ingredientTwo").val(); 
		var thirdIngredient = $(".ingredientThree").val(); 
		var fourthIngredient = $(".ingredientFour").val(); 
		kitchenSyncApp.getRecipes(firstIngredient, secondIngredient, thirdIngredient, fourthIngredient)
	});
};


kitchenSyncApp.getRecipes = function(a, b, c, d){
	$('#target').empty();
	$.ajax({
		url:'http://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data:{
			format: 'jsonp',
			_app_id: kitchenSyncApp.appID,
			_app_key: kitchenSyncApp.apiKey,
			requirePictures: true,
			maxResult: 15, 
			start: 0,
			q: `${a}+${b}+${c}+${d}`
		},
		success: function(result){
			if ($(".field").val() === '') {
				$('#target').append('<p> try again</p>')
			} else {
				kitchenSyncApp.displayRecipes(result);
				$(".field").val('');
			}
		}
	});
};

kitchenSyncApp.displayRecipes = function (data){
	console.log(data)
	// let recipe = $('<div class="recipe">')
	// let cardInfo = $('<div class="cardInfo">')
	for(i = 0; i < data.matches.length; i++){ 

		$('#target').append('<div class="image-wrapper"><a href="http://www.yummly.com/recipe/'+data.matches[i].id+'" class="image">'+
							'<div class="image-hover-wrapper">'+'<img src="'+data.matches[i].smallImageUrls.toString().replace('=s90','')+'" alt="" width="320" height="320">'+
							'<div class="image-hover"></div>'+
							'<div class="image-hover-text">'+
								'<p class="image-hover-heading"><p class="recipeName">'+data.matches[i].recipeName+'</p> <p class="ingredientContent">'+data.matches[i].ingredients.toString().replace(/,/gi,', ')+'</p>'+
								'<p class="cookingTime">cooking time: '+data.matches[i].totalTimeInSeconds/60+" mins</p></div></div></a></div>");
	};
};	

$(function(){
	kitchenSyncApp.init();
});







