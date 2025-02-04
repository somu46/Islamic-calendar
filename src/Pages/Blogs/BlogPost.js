import React from 'react';
import { format } from 'date-fns';

const BlogPost = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl font-semibold text-center text-gray-500">
        Select a blog to read
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 w-full min-h-full">
      {/* Blog Image */}
      <div className="w-full flex justify-center mb-6">
        <img 
          src={post.image} 
          alt={post.title} 
          className="rounded-lg object-cover max-h-64 w-full sm:w-[90%] shadow-md md:max-h-96"
        />
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-500">
        <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded">
          {post.category}
        </span>
        <time className="self-center">
          {format(new Date(post.date), 'MMMM dd, yyyy')}
        </time>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Blog Title */}
      <h1 className="text-3xl text-center font-bold text-teal-600 mb-6">
        {post.title}
      </h1>

      {/* Blog Content */}
      <div 
        className="prose max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      >
        {/* Content is inserted via dangerouslySetInnerHTML */}
      </div>

      {/* Hidden meta description for SEO */}
      <span className="hidden" aria-hidden="true">
        {post.metaDescription}
      </span>
    </div>
  );
};

export default BlogPost;