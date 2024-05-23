import axios from "axios";
//import $store from '@/store';
import Swal from 'sweetalert2'
import { Ref, ref } from "vue";
import { Personnel } from "./models";
import { useRouter } from 'vue-router';

const router = useRouter()

// export const usePersonnel = () => {
    export const createPersonnel = async (newPersonnel: object) => {
        try {
            const response = await axios.post('http://localhost:3000/personnels', newPersonnel);
            Swal.fire({
                timer: 1500,
                position: "top-end",
                text: "Personnel ajouté avec succès!",
                icon: "success"
            });
            //$store.commit('ADD_PERSONNEL', response.data);
        } catch (error) {
            console.error('Erreur lors de la création du personnel:', error);
            throw error;
        }
    }

    export const getOnePersonnel = async(id: number) => {
        try {
            const response = await axios.get<Personnel>(`http://localhost:3000/personnels/${id}`);
            //$store.commit('', response.data);
            console.log(response);
        } catch (error) {
            console.error('Erreur lors de la recupération des personnels:', error);
            throw error;
        }
    }

    export const getAllPersonnels = async () => {
        try {
            const response = await axios.get<Personnel[]>('http://localhost:3000/personnels');
            //$store.commit('SET_PERSONNELS', response.data);
            console.log(response);
        } catch (error) {
            console.error('Erreur lors de la recupération des personnels:', error);
            throw error;
        }
    }

    export const updatePersonnel = async (id: number, updatedPersonnel: Partial<Personnel>) => {
        try {
            const response = await axios.patch(`http://localhost:3000/presences/${id}`, updatedPersonnel);
            Swal.fire({
                timer: 1500,
                position: "top-end",
                text: "Presence modifié avec succès!",
                icon: "success"
            });
            //$store.commit('UPDATE_PRESENCE', response.data);
            router.push("/presences")
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la presence:', error);
            throw error;
        }
    }

    export const deletePersonnel = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3000/personnels/${id}`);
            //$store.commit('DELETE_PERSONNEL', response.data);
            console.log(response);
        } catch (error) {
            console.error('Erreur lors de la suppression des personnels:', error);
            throw error;
        }
    }
// }
