import {
    useEffect,
    useState,
} from "react";
import { Repository as GhRepository } from "../model/gqlSchemaGenerated";
import { getRepos } from "../service/service";
import {
    Head,
    Container,
    RepoList,
} from "../components";

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
            <Head />
            <Container>
                <RepoList repos={repos} />
            </Container>
        </>
    );
};

export default Home;
