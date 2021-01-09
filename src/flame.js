
export default class FlameGenerator {
  constructor(transforms) {
    this.transforms = transforms;
  }

  setView({x0,y0,xw,yh}, [offsetX,offsetY,width,height]) {
    this.viewTransform = ([x,y]) => {
      return [ (x-x0)/xw*width - offsetX, (y-y0)/yh*height - offsetY ];
    }
  }
  
  genPts = function*() {
    const samples=1<<10;
    const iterations=16;
    for(let sample=0;sample<samples;sample++) {
      let pt = [Math.random()*2-1,Math.random()*2-1,[1,1,1]];
      for(let iteration=0;iteration<iterations;iteration++) {
        for (let transform of this.transforms) {
          pt = transform.transform(pt);
        }
      }
      pt = this.viewTransform(pt.slice(0,2));
      yield pt;
    }
  }
}
