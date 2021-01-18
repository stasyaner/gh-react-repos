// DISCLAIMER: it's a JS because it's hard to setup TS for snapshots
// and doesn't really make sense here

import {
    act,
    create,
} from "react-test-renderer";
import fetch from "jest-fetch-mock";
import Home from "../pages";
import { testReactReturn } from "./__test_data__";

jest.mock("next/router", () => ({
    useRouter() {
        return {
            query: "",
        };
    },
}));

describe("snapshot testing", () => {
    it("renders home page", async () => {
        fetch.mockResponseOnce(JSON.stringify(testReactReturn));

        let tree;
        await act(async () => {
            tree = create(<Home />);
        });

        expect(tree.toJSON()).toMatchSnapshot();

        jest.clearAllMocks();
        fetch.mockClear();
    });
});
