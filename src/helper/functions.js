import auth from "../security/auth";

export const _handleSignOut = (props) => {
    auth.signout(() => {
      props.history.push("/");
    });
    localStorage.clear();

    window.location.reload();
  }