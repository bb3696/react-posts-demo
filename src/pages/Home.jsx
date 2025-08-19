import { useEffect, useState } from "react";
import { fetchPosts } from '../api/posts';
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import { searchPosts } from "../api/posts";
import Pagination from "../components/Pagination";
import SortingControls from "../components/SortingControls";

export default function Home(){

    const [posts, setPosts] = useState([])
    const [q, setQ] = useState('')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [sortBy, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState('asc') //默认升序

    const LIMIT = 10

    //拉数据
    // useEffect(() => {
    //     async function load(){
    //         const data = await fetchPosts({ page: 1, limit: 5})
    //         setPosts(data.posts)
    //     }

    //     load()
    // }, [])

    //SearchBar
    useEffect(() => {
        let cancelled = false

        //定义一个异步函数 `load()`，用来发请求并处理数据。
        async function load(){
            try {
                const data = q
                ? await searchPosts({ q, page, limit:LIMIT })
                : await fetchPosts({ page, limit:LIMIT })

                //这是关键判断：
                // - 如果请求还“有效”（即组件还没卸载），才调用 `setPosts()` 更新状态
                // - 否则放弃更新，防止内存泄漏或 React 报错
                if(!cancelled){
                    let sortedPosts = [...data.posts] // 拷贝，不修改原数组

                    if (sortBy) {
                        sortedPosts.sort((a,b) => { //- JavaScript 的 `sort()` 接收一个比较函数。如果 sortBy 是 `"title"` → 就比较 `a.title` 和 `b.title`
                            let aVal = a[sortBy]
                            let bVal = b[sortBy]

                            //字符串统一小写比较，数字不处理. 为了保证字符串大小写不影响排序，把所有 string 值都转成小写。
                            if (typeof aVal === 'string') aVal = aVal.toLowerCase()
                            if (typeof bVal === 'string') bVal = bVal.toLowerCase()
                            
                            if(aVal < bVal) return sortOrder === 'asc' ? -1 : 1
                            if(aVal > bVal) return sortOrder === 'asc' ? 1 : -1
                            return 0

                        })
                    }

                    setPosts(sortedPosts)
                    setTotal(data.total) //API 返回的是 { posts: [...], total: 150, skip: 20, limit: 10 }
                }
            } catch (err) {
                console.log('Error Loading', err)
            }
        }

        load()

        return () => {
            cancelled = true
        }

    }, [q, page, sortBy, sortOrder])


    const handleSearchSubmit = (text) => {
        setPage(1)
        setQ(text)
    }


    return(
        <div>
            <SearchBar value={q} onChange={setQ} onSubmit={handleSearchSubmit} />
            <SortingControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortByChange={setSortBy}
                onSortOrderChange={() => 
                    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                }
            />
            <h2>Home Page</h2>
            <PostList posts={posts} />
            <Pagination
                page={page}
                total={total}
                limit={LIMIT}
                onPageChange={(newPage) => setPage(newPage)} 
            />
            
        </div>
    )

}

