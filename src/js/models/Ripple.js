/** @prettier */

class Ripple {
  constructor() {
    this.isActive = false;
    this.x = 0;
    this.y = 0;
  }

  enable(evt) {
    this.isActive = true;
    this.x = evt.clientX;
    this.y = evt.clientY;
    return this;
  }

  disable() {
    this.isActive = false;
    return this;
  }

  getState() {
    return this.isActive;
  }

  getLeft() {
    return `${this.x - 320 / 2}px`;
  }

  getTop() {
    return `${this.y - 320 / 2}px`;
  }

  static createNew() {
    return new Ripple();
  }
}

export default Ripple;
