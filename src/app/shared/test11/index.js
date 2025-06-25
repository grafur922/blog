/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    let ans=[1],len=Math.round((rowIndex+1)/2)
    for(let i=1;i<len;i++){
        ans.push(combination(rowIndex,i))
    }
    if(rowIndex%2==0){
        ans.push(...ans.slice(0,ans.length-1).reverse())
    }
    else{
        ans.push(...ans.slice().reverse())
    }
    return ans
};
function combination(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    k = Math.min(k, n - k);
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result = result * (n - k + i) / i;
    }
    return result;
}
console.log(getRow(3));
