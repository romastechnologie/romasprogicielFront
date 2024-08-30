<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="courseForm" @submit="addCourse" :validation-schema="courseSchema">
            <div class="row">
            <div class="col-md-4">
                  <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
                  <Field name="refCourse" class="form-control" type="text"/>
                  <ErrorMessage name="refCourse" class="text-danger" />
          </div>
          <div class="col-md-4">
                  <label for="compteurInitial" class="form-label">Compteur Initial<span class="text-danger">*</span></label>
                  <Field name="compteurInitial" class="form-control" type="text"/>
                  <ErrorMessage name="compteurInitial" class="text-danger" />
          </div>
          <div class="col-md-4">
                  <label for="compteurFinal" class="form-label">Compteur Final<span class="text-danger">*</span></label>
                  <Field name="compteurFinal" class="form-control" type="number"/>
                  <ErrorMessage name="compteurFinal" class="text-danger" />
          </div>

          <div class="col-md-4 mt-3">
                  <label for="description" class="form-label"> Description<span class="text-danger">*</span></label>
                  <Field name="description"  class="form-control" type="text"/>
                  <ErrorMessage name="description" class="text-danger" />
          </div>
          <div class="col-md-4 mt-3">
                  <label for="pointDepart" class="form-label">Point de départ<span class="text-danger">*</span></label>
                  <Field name="pointDepart" class="form-control" type="text"/>
                  <ErrorMessage name="pointDepart" class="text-danger" />
          </div>
          <div class="col-md-4 mt-3">
                  <label for="destination" class="form-label">Destination<span class="text-danger">*</span></label>
                  <Field name="destination" class="form-control" type="text"/>
                  <ErrorMessage name="destination" class="text-danger" />
          </div>

          <div class="col-md-4 mt-3">
                  <label for="distancePacourue" class="form-label">Distance parcourue<span class="text-danger">*</span></label>
                  <Field name="distancePacourue" class="form-control" type="number"/>
                  <ErrorMessage name="distancePacourue" class="text-danger" />
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
          <div class="col-md-6 mb-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Bien <span class="text-danger">*</span>
              </label>
              <Field name="biens" v-model="biens" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="bienOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le bien"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le bien est obligatoire</span>
            </div>
          </div>

          
        <div class="col-md-12 mt-3">
          <div class="d-flex align-items-center ">
            <button class="btn btn-success me-3" type="submit">
                Ajouter un course
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
import { Course } from '@/models/Course';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import VueMultiselect from 'vue-multiselect'




export default defineComponent({
    name: "AddCourse",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect
  },

  setup: () => {
    const courseSchema = Yup.object().shape({
          refCourse: Yup.string().required("La référence est obligatoire."),
          compteurInitial: Yup.string().required("Le compteur est obligatoire."),
          compteurFinal: Yup.string().required("Le compteur est obligatoire."),
          description: Yup.string().required("La description est obligatoire."),
          destination: Yup.string().required("La destination est obligatoire."),
          pointDepart: Yup.string().required("Le point de départ est obligatoire."),
          distancePacourue: Yup.number().required("La distance est obligatoire."),
          personnel: Yup.string().required("Le personnel est obligatoire."),
          biens: Yup.string().required("Le personnel est obligatoire."),
    });

    onMounted(() => {
      getAllPersonnels();
      getAllBiens();
    });

    const courseForm =  ref(null);
    const showMErr = ref(false);
    const personnels = ref();
    const biens = ref();
    const personnelOptions = ref();
    const bienOptions = ref([]);
    
    //const permissions = ref(null);
    const typeOptions = ref([]);
    const categorieOptions = ref([]);
    const router = useRouter();
    //const permissions= ref<Array<Permission>>([]);


    const addCourse = async (values: any, { resetForm }) => {
    values['personnels'] = personnels.value.value
    values['biens'] = biens.value.value
    console.log('Données envoyées', values)
    if (showMErr.value === false) {
      ApiService.post("/courses", values)
         .then(({ data }) => {
           if (data.code == 201) {
            success(data.message);
             //resetForm();
           console.log('flefelef')
            router.push({ name: "ListeCourse" });
         }
         }).catch(({ response }) => {
          error(response.data.message);
        });
     }
  };

  const getAllPersonnels = async () => {
        try{
        const response = await ApiService.get('/personnels');
        const personnelsData = response.data.data.data;
        console.log('Data', personnelsData)
        personnelOptions.value = personnelsData.map((personnel) => ({
          value: personnel.id,
          label: personnel.nom,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      }
      const getAllBiens= async () => {
        try{
        const response = await ApiService.get('/all/biens');
        const biensData = response.data.data;
        bienOptions.value = biensData.map((bien) => ({
          value: bien.id,
          label: bien.nomBien,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
  
   

    return { courseSchema, addCourse, courseForm,bienOptions,showMErr,categorieOptions,personnels,biens,personnelOptions};
  },
});
</script>