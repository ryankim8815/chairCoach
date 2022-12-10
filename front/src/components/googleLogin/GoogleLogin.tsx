import { useEffect } from "react";
import * as Api from "../../api/api";
const GoogleLogin = () => {
  const getGoogleToken = async () => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    if (code === null) return;
    const decoded = decodeURIComponent(code);
    console.log("decoded", decoded);
    console.log("googlecode", code);
    console.log("req", {
      code: code,
    });
    const res = await Api.post("google", {
      code: code,
    });
    console.log("res", res);
  };
  useEffect(() => {
    getGoogleToken();
  }, []);

  return <div>googleLogin</div>;
};

export default GoogleLogin;
