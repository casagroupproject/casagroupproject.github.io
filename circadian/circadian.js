var osc, fft, r1, count2, count3, count4, table, mySound;
var light, tweet_mood, tweet_mood_word, tweet_count, night_day;
var osc1, osc2, filt;
var r;
var theta;
var angle, angle1, angle2, cSize;
var cSize ;
var joy_count, sadness_count, unknown_count, anger_count;
var phi 
var amplitude
var frequency 
var numPoints 
var p;
var t;
var spacing;
var time;
var img;

var selected = [];


1       // create an instance of scribble and set a few parameters
        var scribble    = new Scribble();



function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
 //table = loadTable('http://0.0.0.0:8000/circadian.csv', 'csv', 'header');
  table = loadTable('circadian.csv', 'csv', 'header');
  
}

function setup() {

  frameRate(45);
  createCanvas(windowWidth, windowHeight);
  //createCanvas(windowWidth, windowHeight);
//img = loadImage("http://0.0.0.0:8000/Star_Const.png");
img = loadImage("Star_Const.png");

//createCanvas(800, 400)
  spacing = 30;
  selected.length = 5; 
    
    for(var i =0; i<selected.length; i++)
    {
        selected[i] = true;
        //notes[i] = random(100,1000);
    }


    textFont('Courier-Bold', 14);

  // Make a new Pendulum with an origin position and armlength
  p = new Pendulum(createVector(width/2,0),175);


 phi =  0; // the phase shift offset amount
 amplitude = 50; // the amplitude of our wave
 frequency = 1.0/32; // slow down our wave so we can see it better
 //frequency = 1.0/32; // slow down our wave so we can see it better
 numPoints = 100; // the granularity of our drawing


  
  //prev
  r1=0;

  cSize = 200;
  angle1 = random(PI);
  angle2 = random(PI);

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(110);
  osc.amp(0.2);
  osc.disconnect();
  osc.connect(filt);
  osc.connect();
  osc.start();

    delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime, feedback, filter frequency
  // play with these numbers!!
  delay.process(osc, .12, .7, 2300);

  // play the noise with an envelope,
  // a series of fades ( time / value pairs )
  env = new p5.Env(.01, 0.2, .2, .1);

    fft = new p5.FFT();



   //r = 500;
   r = 250;
   //r = height/3;
   theta = -1.5;


time = 0;



}

function draw() {
  //wave background
  background(0,0,0);
     image(img, width*.85,  height*.05, img.width/3, img.height/3);

      push();
      fill(255, 255, 255);
      text('DAYTIME/NIGHTIME(Length of Darkness)', width*0.02, 30, 300, 200);
      textFont('Courier-Bold', 32);
            text('TIME: ' + table.getString(r1, 0), width*.45, height*.8, 360, 200);
      textFont('Courier-Bold', 32);
      text('PLACE: London', width*.45, height*.9, 360, 200);
      text('SUBJECT: Male', width*.7, height*.015, 360, 200);
      textFont('Courier-Bold', 14);
      text('LIGHT-SQM READING as Brightness Clock',  width*.35, height*.6, 100, 200); 
             fill(255);
         strokeWeight(.5);
         text('Constellation: Orion', width*.7, height*.15, 200, 300); 
      //text('Clock Hand=' + r1, 100, 180, 100, 200); 
      pop();
 
  //PULSE O METER
  push();
      translate(width/2,height/3); // Much simpler if we translate to the center of the screen
     

     var frequency2 = 1.0/count2; // slow down our wave so we can see it better
     var frequency3 = 1.0/count3; // slow down our wave so we can see it better
     var frequency4 = 1.0/count4; // slow down our wave so we can see it better

      //NEW WAVE
        var x4 = 0;
        var y4 = 0;
        
        // if we consider 1 pixel to be 1 radian, then this is the number 
        // of radians between points
        var angle4 = width/3/numPoints;
        push();
        //fill(0, 102, 153);
        fill(255);
         text('SYSTOLIC BP', width/4, height/4, 300, 300); 
         text(table.getString(r1, 1), width/3, height/4, 100, 300); 


         pop();
        // we are drawing the curve using our shape tool
        beginShape();
         //background(0,0,0);
        for (var i = 0; i < numPoints; i++) {
          
          // calculate where we are along x
          x4 = angle4*i;
          
          // y is determined by our function
          y4 = sin(x4*frequency2+phi)* amplitude;
           
                 strokeWeight(3);
           stroke(246, 240, 98);
          //text('TEST', x4+500, y4+100, 100, 200); 
          vertex(x4+(width/4), y4+(height/3));

        }
        endShape();
  
      // phase shift to the left so the wave appears to b marching to the right
      phi -= .05;

      //NEW WAVE
        var x4 = 0;
        var y4 = 0;
                push();
       fill(255);
       strokeWeight(1);
         text('DIASTOLIC BP', width/4, height*.45, 200, 300); 
        text(table.getString(r1, 2), width/3, height*.45, 100, 300); 
         

         pop();
        // if we consider 1 pixel to be 1 radian, then this is the number 
        // of radians between points
        var angle4 = width/3/numPoints;
        
        // we are drawing the curve using our shape tool
        beginShape();
        for (var i = 0; i < numPoints; i++) {
          
          // calculate where we are along x
          x4 = angle4*i;
          stroke(246, 240, 98);
          // y is determined by our function
          y4 = sin(x4*frequency3+phi)* amplitude;
           strokeWeight(3);
           stroke(246, 240, 98);
         vertex(x4+(width/4), y4+(height*.55));

        }
        endShape();
  
      // phase shift to the left so the wave appears to b marching to the right
      phi -= .05;


      //NEW WAVE
        var x4 = 0;
        var y4 = 0;
        
                push();
        fill(255);
        strokeWeight(.5);
         text('HEART RATE', width/4, height*.08, 200, 300); 
         text(table.getString(r1, 3),  width/3, height*.08, 100, 300); 
         pop();
        // if we consider 1 pixel to be 1 radian, then this is the number 
        // of radians between points
        var angle4 = width/3/numPoints;
        
        // we are drawing the curve using our shape tool
        beginShape();
        for (var i = 0; i < numPoints; i++) {
          
          // calculate where we are along x
          x4 = angle4*i;
          strokeWeight(3);
          // y is determined by our function
          y4 = sin(x4*frequency4+phi)* amplitude;
           stroke(246, 240, 98);
          vertex(x4+(width/4), y4+(height/6));

        }
        endShape();
  
      // phase shift to the left so the wave appears to b marching to the right
      phi -= .05;

      //MOOD CIRCLE
      noStroke();
 
//fill(count4, count3, count2);
   fill(178, count4, 242);
ellipse(0, 0, width*.25, width*.25);
push();
  for(var i = 0; i < 360; i+=2){
    var x_w = cos(radians(i)) * 50;
    var y_w = sin(radians(i)) *100;
    var w_w = sin(radians(time+i )) * 290;
    w_w = abs(w_w);

    var col=map(i,0,360,120,255);
    fill(col,col,col);

    noStroke();

    //fill(count4, count3, count2+30);
   fill(178, count4 , 242-count2);

    //ellipse(x_w, y_w, w_w, w_w);

  }
  time++;
  pop();


      for (var i = 0; i < 24; ++i) {
        push();
          rotate(radians(i*15));
          fill(102, 0, 102);
          noStroke();
          ellipse(width*.15, 0, 25, 25);


        pop();
      }
       pop();



  //MOVING SPOT     
  //Polar coordinates (r,theta) are converted to Cartesian (x,y) for use in the ellipse() function.

  var x = r * cos(theta);
  var y = r * sin(theta);
 
  //noStroke();
  //fill(0);
  stroke(255);
  strokeWeight(4);
  //ellipse(500, 500, 16, 16);
  //ellipse(x+(width*.42), y+(height*.42), 16, 16);

  ellipse(x + width/2, y+ height/3, 16, 16);
  
  //print("x" + x);
  //print("y" + y);
  noStroke();

  theta += 0.01;



        push();
        fill(255);
        strokeWeight(.5);
        //noStroke();
         text('TWITTER MOOD applied as Low Pass Filter to Audio File and Wave Analysed with FFT', width*0.02, height*0.75, 450, 400); 
         //text('Freq= '+freq, 60, 730, 300, 400); 
         //text(table.getString(r1, 1), 350, 70, 100, 300); 
         pop();

         

  var waveform = fft.waveform();  // analyze the waveform
  beginShape();
  strokeWeight(5);
  stroke(255);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width/3);
    var y = map(waveform[i], -1, 1, height/8, 0);
    vertex(width*0.02+x, height*0.8+y);
  }
  endShape();
     noStroke();
       if(frameCount%13==1)
        {
          r1=(r1+1)%49;
          //print(r1);
          //text('HR=' +  table.getString(r1, 3), 100, 200, 100, 200); 
          count2 = table.getString(r1, 3)/4;
          count3 = table.getString(r1, 2);
          count4 = table.getString(r1, 1);

          light = table.getString(r1, 6);
          tweet_mood = table.getString(r1, 4);
          tweet_count = table.getString(r1, 5);
          tweet_mood_word = table.getString(r1, 8);
          night_day = table.getString(r1, 7);
          anger_count = table.getString(r1, 9);
          joy_count = table.getString(r1, 10);
          sadness_count = table.getString(r1, 11);
          unknown_count = table.getString(r1, 12);
          //osc2.freq(freq);

          freq = map(table.getString(r1, 1), 0, width, 20, 10000);
          //osc.freq(freq/2);
          osc.freq(random(255));

          //print(count2);


         }

       push();

        fill(255);
        text('TWITTER MOOD COUNT as Colour and Size. Dominant Mood=' + tweet_mood_word + '. Count=' + tweet_count, width*0.02, width*0.23, width*0.35, 200); 
         //text(table.getString(r1, 1), 350, 70, 100, 300); 


       var scribble = new Scribble();              // global mode
            scribble.bowing    = 1.8;
            scribble.roughness = 1.8;

            strokeWeight(5);
 

 

          stroke(204, 0, 0);
          scribble.scribbleRoundedRect(width*0.03, height*0.6,  anger_count/8, anger_count/8, 400);
          strokeWeight(1); 
          fill(255);
          text("Anger",width*0.02,height*0.7);
          strokeWeight(9);
          noFill();
         stroke(255, 128, 0);
        scribble.scribbleEllipse( width*0.07, height*0.6, joy_count/8, joy_count/8);
         strokeWeight(1); 
          fill(255);
          text("Joy",width*0.07,height*0.7);
         //fill(255, 153, 153);
         strokeWeight(5);
         stroke(0, 51, 102);
        scribble.scribbleRect(width*0.11, height*0.6, sadness_count/8, sadness_count/8);
          strokeWeight(1); 
          fill(255);
          text("Sad",width*0.10,height*0.7);
          strokeWeight(2);
         stroke(192, 192, 192);
         //fill(192, 192, 192);
         strokeWeight(1); 
         noFill();
        ellipse( width*0.15, height*0.6, unknown_count/8, unknown_count/8);
        fill(255);
        noStroke();
        fill(102, 0, 102);
         ellipse( width*0.21, height*0.6, 50, 50);
         strokeWeight(1); 
          fill(255);
          text("Unknown",width*0.14,height*0.7);
          strokeWeight(1); 
          fill(255);
          text("Sound On/Off",width*0.21,height*0.7);

       pop();


  push();
  stroke(0);
  fill(0);
  strokeWeight(0);
  angle1 += 0.0013;
  angle2 += 0.0002;
  angle = angle1 + angle2;
  
  translate(width/2, height/3);
  rotate(angle2-angle1);

      var dia = 80;
      f(dia ,i);

    //}
    //pop();
  //}
pop(); 


//PENDULUM
  //background(51);
 p.go();
 night_day = table.getString(r1, 7);


    for(var i = 0; i<5; i++)
    {

        if(i==t) fill(255,0,0);


        if(selected[i]){
           fill(150,150,255) 
           //point(70+ i*spacing, 480, 100);
           text("On", (width*.02)+ i*spacing, height*.55)


           if(selected[4]==true){

           }

        }else{

           fill(255,0,0) 


           if(selected[4]==false){

            osc.stop();  
            osc.disconnect();

           }

        } 

        noFill();

    }


if (mouseIsPressed)
{
    var eye = int(mouseX/spacing);
    if(eye>-1 && eye<selected.length) selected[eye]=!selected[eye];
    //print(eye);
    print(selected[eye]);
}


}

function f(r, i){
  //print('r=' + r1);
 var rx = 15 * cos(TAU * i / 70), ry = 15 * sin(TAU * i / 70);
}




function Pendulum(origin_, r_) {
  // Fill all variables
  this.origin = origin_.copy();
  this.position = createVector();
  this.r = r_;
  this.angle = PI/4;

  this.aVelocity = 0.0;
  this.aAcceleration = 0.0;
  this.damping = 0.999;   // Arbitrary damping
  this.ballr = 48.0;      // Arbitrary ball radius

  this.go = function() {

    this.update();
    this.display();

  };

  // Function to update position
  this.update = function() {
    var gravity = 0.9;                                               // Arbitrary constant
    this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle);  // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
    this.aVelocity += this.aAcceleration;                            // Increment velocity
    this.aVelocity *= this.damping;                                  // Arbitrary damping
    this.angle += this.aVelocity;                                    // Increment angle
  };

  this.display = function() {
    this.position.set(this.r*sin(this.angle), this.r*cos(this.angle), 0);         // Polar to cartesian conversion
    this.position.add(this.origin);                                               // Make sure the position is relative to the pendulum's origin

    stroke(255);
    strokeWeight(2);
    // Draw the arm
    //line(this.origin.x-(width*.40), this.origin.y+(height*.09), this.position.x-(width*.40), this.position.y+(height*.022));
    line(this.origin.x-500, this.origin.y+50, this.position.x-500, this.position.y+50);
    //ellipseMode(CENTER);
    noStroke();
    strokeWeight(1);
    push();

        
    if(night_day==1){


push();
    stroke(9);  
    //fill(255,255,51);
    fill(246, 240, 98);


  star(this.position.x-500, this.position.y+50, 80, 60, 40); 
      ellipse(this.position.x-500, this.position.y+50, this.ballr+60, this.ballr+60);

  pop();

    }else{
    fill(224);

    push();
    fill(255, 255, 255);
     ellipse(this.position.x-500, this.position.y+50, this.ballr+60, this.ballr+60);
     //noFill();
     noStroke();
     fill(0);
     ellipse(this.position.x-450, this.position.y+40, this.ballr+60, this.ballr+60);


      pop();


  push();
  translate(width*0.08, height*0.05);
  //rotate(frameCount / -100.0);
  //star
  //star(this.position-500, this.position.y+50, 20, 50, 5); 
  pop();
    }
    pop();  

  };
}


function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

