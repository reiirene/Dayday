let padding = 80;
let padding2 = 100;
let tempH;
let labelhours = 0;
// let sliderX, sliderY, sliderW, sliderH, cirX, cirY, slidermax, slidermin;
// let c;
// let x, y;

let s2 = function(label){
  label.preload = function(){
    titlefont = label.loadFont("assets/PPNeueBit.otf");
    subfont = label.loadFont("assets/BasierSquare.ttf");
  }
  label.setup = function(){
    let canvasW = label.windowWidth * 0.25;
    let canvasH = label.windowHeight;
    let myCanvas = label.createCanvas(canvasW, canvasH);
    myCanvas.position(label.windowWidth*0.75, (label.windowHeight - canvasH));
    
  }

  label.windowResized = function(){
    let canvasW = label.windowWidth * 0.25;
    let canvasH = label.windowHeight;
    label.resizeCanvas(canvasW, label.windowHeight);
  }

  label.draw = function(){
    label.background(137,168,207);
    label.rectMode(label.CORNER);
    //label.title();
    label.graph();
  
  }
  label.title = function(){
    //title
    label.fill(183, 218, 179);
    label.textFont(titlefont);
    //label.noStroke();
    label.textSize(20);
    label.textAlign(label.LEFT); //align on left side
    label.text(title1, 40, 80, label.width - padding);
    //subtitle
    label.fill(255, 255, 255);
    label.textFont(subfont);
    label.textSize(12);
  }
  label.graph = function(){


    if(label.windowWidth <= 1000){
      padding2 = 50;
    }
    gapx = (label.width - padding2)/6;
    label.rectMode(label.CORNER);

    for(let i=0; i<table.getRowCount(); i++){
      if(label.floor(i/7) === selectRow){
        x = padding2/2 + gapx*(i%7);
        y = label.height - 50;
        let rectH = label.height * 1/100;
        // //with slider
        // let rectH = label.map(gmsl[i], -3.5, 79.5, 10*value, 200*value);
        //datapoints
        label.noStroke();
        label.push();
        label.translate(x, y);
        label.rotate(label.radians(180));
        tempH = 0;
        labelhours = 0;          
        //let tc = (c-2) + (49 * i);
        //label.rect(0,0,gapx-10,rectH);
        for (let c = 2; c < table.getColumnCount(); c++){
          if(keyB === 1 && 
            keyS === 1 &&
            keyM === 1 &&
            keyL === 1 &&
            keyW === 1 &&
            keyO === 1 &&
            keyE === 1){
            if(table.getString(i, c) === "Manga" || table.getString(i, c) === "Variety"){
              label.fill(84, 116, 153);
              label.rect(0,tempH,gapx-10,rectH);
            }else if(table.getString(i, c) === "Sleep"){
              label.fill(65, 68, 77);
              label.rect(0,tempH,gapx-10,rectH);
            }else if(table.getString(i, c) === "Misc" || table.getString(i, c) === "Commute"){
              label.fill(211, 213, 226);
              label.rect(0,tempH,gapx-10,rectH);
            }else if(table.getString(i, c) === "Eat"){
              label.fill(255, 255, 255);
              label.rect(0,tempH,gapx-10,rectH);
            }else if(table.getString(i, c) === "Social" || table.getString(i, c) === "Dance" || table.getString(i, c) === "Church"){
              label.fill(217, 243, 255);
              label.rect(0,tempH,gapx-10,rectH);
            }else if(table.getString(i, c) === "Psyc100" || table.getString(i, c) === "Acad178" || table.getString(i, c) === "Acad280" || table.getString(i, c) === "Thtr213" || table.getString(i, c) === "Ealc512" || table.getString(i, c) === "Writ340" || table.getString(i, c) === "SelfLearning"){
              label.fill(183, 218, 179);
              label.rect(0,tempH,gapx-10,rectH);
            }else if(table.getString(i, c) === "Work"){
              label.fill(239, 253, 237);
              label.rect(0,tempH,gapx-10,rectH);
            }
            tempH += rectH;
          }else if(keyB === 1 && selectRow !== -1){
            if(table.getString(i, c) === "Manga" || table.getString(i, c) === "Variety"){
              label.fill(84, 116, 153);
              label.rect(0,tempH,gapx-10,rectH);
              tempH += rectH;
              labelhours += 0.5;
            }
          }else if(keyS === 1 && selectRow !== -1){
            if(table.getString(i, c) === "Sleep"){
              label.fill(65, 68, 77);
              label.rect(0,tempH,gapx-10,rectH);
              tempH += rectH;
              labelhours += 0.5;
            }
          }else if(keyM === 1 && selectRow !== -1){
            if(table.getString(i, c) === "Misc" || table.getString(i, c) === "Commute"){
              label.fill(211, 213, 226);
              label.rect(0,tempH,gapx-10,rectH);
              tempH += rectH;
              labelhours += 0.5;
            }
          }else if(keyL === 1 && selectRow !== -1){
            if(table.getString(i, c) === "Psyc100" || table.getString(i, c) === "Acad178" || table.getString(i, c) === "Acad280" || table.getString(i, c) === "Thtr213" || table.getString(i, c) === "Ealc512" || table.getString(i, c) === "Writ340" || table.getString(i, c) === "SelfLearning"){
              label.fill(183, 218, 179);
              label.rect(0,tempH,gapx-10,rectH);
              tempH += rectH;
              labelhours += 0.5;
            }
          }else if(keyW === 1 && selectRow !== -1){
            if(table.getString(i, c) === "Work"){
              label.fill(239, 253, 237);
              label.rect(0,tempH,gapx-10,rectH);
              tempH += rectH;
              labelhours += 0.5;
            }
          }else if(keyO === 1 && selectRow !== -1){
            if(table.getString(i, c) === "Social" || table.getString(i, c) === "Dance" || table.getString(i, c) === "Church"){
              label.fill(217, 243, 255);
              label.rect(0,tempH,gapx-10,rectH);
              tempH += rectH;
              labelhours += 0.5;
            }
          }else if(keyE === 1 && selectRow !== -1){
            if(table.getString(i, c) === "Eat"){
              label.fill(255, 255, 255);
              label.rect(0,tempH,gapx-10,rectH);
              tempH += rectH;
              labelhours += 0.5;
            }
          }
        }

        label.pop();
        //date
        label.textSize(8);
        label.fill('white');
        label.textAlign(label.CENTER, label.CENTER);
        let datestring = activitycount[i].date.replace("2022/", '');
        label.text(datestring, x-(gapx-10)/2, y+10);
        //hours
        label.textSize(8);
        label.fill('lightgrey');
        label.textAlign(label.CENTER, label.CENTER);
        if(labelhours !== 0 && selectRow !== -1){
          label.text(labelhours + "hrs", x-(gapx-10)/2, y-tempH-10);
        }
        //label.text(activitycount[i].date, x, y+10);
      }
    }//for loop
    // for(let i=0; i<activitycount.length; i++){
    //   label.textSize(8);
    //   label.fill('lightgrey');
    //   label.text(activityCount[i].date, padding2/2+gapx*i, y+10);
      //console.log(activitycount[i]);
      //label.text(activityCount[i].date, padding2/2+gapx*i, y+10);
  }//for loop

}

new p5(s2);