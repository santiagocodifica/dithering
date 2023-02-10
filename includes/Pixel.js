class Pixel{

  constructor(x,y){

    this.pixel_pos = createVector(x,y)
    this.x = x;
    this.y = y;
    this.mouse_pos = createVector(map(mouseX,0,width,0,pg.width), map(mouseY,0,height,0,pg.height))

    pg.loadPixels();
    this.r = red(pg.pixels[4 * (x + y * pg.width)]);
    this.g = green(pg.pixels[4 * (x + y * pg.width) + 1]);
    this.b = blue(pg.pixels[4 * (x + y * pg.width) + 2]);
    this.initial = color(this.r,this.g,this.b)
    pg.updatePixels();

  }

  mouseDistance(){
    this.mouse_pos.set(map(mouseX,0,width,0,pg.width), map(mouseY,0,height,0,pg.height))
    let distance = this.pixel_pos.dist(this.mouse_pos);
    return distance
  }

  modifyPixels(minimumDistance, strenght){
    let distance = this.mouseDistance();

    pg.loadPixels();

    if(distance < minimumDistance){

      let r = red(this.initial) - red(this.initial) / distance * strenght;
      let g = green(this.initial) - green(this.initial) / distance * strenght;
      let b = blue(this.initial) - blue(this.initial) / distance * strenght;

      pg.pixels[4*(this.x + this.y * pg.width)] = red(r);
      pg.pixels[4*(this.x + this.y * pg.width) + 1] = green(g);
      pg.pixels[4*(this.x + this.y * pg.width) + 2] = blue(b);
    }else{
      pg.pixels[4*(this.x + this.y * pg.width)] = red(this.initial);
      pg.pixels[4*(this.x + this.y * pg.width) + 1] = green(this.initial);
      pg.pixels[4*(this.x + this.y * pg.width) + 2] = blue(this.initial);
    }
    pg.updatePixels();
  }
}