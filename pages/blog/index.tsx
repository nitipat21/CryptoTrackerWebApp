import Head from "next/head";
import FullPost from "../../components/FullPost";
import { PostCard } from "../../components/PostCard";

const Blog = () => {
    return (
        <>
            <Head>
                <title>CryptoTracker | Blog</title>
            </Head>
            <div className="py-16 grid gap-16 relative">
                <div className="text-[2rem] text-center"><h1>Blog Posts</h1></div>
                <div className="grid gap-8 justify-center items-center">
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                </div>
                <div>
                    <FullPost/>
                </div>
            </div>
        </>
    );
}

export default Blog;