class Player {
  constructor() {
    this.r = 100
    this.x = this.r+70;
    this.y = height - this.r - 70; //30 is to move the player to the middle of the street
    this.vy = 0;
    this.gravity = 0.6;
  }

  jump() {
    this.elev = height - this.y - this.r - 70
    if (this.elev == 0) {
      this.vy = -slider.value();
    }
  }
  
  hits(obs) {
    return collideRectRect(this.x,this.y,this.r,this.r,obs.x,obs.y,obs.w,obs.h)
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity
    this.y = constrain(this.y, 0, height - this.r -70)
  }

  show() {
    //rect(this.x, this.y, this.r, this.r);
    image(gif, this.x, this.y, this.r, this.r);
  }
}