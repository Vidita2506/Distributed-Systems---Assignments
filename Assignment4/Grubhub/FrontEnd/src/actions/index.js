const LOGIN_USER = "LOGIN_USER";

export function loginuser(payload) {
  return { type: LOGIN_USER, payload };
}