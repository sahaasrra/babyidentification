img = "";
status = "";
object =[];
alert = "";
function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start()
{
  objectDetector = ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById("status").innerHTML = "status - Detecting Objects";
}
function preload()
{
  img = loadImage('dog_cat.jpg');
  alert = "audio.mp3";
}
function draw()
{
  image(video,0,0,380,380);

  if(status!= "")
  {
     objectDetector.detect(video, gotResult);
     r = random(255);
     g = random(255);
     b = random(255);

    for(i = 0; i < object.length; i++)
    {
      document.getElementById("status").innerHTML = "Status : object Detected";
      document.getElementById("number_of_objects").innerHTML = "number of objects detected are :" + object.length;
      percent = floor(object[i].confidence * 100);
      text(object[i].label + "" + percent + "%",object[i].x,object[i].y);
      fill(r,g,b);
      noFill();
      stroke(r,g,b);
      rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
  }
    

  if(status = person)
  {
    objectDetector.detect(video, gotResult);
    for(i = 0; i < object.length; i++)
    {
      document.getElementById("status").innerHTML = "Status : Baby Detected";
      fill(blue);
      noFill();
      stroke(blue);
      rect(object[i].x,object[i].y,object[i].width,object[i].height);
      alert.stop();
    }
  }
  else
  {
    document.getElementById("status").innerHTML = "Status : Baby Not Found";
    alert.play();
  }

  if( 0 < object.length)
  {
    document.getElementById("status").innerHTML = "Status : Baby Not Detected";
    alert.play();
  }
}
function modelLoaded()
 {
   console.log("Model Loaded!");
   status = true;
 }


function gotResult(error,results)
{
   if(error)
   {
     console.log(error);
   }
   console.log(results);
   object = results;
}
