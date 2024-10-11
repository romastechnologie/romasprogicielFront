<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="circuitForm" @submit="addCircuit" :validation-schema="circuitSchema">
        <div class="row">
          <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="string" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nom" class="text-danger"/>
              </div>
            </div>

          <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Duree <span class="text-danger">*</span>
                </label>
                <Field name="Duree" type="number" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la Durée"/>
                <ErrorMessage name="Duree" class="text-danger"/>
              </div>
            </div>
          <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type de Durée <span class="text-danger">*</span>
                </label>
                <Field  name="typeDuree"  v-slot="{ field }">
                  <Multiselect
                    :options="typeDureeOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le type de Duree"
                  />
                </Field>  
              </div>
              <ErrorMessage name="typeDuree" class="text-danger"/>
            </div>
        
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter un Circuit
              </button>
              <router-link to="/circuits/liste-circuit" class=" btn btn-danger "><i
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

import { defineComponent, onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { Document } from '@/models/Document';
import { error, success,ajouterPeriode } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import axios from 'axios';


export default defineComponent({
  name: "AddCircuit",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },

  setup: () => {
    const circuitSchema = Yup.object().shape({
      nom: Yup.string().required("Le nom est obligatoire."),
      Duree: Yup.number().required("La Durée est obligatoire."),
      typeDuree: Yup.string().required("Le type de Duree est obligatoire."),
    });

    onMounted(async () => {
    });

    const circuitForm = ref(null);
    const typeDuree = ref();
    const nom = ref();
    //const showMErr = ref(false);
    //const permissions = ref(null);
    const router = useRouter();
    // const permissions= ref<Array<Permission>>([]);
    const typeDureeOptions = ref([]);

    typeDureeOptions.value = [{value:"jour(s)", label:"Jour(s)"}, {value:"mois", label:"Mois"},{value:"annees", label:"Annees"}]



   
    const addCircuit = async (values, {resetForm}) => {
      ApiService.post("/circuits",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeCircuitPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { circuitSchema,
       addCircuit,
        circuitForm,typeDureeOptions,
      };
    
  },
});
</script>