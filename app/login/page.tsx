"use client";

import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';

const supabaseClient = createClient();

export default function LoginPage() {
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