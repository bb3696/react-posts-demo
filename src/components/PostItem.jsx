import { Link } from 'react-router-dom'

    // const fakePost = {
    //     id: 1,
    //     title: "Test Post",
    //     body: "This is a fake post body.",
    //     userId: 99
    // }

export default function PostItem({ post }){

    return(
        <>
        <div>
            <h3>Title: {post.title}</h3>
            <p>{post.body}</p>
            <p>Author ID: {post.id}</p>
            <Link to={`/posts/${post.userId}`}>View Details</Link>
        </div>
        </>

    )
}