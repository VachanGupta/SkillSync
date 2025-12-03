import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Logo/Title */}
        <div className="mb-12">
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            SkillSync
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            A Collaborative Learning & Mentorship Platform
          </p>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Connect with mentors, set learning goals, and track your progress on your journey to mastery.
            SkillSync helps you find the right guidance and stay on track with your learning objectives.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg mb-2">Set Goals</h3>
              <p className="text-gray-600 text-sm">Create, edit, and track your learning goals with ease.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-semibold text-lg mb-2">Find Mentors</h3>
              <p className="text-gray-600 text-sm">Discover experienced mentors to guide your learning journey.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-gray-600 text-sm">Monitor your progress and maintain your learning workflow.</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-indigo-600 hover:bg-indigo-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

