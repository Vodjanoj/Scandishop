import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrencies } from "../../graphql/queries";
import classes from "./Dropdown.module.css";
import { initCurrency } from "../../store/currency-actions";
import { currencyActions } from "../../store/currency-slice";
import DropdownItem from "./DropdownItem";

class Dropdown extends Component {
  dropdownRef = React.createRef();
  state = {
    toggleDropdown: false,
    allCurrencies: [],
  };

  componentDidMount() {
    document.addEventListener("click", this.clickOutsideHandler);
    const loadAllCurrenciesHandler = async () => {
      const data = await getCurrencies();

      this.setState({ allCurrencies: data });
    };
    loadAllCurrenciesHandler();

    this.props.onInitCurrency(); // Redux Thunk
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickOutsideHandler);
  }

  toggleDropdownHandler = () => {
    this.setState((prevState) => {
      return { toggleDropdown: !prevState.toggleDropdown };
    });
  };

  clickOutsideHandler = (event) => {
    const current = this.dropdownRef.current;

    if (!current.contains(event.target)) {
      this.setState({ toggleDropdown: false });
    }
  };

  render() {
    return (
      <div ref={this.dropdownRef}
        onClick={this.toggleDropdownHandler}
        className={`${classes.currency} ${this.state.toggleDropdown &&
          classes.active}`}
      >
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
