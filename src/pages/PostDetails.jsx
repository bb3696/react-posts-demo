import React from "react";
import { useState, useEffect } from "react";
import { fetchCommentsByPost } from '../api/comments'
import { useParams, Link } from "react-router-dom";
import { fetchPost } from "../api/posts";

function PostDetails(){
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])

    // 只有postId变化时，useEffect才重新执行
    // useEffect 表示在组件「加载完成」或「postId 变化」时执行这段代码
    // load() 是我们自己定义的异步函数，用来请求数据
    // fetchPost(postId) 是你写的函数，拿文章内容
    // fetchCommentsByPost(postId) 是你写的函数，拿文章评论
    useEffect(() => {
        async function load(){
            const postData = await fetchPost(postId)
            const commentData = await fetchCommentsByPost(postId)

            setPost(postData)
            setComments(commentData.comments || [])
        }

        load()
    }, [postId])


    if(!post) return <p>Loading post...</p>


    // .map() 是数组遍历函数
    // key={comment.id} 是 React 要求加的唯一标识
    // comment.user?.username 是可选链写法（防止 user 是 null）
    // ?? 'Anonymous' 表示如果 username 是 undefined，就用匿名替代  
    return(
        <div>
            <Link to="/">← Back to Home</Link>

            <h2>{post.title}</h2>
            <p>Author: {post.userId}</p>
            <p>{post.body}</p>

            <hr />

            <h3>Comments</h3>
            {comments.length === 0 ? (
                <p>No Comments.</p>
            ) : (
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            {comment.user?.username ?? 'Anonymous'}: {comment.body} 
                        </li>
                    ))}
                </ul>
            )
        }
        </div>
    )
}

export default PostDetails