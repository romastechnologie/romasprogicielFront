<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        @submit="addModeleSignataire"
        :validation-schema="modeleSignataireSchema"
        :keep-values="valuess"
      >
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Désignation <span class="text-danger">*</span>
              </label>
              <Field
                name="designation"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la désignation"
              />
              <ErrorMessage name="designation" class="text-danger" />
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <br />
            <div class="form-check mt-3 mb-15 mb-sm-20 mb-md-25">
              <label
                for="estActif"
                class="form-check-label fw-medium position-relative top-1"
              >
                Est Défaut ?
              </label>
              <input
                id="estDefaut"
                name="estDefaut"
                v-model="estDefaut"
                :value="estDefaut"
                type="checkbox"
                class="form-check-input shadow-none"
              />
              <ErrorMessage name="estDefaut" class="text-danger" />
            </div>
          </div>
          
          <div class="col-md-12 mb-md-25">
            <div class="accordion" id="basicAccordion">
              <div class="accordion-item mb-0 bord1">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#basicCollapseOne"
                    aria-expanded="false"
                    aria-controls="basicCollapseOne"
                  >
                    Personnels et fonctions
                  </button>
                </h2>
                <div
                  id="basicCollapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#basicAccordion"
                >
                  <div class="accordion-body">
                    <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="home-tab-pane"
                          aria-selected="true"
                        >
                          Conditionnement
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="home2-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home2-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="home2-tab-pane"
                          aria-selected="false"
                        >
                          Image
                        </button>
                      </li>
                    </ul> -->

                    <div class="tab-content" id="myTabContent">
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
                                  Personnels et fonctions
                                </h3>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': isDisable }"
                                    :disabled="isDisable"
                                    @click="addRowPersonnelFonction()"
                                  >
                                    <i
                                      class="fa fa-plus-circle position-relative ms-5 fs-12"
                                    ></i>
                                    Ajouter un personnel
                                  </button>
                                  <router-link
                                    to="/liste-mouvements"
                                  ></router-link>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div
                                class="row d-flex align-items-center justify-content-between mt-10"
                              >
                                <div class="col-md-5">
                                  <label class="d-block text-black fw-semibold">
                                    Signataire
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-5">
                                  <label
                                    class="d-block text-black fw-semibold mb-10"
                                  >
                                    Fonction <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label
                                    class="d-block text-black fw-semibold mb-10"
                                  >
                                    Action
                                  </label>
                                </div>
                              </div>
                              <hr class="mt-0" />
                              <div
                                class="row"
                                v-for="(personnelFonction, index) in personnelFonctions"
                                :key="index"
                              >
                                <div class="col-md-5 mb-2">
                                  <div class="">
                                    <Multiselect
                                      :options="personnelOptions"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="personnelFonction.personnel"
                                      placeholder="Sélectionner le personnel"
                                    />
                                    <div
                                      class="invalid-feedback"
                                      v-if="valideteRowPersonnel(personnelFonction.personnel)"
                                    >
                                      Le personnel est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-5 mb-2">
                                  <div class="">
                                    <Multiselect
                                      :options="fonctionOptions"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="personnelFonction.fonction"
                                      placeholder="Sélectionner la Fonction"
                                    />
                                    <div
                                      class="invalid-feedback"
                                      v-if="valideteRowPersonnel(personnelFonction.fonction)"
                                    >
                                      La fonction est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-2 mb-2">
                                  <button
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    type="button"
                                    @click="removeRowPersonnelFonction(index)"
                                  >
                                    <i
                                      class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                                    ></i>
                                  </button>
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
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }"
              >
                Ajouter un produit
              </button>
              <router-link
                to="/liste-produits"
                class="btn btn-danger"
                ><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                ></i>
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
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
import { Form, Field, ErrorMessage, useFieldArray } from "vee-validate";
import { error, success } from "@/utils/utils";
import { useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";
import { ModeleSignataire } from '@/models/ModeleSignataire';

export default defineComponent({
  name: "AddProduit",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup: () => {
    const modeleSignataireSchema = Yup.object().shape({
      designation: Yup.string().required("La désignation est obligatoire"),
    });

    const personnelFonctionForm = ref<ModeleSignataire | null>(null);
    const router = useRouter();
    const personnelOptions = ref([]);
    const modePrixOptions = ref([]);
    const magasinOptions = ref([]);
    const estDefaut= ref(true)

    watch(estDefaut, () => {
      console.log('estservice', estDefaut.value)
    })


    // formulaire dynamique start

    const isDisable = ref(true);
    const personnelFonctions = reactive([
      {
        personnel: "",
        fonction: ""
      },
    ]);

    const addRowPersonnelFonction = () => {
      personnelFonctions.push({
        personnel: "",
        fonction: ""
      });
    };

    const removeRowPersonnelFonction = (index) => {
      if (personnelFonctions.length > 1) personnelFonctions.splice(index, 1);
      //totals();
    };

    const valideteRowPersonnel = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        return true;
      } else {
        return false;
      }
    };

  
    watch(personnelFonctions, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].personnel == "" ||
          newValue[key].fonction == ""
        ) {
          isDisable.value = true;
        } else {
          isDisable.value = false;
        }
      });
    });

    const { remove, push, fields, update } = useFieldArray("personnelFonctions");

    const fonctionOptions = ref([]);
    const produitsss: any = ref(null);
    const valuess = ref();

    const addModeleSignataire = async (values, { resetForm }) => {
      values.personnelFonctions = personnelFonctions.map(personnelFonction => ({
        personnel: personnelFonction.personnel,
        fonction: personnelFonction.fonction,
      }));
      console.log('values ====>', values);
      // ApiService.post("/produits", values)
      //   .then(({ data }) => {
      //     if (data.code == 201) {
      //       success(data.message);
      //       resetForm();
      //       router.push({ name: "ListeProduitPage" });
      //     }
      //   })
      //   .catch(({ response }) => {
      //     error(response.data.message);
      //   });
    };

    const fetchFonction = async () => {
      try {
        const response = await ApiService.get("/fonctions");
        const fonctionData = response.data.data.data;
        fonctionOptions.value = fonctionData.map((fonction) => ({
          value: fonction.id,
          label: `${fonction.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchPersonnel = async () => {
      try {
        const response = await ApiService.get("/personnels");
        const fonctionData = response.data;
        personnelOptions.value = fonctionData.map((personnel) => ({
          value: personnel.id,
          label: `${personnel.nom, + " " + personnel.prenom}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchPersonnel();
      fetchFonction();
    })

    return {
      modeleSignataireSchema,
      addModeleSignataire,
      personnelFonctionForm,
      personnelOptions,
      modePrixOptions,
      magasinOptions,
      personnelFonctions,
      removeRowPersonnelFonction,
      addRowPersonnelFonction,
      valideteRowPersonnel,
      valuess,
      fonctionOptions,
      isDisable,
      estDefaut,
    };
  },
});
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
.marge-droite {
  margin-left: 15px;
}
.hr-longeur {
  width: 80%;
}
.bord1 {
  border: 1px solid #07a;
}
.fond {
  background-color: rgb(94, 191, 233);
}
</style>
