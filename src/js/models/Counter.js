/** @prettier */

class Counter {
  constructor() {
    this.reset();
    this.resetTotal();
    this.intervalID;
  }

  static get MAX() {
    return 30;
  }

  start(callback) {
    this.intervalID = setInterval(() => {
      if (this.up().isMax()) {
        this.reset(1);
      }
      callback();
    }, 1000);
    return this;
  }

  stop(callback) {
    clearInterval(this.intervalID);
    this.intervalID = -1;
    this.reset();
    this.resetTotal();
    callback();
    return this;
  }

  action(callback) {
    if (this.isCounting()) {
      this.stop(callback);
    } else {
      this.start(callback);
    }
    return this;
  }

  isCounting() {
    return this.intervalID > 0;
  }

  get() {
    return this.count;
  }

  getTotal() {
    let m = Math.floor(this.total / 60);
    let s = this.total % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  up() {
    this.count += 1;
    this.total += 1;
    return this;
  }

  isMax() {
    return this.count > Counter.MAX;
  }

  reset(start = 0) {
    this.count = start;
    return this;
  }

  resetTotal() {
    this.total = 0;
    return this;
  }

  hue() {
    return 180 - this.count * (180 / Counter.MAX);
  }

  static createNew() {
    return new Counter();
  }
}

export default Counter;
