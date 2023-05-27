module.exports = function (rsi1, rsi2, closingPrice1, closingPrice2, si, ei) {
  let arr = [];
  //relative gap
  for (let j = si; j <= ei; j++) {
    arr.push(rsi1[j] - rsi2[j]);
  }
  let indices = [];
  let i = si;
  indices.push(si);
  //find trading point
  while (i < ei) {
    let a = false,
      b = false;
    while (i < ei && arr[i] >= arr[i + 1]) {
      a = true;
      i++;
    }
    if (a) {
      indices.push(i);
    }
    while (i < ei && arr[i] <= arr[i + 1]) {
      b = true;
      i++;
    }
    if (b) {
      indices.push(i);
    }
    i++;
  }
  if (indices.length <= 1) return 0;
  let profit = 0;
  let n = indices.length;
  //profit calculation by taking long position on underpefroming(buy-sell) and short position on outperforming(sell-buy)
  for (let j = 1; j < n; j++) {
    let sum =
      closingPrice1[indices[j]] -
      closingPrice1[indices[j - 1]] +
      (closingPrice2[indices[j - 1]] - closingPrice2[indices[j]]);
    if (sum < 0) {
      sum = 0 - sum;
    }
    profit += sum;
  }
  return {
    value: profit,
    period: indices,
  };
};
