# F-aid
This website implements a pair trading strategy based on correlation and RSI values of two companies. It utilizes Node.js for the backend and Graph.js for graphical representations in HTML, CSS, and JavaScript.

## Idea

Our main observation is that when there is a drop in relative RSI values, there is also a drop in the closing price. Based on this observation, we have devised the following trading strategy:

1. Start a new trade when the difference in RSI values between the two companies starts decreasing or increasing.
2. Continue the trade as long as the RSI values show a consistent pattern (either decreasing or increasing).
3. Once the RSI values exhibit a different pattern (e.g., decreasing when it was previously increasing or vice versa), end the current trade and start a new one.
4. This strategy aims to minimize losses by capitalizing on the initial trend but also being responsive to changes in the RSI pattern that could indicate a potential reversal.

## Correlation Criteria

The first criteria for pair selection is a correlation of 0.7 or above. The correlation between two companies can be calculated using the following formula: 

correlation = (n * Σxy - (Σx * Σy)) / sqrt((n * Σx^2 - (Σx)^2) * (n * Σy^2 - (Σy)^2))

Where:
- `n` is the number of data points
- `Σxy` is the sum of the product of the corresponding data points of the two companies
- `Σx` and `Σy` are the sums of the data points of each company
- `Σx^2` and `Σy^2` are the sums of the squared data points of each company

## RSI (Relative Strength Index) Value

RSI is a technical indicator that measures the speed and change of price movements in a security. It provides insights into whether a stock is overbought or oversold.

RSI is calculated using the following formula:
RSI = 100 - (100 / (1 + RS)).

RS (Relative Strength) is calculated as the average gain of up periods divided by the average loss of down periods over a specified time period.

RSI values typically range from 0 to 100. A value above 70 is considered overbought, suggesting a potential price reversal or correction, while a value below 30 is considered oversold, indicating a potential buying opportunity.

Traders often use RSI values to identify potential entry or exit points in a stock, based on overbought or oversold conditions.

Here is a demo graph illustrating the RSI values of two companies:

![RSI Graph](# F-aid
This website implements a pair trading strategy based on correlation and RSI values of two companies. It utilizes Node.js for the backend and Graph.js for graphical representations in HTML, CSS, and JavaScript.

## Idea

Our main observation is that when there is a drop in relative RSI values, there is also a drop in the closing price. Based on this observation, we have devised the following trading strategy:

1. Start a new trade when the difference in RSI values between the two companies starts decreasing or increasing.
2. Continue the trade as long as the RSI values show a consistent pattern (either decreasing or increasing).
3. Once the RSI values exhibit a different pattern (e.g., decreasing when it was previously increasing or vice versa), end the current trade and start a new one.
4. This strategy aims to minimize losses by capitalizing on the initial trend but also being responsive to changes in the RSI pattern that could indicate a potential reversal.

## Correlation Criteria

The first criteria for pair selection is a correlation of 0.7 or above. The correlation between two companies can be calculated using the following formula: 

correlation = (n * Σxy - (Σx * Σy)) / sqrt((n * Σx^2 - (Σx)^2) * (n * Σy^2 - (Σy)^2))

Where:
- `n` is the number of data points
- `Σxy` is the sum of the product of the corresponding data points of the two companies
- `Σx` and `Σy` are the sums of the data points of each company
- `Σx^2` and `Σy^2` are the sums of the squared data points of each company

## RSI (Relative Strength Index) Value

RSI is a technical indicator that measures the speed and change of price movements in a security. It provides insights into whether a stock is overbought or oversold.

RSI is calculated using the following formula:
RSI = 100 - (100 / (1 + RS)).

RS (Relative Strength) is calculated as the average gain of up periods divided by the average loss of down periods over a specified time period.

RSI values typically range from 0 to 100. A value above 70 is considered overbought, suggesting a potential price reversal or correction, while a value below 30 is considered oversold, indicating a potential buying opportunity.

Traders often use RSI values to identify potential entry or exit points in a stock, based on overbought or oversold conditions.

Here is a demo graph illustrating the RSI values of two companies:

![RSI Graph](https://github.com/thevkscode/F_aid/blob/main/readme-img/Screenshot%20(185).png)

## Closing Price

The closing price refers to the final price at which a security (such as a stock) trades during a trading session. It is the last recorded price before the market closes. In the context of pair trading, the closing price represents the price at which a company's stock is traded at the end of a trading day.

The closing price is an essential data point used in technical analysis. Traders and analysts often use closing prices to calculate various indicators, such as the RSI value mentioned earlier. Analyzing the closing prices of two companies allows for comparison and identification of potential trading opportunities.
)
## Implementation of Idea
## Backend Implementation (Node.js)

1. `correlation.js`:
   - Calculates the correlation between two companies based on their stock price data.
   - Input: Stock price data of two companies.
   - Output: List of pairs of companies with correlation values > 0.7.

2. `rsi.js`:
   - Calculates the RSI (Relative Strength Index) values for a given company's stock price data.
   - Input: Stock price data of a company and time period.
   - Output: RSI values for the specified company and time period.

3. `profit.js`:
   - Calculates the profit of a pair of companies traded between two specific dates.
   - Input: Stock price data for a selected pair of companies and date range.
   - Output: Profit generated from the trades.

## Frontend Implementation

1. `Graph.js`:
   - JavaScript library for creating graphical representations on the frontend.
   - Provides tools and functions for plotting graphs and charts.
   - Plots RSI values of both companies in a pair.
   - Plots closing prices versus the RSI values of individual stocks.
2. `UI`:
   - For frontend UI, we have used html,css and vanilla javascripts

## Execution Flow

1. Execute `correlation.js` to calculate the correlation between stock prices of different company pairs.
2. Store pairs with correlation values > 0.7.
3. For each selected pair:
   - Execute `rsi.js` to calculate RSI values for both companies.
   - Execute `profit.js` to calculate the profit generated from trading between specific dates.
4. Sort the profits in descending order.
5. Frontend retrieves sorted profit data.
  -here is a sample images of sorted list:
    ![Sorted List](https://github.com/thevkscode/F_aid/blob/main/readme-img/Screenshot%20(186).png)
6. Use `Graph.js` library to plot the RSI values of both companies in a pair and closing prices versus RSI values of individual stocks.
7. Visualize the graphs to aid in pair trading decisions.
