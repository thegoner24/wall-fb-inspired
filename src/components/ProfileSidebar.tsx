"use client";
import React from "react";

export default function ProfileSidebar() {
  return (
    <aside className="w-full sm:w-72 h-full bg-white rounded-lg shadow p-6 flex flex-col items-center border border-gray-200">
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Profile"
        className="w-28 h-28 rounded-lg object-cover mb-4 border"
      />
      <div className="text-xl font-bold text-gray-900 mb-1">Guntur Wirayuda</div>
      <div className="text-gray-500 mb-4">wall</div>
      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded px-4 py-1 mb-6 border border-gray-300">Information</button>
      <div className="w-full text-left text-sm mb-2">
        <div className="text-gray-400">Networks</div>
        <div className="font-medium text-gray-700">Stanford Alum</div>
      </div>
      <div className="w-full text-left text-sm">
        <div className="text-gray-400">Current City</div>
        <div className="font-medium text-gray-700">Palo Alto, CA</div>
      </div>
    </aside>
  );
}
