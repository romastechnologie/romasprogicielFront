<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
    <Form ref="montantForm" @submit="editMontant" :validation-schema="montantSchema">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Montant <span class="text-danger">*</span>
                </label>
                <Field name="montant" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montant" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
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
            <div class="col-md-4">
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
                Modifier le montant
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
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import { Montant } from '@/models/Montant';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditMontant",
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

    const montantForm = ref<Montant>();
    const router = useRouter();
    const route = useRoute();
    const distanceOptions = ref([]);
    const intervallePoidsOptions = ref([]);

    function getMontant(id:number) {
      ApiService.get("/montants/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            montantForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    } 

    const editMontant = async (values, {resetForm}) => {
      ApiService.put("/montants/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeMontantPage" });
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
          label: `${distance.code} - ${distance.libelle}`,
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
      if(route.params.id) {
        getMontant(parseInt(route.params.id as string));
      }
      fetchDistance();
      fetchIntervallePoids();
    });

    return { montantSchema, editMontant, montantForm,
      intervallePoidsOptions, distanceOptions};
  },
});
</script>