class commonApi {
  static getToken() {
    let tokenStr = localStorage.getItem('jwtToken');
    if (tokenStr) {
      let token = JSON.parse(tokenStr);
      return token.token;
    }
    return null;
  }
  static postUnAuth(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    }).then(result => {
      if (result.hasError) {
        throw (result.errorMessage);
      }
      return result.data;
    });
  }

  static post(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    }).then(result => {
      if (result.hasError) {
        throw (result.errorMessage);
      }
      return result.data;
    });
  }
  static put(url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      },
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    }).then(result => {
      if (result.hasError) {
        throw (result.errorMessage);
      }
      return result.data;
    });
  }

  static delete(url, data) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      },
      body: JSON.stringify(data)
    }).then(result => {
      if (result.hasError) {
        throw (result.errorMessage);
      }
      return result.data;
    });
  }
  
  static get(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      }
    }).then(response => {
      return response.json();
    }).then(result => {
      if (result.hasError) {
        throw (result.errorMessage);
      }
      return result.data;
    });
  }
}

export default commonApi;