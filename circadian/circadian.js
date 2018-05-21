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

  //frameRate(60);
  createCanvas(windowWidth, windowHeight);
//img = loadImage("http://0.0.0.0:8000/Star_Const.png");
img = loadImage("Star_Const.png");

//createCanvas(800, 400)
  spacing = 80;
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
  osc.amp(0.5);
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



   r = 325;
   theta = -1.5;


time = 0;



}

function draw() {
  //wave background
  background(0,0,0);
     image(img,1600, 50, img.width/2, img.height/2);

      push();
      fill(255, 255, 255);
      text('DAYTIME/NIGHTIME(Length of Darkness)', 60, 30, 300, 200);
      textFont('Courier-Bold', 32);
            text('TIME: ' + table.getString(r1, 0), 640, 660, 360, 200);
      textFont('Courier-Bold', 32);
      text('PLACE: London', 1050, 660, 360, 200);
      text('SUBJECT: Male', 1300, 10, 360, 200);
      textFont('Courier-Bold', 14);
      text('LIGHT-SQM READING as Brightness Clock', 550, 250, 100, 200); 
             fill(255);
         strokeWeight(.5);
         text('Constellation: ORion', 1300, 150, 200, 300); 
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
         text('SYSTOLIC BP', 470, 280, 200, 300); 
         text(table.getString(r1, 1), 470, 290, 100, 300); 


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
          vertex(x4+630, y4+290);

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
         text('DIASTOLIC BP', 470, 450, 200, 300); 
        text(table.getString(r1, 2), 470, 470, 100, 300); 
         

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
          vertex(x4+630, y4+500);

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
         text('HEART RATE', 470, 80, 200, 300); 
         text(table.getString(r1, 3), 470, 120, 100, 300); 
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
          vertex(x4+630, y4+100);

        }
        endShape();
  
      // phase shift to the left so the wave appears to b marching to the right
      phi -= .05;

      //MOOD CIRCLE
      noStroke();
 
//fill(count4, count3, count2);
   fill(178, count4, 242);
ellipse(0, 0, 450, 450);
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

    ellipse(x_w, y_w, w_w, w_w);

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
  ellipse(x+width/2, y+height/3, 16, 16);
  //print("x" + x);
  //print("y" + y);
  noStroke();

  theta += 0.01;



        push();
        fill(255);
        strokeWeight(.5);
        //noStroke();
         text('TWITTER MOOD applied as Low Pass Filter to Audio File and Wave Analysed with FFT', 60, 750, 450, 400); 
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
    vertex(60+x, 800  +y);
  }
  endShape();
     noStroke();
       if(frameCount%12==1)
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
        text('TWITTER MOOD COUNT as Colour and Size. Dominant Mood=' + tweet_mood_word + '. Count=' + tweet_count, 60, 450, 350, 400); 
         //text(table.getString(r1, 1), 350, 70, 100, 300); 


       var scribble = new Scribble();              // global mode
            scribble.bowing    = 1.8;
            scribble.roughness = 1.8;

            strokeWeight(5);
 

 

          stroke(204, 0, 0);
          scribble.scribbleRoundedRect(80, 590,  anger_count/8, anger_count/8, 400);
          strokeWeight(1); 
          fill(255);
          text("Anger",60, 660);
          strokeWeight(9);
          noFill();
         stroke(255, 128, 0);
        scribble.scribbleEllipse( 150, 590, joy_count/8, joy_count/8);
         strokeWeight(1); 
          fill(255);
          text("Joy",130, 660);
         //fill(255, 153, 153);
         strokeWeight(5);
         stroke(0, 51, 102);
        scribble.scribbleRect(220, 590, sadness_count/8, sadness_count/8);
          strokeWeight(1); 
          fill(255);
          text("Sad",200, 660);
          strokeWeight(2);
         stroke(192, 192, 192);
         //fill(192, 192, 192);
         strokeWeight(1); 
         noFill();
        ellipse( 300, 590, unknown_count/8, unknown_count/8);
        fill(255);
        noStroke();
        fill(102, 0, 102);
         ellipse( 390, 590, 50, 50);
         strokeWeight(1); 
          fill(255);
          text("Unknown",270, 660);
          strokeWeight(1); 
          fill(255);
          text("Sound On/Off",390, 650);

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
           text("On", 70+ i*spacing, 520)


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
    line(this.origin.x-700, this.origin.y+80, this.position.x-700, this.position.y+100);
    //ellipseMode(CENTER);
    noStroke();
    strokeWeight(1);
    push();

        
    if(night_day==1){


push();
    stroke(9);  
    //fill(255,255,51);
    fill(246, 240, 98);


  star(this.position.x-700, this.position.y+100, 80, 100, 40); 
      ellipse(this.position.x-700, this.position.y+100, this.ballr+100, this.ballr+100);

  pop();

    }else{
    fill(224);

    push();
    fill(255, 255, 255);
     ellipse(this.position.x-700, this.position.y+100, this.ballr+100, this.ballr+100);
     //noFill();
     noStroke();
     fill(0);
     ellipse(this.position.x-650, this.position.y+90, this.ballr+100, this.ballr+100);


      pop();


  push();
  translate(width*0.08, height*0.05);
  //rotate(frameCount / -100.0);
  star(this.position.x-700, this.position.y-40, 20, 50, 5); 
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


