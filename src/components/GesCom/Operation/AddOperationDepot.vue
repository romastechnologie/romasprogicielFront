<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="operationForm" @submit="addOperation" :validation-schema="operationSchema">
        <div class="row">
          
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
               Type d'opération <span class="text-danger">*</span>
              </label>
              <Field  name="typeOperation"  v-slot="{ field }">
                <Multiselect
                  :options="typeOptions"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model = "field.value"
                  v-bind = "field"
                  placeholder="Sélectionner le typeOperation"
                />
              </Field>  
            </div>
            <ErrorMessage name="typeOperation" class="text-danger"/>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Libelle <span class="text-danger">*</span>
              </label>
              <Field name="libelle" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
              <ErrorMessage name="libelle" class="text-danger"/>
            </div>
          </div>
          
          <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Compte <span class="text-danger">*</span>
                </label>
                <Field  name="compte"  v-slot="{ field }">
                  <Multiselect
                    :options="compteOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le compte"
                  />
                </Field>  
              </div>
              <ErrorMessage name="compte" class="text-danger"/>
            </div>

            <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Montant <span class="text-danger">*</span>
              </label>
              <Field name="montant" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
              <ErrorMessage name="montant" class="text-danger"/>
            </div>
          </div>

          <!-- <div class="col-md-6">
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
            </div> -->

          <div class="col-md-12 mt-3">
            <div class="d-flex justify-content-start mb-4 ">
              <button
                class="btn btn-success me-3"
                type="submit"
              >
                  Faire le dépôt
              </button>
              <router-link to="/liste-operations" 
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
import { Operation } from '@/models/Operation';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "AddOperationDepot",
  components: {
  Form,
  Field,
  ErrorMessage,
  Multiselect
},
setup: () => {
  const operationSchema = Yup.object().shape({
    libelle: Yup.string().required('Le libellé de l\'operation est obligatoire'),
    typeOperation: Yup.string().required('La type de l\'operation est obligatoire'),
    montant: Yup.number().typeError('Le montant doit être un nombre').required("Le montant est obligatoire"),
    compte: Yup.number().required("Le compte est obligatoire"),
  });

  const operationForm =  ref<Operation | null>(null);
  const router = useRouter();
  //const clientOptions = ref([]);
  const compteOptions = ref([]);
  const typeOptions = ref([]);

    const addOperation = async (values, { resetForm }) => {
    values.montant = parseFloat(values.montant);
    //values.nature = "Crédit";
    ApiService.post("/encaissements", values)
      .then(({ data }) => {
        if (data.code == 200) { 
          success(data.message);
          resetForm();
          router.push({ name: "ListeOperationPage" });
        }
      }).catch(({ response }) => {
        error(response.data.message);
      });
  };


  // const fetchClients = async () => {
  //     try {
  //       const response = await axios.get('/clients');
  //       const clientsData = response.data.data.data;
  //       clientOptions.value = clientsData.map((client) => ({
  //         value: client.id,
  //         label: `${client.nomClient ? client.nomClient : ''} ${client.prenomClient ? client.prenomClient : ''} ${client.raisonSociale ? client.raisonSociale : ''}`,
  //       }));
  //     } catch (error) {
  //       //
  //     }
  //   };

    const fetchComptes = async () => {
      try {
        const response = await axios.get('all//comptes');
        const comptesData = response.data.data.data;
        compteOptions.value = comptesData.map((compte) => ({
          value: compte.id,
          label: `${compte.client.nomClient} - ${compte.client.prenomClient} -${compte.typeCompte === 1 ? 'Dépôt pour vente' : 'Vente à crédit'}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchTypeOperations = async () => {
        try {
            const response = await axios.get('all/typeoperations');
            const typeoperationsData = response.data.data.data;
            const encaissementOperations = typeoperationsData.filter(typeoperation => typeoperation.nature === "Crédit");
            typeOptions.value = encaissementOperations.map((typeoperation) => ({
                value: typeoperation.libelle,
                label: `${typeoperation.libelle}`,
            }));
        } catch (error) {
            console.error(error);
            // Gérer les erreurs si nécessaire
        }
    };

    onMounted(()=> {
      fetchComptes();
      //fetchClients();
      fetchTypeOperations();
    })

  return { operationSchema,
     addOperation,
      operationForm,typeOptions,
      //clientOptions,
      compteOptions,
    };
},
});
</script>