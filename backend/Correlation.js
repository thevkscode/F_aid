module.exports = function (X, Y, n) {

    let sum_X = 0, sum_Y = 0, sum_XY = 0;
    let squareSum_X = 0, squareSum_Y = 0;

    for (let i = 0; i < n; i++) {

        // Sum of elements of array X.
        sum_X = sum_X + X[i];

        // Sum of elements of array Y.
        sum_Y = sum_Y + Y[i];

        // Sum of X[i] * Y[i].
        sum_XY = sum_XY + X[i] * Y[i];

        // Sum of square of array elements.
        squareSum_X = squareSum_X + X[i] * X[i];
        squareSum_Y = squareSum_Y + Y[i] * Y[i];
    }

    // Use formula for calculating correlation
    // coefficient.
    let corr = (n * sum_XY - sum_X * sum_Y) /
        (Math.sqrt((n * squareSum_X -
            sum_X * sum_X) *
            (n * squareSum_Y -
                sum_Y * sum_Y)));

    return corr;
}