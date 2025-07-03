"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function PostForm({ onPost }: { onPost?: (content: string, imageUrl?: string, user?: string, avatar_url?: string) => Promise<void> }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    let imageUrl: string | undefined = undefined;
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { data, error } = await supabase.storage.from('post-images').upload(fileName, imageFile);
      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from('post-images').getPublicUrl(data.path);
        imageUrl = publicUrlData?.publicUrl;
      }
    }
    if (onPost) {
      await onPost(content, imageUrl);
    }
    setContent('');
    setImageFile(null);
    setImagePreview(null);
    setLoading(false);
  }

  return (
    <form className="flex flex-col gap-2 w-full mb-6 border rounded-lg shadow bg-white p-4" onSubmit={handleSubmit}>

      <textarea
        className="border rounded p-2 text-black"
        placeholder="What's on your mind?"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
        maxLength={280}
        required
      />
      <div className="flex items-center gap-2 mt-2">
        <label className="bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 transition font-medium">
          Choose Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0] || null;
              setImageFile(file);
              setImagePreview(file ? URL.createObjectURL(file) : null);
            }}
            disabled={loading}
          />
        </label>
        {imageFile && (
          <span className="text-xs text-gray-600 truncate max-w-[120px]">{imageFile.name}</span>
        )}
      </div>
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="mt-2 max-h-48 rounded border object-contain" />
      )}
      <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
        <span>{280 - content.length} characters remaining</span>
      </div>
      <button
        className="bg-[#1877f2] hover:bg-[#166fe0] text-white rounded px-4 py-2 w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
        type="submit"
        disabled={loading || !content.trim()}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
}
