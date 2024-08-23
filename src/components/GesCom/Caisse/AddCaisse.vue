<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="caisseForm" @submit="addCaisse" :validation-schema="caisseSchema">
          <div class="row">
            <!--<div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date d'ouverture <span class="text-danger">*</span>
                  </label>
                  <Field name="dateHeureOuv" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateHeureOuv" class="text-danger"/>
              </div>
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de fermerture <span class="text-danger">*</span>
                  </label>
                  <Field name="dateHeureFer" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateHeureFer" class="text-danger"/>
              </div>-->
              <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Code <span class="text-danger">*</span>
                </label>
                <Field name="code" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                <ErrorMessage name="code" class="text-danger"/>
              </div>
            </div>
              <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Libellé<span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div> 
            
            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter une caisse
                </button>
                <router-link to="/caisses/liste-caisses" 
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

import { defineComponent, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Caisse } from '@/models/Caisse';
import * as Yup from 'yup';
import axios from 'axios';

export default defineComponent({
    name: "AddCaisse",
    components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup: () => {
    const caisseSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libellé est obligatoire'),
      code: Yup.string().required('Le code est obligatoire'),
      //dateHeureOuv: Yup.date().required('La date d\'ouverture est obligatoire'),
      //dateHeureFer: Yup.date().required('La date de fermerture création'),
    });

    const caisseForm =  ref<Caisse | null>(null);
    const router = useRouter();


    const addCaisse = async (values, {resetForm}) => {
      ApiService.post("/caisses",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeCaissePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { caisseSchema,
       addCaisse,
        caisseForm,

      };
  },
});
</script>