
export default class Variation {
  constructor(name) {
    this.name = name;
  }
}

class SierpinskyOne {
  constructor() {
    this.name = 'SierpinskyOne';
  }
  fn(x,y,c) {
    return [x/2,y/2,c];
  }
}
class SierpinskyTwo {
  constructor() {
    this.name = 'SierpinskyTwo';
  }
  fn(x,y,c) {
    return [(x+1)/2,y/2,c];
  }
}
class SierpinskyThree {
  constructor() {
    this.name = 'SierpinskyThree';
  }
  fn(x,y,c) {
    return [x/2,(y+1)/2,c];
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

export { LinearVariation, SinusoidalVariation, SierpinskyOne, SierpinskyTwo, SierpinskyThree };
