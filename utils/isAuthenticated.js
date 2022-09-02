import { decode } from "jsonwebtoken";

export default function isAuthenticated() {
  const token = localStorage.getItem("token");
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
