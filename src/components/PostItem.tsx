import React from 'react';
import { Post } from './Wall';

function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return date.toLocaleDateString();
}

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="flex gap-3 items-start border-b last:border-b-0 border-gray-200 py-4 px-1 bg-white hover:bg-blue-50/30 transition">
      <img
        src={post.avatar_url || "https://api.dicebear.com/7.x/person/svg?seed=anon"}
        alt="Avatar"
        className="w-9 h-9 rounded object-cover border"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900 text-base truncate">{post.user || 'Anonymous'}</span>
          <span className="text-xs text-gray-500 ml-auto whitespace-nowrap">{timeAgo(post.created_at)}</span>
        </div>
        <div className="text-gray-800 whitespace-pre-line break-words text-left">{post.content}</div>
        {post.image && (
          <img
            src={post.image}
            alt="Attached"
            className="mt-2 rounded-lg max-h-64 border object-contain block text-left"
            style={{ marginLeft: 0 }}
          />
        )}
      </div>
    </div>
  );
}
