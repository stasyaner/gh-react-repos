import { devConfig } from "../config/development";
import { prodConfig } from "../config/production";
import {
    GQLQueryRequest,
    GQLResponse,
} from "../model/gqlRequest";

export async function fetchApi(endpoint: string, body?: unknown): Promise<Response | null> {
    const headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
    });
    if (process.env.NEXT_PUBLIC_GH_TOKEN) {
        const token = process.env.NEXT_PUBLIC_GH_TOKEN;
        headers.set("Authorization", `bearer ${token}`);
    }
    const reqConfig: RequestInit = {
        method: "POST",
        headers,
        body: body ? JSON.stringify(body) : "",
    };

    let res = null;
    try {
        res = await fetch(endpoint, reqConfig);
    } catch (e: unknown) {
        const message = (e as Error)?.message ||
            `Unknown error occured when trying to send the request to ${endpoint}`;
        console.log(message, "Request config:", JSON.stringify(reqConfig));
    }

    if (res?.status && res.status !== 200) {
        let message = `Request to ${endpoint} failed`;
        message += ` with ${res?.status || "unknown"} status code`;
        console.log(message);

        return null;
    }

    return res;
}

export async function fetchQuery(query: GQLQueryRequest): Promise<GQLResponse> {
    const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

    const res = await fetchApi(config.graphEndpoint, query);
    let queryResult: GQLResponse = {};

    if (!res) return queryResult;

    let queryResultText = "";
    try {
        queryResultText = await res.text();
    } catch (e: unknown) {
        const message = (e as Error)?.message ||
            "Unknown error occured when trying to retrieve the request result text";
        console.log(message);
    }

    try {
        queryResult = JSON.parse(queryResultText) as GQLResponse;
    } catch (e: unknown) {
        const message = (e as Error)?.message ||
            "Unknown error occured when trying to parse the request result";
        console.log(message);
    }

    return queryResult;
}
