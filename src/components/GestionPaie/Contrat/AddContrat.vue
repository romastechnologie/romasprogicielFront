<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="contratForm" @submit="addContrat" :validation-schema="contratSchema">
              <div class="row">
              <div class="col-md-4">
                    <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refContrat" class="form-control" type="text"/>
                    <ErrorMessage name="refContrat" class="text-danger" />
            </div>
           
            <div class="col-md-4 mt-3">
                    <label for="dateDebut" class="form-label"> Date de début<span class="text-danger">*</span></label>
                    <Field name="dateDebut"  class="form-control" type="Date"/>
                    <ErrorMessage name="dateDebut" class="text-danger" />
            </div>
           
            <div class="col-md-4 mt-3">
                    <label for="dateFin" class="form-label"> Date de fin<span class="text-danger">*</span></label>
                    <Field name="dateFin"  class="form-control" type="Date"/>
                    <ErrorMessage name="dateFin" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="salaireDeBase" class="form-label">Salaire de base<span class="text-danger">*</span></label>
                    <Field name="salaireDeBase" class="form-control" type="text"/>
                    <ErrorMessage name="salaireDeBase" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="heuresTravaillees" class="form-label">Heures travaillées<span class="text-danger">*</span></label>
                    <Field name="heuresTravaillees" class="form-control" type="number"/>
                    <ErrorMessage name="heuresTravaillees" class="text-danger" />
            </div>
  
            <div class="col-md-4 mt-3">
                    <label for="renouvelable" class="form-label">Renouvelable</label>
                    <Field name="renouvelable" class="form-control" type="text"/>
                    <ErrorMessage name="renouvelable" class="text-danger" />
         </div>

         <div class="col-md-4 mt-3">
                    <label for="periodeEssai" class="form-label"> Période d'Essai<span class="text-danger">*</span></label>
                    <Field name="periodeEssai"  class="form-control" type="Date"/>
                    <ErrorMessage name="periodeEssai" class="text-danger" />
         </div>
         <div class="col-md-4 mt-3">
                    <label for="periodePaie" class="form-label"> Période de Paie<span class="text-danger">*</span></label>
                    <Field name="periodePaie"  class="form-control" type="Date"/>
                    <ErrorMessage name="periodePaie" class="text-danger" />
         </div>
            

         

          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type Contrat <span class="text-danger">*</span>
              </label>
              <Field name="types" v-model="types" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="typeOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le type"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le type de contrat est obligatoire</span>
            </div>
          </div>

          <!--<div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Catégorie Contrat <span class="text-danger">*</span>
              </label>
              <Field name="categories" v-model="categories" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="categorieOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la catégorie"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La catégorie de contrat est obligatoire</span>
            </div>
          </div>-->
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Ajouter un contrat
              </button>
              <router-link to="/contrats/liste-contrats" 
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
  import ApiService from '@/services/ApiService';
  import { Contrat } from '@/models/Contrat';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'


  
  
  export default defineComponent({
      name: "AddContrat",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
      const contratSchema = Yup.object().shape({
            refContrat: Yup.string().required("La référence est obligatoire."),
            salaireDeBase: Yup.string().required("Le nom est obligatoire."),
            heuresTravaillees: Yup.number().typeError("veuillez entrer des nombres").required("Le cout d'aquisition est obligatoire."),
            dateDebut: Yup.date().typeError("veuillez entrer une date valide").required("La date de début est obligatoire."),
            dateFin: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            periodeEssai: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            periodePaie: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            renouvelable: Yup.string().notRequired(),
            types: Yup.string().required("Le type est obligatoire."),
      });
  
      onMounted(() => {
        getAllTypeContrat()
        //getAllCategorieContrat()
      });
  
      const contratForm =  ref(null);
      const showMErr = ref(false);
      const types = ref();
      //const categories = ref();
      
      //const permissions = ref(null);
      const typeOptions = ref([]);
      //const categorieOptions = ref([]);
      const router = useRouter();
      //const permissions= ref<Array<Permission>>([]);
  

      const addContrat = async (values: any, { resetForm }) => {
      values['types'] = types.value.value
     // values['categories'] = categories.value.value
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/contrats", values)
           .then(({ data }) => {
             if (data.code == 201) {
              success(data.message);
               //resetForm();
             console.log('flefelef')
              router.push({ name: "ListeContrat" });
           }
           }).catch(({ response }) => {
            error(response.data.message);
          });
       }
    };

      const getAllTypeContrat = async () => {
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

      /*const getAllCategorieContrat = async () => {
        try{
        const response = await ApiService.get('/all/categories');
        const categoriesData = response.data.data;

        categorieOptions.value = categoriesData.map((categorie) => ({
          value: categorie.id,
          label: categorie.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } */
  
      return { contratSchema, addContrat, contratForm,typeOptions,showMErr,categorieOptions,types,categories};
    },
  });
  </script>