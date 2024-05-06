import SignUpPage from "@/app/auth/signup/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppRouterContextProviderMock } from "../__mocks__/app-router-context-provider-mock";

const replace = jest.fn();

describe("SignUpPage component", () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ replace }}>
        <SignUpPage />
      </AppRouterContextProviderMock>
    );
  });

  test("renders correctly", () => {
    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Sign Up");
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
  });

  test("inputs accept user input", () => {
    const emailInput = screen.getByLabelText(
      "Email address"
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("testPassword");
  });
});
