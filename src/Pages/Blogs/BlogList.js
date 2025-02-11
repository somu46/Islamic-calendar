// BlogList.jsx
import React from 'react';

const BlogList = ({ posts, selectPost }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
      {posts.map((post) => (
        <article
          key={post.id}
          onClick={() => selectPost(post)}
          className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
        >
          <div className="relative aspect-video overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
          </div>
          
          <div className="p-6">
            <div className="mb-2 flex items-center gap-3 text-sm text-white">
              <span className="rounded-full bg-teal-500/90 px-3 py-1 backdrop-blur-sm">
                {post.category}
              </span>
              <time className="text-gray-600">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 transition-colors group-hover:text-teal-600">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-gray-600">{post.excerpt}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogList;