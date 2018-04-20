export function inArray(needle,haystack){
    let count = haystack.length;

    for(let i=0; i<count; i++){
        if(haystack[i] === needle)
            return true;
    }

    return false;
}

export function removeFromArray(needle,haystack){
    let count = haystack.length;
    let returnArr = [];

    for(let i=0; i<count; i++){
        if(haystack[i] !== needle)
            returnArr.push(haystack[i]);
    }

    return returnArr;
}
