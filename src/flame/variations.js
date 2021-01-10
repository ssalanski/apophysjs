
export default class Variation {
  constructor(name) {
    this.name = name;
  }
}

class LinearVariation {
  constructor() {
    this.name = 'Linear';
  }
  fn(x,y) {
    return [x,y];
  }
}

class SinusoidalVariation {
  constructor() {
    this.name = 'Sinusoidal';
  }
  fn(x,y) {
    return [Math.sin(x),Math.sin(y)];
  }
}

export { LinearVariation, SinusoidalVariation };
