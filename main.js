'use strict';

$(document).ready(init);


var $page;

function init() {

  var $shuffle = $('#shuffle');
  var $tiles = $('.boxes');
  var tileNums = [1,2,3,4,5,6,7,8,"E"];



  $page = $('#fakeBody').clone(true);

  $shuffle.click(shuffleTiles);

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
      $('body').fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
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
      playerWins();
    }
  }
  function playerWins(){
    $('#centerbox').css('z-index', 1);
    $('#winBox').addClass('animated rotateIn');
    $('#winBox').html('You Win!');
    $('#fakeBody').delay(1000).fadeOut(5000);

    function removePage () {
      $('#fakeBody').remove();
    }
    setTimeout(removePage, 7000);

    function addPage (){
      $shuffle = $page.find('#shuffle');
      $tiles = $page.find('.boxes');
      $('body').addClass('animated slideInLeft').append($page);
      $shuffle.click(shuffleTiles);
      setTimeout(removeSlide, 2000);
    }
    setTimeout(addPage, 6000);

    function removeSlide() {
      $('body').removeClass('animated slideInLeft');
    }
}



function shuffleTiles(evt){
  var newIndex = _.shuffle(tileNums);

  $tiles.each(function(i){
    $(this).attr("id", "box" + newIndex[i]);
  });

  $tiles.off().click(tileClicked);

}

}

