class Game {
    constructor(){
        this.introButton = createButton("Go to Air Hockey");
        this.introButton.hide();
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
    }
  
    updateState(state){
      database.ref('/').update({
        gameState: state
      })
    }

    async start(){
        if(gameState === "form"){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form();
          form.display();
        }
    }

    intro() {
        background(introImage);
        this.introButton.show();
        this.introButton.style('width', '200px');
        this.introButton.style('height', '20px');
        this.introButton.style('background', 'pink');
        this.introButton.position(600, 600);
        this.introButton.mousePressed(()=>{
            this.introButton.hide();
            this.updateState("hockey");
            puck.velocityX = -10;
            puck.velocityY = -4;
            
        });
    }

    hockey() {
      background(hockeyTable);
      game.introButton.hide();
      form.greeting.hide();
      form.title.hide();
      Player.getPlayerInfo();

      textFont("georgia");
      fill(0);
      textSize(50);
      text(name1 +"'s Score: "+score1,10,50);
      text(name2 +"'s Score: "+score2,900,50);
      text("The first to 7 points wins!",10,750);

      bluePuck.visible = true;
      redPuck.visible = true;
      if(player.index === 1) {
          if(keyDown("up")) {
            player.distanceY +=20
            player.updateName();
          }
          if(keyDown("down") ) {
            player.distanceY -=20
            player.updateName();
          }
          if(keyDown("left")) {
              player.distanceX -=20;
              player.updateName();
          }
          if(keyDown("right")) {
              player.distanceX +=20;
              player.updateName();
          }
       
      } else if(player.index === 2) {
            if(keyDown("up")) {
              player.distanceY +=20
              player.updateName();
            }
            if(keyDown("down") ) {
              player.distanceY -=20
              player.updateName();
            }
            if(keyDown("left")) {
                player.distanceX -=20;
                player.updateName();
            }
            if(keyDown("right")) {
                player.distanceX +=20;
                player.updateName();
            }
      }
      
      if(puck.isTouching(edges[0]) && puck.y > 215 && puck.y < 600) {
        score2++;
        database.ref("players/player2").update({
          score: score2
        })
        database.ref("puck").update({
          x: 700,
          y: 400
        })
        puck.velocityX = 0;
        puck.velocityY = 0;
        puckState = "serve";
      
      }
      if(puck.isTouching(edges[1]) && puck.y > 215 && puck.y < 600) {
        score1++;
        database.ref("players/player1").update({
          score: score1
        })
        database.ref("puck").update({
          x: 700,
          y: 400
        })
        puck.velocityX = 0;
        puck.velocityY = 0;
        puckState = "serve";
      }

      if(puckState === "serve") {
        
        text("Press space to begin",750,750)
            if(keyDown("space")) {
              puck.velocityX = -10;
              puck.velocityY = -4;
              puckState = "play";
            }
      }

      var x = -200;
      var y;
      var x2;
      var index = 0;
      for(var plr in allPlayers) {
        index = index + 1;
        x = x + 600;
        y = 400 - allPlayers[plr].distanceY;
        x2 = x + allPlayers[plr].distanceX;
        players[index-1].x = x2;
        players[index-1].y = y;
      }
      
      database.ref("puck").update({
        x: puck.x,
        y: puck.y
      })
      puck.visible = true;
      puck.bounceOff(redPuck);
      puck.bounceOff(bluePuck);
      if(puck.isTouching(topLeft)||puck.isTouching(bottomLeft)){
        puck.x = puck.x+50;
        puck.velocityY = puck.velocityY*(-1)
        puck.velocityX = puck.velocityX*(-1)
      }
      if(puck.isTouching(topRight)||puck.isTouching(bottomRight)){
        puck.x = puck.x-50;
        puck.velocityY = puck.velocityY*(-1)
        puck.velocityX = puck.velocityX*(-1)
      }
      if(puck.isTouching(edges[2])) {
        puck.y = puck.y+50
        puck.velocityY = puck.velocityY*(-1)
        puck.velocityX = puck.velocityX*(-1)
      }
      if(puck.isTouching(edges[3])) {
        puck.y = puck.y-50
        puck.velocityY = puck.velocityY*(-1)
        puck.velocityX = puck.velocityX*(-1)
      }
      if(player.index===1 && redPuck.isTouching(edges[0])) {
        player.distanceX = player.distanceX+50;
      }
      if(player.index===1 && redPuck.isTouching(edges[1])) {
        player.distanceX = player.distanceX-50;
      }
      if(player.index===1 && redPuck.isTouching(edges[2])) {
        player.distanceY = player.distanceY-50;
      }
      if(player.index===1 && redPuck.isTouching(edges[3])) {
        player.distanceY = player.distanceY+50;
      }
      if(player.index===2 && bluePuck.isTouching(edges[0])) {
        player.distanceX = player.distanceX+50;
      }
      if(player.index===2 && bluePuck.isTouching(edges[1])) {
        player.distanceX = player.distanceX-50;
      }
      if(player.index===2 && bluePuck.isTouching(edges[2])) {
        player.distanceY = player.distanceY-50;
      }
      if(player.index===2 && bluePuck.isTouching(edges[3])) {
        player.distanceY = player.distanceY+50;
      }
      if(player.index===1 && redPuck.isTouching(line)) {
        player.distanceX = player.distanceX-50;
      }
      if(player.index===2 && bluePuck.isTouching(line)) {
        player.distanceX = player.distanceX+50;
      }

      if(score1 === 7 || score2 === 7) {
        background("aqua");
        redPuck.visible = false;
        bluePuck.visible = false;
        puck.visible = false;
        puck.velocityY = 0;
        puck.velocityX = 0;
        textFont("georgia");
        fill(0);
        textSize(50);
        text("Press the right arrow key to proceed to golf.",20,425);
        if(score1 === 7) {
          text(name1 + " has won!!!",20,375);
        } else if(score2 === 7) {
          text(name2 + " has won!!!",20,375);
        }
        if(keyDown("right")) {
          game.updateState("golf");
          database.ref('players/player1').update({
            distanceX: 0,
            distanceY: 0,
            score: 0
          });
          database.ref('players/player2').update({
            distanceX: 0,
            distanceY: 0,
            score: 0
          });
        }
      }
    }

    golf() {
      background("green");
      this.introButton.hide();
    }
}