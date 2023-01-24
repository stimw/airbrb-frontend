const tokenHandler = {
  getToken: () => {
    return {
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token"),
    };
  },
  setToken: (user: string, token: string) => {
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
  },
  removeToken: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};

export default tokenHandler;
