import Swal from 'sweetalert2';

export const Alert = (title, text, icon) => {
    return Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: false,
    })
}

export const CookieName = 'litezy'
export const UserRole = [
    {
        role: 'user',
        url: '/profile'
    },
    {
        role: 'admin',
        url: '/admin'
    }
]
