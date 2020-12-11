const httpService = (() => {

  const callXhr = (method, url, body, callback) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status >= 200 && this.status < 400) {
          const items = JSON.parse(this.responseText);
          mySnackbar('SuccessAPI');
          callback(null, items);
        } else {
          mySnackbar('ErrorAPI');
          console.log(this.status, this.statusText);
          callback(this, null);
        }
      }
    };
    request.open(method, url, true);
    request.send(body);
  };

  return {
    get: (url, callback) => callXhr('GET', url, null, callback)
  };
})();