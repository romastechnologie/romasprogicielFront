<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="congeForm" @submit="addConge" :validation-schema="congeSchema">
        <div class="row">
          <div class="col-md-12 mb-3">
            <button
              type="button"
              class="btn btn-primary d-flex align-items-center"
              @click="toggleForm"
            >
              <i
                class="me-2"
                :class="
                  isWithDemande ? 'fa fa-arrow-right' : 'fa fa-arrow-left'
                "
                aria-hidden="true"
              ></i>
              {{
                isWithDemande
                  ? "Passer au Congé sans demande"
                  : "Retourner sur Congé avec demande"
              }}
            </button>
          </div>

          <template v-if="isWithDemande">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Demande <span class="text-danger">*</span>
                </label>
                <Field name="demande" v-slot="{ field }">
                  <Multiselect
                    :options="demandeOptions"
                    :searchable="true"
                    track-by="value"
                    label="label"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner la demande"
                    @change="onDemandeSelected(field.value)"
                  />
                </Field>
                <ErrorMessage name="demande" class="text-danger" />
              </div>
            </div>
          </template>

          <template v-if="!isWithDemande">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Personnel <span class="text-danger">*</span>
                </label>
                <Field name="personnel" v-slot="{ field }">
                  <Multiselect
                    :options="personnelOptions"
                    :searchable="true"
                    track-by="value"
                    label="label"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner le personnel"
                  />
                </Field>
                <ErrorMessage name="personnel" class="text-danger" />
              </div>
            </div>
          </template>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de début <span class="text-danger">*</span>
              </label>
              <Field
                name="dateDebut"
                type="date"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la date"
                v-model="dateDebut"
              />
              <ErrorMessage name="dateDebut" class="text-danger" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de fin prévu <span class="text-danger">*</span>
              </label>
              <Field
                name="dateFinPrevu"
                type="date"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la date"
                v-model="dateFinPrevu"
              />
              <ErrorMessage name="dateFinPrevu" class="text-danger" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de reprise <span class="text-danger">*</span>
              </label>
              <Field
                name="dateReprise"
                type="date"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la date"
                v-model="dateReprise"
              />
              <ErrorMessage name="dateReprise" class="text-danger" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date fin <span class="text-danger">*</span>
              </label>
              <Field
                name="dateFin"
                type="date"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la date"
                v-model="dateFin"
              />
              <ErrorMessage name="dateFin" class="text-danger" />
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit">
                Programmer maintenant
              </button>
              <router-link to="/conges/liste-conge" class="btn btn-danger"
                ><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link
              >
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import ApiService from "@/services/ApiService";
import { error, success } from "@/utils/utils";
import Multiselect from "@vueform/multiselect/src/Multiselect";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AddConge",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },

  setup() {
    const isWithDemande = ref(true);
    const toggleForm = () => {
      isWithDemande.value = !isWithDemande.value;
    };

    const congeSchema = computed(() => {
      return Yup.object().shape({
        ...(isWithDemande.value
          ? {
              demande: Yup.string().required("Demande est obligatoire."),
            }
          : {
              personnel: Yup.string().required("Personnel est obligatoire."),
            }),
        dateDebut: Yup.string().required("Date Début est obligatoire."),
        dateReprise: Yup.string().required("Date Reprise est obligatoire."),
        dateFinPrevu: Yup.string().required("Date Fin Prévu est obligatoire."),
        dateFin: Yup.string().required("Date Fin est obligatoire."),
      });
    });
    const dateDebut = ref("");
    const dateFinPrevu = ref("");
    const dateReprise = ref("");
    const dateFin = ref("");
    const demandeOptions = ref([]);
    const personnelOptions = ref([]);
    const router = useRouter();

    const addConge = async (values, { resetForm }) => {
      ApiService.post("/conges", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeCongePage" });
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchPersonnel = async () => {
      try {
        const response = await axios.get("all/personnels");
        personnelOptions.value = response.data.data.data.map((personnel) => ({
          value: personnel.id,
          label: personnel.nom + " " + personnel.prenom,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des personnels.");
      }
    };

    const fetchDemande = async () => {
      try {
        const response = await axios.get("/demandeconge");
        demandeOptions.value = response.data.data.map((demande) => ({
          value: demande.id,
          label: demande.motifDemande,
        }));
      } catch (err) {
        error("Erreur lors de la récupération des demandes.");
      }
    };

    const getDemande = async (id) => {
      try {
        const { data } = await ApiService.get(`/demande/${id}`);

        dateDebut.value = data.data.dateDebut;
        dateFinPrevu.value = data.data.dateFinPrevu;
        dateReprise.value = data.data.dateReprise;
        dateFin.value = data.data.dateFin;
      } catch (err) {
        error("Erreur lors de la récupération des détails de la demande.");
      }
    };

    const onDemandeSelected = (selectedDemandeId) => {
      if (selectedDemandeId) {
        getDemande(selectedDemandeId);
      } else {
        console.error("demande ID  indefini.");
      }
    };

    onMounted(fetchDemande);
    onMounted(fetchPersonnel);

    return {
      isWithDemande,
      toggleForm,
      congeSchema,
      addConge,
      demandeOptions,
      personnelOptions,
      dateDebut,
      dateFinPrevu,
      dateReprise,
      dateFin,
      onDemandeSelected,
    };
  },
});
</script>
