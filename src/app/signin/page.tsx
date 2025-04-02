import React, { Suspense } from "react";
import SignInPage from "./SignIn";

export default function SignInWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  );
}
