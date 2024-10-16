<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="personnelPosteForm" @submit="addPersonnelPoste" :validation-schema="personnelPosteSchema">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nombre de Poste <span class="text-danger">*</span>
                </label>
                <Field name="nombrePoste" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nombre"/>
                <ErrorMessage name="nombrePoste" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Etat <span class="text-danger">*</span>
                </label>
                <Field name="etat" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'état"/>
                <ErrorMessage name="etat" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date début <span class="text-danger">*</span>
                  </label>
                  <Field name="dateDebutFonc" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateDebutFonc" class="text-danger"/>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de fin <span class="text-danger">*</span>
                  </label>
                  <Field name="dateFinFonc" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateFinFonc" class="text-danger"/>
              </div>
              <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Personnel <span class="text-danger">*</span>
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
                  Poste <span class="text-danger">*</span>
                </label>
                <Field  name="poste"  v-slot="{ field }">
                  <Multiselect
                    :options="postesOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le poste"
                  />
                </Field>  
              </div>
              <ErrorMessage name="poste" class="text-danger"/>
            </div>
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter un personnel en Poste
                </button>
                <router-link to="/liste-personnelPostes" 
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
import { PersonnelPoste } from '@/models/PersonnelPoste';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddPersonnelPoste",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const personnelPosteSchema = Yup.object().shape({
      nombreFonction: Yup.number().typeError('Veuillez entrer des chiffres').required('Le nombre est obligatoire'),
      dateDebutFonc: Yup.date().required('La date de début est obligatoire'),
      dateFinFonc: Yup.date().required('La date de fin est obligatoire'),
      etat: Yup.string().required('L\' état est obligatoire'),
      personnel: Yup.string().required('Le personnel est obligatoire'),
      poste: Yup.string().required('Le poste est obligatoire'),
    });

    const personnelPosteForm =  ref<PersonnelPoste | null>(null);
    const router = useRouter();
    const personnelOptions = ref([]);
    const postesOptions = ref([]);

    const addPersonnelPoste = async (values, {resetForm}) => {
      ApiService.post("/personnelPostes",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListePersonnelPostesPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchPersonnel = async () => {
      try {
        const response = await ApiService.get('/personnels');
        const personnelData = response.data;
        personnelOptions.value = personnelData.map((personnel) => ({
          value: personnel.id,
          label: `${personnel.nom} ${personnel.prenom}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchPoste = async () => {
      try {
        const response = await ApiService.get('/postes');
        const posteData = response.data.data.data;
        postesOptions.value = posteData.map((poste) => ({
          value: poste.id,
          label: `${poste.fonction} - ${poste.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchPersonnel();
      fetchPoste();
    });

    return { personnelPosteSchema,
       addPersonnelPoste,
        personnelPosteForm,
        personnelOptions,postesOptions

      };
  },
});
</script>