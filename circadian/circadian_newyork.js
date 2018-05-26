
//Circadian Clock Prototype Sketch
//All Code Borrowed from P5 JS Refrecne and Exmaples, and UCL Intro to Programming Autumm Course

//Light and Tweet Data
var table, light, count2, count3, count4, tweet_mood, tweet_mood_word, tweet_count, night_day;
var joy_count, sadness_count, unknown_count, anger_count;
//Synth 
var osc, fft, osc1, osc2, filt, mySound;
//Ellipse
var r, r1;
var theta;
//Wave
var angle, angle1, angle2, cSize;
var cSize ;
var phi, amplitude, frequency, numPoints 
var p;
var t;
//Misc 
var spacing;
var time;
var img, img2;
//Mood Button Selected Array 
var selected = [];

// scribble library 
var scribble  = new Scribble();


//PreLoader for Tables, Images, Fonts
function preload() {
  
  //Local and Local HTTP Server Versions Required for TE=esting. 
  //You also need to Disable Cross Origin REstriction in DEveloper Console on Browser during Local Tesing
  //table = loadTable('http://0.0.0.0:8000/circadian/circadian_newyork.csv', 'csv', 'header');
  table = loadTable('circadian/circadian_newyork.csv', 'csv', 'header');

  //font_bold = loadFont('http://0.0.0.0:8000/circadian/Inconsolata-Bold.ttf')
  //font = loadFont('http://0.0.0.0:8000/circadian/Inconsolata-Bold.ttf')
  font = loadFont('circadian/Inconsolata-Regular.ttf')
  font_bold = loadFont('circadian/Inconsolata-Bold.ttf')

  //img = loadImage("http://0.0.0.0:8000/circadian/Star_Const.png");
  //img2 = loadImage("http://0.0.0.0:8000/circadian/mute.png");
  img = loadImage("circadian/Star_Const.png");
  img2 = loadImage("circadian/mute.png");
}


function setup() {

  //Synch Ellipse Orbit with 24 Hour Data Row Traversal
  frameRate(45);

  //AutoSize Canvas To
  //NB: This needs more work. Currently only renders OK at Full Screen IMAC and MACBook
  //NEeds to be responsive. More Width and Height Variables, less hardcoded Numbers
  createCanvas(windowWidth, windowHeight);


  //Spacer for INTro To Prog Step Sequencer Array. 5 Off Buttons for The Twitter Mood Audio Processer.
  spacing = width*0.05;
  selected.length = 5; 
    
    //Generate the Buttons
    for(var i =0; i<selected.length; i++)
    {
        selected[i] = true;
    }

   //Default Font and Fnt Size
  textFont(font, 14);

  // Make a new Pendulum with an origin position and armlength
  p = new Pendulum(createVector(width/2,0),175);

  //Set Up the Vital Life Signs Wave Variables
  phi =  0; // the phase shift offset amount
  amplitude = 50; // the amplitude of our wave
  frequency = 1.0/32; // slow down our wave so we can see it better
  //frequency = 1.0/32; // slow down our wave so we can see it better
  numPoints = 100; // the granularity of our drawing

  
  //Ellipse counters
  r1=0;
  cSize = 200;
  angle1 = random(PI);
  angle2 = random(PI);

  //Init the Audio Library: Oscilator and Filter
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(110);
  osc.amp(0.2);
  osc.disconnect();
  osc.connect(filt);
  osc.connect();
  osc.start();

  //We tried out diffferent EQ ranges as Filters for Audio Signal(to represent different twitter moods but due to time contraints 
  //have opteedd just to add a little delay for character and clarity 
  delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime, feedback, filter frequency
  // play with these numbers!!
  delay.process(osc, .12, .7, 2300);

  // play the noise with an envelope,
  // a series of fades ( time / value pairs )
  env = new p5.Env(.01, 0.2, .2, .1);

  //fft li component. analyzers  and vizualizes the audio signal
  fft = new p5.FFT();

  //rdiameter for ellipse and clock hand orbiter
  r = 250;
  // varying theta can be good for varying the spped of our waves
  theta = -1.5;

  //Clock Time starts at 0
  time = 0;

}

function draw() {
  //wave background
  background(0);
  

  push();
    fill(255, 255, 255);
    text('DAYTIME/NIGHTIME(Length of Darkness)', width*0.02, 30, 300, 200);
    textFont(font_bold, 26);
    fill(178, 143, 206);
    text('Circadian Clock', width*0.25, 20, 300, 200);
    textFont(font, 20);
    fill(255, 255, 255);
    text('TIME: ' + table.getString(r1, 0), width*.55, height*.8, 360, 200);
    textFont(font, 20);
    text('PLACE: New York', width*.55, height*.85, 360, 200);
    text('DATE: 11/04/2018', width*.55, height*.90, 360, 200);
    text('SUBJECT: Male', width*.7, height*.015, 320, 200);
    textFont(font, 14);
    text('LIGHT-SQM READING as Brightness Clock ' +  float(table.getString(r1, 6)),  width*.40, height*.6, 100, 200); 
    fill(255);
    strokeWeight(.5);
    //Ideally, Star Constelation would be read in as Data Input
    text('Constellation: Orion', width*.7, height*.15, 200, 300); 
    image(img, width*.85,  height*.05, img.width/3, img.height/3);
    pop();
 
  //Vital Life Signs Meters for Heart Rate and Blood Preassure. Using Shiffman's Waves
  push();
    translate(width/2,height/3); // Much simpler if we translate to the center of the screen
     //get systolic 
     var frequency2 = 1.0/count2; // slow down our wave so we can see it better
     //get diastolic
     var frequency3 = 1.0/count3; // slow down our wave so we can see it better
     //getheartrate
     var frequency4 = 1.0/count4; // slow down our wave so we can see it better



    //WAVE 1 is Heart Rate. Ideally we would be using frequency or theta to emphasise pulse nature of heart beat
    var x4 = 0;
    var y4 = 0;
        
    push();
      fill(255);
      strokeWeight(.5);
      text('HEART RATE BPM' , width/4, height*.08, 200, 300); 
      text(table.getString(r1, 3),  width/3, height*.08, 100, 300); 
    pop();
    
        // if we consider 1 pixel to be 1 radian, then this is the number 
        // of radians between points
      var angle4 = width/3/numPoints;
        
      // we are drawing the curve using our shape tool
      beginShape();
      //phi -= .25;
      for (var i = 0; i < numPoints; i++) {
        
      // calculate where we are along x
      //angle4 = count3;
      x4 = angle4*i;

      strokeWeight(3);

       //amplitude = count3;
       //frequency4 = count3;
       //x4 = count3;
       // y is determined by our function
       y4 = sin(x4*frequency4+phi)* amplitude;
       stroke(246, 240, 98);
       vertex(x4+(width/4),  y4+(height/5.5));
       }
       endShape();
  
      // phase shift to the left so the wave appears to b marching to the right
      phi -= .05;


     //2nd WAVE is Syst Blood Preassure
     var x4 = 0;
     var y4 = 0;
        
    // if we consider 1 pixel to be 1 radian, then this is the number 
    // of radians between points
    var angle4 = width/3/numPoints;
    push();
    //fill(0, 102, 153);
    fill(255);
    strokeWeight(.5);
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

      //3rd WAVE FOR D BP
        var x4 = 0;
        var y4 = 0;
        push();
        fill(255);
        strokeWeight(.5);
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
        frequency3 = count3/2;
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




      //BRIGHTNESS CLOCK. Located Centre of Screen. Vary RGB Values using Light SQM Values read in from CSV
      noStroke();
 
      fill(178, 15*light, 242);
      ellipse(0, 0, width*.25, width*.25);
      push();
      for(var i = 0; i < 360; i+=2){
        var x_w = cos(radians(i)) * 50;
        var y_w = sin(radians(i)) *100;
        var w_w = sin(radians(time+i )) * 150;
        w_w = abs(w_w);
        var col=map(i,0,360,120,255);
        fill(col,col,col);
        noStroke();
        //fill(count4, count3, count2+30);
        fill(178, 14*light, 242);
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



      //MOVING SPOT or Hour Hand.    
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





      //AUDIO LIBRARY TOOLS   

        push();
        fill(255);
        strokeWeight(.5);
        //noStroke();
         text('TWITTER Total MOOD applied as Frequency( ' + round(map(tweet_count, 0, 255, 1, 800)) 
         	+ ' Hz) to Oscilator Sine Wave and Analysed with FFT. ', width*0.02, height*0.85, 450, 400); 
          text('Click Mood Icon to switch off Mood Filter(' + round(map(tweet_count, 0, 255, 1, 100)) + 'Hz)', width*0.02, height*0.90, 450, 400); 
        text('Please Refresh Page to Reload Mood Filter. ', width*0.02, height*0.93, 450, 400); 

         //Click Sound Off Button to switch off All Sound
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
            vertex(width*0.02+x, height*0.72+y);
          }
          endShape();
             noStroke();


              //Borrowed from Intro to Programming. Timer. 49 Rows for 24 x 30 min Row entries
              //Here we 

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
                  tweet_mood_word = table.getString(r1, 7);
                  //night_day = table.getString(r1, 2);
                  //increase number to draw out differences
                  anger_count = table.getString(r1, 10)*10;
                  joy_count = table.getString(r1, 9)*10;
                  sadness_count = table.getString(r1, 11)*10;
                  unknown_count = table.getString(r1, 12)*10;
                  
                  //Set the Frequency or Note for the Synth. We Map our Tweet Count Value to range between0 800 Hz. 
                  //Mid to High Octave   
                  freq = map(tweet_count, 0, 255, 1, 800);
                  //osc.freq(freq/2);
                  //osc.freq(random(255));
                  // var freq = map(mouseX, 0, width, 40, 880);
                  //Load the Note into Oscilator 
                  osc.freq(freq); 
                   //Another Option would have been to use a sepereate Oscilator per Twitter Mood Channel 
                   //or a differnet filter effect for each Mood e.g. Anger = Distortion, Sadness = Reverb, Joy = Flange, Amplitude or Vol for Unknown etc 

                 }
               


      push();
        //Use P5 JS Scribble Library for Twitter Mood Icons       
        fill(255);
        text('TWITTER MOOD as Colour and Size. Dominant(Known)Mood=' + tweet_mood_word + '.Tweet Count=' + tweet_count, width*0.02, width*0.24, width*0.32, 180); 
         //text(table.getString(r1, 1), 350, 70, 100, 300); 
        var scribble = new Scribble();              // global mode
        //Library Settings for bendiness and scratchiness of line. \
        //It uses Random functions to create the variance or animated vizualisation
        scribble.bowing    = 1.8;
        scribble.roughness = 1.8;
        strokeWeight(5);
        stroke(204, 0, 0);
        scribble.scribbleRoundedRect(width*0.03, height*0.57,  anger_count/8, anger_count/8, 400);
        strokeWeight(1); 
        fill(255);
         //ANGER BUTTON 
        text("Anger:",width*0.02,height*0.65);
        text(anger_count,width*0.02,height*0.68);
        strokeWeight(9);
        noFill();
        stroke(255, 128, 0);
        scribble.scribbleEllipse( width*0.07, height*0.57, joy_count/8, joy_count/8);
        strokeWeight(1); 
        fill(255);
        //JOY BUTTON 
        text("Joy:",width*0.07,height*0.65);
        text(joy_count,width*0.07,height*0.68);
        //fill(255, 153, 153);
        strokeWeight(5);
        stroke(0, 51, 102);
        scribble.scribbleRect(width*0.11, height*0.57, sadness_count/8, sadness_count/8);
        strokeWeight(1); 
        fill(255);
        //SAD BUTTON
        text("Sad:",width*0.10,height*0.65);
        text(sadness_count,width*0.10,height*0.68);
        strokeWeight(2);
        stroke(192, 192, 192);
         //fill(192, 192, 192);
        strokeWeight(1); 
        noFill();
        //divide by 15 to curtail very large number of Unknowns
        ellipse( width*0.15, height*0.57, unknown_count/15, unknown_count/15);
        fill(255);
        noStroke();
        //fill(102, 0, 102);
        //ellipse( width*0.21, height*0.6, 50, 50);
        image(img2, width*0.21, height*0.54, img.width/12, img.height/12);
        strokeWeight(1); 
        fill(255);
        text("Unknown",width*0.14,height*0.65);
        text(unknown_count,width*0.14,height*0.68);
        strokeWeight(1); 
        fill(255);
        text("Sound On/Off",width*0.21,height*0.65);
      pop();



//
//  push();
//  stroke(0);
//  fill(0);
//  strokeWeight(0);
//  angle1 += 0.0013;
//  angle2 += 0.0002;
  //angle = angle1 + angle2;
  
//  translate(width/2, height/3);
//  rotate(angle2-angle1);

//  var dia = 80;
//  f(dia ,i);

  //}
  //pop();
  //}
//  pop(); 


//Call the borrowed Pendulum Function for the Swinging Night/Day Indicator
//In p5 JS functions replace Classes. We keep these after the setup, draw functions
//background(51);
 p.go();
 night_day = table.getString(r1, 8);



  //Some very Messy Code for the ON and OFF Audio Buttons
    for(var i = 0; i<5; i++)
    {
        if(i==t) fill(255,0,0);
        if(selected[i]){
           fill(150,150,255) 
           //point(70+ i*spacing, 480, 100);
           if(selected[1]==true){
           text("On", (width*.02)+ i*spacing, height*.50)
           }
             if(selected[4]==true){
             }
          	 }else{
             fill(255,0,0) 


              text("Off", (width*.02)+ i*spacing, height*.50)
             	selected[0] = false;
             	selected[1] = false;
             	selected[2] = false;
             	selected[3] = false;

              //If Mood Buttons are Deselected we Use a Lower Frequency Range Mapping for the Notes
              //Ideally many much better ways to characterize a channel or type for each Mood Category 
              //Due to Time Contraints we have opted for this as a a Vanilla Sounding treatment of our Twitter Subject Audio Signal 
             	freq = map(tweet_count, 0, 255, 1, 100);
             	osc.freq(freq);

              if(selected[4]==false){
                text("Off", (width*.02)+ 4*spacing, height*.50) 
                //SWITCH OSICALATOR OFF
                osc.stop();  
                osc.disconnect();
           }
        } 
        noFill();
    }


//MouseEvent for the ON and OFF Buttons
if (mouseIsPressed)
{
    var eye = int(mouseX/spacing);
    if(eye>-1 && eye<selected.length) selected[eye]=!selected[eye];
    //print(eye);
    print(selected[eye]);
}


}


//Testing Wave Function
//function f(r, i){
  //print('r=' + r1);
// var rx = 15 * cos(TAU * i / 70), ry = 15 * sin(TAU * i / 70);
//}



//Borrowed from p5 JS Examples
//Ideally all our Code would be set using Objects(now P5 JS functions).

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

    
                  //To DO: Click Mouse to Reset Pendulum. TO add more user interaction and another way of exploring the Night Day Divide

                   // This checks to see if we clicked on the pendulum ball
                 // void clicked(int mx, int my) {
                 //   float d = dist(mx, my, position.x, position.y);
                 //   if (d < ballr) {
                 //     dragging = true;
                 //   }
                 // }

                  // This tells us we are not longer clicking on the ball
                 // void stopDragging() {
                 //   if (dragging) {
                 //     aVelocity = 0; // No velocity once you let go
                 //     dragging = false;
                 //   }
                 // }

                 // void drag() {
                    // If we are draging the ball, we calculate the angle between the 
                    // pendulum origin and mouse position
                    // we assign that angle to the pendulum
                  //  if (dragging) {
                  //    PVector diff = PVector.sub(origin, new PVector(mouseX, mouseY));      // Difference between 2 points
                  //    angle = atan2(-1*diff.y, diff.x) - radians(90);                      // Angle relative to vertical axis
                  //  }
                 // }
                //}   

                //Some Messy Code to determine if its Night or Day and Call Star function to draw Sun and Stars
                //
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
                      star(this.position.x-500, this.position.y-80, 20, 50, 5); 
                      pop();
                }
                pop();  
             
   };

//END OF PENDULUM FUNCTION
  }


//Borrowed from P5 JS Examples
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

//Resize Dynamic Shapes. Function found late on in dev time. 
//Could have been used to make life alot easier for rendering sketch on diff size windows
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

