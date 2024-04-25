import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

describe('App', () => {
  it('renders App component', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const headerText = screen.getByText('Weather App');
    expect(headerText).toBeInTheDocument();
  });
});
