class Street {
 
  constructor() {
    this.h = 200
  
    this.w = width*2
    this.x = 0
    this.y = height - this.h
    
  }
  
  move() {
    this.x -= 6
    if (this.x < -width){
      this.x =0
    }
  }
  
  show() {
    image(img2, this.x, this.y, this.w, this.h)
  }
  
}


class House {
  constructor() {
    if(timer <600){
      this.randhouse = int(random(6,12))
      this.w = 360
      this.h = 720
    }else{
      this.randhouse = int(random(0,6))
      this.h = 500
      this.w = 250
    }   
    this.x = width
    this.y = height - this.h - 200
  }
  
  move() {
    this.x -= 6
  }
  
  show(){
    image(houseimg[this.randhouse],this.x, this.y, this.w, this.h);
  }
}