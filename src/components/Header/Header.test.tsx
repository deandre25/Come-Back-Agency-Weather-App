import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';

describe('Header', () => {
  it('should render the header correctly', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const headerText = screen.getByText('Weather App');

    expect(headerText).toBeInTheDocument();
  });

  it('should contain a link to the home page', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const homeLink = screen.getByText('Weather App').closest('a');

    expect(homeLink).toHaveAttribute('href', '/');
  });
});

