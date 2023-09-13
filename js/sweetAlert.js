/*-------------------- Sweet Alert 2. --------------------*/

function alertas(text) {
    Swal.fire({
        text: text,
        color: 'var(--clr-white)',
        width: '100vw',
        background: 'var(--clr-blue-alternative)',
        backdrop: true,
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: true,
        allowEnterKey: true,
        customClass: {
            container: 'sweetAlert_container',
            popup: 'sweetAlert_popup',
            text: 'sweetAlert_text',
            closeButton: 'sweetAlert_closeButton',
            backdrop: 'sweetAlert_backdrop',
        },
        showClass: {
            popup: '.sweetAlert_popup animation_fadeInUp'
        },
        hideClass: {
            popup: '.sweetAlert_popup animation_fadeOutDown'
        }
    })
}