import Head from "next/head";
import {
    useEffect,
    useState,
} from "react";
import { Repository as GhRepository } from "../model/gqlSchemaGenerated";
import { getRepos } from "../service/service";

const Home: React.FC = () => {
    const [repos, setRepos] = useState<GhRepository[]>([]);

    useEffect(() => {
        void (async function(): Promise<void> {
            const reposRes = await getRepos();
            setRepos(reposRes);
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Github react repos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container my-5">
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
            </main>
        </>
    );
};

export default Home;
