import Variation, { SierpinskyOne, SierpinskyTwo, SierpinskyThree } from './Variation.js'

export default class Transformation {
  constructor(xvec, yvec, ovec, color) {
    this.xvec = xvec;
    this.yvec = yvec;
    this.ovec = ovec;
    this.color = color;
    // map of active variation -> weight
    this.variations = new Array();
    this.variations.push([new SierpinskyOne(), 1/3]);
    this.variations.push([new SierpinskyTwo(), 1/3]);
    this.variations.push([new SierpinskyThree(), 1/3]);
  }

  transform( [x,y,c] ) {
    // TODO: something with xvec/yvec/ovec
    const variation = this.weightedRandomVariation();
    return variation.fn(x,y,c);
  }

  weightedRandomVariation() {
    const rand = Math.random();
    let cumWeight = 0;
    for (const [variation,weight] of this.variations) {
      cumWeight += weight;
      if (rand <= cumWeight)
        return variation;
    }
    console.log('uh oh');
  }
}


