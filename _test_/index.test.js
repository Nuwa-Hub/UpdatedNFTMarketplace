
import { screen } from '@testing-library/react'
import Home from '@/pages/index'
import { renderWithProviders } from '../utils/test-utils'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import Navbar from '@/components/Navbar'


import '@testing-library/jest-dom'

describe('Home', () => {
  it("renders text", () => {
    renderWithProviders(<Home />);
    const text = screen.getByText(/Kryptonaut/i);

    expect(text).toBeInTheDocument();
  });
})

describe('Connect Wallet Button', () => {
  it("renders button", () => {
    renderWithProviders(<ConnectWalletButton />);
    const button = screen.getByRole('button', { name: /Connect Wallet/i });

    expect(button).toBeInTheDocument();
  });
})

describe('NavBar', () => {
  it("renders NavBar", () => {
    renderWithProviders(<Navbar />);
    const button = screen.getAllByRole('link', { name: /Explore/i });

    expect(button[0]).toBeInTheDocument();
  });
})


