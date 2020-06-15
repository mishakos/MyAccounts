import commonApi from './commonApi';

class userApi {
    static login(loginForm) {
        return commonApi.postUnAuth('/api/Authorize/login', loginForm);
    }

    static registrate(data) {
        return commonApi.postUnAuth('/api/Authorize/registrate', data);
    }

    static meByToken() {
      return commonApi.get('api/Authorize/userInfo');
    }
}

export default userApi;