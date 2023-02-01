import { currencyActions } from "./currency-slice";
import { getCurrencies } from "../graphql/queries";

export const initCurrency = () => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.currency.setCurrSymbol) {
      return;
    }

    const loadAllCurrencies = async () => {
      const data = await getCurrencies();
      dispatch(currencyActions.setCurrency(data[0].symbol));
    };
    loadAllCurrencies();
  };
};
