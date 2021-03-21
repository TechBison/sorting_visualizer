export function getMergeSortAnimations(array){
    const animations = [];
    if(array.size<=1) return array;
    const auxilaryArray = array.slice();

    mergeSortHelper(array,0,array.length-1,auxilaryArray,animations);
    return animations;
}

function mergeSortHelper(mainArr,startIdx,endIdx,auxilaryArr,animations)
{
    if(startIdx === endIdx) return;
    const mid = Math.floor((startIdx+endIdx)/2);
    mergeSortHelper(auxilaryArr,startIdx,mid,mainArr,animations);
    mergeSortHelper(auxilaryArr,mid+1,endIdx,mainArr,animations);
    doMerge(mainArr,startIdx,mid,endIdx,auxilaryArr,animations);
}

function doMerge(mainArr,startIdx,mid,endIdx,auxilaryArr,animations)
{
    let k = startIdx;
    let i = startIdx;
    let j = mid+1;

    while(i<=mid && j<=endIdx)
    {
        animations.push([i,j]);
        animations.push([i,j]);
        if(auxilaryArr[i]<auxilaryArr[j])
        {
            animations.push([k,auxilaryArr[i]])
            mainArr[k++] = auxilaryArr[i++];
        }
        else{
            animations.push([k,auxilaryArr[j]])
            mainArr[k++] = auxilaryArr[j++];
        }
    }
    while(i<= mid)
    {
        animations.push([k,i]);
        animations.push([k,i]);
        animations.push([k,auxilaryArr[i]]);
        mainArr[k++] = auxilaryArr[i++];
    }
    while(j<=endIdx)
    {
        animations.push([k,j]);
        animations.push([k,j]);
        animations.push([k,auxilaryArr[j]]);
        mainArr[k++] = auxilaryArr[j++];
    }
}