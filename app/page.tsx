"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to "/sign-in"
    router.replace("/sign-in");
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Page;
