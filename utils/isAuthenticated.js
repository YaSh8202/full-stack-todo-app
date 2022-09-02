import { decode } from "jsonwebtoken";

export default function isAuthenticated() {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  try {
    // decode(token);
    const { exp } = decode(token);
    if (Date.now() >= exp * 1000) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}
