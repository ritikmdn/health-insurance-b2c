'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Chat } from '@/components/chat/chat';

export const runtime = 'edge';

export default function ChatPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login'); // Use Next.js useRouter to navigate
      }
    });
  
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  };

  return <Chat />;
}
