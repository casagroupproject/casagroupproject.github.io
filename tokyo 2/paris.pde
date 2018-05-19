int y=4;
int s=1;
int k=0;
int g=4/5;
int sun=#f6f062;
String[] time={
"12:00",
  "13:00",
"14:00",
"15:00",
"16:00",
"17:00",
"18:00",
"19:00",
"20:00",
"21:00",
"22:00",
"23:00",
"0:00",
"1:00",
"2:00",
"3:00",
"4:00",
"5:00",
"6:00",
"7:00",
"8:00",
"9:00",
"10:00",
"11:00",
};
int i=1;
int num[]={

11,5,9,7,4,5,5,4,8,16,14,13,26,20,5,11,4,5,10,7,6,2,5,1
};
PImage b;
int bcolor=0;

void setup() { 
 
  b=loadImage("paris.jpg");
size(580*g-40,340*g);
background(bcolor);
  rectMode(CENTER);
  frameRate(3);
  for(int j=0;j<25;j=j+2)
{fill(255);
textSize(12*g);
text(time[j],(30+(j-1)*20)*g,330*g);}//x

for(int j=0;j<66;j=j+5)
{fill(255);
textSize(10*g);
text(j,5*g,(340-(j*y+20))*g);}
//y
}


void draw()
{b.resize(120,80);
  image(b,290,15);if(k<=10){stroke(sun);
fill(sun);
  ellipse(270*g,50*g,50*g,50*g);

}
if(k>10&k<=17){
  stroke(bcolor);
  fill(bcolor);
  rect(270*g,50*g,50*g,50*g);
stroke(255,255,0);
fill(255,255,0);
ellipse(270*g,50*g,40*g,40*g);
stroke(bcolor);
fill(bcolor);
ellipse(260*g,40*g,50*g,50*g);
}

if(k>17){  stroke(bcolor);
  fill(bcolor);
  rect(270*g,50*g,50*g,50*g);
  fill(sun);
  ellipse(270*g,50*g,50*g,50*g);

}
k++;//sun and moon
fill(#FECEA8);
textSize(50*g);

  fill(  #9370DB);
stroke(  #9370DB);


stroke(255);

line(20*g,20*g,20*g,320*g);//yline
line(20*g,320*g,510*g,320*g);//xline
fill(  #9370DB);
stroke(  #9370DB);

line((20+(i-1)*20)*g,(340-(num[i-1]*y+20))*g,(20+(i)*20)*g,(340-(num[i]*y+20))*g);



rect((20+(0)*20)*g,(340-(num[0]*y+20))*g,5*g,5*g);
rect((20+(i)*20)*g,(340-(num[i]*y+20))*g,5*g,5*g);

i++;if(i==24){noLoop();}
}




void mousePressed() {
int mx=mouseX;
int my=mouseY;
for(int j=0;j<24;j++)
{if ( mouseX<(20+(j)*20+5)*g&mouseX>(20+(j)*20-5)*g &mouseY<(340-(num[j]*y+20)+5)*g&mouseY>(340-(num[j]*y+20)-5)*g)
{stroke(bcolor);
  fill(bcolor);
rect(70*g,50*g,80*g,50*g);
  textSize(40*g);
fill(#9370DB);
text(num[j],30*g,60*g);
for(int f=1;f<24;f++){
  stroke(#9370DB);
fill(#9370DB);
rect((20+(0)*20)*g,(340-(num[0]*y+20))*g,5*g,5*g);
rect((20+(f)*20)*g,(340-(num[f]*y+20))*g,5*g,5*g);
}


fill(255);
rect(20+(j)*20,340-(num[j]*y+20),5,5);



}
}

}
