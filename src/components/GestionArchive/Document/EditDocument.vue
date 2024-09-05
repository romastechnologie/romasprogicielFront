<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-document-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="documentForm" @submit="editDocument" :validation-schema="documentSchema" :initial-values="documentForm">
            <div class="row">
                <div class="col-md-4 mt-3">
                    <label for="refDoc" class="form-label">Référence Document<span class="text-danger">*</span></label>
                    <Field name="refDoc" class="form-control" type="text" placeholder="Saisir la référence"/>
                    <ErrorMessage name="refDoc" class="text-danger" />
            </div>
            
            <div class="col-md-4 mt-3">
                    <label for="nom" class="form-label">Nom Document<span class="text-danger">*</span></label>
                    <Field name="nom" class="form-control" type="text" placeholder="Entrer le nom du document"/>
                    <ErrorMessage name="nom" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
                    <label for="description" class="form-label">Description<span class="text-danger">*</span></label>
                    <Field name="description" class="form-control" type="text" placeholder="Saisir la description"/>
                    <ErrorMessage name="description" class="text-danger" />
            </div>
                
            <div class="col-md-4 mt-3">
                    <label for="fichier" class="form-label">Fichier<span class="text-danger">*</span></label>
                    <Field name="fichier" class="form-control" type="file"/>
                    <ErrorMessage name="fichier" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
                    <label for="dateFinConservation" class="form-label">Date de fin de conservation<span class="text-danger">*</span></label>
                    <Field name="dateFinConservation" class="form-control" type="date" />
                    <ErrorMessage name="dateFinConservation" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Tag <span class="text-danger">*</span>
              </label>
              <Field name="tag" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="tagOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le tag"
                label="label" track-by="label" />
              </Field>
              <ErrorMessage name="tag" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Organisation<span class="text-danger">*</span>
              </label>
              <Field name="organisation" v-model="organisations" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="organisationOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner l'organisation"
                label="label" track-by="label" />
              </Field>
              <ErrorMessage name="organisation" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Format <span class="text-danger">*</span>
              </label>
              <Field name="format" v-model="formats" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="formatOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le format"
                label="label" track-by="label" />
              </Field>
              <ErrorMessage name="format" class="text-danger" />
            </div>
          </div>

           
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Modifier un Document
              </button>
              <router-link to="/documents/liste-documents" 
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
    import { defineComponent, onMounted, ref} from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import axios from 'axios';
    import ApiService from '@/services/ApiService';
    import { error, success } from '@/utils/utils';
    import { useRouter, useRoute } from 'vue-router';
    import { Document } from '@/models/Document';
    import Multiselect from '@vueform/multiselect/src/Multiselect';
  
  export default defineComponent({
      name: "EditDocument",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      
  },
  
  setup: () => {
    const documentSchema = Yup.object().shape({
            nom: Yup.string().required("Le nom est obligatoire."),
            description: Yup.string().required("La description est obligatoire."),
            refDoc: Yup.string().required("La référence est obligatoire."),
            dateFinConservation: Yup.string().required("La date est obligatoire."),
            fichier: Yup.string().required("Le fichier est obligatoire."),
            organisation: Yup.string().required("L'organisation est obligatoire."),
            format:Yup.string().required("Le format est obligatoire."),
            tag: Yup.string().required("Le tag est obligatoire.")
    });

   
    const router = useRouter();
    const documentForm = ref<Document>();
    const route = useRoute();
    //const documentForm =  ref(null);
      const tagOptions = ref();
      const formatOptions = ref();
      const organisationOptions = ref();
      const organisations = ref();
      const tag = ref();
      const formats = ref();

    onMounted(() => {
      getAllFormats();
        getAllTags();
        getAllOrganisations();
      if(route.params.id) {
        getDocument(parseInt(route.params.id as string));
      }
    });

    
    function getDocument(id:number) {
      ApiService.get("/documents/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            documentForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editDocument = async (values, {resetForm}) => {
      ApiService.put("/documents/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeDocument" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };
    const getAllOrganisations= async () => {
        try{
        const response = await ApiService.get('/all/organisations');
        const organisationsData = response.data.data.data;
        organisationOptions.value = organisationsData.map((organisations) => ({
          value: organisations.id,
          label: organisations.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllFormats= async () => {
        try{
        const response = await ApiService.get('/all/formats');
        const formatsData = response.data.data.data;
        formatOptions.value = formatsData.map((formats) => ({
          value: formats.id,
          label: formats.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
      const getAllTags = async () => {
        try{
        const response = await ApiService.get('/tags');
        const tagsData = response.data;
        console.log('Data', tagsData)
        tagOptions.value = tagsData.map((tag) => ({
          value: tag.id,
          label: tag.nom + " " + tag.prenom,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      }
   

   
      return {documentForm,
         documentSchema,
          editDocument,
          formatOptions,
          organisationOptions,
          tagOptions
          
        };
    },
  });
  </script>