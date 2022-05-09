let padding3 = 80;
let padding4 = 150;
let x, y;
let titlesize;
var filters = [];
let filtery;
let filtergapy;
let filtercolorsize;
let letterkey = "Press labeled key to navigate";
let letterkey2 = "Press any other key to show all";
let arrowkey = "Use <- and -> to select week";
let dragkey = "Drag cube to view data";

let s3 = function(label){
  label.preload = function(){
    titlefont = label.loadFont("assets/PPNeueBit.otf");
    subfont = label.loadFont("assets/BasierSquare.ttf");
  }
  label.setup = function(){
    let canvasW = label.windowWidth * 0.20;
    let canvasH = label.windowHeight;
    let myCanvas = label.createCanvas(canvasW, canvasH);
    myCanvas.position(0, (label.windowHeight - canvasH)/2);

    //filters
    filtercolorsize = label.windowHeight * 1/30;
    filtery = 150 + label.windowHeight * 1/30;;
    filtergapy = label.windowHeight * 5/90;

    filters.push(new Filters(40, filtery, filtercolorsize, filtercolorsize, "(B)", "Binging", "#547499"));
    filters.push(new Filters(40, filtery + filtergapy * 1, filtercolorsize, filtercolorsize, "(S)", "Sleep", "#41444D"));
    filters.push(new Filters(40, filtery + filtergapy * 2, filtercolorsize, filtercolorsize, "(M)", "Misc", "#D3D5E2"));
    filters.push(new Filters(40, filtery + filtergapy * 3, filtercolorsize, filtercolorsize, "(L)", "Learning", "#B7DAB3"));
    filters.push(new Filters(40, filtery + filtergapy * 4, filtercolorsize, filtercolorsize, "(W)", "Work", "#EFFDED"));
    filters.push(new Filters(40, filtery + filtergapy * 5, filtercolorsize, filtercolorsize, "(O)", "Social", "#D9F3FF"));
    filters.push(new Filters(40, filtery + filtergapy * 6, filtercolorsize, filtercolorsize, "(E)", "Eat", "#FFFFFF"));
  }

  label.windowResized = function(){
    let canvasW = label.windowWidth * 0.20;
    let canvasH = label.windowHeight;
    label.resizeCanvas(canvasW, label.windowHeight);
  }

  label.draw = function(){
    label.background(137,168,207);
    label.rectMode(label.CORNER);
    label.title();

    label.fill(183, 218, 179)
    label.textFont(titlefont);
    label.textSize(16);
    label.textAlign(label.LEFT,label.TOP);
    label.text("MY SCHEDULE", 40, label.height-50);
    //label.graph();

    for(var i=0; i<filters.length; i++){
      filters[i].display();
    }

    //instructions
    label.fill(255, 255, 255);
    let ins_size = label.windowWidth * 1/80;
    label.textSize(ins_size);
    label.textAlign(label.LEFT, label.CENTER);
    label.text(dragkey, 40, filtery + filtergapy * 8.5, label.width - padding);
    label.text(letterkey, 40, filtery + filtergapy * 9, label.width - padding);
    label.text(letterkey2, 40, filtery + filtergapy * 9.5, label.width - padding);
    label.text(arrowkey, 40, filtery + filtergapy * 10, label.width - padding);
  
  }
  label.title = function(){
    //title
    label.fill(183, 218, 179);
    label.textFont(titlefont);
    //label.noStroke();

    if(label.windowWidth >= 900){
      titlesize = label.width * 70 / 315;
    }else if(label.windowWidth < 900){
      titlesize = label.width * 50 / 315;
    }
  
    label.textSize(titlesize);
    label.textAlign(label.LEFT,label.BOTTOM); //align on left side
    label.text("DayDay", 40, 110, label.width - padding3);
    label.textAlign(label.LEFT,label.TOP); //align on left side
    // label.textSize(titlesize/4);
    // label.text("MY SCHEDULE", 40, 100, label.width - padding3);
    //subtitle
  }

  label.graph = function(){

    gapx = (label.width - padding2)/11;
    label.rectMode(label.CORNER);
    for(let i=0; i<table.getRowCount(); i++){
      if(label.floor(i/12) === selectRow){
        x = padding2/2 + gapx*(i%12);
        y = label.height - 80;
        let rectH = label.map(gmsl[i], -3.5, 79.5, 10, 200);
        // //with slider
        // let rectH = label.map(gmsl[i], -3.5, 79.5, 10*value, 200*value);
        //datapoints
        label.fill('white');
        label.noStroke();
        label.push();
        label.translate(x, y);
        label.rotate(label.radians(180));
        label.rect(0,0,gapx-10,rectH)
        label.pop();
        //tag
        label.textSize(8);
        label.fill('lightgrey');
        label.textAlign(label.CENTER);
        label.text(gmsl[i], x, y-rectH-10);
      }
    }//for loop
    for(let i=0; i<12; i++){
      label.textSize(8);
      label.fill('lightgrey');
      label.text(months1[i], padding4/2+gapx*i, y+10);
    }//for loop
  }//label.graph


  class Filters{
    constructor(x, y, w, h, key, label, filtercolor){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.filtercolor = filtercolor;
      this.fillcolor = filtercolor;
      this.strokecolor = this.filtercolor;
      this.key = key;
      this.label = label;
      this.pressed = false;
    }
  
    display(){
      label.push();
      label.translate(this.x, this.y);
      label.fill(this.fillcolor);
      label.noStroke();
      label.textSize(20);
      //label.stroke(this.strokecolor);
      label.textAlign(label.LEFT, label.CENTER);
      label.textFont(titlefont);
      let textsize = label.windowWidth * 1/70;
      label.textSize(textsize);
      label.rect(0, 0, this.w, this.h);
      label.text(this.label + " " + this.key, filtercolorsize * 2, filtercolorsize/2);
      label.textAlign(label.CENTER, label.CENTER);
      label.pop();
    }
  
    mousePressed(){
      if(this.isOver()){
        table = loadTable("api.php?DayDate=2022/"+this.label, "csv", "header", dataLoaded, dataLoadError);
        this.pressed = true;
      }
    }
  
    mouseReleased(){
      if(this.pressed){
        this.pressed = false;
      }
    }
  
    isOver(){ //is over the button
      if(mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2){
        if(mouseY > this.y - this.h/2  && mouseY < this.y + this.h/2){
          return true;
        }
      }
      return false;
    }
  
  }
}



new p5(s3);