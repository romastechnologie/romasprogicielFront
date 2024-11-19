<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="transfertForm" @submit="editTransfert" :validation-schema="transfertSchema" :initial-values="transfertForm">
            <div class="row">
             
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Source <span class="text-danger">*</span>
                </label>
                <Field name="tresorerie" v-slot="{ field }">
                  <Multiselect
                    :options="tresorerieOptions"
                    :searchable="true"
                    track-by="value"
                    label="label"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner la source"
                  />
                </Field>
                <ErrorMessage name="tresorerie" class="text-danger" />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Destination <span class="text-danger">*</span>
                </label>
                <Field name="tresorerie2" v-slot="{ field }">
                  <Multiselect
                    :options="tresorerieOptions2"
                    :searchable="true"
                    track-by="value"
                    label="label"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner la destination"
                  />
                </Field>
                <ErrorMessage name="tresorerie2" class="text-danger" />
              </div>
            </div>

            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Montant <span class="text-danger">*</span>
                  </label>
                  <Field name="montant" type="number" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                  <ErrorMessage name="montant" class="text-danger"/>
                </div>
              </div>
  
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de transfert <span class="text-danger">*</span>
                  </label>
                  <Field name="dateDeTransfert" type="Date" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date"/>
                  <ErrorMessage name="dateDeTransfert" class="text-danger"/>
                </div>
              </div>
              
             
              
          <div class="col-md-12 d-flex flex-column mt-3">
            <div class="d-flex align-items-center ">
              <button
                class="btn btn-success me-3"
                type="submit"
              >
                  Modifier transfert
              </button>
              <router-link to="/transferts/liste-transferts" 
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
  import { Transfert} from '@/models/Transfert';
  import * as Yup from 'yup';
  import axios from 'axios';
  import Multiselect from '@vueform/multiselect'
  
  export default defineComponent({
      name: "EditTransfert",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
    },
    setup: () => {
      const transfertSchema = Yup.object().shape({
        montant: Yup.string().required("Le montant est obligatoire."),
        dateDeTransfert: Yup.string().required("Date de transfert est obligatoire."),
        tresorerie: Yup.string().required("Source est obligatoire."),
        tresorerie2: Yup.string().required("Destination est obligatoire."),

      });
  
      const transfertForm = ref<Transfert>();
      const router = useRouter();
      const route = useRoute();
      const tresorerieOptions = ref([]);
      const tresorerieOptions2 = ref([]);
      const dateDeTransfert = ref();
      const montant = ref();
      const fetchTresorerie = async () => {
      try {
        const response = await axios.get('all/tresoreries');
        tresorerieOptions.value = response.data.data.data.map(tresorerie => ({
          value: tresorerie.id,
          label: tresorerie.nom ,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des tresoreries.");
      }
    };

    
    const fetchTresorerie2 = async () => {
      try {
        const response = await axios.get('all/tresoreries');
        tresorerieOptions2.value = response.data.data.data.map(tresorerie2 => ({
          value: tresorerie2.id,
          label: tresorerie2.nom ,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des tresoreries.");
      }
    };
  
     function getTransfert(id: number) {
  ApiService.get("/transferts/" + id.toString())
    .then(({ data }) => {
      console.log("données récupérées :", data);
      for (const key in data.data) {
        if (key === "dateDeTransfert") {
          const date = new Date(data.data[key]);
          transfertForm.value?.setFieldValue(
            key,
            date.toISOString().split("T")[0] 
          );
        } else {
          transfertForm.value?.setFieldValue(
            key,
            typeof data.data[key] === "object" && data.data[key] !== null
              ? data.data[key].id
              : data.data[key]
          );
        }
      }
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
}

  const editTransfert = async (values, { resetForm }) => {
    try {
      const response = await ApiService.put(`/transferts/${values.id}`, values);
      
      if (response.status === 200) {
        success(response.data.message);
        resetForm();
        router.push({ name: "ListeTransfertPage" });
      }
    } catch (error) {
      error(error.response?.data?.message || "Une erreur est survenue.");
    }
  };
  
  
      onMounted(() => {
        if(route.params.id) {
          getTransfert(parseInt(route.params.id as string));
        }
        fetchTresorerie();
        fetchTresorerie2();
      });
  
      return { 
        transfertSchema, editTransfert, transfertForm,
        tresorerieOptions,
        tresorerieOptions2,
      };
    },
  });
  </script>