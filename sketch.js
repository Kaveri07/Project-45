const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var gameState = "form";
var playerCount;
var allPlayers, line;
var database, redPuck, bluePuck;
var form, player, game, name1, name2;
var introImage, hockeyTable, redPuckImage, bluePuckImage, puck, puckImage;
var players, edges, score1, score2, topRight, bottomRight, topLeft, bottomLeft;
var puckState = "play";

function preload() {
  introImage = loadImage("intro.png");
  hockeyTable = loadImage("table.png");
  redPuckImage = loadImage("redPuck.png");
  bluePuckImage = loadImage("bluePuck.png");
  puckImage = loadImage("puck.png");
}

function setup() {
	createCanvas(1400, 800);

	engine = Engine.create();
	world = engine.world;

	Engine.run(engine);

	database = firebase.database();
	game = new Game();
  game.getState();
  game.start();
  
  redPuck = createSprite(200,400,100,100);
  redPuck.addImage(redPuckImage);
  redPuck.scale = 0.27;
  redPuck.visible = false;
  bluePuck = createSprite(1200,400,100,100);
  bluePuck.addImage(bluePuckImage);
  bluePuck.scale = 0.3;
  bluePuck.visible = false;
  players = [redPuck, bluePuck, puck];
  puck = createSprite(700,400,50,50);
  puck.addImage(puckImage);
  puck.scale = 0.1;
  puck.visible = false;
  line = createSprite(700,400,10,800);
  line.visible = false;
  var puckRefX = database.ref("puck/x")
      puckRefX.on("value", (data)=> {
        puck.x = data.val();
      })
  var puckRefY = database.ref("puck/y")
  puckRefY.on("value", (data)=> {
    puck.y = data.val();
  })

  var score1Ref = database.ref("players/player1/score")
  score1Ref.on("value", (data)=> {
    score1 = data.val();
  })
  var score2Ref = database.ref("players/player2/score")
  score2Ref.on("value", (data)=> {
    score2 = data.val();
  })

  var name1Ref = database.ref("players/player1/name")
  name1Ref.on("value", (data)=> {
    name1 = data.val();
  })
  var name2Ref = database.ref("players/player2/name")
  name2Ref.on("value", (data)=> {
    name2 = data.val();
  })

  topRight = createSprite(1400,107.5,10,215);
  topRight.visible = false;
  topLeft = createSprite(0,107.5,10,215);
  topLeft.visible = false;
  bottomLeft = createSprite(0,700,10,200);
  bottomLeft.visible = false;
  bottomRight = createSprite(1400,700,10,200);
  bottomRight.visible = false;
}


function draw() {
  rectMode(CENTER);
  background("lightblue");
  edges = createEdgeSprites();
  //edges[0] = left
  //edges[1] = right
  //edges[2] = up
  //edges[3] = down

  if(playerCount === 2 && gameState === "form"){
    game.updateState("intro");
  }

  if(gameState === "intro"){
    form.hide();
    game.intro();
  }

  if(gameState === "hockey"){
    game.hockey();
  }

  if(gameState === "golf"){
  	game.golf();
  }

  if(gameState === "archery"){
  	game.archery();
  }

  if(keyDown("r")) {
    game.updateState("form");
    player.updateCount(0);
    database.ref('players/player1').update({
      distanceX: 0,
      distanceY: 0,
      name: "",
      score: 0
    });
    database.ref('players/player2').update({
      distanceX: 0,
      distanceY: 0,
      name: "",
      score: 0
    });
    database.ref('puck').update({
      x: 700,
      y: 400
    });
  }
  
  drawSprites();
}