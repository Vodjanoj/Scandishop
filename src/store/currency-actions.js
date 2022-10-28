import { currencyActions } from "./currency-slice";
import { getCurrencies } from "../graphql/queries";

export const initCurrency = () => {
  return (dispatch) => {
    const loadAllCurrencies = async () => {
      const data = await getCurrencies();
      dispatch(currencyActions.setCurrency(data));
    };
    loadAllCurrencies();
    // Should be caught any errors
  };
};
