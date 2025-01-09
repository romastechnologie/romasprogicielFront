<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="demandeForm" @submit="addDemande" :validation-schema="demandeSchema">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de la demande <span class="text-danger">*</span>
              </label>
              <Field name="dateDemande" type="date" :value="getCurrentDate()" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateDemande" class="text-danger" />
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Catégorie de la demande <span class="text-danger">*</span>
              </label>
              <Field name="categorie" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="categorieOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" @change="categorieDemandeChange($event)"
                  placeholder="Sélectionner la catégorie" label="label" track-by="label" />
              </Field>
              <ErrorMessage name="categorie" class="text-danger" />
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Field name="personnel" v-model="personnels" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le personnel " label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="personnel" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide8" class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-1">
                Montant total du Prêt
              </label>
              <Field type="number" name="montantPret"  v-model="montantPret" class="form-control shadow-none fs-md-15 text-black" readonly="true"  @input="calculMontantTotal"/>
              <ErrorMessage name="montantPret" class="text-danger" />
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

          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif de la demande <span class="text-danger">*</span>
              </label>
              <Field name="motifDemande" cols="20" rows="3" as="textarea" placeholder="Description" v-slot="{ field}"
                class="form-control shadow-none rounded-0 text-black">
                <textarea v-model="field.value" class="form-control shadow-none rounded-0 text-black"></textarea>
              </Field>
              <ErrorMessage name="motifDemande" class="text-danger" />
            </div>
          </div>
          
          <div v-show="fieldHide7" class="col-md-12 mb-md-25">
            <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
              <div class="row">
                <div class="border border-primary mb-10">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                    style="background-color: #0a59a4">
                    <div class="col-md-7">
                      <h3 class="fs-4 text-white">
                        Echéances
                      </h3>
                    </div>
                    <div class="col-md-5">
                      <div class="d-flex float-end">
                        <button
                          class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                          type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                          @click="addRowEcheance()">
                          <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                          Ajouter une échéance
                        </button>
                        <router-link to="/liste-mouvements"></router-link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row d-flex align-items-center justify-content-between mt-10">
                      <!--<div class="col-md-3">
                                                  <label class="d-block text-black fw-semibold">
                                                   Titre
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>-->
                      <div class="col-md-4">
                        <label class="d-block text-black fw-semibold">
                          Date Echéance
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                        <div class="col-md-4">
                        <label class="d-block text-black fw-semibold mb-10">
                          Montant<span class="text-danger">*</span>
                        </label>
                      </div>
                       
                      <div class="col-md-4">
                        <label class="d-block text-black fw-semibold mb-10">
                          Actions <span class="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <hr class="mt-0" />
                    <div class="row" v-for="(echeance, index) in echeances" :key="index">
                      <div class="col-md-4 mb-2">
                        <div class="form-group ">
                          <input v-model="echeance.dateEcheance" name="dateEcheance" type="date"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="saisir la date de l'échéance" />
                          <div class="invalid-feedback" v-if="valideteRowEcheance(echeance.dateEcheance)">
                            La date échéance est obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 mb-2">
                        <div class="form-group">
                          <input v-model="echeance.montant" name="montant" type="number"  @input="calculMontantTotal"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="entrer le montant" />
                        </div>
                        <div class="invalid-feedback" v-if="valideteRowEcheance(echeance.montant)">
                          Le montant est obligatoire.
                        </div>
                      </div>
                      <div class="col-md-4 mb-2">
                        <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button" 
                          @click="removeRowEcheance(index)">
                          <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div v-show="fieldHide2" class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date de début <span class="text-danger">*</span>
                </label>
                <Field name="dateDebut" type="date" class="form-control shadow-none fs-md-15 text-black" />
                <ErrorMessage name="dateDebut" class="text-danger" />
              </div>
            </div>
            <div v-show="fieldHide3" class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date de fin <span class="text-danger">*</span>
                </label>
                <Field name="dateFin" type="date" class="form-control shadow-none fs-md-15 text-black" />
                <ErrorMessage name="dateFin" class="text-danger" />
              </div>
            </div>

            <div v-show="fieldHide4" class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date de Reprise <span class="text-danger">*</span>
                </label>
                <Field name="dateReprise" type="date" class="form-control shadow-none fs-md-15 text-black" />
                <ErrorMessage name="dateReprise" class="text-danger" />
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <label for="fichier" class="form-label"
              >Fichier<span class="text-danger">*</span></label
            >
            <Field
              name="fichier"
              @change="fichierChange"
              class="form-control"
              type="file"
            />
            <ErrorMessage name="fichier" class="text-danger" />
          </div>
              
                  
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter une demande
              </button>
              <router-link to="/demandes/liste-demande-attestation" class=" btn btn-danger"><i
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


  const demandeForm =  ref(null);
      const showMErr = ref(false);
      const types = ref();
      const typeConge = ref();
      const categories = ref();
      const personnels = ref();;
      const personnel = ref();
      const currentDate = ref(null);
      
     
      const typeOptions = ref([]);
      const categorieOptions = ref([]);
      
      // const router = useRouter();
     
  
      //copie
        
      const demandes = ref([] as any[]);

      const typeCongeOptions = ref([] as any[]);
      const personnelOptions = ref([] as any[]);

  


  
  
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

      const permissionSchema = Yup.object().shape({
      personnel:Yup.string().required('Le personnel est obligatoire'),
      dateDemande: Yup.date().required('La date de demande est obligatoire'),
      categorie: Yup.string().required('Le catégorie de demande est obligatoire'),
      motifDemande: Yup.string().required('Le motif est obligatoire'),
      dateDebut: Yup.date().required('La date de début est obligatoire'),
      dateFin: Yup.date().required('La date de fin est obligatoire'),
      dateReprise: Yup.date().required('La date de reprise est obligatoire'),
      //demandeFileName: Yup.string().required("Le fichier de la demande est obligatoire."),
    });

    const congeSchema = Yup.object().shape({
      personnel:Yup.string().required('Le personnel est obligatoire'),
      dateDemande: Yup.date().required('La date de demande est obligatoire'),
      categorie: Yup.string().required('La catégorie de demande est obligatoire'),
      typeConge: Yup.string().required('Le type de congé est obligatoire'),
      motifDemande: Yup.string().required('Le motif est obligatoire'),
      dateDebut: Yup.date().required('La date de début est obligatoire'),
      dateFin: Yup.date().required('La date de fin est obligatoire'),
      dateReprise: Yup.date().required('La date de reprise est obligatoire'),
      //demandeFileName: Yup.string().required("Le fichier de la demande est obligatoire."),
    });

    const attestationSchema = Yup.object().shape({
      personnel:Yup.string().required('Le personnel est obligatoire'),
      dateDemande: Yup.date().required('La date de demande est obligatoire'),
      categorie: Yup.string().required('La catégorie de demande est obligatoire'),
      motifDemande: Yup.string().required('Le motif est obligatoire'),
      //demandeFileName: Yup.string().required("Le fichier de la demande est obligatoire."),
    });
    const pretSchema = Yup.object().shape({
      personnel:Yup.string().required('Le personnel est obligatoire'),
      dateDemande: Yup.date().required('La date de demande est obligatoire'),
      categorie: Yup.string().required('La catégorie de demande est obligatoire'),
      motifDemande: Yup.string().required('Le motif est obligatoire'),
      montantPret: Yup.string().required('Le montant total est obligatoire'),
      //demandeFileName: Yup.string().required("Le fichier de la demande est obligatoire."),
      //dateEcheance: Yup.date().required('La date  est obligatoire'),
      //montant: Yup.string().required('Le montant par échéance est obligatoire'),

    });
    const defaultSchema = Yup.object().shape({
      categorie: Yup.string().required('La catégorie de demande est obligatoire'),
      
    });

    const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const currentDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      return currentDate;
    };


      const fichierChange = (e) => {
        selectedFile.value = onFileChange(e, [
          "image/jpeg",
          "image/png",
          "application/pdf",
        ]);
      };


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
    //const demandeSchema = ref();
    
    const demandeSchema = ref(defaultSchema);
    const file = ref(null);
    const selectedFile = ref<any>();
    const errorMessage = ref('');
    const maxFileSize = 5 * 1024 * 1024; // 5 Mo

    onMounted(() => {
      getAllTypeConges()
      getAllCategorieDemandes()
      getAllPersonnels()
      getCurrentDate();
      //demandeSchema.value = defaultSchema
    });
  
    
  const isDisable = ref(true);
    const echeances = reactive([{
      //resteAPaye: "",
      dateEcheance: "",
      montant: ""
    }]);


    const addRowEcheance = () => {
        echeances.push({
          dateEcheance: "",
          montant: "",
          //resteAPaye: ""
        });
      };
  
      const removeRowEcheance = (index) => {
        if (echeances.length > 1) echeances.splice(index, 1);
        //totals();
        calculMontantTotal()
      };
  
      watch(
        echeances,
        (newValue) => {
          console.log('je suis ici');
          isDisable.value =
          newValue.some(
            (echeance) =>
            valideteRowEcheance(echeance.dateEcheance) ||
            valideteRowEcheance(echeance.montant)
           
          );
        },
        { deep: true }
      );
  
      const valideteRowEcheance = (e) => {
        if (e == "" ||  e == "0"  || e < 0) {
          console.log('erg')
          return true;
        } else {
          return false;
        }
      };

      const { remove, push, fields, update } = useFieldArray("echeances");

  
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
          fieldHide7.value = false;
          fieldHide8.value = false;
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
          fieldHide7.value = false;
          fieldHide8.value = false;
          fieldHide9.value = true;
          fieldHide10.value = true;
          fieldHide11.value = true;
          fieldHide12.value = true;
          fieldHide13.value = true;
          break;

        case 4:
          // pret
        demandeSchema.value = pretSchema;
          fieldHide1.value = true;
          fieldHide2.value = false;
          fieldHide3.value = false;
          fieldHide4.value = false;
          fieldHide5.value = false;
          fieldHide6.value = false;
          fieldHide7.value = true;
          fieldHide8.value = true;
          fieldHide9.value = false;
          fieldHide10.value = false;
          fieldHide11.value = false;
          fieldHide12.value = false;
          fieldHide13.value = false;
          
          break;

        default:
          break;
      }

      }

      //Calcul
      const montantPret = ref(0);
      const calculMontantTotal = () => {
        montantPret.value = echeances.reduce((acc, echeance) => acc + Number(echeance.montant || 0), 0);
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

      const getAllPersonnels = async () => {
        try{
        const response = await ApiService.get('/all/personnels');
        const personnelsData = response.data.data.data;
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




const addDemande = async (values: any, { resetForm }) => {
      //values['typeConge'] = typeConge.value
      values['categories'] = categories.value
      values['personnel'] = personnels.value
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/demandes", values)
           .then(({ data }) => {
            console.log("data   ",data)
            if (data.code == 201) {
              success(data.message);
              resetForm();
              //router.push({ name: "ListeDemandePage" });


              //router.push({ name: "ListeBanquePage" });
              
              console.log('flefelef',data.data.categorie)
               if(data.data.categorie == 1){
               router.push({ name: "ListeDemandePermissionPage" });
              }else if(data.data.categorie == 2){
                router.push({ name: "ListeDemandeCongePage" });
               }else if(data.data.categorie == 3){
                console.log('je suis là')
                router.push({ name: "ListeDemandeAttestationPage" });

                }else{
               router.push({ name: "ListeDemandeAutrePage" });
               }
            
            }
           }).catch(( response ) => {
            console.log("response",response)
            error(response);
          });
       }
    };


      return { demandeSchema, addDemande, demandeForm,typeOptions,showMErr,categorieOptions,personnelOptions,types,categories,categorieDemandeChange,fieldHide1,personnels,
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
      fieldHide13,defaultSchema,isDisable,
      removeRowEcheance,
      addRowEcheance,
      valideteRowEcheance,
      echeances,
      fichierChange,onFileChange,
      errorMessage,montantPret,
      calculMontantTotal,
      typeCongeOptions,typeConge,personnel,
      getCurrentDate,
    };
    },
  });
  </script>

<style scoped>
.error {
  color: red;
}
</style>