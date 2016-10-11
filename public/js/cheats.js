'use strict'

$(document).ready(function() {

  $.ajax({
      method: 'GET',
      url: 'https://api.nutritionix.com/v1_1/search?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_calories&appId=95db0b49&appKey=5a6a4430611260dc01b458b9460f8b71',
      dataType: 'json',
      success: function(received) {
        // console.log("success:", received);
        const results = received;
        console.log(received);
        // const currentPage = received.currentPage;
        // const numberOfPages = received.numberOfPages;
        //
        // // console.log(results);
        // for (let i = 0; i < results.length; i++) {
        //   const oneBrewery = results[i];
        //
        //   const brewery = {
        //     id: oneBrewery.id,
        //     locality: oneBrewery.locality,
        //     name: oneBrewery.brewery.name,
        //     open: oneBrewery.openToPublic
          // };

            // console.log(brewery);
        //   if (brewery.open === 'Y') {
        //     breweries.push(brewery);
        //   }
        // } //  for loop
        // if (currentPage < numberOfPages) {
        //   const nextPage = currentPage + 1;
        //
        //   requestData(nextPage);
        // }
        // else {
        //   // console.log(breweries);
        //   randomBreweries();
        // }
      },
      error: function(err) {
        console.log('Your search was not found', err);
      }
    }); // ajax call done


});
