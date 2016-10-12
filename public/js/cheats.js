$(document).ready(function() {

var foods = [];

let renderFoods = function(level) {
  $('#food-cards-' + level).empty();

  // console.log(level);
  // console.log(foods);

  for (let i = 0; i < 2; i++) {
      let randomVariable = foods[Math.floor(Math.random() * foods.length)];
      // console.log(randomVariable);
      let $col = $('<div class="col s12 m4 l4">');
      let $card = $('<div class="card grey lighten-4">');
      let $content = $('<div class="card-content black-text">');
      let $title = $('<h3 class="card-title">');
      let $establishment = $('<p class="card-establishment">');
      let $action = $('<div class="card-action waves-effect">');

      $title.text(randomVariable.name);
      $establishment.text(randomVariable.establishment);
      // console.log(randomFood.name);
      // console.log(randomFood.establishment);
      $action.text('Click to Cheat');

      $content.append($title, $establishment);
      $card.append($content, $action)

      $col.append($card);
      console.log("card:", $card);

      $('#food-cards-' + level).append($col);
      // console.log($('food-cards-' + level));

    } //for loop end
}; //renderFoods function end



$(".large").click(function() {

  event.preventDefault();

  let level = $(this).data("level")
  // console.log(level);

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
          foods.push(food)
          // console.log("food", food);
        } //  for loop
        renderFoods(level);
      },
      error: function(err) {
        console.log('Your search was not found', err);
      }
    }); // ajax call done

  }); //event listener bracket

}); //documentready end-brackets



// if (food.establishment !== 'Optimum Nutrition' || food.establishment !== 'USDA') {
//   foods.push(food);
//   console.log("food:", food);
// }
