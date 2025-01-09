<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div
      class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form"
    >
      <Form
        ref="modeTarificationForm"
        @submit="sendPresence"
        :validation-schema="presenceSchema"
      >
        <div class="card rounded rounded-4 px-2 pt-4 py-4 overflow-auto">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="ref" class="form-label"
                    >Date du jour<span class="text-danger">*</span></label
                  >
                  <Field
                    name="date"
                    v-model="date"
                    @change="retourner"
                    class="form-control text-black text-center fs-6"
                    type="Date"
                  />
                  <ErrorMessage name="date" class="text-danger" />
                </div>
                <div class="col-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black mb-10">
                      Service <span class="text-danger">*</span>
                    </label>
                    <Field
                      name="service"
                      v-model="service"
                      type="text"
                      v-slot="{ field }"
                    >
                      <Multiselect
                        v-model="field.value"
                        v-bind="field"
                        :options="serviceOptions"
                        :preserve-search="true"
                        :multiple="false"
                        @change="voir"
                        :searchable="true"
                        placeholder="Sélectionner le service"
                        label="label"
                        track-by="label"
                      />
                    </Field>
                    <span class="text-danger" v-show="!service"
                      >Selectionner le service</span
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-md-25">
                  <div
                    class="tab-pane fade show active p-10"
                    id="home-tab-pane"
                    role="tabpanel"
                    tabindex="0"
                  >
                    <div class="row">
                      <div class="border border-primary mb-10">
                        <div
                          class="row d-flex align-items-center justify-content-between fw-bold py-2"
                          style="background-color: #0a59a4"
                        >
                          <div class="col-md-7">
                            <h3 class="fs-4 text-white">
                              Les présences du jours
                            </h3>
                          </div>
                        </div>
                        <div>
                          <div
                            class="row d-flex align-items-center justify-content-between mt-2"
                          >
                            <div class="col-md-4">
                              <label class="d-block text-black fw-semibold">
                                Personnel
                                <span class="text-danger">*</span>
                              </label>
                            </div>
                            <!-- <div class="col-md-2">
                              <label class="d-block text-black fw-semibold">
                                Heure reglementaire
                                <span class="text-danger">*</span>
                              </label>
                            </div> -->

                            <div class="col-md-2">
                              <label class="d-block text-black fw-semibold">
                                Heure d'arrivée
                                <span class="text-danger">*</span>
                              </label>
                            </div>
                            <!--<div class="col-md-2">
                              <label class="d-block text-black fw-semibold">
                                Duree
                                <span class="text-danger">*</span>
                              </label>
                            </div>-->
                            <!--<div class="col-md-2">
                              <label class="d-block text-black fw-semibold">
                                Status
                                <span class="text-danger">*</span>
                              </label>
                            </div>-->
                            <div class="col-md-4">
                              <label class="d-block text-black fw-semibold">
                                Observation
                                <span class="text-danger">*</span>
                              </label>
                            </div>
                          </div>
                          <hr class="mt-0" />
                          <div
                            class="row"
                            v-for="(presence, index) in lesPresences"
                            :key="index"
                            :disabled="presence.statut"
                          >
                            <div class="col-md-4 mb-2">
                              <div class="form-group">
                                <input
                                  disabled
                                  v-model="presence.identite"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Identité"
                                />
                                <div
                                  class="invalid-feedback"
                                  v-if="
                                    valideteRowHoraire(presence.identite, 0)
                                  "
                                >
                                  Champs obligatoire.
                                </div>
                              </div>
                            </div>
                            <div class="col-md-2 mb-2">
                              <div class="form-group">
                                <input
                                  disabled
                                  v-model="presence.heureReglementaire"
                                  type="time"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="08:00"
                                />
                                <div
                                  class="invalid-feedback"
                                  v-if="
                                    valideteRowHoraire(
                                      presence.heureReglementaire,
                                      0
                                    )
                                  "
                                >
                                  Champs obligatoire.
                                </div>
                              </div>
                            </div>
                            <div class="col-md-2 mb-2">
                              <div class="form-group">
                                <input
                                  :disabled="presence.etat"
                                  v-model="presence.heureArrivee"
                                  type="time"
                                  @input="
                                    calculerDureePourUuid(
                                      presence.uuid,
                                      presence.heureArrivee
                                    )
                                  "
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Saisir le nom"
                                />
                                <div
                                  class="invalid-feedback"
                                  v-if="
                                    valideteRowHoraire(presence.heureArrivee, 0)
                                  "
                                >
                                  Champs obligatoire.
                                </div>
                              </div>
                            </div>
                            <!--<div class="col-md-2 mb-2">
                              <div class="form-group">
                                <input
                                  disabled
                                  v-model="presence.duree"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="00:33"
                                />
                                <div
                                  class="invalid-feedback"
                                  v-if="valideteRowHoraire(presence.duree, 0)"
                                >
                                  Champs obligatoire.
                                </div>
                              </div>
                            </div>-->
                            <!-- <div class="col-md-2 mb-2">
                              <div class="form-group">
                                <input
                                  :disabled="presence.etat"
                                  v-model="presence.statut"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Status"
                                />
                                <div
                                  class="invalid-feedback"
                                  v-if="valideteRowHoraire(presence.statut, 0)"
                                >
                                  Champs obligatoire.
                                </div>
                              </div>
                            </div> -->
                            <div class="col-md-4 mb-2">
                              <div class="form-group">
                                <input
                                  :disabled="presence.etat"
                                  v-model="presence.statutJustifie"
                                  type="text"
                                  class="form-control shadow-none fs-md-15 text-black"
                                  placeholder="Saisir le motif"
                                />
                                <div
                                  class="invalid-feedback"
                                  v-if="
                                    valideteRowHoraire(
                                      presence.statutJustifie,
                                      0
                                    )
                                  "
                                >
                                  Champs obligatoire.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-3">
                <div class="d-flex align-items-center text-end">
                  <button  class="btn btn-success me-3" type="submit" :disabled="lesPresences.length > 0 ? false:true">
                    Ajouter
                  </button>
                  <router-link
                    to="/presences/liste-presence"
                    class="btn btn-danger"
                    ><i
                      class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                    ></i>
                    <span class="position-relative"></span>Annuler</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";

import * as Yup from "yup";
import { configure } from "vee-validate";
import {
  calculerDuree,
  generateUuid,
  success,
  error,
  warning,
} from "@/utils/utils";
import { onMounted, reactive, ref, watch } from "vue";
import ApiService from "@/services/ApiService";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import Swal from "sweetalert2";
import router from "@/router";

// export default defineComponent({
//   name: "AddPresence",
//   components: {
//     Form,
//     Field,
//     ErrorMessage,
//     Multiselect,
//   },
//   setup: () => {

//     configure({
//   validateOnBlur: true,
//   validateOnChange: true,
//   validateOnInput: true,
//   validateOnModelUpdate: false,
// });
//     return {}
//   }
// })

const date = ref();
const serviceOptions = ref([]);
const service = ref();
const lesPresences = ref<
  Array<{
    uuid: string | null;
    id: number | string | null;
    personnel: number | string | null;
    identite: string | null;
    heureReglementaire: string | null;
    heureArrivee: string | null;
    duree: string | null;
    etat: boolean | null;
    heureDepart: string | null;
    statut: string | null;
    statutJustifie: string | null;
  }>
>([]);

const presenceSchema = Yup.object().shape({
  date: Yup.string().required("La date est obligatoire"),
});

const personnels = ref([] as any[]);
const conges = ref([] as any[]);
const personnelsEnConge = ref<number[]>([]);

const calculerDureePourUuid = (uuid: any, heure: string) => {
  if (uuid && heure) {
    const index = lesPresences.value.findIndex((p) => p.uuid === uuid);
    if (index === -1) return;
    const presence = lesPresences.value[index];
    presence.heureArrivee = heure;
    presence.duree = calculerDuree(
      presence.heureReglementaire,
      presence.heureArrivee
    );
    lesPresences.value.splice(index, 1, presence);
  }
};

const getAllPersonnels = async (
  date: string = new Date().toISOString().slice(0, 10)
) => {
  try {
    const serviced = service.value;
    console.log("Date == >", date);
    console.log("serviced == >", serviced);
    if(!serviced){
      lesPresences.value= [];
      warning("Choississez le service")
      return;
    }
    const response = await ApiService.get(
      "/tout/personnels/" + date + `${serviced ? "/" + serviced : ""}`
    );
    personnels.value = response.data.data;
    console.log("UYUYUYUYII ===> ", personnels.value);
    lesPresences.value = personnels.value.map((element) => {
      const heureJour = element?.contrats[0]?.horaire_personnels[0]
        ?.heureArrivee
        ? element?.contrats[0]?.horaire_personnels[0]?.heureArrivee
        : "08:00";
      const con =
        element.personnelConges && element.personnelConges.length > 0
          ? true
          : false;
      return {
        uuid: generateUuid(),
        personnel: element.id,
        id:
          element.presences &&
          element.presences.length > 0 &&
          element.presences[0]?.id &&
          element.presences[0].id != ""
            ? element.presences[0].id
            : "",
        identite: element.nom + " " + element.prenom,
        heureReglementaire: heureJour,
        heureArrivee:
          element.presences &&
          element.presences.length > 0 &&
          element.presences[0].heureArrivee &&
          element.presences[0].heureArrivee != ""
            ? element.presences[0].heureArrivee
            : "",
        heureDepart:
          element.presences &&
          element.presences.length > 0 &&
          element.presences[0].heureDepart &&
          element.presences[0].heureDepart != ""
            ? element.presences[0].heureDepart
            : "",
        statut:
          con === true
            ? "Absent"
            : element.presences &&
              element.presences.length > 0 &&
              element.presences[0].statut &&
              element.presences[0].statut != ""
            ? element.presences[0].statut
            : "",
        duree:
          element.presences &&
          element.presences.length > 0 &&
          element.presences[0].duree &&
          element.presences[0].duree != ""
            ? element.presences[0].duree
            : "",
        etat:
          con === true
            ? true
            : element.presences &&
              element.presences.length > 0 &&
              element.presences[0].heureArrivee &&
              element.presences[0].heureArrivee != ""
            ? true
            : false,
        statutJustifie:
          con === true
            ? "En congé ou a une permission"
            : element.statutJustifie && element.statutJustifie != ""
            ? element.statutJustifie
            : "",
      };
    });
    console.log("UYUYUYUYUYUYUYUYUY ===> ", lesPresences.value);
  } catch (error) {
    console.error("Erreur lors de récupération des personnels:", error);
  }
};
async function sendPresence(values: any) {
  values["presences"] = lesPresences.value;
  try {
    console.log("La soumission est la suivante ===> ", values);
    const response = await ApiService.post(`/presences`, values);
    success("Présence enregistrée avec succès");
    router.push("/presences/liste-presence");
  } catch (error) {
    console.error("Erreur lors de la création du presence:", error);
    throw error;
  }
}

const voir = async(value: any) => {
  
  service.value = value;
  console.log("Voir ====>", value);
  console.log("SELECT  ====>", service.value);
  await getAllPersonnels(date.value);
};

const retourner = (dat: string) => {
  getAllPersonnels(date.value);
};

const getAllPersonnelConges = async () => {
  try {
    const response = await ApiService.get("/personnelConges");
    conges.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des congés:", error);
    //throw error;
  }
};

const valideteRowHoraire = (e, d) => {
  if (
    (e == "" || e == "" || e == 0 || e == "0" || e == null || e < 0) &&
    d != "0"
  ) {
    console.log("erg");
    return true;
  } else {
    return false;
  }
};

const getAllServices = async () => {
  try {
    const response = await ApiService.get(
      "/all/recupererToutesOrganisationSansFilsAvecParent"
    );

    console.log("rfrrf ===> ", response);
    const servicesData = response.data.data;
    console.log("465484635418416541 ===> ", servicesData);

    serviceOptions.value = servicesData.map((service) => ({
      value: service.id,
      label: `[ ${service?.organisation.nom} ] ` + service.nom,
    }));

    console.log("RYYYYY ==> ", serviceOptions);
  } catch (error) {
    console.log("RYYYYY5252 ==> ", error);
    //error(response.data.message)
  }
};

onMounted(() => {
  date.value = new Date().toISOString().slice(0, 10);
  getAllPersonnels(date.value);
  getAllServices();
});
</script>

<style></style>