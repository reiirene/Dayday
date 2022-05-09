/*
author: Irene
Description: A visual representation of daily activities from March to May 2022.
How to Interact: drag to rotate, scroll to zoom, double click to reset. Use left and right arrow keys to navigate week number. Use filter keys to select specific categories.
reference: https://www.youtube.com/channel/UCfsgJ5rTwAMAULTZq-KyBSQ
*/

//import {s4} from './clock.js';
let table;
let myCanvas;
let date = [],
    time = [],
    week = [],
    activity = [],
    activitycount = [];
let weekday = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let weekcount = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen"
];
var activityColors = {};
var activityCategories = {};
let keyB = 1,
    keyS = 1,
    keyM = 1,
    keyL = 1,
    keyW = 1,
    keyO = 1,
    keyE = 1;


let boxSize = 400;
let titlefont, subfont;
let ang = 0;
let selectRow = -1;

let s1 = function (sketch) {
  sketch.preload = function () {
    table = sketch.loadTable("schedule.php", "csv", "header");
    titlefont = sketch.loadFont("assets/PPNeueBit.otf");
    subfont = sketch.loadFont("assets/BasierSquare.ttf");
  };
  sketch.setup = function () {
    let canvasW = (sketch.windowWidth) * 0.55;
    let canvasH = sketch.windowHeight;
    myCanvas = sketch.createCanvas(canvasW, canvasH, sketch.WEBGL);
    myCanvas.position(sketch.windowWidth*0.2, (sketch.windowHeight - canvasH) / 2);
    
    //create camera
    let cdistance;
    if(sketch.width > 500){
      cdistance = 650;
    }else{
      cdistance = 1000;
    }
    sketch.createEasyCam({distance:cdistance});
    document.oncontextmenu = () => false;
    
    //get the basic info of the data
    numRows = table.getRowCount();
    numCols = table.getColumnCount();
    //print("numRows "+numRows +" numCols "+numCols)
    
    //load data
    for (let i = 0; i < table.getRowCount(); i++) {
      date[i] = table.getString(i, 1);
      //time[i] = table.getString(i, 1);
      week[i] = sketch.floor(i/7);
      
      //for (let r = 0; r < table.getRowCount(); r++){
        for (let c = 2; c < table.getColumnCount(); c++){
          activity[i] = table.getString(i,c);
          //console.log(activity[i]);
        }
      //}
     

      //for (let r = 0; r < table.getRowCount(); r++){
        let Mangacount = 0;
        let Varietycount = 0;
        let Misccount = 0;
        let Commutecount = 0;
        let Eatcount = 0;
        let Socialcount = 0;
        let Dancecount = 0;
        let Churchcount = 0;
        let Sleepcount = 0;
        let Psyc100count = 0;
        let Acad178count = 0;
        let Acad280count = 0;
        let Thtr213count = 0;
        let Ealc512count = 0;
        let Writ340count = 0;
        let SelfLearningcount = 0;
        let Workcount = 0;
        for (let c = 2; c < table.getColumnCount(); c++){
          let label = table.getString(i,c);
          if(label === "Manga"){
            Mangacount ++;
          }else if(label === "Variety"){
            Varietycount ++;
          }else if(label === "Misc"){
            Misccount ++;
          }else if(label === "Commute"){
            Commutecount ++;
          }else if(label === "Eat"){
            Eatcount ++;
          }else if(label === "Social"){
            Dancecount ++;
          }else if(label === "Dance"){
            Dancecount ++;
          }else if(label === "Church"){
            Churchcount ++;
          }else if(label === "Sleep"){
            Sleepcount ++;
          }else if(label === "Psyc100"){
            Acad178count ++;
          }else if(label === "Acad178"){
            Acad178count ++;
          }else if(label === "Acad280"){
            Acad280count ++;
          }else if(label === "Thtr213"){
            Thtr213count ++;
          }else if(label === "Ealc512"){
            Ealc512count ++;
          }else if(label === "Writ340"){
            Writ340count ++;
          }else if(label === "SelfLearning"){
            SelfLearningcount ++;
          }else if(label === "Work"){
            Workcount ++;
          }
        }// c for loop
        activitycount.push(new activityCount(
          table.getString(i, 1),
          i, 
          Mangacount,
          Varietycount,
          Misccount,
          Commutecount,
          Eatcount,
          Socialcount,
          Dancecount,
          Churchcount,
          Sleepcount,
          Psyc100count,
          Acad178count,
          Acad280count,
          Thtr213count,
          Ealc512count,
          Writ340count,
          SelfLearningcount,
          Workcount
          ));
          
      //}// r for loop
      //console.log(activitycount[i]);
    }// i for loop


    //activity color
    activityColors["Manga"] = sketch.color("#547499");
    activityColors["Variety"] = sketch.color("#547499");
    activityColors["Misc"] = sketch.color("#D3D5E2");
    activityColors["Commute"] = sketch.color("#D3D5E2");
    activityColors["Eat"] = sketch.color("#FFFFFF");
    activityColors["Social"] = sketch.color("#D9F3FF");
    activityColors["Dance"] = sketch.color("#D9F3FF");
    activityColors["Church"] = sketch.color("#D9F3FF");
    activityColors["Sleep"] = sketch.color("#41444D");
    activityColors["Psyc100"] = sketch.color("#B7DAB3");
    activityColors["Acad178"] = sketch.color("#B7DAB3");
    activityColors["Acad280"] = sketch.color("#B7DAB3");
    activityColors["Thtr213"] = sketch.color("#B7DAB3");
    activityColors["Ealc512"] = sketch.color("#B7DAB3");
    activityColors["Writ340"] = sketch.color("#B7DAB3");
    activityColors["SelfLearning"] = sketch.color("#B7DAB3");
    activityColors["Work"] = sketch.color("#EFFDED");
  
    //activity category
    activityCategories["Manga"] = "Binging";
    activityCategories["Variety"] = "Binging";
    activityCategories["Misc"] = "Misc";
    activityCategories["Commute"] = "Misc";
    activityCategories["Eat"] = "Eat";
    activityCategories["Social"] = "Social";
    activityCategories["Dance"] = "Social";
    activityCategories["Church"] = "Social";
    activityCategories["Sleep"] = "Sleep";
    activityCategories["Psyc100"] = "Learning";
    activityCategories["Acad178"] = "Learning";
    activityCategories["Acad280"] = "Learning";
    activityCategories["Thtr213"] = "Learning";
    activityCategories["Ealc512"] = "Learning";
    activityCategories["Writ340"] = "Learning";
    activityCategories["SelfLearning"] = "Learning";
    activityCategories["Work"] = "Work";

    
    
    sketch.cursor(sketch.HAND);
    sketch.textFont(subfont);
  };

  sketch.windowResized = function(){
    let canvasW = sketch.windowWidth * 0.55;
    let canvasH = sketch.windowHeight;
    sketch.resizeCanvas(canvasW, canvasH);
  }

  sketch.draw = function () {
    sketch.background(137,168,207);
    //console.log(activityColors);
    sketch.noFill();
    sketch.stroke('white');
    sketch.strokeWeight(0.5);
    //sketch.rotateY(sketch.radians(ang));

    //draw a box
    sketch.stroke('white');
    sketch.box(boxSize);
    //draw vis
    sketch.push();
    ang += 0.05;
    sketch.translate(-sketch.width / 2, -sketch.height / 2, -boxSize / 2);
    sketch.filterkeys();

    sketch.stroke('white');
    sketch.parameters();
    sketch.pop();
    //clock.draw();
  };
  /* x-axis - year y-axis - sea Level z-axis - month */
  /* x-axis - week y-axis - hours z-axis - day */
  let nextX, nextY, nextZ;


  sketch.filterkeys = function(){
    if(sketch.keyCode === sketch.RIGHT_ARROW || sketch.keyCode === sketch.LEFT_ARROW){
      if(keyB === 1 && 
        keyS === 1 &&
        keyM === 1 &&
        keyL === 1 &&
        keyW === 1 &&
        keyO === 1 &&
        keyE === 1){
        sketch.bingingGraph();
        sketch.sleepGraph();
        sketch.miscGraph();
        sketch.learningGraph();
        sketch.socialGraph();
        sketch.eatGraph();
        sketch.workGraph();  
      }else if(keyB === 1){
        sketch.bingingGraph();
      }else if(keyS === 1){
        sketch.sleepGraph();
      }else if(keyM === 1){
        sketch.miscGraph();
      }else if(keyL === 1){
        sketch.learningGraph();
      }else if(keyW === 1){
        sketch.workGraph();
      }else if(keyO === 1){
        sketch.socialGraph();
      }else if(keyE === 1){
        sketch.eatGraph();
      }else{
        sketch.bingingGraph();
        sketch.sleepGraph();
        sketch.miscGraph();
        sketch.learningGraph();
        sketch.socialGraph();
        sketch.eatGraph();
        sketch.workGraph(); 
      }
    }else if(sketch.keyCode === 66){  
      for(var i=0; i<filters.length; i++){
        if(filters[i].label === "Binging"){
          filters[i].fillcolor = sketch.color("#547499");
        }else{
          filters[i].fillcolor = sketch.color("#C5C5C5");
        }
      }
      keyB = 1;
      keyS = 0;
      keyM = 0;
      keyL = 0;
      keyW = 0;
      keyO = 0;
      keyE = 0;
      sketch.bingingGraph();
    }else if(sketch.keyCode === 83){
      for(var i=0; i<filters.length; i++){
        if(filters[i].label === "Sleep"){
          filters[i].fillcolor = sketch.color("#41444D");
        }else{
          filters[i].fillcolor = sketch.color("#C5C5C5");
        }
      }
      keyB = 0;
      keyS = 1;
      keyM = 0;
      keyL = 0;
      keyW = 0;
      keyO = 0;
      keyE = 0;
      sketch.sleepGraph();
    }else if(sketch.keyCode === 77){
      for(var i=0; i<filters.length; i++){
        if(filters[i].label === "Misc"){
          filters[i].fillcolor = sketch.color("#D3D5E2");
        }else{
          filters[i].fillcolor = sketch.color("#C5C5C5");
        }
      }
      keyB = 0;
      keyS = 0;
      keyM = 1;
      keyL = 0;
      keyW = 0;
      keyO = 0;
      keyE = 0;
      sketch.miscGraph();
    }else if(sketch.keyCode === 76){
      for(var i=0; i<filters.length; i++){
        if(filters[i].label === "Learning"){
          filters[i].fillcolor = sketch.color("#B7DAB3");
        }else{
          filters[i].fillcolor = sketch.color("#C5C5C5");
        }
      }
      keyB = 0;
      keyS = 0;
      keyM = 0;
      keyL = 1;
      keyW = 0;
      keyO = 0;
      keyE = 0;
      sketch.learningGraph();
    }else if(sketch.keyCode === 79){//O = 79
      for(var i=0; i<filters.length; i++){
        if(filters[i].label === "Social"){
          filters[i].fillcolor = sketch.color("#D9F3FF");
        }else{
          filters[i].fillcolor = sketch.color("#C5C5C5");
        }
      }
      keyB = 0;
      keyS = 0;
      keyM = 0;
      keyL = 0;
      keyW = 0;
      keyO = 1;
      keyE = 0;
      sketch.socialGraph();
    }else if(sketch.keyCode === 69){
      for(var i=0; i<filters.length; i++){
        if(filters[i].label === "Eat"){
          filters[i].fillcolor = sketch.color("#FFFFFF");
        }else{
          filters[i].fillcolor = sketch.color("#C5C5C5");
        }
      }
      keyB = 0;
      keyS = 0;
      keyM = 0;
      keyL = 0;
      keyW = 0;
      keyO = 0;
      keyE = 1;
      sketch.eatGraph();
    }else if(sketch.keyCode === 87){
      for(var i=0; i<filters.length; i++){
        if(filters[i].label === "Work"){
          filters[i].fillcolor = sketch.color("#EFFDED");
        }else{
          filters[i].fillcolor = sketch.color("#C5C5C5");
        }
      }
      keyB = 0;
      keyS = 0;
      keyM = 0;
      keyL = 0;
      keyW = 1;
      keyO = 0;
      keyE = 0;
      sketch.workGraph();
    }else{
      for(var i=0; i<filters.length; i++){
        if(filters[i].label === "Binging"){
          filters[i].fillcolor = sketch.color("#547499");
        }else if(filters[i].label === "Sleep"){
          filters[i].fillcolor = sketch.color("#41444D");
        }else if(filters[i].label === "Misc"){
          filters[i].fillcolor = sketch.color("#D3D5E2");
        }else if(filters[i].label === "Learning"){
          filters[i].fillcolor = sketch.color("#B7DAB3");
        }else if(filters[i].label === "Social"){
          filters[i].fillcolor = sketch.color("#D9F3FF");
        }else if(filters[i].label === "Eat"){
          filters[i].fillcolor = sketch.color("#FFFFFF");
        }else if(filters[i].label === "Work"){
          filters[i].fillcolor = sketch.color("#EFFDED");
        }
      }
      keyB = 1;
      keyS = 1;
      keyM = 1;
      keyL = 1;
      keyW = 1;
      keyO = 1;
      keyE = 1;
      sketch.bingingGraph();
      sketch.sleepGraph();
      sketch.miscGraph();
      sketch.learningGraph();
      sketch.socialGraph();
      sketch.eatGraph();
      sketch.workGraph();
    }

  }

/**
 * Parameters
 */
  sketch.parameters = function(){
    let gapx = boxSize / 6;
    let gapz = boxSize / week[numRows - 1];
    let gapy = boxSize / 24;

    //x-axis days of the week
    for(let i=0; i < 7; i++){
      let x = sketch.width / 2 - boxSize / 2 + gapx * sketch.abs(i % 7);
      let y = sketch.height / 2 + boxSize / 2 + 10;
      let z = boxSize - gapz * sketch.floor(i / 7) + 10;

      sketch.push();
      sketch.translate(0, 0, z);
      sketch.textSize(10);
      sketch.fill("white");
      sketch.textAlign(sketch.CENTER);
      sketch.text(weekday[i], x, y);
      sketch.pop();
    }

    //z-axis week
    for(let i=0; i < table.getRowCount(); i++){

      let x = sketch.width / 2 - boxSize / 2 - 10;
      let y = sketch.height / 2 + boxSize / 2 + 10;
      let z = boxSize - gapz * sketch.floor(i / 7);
      

      sketch.push();
      sketch.rotateY(sketch.radians(270));
      

      sketch.fill("white");
      sketch.textAlign(sketch.CENTER);
      if((i+1)%7 === 1){
        sketch.translate(0, 0, -x);
        //let thisweek = "Week " + weekcount[i/7];
        //sketch.text("Week", z, y);
        sketch.textSize(5);
        sketch.text(weekcount[i/7], z, y);
      }
      sketch.pop();
    }

    //y-axis hours
    for(let i=0; i < 25; i++){
      let x = sketch.width / 2 - boxSize / 2 - 10;
      let y = sketch.height / 2 + boxSize / 2 - gapy * i;
      let z = boxSize;

      sketch.push();
      sketch.translate(0, 0, z);
      sketch.textSize(10);
      sketch.fill("white");
      sketch.textAlign(sketch.LEFT);
      //if(i > 0){
        sketch.text(i, x, y);
      //}
      sketch.pop();
    }
    
  }
/**
 * Binging
 */
  sketch.bingingGraph = function () {
    //x-axis
    //let gapx = boxSize / (week[sketch.floor(numRows/7) - 1] - week[0]);
    let gapx = boxSize / 6;
    //z-axis
    let gapz = boxSize / week[numRows - 1];
    //mapping Manga
    for (let i = 0; i < table.getRowCount(); i++) {
      let hours = (activitycount[i].Varietycount + activitycount[i].Mangacount) * 0.5;
      let x = sketch.width / 2 - boxSize / 2 + gapx * sketch.abs(i % 7);
      let y = sketch.map(
        hours,
        0,
        24,
        sketch.height / 2 + boxSize / 2,
        sketch.height / 2 - boxSize / 2
      );
      let z = boxSize - gapz * sketch.floor(i / 7);
      //datapoints
      if(sketch.drawingContext.shadowBlur = 32){
      }
      sketch.drawingContext.shadowBlur = 32;
      sketch.drawingContext.shadowColor = sketch.color(84, 116, 153);
      let size = sketch.map(hours, 0, 24, 0, 5);
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(size);
        sketch.stroke("white");
      }else{
        sketch.strokeWeight(size);
        sketch.stroke(84, 116, 153);
      }
      sketch.push();
      sketch.stroke(84, 116, 153);
      sketch.translate(x, y, z);
      sketch.sphere(size);
      sketch.pop();
      //sketch.point(x, y, z);

      //tag
      sketch.push();
      sketch.translate(0, 0, z);
      sketch.textSize(5);
      sketch.fill("black");
      sketch.textAlign(sketch.CENTER);
      //sketch.text(hours, x, y + 20);
      //sketch.text(week[i], x, y + 20);
      sketch.pop();

      //connecting the points
      if (i < numRows - 1) {
        nextX =
        sketch.width / 2 - boxSize / 2 + gapx * sketch.abs((i+1) % 7);
        let hours1 = (activitycount[i+1].Varietycount + activitycount[i+1].Mangacount) * 0.5;
        nextY = sketch.map(
          hours1,
          0,
          24,
          sketch.height / 2 + boxSize / 2,
          sketch.height / 2 - boxSize / 2
        );
        nextZ = boxSize  - gapz * sketch.floor((i+1) / 7);
      }
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(1.5);
      }else{
        sketch.strokeWeight(0.5);
      }
      sketch.beginShape();
      if (i % 7 != 6) {
        sketch.vertex(x, y, z);
        sketch.vertex(nextX, nextY, nextZ);
      }
      sketch.endShape();
    }
  
    sketch.keyPressed = function(){
      if(keyB === 1 && 
        keyS === 1 &&
        keyM === 1 &&
        keyL === 1 &&
        keyW === 1 &&
        keyO === 1 &&
        keyE === 1){
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          selectRow ++;
        }else if(sketch.keyCode === sketch.LEFT_ARROW){
          selectRow --;
        }
      }else if(keyB === 1){  
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          selectRow ++;
          keyB = 1;
          keyS = 0;
          keyM = 0;
          keyL = 0;
          keyW = 0;
          keyO = 0;
          keyE = 0;
        }else if(sketch.keyCode === sketch.LEFT_ARROW){
          selectRow --;
          keyB = 1;
          keyS = 0;
          keyM = 0;
          keyL = 0;
          keyW = 0;
          keyO = 0;
          keyE = 0;
        }
      }
      if(selectRow > week[numRows - 1]){
        selectRow = week[numRows - 1];
      }else if(selectRow < 0){
        selectRow = -1;
      }
    }
  };

/**
 * Sleep
 */
  sketch.sleepGraph = function () {
    //x-axis
    //let gapx = boxSize / (week[sketch.floor(numRows/7) - 1] - week[0]);
    let gapx = boxSize / 6;
    //z-axis
    let gapz = boxSize / week[numRows - 1];
    //mapping Manga
    for (let i = 0; i < table.getRowCount(); i++) {
      let hours = (activitycount[i].Sleepcount) * 0.5;
      let x = sketch.width / 2 - boxSize / 2 + gapx * sketch.abs(i % 7);
      let y = sketch.map(
        hours,
        0,
        24,
        sketch.height / 2 + boxSize / 2,
        sketch.height / 2 - boxSize / 2
      );
      let z = boxSize - gapz * sketch.floor(i / 7);
      //datapoints
      let size = sketch.map(hours, 0, 24, 0, 5);
      sketch.strokeWeight(size);
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(size);
        sketch.stroke("white");
      }else{
        sketch.stroke(65, 68, 77);
      }
      //sphere material
      sketch.push();
      sketch.stroke(65, 68, 77);
      sketch.translate(x, y, z);
      sketch.sphere(size);
      sketch.pop();

      //tag
      sketch.push();
      sketch.stroke(65, 68, 77);
      sketch.translate(0, 0, z);
      sketch.textSize(5);
      sketch.fill("black");
      sketch.textAlign(sketch.CENTER);
      //sketch.text(hours, x, y + 20);
      //sketch.text(week[i], x, y + 20);
      sketch.pop();

      //connecting the points
      if (i < numRows - 1) {
        nextX =
        sketch.width / 2 - boxSize / 2 + gapx * sketch.abs((i+1) % 7);
        let hours1 = (activitycount[i+1].Sleepcount) * 0.5;
        nextY = sketch.map(
          hours1,
          0,
          24,
          sketch.height / 2 + boxSize / 2,
          sketch.height / 2 - boxSize / 2
        );
        nextZ = boxSize  - gapz * sketch.floor((i+1) / 7);
      }
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(1.5);
      }else{
        sketch.strokeWeight(0.5);
      }

      sketch.beginShape();
      if (i % 7 != 6) {
        sketch.vertex(x, y, z);
        sketch.vertex(nextX, nextY, nextZ);
      }
      sketch.endShape();
    }

    sketch.keyPressed = function(){
      if(keyB === 1 && 
        keyS === 1 &&
        keyM === 1 &&
        keyL === 1 &&
        keyW === 1 &&
        keyO === 1 &&
        keyE === 1){
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          selectRow ++;
        }else if(sketch.keyCode === sketch.LEFT_ARROW){
          selectRow --;
        }
      }else if(keyS === 1){  
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          selectRow ++;
          keyB = 0;
          keyS = 1;
          keyM = 0;
          keyL = 0;
          keyW = 0;
          keyO = 0;
          keyE = 0;
        }else if(sketch.keyCode === sketch.LEFT_ARROW){
          selectRow --;
          keyB = 0;
          keyS = 1;
          keyM = 0;
          keyL = 0;
          keyW = 0;
          keyO = 0;
          keyE = 0;
        }
      }
      if(selectRow > week[numRows - 1]){
        selectRow = week[numRows - 1];
      }else if(selectRow < 0){
        selectRow = -1;
      }
    }
  };

/**
 * Misc
 */
  sketch.miscGraph = function () {
    //x-axis
    //let gapx = boxSize / (week[sketch.floor(numRows/7) - 1] - week[0]);
    let gapx = boxSize / 6;
    //z-axis
    let gapz = boxSize / week[numRows - 1];
    //mapping Manga
    for (let i = 0; i < table.getRowCount(); i++) {
      let hours = (activitycount[i].Misccount + activitycount[i].Commutecount) * 0.5;
      let x = sketch.width / 2 - boxSize / 2 + gapx * sketch.abs(i % 7);
      let y = sketch.map(
        hours,
        0,
        24,
        sketch.height / 2 + boxSize / 2,
        sketch.height / 2 - boxSize / 2
      );
      let z = boxSize - gapz * sketch.floor(i / 7);
      //datapoints
      let size = sketch.map(hours, 0, 24, 0, 5);
      sketch.strokeWeight(size);
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(size);
        sketch.stroke("white");
      }else{
        sketch.stroke(211, 213, 226);
      }
      sketch.push();
      sketch.stroke(211, 213, 226);
      sketch.translate(x, y, z);
      sketch.sphere(size);
      sketch.pop();

      //tag
      sketch.push();
      sketch.translate(0, 0, z);
      sketch.textSize(5);
      sketch.fill("black");
      sketch.textAlign(sketch.CENTER);
      //sketch.text(hours, x, y + 20);
      //sketch.text(week[i], x, y + 20);
      sketch.pop();

      //connecting the points
      if (i < numRows - 1) {
        nextX =
        sketch.width / 2 - boxSize / 2 + gapx * sketch.abs((i+1) % 7);
        let hours1 = (activitycount[i+1].Misccount + activitycount[i+1].Commutecount) * 0.5;
        nextY = sketch.map(
          hours1,
          0,
          24,
          sketch.height / 2 + boxSize / 2,
          sketch.height / 2 - boxSize / 2
        );
        nextZ = boxSize  - gapz * sketch.floor((i+1) / 7);
      }
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(1.5);
      }else{
        sketch.strokeWeight(0.5);
      }

      sketch.beginShape();
      if (i % 7 != 6) {
        sketch.vertex(x, y, z);
        sketch.vertex(nextX, nextY, nextZ);
      }
      sketch.endShape();
    }

    sketch.keyPressed = function(){
      if(keyB === 1 && 
        keyS === 1 &&
        keyM === 1 &&
        keyL === 1 &&
        keyW === 1 &&
        keyO === 1 &&
        keyE === 1){
          if(sketch.keyCode === sketch.RIGHT_ARROW){
            selectRow ++;
          }else if(sketch.keyCode === sketch.LEFT_ARROW){
            selectRow --;
          }
      }else if(keyM === 1){  
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          selectRow ++;
          keyB = 0;
          keyS = 0;
          keyM = 1;
          keyL = 0;
          keyW = 0;
          keyO = 0;
          keyE = 0;
        }else if(sketch.keyCode === sketch.LEFT_ARROW){
          selectRow --;
          keyB = 0;
          keyS = 0;
          keyM = 1;
          keyL = 0;
          keyW = 0;
          keyO = 0;
          keyE = 0;
        }
      }
      if(selectRow > week[numRows - 1]){
        selectRow = week[numRows - 1];
      }else if(selectRow < 0){
        selectRow = -1;
      }
    }
  };

  /**
 * Learning
 */
  sketch.learningGraph = function () {
    //x-axis
    //let gapx = boxSize / (week[sketch.floor(numRows/7) - 1] - week[0]);
    let gapx = boxSize / 6;
    //z-axis
    let gapz = boxSize / week[numRows - 1];
    //mapping Manga
    for (let i = 0; i < table.getRowCount(); i++) {
      let hours = (
        activitycount[i].Psyc100count + 
        activitycount[i].Acad178count +
        activitycount[i].Acad280count +
        activitycount[i].Thtr213count +
        activitycount[i].Ealc512count +
        activitycount[i].Writ340count +
        activitycount[i].SelfLearningcount
        ) * 0.5;
      let x = sketch.width / 2 - boxSize / 2 + gapx * sketch.abs(i % 7);
      let y = sketch.map(
        hours,
        0,
        24,
        sketch.height / 2 + boxSize / 2,
        sketch.height / 2 - boxSize / 2
      );
      let z = boxSize - gapz * sketch.floor(i / 7);
      //datapoints
      let size = sketch.map(hours, 0, 24, 0, 5);
      sketch.strokeWeight(size);
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(size);
        sketch.stroke("white");
      }else{
        sketch.stroke(183, 218, 179);
      }
      sketch.push();
      sketch.stroke(183, 218, 179);
      sketch.translate(x, y, z);
      sketch.sphere(size);
      sketch.pop();

      //tag
      sketch.push();
      sketch.translate(0, 0, z);
      sketch.textSize(5);
      sketch.fill("black");
      sketch.textAlign(sketch.CENTER);
      //sketch.text(hours, x, y + 20);
      //sketch.text(week[i], x, y + 20);
      sketch.pop();

      //connecting the points
      if (i < numRows - 1) {
        nextX =
        sketch.width / 2 - boxSize / 2 + gapx * sketch.abs((i+1) % 7);
        let hours1 = (
          activitycount[i+1].Psyc100count + 
          activitycount[i+1].Acad178count +
          activitycount[i+1].Acad280count +
          activitycount[i+1].Thtr213count +
          activitycount[i+1].Ealc512count +
          activitycount[i+1].Writ340count +
          activitycount[i+1].SelfLearningcount
        ) * 0.5;
        nextY = sketch.map(
          hours1,
          0,
          24,
          sketch.height / 2 + boxSize / 2,
          sketch.height / 2 - boxSize / 2
        );
        nextZ = boxSize  - gapz * sketch.floor((i+1) / 7);
      }
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(1.5);
      }else{
        sketch.strokeWeight(0.5);
      }
      sketch.beginShape();
      if (i % 7 != 6) {
        sketch.vertex(x, y, z);
        sketch.vertex(nextX, nextY, nextZ);
      }
      sketch.endShape();
    }

    sketch.keyPressed = function(){
      if(keyB === 1 && 
        keyS === 1 &&
        keyM === 1 &&
        keyL === 1 &&
        keyW === 1 &&
        keyO === 1 &&
        keyE === 1){
          if(sketch.keyCode === sketch.RIGHT_ARROW){
            selectRow ++;
          }else if(sketch.keyCode === sketch.LEFT_ARROW){
            selectRow --;
          }
      }else if(keyL === 1){  
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          selectRow ++;
          keyB = 0;
          keyS = 0;
          keyM = 0;
          keyL = 1;
          keyW = 0;
          keyO = 0;
          keyE = 0;
        }else if(sketch.keyCode === sketch.LEFT_ARROW){
          selectRow --;
          keyB = 0;
          keyS = 0;
          keyM = 0;
          keyL = 1;
          keyW = 0;
          keyO = 0;
          keyE = 0;
        }
      }
      if(selectRow > week[numRows - 1]){
        selectRow = week[numRows - 1];
      }else if(selectRow < 0){
        selectRow = -1;
      }
    }
  };

/**
 * Social
 */
   sketch.socialGraph = function () {
    //x-axis
    //let gapx = boxSize / (week[sketch.floor(numRows/7) - 1] - week[0]);
    let gapx = boxSize / 6;
    //z-axis
    let gapz = boxSize / week[numRows - 1];
    //mapping Manga
    for (let i = 0; i < table.getRowCount(); i++) {
      activityCategories["Social"] = "Social";
      activityCategories["Dance"] = "Social";
      activityCategories["Church"] = "Social";
      let hours = (
        activitycount[i].Socialcount + 
        activitycount[i].Dancecount +
        activitycount[i].Churchcount 
        ) * 0.5;
      let x = sketch.width / 2 - boxSize / 2 + gapx * sketch.abs(i % 7);
      let y = sketch.map(
        hours,
        0,
        24,
        sketch.height / 2 + boxSize / 2,
        sketch.height / 2 - boxSize / 2
      );
      let z = boxSize - gapz * sketch.floor(i / 7);
      //datapoints
      let size = sketch.map(hours, 0, 24, 0, 5);
      sketch.strokeWeight(size);
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(size);
        sketch.stroke("white");
      }else{
        sketch.stroke(217, 243, 255);
      }
      sketch.push();
      sketch.stroke(217, 243, 255);
      sketch.translate(x, y, z);
      sketch.sphere(size);
      sketch.pop();

      //tag
      sketch.push();
      sketch.translate(0, 0, z);
      sketch.textSize(5);
      sketch.fill("black");
      sketch.textAlign(sketch.CENTER);
      //sketch.text(hours, x, y + 20);
      //sketch.text(week[i], x, y + 20);
      sketch.pop();

      //connecting the points
      if (i < numRows - 1) {
        nextX =
        sketch.width / 2 - boxSize / 2 + gapx * sketch.abs((i+1) % 7);
        let hours1 = (
          activitycount[i+1].Socialcount + 
          activitycount[i+1].Dancecount +
          activitycount[i+1].Churchcount 
        ) * 0.5;
        nextY = sketch.map(
          hours1,
          0,
          24,
          sketch.height / 2 + boxSize / 2,
          sketch.height / 2 - boxSize / 2
        );
        nextZ = boxSize  - gapz * sketch.floor((i+1) / 7);
      }
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(1.5);
      }else{
        sketch.strokeWeight(0.5);
      }

      sketch.beginShape();
      if (i % 7 != 6) {
        sketch.vertex(x, y, z);
        sketch.vertex(nextX, nextY, nextZ);
      }
      sketch.endShape();
    }

    sketch.keyPressed = function(){
      if(keyB === 1 && 
        keyS === 1 &&
        keyM === 1 &&
        keyL === 1 &&
        keyW === 1 &&
        keyO === 1 &&
        keyE === 1){
          if(sketch.keyCode === sketch.RIGHT_ARROW){
            selectRow ++;
          }else if(sketch.keyCode === sketch.LEFT_ARROW){
            selectRow --;
          }
      }else if(keyO === 1){  
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          selectRow ++;
          keyB = 0;
          keyS = 0;
          keyM = 0;
          keyL = 0;
          keyW = 0;
          keyO = 1;
          keyE = 0;
        }else if(sketch.keyCode === sketch.LEFT_ARROW){
          selectRow --;
          keyB = 0;
          keyS = 0;
          keyM = 0;
          keyL = 0;
          keyW = 0;
          keyO = 1;
          keyE = 0;
        }
      }
      if(selectRow > week[numRows - 1]){
        selectRow = week[numRows - 1];
      }else if(selectRow < 0){
        selectRow = -1;
      }
    }
  };

/**
 * Eat
 */
   sketch.eatGraph = function () {
    //x-axis
    //let gapx = boxSize / (week[sketch.floor(numRows/7) - 1] - week[0]);
    let gapx = boxSize / 6;
    //z-axis
    let gapz = boxSize / week[numRows - 1];
    //mapping Manga
    for (let i = 0; i < table.getRowCount(); i++) {
      let hours = (activitycount[i].Eatcount) * 0.5;
      let x = sketch.width / 2 - boxSize / 2 + gapx * sketch.abs(i % 7);
      let y = sketch.map(
        hours,
        0,
        24,
        sketch.height / 2 + boxSize / 2,
        sketch.height / 2 - boxSize / 2
      );
      let z = boxSize - gapz * sketch.floor(i / 7);
      //datapoints
      let size = sketch.map(hours, 0, 24, 0, 5);
      sketch.strokeWeight(size);
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(size);
        sketch.stroke("white");
      }else{
        sketch.stroke(255, 255, 255);
      }
      sketch.push();
      sketch.stroke(255, 255, 255);
      sketch.translate(x, y, z);
      sketch.sphere(size);
      sketch.pop();

      //tag
      sketch.push();
      sketch.translate(0, 0, z);
      sketch.textSize(5);
      sketch.fill("black");
      sketch.textAlign(sketch.CENTER);
      //sketch.text(hours, x, y + 20);
      //sketch.text(week[i], x, y + 20);
      sketch.pop();

      //connecting the points
      if (i < numRows - 1) {
        nextX =
        sketch.width / 2 - boxSize / 2 + gapx * sketch.abs((i+1) % 7);
        let hours1 = (activitycount[i+1].Eatcount) * 0.5;
        nextY = sketch.map(
          hours1,
          0,
          24,
          sketch.height / 2 + boxSize / 2,
          sketch.height / 2 - boxSize / 2
        );
        nextZ = boxSize  - gapz * sketch.floor((i+1) / 7);
      }
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(1.5);
      }else{
        sketch.strokeWeight(0.5);
      }

      sketch.beginShape();
      if (i % 7 != 6) {
        sketch.vertex(x, y, z);
        sketch.vertex(nextX, nextY, nextZ);
      }
      sketch.endShape();
    }

    sketch.keyPressed = function(){
      if(keyB === 1 && 
        keyS === 1 &&
        keyM === 1 &&
        keyL === 1 &&
        keyW === 1 &&
        keyO === 1 &&
        keyE === 1){
          if(sketch.keyCode === sketch.RIGHT_ARROW){
            selectRow ++;
          }else if(sketch.keyCode === sketch.LEFT_ARROW){
            selectRow --;
          }
      }else if(keyE === 1){  
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          selectRow ++;
          keyB = 0;
          keyS = 0;
          keyM = 0;
          keyL = 0;
          keyW = 0;
          keyO = 0;
          keyE = 1;
      }else if(sketch.keyCode === sketch.LEFT_ARROW){
          selectRow --;
          keyB = 0;
          keyS = 0;
          keyM = 0;
          keyL = 0;
          keyW = 0;
          keyO = 0;
          keyE = 1;
        }
      }
      if(selectRow > week[numRows - 1]){
        selectRow = week[numRows - 1];
      }else if(selectRow < 0){
        selectRow = -1;
      }
    }
  };

/**
 * Work
 */
   sketch.workGraph = function () {
    //x-axis
    //let gapx = boxSize / (week[sketch.floor(numRows/7) - 1] - week[0]);
    let gapx = boxSize / 6;
    //z-axis
    let gapz = boxSize / week[numRows - 1];
    //mapping Manga
    for (let i = 0; i < table.getRowCount(); i++) {
      let hours = (activitycount[i].Workcount) * 0.5;
      let x = sketch.width / 2 - boxSize / 2 + gapx * sketch.abs(i % 7);
      let y = sketch.map(
        hours,
        0,
        24,
        sketch.height / 2 + boxSize / 2,
        sketch.height / 2 - boxSize / 2
      );
      let z = boxSize - gapz * sketch.floor(i / 7);
      //datapoints
      let size = sketch.map(hours, 0, 24, 0, 5);
      sketch.strokeWeight(size);
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(size);
        sketch.stroke("white");
      }else{
        sketch.stroke(239, 253, 237);
      }
      sketch.push();
      sketch.stroke(239, 253, 237);
      sketch.translate(x, y, z);
      sketch.sphere(size);
      sketch.pop();

      //tag
      sketch.push();
      sketch.translate(0, 0, z);
      sketch.textSize(5);
      sketch.fill("black");
      sketch.textAlign(sketch.CENTER);
      //sketch.text(hours, x, y + 20);
      //sketch.text(week[i], x, y + 20);
      sketch.pop();

      //connecting the points
      if (i < numRows - 1) {
        nextX =
        sketch.width / 2 - boxSize / 2 + gapx * sketch.abs((i+1) % 7);
        let hours1 = (activitycount[i+1].Workcount) * 0.5;
        nextY = sketch.map(
          hours1,
          0,
          24,
          sketch.height / 2 + boxSize / 2,
          sketch.height / 2 - boxSize / 2
        );
        nextZ = boxSize  - gapz * sketch.floor((i+1) / 7);
      }
      if(sketch.floor(i/7) === selectRow){
        sketch.strokeWeight(1.5);
      }else{
        sketch.strokeWeight(0.5);
      }

      sketch.beginShape();
      if (i % 7 != 6) {
        sketch.vertex(x, y, z);
        sketch.vertex(nextX, nextY, nextZ);
      }
      sketch.endShape();
    }

    sketch.keyPressed = function(){
      if(keyB === 1 && 
        keyS === 1 &&
        keyM === 1 &&
        keyL === 1 &&
        keyW === 1 &&
        keyO === 1 &&
        keyE === 1){
          if(sketch.keyCode === sketch.RIGHT_ARROW){
            selectRow ++;
          }else if(sketch.keyCode === sketch.LEFT_ARROW){
            selectRow --;
          }
      }else if(keyW === 1){  
        if(sketch.keyCode === sketch.RIGHT_ARROW){
          selectRow ++;
          keyB = 0;
          keyS = 0;
          keyM = 0;
          keyL = 0;
          keyW = 1;
          keyO = 0;
          keyE = 0;
        }else if(sketch.keyCode === sketch.LEFT_ARROW){
          selectRow --;
          keyB = 0;
          keyS = 0;
          keyM = 0;
          keyL = 0;
          keyW = 1;
          keyO = 0;
          keyE = 0;
        }
      }
      if(selectRow > week[numRows - 1]){
        selectRow = week[numRows - 1];
      }else if(selectRow < 0){
        selectRow = -1;
      }
    }
  };

};

class activityCount{
  constructor(date, day,
    Mangacount,
    Varietycount,
    Misccount,
    Commutecount,
    Eatcount,
    Socialcount,
    Dancecount,
    Churchcount,
    Sleepcount,
    Psyc100count,
    Acad178count,
    Acad280count,
    Thtr213count,
    Ealc512count,
    Writ340count,
    SelfLearningcount,
    Workcount
    ){
    this.date = date;
    this.day = day;

    this.Mangacount = Mangacount;
    this.Varietycount = Varietycount;
    this.Misccount = Misccount;
    this.Commutecount = Commutecount;
    this.Eatcount = Eatcount;
    this.Socialcount = Socialcount;
    this.Dancecount = Dancecount;
    this.Churchcount = Churchcount;
    this.Sleepcount = Sleepcount;
    this.Psyc100count = Psyc100count;
    this.Acad178count = Acad178count;
    this.Acad280count = Acad280count;
    this.Thtr213count = Thtr213count;
    this.Ealc512count = Ealc512count;
    this.Writ340count = Writ340count;
    this.SelfLearningcount = SelfLearningcount;
    this.Workcount = Workcount;
  }
}

new p5(s1);
