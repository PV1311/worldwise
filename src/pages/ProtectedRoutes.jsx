import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // We should not call navigate effect from top level code. It is an effect so we useEffect() for that:
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null; // watch lec 240. Adding Fake Authentication: Protecting a Route if not understood. Now, without this conditional redering,
  //                                           if we just returned children, then once we are in /app/cities right after login, then if we reload the page, we still get
  //                                           white screen and we see in errors that we are sill trying to read something out of the avatar in the <User/> component
  //                                          which means that the <User/> component is still trying to be rendered. So we now try to understand why this happens. So our
  //                                           effect here is only executed after the component has already been rendered. So our component will actually initially
  //                                           render the children(in case we had only written return children) which does ofcourse include the user, so then everything
  //                                           that the user is trying to read from the user object does not exist. So that's why we get this error. So right after that
  //                                           is when the navigation happens. But in that split second, we are still rendering the <User/> component. So again this
  //                                           effect is executed, after the render has already happened. So here we now return conditionally which fixes this. So in
  //                                           case we are not authenticated, null will be rendered in case of <AppLayout/>(in <Route/> with path="app")
}

export default ProtectedRoutes;
