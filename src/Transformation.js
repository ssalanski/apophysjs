import Variation, { LinearVariation } from './Variation.js'

export default class Transformation {
  constructor(xvec, yvec, ovec, color) {
    this.xvec = xvec;
    this.yvec = yvec;
    this.ovec = ovec;
    this.color = color;
    // map of active variation -> weight
    this.variations = new Array();
    this.variations.push([new LinearVariation(), 1.0]);
  }
}


