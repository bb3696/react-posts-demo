const BASE = 'https://dummyjson.com'

export async function fetchPosts({ limit = 10, page = 1}){
    const skip = (page - 1) * limit

    const res = await fetch(`${BASE}/posts?limit=${limit}&skip=${skip}`)

    if(!res.ok) throw new Error('Failed to fetch posts')

    return res.json()
}


export async function searchPosts({ q, limit = 10, page = 1}){

    const skip = (page - 1) * limit

    const res = await fetch(`${BASE}/posts/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`)

    if (!res.ok) throw new Error('Failed to search posts')

    return res.json()

}


export async function fetchPost(postId){

    const res = await fetch(`${BASE}/posts/${postId}`)

    if(!res.ok) throw new Error('Failed to fetch post')
    
        return res.json()

}