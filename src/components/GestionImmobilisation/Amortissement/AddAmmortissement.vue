<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <h2 v-if="tpValue == 1">
          Vous êtes sur le point de faire l'amortissement de {{ nombien }}
        </h2>
      
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="amortissementForm" @submit="addAmortissement" :validation-schema="amortissementSchema">
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
          
            <div class="col-md-6">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        Bien <span class="text-danger"></span>
                                    </label>
                                 <Field name="bien" v-model="biens" type="text" v-slot="{ field }">
                                    <Multiselect v-model="field.value" v-bind="field" :options="bienOptions" :preserve-search="true"
                                     :multiple="false" :searchable="true" placeholder="Sélectionner le bien "
                                      label="label" track-by="label" />
                                  </Field>
                                    
                                </div>
                            </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Créer un amortissement
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
  import ApiService from '@/services/ApiService';
  import { Amortissement } from '@/models/Amortissement';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import VueMultiselect from 'vue-multiselect'
  
  
  export default defineComponent({
      name: "AddAmortissement",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
      const amortissementSchema = Yup.object().shape({
        taux: Yup.number().required('Le taux est obligatoire'),
        valeurNetteComptable: Yup.number().required("La valeur nette comptable est obligatoire."),
        dureeUtilisation: Yup.date().required("La durée d'utilisation est obligatoire."),
      });
  
      onMounted(() => {
        getAllBiens()
      });
  
      const amortissementForm =  ref(null);
      //const permissions = ref(null);
      // const typeOptions = ref([]);
      const router = useRouter();
      const showMErr = ref(false);
      const biens = ref();
      const bienOptions = ref([]);


      const addAmortissement = async (values: any, { resetForm }) => {
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/amortissements", values)
           .then(({ data }) => {
            console.log("donnée",data)
             if (data.code == 201) {
              success(data.message);
               //resetForm();
             console.log('flefelef')
              router.push({ name: "ListeAmortissement" });
           }
           }).catch(({ response }) => {
            error(response.data.message);
          });
       }
    };

      
  
    const getAllBiens= async () => {
          try{
          const response = await ApiService.get('/all/biens');
          const biensData = response.data.data.data;
          console.log("bien", biensData);
          bienOptions.value = biensData.map((bien) => ({
            value: bien.id,
            label: bien.nomBien,
          }));
          }
          catch(error){
            //error(response.data.message)
          }
        } 
      return { amortissementSchema,bienOptions, addAmortissement, amortissementForm,showMErr,biens};
    },
  });
  </script>