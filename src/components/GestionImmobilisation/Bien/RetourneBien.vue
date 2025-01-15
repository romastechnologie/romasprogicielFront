<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
  
    <div class="text-center mb-3">
        <h4 v-if="tpValue == 1">
          Vous êtes sur le point de retourner le bien {{ nombien }}
           dans son emplacement de depart  {{ typMouv }}
        </h4>
        <h2 v-if="tpValue == 2">
            Vous êtes sur le point de retourner le bien {{ nombien }}
            dans son emplacement de depart  {{ typMouv }}
                </h2>
    </div>
            <Form ref="bienForm" @submit="addMouvementBien" :validation-schema="mouvementBienSchema">
              <div class="row" mt-3>
              
               <div class="col-md-6">
                  <label for="refMouvement" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refMouvement" class="form-control" type="text"/>
                    <ErrorMessage name="refMouvement" class="text-danger"/>
            </div>
  <div class="col-md-6">
                    <label for="dateMouvement" class="form-label">Date de realisation<span class="text-danger">*</span></label>
                    <Field name="dateMouvement" class="form-control" type="date"/>
                    <ErrorMessage name="dateMouvement" class="text-danger"/>
               </div>      
          <div class="col-md-6">
                 Magasin<span class="text-danger">*</span>
              <Field  name="magasin" v-slot="{ field }" v-model="magasin">
                <Multiselect 
                    v-model = "field.value"
                    v-bind = "field"
                    :options="magasinOptions"
                    placeholder="Selectionner un magasin"
                    label="label" 
                    track-by="label"
                 />
              </Field>
              <ErrorMessage name="magasin" class="text-danger"/>
        </div>
            <div class="col-md-6">
                <label for="infosComplementaire" class="form-label">Ancien Emplacement</label>
                <Field name="ancienEmplacement" v-model="ancienEmplacement"  class="form-control shadow-none rounded-0 text-black">
                  <Multiselect 
                    :options="serviceOptions"
                     v-model="ancienEmplacement"
                    :disabled="true"
                    placeholder="Selectionner un emplacement"
                    label="label" 
                    track-by="label"
                 />
                </Field>
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
  import { useRoute, useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect';
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
            //  refMouvement: Yup.string().required("La référence est obligatoire."),
            // dateMouvement: Yup.date().required("la date est obligatoire."),
            // infosComplementaire: Yup.string().notRequired(),
            magasin: Yup.string().required("Le magasin est obligatoire"),
            nouvelEmplacement: Yup.string().required("Le nouvel emplacement est obligatoire"),
      });
      const route = useRoute();
      const nombien = ref('');
      const typMouv = ref("");
      const tpValue = ref(1);
      const service = ref("");
      const magasin = ref("");
      const bienId = ref();
      const ancienEmplacement = ref("");


      onMounted(() => {
        getAllBiens(),
        getAllOrganisations();
        getAllMagasins();
        console.log('id', route.params.id)
        if(route.params.id) {
        getBien(parseInt(route.params.id as string));
      }
      });

      function getBien(id:number) {
        console.log('cgggg')

      ApiService.get("/biens/"+id.toString())
        .then(({ data }) => {
          console.log('then', data.data);
          bienId.value = data.data.id;
          nombien.value = data.data.nomBien + "" +"" +"["+  "" +data.data.refBien + "]"
          tpValue.value = data.data.mouvements.length != 0 ? 2 : 1
          typMouv.value = tpValue.value == 1 ? "Affectation" : "Transfert"
          ancienEmplacement.value = data.data.organisation?.id || "Non défini";          
          console.log('cg', nombien)
          // for (const key in data.data) {
          //   bienForm.value?.setFieldValue(key, 
          //   (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          // );
          // }
      })
      .catch(({ response }) => {
        error(response.message);
      });  
    }
  
      const bienForm =  ref(null);
      const typeOptions = ref([]);
      const serviceOptions = ref([]);
      const magasinOptions = ref([]);
      const router = useRouter();
      const showMErr = ref(false);
      const biens = ref();
      const emplacementDepart = ref();
      const  nouvelEmplacement =ref();

      const addMouvementBien = async (values,{ resetForm }) => {
        // values[' nouvelEmplacement'] =  nouvelEmplacement.value.value
      values["typeMouvement"]=tpValue.value;
      values["bien"]=bienId.value;
      console.log('Données envoyées', values)
      console.log('dataapi')
        ApiService.post("/mouvementBiens",values)
        .then(({ data }) => {
          console.log('data', data)
           //if(data.code == 201) { 
            success(data.message)
            resetForm();
            router.push({ name: "ListeBien" });
          // }
        }).catch(({ response }) => {
          error(response.message);
        });
      }
  
      const getAllBiens = async () => {
        try{
        const response = await ApiService.get('/all/biens');
        const typesData = response.data.data;
        typeOptions.value = typesData.map((bien) => ({
          value: bien.id,
          label: bien.nombien,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllMagasins = async () => {
        try{
          const response = await ApiService.get('/all/magasins');
          const magasinsData = response.data.data.data;
          console.log(response,magasinsData)
          magasinOptions.value = magasinsData.map((magasin) => ({
            value: magasin.id,
            label: magasin.libelle
          }));
        }
        catch(error){
        }
      } 
      const getAllOrganisations = async () => {
        try{
          const response = await ApiService.get('/all/organisations');
          const servicesData = response.data.data.data;
          console.log(response,servicesData)
          serviceOptions.value = servicesData.map((service) => ({
            value: service.id,
            label: service.nom
          }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
      
      return { 
        mouvementBienSchema, addMouvementBien, bienForm, 
        typeOptions, biens,serviceOptions,emplacementDepart,magasinOptions,magasin,
        showMErr, nombien,  nouvelEmplacement, typMouv, tpValue,service,ancienEmplacement,
      };
    },
  });
  </script>