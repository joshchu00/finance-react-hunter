import React from 'react';
import ReactDOM from 'react-dom';
import Symbol from './Symbol';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Symbol />, div);
  ReactDOM.unmountComponentAtNode(div);
});
