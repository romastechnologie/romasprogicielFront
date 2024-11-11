<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="permissionpForm" @submit="editPermissionP" :validation-schema="permissionpSchema" :initial-values="permissionpForm">
          <div class="row">
            <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Demandes <span class="text-danger">*</span>
              </label>
                <Field name="demande" v-slot="{ field }">
                  <Multiselect
                    :options="demandeOptions"
                    :searchable="true"
                    track-by="value"
                    label="label"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner la demande"
                  />
                </Field>
              <ErrorMessage name="demande" class="text-danger" />
            </div>
          </div>


          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Field name="personnel" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le personnel"
                label="label" track-by="label" />
              </Field>
              <ErrorMessage name="personnel" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif de la permission <span class="text-danger">*</span>
              </label>
              <Field name="motifPermission" type="text" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="motifPermission" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de début <span class="text-danger">*</span>
              </label>
              <Field name="dateDebut" type="date" class="form-control shadow-none fs-md-15 text-black"  />
              <ErrorMessage name="dateDebut" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de fin <span class="text-danger">*</span>
              </label>
              <Field name="dateFin" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateFin" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de Reprise <span class="text-danger">*</span>
              </label>
              <Field name="dateReprise" type="date" class="form-control shadow-none fs-md-15 text-black"  />
              <ErrorMessage name="dateReprise" class="text-danger" />
            </div>
          </div>
        
           
            
        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier Permission
            </button>
            <router-link to="/permissionps/liste-permissionps" 
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
import { PermissionP} from '@/models/PermissionP';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditPermissionP",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const permissionpSchema = Yup.object().shape({
      demande: Yup.string().required("Demande est obligatoire."),
      personnel: Yup.string().required("Personnel est obligatoire."),
      dateDebut: Yup.string().required("Date debut est obligatoire."),
      dateFin: Yup.string().required("Date fin est obligatoire."),
      dateReprise: Yup.string().required("Date reprise est obligatoire."),
      motifPermission:Yup.string().required("Date debut est obligatoire."),

    });


    onMounted(async () => {
    });

    const dateDebut = ref();
    const dateFin = ref();
    const dateReprise = ref();
    const motifPermission = ref();
    const demandeOptions = ref([]);
    const personnelOptions = ref([]);
    const router = useRouter();

    const permissionpForm = ref<PermissionP>();
    const route = useRoute();


    function getPermissionP(id:number) {
      console.log("ID envoyé:", id); 
      ApiService.get("/permissionps/"+id.toString())
        .then(({ data }) => {
          console.log("Données récupérées:", data); 
          for (const key in data.data) {
            permissionpForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }



const editPermissionP = async (values, { resetForm }) => {
  try {
    const response = await ApiService.put(`/permissionps/${values.id}`, values);
    
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListePermissionPPage" });
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};
    onMounted(() => {
      if(route.params.id) {
        getPermissionP(parseInt(route.params.id as string));
      }
    });

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
      try {
        const response = await axios.get('/demandepermission');
        demandeOptions.value = response.data.data.map(demande => ({
          value: demande.id,
          label: demande.motifDemande,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des demandes.");
      }
    };
   
   

    fetchDemande();
    getAllPersonnels();



    return { 
    
      permissionpSchema, editPermissionP, permissionpForm,
        demandeOptions,
    personnelOptions,
    dateDebut,
    dateReprise,
    dateFin,
    motifPermission,
    };
  },
});
</script>