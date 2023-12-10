'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';
import useAuthStore from '@/utils/store/auth-store';

const supabaseClient = createClient();

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          router.push('/chat');
        }
      }
    );
    return () => authListener.subscription.unsubscribe();
  }, [setUser, router]);

  return (
    <Auth
      supabaseClient={supabaseClient}
      providers={['google']}
      socialLayout="vertical"
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: 'rgb(59 130 246)',
            },
          },
        },
      }}
    />
  );
}
