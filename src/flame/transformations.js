import Variation, { LinearVariation } from './variations.js'

export default class Transformation {
  constructor(xvec, yvec, ovec, color, weight) {
    this.xvec = xvec;
    this.yvec = yvec;
    this.ovec = ovec;
    this.color = color;
    this.weight = weight;
    // map of active variation -> weight
    this.variations = new Array();
    this.variations.push([new LinearVariation(), 1]);
  }

  transform( [x,y,c] ) {
    const tx = this.xvec[0]*x + this.yvec[0]*y + this.ovec[0];
    const ty = this.xvec[1]*x + this.yvec[1]*y + this.ovec[1];
    let [px,py] = [0,0]
    for (const [variation,weight] of this.variations) {
      const [dx,dy] = variation.fn(tx,ty);
      px += weight * dx;
      py += weight * dy;
    }
    // TODO: color stuff
    return [px,py,c];
  }

}


