"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Phone } from 'lucide-react';
import { useSignInModal } from "@/components/layout/sign-in-modal";
import UserDropdown from "@/components/layout/user-dropdown";
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function NavBar() {
  const scrolled = useScroll(50);
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (data && data.user) {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Simple.health logo"
              width="40"
              height="40"
              className="mr-1 rounded-sm"
            ></Image>
            <p>Simple.health</p>
          </Link>
          <div className="flex gap-2">
            <Link href="https://bit.ly/simpleinsure_healthinsurance" target="_blank">
              <button
                className="flex items-center rounded-lg border p-1.5 px-4 text-sm text-black transition-all hover:bg-blue-500 hover:text-white"
              >
                <Phone size={16} className="mr-2" aria-hidden="true" />
                Schedule a call
              </button>
            </Link>
            {user ? (
              <UserDropdown user={user} signOut={signOut} />
            ) : (
              <button
                className="flex items-center rounded-lg border p-1.5 px-4 text-sm transition-all bg-blue-500 text-white"
                onClick={() => setShowSignInModal(true)}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
