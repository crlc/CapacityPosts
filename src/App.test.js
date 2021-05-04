import { render, screen } from '@testing-library/react';
import App from './App';

it('renders title', () => {
  render(<App />);
  expect(screen.getByText('Welcome to Capacity Posts')).toBeInTheDocument();
});

it('renders form submit button', () => {
  render(<App />);
  expect(screen.getByText('Submit')).toBeInTheDocument();
});

// it('should remove a post', () => {
//   render(<App />);
//   const count = screen.getAllByTitle('Delete post').length;
//   const buttonEl = screen.getByTitle('Delete post');
//   userEvent.click(buttonEl);
//   const newCount = screen.getAllByTitle('Delete post').length;
//   expect(newCount).toEqual(count - 1);
// });