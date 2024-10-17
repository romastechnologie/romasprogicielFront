<template>
  <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true" id="AddDemandeModal" role="dialog"
    ref="addDemandeModalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Faire une demande </h5>
          <button ref="closeDemandeModal" type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form  @submit="sendDemande" :validation-schema="schemaDemande" enctype="multipart/form-data">

            <div class="col-md-12 mb-3">
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
          <div v-show="fieldHide6" class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type de congé <span class="text-danger">*</span>
              </label>
              <Field name="typeConge" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="typeCongeOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le type de congé" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="typeConge" class="text-danger" />
            </div>
          </div>
            <!-- <p class="my-0"> Catégorie de la demande </p>
            <Field name="categorieId" v-model="cate" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="categorieOptions" :close-on-select="true"
                :clear-on-select="false" :multiple="false" :searchable="true" placeholder="Sélectionner la catégorie"
                label="label" track-by="label" />
            </Field>-->

            <!--<p class="my-0"> Personnel </p>
            <Field name="personnelId" v-model="perso" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :close-on-select="true"
                :clear-on-select="false" :multiple="false" :searchable="true" placeholder="Sélectionner le personnel"
                label="label" track-by="label" />
            </Field>-->

            <div  class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de la demande <span class="text-danger">*</span>
              </label>
              <Field name="dateDemande" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateDemande" class="text-danger" />
            </div>
          </div>
          <!--<div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Demandes <span class="text-danger">*</span>
              </label>
              <Field name="demande" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="demandeOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner la demande" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="demande" class="text-danger" />
            </div>
          </div>-->


         <!-- <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Field name="personnel" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le personnel" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="personnel" class="text-danger" />
            </div>
          </div>-->
          <div v-show="fieldHide5" class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif de la demande <span class="text-danger">*</span>
              </label>
              <Field name="motifDemande" type="text" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="motifDemande" class="text-danger" />
            </div>
          </div>
          <div  v-show="fieldHide1" class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif de la permission <span class="text-danger">*</span>
              </label>
              <Field name="motifPermission" type="text" class="form-control shadow-none fs-md-15 text-black" />
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
            <p class="my-0"> Joindre un fichier </p>
            <Field type="file" name="demandeFile" id="demandeFile" class="form-control mb-1" />
            <ErrorMessage name="demandeFile" class="text-danger text-start mb-2" />
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
              <button type="submit" class="btn btn-primary"> Déposer </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { configure } from 'vee-validate'
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2'
import Multiselect from '@vueform/multiselect/src/Multiselect';
import ApiService from '@/services/ApiService';
import axios from 'axios';
import { error, hideModal, success } from '@/utils/utils';
import { Demande } from '@/models/Demande';


const router = useRouter();
emits: ["refreshDemandes",'openmodal'],

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});




const demandes = ref([] as any[]);
const categorieOptions = ref([] as any[]);
const typeCongeOptions = ref([] as any[]);
const personnelOptions = ref([] as any[]);
const closeDemandeModal = ref(null);
const showE = ref(false)
//const schemaDemande = ref(defaultSchema);

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
    const schemaDemande = ref();
  


// function schemaDemande() {
//   return Yup.object().shape({
//     categorieDemande: Yup.string().required("La categorie est obligatoire."),
//     //personnel: Yup.string().required("Le personnel est obligatoire."),
//     demandeFile: Yup.string().required("Le fichier de la demande est obligatoire."),
//   })
// }


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
const perso = ref();
const cate = ref();

const addDemande = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Demande;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/demandes/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addDemandeModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshDemandes");
                router.push('/demandes/liste-demande');
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }else{
            ApiService.post("/demandes",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addDemandeModalRef.value);
                //router.push('/demandes/liste-demande');
                emit("refreshDemandes");
    
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }
        }; 
    
        /*const resetValue = () => {
          const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
          isupdate.value=false;
          formFields.forEach(field => {
            field.value = '';
          });
          btnTitle()
        };*/
    

async function sendDemande(values: any) {

  const formData = new FormData();

  const target = document.getElementById("demandeFile") as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file && file.size > 1048576) {
      Swal.fire({
        title: "Oops...!",
        text: "La taille du fichier dépasse 1 Mo!",
        icon: "error"
      });
    } else {
      formData.append('fichier', target.files[0])
      console.log(formData.get("fichier"))
      try {
        const response = await ApiService.post(`/demandes/${perso.value.value}/${cate.value.value}`, formData)
        Swal.fire({
          timer: 1500,
          position: "top-end",
          text: "La demande a été soumise avec succès!",
          icon: "success"
        })
      } catch (error) {
        console.error('Erreur lors de l\'envoie de la demande:', error);
        throw error;
      }
    }
  }
}


 

   /* const getAllPersonnels = async () => {
      try{
      const response = await ApiService.get('/all/personnels');
      const personnelsData = response.data;
      console.log('Data', personnelsData)
      personnelOptions.value = personnelsData.map((personnel) => ({
        value: personnel.id,
        label: personnel.nom + " " + personnel.prenom,
      }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }  */

const getAllCategorieDemandes = async () => {
  try {
    const response = await ApiService.get("all/categorieDemandes");
    // categorieDemandes.value = response.data;
      categorieOptions.value = response.data.data.data.map((categorie: any) => ({
        value: categorie.id,
        label: `${categorie.libelle}`
      }));

    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des categories de demandes:', error);
    throw error;
  }
}


const getAllTypeConges = async () => {
  try {
    const response = await ApiService.get("all/typeConges");
    // categorieDemandes.value = response.data;
      typeCongeOptions.value = response.data.data.data.map((typeConge: any) => ({
        value: typeConge.id,
        label: `${typeConge.libelle}`
      }));

    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des categories de demandes:', error);
    throw error;
  }
}

const categorieDemandeChange = async (value) => {

if (value == null || value == undefined || value == "") {
  return;
}

switch (value) {
  case 1:
    // permission
    schemaDemande.value = permissionSchema;
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
    schemaDemande.value = congeSchema;
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
    schemaDemande.value = attestationSchema;
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
   // schemaDemande.value = permissionSchema;
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


const getAllDemandes = async () => {
  try {
    const response = await ApiService.get("all/demandes");
    demandes.value = response.data;

  } catch (error) {
    console.error('Erreur lors de la recupération des demandes:', error);
    throw error;
  }
}

onMounted(() => {
  //getAllPersonnels();
  getAllCategorieDemandes();
  getAllTypeConges();
  getAllDemandes();
})

</script>
    