import React from 'react';

const BlogList = ({ posts, selectPost }) => {


  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.excerpt}</p>
            <button onClick={ ()=> {selectPost(post); window.scrollTo(0, 0)}} className="mt-4 text-blue-500 hover:underline">View Post</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
