import Swal from 'sweetalert2'

export const createSuccessAlert = () => {
    Swal.fire({
        icon: "success",
        title: "Enregistrement réussi !",
        showConfirmButton: false,
        timer: 2000
    })
}

export const updateSuccessAlert = () => {
    Swal.fire({
        icon: "success",
        title: "Modification réussie !",
        showConfirmButton: false,
        timer: 2000
    })
}

export const confirmDeleteAlert = () => {
    Swal.fire({
        title: "Etes-vous sûr de supprimer?",
        text: "Cette action est irréversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText : "Annuler",
        confirmButtonText: "Oui, supprimer"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Suppression réussie!",
                icon: "success"
            });
        }
    });
}

export const deleteSuccessAlert = () => {
    Swal.fire({
        icon: "success",
        title: "Suppression réussie !",
        showConfirmButton: false,
        timer: 2000
    })
}

export const failureAlert = (texte) => {
    Swal.fire({
        icon: "error",
        title: "Une erreur s'est produite !",
        text : texte,
        timer: 2000
    })
}

export const infoAlert = (title) => {
    Swal.fire({
        icon: "info",
        showConfirmButton: false,
        timer: 2000
    })
}