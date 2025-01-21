import React, { useState, useEffect } from 'react';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import posts from './BlogsData/BlogsData';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import Modal from '../../Components/Modal/Modal'; // Assuming you have a reusable Modal component

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
    // Check if the screen size is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
        <div className="grid grid-cols-1 gap-6">
          <BlogList posts={posts} selectPost={selectPost} />
        </div>

        {/* Blog Post Details */}
        {!isMobile && (
          <div className="lg:col-span-3 bg-white rounded-lg p-6 sticky top-20 self-start h-fit max-h-screen overflow-y-auto">
            {selectedPost ? (
              <BlogPost post={selectedPost} />
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">Select a blog to view details</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Mobile View */}
      {isMobile && selectedPost && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <div className="">
            <BlogPost post={selectedPost} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogPage;
