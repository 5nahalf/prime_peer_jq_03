var apikey = 'fbf1f9033c363564ebbbfddfee9708bc18e08cb0'; 
var batman;
var i = 0;
// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
 

    for(i = 0; i <= results.length; i++){
    	var info = results[i].description;
		var picture = results[i].image.icon_url;
		var date = results[i].original_release_date;
		var consoles = results[i].platforms;
		var release = "";
		if (i % 4 == 0) {
			$row = $("<div class='row'></div>");
			$("#results").append($row)
		}
		for (var j = 0; j < consoles.length; j++){
			release += consoles[j].name + "</p><p>";
		}
		
		if (info == null || info == undefined){
			info = "No Description Available";
		}
		if (date == null || date == undefined){
			date = "No Release Date";
		}
		if(picture == null || picture == undefined){
			picture = "http://placehold.it/100x100";
		} 
		var hide = "<div class='info" + [i] +  " modal fade' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog modal-lg'><div class='modal-content'><p>" + release + "</p><p>" + date + "</p><p>" + info + "</p></div></div></div>";
		$row.append("<div id='gameCell' class='col-sm-3' roll='button' data-toggle='modal' data-target='.info" + [i] + "'><img src='" + picture + "'></img><p>" + results[i].name + "</p></div>");
		$("body").append(hide);
	}
}

$(document).ready(function() {

	$("#submit").on("click", function(event){
		$("#results").empty();
		$(".modal").empty();
		event.preventDefault();
		batman = $("#game").val();
		search(batman);
		
	});

	// $("#results").on("click", "#gameCell", function(){
		
	// 	$(this).children("div").hide().slideDown();


	// });
	// Start the search here!


	
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
