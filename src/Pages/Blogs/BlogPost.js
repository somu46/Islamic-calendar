import React from 'react';

const BlogPost = ({ post }) => {
  if (!post) {
    return <div className='text-xl font-semibold text-center'>Select a post to read</div>;
  }

  return ( 
    <div className="bg-white shadow-md rounded-lg p-4 border-2 ">
      <h1 className="text-3xl font-bold mb-3 ">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-[80%] h-48 object-cover m-5" />
      <p className="mt-4">{post.content}</p>
    </div>
  );
};

export default BlogPost;
