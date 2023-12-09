'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';


const supabaseClient = createClient();

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          router.push('/chat');
        }
      }
    );

    // Cleanup the listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Auth
      supabaseClient={supabaseClient}
      providers={['google']}
      socialLayout="vertical"
      redirectTo='/chat'
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