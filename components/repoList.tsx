import { Repository as GhRepository } from "../model/gqlSchemaGenerated";

type props = { repos: GhRepository[] };

export const RepoList: React.FC<props> = ({ repos }) => (
    <ul>
        {
            repos.map(r => (
                <li key={r.id}>
                    {typeof r.url === "string" ?
                        (<a href={r.url}>{r.name}</a>)
                        : r.name} - {" "}
                    <span role="img" aria-label="star">🌟</span> {r.stargazerCount} - {" "}
                    <span role="img" aria-label="fork">🍴</span> {r.forkCount}
                </li>
            ))
        }
    </ul>
);
