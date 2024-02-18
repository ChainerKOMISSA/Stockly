import Swal from 'sweetalert2'

export const createSuccessAlert = () => {
    Swal.fire({
        icon: "success",
        title: "Enregistrement réussi !",
        showConfirmButton: false,
        timer: 1500
    })
}

export const updateSuccessAlert = () => {
    Swal.fire({
        icon: "success",
        title: "Modification réussie !",
        showConfirmButton: false,
        timer: 1500
    })
}

export const deleteSuccessAlert = () => {
    Swal.fire({
        icon: "success",
        title: "Suppression réussie !",
        showConfirmButton: false,
        timer: 1500
    })
}

export const failureAlert = (text) => {
    Swal.fire({
        icon: "error",
        title: "Une erreur s'est produite !",
        timer: 1500
    })
}

export const infoAlert = (title) => {
    Swal.fire({
        icon: "info",
        showConfirmButton: false,
        timer: 1500
    })
}