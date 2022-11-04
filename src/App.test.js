import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from "react-dom";
import MainApp from './App';

/*test('renders learn react link', () => {
  render(<MainApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<MainApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});