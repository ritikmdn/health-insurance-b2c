'use client'

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { createClient } from '@/utils/supabase/client';
import { Chat } from '@/components/chat/chat';

export const runtime = 'edge';

export default function ChatPage() {
  // const router = useRouter();
  // const supabase = createClient();

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
  //     if (event === 'SIGNED_OUT') {
  //       router.push('/login');
  //     }
  //   });
  
  //   return () => {
  //     authListener.subscription.unsubscribe();
  //   };
  // }, []);

  return <Chat />;
}
