// BlogPage.jsx
import React, { useState, useEffect } from 'react';
import BlogList from './BlogList';
import BlogPost from './BlogPost';
import posts from './BlogsData/BlogsData';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import Modal from '../../Components/Modal/Modal';
// import './Blog.css'

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const selectPost = (post) => {
    setSelectedPost(post);
    if (isMobile) setModalOpen(true);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pt-24 sm:px-6 lg:px-8  my-container">
        <Breadcrumb pageName="Blogs" className="mb-6" />
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Insights & Updates
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Discover the latest industry news, expert tips, and creative inspiration
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Blog List */}
        <div className="lg:col-span-5 xl:col-span-4">
          <BlogList posts={posts} selectPost={selectPost} />
        </div>

        {/* Blog Post - Desktop */}
        {!isMobile && (
          <div className="lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pb-8">
            <div className="ml-8 border-l-2 border-gray-100 pl-8">
              {selectedPost ? (
                <BlogPost post={selectedPost} />
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl bg-gray-50 p-8 text-center">
                  <p className="text-xl font-medium text-gray-500">
                    Select a post to view details
                    <span className="mt-2 block text-sm">← Choose from the list</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Modal */}
      {isMobile && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          className="rounded-t-2xl sm:rounded-2xl"
        >
          <div className="max-h-[90vh] overflow-y-auto p-4">
            <BlogPost post={selectedPost} />
            <button
              onClick={() => setModalOpen(false)}
              className="sticky bottom-4 mt-4 w-full rounded-xl bg-teal-600 px-6 py-3 font-medium text-white shadow-lg hover:bg-teal-700"
            >
              Close Article
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogPage;