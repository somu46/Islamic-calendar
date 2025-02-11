import React, { useState, useEffect } from 'react';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import posts from './BlogsData/BlogsData';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import Modal from '../../Components/Modal/Modal';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const selectPost = (post) => {
    setSelectedPost(post);
    if (isMobile) {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="container mx-auto px-6 py-10 mt-[5.1rem]">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mt-5 mb-10">
        Explore Our Blogs
      </h1>
      
      <Breadcrumb pageName="Blogs" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <BlogList posts={posts} selectPost={selectPost} />
        </div>
        
        {!isMobile && (
          <div className="lg:col-span-3 bg-white shadow-xl rounded-xl p-8 sticky top-24 h-fit min-h-screen border border-gray-200">
            {selectedPost ? (
              <BlogPost post={selectedPost} />
            ) : (
              <div className="text-center text-gray-500 text-lg font-medium py-10">
                Select a blog to view details
              </div>
            )}
          </div>
        )}
      </div>

      {isMobile && selectedPost && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <div className="max-h-[80vh] overflow-y-auto p-6 bg-white rounded-xl shadow-lg">
            <BlogPost post={selectedPost} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogPage;
