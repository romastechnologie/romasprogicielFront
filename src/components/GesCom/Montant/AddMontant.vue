<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="montantForm" @submit="addMontant" :validation-schema="montantSchema">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Montant <span class="text-danger">*</span>
                </label>
                <Field name="montant" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montant" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Distance <span class="text-danger">*</span>
                </label>
                <Field  name="distance"  v-slot="{ field }">
                  <Multiselect
                    :options="distanceOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la distance"
                  />
                </Field>  
                <ErrorMessage name="distance" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Intervalle poids <span class="text-danger">*</span>
                </label>
                <Field  name="intervallePoids"  v-slot="{ field }">
                  <Multiselect
                    :options="intervallePoidsOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner l'intervalle poids"
                  />
                </Field>  
                <ErrorMessage name="intervallePoids" class="text-danger"/>
              </div>
            </div>
        <div class="col-md-12">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Ajouter un montant
            </button>
            <router-link to="/liste-montants" 
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
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Montant } from '@/models/Montant';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddMontant",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const montantSchema = Yup.object().shape({
      montant: Yup.string().required('Le montant est obligatoire'),
      intervallePoids: Yup.string().required('L\'intervalle est obligatoire'),
      distance: Yup.string().required('La distance est obligatoire'),
    });

    const montantForm = ref<Montant | null>(null);
    const router = useRouter();
    const distanceOptions = ref([]);
    const intervallePoidsOptions = ref([]);


    const addMontant = async (values, {resetForm}) => {
      ApiService.post("/montants",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeMontantPage"});
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchDistance = async () => {
      try {
        const response = await ApiService.get('/distances');
        const distanceData = response.data.data.data;
        distanceOptions.value = distanceData.map((distance) => ({
          value: distance.id,
          label: `${distance.distance} - ${distance.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchIntervallePoids = async () => {
      try {
        const response = await ApiService.get('/intervallePoids');
        const intervallePoidsData = response.data.data.data;
        intervallePoidsOptions.value = intervallePoidsData.map((intervallePoids) => ({
          value: intervallePoids.id,
          label: `${intervallePoids.debutIntervalle} - ${intervallePoids.finIntervalle}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchDistance();
      fetchIntervallePoids();
    });

    return { montantSchema, addMontant, 
      montantForm, intervallePoidsOptions,
    distanceOptions};
  },
});
</script>