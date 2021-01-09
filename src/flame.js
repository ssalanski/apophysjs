
export default class FlameGenerator {
  constructor(transforms) {
    this.transforms = transforms;
  }

  setView(offsetX,offsetY, width, height) {
    const x0 = -1;
    const y0 = -1;
    this.viewTransform = ([x,y]) => {
      //console.log(x,x0,width,offsetX);
      //console.log(y,y0,height,offsetY);
      return [ (x-x0)*width/5 - offsetX, (y-y0)*height/5 - offsetY ];
    }
  }

  drawPts(context) {
    for(let sample=0;sample<256;sample++) {
      let pt = [Math.random()*2-1,Math.random()*2-1,[1,1,1]];
      for(let iteration=0;iteration<16;iteration++) {
        for (let transform of this.transforms) {
          pt = transform.transform(pt);
        }
      }
      //console.log('before',pt);
      pt = this.viewTransform(pt.slice(0,2));
      //console.log('after',pt);
      context.fillRect(pt[0],pt[1],2,2);
    }
  }
}
