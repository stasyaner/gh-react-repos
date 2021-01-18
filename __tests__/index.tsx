import fetch from "jest-fetch-mock";
import {
    cleanup,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import Home from "../pages";
import { testReactReturn } from "./__test_data__";

jest.mock("next/router", () => ({
    useRouter(): Record<string, string> {
        return {
            query: "",
        };
    },
}));


describe("snapshot testing", () => {
    afterEach(() => {
        fetch.mockClear();
        cleanup();
    });
    afterAll(jest.clearAllMocks);

    it("renders list with react", async () => {
        fetch.mockResponseOnce(JSON.stringify(testReactReturn));

        render(<Home />);
        await waitFor(() => screen.getByText("react"));
        const a = screen.getByText("react");
        expect(a).toBeInTheDocument();
        expect(a).toHaveAttribute("href", "https://github.com/facebook/react");
    });

    it("renders empty list", async () => {
        fetch.mockAbortOnce();

        render(<Home />);
        await waitFor(() => screen.getByText("Previous"));
        const a = screen.queryByText("react");
        expect(a).toBeNull();
    });
});
