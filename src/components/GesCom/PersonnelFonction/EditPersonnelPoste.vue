<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="personnelFonctionForm" @submit="editPersonnelFonction" :validation-schema="personnelFonctionSchema" :initial-values="personnelFonctionForm">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nombre de fonction <span class="text-danger">*</span>
                </label>
                <Field name="nombreFonction" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nombre"/>
                <ErrorMessage name="nombreFonction" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Etat <span class="text-danger">*</span>
                </label>
                <Field name="etat" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'état"/>
                <ErrorMessage name="etat" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date début <span class="text-danger">*</span>
                  </label>
                  <Field name="dateDebutFonc" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateDebutFonc" class="text-danger"/>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de fin <span class="text-danger">*</span>
                  </label>
                  <Field name="dateFinFonc" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateFinFonc" class="text-danger"/>
              </div>
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Personnel <span class="text-danger">*</span>
                </label>
                <Field  name="personnel"  v-slot="{ field }">
                  <Multiselect
                    :options="personnelOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le personnel"
                  />
                </Field>  
              </div>
              <ErrorMessage name="personnel" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Personnel <span class="text-danger">*</span>
                </label>
                <Field  name="fonction"  v-slot="{ field }">
                  <Multiselect
                    :options="fonctionOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la fonction"
                  />
                </Field>  
              </div>
              <ErrorMessage name="fonction" class="text-danger"/>
            </div>
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter un personnelFonction
                </button>
                <router-link to="/liste-personnelFonctions" 
                    class=" btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                    <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
      </div>
    </Form>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { PersonnelFonction} from '@/models/PersonnelPoste';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditPersonnelFonction",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const personnelFonctionSchema = Yup.object().shape({
      nombreFonction: Yup.number().typeError('Veuillez entrer des chiffres').required('Le nombre est obligatoire'),
      dateDebutFonc: Yup.date().required('La date de début est obligatoire'),
      dateFinFonc: Yup.date().required('La date de fin est obligatoire'),
      etat: Yup.string().required('L\' état est obligatoire'),
      personnel: Yup.string().required('Le personnel est obligatoire'),
      fonction: Yup.string().required('La fonction est obligatoire'),
    });

    const personnelFonctionForm = ref<PersonnelFonction>();
    const router = useRouter();
    const route = useRoute();
    const personnelOptions = ref([]);
    const fonctionOptions = ref([]);

    function getPersonnelFonction(id:number) {
      ApiService.get("/personnelFonctions/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            personnelFonctionForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const editPersonnelFonction = async (values, {resetForm}) => {
      const data = personnelFonctionForm.value;
      ApiService.put("/personnelFonctions/" + data?.id, data)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListePersonnelFonctionPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchPersonnel = async () => {
      try {
        const response = await ApiService.get('/personnels');
        const personnelData = response.data;
        personnelOptions.value = personnelData.map((personnel) => ({
          value: personnel.id,
          label: `${personnel.nom} ${personnel.prenom}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchFonction = async () => {
      try {
        const response = await ApiService.get('/fonctions');
        const fonctionData = response.data.data.data;
        fonctionOptions.value = fonctionData.map((fonction) => ({
          value: fonction.id,
          label: `${fonction.fonction} - ${fonction.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      if(route.params.id) {
        getPersonnelFonction(parseInt(route.params.id as string));
      }
      fetchPersonnel();
      fetchFonction();
    });

    return { 
      personnelFonctionSchema, editPersonnelFonction, personnelFonctionForm,
        personnelOptions,fonctionOptions
    };
  },
});
</script>