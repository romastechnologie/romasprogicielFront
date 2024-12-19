<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="depensesForm" @submit="addDepenses" :validation-schema="depensesSchema">
        <div class="row">
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label for="date" class="d-block text-black fw-semibold mb-10">
                Date de dépense <span class="text-danger">*</span>
              </label>
              <Field name="date" type="Date" :value="new Date().toISOString().slice(0, 10)"
                class="form-control shadow-none fs-md-15 text-black" />
            </div>
            <ErrorMessage name="date" class="text-danger" />
          </div>
          <div class="col-md-4 mt-3">
            <label for="libelle" class="form-label"> Libelle<span class="text-danger">*</span></label>
            <Field name="libelle" class="form-control" type="text" placeholder="Entrer le libelle" />
            <ErrorMessage name="libelle" class="text-danger" />
          </div>

        <!--<div class="col-md-4 mt-3">
            <label for="description" class="form-label"> Description<span class="text-danger">*</span></label>
            <Field name="description" class="form-control" type="text" placeholder="Entrer la description" />
            <ErrorMessage name="description" class="text-danger" />
          </div>-->
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Montant<span class="text-danger">*</span>
              </label>
              <Field name="montant" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le montant" />
              <ErrorMessage name="montant" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Types Depenses <span class="text-danger">*</span>
              </label>
              <Field name="typedepense" v-model="typesDepenses" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" 
                :options="typesDepensesOptions"
                  @change="typedepenseChange($event)"
                :preserve-search="true" :multiple="false" :searchable="true"
                  placeholder="Sélectionner le type de depense" label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le Type de Depense est obligatoire</span>
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Entretien <span class="text-danger">*</span>
              </label>
              <Field name="entretien"  v-model="entretien" type="text" v-slot="{ field }">
                <Multiselect 
                v-model="selectedEntretien"
                v-bind="field" :options="entretienOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" 
                  noOptionsText="Sélectionner d'abord un type de dépense"
                  placeholder="Sélectionner l'entretien" 
                  label="label"
                  track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">L'Entretien est obligatoire</span>

              <ErrorMessage name="entretien" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Planification Reparation <span class="text-danger">*</span>
              </label>
              <Field name="planificationReparation" v-model="planificationReparation" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="planificationReparationOptions"
                  :preserve-search="true" :multiple="false" :searchable="true"
                  placeholder="Sélectionner la planification" label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La Planification Reparation est obligatoire</span>
            </div>
          </div>
          
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Categories Depenses <span class="text-danger">*</span>
              </label>
              <Field name="categoriesDepenses" v-model="categoriesDepenses" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="categoriesDepensesOptions"
                  :preserve-search="true" :multiple="false" :searchable="true"
                  placeholder="Sélectionner la categorie Depense" label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La categorie depense est obligatoire</span>
            </div>
          </div>
          <div class="col-md-4 mt-3">
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
          </div>

          <div class="col-md-4 mt-3">
            <label for="beneficiaire" class="form-label"> Bénéficiaire<span class="text-danger">*</span></label>
            <Field name="beneficiaire" class="form-control" type="text" placeholder="Entrer le bénéficiaire" />
            <ErrorMessage name="beneficiaire" class="text-danger" />
          </div>
       
          <div class="col-md-4-3">
              <label class="d-block fw-semibold mb-10">
                Motif<span class="text-danger">*</span>
              </label>
              <Field name="motif" as="textarea" cols="4" rows="3" placeholder="Entrer le motif" v-slot="{ field }"
                class="form-control shadow-none rounded-0 text-black">
                <textarea class="form-control shadow-none rounded-0 text-black" v-model="field.value"></textarea>
              </Field>
              <ErrorMessage name="motif" class="text-danger" />
          </div>
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter une dépense
              </button>
              <router-link to="/Depenses/liste-depenses" class=" btn btn-danger"><i
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
import { defineComponent, onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';

export default defineComponent({
  name: "AddDepenses",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    const depensesSchema = Yup.object().shape({
      libelle: Yup.string().required("Le libellé est obligatoire."),
    //description: Yup.string().required("La description est obligatoire."),
      entretien: Yup.string().required("L'entretien est obligatoire."),
      planificationReparation: Yup.string().required("La planification Réparation est obligatoire."),
      typedepense: Yup.string().required("Le type de dépense est obligatoire."),
      categoriesDepenses: Yup.string().required("La categorie dépense est obligatoire"),
      personnel: Yup.string().required("Le personnel est obligatoire"),
      motif: Yup.string().required("Le motif est obligatoire."),
      montant: Yup.number().required("Le montant est obligatoire."),
      date: Yup.date().required('La date est obligatoire'),
      beneficiaire: Yup.string().required("Le bénéficiaire est obligatoire"),
    });

    const depensesForm = ref(null);
    const showMErr = ref(false);
    const entretien = ref(null);
    const planificationReparation = ref(null);
    const typesDepenses = ref(null);
    const categoriesDepenses = ref(null);
    const personnelOptions = ref([]);
    const entretienOptions = ref([]);
    const planificationReparationOptions = ref([]);
    const typesDepensesOptions = ref([]);
    const categoriesDepensesOptions = ref([]);
    const selectedEntretien = ref([]);
    const selectedTypedepense = ref([]);


    const router = useRouter();

    
    const addDepenses = async (values: any, { resetForm }: any) => {

  console.log("Données préparées pour l'envoi :", values); 
  try {
    const response = await ApiService.post("/depenses", values);
    if (response.data.code === 201) {
      success(response.data.message);
      resetForm(); 
      router.push({ name: "ListeDepenses" }); 
    }
  } catch (err: any) {
    console.log("RESPONSE ERREUR  ====> ",err);
    const errorMessage = err.response?.data?.message || "Une erreur est survenue.";
    console.error("Erreur lors de l'ajout de la dépense :", errorMessage);
    error(errorMessage);
  }
};


function typedepenseChange(value) {
      console.log("g,rl;m", value);
      if (value) {
        entretienOptions.value = [];
        selectedEntretien.value = [];
        ApiService.get("/typedepenses/entretiens/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            console.log("donnee", donnee);
            if (donnee.length > 0) {
              entretienOptions.value = donnee.map((entretien: any) => {
                return {
                  label: entretien.libelle,
                  value: entretien.id,
                };
              });
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        entretienOptions.value = [];
        selectedEntretien.value = [];
      }
    }



    // Fonctions pour récupérer les options des listes
   /*const getAllEntretien = async () => {
      try {
        const response = await ApiService.get('/all/entretiens');
        const entretienData = response.data.data.data;
        entretienOptions.value = entretienData.map((entretien) => ({
          value: entretien.id,
          label: entretien.libelle,
        }));
      } catch (err) {
        console.error(err);
      }
    };*/

    const getAllPersonnels = async () => {
      try {
        const response = await ApiService.get('/all/personnels');
        console.log("RESPONSE ONE PERSO EQUAL THIS ONE ==> ",response)
        const personnelsData = response.data.data.data;
        personnelOptions.value = personnelsData.map((personnel) => ({
          value: personnel.id,
          label: `${personnel.nom} ${personnel.prenom}`,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    const getAllPlanificationReparation = async () => {
      try {
        const response = await ApiService.get('/all/planificationReparations');
        const planificationReparationData = response.data.data.data;
        planificationReparationOptions.value = planificationReparationData.map((planificationReparation) => ({
          value: planificationReparation.id,
          label: planificationReparation.libelle,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    const getAllTypesDepenses = async () => {
      try {
        const response = await ApiService.get('/all/typesDepenses');
        const typesDepensesData = response.data.data.data;
        typesDepensesOptions.value = typesDepensesData.map((typesDepenses) => ({
          value: typesDepenses.id,
          label: typesDepenses.libelle,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    const getAllCategoriesDepenses = async () => {
      try {
        const response = await ApiService.get('all/categoriesDepenses');
        console.log("RESPONSE ONE EQUAL THIS ONE ==> ",response)
        const categoriesDepensesData = response.data.data.data;
        categoriesDepensesOptions.value = categoriesDepensesData.map((categoriesDepenses) => ({
          value: categoriesDepenses.id,
          label: categoriesDepenses.libelle,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
   //   getAllEntretien();
      getAllPlanificationReparation();
      getAllTypesDepenses();
      getAllCategoriesDepenses();
      getAllPersonnels();
     

    });

    return {
      depensesSchema,
      addDepenses,
      depensesForm,
      entretienOptions,
      planificationReparationOptions,
      typesDepensesOptions,
      categoriesDepensesOptions,
      personnelOptions,
      showMErr,
      entretien,
      planificationReparation,
      typesDepenses,
      categoriesDepenses,
      typedepenseChange,
      selectedEntretien

    };
  },
});
</script>
