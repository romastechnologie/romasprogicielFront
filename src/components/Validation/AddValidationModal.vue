<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="permissionForm" @submit="addValidation" :validation-schema="validationSchema">
        <div class="row">
          
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Demandes <span class="text-danger">*</span>
              </label>
              <Field name="demande"  v-model="demande" v-slot="{ field }">
            <Multiselect
            v-bind="field" 
              v-model="field.value"
              :options="demandeOptions"
              label="label"
              track-by="value" 
              placeholder="Sélectionner la demande"
              @change="onDemandeSelected(field.value)" 
            />
          </Field>
              <ErrorMessage name="demande" class="text-danger" />
            </div>
          </div>


          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date  validation <span class="text-danger">*</span>
              </label>
              <Field name="dateValidation" type="date" class="form-control shadow-none fs-md-15 text-black" v-model="dateDebut" />
              <ErrorMessage name="dateValidation" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Demandeur<span class="text-danger">*</span>
              </label>
              <Field name="personnel" v-model="personnel"  v-slot="{ field }">
              <Multiselect  
               v-model="field.value"            
                v-bind="field" 
                :options="personnelOptions" 
                :preserve-search="true"
                 :multiple="false"
                  :searchable="true" 
                  placeholder="Sélectionner le personnel"
                label="label"
                track-by="value" />
              </Field>
              <ErrorMessage name="personnel" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Validateur<span class="text-danger">*</span>
              </label>
              <Field name="personnel" v-model="personnel"  v-slot="{ field }">
              <Multiselect  
               v-model="field.value"            
                v-bind="field" 
                :options="personnelOptions" 
                :preserve-search="true"
                 :multiple="false"
                  :searchable="true" 
                  placeholder="Sélectionner le personnel"
                label="label"
                track-by="value" />
              </Field>
              <ErrorMessage name="personnel" class="text-danger" />
            </div>
          </div>

          
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
               Statut<span class="text-danger">*</span>
              </label>
              <Field name="personnel" v-model="personnel"  v-slot="{ field }">
              <Multiselect  
               v-model="field.value"            
                v-bind="field" 
                :options="personnelOptions" 
                :preserve-search="true"
                 :multiple="false"
                  :searchable="true" 
                  placeholder="Sélectionner le personnel"
                label="label"
                track-by="value" />
              </Field>
              <ErrorMessage name="personnel" class="text-danger" />
            </div>
          </div>
        
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date  validation <span class="text-danger">*</span>
              </label>
              <Field name="dateValidation" type="date" class="form-control shadow-none fs-md-15 text-black" v-model="dateDebut" />
              <ErrorMessage name="dateValidation" class="text-danger" />
            </div>
          </div>

          <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
               Commentaire <span class="text-danger">*</span>
              </label>
              <Field  cols="20" rows="3" as="textarea" name="motifPermission" type="text" class="form-control shadow-none fs-md-15 text-black" v-model="motifPermission"/>
              <ErrorMessage name="motifPermission" class="text-danger" />
            </div>
          </div>
        
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
              Accorder
              </button>
              <router-link to="/demandes/liste-demande-validation" class=" btn btn-danger "><i
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

import { defineComponent, onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { PermissionP } from '@/models/PermissionP';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import axios from 'axios';
export default defineComponent({
  name: "AddValidation",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const permissionpSchema = Yup.object().shape({
      demande: Yup.string().required("Demande est obligatoire."),
      validateur: Yup.string().required("Personnel est obligatoire."),
      demandeur: Yup.string().required("Date debut est obligatoire."),
      statut: Yup.string().required("Date fin est obligatoire."),
      dateValidation: Yup.string().required("Date reprise est obligatoire."),
      commentaire:Yup.string().required("Date debut est obligatoire."),
    });
    onMounted(async () => {
    });
    const validationForm = ref(null);
    const dateValidation = ref();
    const commentaire = ref();
    const demande = ref();
    const demandeOptions = ref([]);
    const personnelOptions = ref([]);
    const personnel = ref(null);
    const router = useRouter();

    const addValidation = async (values, {resetForm}) => {
      ApiService.post("/validations",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListevalidationPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const getAllPersonnels = async () => {
        try{
        const response = await ApiService.get('all/personnels');
        const personnelsData = response.data.data.data;
        console.log('Data', personnelsData)
        personnelOptions.value = personnelsData.map((personnel) => ({
          value: personnel.id,
          label: personnel.nom + " " + personnel.prenom,
        }));
        }
        catch(error){
        }
      }

      const fetchDemande = async () => {
        try{
        const response = await ApiService.get('all/demandes');
        const demandesData = response.data.data.data;
        console.log('DemandeData', demandesData)
        demandeOptions.value = demandesData.map((demande) => ({
          value: demande.id,
          label: demande.id,
        }));
        }
        catch(error){
        }
      }
     /* const fetchDemande = async () => {
  try {
    const response = await axios.get('/all/demandes');
    const demandesData = response.data.data.data;
        console.log('Data', demandesData)
        demandeOptions.value = demandesData.map((demande) => ({
          value: demande.id,
          label: demande.motifDemande,
        }));
     
    
  } catch (err) {
    console.error("Erreur lors de la récupération des demandes:", err);
    error("Erreur lors de la récupération des demandes.");
  }
};*/
const getDemande = async (id) => {
  try {
    console.log("Fetching demande details for ID:", id);
    const { data } = await ApiService.get(`/demandes/${id}`);
    if (data && data.data) {
     
      commentaire.value = data.data.commentaire || null;

      if (data.data.personnel) {
        personnel.value = data.data.personnel.id;
      } else {
        console.error("Personnel non trouvé pour la demande.");
        personnel.value = null;
      }
    } else {
      console.error("No data found for demande ID:", id);
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des détails de la demande:", err);
    error("Erreur lors de la récupération des détails de la demande.");
  }
};
    const onDemandeSelected = (selectedDemandeId) => {
  if (!selectedDemandeId) {
    console.error("Erreur: demande ID non défini.");
    return;
  }
  getDemande(selectedDemandeId);
};
    onMounted(fetchDemande);
    getAllPersonnels();
    return { permissionpSchema,
       addValidation,
        validationForm,
        onDemandeSelected,
        demandeOptions,
        personnelOptions,
        personnel,
        dateValidation,
        commentaire,
        demande 
      };   
  },
});
</script>