$(document).ready(function() {

var foods = [];





$(".large").click(function(event) {

  event.preventDefault();

  $.ajax({
      method: 'GET',
      url: 'https://api.nutritionix.com/v1_1/search?results=0%3A50&cal_min=1000&cal_max=5000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_calories&appId=95db0b49&appKey=5a6a4430611260dc01b458b9460f8b71',
      dataType: 'json',
      success: function(received) {
        // console.log("success:", received);
        let results = received.hits;
        // console.log("results:", results);
        for (let i = 0; i < results.length; i++) {
          const oneFood = results[i];
          // console.log("OneFood:", oneFood);
          const food = {
            name: oneFood.fields.item_name,
            establishment: oneFood.fields.brand_name
          };
          if (food.establishment !== 'Optimum Nutrition' || food.establishment !== 'USDA') {
            foods.push(food);
            console.log("food:", food);
          }
        } //  for loop
        // else {
        //   renderFoods();
        // }
      },
      error: function(err) {
        console.log('Your search was not found', err);
      }
    }); // ajax call done

  }); //event listener bracket

}); //documentready end-brackets
