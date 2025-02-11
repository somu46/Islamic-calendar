// BlogPost.jsx
import React from 'react';
import { format } from 'date-fns';

const BlogPost = ({ post }) => {
  if (!post) {
    return (
      <div className="flex h-full items-center justify-center text-xl font-semibold text-gray-400">
        Select a blog post to read
      </div>
    );
  }

  return (
    <article className="prose prose-lg mx-auto max-w-4xl px-4 py-8 md:prose-xl">
      {/* Image Section */}
      <div className="not-prose relative mb-12 overflow-hidden rounded-2xl shadow-xl">
        <img
          src={post.image}
          alt={post.title}
          className="aspect-[2/1] w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 p-6">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Meta Information */}
      <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-500 px-3 py-1 text-white">
            {post.category}
          </span>
          <time className="text-gray-500">
            {format(new Date(post.date), 'MMMM dd, yyyy')}
          </time>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-gray-600 transition-colors hover:bg-teal-100 hover:text-teal-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className="prose prose-teal max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Hidden SEO Content */}
      <meta itemProp="description" content={post.metaDescription} />
    </article>
  );
};

export default BlogPost;