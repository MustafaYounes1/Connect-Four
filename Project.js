
var player_one = prompt("Please Enter the first player name : ")
var player_two = prompt("Please Enter the second player name : ")

$('#p-one').text(player_one);
$('#p-two').text(player_two);


var player_one = $('#p-one').text();
var player_two = $('#p-two').text();

$('#p-one').addClass('lbl');

var player1_color = 'rgb(237, 45, 73)';
var player2_color = 'rgb(86, 151, 255)';
var game_on = true;
var table = $('table tr')

function reportWin(rowNum, colNum) {
    console.log('You won starting at this row, col : ');
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color)
}

function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}

function checkButton(colIndex){
    var color = returnColor(5, colIndex);
    for (var row = 5; row > -1; row--) {
        color = returnColor(row, colIndex);
        if(color === 'rgb(128, 128, 128)'){
            return row;
        }
    }
    return undefined;
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)'
                 && one !== undefined /* for cases of Outside the boundaries of the table cells*/)
}

function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 4; col++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2),
                 returnColor(row,col+3))) {
          table.eq(row).find('td').eq(col).find('button').css('border', '6px solid black');
          table.eq(row).find('td').eq(col+1).find('button').css('border', '6px solid black');
          table.eq(row).find('td').eq(col+2).find('button').css('border', '6px solid black');
          table.eq(row).find('td').eq(col+3).find('button').css('border', '6px solid black');
          return true;
        }else {
          continue;
        }
      }
    }
  }

  function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 3; row++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col),
                 returnColor(row+3,col))) {
          table.eq(row).find('td').eq(col).find('button').css('border', '6px solid black');
          table.eq(row+1).find('td').eq(col).find('button').css('border', '6px solid black');
          table.eq(row+2).find('td').eq(col).find('button').css('border', '6px solid black');
          table.eq(row+3).find('td').eq(col).find('button').css('border', '6px solid black');
          return true;
        }else {
          continue;
        }
      }
    }
  }

  function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
      for (var row = 0; row < 7; row++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2),
                 returnColor(row+3,col+3))) { /* positive slopes */
          table.eq(row).find('td').eq(col).find('button').css('border', '6px solid black');
          table.eq(row+1).find('td').eq(col+1).find('button').css('border', '6px solid black');
          table.eq(row+2).find('td').eq(col+2).find('button').css('border', '6px solid black');
          table.eq(row+3).find('td').eq(col+3).find('button').css('border', '6px solid black');
          return true;
        }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2),
                 returnColor(row-3,col+3))) { /* negative slopes */
          table.eq(row).find('td').eq(col).find('button').css('border', '6px solid black');
          table.eq(row-1).find('td').eq(col+1).find('button').css('border', '6px solid black');
          table.eq(row-2).find('td').eq(col+2).find('button').css('border', '6px solid black');
          table.eq(row-3).find('td').eq(col+3).find('button').css('border', '6px solid black');
          return true;
        }else {
          continue;
        }
      }
    }
  }

var currentPlayer = 1;
var currentName = player_one;
var currentColor = player1_color;

$('table button').on('click', function () {

    var col = $(this).closest('td').index();
    
    var validButton = checkButton(col);

    if(validButton !== undefined){
        changeColor(validButton, col, currentColor);

        if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
            if(currentName === $('#p-one').text()){
                $('#p-one').removeClass('lbl');
                $('footer').html('Congratulations '+currentName+' ,you have won ..')
                $('footer').css('color', 'rgb(237, 45, 73)', 'font-weight', 'bolder')
            }
            else{
                $('#p-two').removeClass('lbl');
                $('footer').html('Congratulations '+currentName+' ,you have won ..')
                $('footer').css('color', 'rgb(86, 151, 255)', 'font-weight', 'bolder')
            }
            $('td button').attr('disabled', 'disabled');
            $('#restart').prop('disabled', false);
            game_on = false;
        }
        
        if (game_on) {

            currentPlayer = currentPlayer * -1;
        
            if(currentPlayer === 1){
                currentName = player_one;
                currentColor = player1_color;
                $('#p-one').addClass('lbl');
                $('#p-two').removeClass('lbl');
            }
            
            else{
                currentName = player_two;
                currentColor = player2_color;
                $('#p-one').removeClass('lbl');
                $('#p-two').addClass('lbl');
            }
        }
    }

})


$('#restart').on('click', function(){
    $('button').css('background-color', 'gray');
    $('#restart').css('background-color', '#2b2926');
    $('#restart').css('color', 'white');
    $('button').prop('disabled', false);
    $('#restart').prop('disabled', false);
    $('button').css('border', '1px solid black');
    $('footer').text('');
    game_on = true;
    if(currentName === $('#p-one').text()) {
        $('#p-one').addClass('lbl');
        $('#p-two').removeClass('lbl');
        currentColor = player1_color; 
    }
    if(currentName === $('#p-two').text()) {
        $('#p-two').addClass('lbl');
        $('#p-one').removeClass('lbl');
        currentColor = player2_color; 
    }
})

