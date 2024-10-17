<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="demandeForm" @submit="addDemande" :validation-schema="demandeSchema">
              <div class="row">
                <div  class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de la demande <span class="text-danger">*</span>
              </label>
              <Field name="dateDemande" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateDemande" class="text-danger" />
            </div>
          </div>
            <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Catégorie de la demande <span class="text-danger">*</span>
              </label>
              <Field name="categorieDemande" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="categorieOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" @change="categorieDemandeChange($event)" placeholder="Sélectionner la catégorie" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="categorieDemande" class="text-danger" />
            </div>
          </div>
          <div class="col-md-6 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Field name="personnel" v-model="personnels" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le personnel "
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le personnel est obligatoire</span>
            </div>
          </div>
          <div v-show="fieldHide6" class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type de congés <span class="text-danger">*</span>
              </label>
              <Field name="typeConge" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="typeCongeOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le type de congé" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="typeConge" class="text-danger" />
            </div>
          </div>
          
          <div v-show="fieldHide5" class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif de la demande <span class="text-danger">*</span>
              </label>
              <Field name="motifDemande" cols="20"
                rows="3" as="textarea" placeholder="Description" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                                <textarea
                                  v-model="field.value"
                                  class="form-control shadow-none rounded-0 text-black"
                                ></textarea>
              </Field>
              <ErrorMessage name="motifDemande" class="text-danger" />
            </div>
          </div>
          <div  v-show="fieldHide1" class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif de la permission <span class="text-danger">*</span>
              </label>
              <Field name="motifPermission" cols="20"
                rows="3" as="textarea" placeholder="Description" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                   <textarea
                    v-model="field.value"
                    class="form-control shadow-none rounded-0 text-black">
                  </textarea>
              </Field>
              <ErrorMessage name="motifPermission" class="text-danger" />
            </div>
          </div>
        
          <div class="row">
          <div  v-show="fieldHide2" class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de début <span class="text-danger">*</span>
              </label>
              <Field name="dateDebut" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateDebut" class="text-danger" />
            </div>
          </div>
          <div  v-show="fieldHide3" class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de fin <span class="text-danger">*</span>
              </label>
              <Field name="dateFin" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateFin" class="text-danger" />
            </div>
          </div>

          <div  v-show="fieldHide4" class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de Reprise  <span class="text-danger">*</span>
              </label>
              <Field name="dateReprise" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateReprise" class="text-danger" />
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Joindre le fichier <span class="text-danger">*</span>
              </label>
              <Field name="demandeFile" type="file" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="demandeFile" class="text-danger" />
            </div>
          </div>
       
           <!--  <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
              <button type="submit" class="btn btn-primary"> Déposer </button>
            </div>-->
 
         <!-- <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type Demande <span class="text-danger">*</span>
              </label>
              <Field name="types" v-model="types" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="typeOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le type"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le type de demande est obligatoire</span>
            </div>
          </div>

          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Catégorie Demande <span class="text-danger">*</span>
              </label>
              <Field name="categories" v-model="categories" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="categorieOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la catégorie"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La catégorie de demande est obligatoire</span>
            </div>
          </div>-->


          
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Ajouter un demande
              </button>
              <router-link to="/demandes/liste-demande" 
              class=" btn btn-danger"><i
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
  
  import { defineComponent, onMounted, ref} from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import ApiService from '@/services/ApiService';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'


  const demandeForm =  ref(null);
      const showMErr = ref(false);
      const types = ref();
      const typeConge = ref();
      const categories = ref();
      const personnels = ref();
      const personnel = ref();
      
      //const permissions = ref(null);
      const typeOptions = ref([]);
      const categorieOptions = ref([]);
      //const personnelOptions = ref([]);
      const router = useRouter();
      //const permissions= ref<Array<Permission>>([]);
  
//copie
  
const demandes = ref([] as any[]);
//const categorieOptions = ref([] as any[]);
const typeCongeOptions = ref([] as any[]);
const personnelOptions = ref([] as any[]);
const closeDemandeModal = ref(null);
const showE = ref(false)
//const demandeSchema = ref(defaultSchema);

//déclaration des champs
    const fieldHide1 = ref(true);
    const fieldHide2 = ref(false);
    const fieldHide3 = ref(false);
    const fieldHide4 = ref(false);
    const fieldHide5 = ref(false);
    const fieldHide6 = ref(false);
    const fieldHide7 = ref(false);
    const fieldHide8 = ref(false);
    const fieldHide9 = ref(false);
    const fieldHide10 = ref(false);
    const fieldHide11 = ref(false);
    const fieldHide12 = ref(false);
    const fieldHide13 = ref(false);
    const demandeSchema = ref();
  


  
  
  export default defineComponent({
      name: "AddDemande",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
      /*const demandeSchema = Yup.object().shape({
            refDemande: Yup.string().required("La référence est obligatoire."),
            nomDemande: Yup.string().required("Le nom est obligatoire."),
            coutAcquisition: Yup.number().typeError("veuillez entrer des nombres").required("Le cout d'aquisition est obligatoire."),
           

      });*/
      const permissionSchema = Yup.object().shape({
      categorieDemande: Yup.string().required('Le catégorie de demande est obligatoire'),
      motifPermission: Yup.string().required('Le motif est obligatoire'),
      dateDebut: Yup.date().required('La date de début est obligatoire'),
      dateFin: Yup.date().required('La date de fin est obligatoire'),
      dateReprise: Yup.date().required('La date de reprise est obligatoire'),
      demandeFile: Yup.string().required("Le fichier de la demande est obligatoire."),
    });

    const congeSchema = Yup.object().shape({
      categorieDemande: Yup.string().required('La catégorie de demande est obligatoire'),
      typeConge: Yup.string().required('Le type de congé est obligatoire'),
      motifPermission: Yup.string().required('Le motif est obligatoire'),
      dateDebut: Yup.date().required('La date de début est obligatoire'),
      dateFin: Yup.date().required('La date de fin est obligatoire'),
      dateReprise: Yup.date().required('La date de reprise est obligatoire'),
      demandeFile: Yup.string().required("Le fichier de la demande est obligatoire."),
    });

    const attestationSchema = Yup.object().shape({
      categorieDemande: Yup.string().required('La catégorie de demande est obligatoire'),
      motifPermission: Yup.string().required('Le motif est obligatoire'),
      demandeFile: Yup.string().required("Le fichier de la demande est obligatoire."),
      /*dateDebut: Yup.date().required('La date de début est obligatoire'),
      dateFin: Yup.date().required('La date de fin est obligatoire'),
      dateReprise: Yup.date().required('La date de reprise est obligatoire'),*/
    });

    const defaultSchema = Yup.object().shape({
      categorieDemande: Yup.string().required('La catégorie de demande est obligatoire'),
      motifDemande:Yup.string().required('Le motif de demande est obligatoire'),
      demandeFile: Yup.string().required("Le fichier de la demande est obligatoire."),
    });

  
      onMounted(() => {
        getAllTypeConges()
        getAllCategorieDemandes()
        getAllPersonnels()
  });
  
    
  
const categorieDemandeChange = async (value) => {

if (value == null || value == undefined || value == "") {
  return;
}

switch (value) {
  case 1:
    // permission
    demandeSchema.value = permissionSchema;
    fieldHide1.value = true;
    fieldHide2.value = true;
    fieldHide3.value = true;
    fieldHide4.value = true;
    fieldHide5.value = false;
    fieldHide6.value = false;
    fieldHide7.value = false;
    fieldHide8.value = false;
    fieldHide9.value = false;
    fieldHide10.value = false;
    fieldHide11.value = false;
    fieldHide12.value = false;
    fieldHide13.value = false;
    break;
    case 2:
    // congés
    demandeSchema.value = congeSchema;
    fieldHide1.value = false;
    fieldHide2.value = true;
    fieldHide3.value = true;
    fieldHide4.value = true;
    fieldHide5.value = true;
    fieldHide6.value = true;
    fieldHide7.value = true;
    fieldHide8.value = true;
    fieldHide9.value = true;
    fieldHide10.value = true;
    fieldHide11.value = true;
    fieldHide12.value = false;
    fieldHide13.value = false;
    
    
    break;

  case 3:
    // attestation
    demandeSchema.value = attestationSchema;
    fieldHide1.value = false;
    fieldHide2.value = false;
    fieldHide3.value = false;
    fieldHide4.value = false;
    fieldHide5.value = true;
    fieldHide6.value = false;
    fieldHide7.value = true;
    fieldHide8.value = true;
    fieldHide9.value = true;
    fieldHide10.value = true;
    fieldHide11.value = true;
    fieldHide12.value = true;
    fieldHide13.value = true;
    break;

  /*case 4:
    // attestation
   // demandeSchema.value = permissionSchema;
    fieldHide1.value = true;
    fieldHide2.value = false;
    fieldHide3.value = false;
    fieldHide4.value = false;
    fieldHide5.value = false;
    fieldHide6.value = false;
    fieldHide7.value = false;
    fieldHide8.value = false;
    fieldHide9.value = false;
    fieldHide10.value = false;
    fieldHide11.value = false;
    fieldHide12.value = false;
    fieldHide13.value = false;
    
    break;*/

 /* case 5:
    // resiliation
    //selectedSchema.value = permissionSchema;
    fieldHide1.value = true;
    fieldHide2.value = false;
    fieldHide3.value = false;
    fieldHide4.value = false;
    fieldHide5.value = false;
    fieldHide6.value = false;
    fieldHide7.value = false;
    fieldHide8.value = false;
    fieldHide9.value = false;
    fieldHide10.value = false;
    fieldHide11.value = false;
    fieldHide12.value = false;
    fieldHide13.value = false;
    
    break;*/

  /*case 7:
    // changement
    selectedSchema.value = changementCleSchema;
    fieldHide1.value = true;
    fieldHide2.value = true;
    fieldHide3.value = false;
    fieldHide4.value = false;
    fieldHide5.value = false;
    fieldHide6.value = false;
    fieldHide7.value = false;
    fieldHide8.value = false;
    fieldHide9.value = false;
    fieldHide10.value = false;
    fieldHide11.value = false;
    fieldHide12.value = false;
    fieldHide13.value = false;
   
    break;*/

  /*case 6:
    // partage
    selectedSchema.value = partageSchema;
    fieldHide1.value = true;
    fieldHide2.value = false;
    fieldHide3.value = false;
    fieldHide4.value = false;
    fieldHide5.value = false;
    fieldHide6.value = false;
    fieldHide7.value = false;
    fieldHide8.value = false;
    fieldHide9.value = false;
    fieldHide10.value = false;
    fieldHide11.value = false;
    fieldHide12.value = false;
    fieldHide13.value = false;
   
    break;*/

  /*case 8:
    // reclamation
    
    fieldHide1.value = true;
    fieldHide2.value = false;
    fieldHide3.value = false;
    fieldHide4.value = false;
    fieldHide5.value = false;
    fieldHide6.value = false;
    fieldHide7.value = false;
    fieldHide8.value = false;
    fieldHide9.value = false;
    fieldHide10.value = false;
    fieldHide11.value = false;
    fieldHide12.value = false;
    fieldHide13.value = false;
   
    break;*/

  default:
    break;
}

}
const addDemande = async (values: any, { resetForm }) => {
      values['types'] = types.value.value
      values['categories'] = categories.value.value
      values['personnel'] = personnels.value.value
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/demandes", values)
           .then(({ data }) => {
             if (data.code == 201) {
              success(data.message);
               //resetForm();
             console.log('flefelef')
              router.push({ name: "ListeDemande" });
           }
           }).catch(({ response }) => {
            error(response.data.message);
          });
       }
    };

      const getAllTypeConges = async () => {
        try{
        const response = await ApiService.get('/typeConges');
        const typeCongesData = response.data.data.data;

        typeCongeOptions.value = typeCongesData.map((typeConge) => ({
          value: typeConge.id,
          label: typeConge.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllCategorieDemandes = async () => {
        try{
        const response = await ApiService.get('/categorieDemandes');
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

  
      const getAllPersonnels = async () => {
        try{
        const response = await ApiService.get('/all/personnels');
        const personnelsData = response.data;
        console.log(personnelsData,"gggggggggg");
        personnelOptions.value = personnelsData.map((personnel) => ({
          value: personnel.id,
          label: personnel.nom + " " + personnel.prenom,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      return { demandeSchema, addDemande, demandeForm,typeOptions,showMErr,categorieOptions,personnelOptions,types,categories,categorieDemandeChange,fieldHide1,
      fieldHide2,
      fieldHide3,
      fieldHide4,
      fieldHide5,
      fieldHide6,
      fieldHide7,
      fieldHide8,
      fieldHide9,
      fieldHide10,
      fieldHide11,
      fieldHide12,
      fieldHide13,defaultSchema,
      //categorieOptions,
      typeCongeOptions,typeConge,personnel};
    },
  });
  </script>