int y=4.5;
int s=1;
int k=1;
int g=3.6;//scale
int i=1;
int bcolor=0;
int sun=#f6f062;
int [] sunmoon={1,2,3,3,2,1,1,2,3,4,5,6,5,4,3,2,1,1,2,3,4,3,2,1};
String[] time={"12am","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm","12pm","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am"};

int num[]={4,2,0,6,8,4,4,2,1,10,13,9,2,3,5,4,5,4,3,2,4,5,6,1};



void setup() { 

size(580*g-40,340*g);

background(bcolor);

rectMode(CENTER);
frameRate(3);
for(int j=0;j<25;j=j+2)
{fill(255);
textSize(12*g);
text(time[j],(35  +(j-1)*20)*g,330*g);}//x
text("Time",(30+(24)*20)*g,330*g);
for(int j=0;j<61;j=j+5)
{fill(255);
textSize(12*g);
text(j,5*g,(340-(j*y+20))*g);}
//y
text("NUM",0*g,(340-(68*y+20))*g);
}


void draw()
{if(i==24){i=1;setup();draw();}
  if(k<=6){stroke(sun);
  stroke(bcolor);
  fill(bcolor);
rect(350*g,50*g,450*g,160*g);
fill(sun);
  ellipse((80+k*90)*g,(100-(sunmoon[k-1])*7)*g,50*g,50*g);

}
if(k>6&k<=17){
  stroke(bcolor);
  fill(bcolor);
rect(320*g,50*g,450*g,160*g);
stroke(255,255,0);
fill(255,255,0);
ellipse((80+(k-6)*40+10)*g,(100-((sunmoon[k-1]))*7)*g,40*g,40*g);
stroke(bcolor);
fill(bcolor);
ellipse((80+(k-6)*40)*g,(90-((sunmoon[k-1]))*7)*g,50*g,50*g);
}

if(k>17){  stroke(bcolor);
  fill(bcolor);
rect(350*g,50*g,450*g,160*g);
  fill(sun);
  ellipse((80+(k-17)*80)*g,(100-(sunmoon[k-1])*7)*g,50*g,50*g);

}
k++;
if(k==24){k=1;}//sun and moon


stroke(255);
line(30*g,10*g,30*g,310*g);//yline
line(30*g,310*g,520*g,310*g);//xline
fill(  #9370DB);
stroke(  #9370DB);

line((20+(i-1)*20+10)*g,(340-(num[i-1]*y+20)-10)*g,(20+(i)*20+10)*g,(340-(num[i]*y+20)-10)*g);//graph line

rect((20+(0)*20+10)*g,(340-(num[0]*y+20)-10)*g,5*g,5*g);//point 0
rect((20+(i)*20+10)*g,(340-(num[i]*y+20)-10)*g,5*g,5*g);//point rest

stroke(bcolor);
  fill(bcolor);
rect((70+10)*g,50*g,80*g,150*g);
  textSize(80*g);
fill(#9370DB);
text(num[i],(30+10)*g,100*g);

i++;

}
