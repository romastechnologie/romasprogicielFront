<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="circuitDemandeForm" @submit="addCircuitDemande" :validation-schema="circuitDemandeSchema">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Catégorie de la demande <span class="text-danger">*</span>
              </label>
              <Field name="categorie" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="categorieOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" 
                  placeholder="Sélectionner la catégorie" label="label" track-by="label" />
              </Field>
              <ErrorMessage name="categorie" class="text-danger" />
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Circuit <span class="text-danger">*</span>
              </label>
              <Field name="circuit" v-model="circuits" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="circuitOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le circuit " label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="circuit" class="text-danger" />
            </div>
          </div>
              
                  
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter un circuit de demande
              </button>
              <router-link to="/circuits/liste-circuits-demandes" class=" btn btn-danger"><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
  
  <script lang="ts">
  
  import { defineComponent, onMounted, reactive, ref, watch} from 'vue';
  import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
  import * as Yup from 'yup';
  import ApiService from '@/services/ApiService';
  import { error, success,onFileChange } from '@/utils/utils';
  // import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'
import router from '@/router';


  const circuitDemandeForm =  ref(null);
      const showMErr = ref(false);
      const types = ref();
      
      const categories = ref();
      const circuits = ref();;
      const circuit = ref();
      
      
     
      const typeOptions = ref([]);
      const categorieOptions = ref([]);
      
      // const router = useRouter();
     
  
      //copie
        
      const circuitDemandes = ref([] as any[]);

      
      const circuitOptions = ref([] as any[]);

  


  
  
  export default defineComponent({
      name: "AddCircuitDemande",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {

      
    const defaultSchema = Yup.object().shape({
      categorie: Yup.string().required('La catégorie de demande est obligatoire'),
      circuit: Yup.string().required('Le circuit est obligatoire'),
      
    });

   


     


    
    
    const circuitDemandeSchema = ref(defaultSchema);
   
    
    const errorMessage = ref('');
    
    onMounted(() => {
      
      getAllCategorieDemandes()
      getAllCircuits()
     
    });
  
    
  
  
     
      const getAllCategorieDemandes = async () => {
        try{
        const response = await ApiService.get('/all/categorieDemandes');
        const categoriesData = response.data.data.data;

        categorieOptions.value = categoriesData.map((categorie) => ({
          value: categorie.id,
          label: categorie.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllCircuits = async () => {
        try{
        const response = await ApiService.get('/all/circuits');
        const circuitsData = response.data.data.data;
        console.log(circuitsData,"gggggggggg");
        circuitOptions.value = circuitsData.map((circuit) => ({
          value: circuit.id,
          label: circuit.nom,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 




const addCircuitDemande = async (values: any, { resetForm }) => {
     
      values['categories'] = categories.value
      values['circuit'] = circuits.value
      console.log('Données envoyées', circuits.value)
      if (showMErr.value === false) {
        ApiService.post("/circuitDemandes", values)
           .then(({ data }) => {
            console.log("data   ",data)
            if (data.code == 201) {
              success(data.message);
              resetForm();
              router.push({ name: "ListeCircuitDemandePage" }); 
            
            }
           }).catch(( response ) => {
            console.log("response",response)
            error(response);
          });
       }
    };


      return { circuitDemandeSchema, addCircuitDemande, circuitDemandeForm,typeOptions,showMErr,categorieOptions,circuitOptions,types,categories,circuits,
     defaultSchema,
      
      onFileChange,
      errorMessage,circuit,
      
    };
    },
  });
  </script>

<style scoped>
.error {
  color: red;
}
</style>