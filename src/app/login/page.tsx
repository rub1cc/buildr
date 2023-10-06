"use client";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";
import { useUser } from "@/lib/use-user";
import { ArrowRightIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const supabase = createClientComponentClient();
  const { user, isLoading: isLoadingAuth } = useUser();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      router.replace("/");
    }
  }, [user]);

  const login = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        },
      });
      if (error) {
        throw error;
      }
      setSuccess(true);
    } catch (error) {
      if (error?.msg?.includes("Signups not allowed for this instance")) {
        setError("Could not authenticate user.");
        return;
      }
      setError(
        "We seem to be experiencing some issues right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {(loading || isLoadingAuth) && <LoadingOverlay />}
      {success ? (
        <div className="text-center w-full max-w-[350px]">
          <EnvelopeOpenIcon className="w-10 h-10 mx-auto mb-8" />
          <p className="text-2xl">Check your email</p>
          <p className="text-gray-500 mt-4">
            We sent an email to you at{" "}
            <span className="text-black font-semibold">
              {"raz.muhammad14@gmail.com"}
            </span>
            . It has a magic link that will sign you in.
          </p>
          <Button
            className="mt-8"
            variant="link"
            onClick={() => setSuccess(false)}
          >
            Sign in to a different account
            <ArrowRightIcon className="w-3 h-3 ml-2" />
          </Button>
        </div>
      ) : (
        <form
          className="w-full max-w-[300px]"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="your@email.com"
              onChange={(e) => {
                setError("");
                setEmail(e.currentTarget.value);
              }}
              className={cn([error && "border-red-500"])}
            />
            <small className="text-red-500">{error}</small>
          </div>
          <Button type="submit" className="w-full" disabled={!!error}>
            Login
          </Button>
        </form>
      )}
    </div>
  );
}
