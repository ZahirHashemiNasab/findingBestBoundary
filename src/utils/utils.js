
import {
    MinHeap,
    MaxHeap,
  } from '@datastructures-js/heap';

export const findBestAnswer = (data,sizeOfWindow,sizeOfWholeArray,determineCallBack) => {
    const max = new MaxHeap((element) => element.y)
    const min = new MinHeap((element) => element.y)
    let arrayStartEnd = {start:0,end:sizeOfWindow-1}
    data?.slice(0,sizeOfWindow-1)?.forEach((element) => max.insert(element));
    data?.slice(0,sizeOfWindow-1)?.forEach((element) => min.insert(element)); 
    const diff = []
     diff.push({diffAmount:max.top().y-min.top().y,min:min.top(),max:max.top()})
    arrayStartEnd.start +=1
    arrayStartEnd.end +=1
    for(let i=1 ; i<sizeOfWholeArray-sizeOfWindow  ; i++ ){
      if(min.top().x >i-1){
        min.insert(data[arrayStartEnd.end])
      }
      else{
        while(min.top().x <= i-1){
            min.pop()
        }
        min.insert(data[arrayStartEnd.end])
      }
      if(max.top().x > i-1 ){
        max.insert(data[arrayStartEnd.end])
      }
      else{
        while(max.top().x <= i-1){
            max.pop()
        }
        max.insert(data[arrayStartEnd.end])
      }
      diff.push({diffAmount:max.top().y-min.top().y,min:min.top(),max:max.top()})
      arrayStartEnd.start+=1
      arrayStartEnd.end+=1
    }
    const temp = diff.filter((e)=>e.diffAmount == Math.max(...diff.map(o => o.diffAmount)))[0]
    determineCallBack(temp.min.x,temp.max.x)
}