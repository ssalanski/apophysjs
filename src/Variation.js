
export default class Variation {
  constructor(name) {
    this.name = name;
  }
}

class LinearVariation {
  constructor() {
    this.name = 'Linear';
  }
  fn(x,y,c) {
    // TODO:
    return [x,y,c];
  }
}

class SinusoidalVariation extends Variation {
  constructor() {
    super('Sinusoidal');
  }
  fn(x,y,c) {
    return [x,y,c];
  }
}

export { LinearVariation, SinusoidalVariation };
