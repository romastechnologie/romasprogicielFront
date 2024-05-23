<template>
  <!-- Demande -->
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true" id="AddDemandeModal" role="dialog"
    ref="addDemandeModalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel"> Déposer une demande </h5>
          <button ref="closeDemandeModal" type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form @submit="sendDemande" :validation-schema="schemaDemande()">
            <p class="my-0"> Catégorie de la demande </p>
            <Field name="categorieId" v-model="cate" v-slot="{ field }">
              <VueMultiselect 
              v-model="field.value" 
              v-bind="field" 
              :options="categorieOptions" 
              :close-on-select="true"
              :clear-on-select="false" 
              :multiple="false" 
              :searchable="true" 
              placeholder="Sélectionner la catégorie"
              label="label" 
              track-by="label" />
            </Field>
            
            <p class="my-0"> Personnel </p>
            <Field name="personnelId" v-model="perso" v-slot="{ field }">
              <VueMultiselect 
              v-model="field.value" 
              v-bind="field" 
              :options="personnelOptions" 
              :close-on-select="true"
              :clear-on-select="false" 
              :multiple="false" 
              :searchable="true" 
              placeholder="Sélectionner le personnel"
              label="label" 
              track-by="label" />
            </Field>
           
            <p class="my-0"> Demande </p>
            <Field type="file" name="demandeFile" id="demandeFile" class="form-control mb-1" />
            <ErrorMessage name="demandeFile" class="text-danger text-start mb-2" />
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
              <button type="submit" class="btn btn-primary" @click="sendDemande"> Déposer </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate'
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import Multiselect from '@vueform/multiselect'
import VueMultiselect from 'vue-multiselect'
import ApiService from '@/services/ApiService';

const router = useRouter();

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});

const demandes = ref([] as any[]);
const categorieOptions = ref([] as any[]);
const personnelOptions = ref([] as any[]);
const closeDemandeModal = ref(null);
const showE = ref(false)

function schemaDemande() {
  return yup.object().shape({
    // categorieId: yup.string().required("La categorie est requis."),
    // personnelId: yup.string().required("Le personnel est requis."),
    demandeFile: yup.string().required("Le fichier de la demande est requis."),
  })
}

const perso = ref();
const cate = ref();
async function sendDemande(values: any) {

  const formData = new FormData();

  const target = document.getElementById("demandeFile") as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file && file.size > 1048576) {
      Swal.fire({
        title: "Oops...!",
        text: "La taille du fichier dépasse 1 Mo!",
        icon: "error"
      });
    } else {
      formData.append('fichier', target.files[0])
      try {
        const response = await ApiService.post(`/demandes/${perso.value.value}/${cate.value.value}`, formData);
        Swal.fire({
          timer: 1500,
          position: "top-end",
          text: "La demande a été soumise avec succès!",
          icon: "success"
        });
        location.reload()
        if (closeDemandeModal.value) {
          (closeDemandeModal.value as HTMLButtonElement).click();
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoie de la demande:', error);
        throw error;
      }
    }
  }
}

const getAllPersonnels = async () => {
  try {
    const response = await ApiService.get("/personnels");
    // personnels.value = response.data;
    personnelOptions.value = response.data.map((personnel: any) => ({
      value: personnel.id,
      label: `${personnel.nom  + " " + personnel.prenom}`
    }));
    console.log(personnelOptions);
  } catch (error) {
    console.error('Erreur lors de la recupération des personnels:', error);
    throw error;
  }
}

const getAllCategorieDemandes = async () => {
  try {
    const response = await ApiService.get("/categorieDemandes");
    // categorieDemandes.value = response.data;
    categorieOptions.value = response.data.map((categorie: any) => ({
      value: categorie.id,
      label: `${categorie.libelle}`
    }));
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des categories de demandes:', error);
    throw error;
  }
}

const getAllDemandes = async () => {
  try {
    const response = await ApiService.get("/demandes");
    demandes.value = response.data;

  } catch (error) {
    console.error('Erreur lors de la recupération des demandes:', error);
    throw error;
  }
}

onMounted(() => {
  getAllPersonnels();
  getAllCategorieDemandes();
  getAllDemandes();
})

</script>