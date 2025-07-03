"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import PostItem from './PostItem';

export interface Post {
  id: string;
  user: string;
  avatar_url?: string | null;
  content: string;
  image?: string | null;
  created_at: string;
}

import PostForm from './PostForm';

export default function Wall() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
    const subscription = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, payload => {
        fetchPosts();
      })
      .subscribe();
    return () => { subscription.unsubscribe(); };
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data || []);
  }

  async function handlePost(content: string, imageUrl?: string) {
    const user = 'Guntur Wirayuda';
    const avatar_url = 'https://randomuser.me/api/portraits/men/32.jpg'; // Change to your preferred image
    const { error } = await supabase.from('posts').insert({ user, avatar_url, content, image: imageUrl || null });
    if (error) {
      alert('Error posting: ' + error.message);
      console.error('Supabase insert error:', error);
      return;
    }
    await fetchPosts();
  }

  return (
    <>
      <PostForm onPost={handlePost} />
      <div className="flex flex-col divide-y divide-gray-200 w-full">
        {posts.map(post => <PostItem key={post.id} post={post} />)}
      </div>
    </>
  );
}
