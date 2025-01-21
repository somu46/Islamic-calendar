import React from 'react';

const BlogPost = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl font-semibold text-center text-gray-500">
        Select a blog to read
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full min-h-full">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-teal-600 mb-4">{post.title}</h1>
      
      {/* Blog Image */}
      <div className="w-full flex justify-center mb-4">
        <img 
          src={post.image} 
          alt={post.title} 
          className="rounded-lg object-cover max-h-64 w-full sm:w-[80%] shadow-md"
        />
      </div>

      {/* Blog Content */}
      <p className="text-gray-700 leading-relaxed">
        {post.content}
      </p>
    </div>
  );
};

export default BlogPost;
