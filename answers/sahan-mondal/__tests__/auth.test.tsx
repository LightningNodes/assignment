import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/app/login/page";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

test("renders login page and test login functionality", () => {
  render(<Login />);
  const input_email = screen.getByLabelText("Email")
  const input_password = screen.getByLabelText("Password")
  expect(input_email).toBeInTheDocument();
  expect(input_password).toBeInTheDocument();

  fireEvent.change(input_email, { target: { value: 'sahanmondal@iitbhilai.ac.in' } });
  fireEvent.change(input_password, { target: { value: '12345678' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Login' }));
});
