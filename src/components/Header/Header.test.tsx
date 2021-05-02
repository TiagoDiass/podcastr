import Header from './Header';
import { render, screen } from '@testing-library/react';
import MockDate from 'mockdate';

describe('Header component', () => {
  it('should present the date correctly', () => {
    // mocking the current date to be able to assert on Header
    MockDate.set(new Date('2021-04-27 12:00:00'));
    render(<Header onThemeChange={() => {}} />);
    expect(screen.getByTestId('current-date')).toHaveTextContent('ter, 27 abril');
  });
});
