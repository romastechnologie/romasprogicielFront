<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="commandeClientForm" @submit="addCommandeClient" :validation-schema="commandeClientSchema">
          <div class="row">
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Statut<span class="text-danger">*</span>
                </label>
                <Field  name="statutCommande"  v-slot="{ field }">
                  <Multiselect
                    :options="['Total','Partiel']"
                    :searchable="true"
                    track-by="value"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le statut"
                  />
                </Field>  
              </div>
              <ErrorMessage name="statutCommande" class="text-danger"/>
            </div>
            <div class="col-md-6 mb-3">
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
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse Livraison <span class="text-danger">*</span>
                </label>
                <Field  name="adresseLivraison"  v-slot="{ field }">
                  <Multiselect
                    :options="adresseLivraisonOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner l' adresse de livraison"
                  />
                </Field>  
              </div>
              <ErrorMessage name="adresseLivraison" class="text-danger"/>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant HT <span class="text-danger">*</span>
                </label>
                <Field name="montHT" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montHT" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant TTC <span class="text-danger">*</span>
                </label>
                <Field name="montTTC" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montTTC" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant Total <span class="text-danger">*</span>
                </label>
                <Field name="montTotal" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montTotal" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Remise <span class="text-danger">*</span>
                </label>
                <Field name="remise" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la remise"/>
                <ErrorMessage name="remise" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de commande <span class="text-danger">*</span>
                  </label>
                  <Field name="dateCommande" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateCommande" class="text-danger"/>
              </div>
            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter une commande de Client
                </button>
                <router-link to="/commandes-clients/liste-commande-client" 
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

import { defineComponent, ref, watch,onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { CommandeClient } from '@/models/CommandeClient';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddCommandeClient",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const commandeClientSchema = Yup.object().shape({
      statutCommande: Yup.string().required('Le statut de la commande est obligatoire'),
      client: Yup.string().required('Le client est obligatoire'),
      adresseLivraison: Yup.string().notRequired(),
      montHT: Yup.number().typeError('Veuiller entrer un nombre').required('Le montant HT est obligatoire').positive('Le montant HT doit être positif'),
      montTTC: Yup.number().typeError('Veuiller entrer un nombre').required('Le montant TTC est obligatoire').positive('Le montant TTC doit être positif'),
      montTotal: Yup.number().typeError('Veuiller entrer un nombre').required('Le montant total est obligatoire').positive('Le montant total doit être positif'),
      remise: Yup.number().typeError('Veuiller entrer un nombre').required('La remise est obligatoire').positive('La remise doit être positive'),
      dateCommande: Yup.date().required('La date de commande est obligatoire'),
    });

    const commandeClientForm =  ref<CommandeClient | null>(null);
    const router = useRouter();
    const adresseLivraisonOptions = ref([]);
    const clientOptions = ref([]);

    const addCommandeClient = async (values, {resetForm}) => {
      ApiService.post("/commandeClients",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeCommandeClientPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchClient = async () => {
      try {
        const response = await ApiService.get('/clients');
        const clientData = response.data.data.data;
        clientOptions.value = clientData.map((client) => ({
          value: client.id,
          label: `${client.nomClient}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchAdresseLivraison = async () => {
      try {
        const response = await ApiService.get('/adresseLivraisons');
        const adresseLivraisonData = response.data.data.data;
        adresseLivraisonOptions.value = adresseLivraisonData.map((adresseLivraison) => ({
          value: adresseLivraison.id,
          label: `${adresseLivraison.nom}`,
        }));
      } catch (error) {
        //
      }
    };


    onMounted(() => {
      fetchClient();
      fetchAdresseLivraison();
    });

    return { commandeClientSchema,
       addCommandeClient,
        commandeClientForm,clientOptions,
      adresseLivraisonOptions,
      };
  },
});
</script>