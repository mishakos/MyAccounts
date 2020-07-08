import axios from "axios";
import commonService from "./commonService";

const authService = {
  login(loginForm) {
    return commonService.post(`/api/authorize/login`, loginForm);
  },
  registrate(registrateForm) {
    return commonService.post(`/api/authorize/registrate`, registrateForm);
  }
}

export default authService;
