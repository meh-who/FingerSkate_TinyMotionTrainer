class Obstacle {
 
  constructor() {
    this.h = 70
    this.w = 45
    this.x = width
    this.y = height - this.h - 70 //30 is to move the cone to the middle of the street
  }
  
  move() {
    this.x -= 6
  }
  
  show() {
    //rect(this.x, this.y, this.w, this.h)
    image(img, this.x, this.y, this.w, this.h)
  }
}