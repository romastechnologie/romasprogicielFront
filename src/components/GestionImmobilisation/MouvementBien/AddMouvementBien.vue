<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="bienForm" @submit="addMouvementBien" :validation-schema="mouvementBienSchema">
              <div class="row">
              <div class="col-md-4">
                    <label for="refMouvement" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refMouvement" class="form-control" type="text"/>
                    <ErrorMessage name="refMouvement" class="text-danger"/>
            </div>
            <div class="col-md-4">
            <div class="form-group">
              <label class="d-block text-black ">
                Type Mouvement <span class="text-danger">*</span>
              </label>
              <Field name="typeMouvement" type="text" v-slot="{ field }">
                <VueMultiselect v-model="field.value" v-bind="field" :options="['Transfert', 'Affectation']"
                  :close-on-select="true" :clear-on-select="false" placeholder="Sélectionner le type" />
              </Field>
              <ErrorMessage name="typeMouvement" class="text-danger" />
            </div>
          </div>
            <div class="col-md-4">
                    <label for="dateMouvement" class="form-label">Date Mouvement<span class="text-danger">*</span></label>
                    <Field name="dateMouvement" class="form-control" type="date"/>
                    <ErrorMessage name="dateMouvement" class="text-danger"/>
            </div>
            <div class="col-md-4">
                    <label for="infosComplementaire" class="form-label">Infos complementaire</label>
                    <Field name="infosComplementaire" class="form-control" type="text"/>
                    <ErrorMessage name="infosComplementaire" class="text-danger"/>
            </div>
            <div class="col-md-4">
                    <label for="ancienEmplacement" class="form-label">Ancien Emplacement<span class="text-danger">*</span></label>
                    <Field name="ancienEmplacement" class="form-control" type="text"/>
                    <ErrorMessage name="ancienEmplacement" class="text-danger"/>
            </div>
            <div class="col-md-4">
                    <label for="nouvelEmplacement" class="form-label">Nouvel Emplacement<span class="text-danger">*</span></label>
                    <Field name="nouvelEmplacement" class="form-control" type="text"/>
                    <ErrorMessage name="nouvelEmplacement" class="text-danger" />
            </div>

            <div class="col-md-6 mb-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Bien <span class="text-danger">*</span>
              </label>
              <Field name="biens" v-model="biens" type="text" v-slot="{ field }">
              <VueMultiselect v-model="field.value" v-bind="field" :options="typeOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le bien"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le bien est obligatoire</span>
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Créer un mouvement
              </button>
              <router-link to="/mouvementBiens/liste-mouvementbiens" 
                  class=" btn btn-danger"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                  <span class="position-relative"></span>Annuler</router-link>
            </div>
          </div>
          </div>
      </Form>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  
  import { defineComponent, onMounted, ref} from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import ApiService from '@/services/ApiService';
  import { MouvementBien } from '@/models/MouvementBien';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'

  
  
  export default defineComponent({
      name: "AddMouvementBien",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
      const mouvementBienSchema = Yup.object().shape({
            refMouvement: Yup.string().required("La référence est obligatoire."),
            typeMouvement: Yup.string().required("Le type est obligatoire."),
            dateMouvement: Yup.date().required("la date est obligatoire."),
            infosComplementaire: Yup.string().notRequired(),
            ancienEmplacement: Yup.string().notRequired(),
            nouvelEmplacement: Yup.string().notRequired(),
            biens: Yup.string().required("Le bien est obligatoire.")
      });
  
      onMounted(() => {
        getAllBiens()
      });
  
      const bienForm =  ref(null);
      const typeOptions = ref([]);
      const router = useRouter();
      const showMErr = ref(false);
      const biens = ref();

      const addMouvementBien = async (values,{ resetForm }) => {
        values['biens'] = biens.value.value
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/mouvementBiens",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message)
            resetForm();
            router.push({ name: "ListeMouvementBien" });
          }
        }).catch(({ response }) => {
          error(response.message);
        });
      }
    }
  
      const getAllBiens = async () => {
        try{
        const response = await ApiService.get('/all/biens');
        const typesData = response.data.data;

        typeOptions.value = typesData.map((bien) => ({
          value: bien.id,
          label: bien.nomBien,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
  
      return {mouvementBienSchema, addMouvementBien, bienForm, typeOptions, biens, showMErr};
    },
  });
  </script>