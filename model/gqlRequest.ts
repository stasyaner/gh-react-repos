import {
    Query,
    Mutation,
    QuerySearchArgs,
} from "./gqlSchemaGenerated";

export type GQLResponse = {
    data?: Query & Mutation;
    errors?: unknown[];
};

export type GQLQueryRequest = {
    query: string;
    variables?: Record<string, unknown>;
};

export type GQLSearchQuery = GQLQueryRequest & {
    variables: QuerySearchArgs;
};
