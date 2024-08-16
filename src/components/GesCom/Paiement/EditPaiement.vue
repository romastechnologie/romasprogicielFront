<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="paiementForm" @submit="editPaiement" :validation-schema="paiementSchema" :initial-values="paiementForm">
            <div class="row">
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant Regle<span class="text-danger">*</span>
                </label>
                <Field name="montantRegle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montantRegle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant Restant<span class="text-danger">*</span>
                </label>
                <Field name="montantRest" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montantRest" class="text-danger"/>
              </div>
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
                  Paiement <span class="text-danger">*</span>
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
            </div>
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de paiement <span class="text-danger">*</span>
                  </label>
                  <Field name="date" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="date" class="text-danger"/>
              </div>
        <div class="col-md-12">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier une paiement
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

import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { Paiement} from '@/models/Paiement';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditPaiement",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const paiementSchema = Yup.object().shape({
      montantRegle: Yup.number().required('Le montant réglé est obligatoire'),
      montantRest: Yup.number().required('Le montant restant est obligatoire'),
      modePaiement: Yup.string().required('Le mode de paiement est obligatoire'),
      facture: Yup.string().required('La facture est obligatoire'),
      paiement: Yup.string().required('La paiement est obligatoire'),
      date: Yup.date().required('La date de paiement est obligatoire'),
    });

    const paiementForm =  ref<Paiement | null>(null);
    const factureOptions = ref([]);
    const paiementOptions = ref([]);
    const modePaiementOptions = ref([]);
    const router = useRouter();
    const route = useRoute();


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

    const fetchPaiement = async () => {
      try {
        const response = await ApiService.get('/paiements');
        const paiementData = response.data.data.data;
        paiementOptions.value = paiementData.map((paiement) => ({
          value: paiement.id,
          label: `${paiement.intitulePaiement}`,
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

    onMounted(()=> {
      if(route.params.id) {
        getPaiement(parseInt(route.params.id as string));
      }
      fetchFacture();
      fetchPaiement();
      fetchModePaiement();
    })

    function getPaiement(id:number) {
      ApiService.get("/paiements/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            paiementForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const editPaiement = async (values, {resetForm}) => {
      const data = paiementForm.value;
      ApiService.put("/paiements/" + data?.id, data)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListePaiementPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { 
      paiementSchema, editPaiement,
      paiementForm,factureOptions,
        paiementOptions,modePaiementOptions
      };
  },
});
</script>