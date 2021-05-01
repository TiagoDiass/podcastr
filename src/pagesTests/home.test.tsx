import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from 'pages';

describe('Home page', () => {
  it('should render 2 episodes on the latest episodes', () => {
    const latestEpisodes = [];

    render(<Home />);
  });
});
