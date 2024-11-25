<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="entretienForm" @submit="editEntretien" :validation-schema="entretienSchema" :initial-values="entretienForm">
          <div class="row">
            <div class="col-md-4">
                    <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="reference" class="form-control" type="text"/>
                    <ErrorMessage name="reference" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="libelle" class="form-label">Libelle<span class="text-danger">*</span></label>
                    <Field name="libelle" class="form-control" type="text"/>
                    <ErrorMessage name="libelle" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="dateRealisation" class="form-label">Date de réalisation<span class="text-danger">*</span></label>
                    <Field name="dateRealisation" class="form-control" type="date"/>
                    <ErrorMessage name="dateRealisation" class="text-danger" />
            </div>
  
            <div class="col-md-4 mt-3">
                    <label for="description" class="form-label"> Description<span class="text-danger">*</span></label>
                    <Field name="description"  class="form-control" type="text"/>
                    <ErrorMessage name="description" class="text-danger" />
            </div>
        
            <div class="col-md-4 mt-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Bien <span class="text-danger">*</span>
                </label>
                <Field name="bien" v-model="biens" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="bienOptions" :preserve-search="true"
                   :multiple="false" :searchable="true" placeholder="Sélectionner le bien"
                  label="label" track-by="label" />
                </Field>
                <span class="text-danger" v-if="showMErr">Le bien est obligatoire</span>
              </div>
            </div>
  
            <div class="col-md-4 mt-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                 Type d'entretien<span class="text-danger">*</span>
                </label>
                <Field name="typeentretien" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="typeEntretienOptions" :preserve-search="true"
                   :multiple="false" :searchable="true" placeholder="Sélectionner le type entretien"
                  label="label" track-by="label" />
                </Field>
                <ErrorMessage name="typeentretien" class="text-danger" />
              </div>
            </div>
            
            
        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier entretien
            </button>
            <router-link to="/entretiens/liste-entretiens" 
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
import { Entretien} from '@/models/Entretien';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditEntetien",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const entretienSchema = Yup.object().shape({
      reference: Yup.string().required("La référence est obligatoire."),
            libelle: Yup.string().required("Le libelle est obligatoire."),   
            dateRealisation: Yup.string().required("La date de réalisation est obligatoire."),
            description: Yup.string().required("La description est obligatoire."),
            typeentretien: Yup.string().required("Le type d'entretien est obligatoire."),
            bien: Yup.string().required("Le bien est obligatoire."),
    });

    const entretienForm = ref<Entretien>();
      const showMErr = ref(false);
      const typeentretien = ref();
      const biens = ref();
      const typeEntretienOptions = ref();
      const bienOptions = ref([]);
    const router = useRouter();
    const route = useRoute();



    function getEntretien(id:number) {
      ApiService.get("/entretiens/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            entretienForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }
    
    const getAllTypeEntretiens = async () => {
          try{
          const response = await ApiService.get('/all/typeEntretiens');
          const typeEntretiensData = response.data.data.data;
          console.log('Data', typeEntretiensData)
          typeEntretienOptions.value = typeEntretiensData.map((typeEntretien) => ({
            value: typeEntretien.id,
            label: typeEntretien.libelle,
          }));
          }
          catch(error){
            //error(response.data.message)
          }
        }
        const getAllBiens= async () => {
          try{
          const response = await ApiService.get('/all/biens');
          const biensData = response.data.data.data;
          bienOptions.value = biensData.map((bien) => ({
            value: bien.id,
            label: bien.nomBien,
          }));
          }
          catch(error){
            //error(response.data.message)
          }
        } 


const editEntretien = async (values, { resetForm }) => {
  try {
    const response = await ApiService.put(`/entretiens/${values.id}`, values);
    
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListeEntretienPage" });
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};


    onMounted(() => {
      getAllTypeEntretiens();
      getAllBiens();
      if(route.params.id) {
        getEntretien(parseInt(route.params.id as string));
      }
    });

    return { 
      entretienSchema, editEntretien, entretienForm, typeentretien,biens,typeEntretienOptions,bienOptions,showMErr
    };
  },
});
</script>