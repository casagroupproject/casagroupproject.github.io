int y=4;
int s=1;
int k=0;
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

4,
2,
0,
6,
8,
4,
4,
2,
1,
10,
13,
9,2,
3,
5,
4,
5,
4,
3,
2,
4,
5,
6,
1
};

PImage b;

void setup() { b=loadImage("tokyo.jpg");
size(580,340);
background(#2A363B);
  rectMode(CENTER);
  frameRate(3);

}


void draw()
{b.resize(120,80);
  image(b,460,100);if(k<=6){stroke(255,0,0);
fill(255,0,0);
  ellipse(270,50,50,50);

}
if(k>6&k<=17){
  stroke(#2A363B);
  fill(#2A363B);
  rect(270,50,50,50);
stroke(255,255,0);
fill(255,255,0);
ellipse(270,50,40,40);
stroke(#2A363B);
fill(#2A363B);
ellipse(260,40,50,50);
}

if(k>17){  stroke(#2A363B);
  fill(#2A363B);
  rect(270,50,50,50);
  fill(255,0,0);
  ellipse(270,50,50,50);

}
k++;//sun and moon
fill(#FECEA8);
textSize(50);
text("Tokyo",350,80);
  fill(  #9370DB);
stroke(  #9370DB);
  for(int j=0;j<25;j=j+2)
{fill(255);
textSize(12);
text(time[j],30+(j-1)*20,330);}//x

for(int j=0;j<66;j=j+5)
{fill(255);
textSize(10);
text(j,5,340-(j*y+20));}
//y

stroke(255);

line(20,20,20,320);//yline
line(20,320,510,320);//xline
fill(  #9370DB);
stroke(  #9370DB);

line(20+(i-1)*20,340-(num[i-1]*y+20),20+(i)*20,340-(num[i]*y+20));

for(int j=0;j<24;j++)
{if (mouseX==20+(j)*20 && mouseY==340-(num[j]*y+20))
{
text(num[j],20+(j)*20+y,340-(num[j]*y+20)-2);
}
}

rect(20+(0)*20,340-(num[0]*y+20),5,5);
rect(20+(i)*20,340-(num[i]*y+20),5,5);

i++;if(i==24){noLoop();}
}




void mousePressed() {
int mx=mouseX;
int my=mouseY;
for(int j=0;j<24;j++)
{if ( mouseX<20+(j)*20+5&mouseX>20+(j)*20-5 &mouseY<340-(num[j]*y+20)+5&mouseY>340-(num[j]*y+20)-5)
{stroke(#2A363B);
  fill(#2A363B);
rect(70,50,80,50);
  textSize(40);
fill(#9370DB);
text(num[j],30,60);
for(int f=1;f<24;f++){
  stroke(#9370DB);
fill(#9370DB);
rect(20+(0)*20,340-(num[0]*y+20),5,5);
rect(20+(f)*20,340-(num[f]*y+20),5,5);
}


fill(255);
rect(20+(j)*20,340-(num[j]*y+20),5,5);



}
}

}
