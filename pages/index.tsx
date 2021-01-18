import Head from "next/head";

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Github react repos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container my-5">
                <ul>
                    <li>
                        <a href="#">react</a> - {" "}
                        <span role="img" aria-label="star">🌟</span> 999 - {" "}
                        <span role="img" aria-label="fork">🍴</span> 999
                    </li>
                </ul>
            </main>
        </>
    );
};

export default Home;
