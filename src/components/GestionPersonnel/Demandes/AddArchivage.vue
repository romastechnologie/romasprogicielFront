<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
  
    <div class="text-center mb-3">
        
    </div>
            <Form ref="demandeForm" @submit="addArchivage" :validation-schema="archivageSchema">
              <div class="row" mt-3>
              
               <div class="col-md-6">
                  <label for="refArchivage" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refArchivage" class="form-control" type="text"/>
                    <ErrorMessage name="refArchivage" class="text-danger"/>
            </div>
  <div class="col-md-6">
                    <label for="dateArchivage" class="form-label">Date d'archivage<span class="text-danger">*</span></label>
                    <Field name="dateArchivage" class="form-control" type="date" :value="getCurrentDate()"/>
                    <ErrorMessage name="dateArchivage" class="text-danger"/>
               </div>
         
          <div class="col-md-6">
                Emplacement<span class="text-danger">*</span>
              <Field  name="nouvelEmplacement" v-slot="{ field }" v-model="nouvelEmplacement">
                <Multiselect 
                    v-model = "field.value"
                    v-bind = "field"
                    :options="serviceOptions"
                    placeholder="Selectionner un emplacement"
                    label="label" 
                    track-by="label"
                 />
              </Field>
              <ErrorMessage name="nouvelEmplacement" class="text-danger"/>
        </div>
          
            <div class="col-md-6">
                <label for="infosComplementaire" class="form-label">Infos complémentaires</label>
                <Field name="infosComplementaire" cols="20"
                  rows="6" as="textarea" placeholder="Description" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                    <textarea
                      v-model="field.value"
                      class="form-control shadow-none rounded-0 text-black"
                    ></textarea>
                </Field>
                <ErrorMessage name="infosComplementaire" class="text-danger"/>
            </div>
           
              <div class="col-md-12 mt-3">
                <div class="d-flex align-items-center ">
                  <button class="btn btn-success me-3" type="submit">
                     Archiver
                  </button>
                  <router-link to="/demandes/ajouter-demande" 
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
  //import { Archivage } from '@/models/Archivage';
  import { error, success } from '@/utils/utils';
  import { useRoute, useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'

  
  
  export default defineComponent({
      name: "AddArchivage",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
      const archivageSchema = Yup.object().shape({
            //  refArchivage: Yup.string().required("La référence est obligatoire."),
            // dateArchivage: Yup.date().required("la date est obligatoire."),
            // infosComplementaire: Yup.string().notRequired(),
            nouvelEmplacement: Yup.string().required("L'emplacement est obligatoire"),
      });
      const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const currentDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      return currentDate;
    };
      const route = useRoute();
      const nomdemande = ref('');
      const typMouv = ref("");
      const tpValue = ref(1);
      const service = ref("");
      const demandeId = ref();
      const ancienEmplacement = ref("");


      onMounted(() => {
        getAllDemandes(),
        getAllEmplacements();
        console.log('id', route.params.id)
        if(route.params.id) {
        getDemande(parseInt(route.params.id as string));
        getCurrentDate();
      }
      });

      function getDemande(id:number) {
        console.log('cgggg')

      ApiService.get("/demandes/"+id.toString())
        .then(({ data }) => {
          console.log('then', data.data);
          demandeId.value = data.data.id;
          nomdemande.value = data.data.nomDemande + "" +"" +"["+  "" +data.data.refDemande + "]"
          tpValue.value = data.data.mouvements.length != 0 ? 2 : 1
          typMouv.value = tpValue.value == 1 ? "Affectation" : "Transfert"
          ancienEmplacement.value = data.data.service?.id || "Non défini";
          
          console.log('cg', nomdemande)
          // for (const key in data.data) {
          //   demandeForm.value?.setFieldValue(key, 
          //   (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          // );
          // }
      })
      .catch(({ response }) => {
        error(response.message);
      });  
    }
  
      const demandeForm =  ref(null);
      const typeOptions = ref([]);
      const serviceOptions = ref([]);
      const router = useRouter();
      const showMErr = ref(false);
      const demandes = ref();
      const emplacementDepart = ref();
      const  nouvelEmplacement =ref()

      const addArchivage = async (values,{ resetForm }) => {
        // values[' nouvelEmplacement'] =  nouvelEmplacement.value.value
      values["typeArchivage"]=tpValue.value;
      values["demande"]=demandeId.value;
      console.log('Données envoyées', values)
      console.log('dataapi')
        ApiService.post("/archivages",values)
        .then(({ data }) => {
          console.log('data', data)
           //if(data.code == 201) { 
            success(data.message)
            resetForm();
            router.push({ name: "ListeDemande" });
          // }
        }).catch(({ response }) => {
          error(response.message);
        });
      }
  
      const getAllDemandes = async () => {
        try{
        const response = await ApiService.get('/all/demandes');
        const typesData = response.data.data;

        typeOptions.value = typesData.map((demande) => ({
          value: demande.id,
          label: demande.nomdemande,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllEmplacements = async () => {
        try{
          const response = await ApiService.get('/emplacements');
          const servicesData = response.data.data.data;
          console.log(response,servicesData)
          serviceOptions.value = servicesData.map((service) => ({
            value: service.id,
            label: service.code
          }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
      
      return { 
        archivageSchema, addArchivage, demandeForm, 
        typeOptions, demandes,serviceOptions,emplacementDepart,
        showMErr, nomdemande,  nouvelEmplacement, typMouv, tpValue,service,ancienEmplacement,getCurrentDate
      };
    },
  });
  </script>