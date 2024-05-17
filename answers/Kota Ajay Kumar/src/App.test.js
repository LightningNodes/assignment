import { render, screen } from "@testing-library/react";
import CryptoContractsPage from "../src/Components/CryptoContractsPage.jsx";

test("renders Crypto Contracts text", () => {
  const user = { displayName: "Kota ajay kumar" };
  render(<CryptoContractsPage user={user} />);
  const textElement = screen.getByText(/Crypto Contracts/i);
  expect(textElement).toBeInTheDocument();
});
