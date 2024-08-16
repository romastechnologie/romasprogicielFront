<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="depenseForm" @submit="addDepense" :validation-schema="depenseSchema">
          <div class="row">
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de depense <span class="text-danger">*</span>
                  </label>
                  <Field name="date" type="date" :value="getCurrentDate"
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="date" class="text-danger"/>
              </div>
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Type de dépense <span class="text-danger">*</span>
                </label>
                <Field  name="typeDepense"  v-slot="{ field }">
                  <Multiselect
                    :options="typeDepenseOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le type de dépese"
                  />
                </Field>  
              </div>
              <ErrorMessage name="typeDepense" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant<span class="text-danger">*</span>
                </label>
                <Field name="montant" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montant" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Bénéficiaire<span class="text-danger">*</span>
                </label>
                <Field name="beneficiaire" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le bénéficiaire"/>
                <ErrorMessage name="beneficiaire" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif
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
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                  Ajouter une dépense
                </button>
                <router-link to="/depenses/liste-depenses" 
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

import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Depense } from '@/models/Depense';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddDepense",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const depenseSchema = Yup.object().shape({
      montant: Yup.number().required('Le montant payé est obligatoire'),
      typeDepense: Yup.string().required('Le mode de depense est obligatoire'),
      beneficiaire: Yup.string().notRequired(),
      dateDepense: Yup.date().required('La date de depense est obligatoire'),
    });

    const depenseForm =  ref<Depense | null>(null);
    const router = useRouter();
    const factureOptions = ref([]);
    const depenseOptions = ref([]);
    const typeDepenseOptions = ref([]);

    const fetchFacture = async () => {
      try {
        const response = await ApiService.get('/factures');
        const facturesData = response.data.data.data;
        factureOptions.value = facturesData.map((facture) => ({
          value: facture.id,
          label: `${facture.nom}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchTransaction = async () => {
      try {
        const response = await ApiService.get('/depenses');
        const depenseData = response.data.data.data;
        depenseOptions.value = depenseData.map((depense) => ({
          value: depense.id,
          label: `${depense.intituleTransaction}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchModeDepense = async () => {
      try {
        const response = await ApiService.get('/modeDepenses');
        const modeDepenseData = response.data.data.data;
        typeDepenseOptions.value = modeDepenseData.map((modeDepense) => ({
          value: modeDepense.id,
          label: `${modeDepense.nomModeDepense}`,
        }));
      } catch (error) {
        //
      }
    };

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    onMounted(()=> {
      fetchFacture();
      fetchTransaction();
      fetchModeDepense();
    })
    
    const addDepense = async (values, {resetForm}) => {
      ApiService.post("/depenses",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeDepensePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { depenseSchema,
       addDepense,
        depenseForm,factureOptions,
        depenseOptions,typeDepenseOptions,
        getCurrentDate
      };
  },
});
</script>