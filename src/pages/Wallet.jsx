import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletFrom from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        <WalletFrom />
        <br />
        TrybeWallet
      </div>
    );
  }
}

export default connect()(Wallet);
