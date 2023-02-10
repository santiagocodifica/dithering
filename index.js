let pg;
let pix = [];

function setup(){
  createCanvas(1000,600)
  noSmooth()
  pixelDensity(1)
  pg = createGraphics(80, 48)
  
  pg.background(0);
  pg.fill(255);
  pg.textAlign(CENTER, CENTER);
  pg.text("into the void",pg.width/2,pg.height/2);

  for(var x = 0; x < pg.width; x++){
    for(var y = 0; y < pg.height; y++){
      pix[x + y * pg.width] = new Pixel(x,y)
    }
  }

}

function draw(){

  for(var x = 0; x < pg.width; x++){
    for(var y = 0; y < pg.height; y++){
      pix[x + y * pg.width].modifyPixels(10,1.5);
    }
  }
  error_difusion_dithering()
  image(pg,0,0,width,height)
}
