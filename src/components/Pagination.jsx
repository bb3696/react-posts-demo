export default function Pagination({ page, total, limit, onPageChange }){

    const totalPages = Math.ceil(total / limit)

    //- 如果总页数小于等于 1，就没必要显示分页按钮
    if (totalPages <= 1) return null

    //Array.from({ length: N }, (_, i) => i + 1) 是构造 1 到 N 的标准写法
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div>
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>
            
            {pages.map(p => (  //遍历所有页码，生成每个页码按钮
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