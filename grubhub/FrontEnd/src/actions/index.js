const LOGIN_USER = "LOGIN_USER";
const SIGN_UP_USER = "SIGN_UP_USER";

export function loginuser(payload) {
  return { type: LOGIN_USER, payload };
}

export function signupuser(payload) {
  return { type: SIGN_UP_USER, payload };
}