var apikey = 'fbf1f9033c363564ebbbfddfee9708bc18e08cb0'; 
var batman;
var i = 0;
// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);

    for(i = 0; i <= results.length; i++){
    	var info = results[i].description;
		var picture = results[i].image.icon_url;
		var date = results[i].original_release_date;
		var consoles = results[i].platforms;
		var release = "";
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
		var hidden = "<div class='hide row'><p>" + release + "</p><p>" + date + "</p><p>" + info + "</p></div>";
		$("#results").append("<div id='gameCell' class='container col-md-3'><img src='" + picture + "'></img><p>" + results[i].name + "</p>" + hidden + "</div>");
			
		
	}
}

$(document).ready(function() {

	$("#submit").on("click", function(event){
		event.preventDefault();
		batman = $("#game").val();
		search(batman);
		
	});
	$("#results").on("click", "#gameCell", function(){
		$(this).toggleClass("col-md-1").toggleClass("col-md-12");
		$(this).children("div").toggleClass("hide").hide().slideDown();


	});
	// Start the search here!

// toggleClass("col-md-1").toggleClass("col-md-12");
// 		$(this).children("div").toggleClass("hide").hide().slideDown();
	
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
