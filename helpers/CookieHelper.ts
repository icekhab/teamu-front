class CookieHelper {
  static setCookie(name: string, value: string, exDays?: number) {
    let expires = '';

    if (exDays) {
      const d = new Date();
      d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));

      expires = `expires=${d.toUTCString()}`;
    }

    const domain = window.location.host.startsWith('localhost')
      ? ''
      : `domain=.${window.location.host.replace('www.', '')};`;

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    document.cookie = `${name}=${value};${domain}${expires};path=/`;
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

  static removeCookie(cname: string) {
    const domain = window.location.host.startsWith('localhost')
      ? ''
      : `domain=.${window.location.host.replace('www.', '')};`;

    document.cookie = `${cname}=;${domain}expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
}

export default CookieHelper;
