import { currencyActions } from "./currency-slice";
import { getCurrencies } from "../graphql/queries";

export const initCurrency = () => {
  return (dispatch) => {
    const loadAllCurrencies = async () => {
      const data = await getCurrencies();
   
      // we should use some distracture over here
      dispatch(currencyActions.setCurrency(data[0].symbol));
    };
    loadAllCurrencies();
    // Should be caught any errors
  };
};
