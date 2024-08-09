<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
  
    <div class="text-center mb-3">
        <h2 v-if="tpValue == 1">
          Vous êtes sur le point de faire une {{ typMouv }} de {{ nombien }}
        </h2>
        <h2 v-if="tpValue == 2">
          Vous êtes sur le point de faire un {{ typMouv }} de {{ nombien }}
        </h2>
    </div>
            <Form ref="bienForm" @submit="addMouvementBien" :validation-schema="mouvementBienSchema">
              <div class="row" mt-3>
                <div class="col-md-4 mt-3">
                    <label for="dateMouvement" class="form-label">Date Mouvement<span class="text-danger">*</span></label>
                    <Field name="dateMouvement" class="form-control" type="date"/>
                    <ErrorMessage name="dateMouvement" class="text-danger"/>
               </div>
                <div class="col-md-4 mt-3">
                    <label for="refMouvement" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refMouvement" class="form-control" type="text"/>
                    <ErrorMessage name="refMouvement" class="text-danger"/>
            </div>
            <div v-if="tpValue==1" class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Ancien Emplacement<span class="text-danger">*</span>
              </label>
              <Field name="emplacementDepart" v-model="emplacementDepart" type="text" v-slot="{ field }">
              <VueMultiselect v-model="field.value" v-bind="field" :options="serviceOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner l'emplacement"
                label="label" track-by="label" />
              </Field>
              <Field name="emplacementDepart" class="form-control" type="text" v-model="service" v-if="tpValue == 2"/>
              <span class="text-danger" v-if="showMErr">L'ancien emplacement est obligatoire</span>
            </div>
          </div>

          <div v-if="tpValue==2" class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Nouvel Emplacement<span class="text-danger">*</span>
              </label>
              <Field name="emplacementDestination" v-model="emplacementDestination" type="text" v-slot="{ field }">
              <VueMultiselect v-model="field.value" v-bind="field" :options="serviceOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner l'emplacement"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le nouvel emplacement est obligatoire</span>
            </div>
          </div>

            <div class="col-md-12">
                    <label for="infosComplementaire" class="form-label">Infos complémentaires</label>
                    <textarea  id="infoComplementaire" class="form-control" col="12" rows="4"></textarea>
                    <ErrorMessage name="infosComplementaire" class="text-danger"/>
            </div>
            <!--<div class="col-md-4">
                    <label for="emplacementDepart" class="form-label">Ancien Emplacement<span class="text-danger">*</span></label>
                    <Field name="emplacementDepart" class="form-control" type="text"/>
                    <ErrorMessage name="emplacementDepart" class="text-danger"/>
            </div>
            <div class="col-md-4">
                    <label for="emplacementDestination" class="form-label">Nouvel Emplacement<span class="text-danger">*</span></label>
                    <Field name="emplacementDestination" class="form-control" type="text"/>
                    <ErrorMessage name="emplacementDestination" class="text-danger" />
            </div>-->

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
            // refMouvement: Yup.string().required("La référence est obligatoire."),
            // dateMouvement: Yup.date().required("la date est obligatoire."),
            // infosComplementaire: Yup.string().notRequired(),
            // emplacementDepart: Yup.string().required(),
      });
      const route = useRoute();
      const nombien = ref('');
      const typMouv = ref("");
      const tpValue = ref(1);
      const service = ref("");

      onMounted(() => {
        getAllBiens(),
        getAllServices();
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
          nombien.value = data.data.nomBien + "" +"" +"["+  "" +data.data.refBien + "]"
          tpValue.value = data.data.mouvements.length != 0 ? 2 : 1
          typMouv.value = tpValue.value == 1 ? "Affectation" : "Transfert"
          service.value = data.data.mouvements?.emplacementDepart?.libelle
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
      const router = useRouter();
      const showMErr = ref(false);
      const biens = ref();
      const emplacementDepart = ref();
      const emplacementDestination =ref()

      const addMouvementBien = async (values,{ resetForm }) => {
        values['biens'] = biens.value.value
        values['emplacementDepart'] = emplacementDepart.value.value
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
          label: bien.nombien,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllServices = async () => {
        try{
        const response = await ApiService.get('/all/services');
        const servicesData = response.data.data.data;

        serviceOptions.value = servicesData.map((service) => ({
          value: service.code,
          label: service.libelle
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
  
  
      return {mouvementBienSchema, addMouvementBien, bienForm, 
        typeOptions, biens,serviceOptions,emplacementDepart,
         showMErr, nombien, emplacementDestination, typMouv, tpValue,service};
    },
  });
  </script>