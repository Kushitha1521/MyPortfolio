import React from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Energy_System = () => {

  const projectIndex = 1;
  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-10 py-10">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <button
  onClick={() => navigate(-1)}
  className="inline-flex items-center gap-2 text-blue-400 hover:text-cyan-300 transition-all duration-300 mb-6 group"
>
  <span className="group-hover:-translate-x-1 transition-transform duration-300">
    ←
  </span>
  <span>Back to Portfolio</span>
</button>

        {/* TITLE MOVED TO TOP */}
        <div className="text-center mb-8">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            {projects[projectIndex].name}
          </h1>

          <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-3xl mx-auto">
            {projects[projectIndex].description}
          </p>

        </div>

        {/* Main Card */}
        <div className="bg-gray-900/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-blue-500/10">

          {/* Image Full Resolution */}
          <div className="w-full overflow-hidden">

            <img
              src={projects[projectIndex].image}
              alt={`${projects[projectIndex].name} screenshot`}
              className="w-full h-auto max-h-[700px] object-cover hover:scale-[1.02] transition-transform duration-700"
            />

          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-10">

            {/* Technologies */}
            <div className="mb-10">

              <h3 className="text-xl font-semibold text-cyan-300 mb-4">
                Technologies Used
              </h3>

              <div className="flex flex-wrap gap-3">

                {projects[projectIndex].technologies.map((t, i) => (

                  <span
                    key={i}
                    className="bg-gradient-to-r from-blue-900/70 to-cyan-900/50 border border-cyan-500/20 text-cyan-200 px-4 py-2 rounded-full text-sm hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {t}
                  </span>

                ))}

              </div>

            </div>

            {/* Details Section */}
            <div className="bg-gradient-to-br from-gray-950/80 to-blue-950/20 border border-blue-500/10 rounded-2xl p-6 shadow-inner">

              <h3 className="text-2xl font-semibold text-blue-400 mb-5">
                Project Details
              </h3>

              <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base tracking-wide">
                {projects[projectIndex].details}
              </div>

              {/* LinkedIn Link */}
                            <div><br></br></div>
              
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base tracking-wide">
                              {projects[projectIndex].LinkedInLink && (
                                <a
                                  href={projects[projectIndex].LinkedInLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                                >
                                  View on LinkedIn
                                </a>
                              )}
                            </div>
              
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base tracking-wide">
                              {projects[projectIndex].GitHubLink1 && (
                                <a
                                  href={projects[projectIndex].GitHubLink1}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                                >
                                  View on GitHub
                                </a>
                              )}
                            </div>
              
                            <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base tracking-wide">
                              {projects[projectIndex].Huggingfacelink && (
                                <a
                                  href={projects[projectIndex].Huggingfacelink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                                >
                                  View on Huggingface
                                </a>
                              )}
                            </div>

            </div>

            {/* Category */}
            <div className="mt-8 flex items-center gap-3">

              <span className="text-gray-400 text-sm uppercase tracking-wider">
                Category
              </span>

              <span className="bg-blue-600/20 border border-blue-500/20 text-blue-300 px-4 py-1 rounded-full text-sm">
                {projects[projectIndex].category}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Energy_System