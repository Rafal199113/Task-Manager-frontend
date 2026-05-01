import { Outlet } from "react-router-dom";

function LoginLayout() {
  return (
    <div className="login-layout">
      <div className="login-container">
        <Outlet />
      </div>
    </div>
  );
}

export default LoginLayout;