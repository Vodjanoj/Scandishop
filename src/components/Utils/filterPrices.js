export const filterPrices = (prices, currencSymbol) =>
  prices.filter((price) => price.currency.symbol === currencSymbol);
