import React, { Component } from 'react';
import './SymbolHeader.css';

class SymbolHeader extends Component {

  render() {
    return (
      <div className='Symbol-header'>
        <p>{this.props.name} {this.props.symbol}</p>
      </div>
    );
  }
}

export default SymbolHeader;
