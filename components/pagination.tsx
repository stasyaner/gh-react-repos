import Link from "next/link";

type props = { page: number, pages: number[] };

export const Pagination: React.FC<props> = ({ page, pages }) => (
    <nav
        aria-label="repo list navigation"
        className="d-flex justify-content-center"
    >
        <ul className="pagination">
            <li className={`page-item ${page - 1 === 0 ? "disabled" : ""}`}>
                {page - 1 > 0 ? (
                    <Link href={`/?page=${page - 1}`}>
                        <a className="page-link">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </Link>
                ) : (
                    <span className="page-link">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </span>
                )}
            </li>
            {pages.map(p => (
                <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                    <Link href={`/?page=${p}`}>
                        <a className="page-link">{p}</a>
                    </Link>
                </li>
            ))}
            <li className={`page-item ${page + 1 > pages.length ? "disabled" : ""}`}>
                {page + 1 <= pages.length ? (
                    <Link href={`/?page=${page + 1}`}>
                        <a className="page-link" href={`/?page=${page + 1}`}>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </Link>
                ) : (
                    <span className="page-link">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </span>
                )}
            </li>
        </ul>
    </nav>
);
