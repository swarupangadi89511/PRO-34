const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,meat,ground;
var meat_con;
var meat_con_2;
var meat_con_3;
var rope;
var rope3;
var bg_img;
var food;
var tiger;
var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;
var fr;
var bk_song;
var cut_sound;
var star_img;
var star,star2;
var empty_star;

function preload()
{
  bg_img = loadImage('jungle.png');
  food = loadImage('meat.png');
  tiger = loadImage('tiger.png');
  
  bk_song = loadSound('sound1.mp3');
  cut_sound = loadSound('rope_cut.mp3');
  air = loadSound('air.wav');

  star_img=loadImage("star.png")

  empty_star = loadImage("empty.png");
  one_star = loadImage("one_star.png"); 
  two_star = loadImage("star.png");

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(180,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(390,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(8,{x:300,y:60});
   rope2 = new Rope(6,{x:400,y:80});

  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);

  tiger = createSprite(120,620,100,100);
  tiger.scale = 0.2;

  star_display = createSprite(50,20,30,30); star_display.scale = 0.2;
  star_display.addAnimation('empty',empty_star);
  star_display.addAnimation('one',one_star);
  star_display.addAnimation('two',two_star); 
  star_display.changeAnimation('empty');

  star=createSprite(320,50,20,20);
  star.addImage(star_img);
  star.scale=0.02;

  star2=createSprite(50,370,20,20);
  star2.addImage(star_img);
  star2.scale=0.02;

  blower=createImg('baloon.png');
  blower.position(260,370);
  blower.size(120,120);
  blower.mouseClicked(airblow);

  meat = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  meat_con = new Link(rope,fruit);
  meat_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,meat.position.x,meat.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    World.remove(engine.world,meat);
    meat = null;
  }

  if(meat!=null && meat.position.y>=650)
  {
    bk_song.stop();
    meat=null;
   }
  if(collide(meat,star,20)==true){
star.visible=false;
star_display.changeAnimation('one');
  }

  if(collide(meat,star2,40)==true){
    star2.visible=false;
    star_display.changeAnimation('two');
      }
}

function drop()
{
  cut_sound.play();
  rope.break();
  meat_con.dettach();
  meat_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  meat_con_2.dettach();
  meat_con_2 = null;
}

function collide(body,sprite,x)

{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow(){
Matter.Body.applyForce(meat,{x:0,y:0},{x:0,y:-0.03})
air.play();
}