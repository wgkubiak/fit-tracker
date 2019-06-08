let utils = {
  did: localStorage.getItem("daily-id"),
  i: localStorage.getItem("app-index"),
  switchMainSite: JSON.parse(localStorage.getItem("switchSite")),
  firstname: localStorage.getItem("firstname"),
  secondname: localStorage.getItem("secondname"),
  gender: localStorage.getItem("gender"),
  phone: localStorage.getItem("phone"),
  email: localStorage.getItem("email"),
  height: localStorage.getItem("height"),
  targetweight: localStorage.getItem("targetweight"),
  kcaldemand: localStorage.getItem("kcaldemand")
};

export default utils;
