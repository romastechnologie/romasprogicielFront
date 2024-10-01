<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        @submit="addSortie"
        :validation-schema="sortieSchema"
        :keep-values="valuess"
      >
        <div class="row">
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Personne concernée <span class="text-danger">*</span>
              </label>
              <Field name="client" v-slot="{ field }">
                <Multiselect
                  :options="clientOptions"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le client"
                />
              </Field>
            </div>
            <ErrorMessage name="client" class="text-danger" />
          </div>
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif
              </label>
              <Field
                name="motifSortie"
                as="textarea"
                cols="30"
                rows="12"
                placeholder="Entrer les motifSorties"
                v-slot="{ field }"
                class="form-control shadow-none rounded-0 text-black"
              >
                <textarea
                  class="form-control shadow-none rounded-0 text-black"
                  v-model="field.value"
                ></textarea>
              </Field>
              <ErrorMessage name="motifSortie" class="text-danger" />
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
                    Approvisionner les magasins en produit
                  </button>
                </h2>
                <div
                  id="basicCollapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#basicAccordion"
                >
                  <div class="accordion-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
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
                        ></button>
                      </li>
                    </ul>

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
                              class="row d-flex align-items-center justify-content-between fw-bold py-2 bg-primary"
                            >
                              <div class="col-md-6">
                                <h4 class="fs-4 text-white">Magasins</h4>
                              </div>
                              <div class="col-md-3">
                                <div class="d-flex align-items-center">
                                  <div class="p-6 bg-ecf3f2">
                                    <span
                                      class="d-block fw-medium text-black-emphasis fs-13 text-uppercase"
                                      >Montant total: {{ montantTotal }}</span
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': isDisable }"
                                    :disabled="isDisable"
                                    @click="addRowMagasin()"
                                  >
                                    <i
                                      class="fa fa-plus-circle position-relative ms-5 fs-12"
                                    ></i
                                    >Ajouter un magasin
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
                                <div class="col-md-10">
                                  <label class="d-block text-black fw-semibold">
                                    Magasin
                                    <span class="text-danger">*</span>
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
                                v-for="(magasin, magasinIndex) in magasins" :key="magasinIndex"
                              >
                                <div class="col-md-10 mb-5">
                                  <div class="">
                                    <Multiselect
                                      :options="magasinOptions"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="magasin.magasin"
                                      placeholder="Sélectionner le magasin"
                                      @select="
                                        selectMag(magasin.magasin, magasin)
                                      "
                                    />
                                  </div>
                                </div>
                                <div class="col-md-2">
                                  <button
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    type="button"
                                    @click="removeRowMagasin(magasinIndex)"
                                  >
                                    <i
                                      class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                                    ></i>
                                  </button>
                                </div>

                                <!-- Produit -->
                                <div class="row mt-10 marge-droite">
                                  <div class="col-md-3">
                                    <label
                                      class="d-block text-black fw-semibold"
                                    >
                                      Produit
                                      <span class="text-danger">*</span>
                                    </label>
                                  </div>
                                  <div class="col-md-3">
                                    <label
                                      class="d-block text-black fw-semibold mb-10"
                                    >
                                      Prix unitaire<span class="text-danger"
                                        >*</span
                                      >
                                    </label>
                                  </div>
                                  <div class="col-md-3">
                                    <label
                                      class="d-block text-black fw-semibold mb-10"
                                    >
                                      Quantité<span class="text-danger">*</span>
                                    </label>
                                  </div>

                                  <div class="col-md-3">
                                    <label
                                      class="d-block text-black fw-semibold mb-10"
                                    >
                                      Action
                                    </label>
                                  </div>
                                  <hr class="mt-0 hr-longeur" />
                                </div>
                                <div
                                  class="row marge-droite"
                                  v-for="(produit, produitIndex) in magasin.produits" :key="produitIndex"
                                >
                                  <div class="col-md-3">
                                    <div
                                      class="form-group mb-15 mb-sm-20 mb-md-25"
                                    >
                                      <Multiselect
                                        :options="produitOptions"
                                        :searchable="true"
                                        track-by="label"
                                        label="label"
                                        v-model="produit.produit"
                                        placeholder="Sélectionner le produit"
                                        @select="
                                          selectProd(produit.produit, produit)
                                        "
                                      />
                                      <div
                                        class="invalid-feedback"
                                        v-if="
                                          validateRowProduit(produit.produit)
                                        "
                                      >
                                        Le produit est obligatoire.
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-3">
                                    <div
                                      class="form-group mb-15 mb-sm-20 mb-md-25"
                                    >
                                      <input
                                        v-model="produit.prixUnitaire"
                                        @input="getIndex($event, produit)"
                                        type="number"
                                        :class="
                                          validateRowProduit(produit.prixUnitaire)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer le prix"
                                      />
                                      <div
                                        v-if="validateRowProduit(produit.prixUnitaire)"
                                        class="invalid-feedback"
                                      >
                                        Le prix unitaire est obligatoire.
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-3">
                                    <div
                                      class="form-group mb-15 mb-sm-20 mb-md-25"
                                    >
                                      <input
                                        type="number"
                                        v-model="produit.qtite"
                                        @input="getIndex($event, produit)"
                                        :class="
                                          validateRowProduit(produit.qtite)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer la quantité"
                                      />
                                      <div
                                        v-if="validateRowProduit(produit.qtite)"
                                        class="invalid-feedback"
                                      >
                                        La quantité est obligatoire.
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-3 mb-5">
                                    <button
                                      class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                      type="button"
                                      @click="removeRowProduit(magasinIndex, produitIndex)"
                                    >
                                      <i
                                        class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                                <div class="d-flex justify-content-center mb-4">
                                  <div class="d-flex">
                                    <button
                                      class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                      type="button"
                                      @click="addRowProduit(magasinIndex)"
                                    >
                                      <i
                                        class="fa fa-plus-circle position-relative me-3"
                                      ></i
                                      >Ajouter un produit
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
          </div>

          <div class="col-md-12 mt-3" >
            <div class="d-flex justify-content-start mb-4">
              <button
                class="btn btn-success me-5"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }"
              >
                Ajouter une sortie
              </button>
              
              <router-link
                to="/sorties/liste-sorties"
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
import { Sortie, SortieDepot } from "@/models/Sortie";
import { Produit, ProduitDepot } from "@/models/Produit";
import { MagasinDepot } from "@/models/Magasin";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "AddSortie",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup: () => {
    const sortieSchema = Yup.object().shape({
      motifSortie: Yup.string().required("Le motif est obligatoire"),
      client: Yup.string().required(
        "La personne est oblgatoire est obligatoire"
      ),
    });

    const sortieForm = ref<Sortie | null>(null);
    const router = useRouter();
    const clientOptions = ref([]);
    const groupeTaxeOptions = ref([]);
    const modePrixOptions = ref([]);
    const magasinOptions = ref([]);
    const methodeOptions = ref([]);
    const produitOptions = ref([]);

    const idSortie = ref(0);
    const idProduit = ref(0);
    const prixProd = ref();
    const valuess = ref();
    // formulaire dynamique start

    const isDisable = ref(true);
const magasins = reactive([
  {
    magasin: "",
    produits: [
      {
        produit: "",
        qtite: 0,
        prixUnitaire: 0,
      },
    ],
  },
]);

const addRowMagasin = () => {
  magasins.push({
    magasin: "",
    produits: [
      {
        produit: "",
        qtite: 0,
        prixUnitaire: 0,
      },
    ],
  });
};

const addRowProduit = (magasinIndex) => {
  magasins[magasinIndex].produits.push({
    produit: "",
    qtite: 0,
    prixUnitaire: 0,
  });
};

const removeRowMagasin = (index) => {
  magasins.splice(index, 1);
  totals();
};

const removeRowProduit = (magasinIndex, produitIndex) => {
  magasins[magasinIndex].produits.splice(produitIndex, 1);
  totals();
};

const selectMag = (selectedMagasin, magasin) => {
  magasin.magasin = selectedMagasin;
};

const selectProd = (selectedProduit, produit) => {
  produit.produit = selectedProduit;
  produit.prixUnitaire = selectedProduit.split("|")[2];
  produit.qtite = 0;
  totals();
};

const validateRowProduit = (value) => {
  return value === "" || value === 0 || value === "0" || value == null || value < 0;
};

watch(
  magasins,
  (newValue) => {
    isDisable.value = newValue.some(
      (magasin) =>
        magasin.magasin === "" ||
        magasin.produits.some(
          (produit) =>
            produit.produit === "" ||
            produit.prixUnitaire === 0 ||
            produit.qtite === 0
        )
    );
  },
  { deep: true }
);

const montantTotal = ref(0);

const totals = () => {
  montantTotal.value = magasins.reduce((total, magasin) => {
    return total + magasin.produits.reduce((subtotal, produit) => {
      return subtotal + produit.qtite * produit.prixUnitaire;
    }, 0);
  }, 0);
  console.log("totals", montantTotal.value);
};

onMounted(() => {
  fetchMagasins();
  fetchProduits();
  fetchClient();
});

const magasinsss = ref(null);
const produitsss = ref(null);

const fetchMagasins = async () => {
  try {
    const response = await axios.get("all/magasins");
    const magasinsData = response.data.data.data;
    magasinsss.value = magasinsData;
    magasinOptions.value = magasinsData.map((magasin) => ({
      value: magasin.id + "|" + magasin.nomMagasin,
      label: `${magasin.nomMagasin}`,
    }));
  } catch (error) {
    console.error(error);
  }
};

const fetchProduits = async () => {
  try {
    const response = await axios.get("all/produits");
    const produitsData = response.data.data.data;
    produitsss.value = produitsData;
    produitOptions.value = produitsData.map((produit) => ({
      value: produit.id + "|" + produit.nomProd + "|" + produit.prixVente,
      label: `${produit.refProd} - ${produit.nomProd}`,
    }));
  } catch (error) {
    console.error(error);
  }
};

const getIndex = (event, produit) => {
  console.log("event", event.data);
  if (produit.qtite != null && produit.prixUnitaire != null) {
    montantTotal.value = produit.qtite * produit.prixUnitaire;
    console.log("getIndex", montantTotal.value);
  }
  totals();
};

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const addSortie = async (values, { resetForm }) => {
      values.magasins = magasins.map((magasin) => ({
        magasin: magasin.magasin.split("|")[0],
        produits: magasin.produits.map((produit) => ({
          produit: produit.produit.split("|")[0],
          qtitePhysique: produit.prixUnitaire,
          qtiteLogique: produit.qtite,
          nomProd: produit.produit.split("|")[1],
        })),
      }));
      console.log("Données envoyées", values);
      // ApiService.post("/sorties", values)
      //   .then(({ data }) => {
      //     if (data.code == 201) {
      //       success(data.message);
      //       resetForm();
      //       router.push({ name: "ListeSortiePage" });
      //     }
      //   })
      //   .catch(({ response }) => {
      //     error(response.data.message);
      //   });
    };

    const fetchClient = async () => {
      try {
        const response = await ApiService.get("all/clients");
        const clientData = response.data.data.data;
        clientOptions.value = clientData.map((client) => ({
          value: client.id,
          label: `${
            client.nomClient
              ? client.nomClient + " " + client.prenomClient
              : client.raisonSociale
          }`,
        }));
      } catch (error) {
        //
      }
    };

    return {
      sortieSchema,
      addSortie,
      sortieForm,
      clientOptions,
      modePrixOptions,
      groupeTaxeOptions,
      methodeOptions,
      magasins,
      removeRowMagasin,
      removeRowProduit,
      addRowMagasin,
      addRowProduit,
      validateRowProduit,
      montantTotal,
      valuess,
      idSortie,
      magasinOptions,
      produitOptions,
      prixProd,
      selectProd,
      selectMag,
      getIndex,
      isDisable,
      getCurrentDate,
    };
  },
});
</script>
@/models/CategorieInfo

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}
.marge-droite {
  margin-left: 150px;
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
