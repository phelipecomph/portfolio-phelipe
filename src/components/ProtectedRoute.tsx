import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Try to sign in anonymously if there's no session
          const { error } = await supabase.auth.signInWithoutEmail();
          if (error) {
            console.error("Error signing in anonymously:", error);
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        try {
          // Try to sign in anonymously when session is lost
          const { error } = await supabase.auth.signInWithoutEmail();
          if (error) {
            console.error("Error signing in anonymously:", error);
            navigate("/login");
          }
        } catch (error) {
          console.error("Anonymous sign-in error:", error);
          navigate("/login");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;