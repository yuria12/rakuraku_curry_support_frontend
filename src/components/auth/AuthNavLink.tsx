"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mockAuthSession } from "@/mocks/auth";

export const authStatusKey = "rakuraku-auth-status";
export const authChangedEventName = "rakuraku-auth-changed";

function getLoginState() {
  if (typeof window === "undefined") {
    return mockAuthSession.isLoggedIn;
  }

  return window.localStorage.getItem(authStatusKey) !== "logged-out";
}

export function AuthNavLink() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    mockAuthSession.isLoggedIn,
  );

  useEffect(() => {
    function syncLoginState() {
      setIsLoggedIn(getLoginState());
    }

    syncLoginState();
    window.addEventListener("storage", syncLoginState);
    window.addEventListener(authChangedEventName, syncLoginState);

    return () => {
      window.removeEventListener("storage", syncLoginState);
      window.removeEventListener(authChangedEventName, syncLoginState);
    };
  }, []);

  return (
    <Link className="app-nav__link" href={isLoggedIn ? "/logout" : "/login"}>
      {isLoggedIn ? "ログアウト" : "ログイン"}
    </Link>
  );
}
