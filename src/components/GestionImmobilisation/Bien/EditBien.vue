<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-bien-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="bienForm" @submit="editBien" :validation-schema="bienSchema" :initial-values="bienForm">
            <div class="row">
              <div class="col-md-4">
                    <label for="ref" class="form-label">Référence</label>
                    <Field name="refBien" class="form-control" type="text"/>
                    <ErrorMessage name="refBien" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="nomBien" class="form-label">Nom</label>
                    <Field name="nomBien" class="form-control" type="text"/>
                    <ErrorMessage name="nomBien" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="coutAcquisition" class="form-label">Cout Acquisition</label>
                    <Field name="coutAcquisition" class="form-control" type="number"/>
                    <ErrorMessage name="coutAcquisition" class="text-danger" />
            </div>
  
            <div class="col-md-4">
                    <label for="dateAcquisition" class="form-label"> Date d'Acquisition</label>
                    <Field name="dateAcquisition"  class="form-control" type="Date"/>
                    <ErrorMessage name="dateAcquisition" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="dureeVie" class="form-label">Duree de Vie</label>
                    <Field name="dureeVie" class="form-control" type="number"/>
                    <ErrorMessage name="dureeVie" class="text-danger" />
            </div>

            <div class="col-md-4">
                    <label for="dateMiseEnService" class="form-label">Date Mise Service</label>
                    <Field name="dateMiseEnService" class="form-control" type="Date"/>
                    <ErrorMessage name="dateMiseEnService" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="numeroEnregistrement" class="form-label">Numero Enregistrement</label>
                    <Field name="numeroEnregistrement" class="form-control" type="number"/>
                    <ErrorMessage name="numeroEnregistrement" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="codeBar" class="form-label">codeBar</label>
                    <Field name="codeBar" class="form-control" type="text"/>
                    <ErrorMessage name="codeBar" class="text-danger" />
         </div>
         <div class="col-md-4">
                    <label for="localisation" class="form-label">Localisation</label>
                    <Field name="localisation"  class="form-control" type="text"/>
                    <ErrorMessage name="localisation" class="text-danger" />
         </div>
         <div class="col-md-4">
                    <label for="longitude" class="form-label">Longitude</label>
                    <Field name="longitude" class="form-control" type="number"/>
                    <ErrorMessage name="longitude" class="text-danger"/>
         </div>
         <div class="col-md-4">
                    <label for="latitude" class="form-label">Latitude</label>
                    <Field name="latitude" class="form-control" type="number"/>
                    <ErrorMessage name="latitude" class="text-danger" />
         </div>
         <div class="col-md-4">
                    <label for="modeAmortissement" class="form-label">Mode Amortissement</label>
                    <Field name="modeAmortissement" class="form-control" type="text"/>
                    <ErrorMessage name="modeAmortissement"  class="text-danger"/>
         </div>
         <div class="col-md-4">
                    <label for="valeurNetteComptable" class="form-label">Valeur Nette Comptable</label>
                    <Field name="valeurNetteComptable" class="form-control" type="number"/>
                    <ErrorMessage name="valeurNettecomptable" class="text-danger" />
                    
          </div>
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type Bien <span class="text-danger">*</span>
                </label>
                <Field  name="type"  v-slot="{ field }">
                  <Multiselect
                    :options="typeOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le type"
                  />
                </Field>
                <ErrorMessage name="type" class="text-danger"/>
              </div>
            </div>
              <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="privileges" class="text-danger"/>
                    </div>
                </div>
                <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Categorie Bien <span class="text-danger">*</span>
                </label>
                <Field  name="categorie"  v-slot="{ field }">
                  <Multiselect
                    :options="categorieOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la catégorie"
                  />
                </Field>
                <ErrorMessage name="categorie" class="text-danger"/>
              </div>
            </div>
              <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="privileges" class="text-danger"/>
                    </div>
                </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button
                class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                type="submit"
              >
                  Ajouter un bien
              </button>
              <router-link to="/liste-biens" 
                  class=" btn btn-danger transition border-0 lh-1 fw-medium"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
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
    import { Bien } from '@/models/Bien';
    import Multiselect from '@vueform/multiselect/src/Multiselect';
  
  export default defineComponent({
      name: "EditBien",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
      
  },
  
  setup: () => {
    const bienSchema = Yup.object().shape({
            refBien: Yup.string().required("La référence est obligatoire."),
            nomBien: Yup.string().required("Le nom est obligatoire."),
            coutAcquisition: Yup.number().typeError("veuillez entrer des nombres").required("Le cout d'aquisition est obligatoire."),
            dateAcquisition: Yup.date().typeError("veuillez entrer une date valide").required("La date d'acquisition est obligatoire."),
            dureeVie: Yup.number().required("La durée de vie est obligatoire."),
            dateMiseEnService: Yup.date().required("La date de mise en service est obligatoire."),
            numeroEnregistrement: Yup.number().required("Le numero d'enregistrement est obligatoire."),
            codeBar: Yup.string().notRequired(),
            localisation: Yup.string().notRequired(),
            longitude: Yup.number().notRequired(),
            latitude: Yup.number().notRequired(),
            modeAmortissement: Yup.string().required("Le mode d'amortissement est obligatoire."),
            valeurNetteComptable: Yup.number().required("La valeur nette comptable est obligatoire."),
    });

    const typeOptions = ref([]);
    const categorieOptions = ref([]);
    const router = useRouter();
    const bienForm = ref<Bien>();
    const route = useRoute();
   

    onMounted(() => {
        getAllTypeBien();
        getAllCategorieBien();
      if(route.params.id) {
        getBien(parseInt(route.params.id as string));
      }
    });

    
    function getBien(id:number) {
      ApiService.get("/biens/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            bienForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editBien = async (values, {resetForm}) => {
      ApiService.put("/biens/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeBienPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };
    const getAllTypeBien = async () => {
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
      const getAllCategorieBien = async () => {
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
      } 
   
      return {bienForm,
         bienSchema,
          editBien,
          typeOptions,
          categorieOptions,
          
        };
    },
  });
  </script>