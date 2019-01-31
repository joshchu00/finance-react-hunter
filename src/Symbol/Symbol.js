import React, { Component } from 'react';
import config from '../config/config';
import './Symbol.css';
import SymbolHeader from './SymbolHeader';
import SymbolChart from './SymbolChart';

class Symbol extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      records: [],
      error: null,
    };
  }

  componentDidMount() {

    const { exchange, symbol, period } = this.props.match.params;

    fetch(`${config.porter.v1.scheme}://${config.porter.v1.host}:${config.porter.v1.port}/porter/v1/exchange/${exchange}/symbol/${symbol}/period/${period}`)
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
          { name: data.name, records: data.records }
        )
      }
    )
    .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <div className='Symbol'>
        <SymbolHeader name={this.state.name} symbol={this.props.match.params.symbol}/>
        <SymbolChart records={this.state.records} />
      </div>
    );
  }
}

export default Symbol;
