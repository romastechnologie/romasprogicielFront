<template>
    <div class="card mb-25 border-0 rounded-0 bg-white edit-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="champsLibreFamilleForm" @submit="editChampsLibreFamille" :validation-schema="champsLibreFamilleSchema">
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
                  <Field  name="famille"  v-slot="{ field }">
                    <Multiselect
                      :options="familleOptions"
                      :searchable="true"
                      track-by="label"
                      label="label"
                      v-model = "field.value"
                      v-bind = "field"
                      placeholder="Sélectionner la Famille"
                    />
                  </Field>  
                  <ErrorMessage name="famille" class="text-danger"/>
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
                      track-by="label"
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
  
  <script lang="ts">
  
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
      name: "EditChampsLibreFamillePage",
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
          champsLibre: Yup.string().required("Le champsLibre est obligatoire."),

    });
  
      onMounted(() => {
        getAllFamille();
        getAllChampsLibre();
      });
  
      
      const champsLibreFamilleForm = ref(null);
      const showMErr = ref(false);
      let champsLibreFamille = ref([]);
      const router = useRouter();
      const familleOptions = ref([]);
      const champsLibreOptions = ref([]);
      const famille = ref();
    const champsLibre = ref();
    const route = useRoute()
     


      // const item = ref({ ...props.item });
      const isUPDATE = ref(false);
      const title = ref("Ajouter un champsLibre et Famille");
      const btntext = ref('Ajouter');
  
      //const permissions= ref<Array<Permission>>([]);
  
  
      function getChampsLibreFamille(id:number) {
      ApiService.get("/familleProduitChampsLibres/"+id.toString())
        .then(({ data }) => {
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

    async function editChampsLibreFamille(value: object) {
      try {
      const response = await ApiService.put(`/familleProduitChampsLibres/${route.params.id}`, value);
      Swal.fire({
        timer: 1500,
        position: "top-end",
        text: "ChampsLibreFamille mise à jour avec succès!",
        icon: "success"
      });
      router.push("/champsLibreFamille/liste-champsLibreFamille")
    } catch (error) {
      console.error('Erreur lors de la mise à jour du champsLibreFamille:', error);
      throw error;
    }
  }

    
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
  
    
     
  
      return { champsLibreFamilleSchema, editChampsLibreFamille, champsLibreFamilleForm,showMErr,familleOptions,champsLibreOptions,famille,champsLibre};
    },
  });
  </script>