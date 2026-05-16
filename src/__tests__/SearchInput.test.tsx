import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "@/components/SearchInput";

const replace = jest.fn();
const push = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push,
    replace
  })
}));

describe("SearchInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the query parameter value", () => {
    render(<SearchInput isSearching={false} value="Bulbasaur" />);

    expect(screen.getByRole("searchbox")).toHaveValue("Bulbasaur");
  });

  it("updates the URL automatically as the search changes", async () => {
    const user = userEvent.setup();

    render(<SearchInput isSearching={false} value="" />);

    await user.type(screen.getByRole("searchbox"), "Squirtle");

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/?q=Squirtle", { scroll: false });
    });
  });

  it("still supports submitting the current search with Enter", async () => {
    const user = userEvent.setup();

    render(<SearchInput isSearching={false} value="" />);

    await user.type(screen.getByRole("searchbox"), "Charmander{Enter}");

    expect(push).toHaveBeenCalledWith("/?q=Charmander", { scroll: false });
  });
});
