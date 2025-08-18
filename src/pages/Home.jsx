import { useEffect, useState } from "react";
import { fetchPosts } from '../api/posts';
import PostList from "../components/PostList";
import SearchBar from "../components/SearchBar";
import { searchPosts } from "../api/posts";
import Pagination from "../components/Pagination";

export default function Home(){

    const [posts, setPosts] = useState([])
    const [q, setQ] = useState('')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

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
                    setPosts(data.posts)
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

    }, [q, page])


    const handleSearchSubmit = (text) => {
        setPage(1)
        setQ(text)
    }


    return(
        <div>
            <SearchBar value={q} onChange={setQ} onSubmit={handleSearchSubmit} />
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

