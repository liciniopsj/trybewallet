import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletFrom from '../components/WalletForm';
import {
  addExpense,
  setIdToEdit,
  editStatusToTrue,
  editStatusToFalse,
  editExpenses } from '../redux/actions';
import getCurrencies from '../services/getCurrencies';

const LOCAL_INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Wallet extends React.Component {
  state = LOCAL_INITIAL_STATE;

  handleWalletFormInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEditBtn = (elementId) => {
    const { dispatch, expenses } = this.props;
    // console.log(elementId);
    const elementToEdit = expenses.find((e) => e.id === elementId);
    // console.log(elementToEdit);
    dispatch(setIdToEdit(elementToEdit.id));
    dispatch(editStatusToTrue());
    this.setState({
      value: elementToEdit.value,
      description: elementToEdit.description,
      currency: elementToEdit.currency,
      method: elementToEdit.method,
      tag: elementToEdit.tag,
    });
  };

  handleEdit = (expenses, idToEdit) => {
    const { dispatch } = this.props;
    const payload = this.state;
    payload.id = idToEdit;
    const newExpenses = expenses.map((e) => {
      if (e.id === idToEdit) return { ...e, ...payload };
      return e;
    });
    dispatch(editExpenses(newExpenses));
    dispatch(editStatusToFalse());
    this.setState((prevState) => ({
      id: prevState.id + 1,
      ...LOCAL_INITIAL_STATE,
    }));
  };

  handleWalletFormBtn = async () => {
    const { dispatch, editor, expenses, idToEdit } = this.props;
    const data = await getCurrencies();
    // console.log(data);
    if (!editor) {
      dispatch(addExpense(this.state, data));
      this.setState((prevState) => ({
        ...LOCAL_INITIAL_STATE,
        id: prevState.id + 1,
      }));
    } else {
      this.handleEdit(expenses, idToEdit);
    }
  };

  render() {
    const { id, value, description, currency, method, tag } = this.state;
    return (
      <div>
        <Header />
        <br />
        <WalletFrom
          id={ id }
          value={ value }
          description={ description }
          currency={ currency }
          method={ method }
          tag={ tag }
          handleWalletFormInput={ this.handleWalletFormInput }
          handleWalletFormBtn={ this.handleWalletFormBtn }

        />
        <br />
        <Table
          handleEditBtn={ this.handleEditBtn }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.array,
  idToEdit: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(Wallet);
