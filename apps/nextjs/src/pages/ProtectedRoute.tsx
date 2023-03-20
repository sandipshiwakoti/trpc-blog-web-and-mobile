import React, { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const protectedPaths = useMemo(() => ["/posts"], []);

  const verifyToken = useCallback(async () => {
    if (
      protectedPaths.includes(router.pathname) &&
      !localStorage.getItem("@token")
    ) {
      await router.push("/");
    }
  }, [router, protectedPaths]);

  useEffect(() => {
    void verifyToken();
  }, [verifyToken]);

  return <>{children}</>;
};

export default ProtectedRoute;
