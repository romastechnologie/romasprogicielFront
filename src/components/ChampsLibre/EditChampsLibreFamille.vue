
<template>
  <div class="card mb-25 border-0 rounded-0 bg-white edit-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="champsLibreFamilleForm" @submit="editChampsLibreFamille" :validation-schema="champsLibreFamilleSchema" :initial-values="champsLibreFamilleForm">
            <div class="row">
              <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label for="statut" class="form-label">Statut<span class="text-danger">*</span></label>
                  <Field name="statut" class="form-control" type="text"/>
                  <ErrorMessage name="statut" class="text-danger" />
                  </div>
                  </div>
              <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Famille <span class="text-danger">*</span>
                </label>
                <Field  name="famille" type="text" v-slot="{ field }">
                  <Multiselect
                    :options="familleOptions"
                    :searchable="true"
                    :preserve-search="true"
                    track-by="value"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la Famille"
                  />
                </Field>  
                 <span class="text-danger" v-if="showMErr">La Famille est obligatoire</span>
                </div>
            </div>

            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Champs Libre  <span class="text-danger">*</span>
                </label>
                <Field  name="champslibre"  v-slot="{ field }">
                  <Multiselect
                    :options="champsLibreOptions"
                    :searchable="true"
                    mode = "tags"
                    track-by="value"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le ChampsLibre"
                  />
                </Field>  
                <ErrorMessage name="champslibre" class="text-danger"/>
              </div>
            </div>

       
        <div class="col-md-12 mt-3">
          <div class="d-flex align-items-center ">
            <button class="btn btn-success me-3" type="submit">
                Modifier un ChampsLibre et Famille
            </button>
            <router-link to="/champsLibreFamille/liste-champsLibreFamille" 
            class=" btn btn-danger"><i
                class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
          </div>
        </div>
      </div>
    </Form>
  </div>
</div>
</template>

w<script lang="ts">

import { defineComponent, onMounted, ref} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import ApiService from '@/services/ApiService';
import { FamilleProduitChampsLibres } from '@/models/FamilleProduitChampsLibres'; 
import { error, success } from '@/utils/utils';
import { useRouter,useRoute } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import VueMultiselect from 'vue-multiselect'

export default defineComponent({
    name: "EditChampsLibreFamille",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect
  },

  setup: () => {
    const champsLibreFamilleSchema = Yup.object().shape({
        statut: Yup.string().required("Le statut est obligatoire."),      
        famille: Yup.string().required("La famille est obligatoire."),      
        champslibre: Yup.array().required("Le champsLibre est obligatoire."),

  });

    const champsLibreFamilleForm = ref(null);
    const showMErr = ref(false);
    const router = useRouter();
    const familleOptions = ref([]);
    const champsLibreOptions = ref([]);
    const famille = ref();
  const champslibre = ref();
  const route = useRoute()
   

  onMounted(() => {
      getAllFamille();
      getAllChampsLibre();
      if(route.params.id) {
        getChampsLibreFamille(parseInt(route.params.id as string));
    }
    });



    // const item = ref({ ...props.item });
    const isUPDATE = ref(false);
    const title = ref("Ajouter un champsLibre et Famille");
    const btntext = ref('Ajouter');

    //const permissions= ref<Array<Permission>>([]);


    function getChampsLibreFamille(id:number) {
    ApiService.get("/familleProduitChampsLibres/"+id.toString())
      .then(({ data }) => {
        console.log('Données recupérées',data)
        for (const key in data.data) {
          champsLibreFamilleForm.value?.setFieldValue(key, 
          (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
        );
        }
    })
    .catch(({ response }) => {
      error(response.message);
    });
  }

//     function getChampsLibreFamille(id: number) {
//   ApiService.get("/familleProduitChampsLibres/" + id.toString())
//     .then(({ data }) => {
//       console.log("Data reçue :", data);
//       const itemData = data.data; // Récupération des données de l'élément
//       for (const key in itemData) {
//         const value = itemData[key];
//         champsLibreFamilleForm.value?.setFieldValue(
//           key,
//           typeof value === "object" && value !== null ? value.id : value
//         );
//       }
//     })
//     .catch(({ response }) => {
//       error(response.message);
//     });
// }






  const editChampsLibreFamille = async (values, { resetForm }) => {
  try {
    const response = await ApiService.put(`/familleProduitChampsLibres/${values.id}`, values);
    
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push("/champsLibreFamille/liste-champsLibreFamille");
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};




//   async function editChampsLibreFamille(value: object) {

// const statut = document.getElementById("statut") as HTMLInputElement;
// const famille = document.getElementById("famille") as HTMLInputElement;
// const champslibre = document.getElementById("champslibre") as HTMLInputElement;

// Object.assign(value, {
//     statut: statut.value,
//     famille: famille.value,
//     champslibre: champslibre.value
// })

// try {
//     const response = await ApiService.put(`/familleProduitChampsLibres/${route.params.id}`, value);
//     Swal.fire({
//         timer: 1500,
//         position: "top-end",
//         text: "La familleProduitChampsLibres a été modifié avec succès!",
//         icon: "success"
//     });
//     router.push("/champsLibreFamille/liste-champsLibreFamille")
// } catch (error) {
//     console.error('Erreur lors de la mise à jour de la familleProduitChamps:', error);
//     throw error;
// }
// }


  
  const getAllFamille = async () => {
          console.log('Data')

          try {
              const response = await ApiService.get('/all/familles');
              const familleData = response.data.data.data;
              console.log('response',response)

              familleOptions.value = familleData.map((famille) => ({
                  value: famille.id,
                  label: famille.codeFamille,

              }));
          }
          catch (error) {
              //error(response.data.message)
          }
      }

      const getAllChampsLibre = async () => {
          console.log('Data')

          try {
              const response = await ApiService.get('/all/champsLibres');
              const champsLibreData = response.data.data.data;
              console.log('response',response)

              champsLibreOptions.value = champsLibreData.map((champsLibres) => ({
                  value: champsLibres.id,
                  label: champsLibres.nomChamp,

              }));
          }
          catch (error) {
              //error(response.data.message)
          }
      }

  
   

    return { champsLibreFamilleSchema, editChampsLibreFamille, champsLibreFamilleForm,showMErr,familleOptions,champsLibreOptions,famille,champslibre};
  },
});
</script>