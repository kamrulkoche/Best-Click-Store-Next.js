import Link from "next/link";
import React from "react";

const BlogsPage =({posts}) =>{
    // console.log(posts);
    return (
        <div>
            {
           posts.map(post=>(
            <h2 key={post.id} >
            <Link href={`/blogs/${post.id}`}>{post.title}</Link>
            </h2>
           ))
}

        </div>
    );
};

export default BlogsPage;

export async function getServerSideProps(){

    const res = await fetch (`https://jsonplaceholder.typicode.com/posts?_limit=10`)
    const posts =await res.json()

    return {props: {posts}}
}