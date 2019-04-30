import React, { Component } from 'react';
import './Symbol.css';
import SymbolHeader from './SymbolHeader';
import SymbolChart from './SymbolChart';

const config = window.config;

class Symbol extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ticks: [],
      error: null,
    };
  }

  componentDidMount() {

    const { exchange, symbol, period } = this.props.match.params;

    fetch(`${config.shielder.proxy.scheme}://${config.shielder.proxy.host}:${config.shielder.proxy.port}/porter/v1/exchange/${exchange}/symbol/${symbol}/period/${period}`)
    .then(
      response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }
    )
    .then(
      data => {
        this.setState(
          { name: data.name, ticks: data.ticks }
        )
      }
    )
    .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <div className='Symbol'>
        <SymbolHeader name={this.state.name} symbol={this.props.match.params.symbol}/>
        <SymbolChart ticks={this.state.ticks} />
      </div>
    );
  }
}

export default Symbol;
