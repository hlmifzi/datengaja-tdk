import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { ReloadProvider } from "./ReloadContext";
import LoadingSplashScreen from "components/shared/LoadingSplashScreen";

function AppProviders({ children }) {
  return (
    <React.Suspense fallback={<LoadingSplashScreen />} >
      <AuthProvider>
        <ReloadProvider>
        <UserProvider>{children}</UserProvider>
        </ReloadProvider>
      </AuthProvider>
    </React.Suspense>
  );
}

export default AppProviders;
