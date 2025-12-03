import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/axios';
import Navigation from '../components/Navigation';

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating-desc');

  const load = async () => {
    try {
      console.log('Loading mentors from:', api.defaults.baseURL + '/mentors');
      const res = await api.get('/mentors');
      setMentors(res.data);
    } catch (err) {
      console.error('Error loading mentors:', err);
      const fullUrl = err.config?.baseURL + err.config?.url;
      console.error('Failed URL:', fullUrl);
      const errorMsg =
        err.response?.data?.msg ||
        (err.response?.status === 404
          ? `API endpoint not found (${fullUrl}). Is the backend server running on http://localhost:5001?`
          : err.request
          ? `Cannot connect to server (${fullUrl}). Please ensure the backend is running.`
          : err.message || 'Failed to load mentors');
      alert(errorMsg);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredAndSortedMentors = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let result = mentors;

    if (term) {
      result = result.filter((m) => {
        const inName = m.name?.toLowerCase().includes(term);
        const inBio = m.bio?.toLowerCase().includes(term);
        const inSkills = Array.isArray(m.skills)
          ? m.skills.join(' ').toLowerCase().includes(term)
          : false;
        return inName || inBio || inSkills;
      });
    }

    const sorted = [...result];
    if (sortBy === 'rating-desc') {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'experience-desc') {
      sorted.sort((a, b) => (b.experienceYears || 0) - (a.experienceYears || 0));
    } else if (sortBy === 'name-asc') {
      sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    return sorted;
  }, [mentors, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Mentors</h2>
            <p className="text-gray-600 mt-1">
              Explore mentors across different aspects of engineering.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name, skill, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="rating-desc">Sort by rating (high → low)</option>
              <option value="experience-desc">Sort by experience (high → low)</option>
              <option value="name-asc">Sort by name (A → Z)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAndSortedMentors.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
              <p className="text-lg">No mentors match your search. Try a different keyword.</p>
            </div>
          ) : (
            filteredAndSortedMentors.map((m) => (
              <div
                key={m._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{m.name}</h3>
                      {typeof m.experienceYears === 'number' && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                          {m.experienceYears} yrs experience
                        </span>
                      )}
                    </div>
                    {m.bio && <p className="text-gray-600 mb-3">{m.bio}</p>}
                    {m.skills && m.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {m.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-yellow-600">
                        {m.rating?.toFixed ? m.rating.toFixed(1) : m.rating || '—'}
                      </span>
                      <span className="text-xs text-gray-500">/ 5.0</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      Added{' '}
                      {m.createdAt
                        ? new Date(m.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
