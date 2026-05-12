<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-amortissement-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="amortissementForm" @submit="editAmortissement" :validation-schema="amortissementSchema" :initial-values="amortissementForm">
          <div class="row">
            <div class="col-md-6">
                  <label for="taux" class="form-label">Taux d'amortissement</label>
                  <Field name="taux" class="form-control" type="number"/>
                  <ErrorMessage name="taux" class="text-danger"/>
          </div>
          <div class="col-md-6">
                  <label for="valeurNetteComptable" class="form-label">Valeur Nette Comptable</label>
                  <Field name="valeurNetteComptable" class="form-control" type="number"/>
                  <ErrorMessage name="valeurNetteComptable" class="text-danger"/>
          </div>
          <div class="col-md-6">
                  <label for="dureeUtilisation" class="form-label">Duree Utilisation</label>
                  <Field name="dureeUtilisation" class="form-control" type="number"/>
                  <ErrorMessage name="dureeUtilisation" class="text-danger" />
          </div>
          <div class="col-md-6 mb-4">
            <label class="d-block text-black mb-10">
              Bien <span class="text-danger">*</span>
            </label>
            <Field name="bien" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="bienOptions" :preserve-search="true"
                :multiple="false" :searchable="true" placeholder="Sélectionner le bien " label="label"
                track-by="value" />
            </Field>
              <ErrorMessage name="bien" class="text-danger" />
        </div>
        <div class="col-md-12">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3 m-2"
              type="submit">
                Modifier un amortissement
            </button>
            <router-link to="/amortissements/liste-amortissements" 
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
  import { defineComponent, onMounted, ref} from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import axios from 'axios';
  import ApiService from '@/services/ApiService';
  import { error, success } from '@/utils/utils';
  import { useRouter, useRoute } from 'vue-router';
  import { Amortissement } from '@/models/Amortissement';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'

export default defineComponent({
    name: "EditAmortissement",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect
    
},

setup: () => {
  
  onMounted(() => {
      getAllBiens();
    if(route.params.id) {
      getAmortissement(parseInt(route.params.id as string));
    }
  });
  const amortissementSchema = Yup.object().shape({
      bien: Yup.string().required("Le bien est obligatoire."),
      taux: Yup.number().required('Le taux est obligatoire'),
      valeurNetteComptable: Yup.number().required("La valeur nette comptable est obligatoire."),
      dureeUtilisation: Yup.number().required("La durée d'utilisation est obligatoire."),

    });
    const getAllBiens = async () => {
      try{
      const response = await ApiService.get('/all/biens');
      const biensData = response.data.data.data;
      console.log(biensData,"gggggggggg");
      bienOptions.value = biensData.map((bien) => ({
        value: bien.id,
        label: bien.nomBien,
      }));
      }
      catch(error){
      }
    } 
  function getAmortissement(id:number) {
    ApiService.get("/amortissements/"+id.toString())
      .then(({ data }) => {
        console.log("donnée", data);
        for (const key in data.data) {
          amortissementForm.value?.setFieldValue(key, 
          (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
        );
        }
    })
    .catch(({ response }) => {
      error(response.message);
    });
  }
  const typeOptions = ref([]);
  const router = useRouter();
  const amortissementForm = ref<Amortissement>();
  const route = useRoute();
  const showMErr = ref(false);
  const biens = ref();
  const bienOptions = ref([]);

  const editAmortissement = async (values, {resetForm}) => {
    ApiService.put("/amortissements/"+values.id,values)
      .then(({ data }) => {
        console.log("enregistrement", data);
        if(data.code == 200) { 
          success(data.message);
          resetForm();
          router.push({ name: "ListeAmortissement" });
        }
      }).catch(({ response }) => {
        error(response.data.message);
    });
  };
    return {amortissementForm,
       amortissementSchema,
        editAmortissement,
        typeOptions,
        bienOptions,
        showMErr,
        biens,
        
      };
  },
});
</script>