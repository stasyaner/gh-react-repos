import {
    Repository as GhRepository,
    SearchResultItemEdge as GhSearchResultItemEdge,
    SearchType as GhSearchType,
} from "../model/gqlSchemaGenerated";
import {
    fetchQuery,
} from "../utils/fetchWrapper";
import {
    GQLSearchQuery,
} from "../model/gqlRequest";

export async function getRepos(): Promise<GhRepository[]> {
    const reqGraphQuery: GQLSearchQuery = {
        query: `query searchReactRepos($query: String!, $type: SearchType!, $first: Int!) {
            search(query: $query, type: $type, first: $first) {
                edges {
                    cursor
                    node {
                        ... on Repository {
                            id
                            name
                            url
                            stargazerCount
                            forkCount
                        }
                    }
                }
            }
        }`,
        variables: {
            query: "react",
            type: GhSearchType.Repository,
            first: 20,
        },
    };

    const res = await fetchQuery(reqGraphQuery);
    if (res.errors) {
        console.log(res.errors);

        return [];
    }

    let edges = res?.data?.search?.edges ?? [];

    // eliminating "Maybe" type
    edges = edges.filter(j => j !== null);

    // can't be "Maybe" here
    const repos = (edges as GhSearchResultItemEdge[]).map(e => e.node as GhRepository);

    return repos;
}
