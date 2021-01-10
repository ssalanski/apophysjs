
// weights must be non negative and sum to 1
function weightedRandomSelection(itemsAndWeights) {
  const totalWeight = itemsAndWeights.reduce( (t,item) => { return t + item.weight; }, 0 );
  const rand = Math.random() * totalWeight;
  let cumWeight = 0;
  for (const item of itemsAndWeights) {
    cumWeight += item.weight;
    if (rand <= cumWeight)
      return item;
  }
  console.log('uh oh');
}

export default class FlameGenerator {
  constructor(transforms) {
    this.transforms = transforms;
  }
  
  genPts = function*(iterations=16,samples=1<<8) {
    for(let sample=0;sample<samples;sample++) {
      // TODO: should this be randomly seeded or start at zero?
      let pt = [Math.random()*2-1,Math.random()*2-1,[1,1,1]];
      for(let iteration=0;iteration<iterations;iteration++) {
        const chosenTransform = weightedRandomSelection(this.transforms);
        pt = chosenTransform.transform(pt);
      }
      yield pt;
    }
  }
}
