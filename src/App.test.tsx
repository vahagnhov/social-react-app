import React from 'react';
import ReactDOM from "react-dom";
import MainApp from './App';
import {render} from "@testing-library/react";
import {createRoot} from "react-dom/client";
import {act} from "react-test-renderer";

test('renders without crashing', () => {
  const div = document.createElement('div') as HTMLElement;
  const root = createRoot(div);
  render(<MainApp />);
  act(() => {
    root.unmount();
  });
});