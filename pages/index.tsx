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
    Pagination,
} from "../components";
import { REPOS_PER_PAGE } from "../model/constants";
import { useRouter } from "next/dist/client/router";

const Home: React.FC = () => {
    const router = useRouter();
    const [repos, setRepos] = useState<GhRepository[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState([1]);
    const [reposVisible, setReposVisible] = useState<GhRepository[]>([]);

    useEffect(() => {
        void (async function(): Promise<void> {
            const reposRes = await getRepos();
            setRepos(reposRes);

            let pageNum = reposRes.length / REPOS_PER_PAGE;
            if (pageNum % 1 > 0) pageNum = Math.trunc(pageNum) + 1;
            // starting from 2 because we have pages state initialized to [1] by default
            const newPages = [1];
            for (let i = 2; i <= pageNum; i++) {
                newPages.push(i);
            }
            setPages(newPages);
        })();
    }, []);

    useEffect(() => {
        let pageParam = router.query.page ?? 1;
        if (typeof pageParam === "string") {
            pageParam = parseInt(pageParam, 10);
        } else if (typeof pageParam !== "number") {
            pageParam = parseInt(pageParam[0], 10);
        }
        setPage(pageParam);
        const sliceStart = (pageParam - 1) * REPOS_PER_PAGE;
        const sliceEnd = sliceStart + REPOS_PER_PAGE;
        const newReposVisible = repos.slice(sliceStart, sliceEnd);
        setReposVisible(newReposVisible);
    }, [repos, router.query.page]);

    return (
        <>
            <Head />
            <Container>
                <RepoList repos={reposVisible} />
                <Pagination page={page} pages={pages} />
            </Container>
        </>
    );
};

export default Home;
