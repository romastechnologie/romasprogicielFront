<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="courseForm" @submit="addCourse" :validation-schema="courseSchema">
            <div class="row">
            <div class="col-md-4">
                  <label for="reference" class="form-label">Référence<span class="text-danger">*</span></label>
                  <Field name="reference" class="form-control" type="text"/>
                  <ErrorMessage name="reference" class="text-danger" />
          </div>
          <div class="col-md-4">
                  <label for="compteurInitial" class="form-label">Compteur Initial<span class="text-danger">*</span></label>
                  <Field name="compteurInitial" class="form-control" type="text"/>
                  <ErrorMessage name="compteurInitial" class="text-danger" />
          </div>
          <div class="col-md-4">
                  <label for="compteurfinalretour" class="form-label">Compteur Final<span class="text-danger">*</span></label>
                  <Field name="compteurfinalretour" class="form-control" type="number"/>
                  <ErrorMessage name="compteurFinalretour" class="text-danger" />
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
                  <label for="distanceParcourue" class="form-label">Distance parcourue<span class="text-danger">*</span></label>
                  <Field name="distanceParcourue" class="form-control" type="number"/>
                  <ErrorMessage name="distanceParcourue" class="text-danger" />
          </div>
          <div class="col-md-4 mt-3">
              <label>
                  Personnel <span class="text-danger">*</span>
                </label>
                <Field name="personnel" v-slot="{ field }">
                  <Multiselect
                    :options="personnelOptions"
                    :searchable="true"
                    track-by="value"
                    label="label"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner le personnel"
                  />
                </Field>
              <ErrorMessage name="personnel" class="text-danger" />
          </div>

          <div class="col-md-4 mt-3">
              <label>
                  Bien <span class="text-danger">*</span>
                </label>
                <Field name="bien" v-slot="{ field }">
                  <Multiselect
                    :options="bienOptions"
                    :searchable="true"
                    track-by="value"
                    label="label"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner le bien"
                  />
                </Field>
              <ErrorMessage name="bien" class="text-danger" />
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
          reference: Yup.string().required("La référence est obligatoire."),
          compteurInitial: Yup.string().required("Le compteur est obligatoire."),
          compteurfinalretour: Yup.string().required("Le compteur est obligatoire."),
          description: Yup.string().required("La description est obligatoire."),
          destination: Yup.string().required("La destination est obligatoire."),
          pointDepart: Yup.string().required("Le point de départ est obligatoire."),
          distanceParcourue: Yup.number().required("La distance est obligatoire."),
          personnel: Yup.string().required("Le personnel est obligatoire."),
          bien: Yup.string().required("Le bien est obligatoire."),
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



  const addCourse = async (values, { resetForm }) => {
      ApiService.post("/sortie", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeCoursePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };
    
      const getAllPersonnels  = async () => {
      try {
        const response = await axios.get('all/personnels');
        personnelOptions.value = response.data.data.data.map(personnel => ({
          value: personnel.id,
          label: personnel.nom + " " + personnel.prenom,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des personnels.");
      }
    };

    const getAllBiens  = async () => {
      try {
        const response = await axios.get('/all/biens');
        bienOptions.value = response.data.data.data.map(bien => ({
          value: bien.id,
          label: bien.nomBien,
        }));

      } catch (err) {
        error("Erreur lors de la récupération des biens.");
      }
    };

    return { courseSchema, addCourse, courseForm,bienOptions,showMErr,categorieOptions,personnels,biens,personnelOptions};
  },
});
</script>