//

const user_id = Cookies.get('user_id');

if (user_id !== undefined) {
    const nav_item_sign_in_out = document.querySelector('#nav-item-sign-in-out');

    nav_item_sign_in_out.setAttribute('href', '/sign-out');
    nav_item_sign_in_out.textContent = 'Salir';

    window.user_id = user_id;
}
