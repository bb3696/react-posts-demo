export default function Pagination({ page, total, limit, onPageChange }){

    const totalPages = Math.ceil(total / limit)

    if (totalPages <= 1) return null

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div>
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>

            {pages.map(p => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    disabled={p === page}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>

        </div>
    )
}