int y=4.5;
int z=1.3;
int s=1;
int k=0;
int g=1;//scale
int i=0;
int bcolor=0;
int dt=28;
int nt = 28;
int sun=#f6f062;
int [] sunmoon={1,2,3,3,2,1,1,2,3,4,5,6,5,4,3,2,1,1,2,3,4,3,2,1};
String[] time={"12am","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm","10pm","11pm","12pm","1am","2am","3am","4am","5am","6am","7am","8am","9am","10am","11am"};


int numn[]={139,159,140,155,141,114,117,119,119,89,88,100,82,70,63,58,70,61,172,127,91,98,119,125};
int numsy[]={14,16,17,16,8,7,7,7,8,10,11,11,8,10,9,6,11,8,9,7,9,7,10,10};
int numst[]={3,2,2,1,3,2,2,3,3,6,5,2,2,3,1,2,3,3,3,2,3,3,2,2};
int numl[]={63,71,72,97,82,85,69,89,96,150,159,184,186,148,102,68,67,63,70,88,80,122,83,86};
int numd[]={14,19,16,14,10,12,12,20,29,20,18,12,7,5,4,4,7,10,23,24,20,25,25,19,14,19,16};
int numt[]={10,13,13,10,11,10,11,9,10,10,8,9,8,6,6,7,6,6,6,8,8,6,6,6};
int num[]={3,2,2,1,3,2,2,3,3,6,5,2,2,3,1,2,3,3,3,2,3,3,2,2};

int sunmoon[]={1,2,3,4,5,6,7,8,8,8,8,8,8,8,8,8,8,7,6,5,4,3,2,1};


void setup() { 

size(580*g-40,340*g);

background(bcolor);

rectMode(CENTER);
frameRate(10);
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
{if(i==24){k=1000;
i=1000
}
if(k==1030&i==1030){  fill(bcolor);
stroke(bcolor);
 rect((580*g-40)/2,(340*g)/2,580*g-40,340*g)
  strokeWeight(1);
 stroke(255,0,0);
 for(int j=0;j<25;j=j+2)
{fill(255);
textSize(12*g);
text(time[j],(35+(j-1)*20)*g,330*g);}//x
text("Time",(30+(24)*20)*g,330*g);
for(int j=0;j<221;j=j+5)
{fill(255);
textSize(5*g);
text(j,5*g,(340-(j*z+20))*g);}
//y
text("NUM",5*g,(340-(225*z+20)-10)*g);
 stroke(#9370DB);
for(int a=1;a<24;a++){line((20+(a-1)*20+10)*g,(340-(numn[a-1]*z+20)-10)*g,(20+(a)*20+10)*g,(340-(numn[a]*z+20)-10)*g);}

for(int b=1;b<24;b++){line((20+(b-1)*20+10)*g,(340-(numt[b-1]*z+20)-10)*g,(20+(b)*20+10)*g,(340-(numt[b]*z+20)-10)*g);}
 stroke(#9370DB);
for(int c=1;c<24;c++){line((20+(c-1)*20+10)*g,(340-(numsy[c-1]*z+20)-10)*g,(20+(c)*20+10)*g,(340-(numsy[c]*z+20)-10)*g);}
 stroke(255,0,0);
for(int d=1;d<24;d++){line((20+(d-1)*20+10)*g,(340-(numst[d-1]*z+20)-10)*g,(20+(d)*20+10)*g,(340-(numst[d]*z+20)-10)*g);}
 stroke(#9370DB);
for(int e=1;e<24;e++){line((20+(e-1)*20+10)*g,(340-(numd[e-1]*z+20)-10)*g,(20+(e)*20+10)*g,(340-(numd[e]*z+20)-10)*g);}
for(int f=1;f<24;f++){line((20+(f-1)*20+10)*g,(340-(numl[f-1]*z+20)-10)*g,(20+(f)*20+10)*g,(340-(numl[f]*z+20)-10)*g);}

fill(255);
textSize(8);
text("Tokyo",580*g-85,304*g);
text("London",580*g-85,200*g);
text("Delhi",580*g-85,293*g);
text("New York",580*g-85,150*g);
text("Stockholm",580*g-85,309*g);
text("Sydney",580*g-85,299*g);}
if(k==1060&i==1060){k=0;i=0;setup();draw();}




 if(k<=nt){stroke(sun);
   fill(sun);
  ellipse(90*g,60*g,50*g,50*g);}
  if(k>=nt&k<=dt){stroke(bcolor);
fill(bcolor);
rect(90*g,60*g,60*g,60*g);
stroke(255,255,0);
fill(255,255,0);
ellipse((250)*g,50*g,40*g,40*g);
stroke(bcolor);
fill(bcolor);
ellipse(240*g,40*g,50*g,50*g);}
if(k>=dt&k<=23){ 
  stroke(bcolor);
  fill(bcolor);
  rect(250*g,60*g,60*g,60*g);
  stroke(sun);
  fill(sun);
  ellipse(470*g,60*g,50*g,50*g);

}

if(k==23){k=0;}
stroke(#696969);
strokeWeight(0.1);
line(30*g,10*g,30*g,310*g);//yline
line(30*g,310*g,520*g,310*g);//xline
if(i<=23&i>=0){line(30+(dt*20)*g,10*g,30+(dt*20)*g,310*g);
line(30+(nt*20)*g,10*g,30+(nt*20)*g,310*g);}
fill(  #9370DB);
stroke(  #9370DB);
k++;
if(i>=1){  strokeWeight(2);
line((20+(i-1)*20+10)*g,(340-(num[i-1]*y+20)-10)*g,(20+(i)*20+10)*g,(340-(num[i]*y+20)-10)*g);//graph line
}


i=i+1;

}
