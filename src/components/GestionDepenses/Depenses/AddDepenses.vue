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
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Types Depenses <span class="text-danger">*</span>
              </label>
              <Field name="typedepense" v-model="typesDepenses" type="text" v-slot="{ field }">
                <Multiselect 
                v-model="selectedTypedepense"
                v-bind="field" :options="typedepenseOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" 
                  placeholder="Sélectionner le type de dépenses" 
                  label="label"
                  track-by="label" />  
             </Field>
              <span class="text-danger" v-if="showMErr">Le Type de Depense est obligatoire</span>
            </div>
          </div>

          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Categories Depenses <span class="text-danger">*</span>
              </label>
              <Field name="categoriedepense" v-model="categoriesDepenses" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="categoriesDepensesOptions"
                  :preserve-search="true" :multiple="false" :searchable="true"
                  placeholder="Sélectionner la categorie Depense" label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La categorie depense est obligatoire</span>
            </div>
          </div>
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
            <label class="d-block text-black fw-semibold mb-10">
              Type de destinataire <span class="text-danger">*</span>
            </label>
            <div class="d-flex">
              <div class="form-check me-3">
                <input
                  type="radio"
                  id="personnelRadio"
                  value="personnel"
                  v-model="selectedDestinataire"
                  class="form-check-input"
                />
                <label class="form-check-label" for="personnelRadio">Personnel</label>
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  id="beneficiaireRadio"
                  value="beneficiaire"
                  v-model="selectedDestinataire"
                  class="form-check-input"
                />
                <label class="form-check-label" for="beneficiaireRadio">Bénéficiaire</label>
              </div>
            </div>
            <span class="text-danger" v-if="showMErr">Le type de destinataire est obligatoire</span>
          </div>

          <div class="col-md-4 mt-3" v-if="selectedDestinataire === 'personnel'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Field name="personnel" type="text" v-slot="{ field }">
                <Multiselect
                  v-model="field.value"
                  v-bind="field"
                  :options="personnelOptions"
                  :preserve-search="true"
                  :multiple="false"
                  :searchable="true"
                  placeholder="Sélectionner le personnel"
                  label="label"
                  track-by="label"
                />
              </Field>
              <ErrorMessage name="personnel" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mt-3" v-if="selectedDestinataire === 'beneficiaire'">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Bénéficiaire <span class="text-danger">*</span>
              </label>
              <Field name="beneficiaire" class="form-control" type="text" placeholder="Entrer le bénéficiaire" />
              <ErrorMessage name="beneficiaire" class="text-danger" />
            </div>
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
  //libelle: Yup.string().required("Le libellé est obligatoire."),
  //entretien: Yup.string().required("L'entretien est obligatoire."),
  //planification: Yup.string().required("La planification Réparation est obligatoire."),
  typedepense: Yup.string().required("Le type de dépense est obligatoire."),
  categoriedepense: Yup.string().required("La catégorie dépense est obligatoire"),
  motif: Yup.string().required("Le motif est obligatoire."),
  montant: Yup.number().required("Le montant est obligatoire."),
  date: Yup.date().required("La date est obligatoire"),
  personnel: Yup.string().nullable(),
  beneficiaire: Yup.string().nullable(),

}).test("personnel-or-beneficiaire", "Renseignez au moins 'Personnel' ou 'Bénéficiaire'.", (values) => {
  return !!(values.personnel || values.beneficiaire); 
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
    const typedepenseOptions = ref([]);
    const categoriesDepensesOptions = ref([]);
    const selectedEntretien = ref([]);
    const selectedTypedepense = ref([]);
    const selectedDestinataire = ref(null);
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
    
      getAllCategoriesDepenses();
      getAllPersonnels();
     

    });

    return {
      depensesSchema,
      addDepenses,
      depensesForm,
      entretienOptions,
      planificationReparationOptions,
      typedepenseOptions,
      categoriesDepensesOptions,
      personnelOptions,
      showMErr,
      entretien,
      planificationReparation,
      typesDepenses,
      categoriesDepenses,
     
      selectedTypedepense,
      selectedDestinataire,

    };
  },
});
</script>
