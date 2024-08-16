<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="depotForm" @submit="addDepot" :validation-schema="depotSchema">
          <div class="row">
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de depot <span class="text-danger">*</span>
                  </label>
                  <Field name="date" type="date" :value="getCurrentDate"
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="date" class="text-danger"/>
              </div>
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Client <span class="text-danger">*</span>
                </label>
                <Field  name="client"  v-slot="{ field }">
                  <Multiselect
                    :options="clientOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le client"
                  />
                </Field>  
              </div>
              <ErrorMessage name="client" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Mode de paiment <span class="text-danger">*</span>
                </label>
                <Field  name="modePaiement"  v-slot="{ field }">
                  <Multiselect
                    :options="modePaiementOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le mode de paiement"
                  />
                </Field>  
              </div>
              <ErrorMessage name="modePaiement" class="text-danger"/>
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
                  Motif<span class="text-danger">*</span>
                </label>
                <Field name="motif" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le motif"/>
                <ErrorMessage name="motif" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
            </div>
            <div class="col-md-12 mb-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                 Enregistrer un dépot
                </button>
                <button
                  class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-primary"
                  onclick="window.print()"
                    >
                      Enregistrer et Imprimer
                </button>
                <router-link to="/depots/liste-depots" 
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
import { Depot } from '@/models/Depot';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddDepot",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const depotSchema = Yup.object().shape({
      montant: Yup.number().required('Le montant payé est obligatoire'),
      typeDepot: Yup.string().required('Le mode de depot est obligatoire'),
      beneficiaire: Yup.string().notRequired(),
      dateDepot: Yup.date().required('La date de depot est obligatoire'),
    });

    const depotForm =  ref<Depot | null>(null);
    const router = useRouter();
    const factureOptions = ref([]);
    const depotOptions = ref([]);
    const typeDepotOptions = ref([]);
    const clientOptions = ref([]);
    const modePaiementOptions = ref([]);

    const fetchModePaiement = async () => {
      try {
        const response = await ApiService.get('/modePaiements');
        const modePaiementsData = response.data.data.data;
        modePaiementOptions.value = modePaiementsData.map((modePaiement) => ({
          value: modePaiement.id,
          label: `${modePaiement.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

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
        const response = await ApiService.get('/depots');
        const depotData = response.data.data.data;
        depotOptions.value = depotData.map((depot) => ({
          value: depot.id,
          label: `${depot.intituleTransaction}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchModeDepot = async () => {
      try {
        const response = await ApiService.get('/modeDepots');
        const modeDepotData = response.data.data.data;
        typeDepotOptions.value = modeDepotData.map((modeDepot) => ({
          value: modeDepot.id,
          label: `${modeDepot.nomModeDepot}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchClient = async () => {
      try {
        const response = await ApiService.get("/clients");
        const fournisseurData = response.data.data.data;
        clientOptions.value = fournisseurData.map((client) => ({
          value: client.id,
          label: `${
            client.nomClient
              ? client.nomClient + '' + client.prenomClient
              : client.raisonSociale
          }`,
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
      fetchModeDepot();
      fetchClient();
      fetchModePaiement();
    })
    
    const addDepot = async (values, {resetForm}) => {
      ApiService.post("/depots",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeDepotPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { depotSchema,
       addDepot,
        depotForm,factureOptions,
        depotOptions,typeDepotOptions,
        getCurrentDate,clientOptions,
        modePaiementOptions,
      };
  },
});
</script>