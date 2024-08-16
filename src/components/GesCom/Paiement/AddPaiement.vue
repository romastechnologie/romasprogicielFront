<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="paiementForm" @submit="addPaiement" :validation-schema="paiementSchema">
          <div class="row">
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de paiement <span class="text-danger">*</span>
                  </label>
                  <Field name="date" type="date" :value="getCurrentDate"
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="date" class="text-danger"/>
              </div>
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Facture <span class="text-danger">*</span>
                </label>
                <Field  name="facture"  v-slot="{ field }">
                  <Multiselect
                    :options="factureOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la facture"
                  />
                </Field>  
              </div>
              <ErrorMessage name="facture" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Mode de Paiement <span class="text-danger">*</span>
                </label>
                <Field  name="modePaiement"  v-slot="{ field }">
                  <Multiselect
                    :options="modePaiementOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le mode de Paiement"
                  />
                </Field>  
              </div>
              <ErrorMessage name="modePaiement" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant dû<span class="text-danger">*</span>
                </label>
                <Field name="montantDu" type="text" :readonly="true"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant de la facture"/>
                <ErrorMessage name="montantDu" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant payé<span class="text-danger">*</span>
                </label>
                <Field name="montantPaye" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant payé"/>
                <ErrorMessage name="montantPaye" class="text-danger"/>
              </div>
            </div>
            <!-- <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant Regle<span class="text-danger">*</span>
                </label>
                <Field name="montantRegle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montantRegle" class="text-danger"/>
              </div>
            </div> -->
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant Reste à payer <span class="text-danger">*</span>
                </label>
                <Field name="montantRest" type="text" :readonly="true"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montantRest" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant reçu<span class="text-danger">*</span>
                </label>
                <Field name="montantRecu" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montantRecu" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Reliquat<span class="text-danger">*</span>
                </label>
                <Field name="reliquat" type="text" :readonly="true"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le reliquat"/>
                <ErrorMessage name="reliquat" class="text-danger"/>
              </div>
            </div>
            <!-- <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Transaction <span class="text-danger">*</span>
                </label>
                <Field  name="paiement"  v-slot="{ field }">
                  <Multiselect
                    :options="paiementOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la paiement"
                  />
                </Field>  
              </div>
              <ErrorMessage name="paiement" class="text-danger"/>
            </div> -->
            
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                  Enregistrer un paiement
                </button>
                <button
                  class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-primary"
                  onclick="window.print()"
                    >
                      Enregistrer et Imprimer
                </button>
                <router-link to="/liste-paiements" 
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
import { Paiement } from '@/models/Paiement';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddPaiement",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const paiementSchema = Yup.object().shape({
      montantPaye: Yup.number().required('Le montant payé est obligatoire'),
      montantDu: Yup.number().required('Le montant dû est obligatoire'),
      modePaiement: Yup.string().required('Le mode de paiement est obligatoire'),
      facture: Yup.string().required('La facture est obligatoire'),
      montantRecu: Yup.string().notRequired(),
      montantRest: Yup.string().notRequired(),
      reliquat: Yup.string().notRequired(),
      datePaiement: Yup.date().required('La date de paiement est obligatoire'),
    });

    const paiementForm =  ref<Paiement | null>(null);
    const router = useRouter();
    const factureOptions = ref([]);
    const paiementOptions = ref([]);
    const modePaiementOptions = ref([]);

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
        const response = await ApiService.get('/paiements');
        const paiementData = response.data.data.data;
        paiementOptions.value = paiementData.map((paiement) => ({
          value: paiement.id,
          label: `${paiement.intituleTransaction}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchModePaiement = async () => {
      try {
        const response = await ApiService.get('/modePaiements');
        const modePaiementData = response.data.data.data;
        modePaiementOptions.value = modePaiementData.map((modePaiement) => ({
          value: modePaiement.id,
          label: `${modePaiement.nomModePaiement}`,
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
      fetchModePaiement();
    })
    
    const addPaiement = async (values, {resetForm}) => {
      ApiService.post("/paiements",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListePaiementPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { paiementSchema,
       addPaiement,
        paiementForm,factureOptions,
        paiementOptions,modePaiementOptions,
        getCurrentDate
      };
  },
});
</script>