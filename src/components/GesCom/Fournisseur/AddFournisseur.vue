<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="fournisseurForm" @submit="addFournisseur" :validation-schema="fournisseurSchema">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
               Statut<span class="text-danger">*</span>
              </label>
              <Field name="statut" v-slot="{ field }">
  <Multiselect
    v-bind="field"
    v-model="defaultStatut"
    :options="statutOptions"
    track-by="value"
    label="label"
    placeholder="Sélectionner le statut"
    @select="handleStatutChange"
  />
</Field> 
            </div>
            <ErrorMessage name="statut" class="text-danger"/>
          </div>
          <div class="col-md-4" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom du fournisseur<span class="text-danger">*</span>
              </label>
              <Field name="nomFournisseur" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
              <ErrorMessage name="nomFournisseur" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Prénom du fournisseur<span class="text-danger">*</span>
              </label>
              <Field name="prenomFournisseur" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
              <ErrorMessage name="prenomFournisseur" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Adresse 
              </label>
              <Field name="adresseFournisseur" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
              <ErrorMessage name="adresseFournisseur" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email
              </label>
              <Field name="email" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email"/>
              <ErrorMessage name="email" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4" v-if="showAdditionalFields">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Sexe <span class="text-danger">*</span>
            </label>
            <Field  name="sexe"  type="text"  v-slot="{ field }">
              <Multiselect
                :searchable = "true"
                :options = "['Masculin', 'Féminin']"
                v-model = "field.value"
                v-bind = "field"
                placeholder="Sélectionner le sexe"
              />
            </Field>
              <ErrorMessage name="sexe" class="text-danger"/>
          </div>
        </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone 1 <span class="text-danger">*</span>
              </label>
              <Field name="telFournisseur1" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
              <ErrorMessage name="telFournisseur1" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone 2 
              </label>
              <Field name="telFournisseur2" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
              <ErrorMessage name="telFournisseur2" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Sigle <span class="text-danger">*</span>
              </label>
              <Field name="sigle" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
              <ErrorMessage name="sigle" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Dénomination <span class="text-danger">*</span>
              </label>
              <Field name="denomination" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la denomination"/>
              <ErrorMessage name="denomination" class="text-danger"/>
            </div>
          </div>
          <!-- <div class="col-md-4" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Raison sociale <span class="text-danger">*</span>
              </label>
              <Field name="raisonSociale" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la raison sociale"/>
              <ErrorMessage name="raisonSociale" class="text-danger"/>
            </div>
          </div> -->
         <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                IFU <span class="text-danger">*</span>
              </label>
              <Field name="ifu" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ifu"/>
              <ErrorMessage name="ifu" class="text-danger"/>
            </div>
          </div>
          
          <div class="col-md-4" v-if="!showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Régistre de commerce <span class="text-danger">*</span>
              </label>
              <Field name="rccm" type="text" 
              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le régistre de commerce"/>
              <ErrorMessage name="rccm" class="text-danger"/>
            </div>
          </div>
          <div class="col-md-4" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Date de création 
                </label>
                <Field name="dateCreation" type="date" 
                class="form-control shadow-none fs-md-15 text-black"/>
              </div>
            <ErrorMessage name="dateCreation" class="text-danger"/>
            </div>
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button
                class="btn btn-success me-3"
                type="submit"
              >
                  Ajouter un fournisseur
              </button>
              <router-link to="/fournisseurs/liste-fournisseurs" 
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
import { defineComponent, ref, watch } from "vue";
import { Form, Field,ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import Multiselect from "@vueform/multiselect";
import { useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import { error, success } from "@/utils/utils";


export default defineComponent({
  name: "AddFournisseur",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    const fournisseurForm = ref(null);
    const router = useRouter();
    const defaultStatut = ref(1); // Personne Physique par défaut
    const showAdditionalFields = ref(true);

    const statutOptions = [
      { value: 1, label: "Personne Physique" },
      { value: 2, label: "Personne Morale" },
    ];



    // Validation dynamique basée sur le statut
    const fournisseurSchema = Yup.object().shape({
      statut: Yup.number().required("Le statut est obligatoire"),
      nomFournisseur: Yup.string().when("statut", {
        is: 1, // Personne Physique
        then: (schema) => schema.required("Le nom du fournisseur est obligatoire"),
        otherwise: (schema) => schema.notRequired(),
      }),
      prenomFournisseur: Yup.string().when("statut", {
        is: 1,
        then: (schema) => schema.required("Le prénom du fournisseur est obligatoire"),
        otherwise: (schema) => schema.notRequired(),
      }),
      sexe: Yup.string().when("statut", {
        is: 1,
        then: (schema) => schema.required("Le sexe est obligatoire"),
        otherwise: (schema) => schema.notRequired(),
      }),
      adresseFournisseur: Yup.string().notRequired(),
      email: Yup.string().email("Veuillez entrer un email valide").notRequired(),
      telFournisseur1: Yup.string()
        .typeError("Veuillez entrer des chiffres")
        .required("Le téléphone 1 est obligatoire"),
      telFournisseur2: Yup.string().typeError("Veuillez entrer des chiffres").notRequired(),
      ifu: Yup.string()
        .typeError("Veuillez entrer des chiffres")
        .required("L'IFU est obligatoire"),
      sigle: Yup.string().when("statut", {
        is: 2, // Personne Morale
        then: (schema) => schema.required("Le sigle est obligatoire"),
        otherwise: (schema) => schema.notRequired(),
      }),
      denomination: Yup.string().when("statut", {
        is: 2,
        then: (schema) =>
          schema.required("La dénomination est obligatoire"),
        otherwise: (schema) => schema.notRequired(),
      }),
      rccm: Yup.string().when("statut", {
        is: 2,
        then: (schema) =>
          schema.required("Le registre de commerce est obligatoire"),
        otherwise: (schema) => schema.notRequired(),
      }),
      dateCreation: Yup.date().when("statut", {
        is: 2,
        then: (schema) =>
          schema.required("La date de création est obligatoire"),
        otherwise: (schema) => schema.notRequired(),
      }),
    });

    const handleStatutChange = (selectedValue: number) => {
      defaultStatut.value = selectedValue;
      showAdditionalFields.value = selectedValue === 1; // Met à jour dynamiquement
    };

 

    const addFournisseur = async (values: any, { resetForm }: any) => {
      try {
        const { data } = await ApiService.post("/fournisseurs", values);
        if (data.code === 201) {
          success(data.message);
          resetForm();
          router.push({ name: "ListeFournisseurPage" });
        }
      } catch (err) {
        error(err.response?.data?.message || "Une erreur s'est produite");
      }
    };

    return {
      fournisseurForm,
      fournisseurSchema,
      statutOptions,
      defaultStatut,
      showAdditionalFields,
      handleStatutChange,
      addFournisseur
    };
  },
});
</script>
