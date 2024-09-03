<template>
    <div class="card mb-25 border-0 rounded-0 bg-white edit-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="depensesForm" @submit="editDepenses" :validation-schema="depensesSchema">
              <div class="row">
                <div class="col-md-4 mt-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de depense <span class="text-danger">*</span>
                  </label>
                  <Field name="date" type="date" :value="getCurrentDate"
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="date" class="text-danger"/>
              </div>
          
                <div class="col-md-4 mt-3">
                  <label for="libelle" class="form-label"> Libelle<span class="text-danger">*</span></label>
                  <Field name="libelle"  class="form-control" type="text" placeholder="Entrer le libelle"/>
                  <ErrorMessage name="libelle" class="text-danger" />
          </div>

          <div class="col-md-4 mt-3">
                  <label for="description" class="form-label"> Description<span class="text-danger">*</span></label>
                  <Field name="description"  class="form-control" type="text" placeholder="Entrer la description"/>
                  <ErrorMessage name="description" class="text-danger" />
               </div>
          
               <div class="col-md-4 mt-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant<span class="text-danger">*</span>
                </label>
                <Field name="montant" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montant" class="text-danger"/>
              </div>
            </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Entretien <span class="text-danger">*</span>
              </label>
              <Field name="entretien" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="entretienOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner l'entretien"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">L'Entretien  est obligatoire</span>

              <ErrorMessage name="entretien" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Planification Reparation <span class="text-danger">*</span>
              </label>
              <Field name="planificationReparation" v-model="planificationReparation" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="planificationReparationOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la planification Reparation"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La Planification Reparation  est obligatoire</span>
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
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif<span class="text-danger">*</span>
              </label>
              <Field
                name="motif"
                as="textarea"
                cols="15"
                rows="6"
                placeholder="Entrer le motif"
                v-slot="{ field }"
                class="form-control shadow-none rounded-0 text-black"
              >
                <textarea
                  class="form-control shadow-none rounded-0 text-black"
                  v-model="field.value"
                ></textarea>
              </Field>
              <ErrorMessage name="motif" class="text-danger" />
            </div>
          </div>
         
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Modifier une dépense
              </button>
              <router-link to="/courses/liste-courses" 
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
  import { Depense } from '@/models/Depense';
  import { error, success } from '@/utils/utils';
  import { useRouter,useRoute } from 'vue-router';
  
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'
  
  
  
  
  export default defineComponent({
      name: "EditDepenses",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
      const depensesSchema = Yup.object().shape({
          
          
          libelle: Yup.string().required("Le libelle est obligatoire."),
          description: Yup.string().required("La description est obligatoire."),
          entretien: Yup.string().required("L'entretien est obligatoire."),      
          planificationReparation: Yup.string().required("La planification Reparation est obligatoire."),
          typesDepenses: Yup.string().required("Le type de depense est obligatoire."),
          categoriesDepenses:Yup.string().required("La categorie depense est obligatoire."),
          motif:Yup.string().required("Le motif est obligatoire."),
          montant:Yup.number().required("Le montant est obligatoire."),
          date: Yup.date().required('La date est obligatoire'),
    
    });
  
      onMounted(() => {
        getAllEntretien();
        getAllPlanificationReparation();
        getAllTypesDepenses();
        getAllCategoriesDepenses();
        getAllPersonnels();
        
       
      
      });
  
      const depensesForm =  ref(null);
      const showMErr = ref(false);
      const entretien = ref();
    const planificationReparation = ref();
    const typesDepenses = ref();
    const categoriesDepenses = ref();
    const personnelOptions = ref();
    
     
    const entretienOptions = ref([]);
    const planificationReparationOptions = ref([]);
    const typesDepensesOptions = ref([]);
    const categoriesDepensesOptions = ref([]);
  
      const router = useRouter();
      //const permissions= ref<Array<Permission>>([]);
  
  
      function getDepenses(id:number) {
      ApiService.get("/depenses/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            depensesForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editDepenses = async (values, {resetForm}) => {
      ApiService.put("/depenses/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeDepensesPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };


    const getAllEntretien = async () => {
        try{
        const response = await ApiService.get('/all/entretiens');
        const entretienData = response.data.data.data;
        console.log('Data', entretienData)
        entretienOptions.value = entretienData.map((entretien) => ({
          value: entretien.id,
          label: entretien.libelle,
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

      const getAllPlanificationReparation= async () => {
        try{
        const response = await ApiService.get('/all/planificationReparations');
        const planificationReparationData = response.data.data.data;
        planificationReparationOptions.value = planificationReparationData.map((planificationReparation) => ({
          value: planificationReparation.id,
          label: planificationReparation.libelle,
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
    
     
  
      return { depensesSchema, editDepenses, depensesForm,showMErr,entretienOptions,planificationReparationOptions,typesDepensesOptions,categoriesDepensesOptions,entretien,planificationReparation,typesDepenses,categoriesDepenses,personnelOptions};
    },
  });
  </script>