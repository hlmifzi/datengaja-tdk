import React from "react";
import { useQuery } from 'react-query'
import env from "src/library/utils/env";
import { loginUser, loginUserWithToken, logoutUser } from "client/AuthClient";
import { unSubcribeFirebase, initializeFirebase, initializeFirebaseCulture } from "../utils/FirebaseUtils";
import AmplitudeUtils from 'src/library/utils/AmplitudeUtils'
import { amplitudeLoginCultureOrPerf, amplitudeLogOutCultureOrPerf, setMetaLinkTag } from "src/library/utils/HelperUtils";
import { getLocales } from "client/LocaleClient";
import LoadingSplashScreen from "../components/shared/LoadingSplashScreen";
import { getENV } from "src/library/utils/HelperUtils";

//CREATE CONTEXT
const AuthContext = React.createContext();

// GET QUERY
const query = new URLSearchParams(location.search);

const arrayHSL = [
  [100, 98],
  [100, 94],
  [98, 88],
  [98, 72],
  [93, 60],
  [80, 45],
  [88, 34],
  [96, 20],
  [100, 8],
];

const setThemeColor = (mainColor) => {
  mainColor = mainColor ? mainColor : 260
  let root = document.documentElement;
  arrayHSL.forEach((sl, index) => {
    root.style.setProperty(`--base-${index + 1}00`, `hsl(${mainColor}, ${sl[0]}%, ${sl[1]}%)`);
  })
  root.style.setProperty('--base-3008', `hsla(${mainColor}, 98%, 88%, 0.08)`);
  root.style.setProperty('--base-60016', `hsla(${mainColor}, 98%, 88%, 0.16)`);
  root.style.setProperty('--base-60024', `hsla(${mainColor}, 98%, 88%, 0.24)`);
}

const configureSite = ({ data }) => {
  const currentApp = data?.organization?.currentApp
  const assets = currentApp === "culture" ? data?.config?.cultureAssets : data?.config?.assets
  // 0. validate site
  if (data?.organization?.redirect && location.host !== data?.organization?.redirect && process.env.NODE_ENV === "production") {
    window.location.replace(`${location.protocol}//${data?.organization?.redirect}`);
  }
  const appName = currentApp === "culture" ? data.organization.cultureAppName : data.organization.appName;
  // 1. set window name
  window.name = currentApp;
  // 2. set meta tag
  const currentLogo = currentApp === "culture" ? data?.organization?.cultureLogoUrl : data?.organization?.logoUrl
  if (data?.config) setMetaLinkTag(currentLogo, assets, appName)
  // 3. set previous url
  localStorage.setItem("prevUrlRedirect", location.href);
  // 4. set logo url
  localStorage.setItem("logoUrl", data.organization.logoUrl);
  // 5. set title
  document.title = appName;
  // 6. remove previous locale
  localStorage.removeItem("locales");
  // 7. initialize amplitude
  AmplitudeUtils.initialieze()
  // 8. set theme color
  setThemeColor(assets?.mainColor);
  // 9. get locale
  getLocales(data?.organization?.identifier)
  // 10. ask notification
  Notification.requestPermission()
  // 11. set notification
  if (data?.user) {
    if (currentApp === "culture") {
      initializeFirebaseCulture();
    } else {
      initializeFirebase();
    }
  }

  return false
}

//PROVIDER
function AuthProvider(props) {
  let { data, isSuccess, isError, isLoading, refetch } = useQuery('v1/auth', {
    onSuccess: configureSite,
    suspense: false,
    useErrorBoundary: false,
    refetchOnMount: false,
    retry: false
  });

  if (isSuccess) {
    isLoading = configureSite(data);
  }

  if (isError) {
    isLoading = setThemeColor();
  }

  if (data) {
    data = data.data;
  }

  if (window.Cypress) {
    let { data: customData } = useQuery('v1/custom_auth', {
      useErrorBoundary: false,
    });
    if (customData) {
      data = customData.data;
    }
  }

  let { data: managers } = useQuery(`v1/users/${data?.user?.id}/parents`, {
    suspense: true,
    enabled: data?.user?.role,
    refetchOnMount: false
  });

  data = {
    user: data?.user,
    organization: data?.organization,
    config: data?.config,
    manager: data?.user?.role ? managers?.data[0]?.user : [],
    appType: data?.organization?.currentApp,
    host: data?.organization?.performanceHost,
    cultureHost: data?.organization?.cultureHost
  };

  const loginWithToken = async (form, organization) => {
    const { data, error } = await loginUserWithToken(form, organization);
    if (data) {
      let provisionToken = data.provisionToken;
      let userData = {
        email: data.user.email,
        organizationName: data.organization.name
      };

      AmplitudeUtils.initAnalytic(data.user.email, data.organization.name, data.user.id, data.organization.id, data.user.role, data.user.cultureRole)
      amplitudeLoginCultureOrPerf(data.user.role, data.user.cultureRole)

      window.localStorage.setItem("userData", JSON.stringify(userData));
      window.localStorage.provisionToken = provisionToken;
      let prevUrl = localStorage.getItem("prevUrlRedirect");
      localStorage.removeItem("prevUrlRedirect");
      location.href = prevUrl ? prevUrl : "/";

    } else {
      return { error }
    }
  }

  const login = async (form) => {
    const { data, error } = await loginUser(form);
    if (data) {
      if (data.token && getENV("AUTHORIZATION_METHOD") === "bearer") {
        localStorage.setItem("bearer", data.token);

      } else {
        let userData = {
          email: data.user.email,
          organizationName: data.organization.name
        }

        window.localStorage.setItem("userData", JSON.stringify(userData));
        let prevUrl = localStorage.getItem("prevUrlRedirect");
        localStorage.removeItem("prevUrlRedirect");
        location.href = prevUrl ? prevUrl : "/";
      }
      location.href = "/"
    } else {
      return { error };
    }
  };

  const logout = async () => {
    let { userRole, userCultureRole } = JSON.parse(localStorage.amplitudeInfo || "{}")

    try {
      if (Notification.permission !== "denied") await unSubcribeFirebase();
    } catch (e) {
      console.log(e.messsage)
    }

    let deviceId = localStorage.deviceId;
    let provisionToken = localStorage.provisionToken;
    localStorage.clear();
    localStorage.deviceId = deviceId;
    localStorage.provisionToken = provisionToken;
    amplitudeLogOutCultureOrPerf(userRole, userCultureRole)
    await logoutSite()
  };

  const logoutSite = async () => {
    const { data } = await logoutUser()
    if (data?.logoutUrl) {
      window.location = data.logoutUrl;
    } else {
      window.location = "/";
    }
  }

  if (isLoading) {
    return <LoadingSplashScreen />
  }

  return <AuthContext.Provider value={{ data, login, logout, loginWithToken, refetch }} {...props} />;
}

//MUTATION
function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };