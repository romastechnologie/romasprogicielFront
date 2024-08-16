<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="compteForm" @submit="addCompte" :validation-schema="compteSchema">
          <div class="row">
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
                  Intitulé compte <span class="text-danger">*</span>
                </label>
                <Field name="intituleCompte" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l' intitule du compte"/>
                <ErrorMessage name="intituleCompte" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Dépot initial <span class="text-danger">*</span>
                </label>
                <Field name="depot" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le depot"/>
                <ErrorMessage name="depot" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                  Faire un compte
                </button>
                <router-link to="/comptes/liste-comptes" 
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
import { Compte } from '@/models/Compte';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddCompte",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const compteSchema = Yup.object().shape({
      client: Yup.string().required('Le client est obligatoire'),
      //fournisseur: Yup.string().required('Le fournisseur est obligatoire'),
      intituleCompte: Yup.string().required('L\'intitule de compte est obligatoire'),
      depot: Yup.number().typeError('Veuillez entrer des chiffres').required('Le depot est obligatoire'),
    });

    const compteForm =  ref<Compte | null>(null);
    const router = useRouter();
    const clientOptions = ref([]);
    const fournisseurOptions = ref([]);

    const fetchClient = async () => {
      try {
        const response = await ApiService.get('/clients');
        const clientsData = response.data.data.data;
        clientOptions.value = clientsData.map((client) => ({
          value: client.id,
          label: `${client.nomClient}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchFournisseur = async () => {
      try {
        const response = await ApiService.get('/fournisseurs');
        const fournisseurData = response.data.data.data;
        fournisseurOptions.value = fournisseurData.map((fournisseur) => ({
          value: fournisseur.id,
          label: `${fournisseur.nom}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(()=> {
      fetchClient();
      fetchFournisseur()
    })
    
    const addCompte = async (values, {resetForm}) => {
      ApiService.post("/comptes",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeComptePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { compteSchema,
       addCompte,
        compteForm,clientOptions,
        fournisseurOptions,
      };
  },
});
</script>