bed_img = "";
dstatus = "";
objects = [];
objectDetector = "";


 function preload(){
    bed_img = loadImage("bedroom.jpg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.position(370, 220);

    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Objects Detecting"
}

function modelloaded(){
  console.log("Model has Loaded");
  dstatus = true;
  objectDetector.detect(bed_img, gotResults)
}

function gotResults(results, error){
  if(error){
    console.log(error);
  }
  else{
    console.log(results);
    objects = results;
  } 
} 



function draw(){
    image(bed_img, 0, 0, 640, 420);
    
    if(dstatus != ""){
    for(i=0; i<objects.length; i++){
      document.getElementById("status").innerHTML = "Staus: Objects Detected";

      confidence = floor(objects[i].confidence * 100);
      label = objects[i].label; 
      text(label + " " + confidence + "%", objects[i].x + 15, objects[i].y + 15);
      fill(255, 0, 0);
      stroke(255, 0, 0);
      nofill();
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    }
  }
}