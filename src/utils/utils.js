import { Modal } from "bootstrap";
import ApiService from "@/services/ApiService";
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from "crypto-js";
const generateUuid = () => {
    return uuidv4(); // Générer un UUID v4
};
const getDatePlusXDays = (x) => {
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + x);
    // Obtenez les composants de la date
    const year = futureDate.getFullYear();
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
    const day = futureDate.getDate().toString().padStart(2, '0');
    // Formattez la date comme "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
const cleSecrete = "=_,rine5mw3l*:b87qzpn8lfiuc2~5xe;9268g+3z@jre)w.x6A%67hu^-?$BKmPM32s7[";
export function cryptage(lemot = "") {
    let motCrypter = "";
    let i = 0;
    // Vérifier si lemot est null ou undefined avant de convertir en chaîne
    const texte = lemot ? lemot.toString() : "";
    do {
        motCrypter = CryptoJS.AES.encrypt(texte, cleSecrete).toString();
        console.log(" Etape " + i++, "  ===> ", motCrypter);
    } while (motCrypter.includes('/')); // Vérifier s'il contient "/"
    return motCrypter;
}
export function decryptage(lemot = "") {
    const bytes = CryptoJS.AES.decrypt(lemot, cleSecrete);
    return bytes.toString(CryptoJS.enc.Utf8);
}
const hideModal = (modalEl) => {
    if (!modalEl) {
        return;
    }
    const myModal = Modal.getInstance(modalEl);
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    removeModalBackdrop();
    myModal?.hide();
};
const ajouterPeriode = (dateStr, x, frequence) => {
    // Convertir la date en objet Date
    let date = new Date(dateStr);
    // Vérifier la fréquence et ajouter la quantité appropriée
    switch (frequence.toLowerCase()) {
        case "jour":
        case "jours":
        case "jour(s)":
            date.setDate(date.getDate() + x);
            break;
        case "mois":
            date.setMonth(date.getMonth() + x);
            break;
        case "année":
        case "années":
        case "annee":
        case "annees":
        case "an":
        case "ans":
            date.setFullYear(date.getFullYear() + x);
            break;
        case "semaine":
        case "semaines":
        case "week":
            date.setDate(date.getDate() + (x * 7));
            break;
        default:
            console.error("Fréquence non reconnue : ", frequence);
            return null;
    }
    // Retourner la nouvelle date formatée en ISO (aaaa-mm-jj)
    return date.toISOString().split('T')[0];
};
const showModal = (modalEl) => {
    if (!modalEl) {
        return;
    }
    const myModal = new Modal(modalEl);
    myModal?.show();
};
const getUrlApiForFiles = (nomFichier, dossier = "") => {
    if (nomFichier) {
        return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/${dossier ? dossier + "/" : ""}${nomFichier}`;
    }
    else {
        return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/Erreur404.pdf`;
    }
};
const onFileChange = (e, accept = []) => {
    const file = e.target.files[0];
    const allowedTypes = accept != null ? accept : ['image/jpeg', 'image/png', 'application/pdf'];
    if (file && !allowedTypes.includes(file.type)) {
        // Vide le champ
        e.target.value = '';
        error('Fichier non valide. Veuillez sélectionner une image ou un fichier PDF.');
        return false;
    }
    else {
        return e.target.files[0];
    }
};
const success = (message, temps = 5000) => {
    Swal.fire({
        title: 'Succès',
        text: message,
        icon: "success",
        toast: true,
        timer: temps,
        position: 'top-right',
        showConfirmButton: false,
    });
};
const warning = (message, temps = 5000) => {
    Swal.fire({
        title: 'Attention',
        text: message,
        icon: "warning",
        toast: true,
        timer: temps,
        position: 'top-right',
        showConfirmButton: false,
    });
};
const error = (message) => {
    Swal.fire({
        title: 'Erreur',
        text: message,
        icon: "error",
        toast: true,
        timer: 5000,
        position: 'top-right',
        showConfirmButton: false
    });
};
const format_date = (value) => {
    if (value) {
        return format(new Date(value), 'dd-MM-yyyy HH:mm', { locale: fr });
        //return moment(String(value)).format('DD-MM-YYYY hh:mm')
    }
};
const format_Date = (date) => {
    if (date) {
        return format(new Date(date), 'dd-MM-yyyy', { locale: fr });
    }
};
const separateur = (montant) => {
    if (montant) {
        return montant.toLocaleString('fr-FR');
    }
};
const removeModalBackdrop = () => {
    if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
        document.querySelectorAll(".modal-backdrop.fade.show").forEach((item) => {
            item.remove();
        });
    }
};
const getAssetPath = (path) => {
    return '' + path;
};
const calculerDuree = (heureReglementaire, heureArrivee) => {
    if (!heureReglementaire || !heureArrivee)
        return "";
    const [heureR, minuteR] = heureReglementaire.split(":").map(Number);
    const [heureA, minuteA] = heureArrivee.split(":").map(Number);
    const dateR = new Date();
    dateR.setHours(heureR, minuteR);
    const dateA = new Date();
    dateA.setHours(heureA, minuteA);
    const differenceMs = dateA.getTime() - dateR.getTime();
    const differenceMinutes = Math.floor(differenceMs / 60000);
    const heures = Math.floor(differenceMinutes / 60);
    const minutes = differenceMinutes % 60;
    return `${heures.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
const suppression = (id, element, route, entite) => {
    Swal.fire({
        text: "Vous êtes sur le point de supprimer " + entite + ". Etes-vous sûr ?",
        icon: "warning",
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        cancelButtonText: `Annuler`,
        heightAuto: false,
        customClass: {
            confirmButton: "btn btn-danger",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            ApiService.delete(`/${route}/${id}`)
                .then(({ data }) => {
                Swal.fire({
                    title: 'Succès',
                    text: data.message,
                    icon: "success",
                    toast: true,
                    timer: 5000,
                    position: 'top-right',
                    showConfirmButton: false,
                });
                for (let i = 0; i < element.length; i++) {
                    if (element[i].id === id) {
                        element.splice(i, 1);
                    }
                }
            }).catch(({ response }) => {
                Swal.fire({
                    text: response.data.message,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Réssayer à nouveau!",
                    heightAuto: false,
                    customClass: {
                        confirmButton: "btn fw-semobold btn-light-danger",
                    },
                });
            });
        }
        else if (result.isDenied) {
            Swal.fire("La suppression n'est pas passée", "", "info");
        }
    });
};
export { getDatePlusXDays, generateUuid, calculerDuree, warning, ajouterPeriode, onFileChange, removeModalBackdrop, suppression, separateur, hideModal, getAssetPath, format_Date, showModal, format_date, success, error, getUrlApiForFiles, };
//# sourceMappingURL=utils.js.map