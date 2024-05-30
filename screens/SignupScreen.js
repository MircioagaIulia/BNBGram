import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";
import BackgroundImage from "../components/ui/BackgroundImage";
function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return (
      <BackgroundImage>
        <LoadingOverlay message="Creating user..." />
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage>
      <AuthContent onAuthenticate={signupHandler} />
    </BackgroundImage>
  );
}

export default SignupScreen;
