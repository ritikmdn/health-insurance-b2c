"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Phone } from 'lucide-react';
import UserDropdown from "@/components/layout/user-dropdown";
import useAuthStore from '@/utils/store/auth-store';
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { useEffect } from 'react';

export default function NavBar() {
  const scrolled = useScroll(50);
  const { user, signOut, checkUser } = useAuthStore();
  const { SignInModal, setShowSignInModal } = useSignInModal();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

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
                Talk to experts
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