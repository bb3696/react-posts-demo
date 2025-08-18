const BASE = 'https://dummyjson.com'

export async function fetchCommentsByPost(postId){

        const res = await fetch(`${BASE}/posts/${postId}/comments`)
        if(!res.ok) throw new Error('Failed to fetch comments')
        
        return res.json()


}