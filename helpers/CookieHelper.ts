class CookieHelper {
  static setCookie(name: string, value: string, exDays?: number) {
    let expires = '';

    if (exDays) {
      const d = new Date();
      d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));

      expires = `expires=${d.toUTCString()}`;
    }

    const domain = this.getDomain() !== 'localhost' ? `domain=.${this.getDomain()};` : '';

    document.cookie = `${name}=${value};${expires};${domain}path=/`;
  }

  static getCookie(cname: string) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];

      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  }

  private static getDomain() {
    if (document.domain.length) {
      const parts = document.domain.replace(/^(www\.)/, '').split('.');

      // is there a subdomain?
      while (parts.length > 2) {
        // removing it from our array
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const subdomain = parts.shift();
      }

      // getting the remaining 2 elements
      const domain = parts.join('.');

      return domain.replace(/(^\.*)|(\.*$)/g, '');
    }

    return '';
  }
}

export default CookieHelper;
