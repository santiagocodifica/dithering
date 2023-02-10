function index(x, y, w) {
  return 4 * ( x + y * w);
}

function error_difusion_dithering(){
  pg.loadPixels();
  for(var y = 0; y < pg.height; y++){
    for(var x = 0; x < pg.width; x++){
      
      var errors = setCurrentPixel(x, y);
      
      setNeighborPixel(x+1,y  ,errors,7/16.0);
      setNeighborPixel(x-1,y+1,errors,3/16.0);
      setNeighborPixel(x  ,y+1,errors,5/16.0);
      setNeighborPixel(x+1,y+1,errors,1/16.0);
      
    }
  }
  pg.updatePixels();
}

function setCurrentPixel(x, y){
  
  var factor = 1;
    
  var oldR = pg.pixels[index(x,y,pg.width)];
  var oldG = pg.pixels[index(x,y,pg.width) + 1];
  var oldB = pg.pixels[index(x,y,pg.width) + 2];
  
  var newR = round(factor * oldR / 255) * (255 / factor);
  var newG = round(factor * oldG / 255) * (255 / factor);
  var newB = round(factor * oldB / 255) * (255 / factor);
  
  pg.pixels[index(x,y,pg.width)] = newR
  pg.pixels[index(x,y,pg.width) + 1] = newG
  pg.pixels[index(x,y,pg.width) + 2] = newB
  
  var errR = oldR - newR;
  var errG = oldG - newG;
  var errB = oldB - newB;
  
  var arr = [ errR, errG, errB ];
  
  return arr;
}

function setNeighborPixel(x, y, error, error_amount){
  
  var pix = pg.pixels[index(x,y,pg.width)];

  var r = pg.pixels[index(x,y,pg.width)] + error[0] * error_amount;
  var g = pg.pixels[index(x,y,pg.width) + 1] + error[1] * error_amount;
  var b = pg.pixels[index(x,y,pg.width) + 2] + error[2] * error_amount;
  
  pg.pixels[index(x,y,pg.width)] = r
  pg.pixels[index(x,y,pg.width) + 1] = g
  pg.pixels[index(x,y,pg.width) + 2] = b
}