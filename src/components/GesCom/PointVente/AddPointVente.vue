<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="pointVenteForm" @submit="addPointVente" :validation-schema="pointVenteSchema">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom point de vente <span class="text-danger">*</span>
                </label>
                <Field name="nomPointVente" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomPointVente" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse <span class="text-danger">*</span>
                </label>
                <Field name="adresse" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adresse" class="text-danger"/>
              </div>
            </div>
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom gérant <span class="text-danger">*</span>
                </label>
                <Field  name="personnel"  v-slot="{ field }">
                  <Multiselect
                    :options="personnelOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le personnel"
                  />
                </Field>  
              </div>
              <ErrorMessage name="personnel" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Société <span class="text-danger">*</span>
                </label>
                <Field  name="societe"  v-slot="{ field }">
                  <Multiselect
                    :options="societeOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la societe"
                  />
                </Field>  
              </div>
              <ErrorMessage name="societe" class="text-danger"/>
            </div>
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter un point de vente
                </button>
                <router-link to="/liste-pointVentes" 
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
import { PointVente } from '@/models/PointVente';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddPointVente",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const pointVenteSchema = Yup.object().shape({
      nomPointVente: Yup.string().required('Le nom est obligatoire'),
      adresse: Yup.string().required('L\' adresse est obligatoire'),
      personnel: Yup.string().required('Le personnel est obligatoire'),
      societe: Yup.string().required('La societe est obligatoire'),
    });

    const pointVenteForm =  ref<PointVente | null>(null);
    const router = useRouter();
    const personnelOptions = ref([]);
    const societeOptions = ref([]);

    const addPointVente = async (values, {resetForm}) => {
      ApiService.post("/pointVentes",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListePointVentePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchPersonnel = async () => {
      try {
        const response = await ApiService.get('/personnels');
        const personnelData = response.data.data.data;
        personnelOptions.value = personnelData.map((personnel) => ({
          value: personnel.id,
          label: `${personnel.nom} ${personnel.prenom}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchSociete = async () => {
      try {
        const response = await ApiService.get('/societes');
        const societeData = response.data.data.data;
        societeOptions.value = societeData.map((societe) => ({
          value: societe.id,
          label: `${societe.nom}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchPersonnel();
      fetchSociete();
    });

    return { pointVenteSchema,
       addPointVente,
        pointVenteForm,
        personnelOptions,societeOptions

      };
  },
});
</script>