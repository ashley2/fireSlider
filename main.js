'use strict';

$(document).ready(init);

function init() {

  var $shuffle = $('.shuffle');
  var $tiles = $('.boxes');
  var tileNums = [1,2,3,4,5,6,7,8,"E"];



  // function to shuffle the tiles
  $shuffle.click(function(evt){
    var newIndex = _.shuffle(tileNums);


    $tiles.each(function(i){
      $(this).attr("id", "box" + newIndex[i]);
    });

    $tiles.click(tileClicked);
  });

  function tileClicked(evt){
    var id = $(this).attr("id");
    if (id === 'boxE') {
      return;
    }
    var emptyBoxPos = $('#boxE').data('pos');
    var boxClickedPos = $(this).data('pos');

    var x = emptyBoxPos[0] - boxClickedPos[0];
    var y = emptyBoxPos[1] - boxClickedPos[1];

    if (Math.abs(x) + Math.abs(y) === 1){
      var currentID = $(this).attr("id");
      $('#boxE').attr("id", currentID);
      $(this).attr("id", "boxE");
      checkAnswer();
    } else {
      alert('NOOOO');
    }
  }

  function checkAnswer(){

   var currentIdStr = '';
   $tiles.each(function(i){
     var currentID = $(this).attr("id");
     currentIdStr += currentID[3];
   })

   var currentTileNum = tileNums.join('');

   if (currentIdStr === currentTileNum){
      alert("You Win!");

   } else {
    console.log('false');
   }
 }
}

//count how many moves it takes the person to win?







