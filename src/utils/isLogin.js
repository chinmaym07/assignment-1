export const login = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userDetails");
};

export const isLogin = () => {
  let data = JSON.parse(localStorage.getItem("user"));
  if (data != null) {
    return true;
  }
  return false;
};
