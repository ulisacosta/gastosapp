function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
  
  export function isTokenValid() {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    const { exp } = parseJwt(token);
    return exp * 1000 > Date.now();
  }