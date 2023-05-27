const indicators = require('technicalindicators');
const Stocks = require('./Stocks.json');
const correlationCoefficient = require('./Correlation.js');
const netProfit = require('./profit.js');

class Pair {
    constructor(pair1, pair2, closingPrice1, closingPrice2, date, correlation, rsi1, rsi2, profit, period) {
        this.pair1 = pair1;
        this.pair2 = pair2;
        this.profit = profit;
        this.correlation = correlation;
        this.closingPrice1 = closingPrice1;
        this.closingPrice2 = closingPrice2;
        this.rsi1 = rsi1;
        this.rsi2 = rsi2;
        this.date = date;
        this.period = period
    }

}
module.exports = function main(date) {
    let index = indexLimit(date);
    const FilterPair = [];

    let i = 0;
    while (i < 50) {
        let j = i + 1;
        while (j < 50) {
            let pair1 = Stocks[i];
            let pair2 = Stocks[j];
            let closingPrice1 = pair1.CLOSE.slice(index.startIndex, index.endIndex+1);
            let closingPrice2 = pair2.CLOSE.slice(index.startIndex, index.endIndex+1);
            let date = pair1.DATE.slice(index.startIndex, index.endIndex+1);
            
            let correlation = correlationCoefficient(closingPrice1, closingPrice2, closingPrice2.length);
            correlation = parseFloat(correlation).toFixed(3);

            //Filter Pair
            if (correlation >= 0.7) {

                let cP1 = pair1.CLOSE.slice(index.startIndex-14, index.endIndex+1);
                let cp2 = pair2.CLOSE.slice(index.startIndex-14, index.endIndex+1);

                const inputRSI1 = {
                    values: cP1,
                    period: 14
                };
                const inputRSI2 = {
                    values: cp2,
                    period: 14
                };
                const rsi1 = indicators.RSI.calculate(inputRSI1);
                const rsi2 = indicators.RSI.calculate(inputRSI2);



                let trade = netProfit(rsi1, rsi2, closingPrice1, closingPrice2, 0, closingPrice2.length-1);
                const pairdata = new Pair(pair1.Symbol, pair2.Symbol, closingPrice1, closingPrice2, date, correlation, rsi1, rsi2, trade.value, trade.period);
                FilterPair.push(pairdata);
            }
            j++;
        }
        i++;
    }

    FilterPair.sort((a, b) => b.profit - a.profit)
    FilterPair.forEach((x, i) => x.rank = i + 1);
    return FilterPair;
}

function indexLimit(date){
    var dt = new Date(date.startDate);
    var dt2 = new Date(date.endDate);

    var dateArr = Stocks[0].DATE;

    
    let endIndex; let startIndex;

    for (let i = dateArr.length-1; i > 0; i--) {


        if (new Date(dateArr[i]) <= dt2) {
            endIndex = i; break;
        }
        

    }
    for (let i = 0; i < dateArr.length; i++) {


        if (new Date(dateArr[i]) >= dt) { 
            startIndex = i; break; 
        }
        
    }
    return{
        startIndex: startIndex,
        endIndex: endIndex
    }

}