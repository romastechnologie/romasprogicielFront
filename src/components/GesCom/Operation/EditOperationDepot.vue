<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="operationForm" @submit="editOperation" :validation-schema="operationSchema" :initial-values="operationForm">
            <div class="row">
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
                Nature de l'opération <span class="text-danger">*</span>
              </label>
              <Field name="natureOperation" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la nature"/>
              <ErrorMessage name="natureOperation" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
               Type d'opération <span class="text-danger">*</span>
              </label>
              <Field  name="typeOperation"  v-slot="{ field }">
                <Multiselect
                  :options="typeOp"
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
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Modifier le dépôt
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
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { Operation} from '@/models/Operation';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditOperationDepot",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const operationSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libellé de l\'operation est obligatoire'),
      natureOperation: Yup.string().required('La nature de l\'operation est obligatoire'),
      typeOperation: Yup.string().required('Le type d\'operation est obligatoire'),
      client: Yup.string().required("Le client est obligatoire"),
    });

    const operationForm = ref<Operation>();
    const router = useRouter();
    const route = useRoute();
    const clientOptions = ref([]);
    const compteOptions = ref([]);

    const typeOp = 
      [
      {
          value: "1" ,
          label: "Personne physique"
      },
      {
          value: "2" ,
          label: "Personne Morale"
      }
    ];

    const natureOp = 
    [
    {
        value: "Vente" ,
        label: "Vente"
    },
    {
        value: "Achat" ,
        label: "Achat"
    }
  ];

    function getOperation(id:number) {
      ApiService.get("/operations/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            operationForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const editOperation = async (values, {resetForm}) => {
      const data = operationForm.value;
      ApiService.put("/operations/" + values?.id, values)
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

    const fetchClients = async () => {
      try {
        const response = await axios.get('/clients');
        const clientsData = response.data.data.data;
        clientOptions.value = clientsData.map((client) => ({
          value: client.id,
          label: `${client.nomClient ? client.nomClient : ''} ${client.prenomClient ? client.prenomClient : ''} ${client.raisonSociale ? client.raisonSociale : ''}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchComptes = async () => {
      try {
        const response = await axios.get('/comptes');
        const comptesData = response.data.data.data;
        compteOptions.value = comptesData.map((compte) => ({
          value: compte.id,
          label: `${compte.typeCompte.libelle} - ${compte.numCompte}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      if(route.params.id) {
        getOperation(parseInt(route.params.id as string));
      }
      fetchClients();
      fetchComptes();
    });

    return { 
      operationSchema, editOperation, operationForm, typeOp,
      clientOptions,compteOptions
    };
  },
});
</script>