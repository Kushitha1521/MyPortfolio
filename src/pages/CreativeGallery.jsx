// src/pages/CreativeGallery.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import creativeWorks from "../data/creativeWorks";

const categories = [
  "All",
  "Facebook Posts",
  "Logos",
  "Tickets",
  "Certificates",
  "Banners",
  "Thumbnails",
];

export default function CreativeGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredWorks =
    selectedCategory === "All"
      ? creativeWorks
      : creativeWorks.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-14 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4">
          Creative Gallery
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore my creative collection including social media posts,
          logos, certificates, banners, tickets, and digital artworks.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-14">

        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition duration-300 ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-900 text-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}

      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredWorks.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="group relative overflow-hidden rounded-2xl border border-blue-500/20 shadow-xl cursor-pointer"
            onClick={() => setSelectedImage(item)}
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-300 mt-1">
                  {item.category}
                </p>
              </div>
            </div>

          </motion.div>
        ))}

      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >

          <div className="relative max-w-5xl w-full">

            {/* Close Button */}
            <button
              className="absolute -top-12 right-0 text-white text-4xl hover:text-red-400 transition"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />

            <div className="mt-5 text-center">
              <h2 className="text-2xl font-bold text-white">
                {selectedImage.title}
              </h2>

              <p className="text-gray-400 mt-2">
                {selectedImage.category}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}