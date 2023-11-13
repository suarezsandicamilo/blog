const userId = Cookies.get('user_id');

if (userId === undefined) {
  window.location = '/sign-in';
}