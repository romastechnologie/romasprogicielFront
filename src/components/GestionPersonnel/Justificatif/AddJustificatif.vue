<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="justificatifForm" @submit="addJustificatif" :validation-schema="justificatifSchema">
              <div class="row">    
          
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
         
         
          <!--  <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date <span class="text-danger">*</span>
              </label>
              <Field name="date" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="date" class="text-danger" />
            </div>
          </div>-->

        


          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de début <span class="text-danger">*</span>
              </label>
              <Field name="dateDebut" type="date" class="form-control shadow-none fs-md-15 text-black" />
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
                Preuve <span class="text-danger">*</span>
              </label>
              <Field name="preuveFileName" type="file"   @change="preuveFileNameChange" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="preuveFileName" class="text-danger" />
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter un justificatif
              </button>
              <router-link to="/justificatifs/liste-justificatif" class=" btn btn-danger"><i
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
  import ApiService from '@/services/ApiService';
  import { Justificatif } from '@/models/Justificatif';
  import { error, success,onFileChange  } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'


  
  
  export default defineComponent({
      name: "AddJustificatif",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
    const justificatifSchema = Yup.object().shape({ 
   // date: Yup.string().required("La date est obligatoire."),
    // presenceJustificatif: Yup.string().required("La presence est obligatoire."),
    personnel: Yup.string().required("Le personnel est obligatoire."),
    dateDebut: Yup.string().required("La date de début est obligatoire."),
    dateFin: Yup.string().required("La date de fin est obligatoire."),
   preuveFileName: Yup.mixed().required("La preuve est obligatoire."), 
  });
  


      
  
      onMounted(() => {
        getAllPersonnels()
        
  });
  
      const justificatifForm =  ref(null);
      const showMErr = ref(false);
      const personnelOptions = ref([]);
      const selectedFile = ref<any>();


      const router = useRouter();
      //const permissions= ref<Array<Permission>>([]);
  
      const preuveFileNameChange = (e) => {
      selectedFile.value = onFileChange(e, [
        "image/jpeg",
        "image/png",
        "application/pdf",
      ]);
    };


   
    const addJustificatif = async (values, { resetForm }) => {
      console.log("YUJHHJGVYVG ===> ", values)
      axios
        .post("/justificatifs", values, {
          headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
        })
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeJustificatifPage" });
          }
        })
        .catch(({ response }) => {
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

      return {justificatifSchema , addJustificatif, justificatifForm,personnelOptions,onFileChange,preuveFileNameChange
      };
    
    },
  });
  </script>