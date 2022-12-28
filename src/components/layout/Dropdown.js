import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrencies } from "../../graphql/queries";
import classes from "./Dropdown.module.css";
import { initCurrency } from "../../store/currency-actions";
import { currencyActions } from "../../store/currency-slice";
import DropdownItem from "./DropdownItem";

class Dropdown extends Component {
  state = {
    toggleDropdown: false,
    allCurrencies: [],
  };

  componentDidMount() {
    const loadAllCurrenciesHandler = async () => {
      const data = await getCurrencies();

      this.setState({ allCurrencies: data });
    };
    loadAllCurrenciesHandler();

    this.props.onInitCurrency(); // Redux Thunk
 
  }

  toggleDropdownHandler = () => {
    this.setState((prevState) => {
      return { toggleDropdown: !prevState.toggleDropdown };
    });
  };

  render() {
    
    return (
      <div onClick={this.toggleDropdownHandler} className={classes.dropdown}>
      {this.props.setCurrSymbol}

        {this.state.toggleDropdown && (
          <ul>
            {this.state.allCurrencies.map((item, index) => (
              <DropdownItem
                key={index + item.symbol}
                symbol={item.symbol}
                label={item.label}
                onClick={() => this.props.onCurrencySwitch(item.symbol)}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setCurrSymbol: state.currency.setCurrSymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitCurrency: () => dispatch(initCurrency()),
    onCurrencySwitch: (symbol) =>
      dispatch(currencyActions.currencySwitch(symbol)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
