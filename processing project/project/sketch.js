String [] time=new String[24];
int [] num = new int[24];
Table tokyo;
int i=1;
function setup() {
   createCanvas(580,340);
  tokyo = loadTable("newdatatokyo.csv", "header");
  rectMode(CENTER);
  frameRate(3);
   textMode(SHAPE); 
    
for(int i=0;i<24;i++){
time[i]= tokyo.getString(i,"time");
num[i]=tokyo.getInt(i,"num");
}
}

function draw() {for(int j=0;j<24;j++)
{stroke(0);
textSize(8);
text(time[j],30+(j-1)*20,330);}

for(int j=0;j<15;j++)
{stroke(0);
textSize(8);
text(j,10,340-(j*20+20));}

stroke(0);
text("03:45",20+(3)*20+20*2/3,20);
text("19:39",20+(19)*20+20*2/3,20);
textSize(20);
text("Day",230,50);
text("Night",30,50);
text("Night",450,50);
line(20+(19)*20+20*2/3,20,20+(19)*20+20*2/3,320);
line(20+(3)*20+20*2/3,20,20+(3)*20+20*2/3,320);
line(20,20,20,320);
line(20,320,510,320);


stroke(255,0,0);


line(20+(i-1)*20,340-(num[i-1]*20+20),20+(i)*20,340-(num[i]*20+20));
fill(255,0,0);


rect(20+(0)*20,340-(num[0]*20+20),5,5);
rect(20+(i)*20,340-(num[i]*20+20),5,5);

textSize(10);
fill(0);
text(num[0],20+(0)*20-10,340-(num[0]*20+20)-10);
text(num[i],20+(i)*20-10,340-(num[i]*20+20)-10);

i++;
if(i==24){noLoop();}
}