class Form {

    constructor() {
      this.input = createInput("Name");
      this.button = createButton('Play');
      this.greeting = createElement('h2');
      this.title = createElement('h2');
    }

    hide(){
      this.greeting.hide();
      this.button.hide();
      this.input.hide();
      this.title.hide();
    }
  
    display(){
      this.title.html("Three Sided Sports");
      this.title.position(100, 0);
      this.title.style('font-size', '70px');
      this.title.style('color', 'blue');
      this.input.style('width', '200px');
      this.input.style('height', '20px');
      this.input.style('background', 'pink');
      this.button.style('width', '200px');
      this.button.style('height', '20px');
      this.button.style('background', 'pink');
      this.input.position(300 , 300);
      this.button.position(300, 330);
  
      this.button.mousePressed(()=>{
        this.input.hide();
        this.button.hide();
        player.name = this.input.value();
        playerCount+=1;
        player.index = playerCount;
        player.updateName();
        player.updateCount(playerCount);
        this.greeting.html("Hello " + player.name);
        this.greeting.position(150, displayHeight/4);
        this.greeting.style('font-size', '70px');
        this.greeting.style('color', 'blue');
      });
  
    }
  }
  