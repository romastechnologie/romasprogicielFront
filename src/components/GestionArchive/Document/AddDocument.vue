<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="documentForm" @submit="addDocument" :validation-schema="documentSchema">
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
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Types Depenses <span class="text-danger">*</span>
              </label>
              <Field name="typesDepenses" v-model="typesDepenses" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="typesDepensesOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le type de depense"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le Type de Depense  est obligatoire</span>
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Categories Depenses <span class="text-danger">*</span>
              </label>
              <Field name="categoriesDepenses" v-model="categoriesDepenses" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="categoriesDepensesOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la categorie Depense"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La categorie depense  est obligatoire</span>
            </div>
          </div>

           
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Créer un document
              </button>
              <router-link to="/documents/liste-document" 
                  class=" btn btn-danger "><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
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
  import ApiService from '@/services/ApiService';
  import { Document } from '@/models/Document';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  
  
  export default defineComponent({
      name: "AddDocument",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
    },
  
    setup: () => {
      const documentSchema = Yup.object().shape({
            nom: Yup.string().required("Le nom est obligatoire."),
            description: Yup.string().required("La description est obligatoire."),
            refDoc: Yup.string().required("La référence est obligatoire."),
            dateFinConservation: Yup.string().required("La date est obligatoire."),
            fichier: Yup.string().required("Le fichier est obligatoire."),
            typesDepenses: Yup.string().required("Le type de depense est obligatoire."),
            categoriesDepenses:Yup.string().required("La categorie depense est obligatoire."),
            personnel: Yup.string().required("Le personnel est obligatoire.")
            
      });
  
      onMounted(() => {
        getAllTypeDocument();
        getAllCategoriesDepenses();
        getAllPersonnels();
        getAllTypesDepenses();

      });
  
      const documentForm =  ref(null);
      const personnelOptions = ref();
      const typesDepenses = ref();
      const categoriesDepenses = ref();
      //const permissions = ref(null);
      const typeOptions = ref([]);
      const router = useRouter();
     // const permissions= ref<Array<Permission>>([]);
      const addDocument = async (values,{ resetForm }) => {
        values = values as Document;
        console.log('je recupère', values)
        ApiService.post("/documents",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message)
            resetForm();
            router.push({ name: "ListeDocumentPage" });
          }
        }).catch(({ response }) => {
          error(response.message);
        });
      }
  
      const getAllTypeDocument = async () => {
        try{
        const response = await ApiService.get('/all/types');
        const typesData = response.data.data;

        typeOptions.value = typesData.map((type) => ({
          value: type.id,
          label: type.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
      const getAllTypesDepenses= async () => {
        try{
        const response = await ApiService.get('/all/typesDepenses');
        const typesDepensesData = response.data.data.data;
        typesDepensesOptions.value = typesDepensesData.map((typesDepenses) => ({
          value: typesDepenses.id,
          label: typesDepenses.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllCategoriesDepenses= async () => {
        try{
        const response = await ApiService.get('/all/categoriesDepenses');
        const categoriesDepensesData = response.data.data.data;
        categoriesDepensesOptions.value = categoriesDepensesData.map((categoriesDepenses) => ({
          value: categoriesDepenses.id,
          label: categoriesDepenses.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
      const getAllPersonnels = async () => {
        try{
        const response = await ApiService.get('/personnels');
        const personnelsData = response.data;
        console.log('Data', personnelsData)
        personnelOptions.value = personnelsData.map((personnel) => ({
          value: personnel.id,
          label: personnel.nom + " " + personnel.prenom,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      }
   

  
      return { documentSchema, addDocument, showMErr,documentForm,typeOptions,categoriesDepensesOptions,typesDepensesOptions,personnelOptions};
    },
  });
  </script>