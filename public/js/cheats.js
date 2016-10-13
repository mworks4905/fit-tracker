$(document).ready(function() {

    var foods = [];

    let renderFoods = function(level) {
        $('#food-cards-' + level).empty();

        for (let i = 0; i < 2; i++) {
            let randomVariable = foods[Math.floor(Math.random() * foods.length)];
            let $col = $('<div class="col s12 m4 l4">');
            let $card = $('<div class="card grey lighten-4">');
            let $content = $('<div class="card-content black-text">');
            let $title = $('<h3 class="card-title">');
            let $establishment = $('<p class="card-establishment">');
            let $action = $(`<div class="card-action waves-effect choose-cheat" data-innerlevel=${level}>`);

            $title.text(randomVariable.name);
            $establishment.text(randomVariable.establishment);
            $action.text('Click to Cheat');

            $content.append($title, $establishment);
            $card.append($content, $action)

            $col.append($card);

            $('#food-cards-' + level).append($card);

        } //for loop end
        chooseCheat()
    }; //renderFoods function end


    // Cheat Click button to choose cheat food
    function chooseCheat() {
        $('.choose-cheat').on("click", function(e) {
            let cheatValue = $(this).attr('data-innerlevel');
            $.ajax({
                contentType: 'application/json',
                url: `/cheats`,
                method: 'PUT',
                dataType: 'json',
                data: JSON.stringify({cheatValue}),
            }).done(() => {
                window.location = '/day'
            }).fail(err => {
                window.location = '/day'
            })
        })
    } //chooseCheat function end

    // Nutrionix API call - on button click
    $(".large").click(function() {

        let level = $(this).data("level");

        $.ajax({
            method: 'GET',
            url: 'https://api.nutritionix.com/v1_1/search?results=0%3A50&cal_min=1000&cal_max=5000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_calories&appId=95db0b49&appKey=5a6a4430611260dc01b458b9460f8b71',
            dataType: 'json',
            success: function(received) {
                let results = received.hits;
                for (let i = 0; i < results.length; i++) {
                    const oneFood = results[i];
                    const food = {
                        name: oneFood.fields.item_name,
                        establishment: oneFood.fields.brand_name
                    };
                    foods.push(food);
                } //  for loop end
                renderFoods(level);
            },
            error: function(err) {
                console.log('Your search was not found', err);
            }
        }); // ajax call done
    }); //event listener bracket
}); //documentready end-brackets
