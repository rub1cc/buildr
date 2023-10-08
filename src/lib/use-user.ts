import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Database } from "./types/supabase";

export const useUser = () => {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res = await supabase.auth.getUser();
      if (res.error) {
        throw error;
      }
      setError(null);
      setUser(res.data.user);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated: !!user?.id,
    isLoading,
    error,
  };
};
