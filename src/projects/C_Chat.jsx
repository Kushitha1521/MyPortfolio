import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'

const C_Chat = () => {

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-sm text-blue-300 hover:underline mb-4 inline-block">← Back</Link>
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-6 shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-3">{projects[5].name}</h1>
          <p className="text-gray-300 mb-4">{projects[5].description}</p>
          <div className="overflow-hidden rounded-lg mb-4">
            <img src={projects[5].image} alt={`${projects[5].name} screenshot`} className="w-full object-cover rounded-lg" />
          </div>
          <h3 className="text-blue-300 font-semibold mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {projects[5].technologies.map((t, i) => (
              <span key={i} className="bg-blue-900/70 text-blue-300 px-2 py-1 rounded-full text-xs">{t}</span>
            ))}
          </div>
          <p className="text-sm text-gray-400">Category: <span className="text-blue-300">{projects[5].category}</span></p>
        </div>
      </div>
    </div>
  )
}

export default C_Chat
