import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to SkillSync</h1>
          <p className="text-lg text-gray-600">Manage your learning goals and connect with mentors</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/goals"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Goals</h3>
                <p className="text-gray-600">Create and track your learning objectives</p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </Link>

          <Link
            to="/mentors"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-indigo-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Mentors</h3>
                <p className="text-gray-600">Discover mentors to guide your journey</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Secure Authentication</h4>
              <p className="text-sm text-gray-600">JWT-based secure login and signup</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Goal Management</h4>
              <p className="text-sm text-gray-600">Create, edit, and delete learning goals</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Mentor Discovery</h4>
              <p className="text-sm text-gray-600">Find and connect with experienced mentors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

