import React, { useState } from 'react';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import  posts  from './BlogsData/BlogsData';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';


const BlogPage = () => {


  const [selectedPost, setSelectedPost] = useState(null);

  const selectPost = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="container mx-auto p-4 mt-[5.1rem]">
      <div>
      <Breadcrumb pageName='Blogs' />
      </div>
        <h1 className="text-3xl font-bold text-center text-teal-600 mt-5 mb-[3.3rem] p-5">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BlogList posts={posts} selectPost={selectPost} />
        <BlogPost post={selectedPost} />
      </div>
    </div>
  );
};

export default BlogPage;
