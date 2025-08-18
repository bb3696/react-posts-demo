import PostItem from './PostItem'

export default function PostList({ posts }){
    
    if(!posts || posts.length === 0){
        return <p>Post not found.</p>
    }

    return(
        <div>
            {posts.map(post => 
                <PostItem key={post.id} post={post} />
            )}
        </div>
    )

}