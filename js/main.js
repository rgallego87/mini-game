function main () {

  var player = document.getElementById('player');

  // Size of game space is a matrix
  var size = 3; 
  var space = new Array(size);
  // Initial x,y (and current)
  var x = 0;
  var y = 0;

  // Initial positions of the game
  function spaceInit() {  
    for (var y = 0; y < size; y++) {
      space[y] = new Array(size); 
      for (var x = 0; x < size; x++) {
        if (y === 0 && x === 0){
          space[y][x] = player; // Player init position
        } else space[y][x] = 0; // 0 is control character 
      }
    }
  }

  // function createHtml(html) {
  //   var div = document.createElement("div");
  //   div.innerHTML = html;
  //   return div.children[0];
  // }

  // function renderSpace() {
  //   var render;
  //   for (var i = 0; i < size ;i++) {
  //     if (i = 0) {
  //       render = createHtml(`<div class="box box-start"><i id="player" class="fas fa-smile fa-2x"></i></div>`);
  //       document.getElementById('space').appendChild(render);
  //     }    
  //     render = createHtml(`<div class="box"></div>`);
  //     document.getElementById('space').appendChild(render);    
  //   }
  //   render = createHtml(`<div class="box box-end"></div>`);
  //   document.getElementById('space').appendChild(render);
  // }

  function erasePlayer() {  
    var player = document.getElementById('player');
    return player.remove();
  }

  function renderPlayer() {
    
    var spaceDOM = document.querySelectorAll('.box');
    
    for (var i = 0; i < (size * size); i++) {
      var spaceDOMParsed = spaceDOM[i].id.split('-');
      
      // Checking the current position
      if (y === parseInt(spaceDOMParsed[1]) && x === parseInt(spaceDOMParsed[2])) {
        var ielement = document.createElement('i');
        ielement.setAttribute('id','player');
        ielement.setAttribute('class','fas fa-smile fa-2x');      
        spaceDOM[i].appendChild(ielement);      
      }
    }  
  }

  function boxEnd(player) {    
    var spaceDOM = document.querySelectorAll('.box');
    player.remove(); // TODO Must remove player win icon
    
    for (var i = 0; i < (size * size); i++) {
      spaceDOM[i].id.split('-');      
      
      if (y === 2 && x === 2) {
        var ielement = document.createElement('i')
        ielement.setAttribute('id','player');
        ielement.setAttribute('class','fas fa-laugh-wink fa-2x');        
        
        spaceDOM[8].appendChild(ielement);

        document.body.setAttribute('style','background-color:green;')

        self.setInterval(function() {
          location.reload(true);
        },1000);
      }
    }
  }

  function gameLogic() {

    window.addEventListener('keydown', function(button) {
        
      switch(button.keyCode) {
        case 37: // left
          if (x > 0 && space[y][x-1] === 0) {
            space[y][x-1] = player; // Player left move
            space[y][x] = 0; // Setting to 0 the last player position
            erasePlayer();
            x--; // Updating x position
            renderPlayer();
            boxEnd(player);
          }        

        console.log('LEFT');
        console.log(space);
        break;
    
        case 38: // up
          if (y > 0 && space[y-1][x] === 0) {
            space[y-1][x] = player; // Player up move
            space[y][x] = 0; // Setting to 0 the last player position
            erasePlayer();
            y--; // Updating y position
            renderPlayer();
            boxEnd(player);
          }

        console.log('UP');
        console.log(space);
        break;
    
        case 39: // right
          if (x < size-1 && space[y][x+1] === 0) {
            space[y][x+1] = player; // Player right move
            space[y][x] = 0; // Setting to 0 the last player position
            erasePlayer(); // Erasing in DOM
            x++; // Updating x position
            renderPlayer();
            boxEnd(player);
          }

        console.log('RIGHT');
        console.log(space);
        break;
    
        case 40: // down
          if (y < size-1 && space[y+1][x] === 0) {
            space[y+1][x] = player; // Player down move
            space[y][x] = 0; // Setting to 0 the last player position
            erasePlayer(); 
            y++; // Updating y position
            renderPlayer();
            boxEnd(player);
          }

        console.log('DOWN');
        console.log(space);
        break;
    
        default: return; 
      }    
    });  
  }

spaceInit();
console.log('InitialPos: ',space);
gameLogic();

}

// After DOM is loaded... Execute main
window.addEventListener('load', main); 