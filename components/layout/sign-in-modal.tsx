import Modal from "@/components/shared/modal";
import { useState, Dispatch, SetStateAction } from "react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';
// import useAuthStore from '@/utils/store/auth-store';
import { useRouter } from 'next/navigation';

const supabaseClient = createClient();

const SignInModal = ({ showSignInModal, setShowSignInModal }: { showSignInModal: boolean; setShowSignInModal: Dispatch<SetStateAction<boolean>>; }) => {
  // const { setUser } = useAuthStore();
  const router = useRouter();

  useState(() => {

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // setUser(session.user);
          router.push('/chat');
          setShowSignInModal(false);
        }
      }
    );
    return () => authListener.subscription.unsubscribe();
  });

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="p-4">
        <Auth
          supabaseClient={supabaseClient}
          providers={['google']}
          socialLayout="vertical"
          appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: 'rgb(59 130 246)' } } } }}
        />
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = () => (
    <SignInModal showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} />
  );

  return { setShowSignInModal, SignInModal: SignInModalCallback };
}

export default SignInModal;