class UrlHelper {
  static validate(url: string) {
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/gm;

    return regex.test(url);
  }

  static getUrlWithHttpIfNeed(url: string) {
    const regex = /^https?:\/\//gm;
    let newUrl = url;

    if (!regex.test(newUrl)) {
      newUrl = `http://${url}`;
    }

    return newUrl;
  }
}

export default UrlHelper;
