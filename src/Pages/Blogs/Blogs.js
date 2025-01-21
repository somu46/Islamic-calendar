import React, { useState } from 'react';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import posts from './BlogsData/BlogsData';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const selectPost = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="container mx-auto px-6 py-8 mt-[5.1rem]">
      {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center text-gradient bg-gradient-to-r from-teal-500 to-cyan-600 mt-5 mb-8 p-5">
        Explore Our Blogs
      </h1>

      {/* Breadcrumb */}
      <div>
        <Breadcrumb pageName="Blogs" />
      </div>


      {/* Blog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Blog List */}
        <div className=" grid grid-cols-1 gap-6">
          <BlogList posts={posts} selectPost={selectPost} />
        </div>

        {/* Blog Post Details */}
        <div className="lg:col-span-3 bg-white  rounded-lg p-6 sticky top-20 self-start h-fit max-h-screen overflow-y-auto">
          {selectedPost ? (
            
            <BlogPost post={selectedPost} />
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium">Select a blog to view details</p>
            </div>
          )}
        </div>
      </div>

    
    </div>
  );
};

export default BlogPage;
