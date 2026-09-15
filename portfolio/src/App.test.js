import { fireEvent, render, screen } from '@testing-library/react';
import ResumeNew from './components/Resume/ResumeNew';
import QueryForm from './components/QueryForm';
import Blogs from './components/Blogs/Blogs';
import { getBlogCategories, getBlogBySlug, postQuery } from './services/api';

jest.mock('./components/Particle', () => () => <div data-testid="particle" />);
jest.mock('./components/Blogs/Comments', () => () => <div>Comments</div>);
jest.mock('./services/api', () => ({
  getBlogCategories: jest.fn(),
  getBlogBySlug: jest.fn(),
  postQuery: jest.fn(),
}));

test('resume download button saves the pdf with the correct name instead of opening a new tab', () => {
  render(<ResumeNew />);

  const downloadButton = screen.getByRole('button', { name: /download resume/i });

  expect(downloadButton).toHaveAttribute('download', 'Shivam Sharma.pdf');
  expect(downloadButton).not.toHaveAttribute('target', '_blank');
});

test('inquiry form updates budget options when currency is changed', () => {
  render(<QueryForm />);

  const currencySelect = screen.getByRole('combobox', { name: /currency/i });
  fireEvent.change(currencySelect, { target: { value: 'INR' } });

  const budgetSelect = screen.getByRole('combobox', { name: /budget/i });

  expect(screen.getByRole('option', { name: /under ₹5,00,000/i })).toBeInTheDocument();
  expect(screen.queryByRole('option', { name: /under \$5,000/i })).not.toBeInTheDocument();
});

test('inquiry form renders optional mobile fields and still allows submission without them', async () => {
  postQuery.mockResolvedValue({ ok: true });

  render(<QueryForm />);

  expect(screen.getByLabelText(/country code/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/name/i), {
    target: { value: 'Shivam Sharma' },
  });
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'shivam@example.com' },
  });
  fireEvent.change(screen.getByRole('combobox', { name: /focus area/i }), {
    target: { value: 'Software Consultation' },
  });
  fireEvent.change(
    screen.getByPlaceholderText(/briefly describe your product, current challenge, and what success looks like/i),
    {
      target: { value: 'Need help with platform architecture.' },
    }
  );

  fireEvent.click(screen.getByRole('button', { name: /send message/i }));

  expect(await screen.findByText(/thanks! your message has been sent/i)).toBeInTheDocument();
  expect(postQuery).toHaveBeenCalledWith(
    expect.objectContaining({
      phone: null,
    })
  );
});

test('blogs page selects the first available blog after loading categories', async () => {
  getBlogCategories.mockResolvedValue({
    Engineering: [{ title: 'First Engineering Post', slug: 'first-engineering-post' }],
  });
  getBlogBySlug.mockResolvedValue({
    _id: '1',
    title: 'First Engineering Post',
    category: 'Engineering',
    author: 'Shivam Sharma',
    createdAt: '2024-01-01T00:00:00.000Z',
    content: 'First paragraph\n\nSecond paragraph',
  });

  render(<Blogs />);

  expect(await screen.findByText(/first engineering post/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /first engineering post/i })).toBeInTheDocument();
});
