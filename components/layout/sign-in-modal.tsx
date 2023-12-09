import Modal from "@/components/shared/modal";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from "next/navigation";

const supabaseClient = createClient();

const SignInModal = ({
  showSignInModal,
  setShowSignInModal
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {

  const router = useRouter();

  useEffect(() => {

      const { data: authListener } = supabaseClient.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_IN') {
            setShowSignInModal(false);
          }
        }
      );

    return () => {
      authListener.subscription.unsubscribe();
      console.log("what is happening?");
    };
  }, [setShowSignInModal, router]);

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
  };

  const SignInModalCallback = () => (
    <SignInModal
      showSignInModal={showSignInModal}
      setShowSignInModal={setShowSignInModal}
    />
  );

  return { setShowSignInModal, SignInModal: SignInModalCallback };
}
