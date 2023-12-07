import Modal from "@/components/shared/modal";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';

const supabaseClient = createClient();

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
  onSignInComplete,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
  onSignInComplete: () => void;
}) => {
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        onSignInComplete();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [onSignInComplete]);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="p-4">
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
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const onSignInComplete = () => {
    setShowSignInModal(false);
    window.location.href = '/chat';
  };

  const SignInModalCallback = () => (
    <SignInModal
      showSignInModal={showSignInModal}
      setShowSignInModal={setShowSignInModal}
      onSignInComplete={onSignInComplete}
    />
  );

  return { setShowSignInModal, SignInModal: SignInModalCallback };
}
