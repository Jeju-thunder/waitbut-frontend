export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isTokenExpired() {
  const token = getToken();
  if (!token) {
    return true;
  }
  return false;
}

export function removeToken() {
  localStorage.removeItem("token");
}

export async function login(code: string) {
  console.log("login hook");
  const response = await fetch(`https://kauth.kakao.com/oauth/token`, {
    method: "POST",
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID_TEST,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      code,
    }),
  });
  console.log("login hook response", response);
  return response.json();
}

const oauthLogin = {
  saveToken,
  getToken,
  isTokenExpired,
  removeToken,
  login,
};

export default oauthLogin;
