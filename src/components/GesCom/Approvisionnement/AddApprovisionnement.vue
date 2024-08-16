<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        @submit="addApprovisionnement"
        :validation-schema="approvisionnementSchema"
        :keep-values="valuess"
      >
        <div class="row">
          <div class="col-md-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date
              </label>
              <Field
                name="dateAppro"
                type="date"
                :value="getCurrentDate()"
                class="form-control shadow-none fs-md-15 text-black"
              />
            <ErrorMessage name="dateAppro" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Fournisseur <span class="text-danger">*</span>
              </label>
              <Field name="fournisseur" v-slot="{ field }">
                <Multiselect
                  :options="fournisseurOptions"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le fournisseur"
                />
              </Field>
            <ErrorMessage name="fournisseur" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Référence <span class="text-danger">*</span>
              </label>
              <Field
                name="refAppro"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la référence"
              />
              <ErrorMessage name="refAppro" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Montant total <span class="text-danger">*</span>
              </label>
              <Field
                name="montantTotal"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le montant total"
              />
              <ErrorMessage name="montantTotal" class="text-danger" />
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
                              <div class="col-md-7">
                                <h4 class="fs-4 text-white">Magasins</h4>
                              </div>
                              <div class="col-md-5">
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
                                  <div class="col-md-2">
                                    <label
                                      class="d-block text-black fw-semibold mb-10"
                                    >
                                      Quantité<span class="text-danger">*</span>
                                    </label>
                                  </div>
                                  <div class="col-md-2">
                                    <label
                                      class="d-block text-black fw-semibold mb-10"
                                    >
                                      Prix de revient
                                      >
                                    </label>
                                  </div>
                                  <div class="col-md-2">
                                    <label
                                      class="d-block text-black fw-semibold mb-10"
                                    >
                                      Montant<span class="text-danger">*</span>
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
                                  <div class="col-md-2">
                                    <div
                                      class="form-group mb-15 mb-sm-20 mb-md-25"
                                    >
                                      <input
                                        type="number"
                                        v-model="produit.qtite"
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
                                  <div class="col-md-2">
                                    <div
                                      class="form-group mb-15 mb-sm-20 mb-md-25"
                                    >
                                      <input
                                        v-model="produit.prixRevient"
                                        type="number"
                                         class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Entrer le prix"
                                      />
                                      <!--<div
                                        v-if="validateRowProduit(produit.prixRevient)"
                                        class="invalid-feedback"
                                      >
                                        Le prix de revient est obligatoire.
                                      </div>-->
                                    </div>
                                  </div>
                                  <div class="col-md-2">
                                    <div
                                      class="form-group mb-15 mb-sm-20 mb-md-25"
                                    >
                                      <input
                                        v-model="produit.montant"
                                        type="number"
                                        :readonly="true"
                                        :class="
                                          validateRowProduit(produit.montant)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer le montant"
                                      />
                                      <div
                                        v-if="validateRowProduit(produit.montant)"
                                        class="invalid-feedback"
                                      >
                                        Le montant est obligatoire.
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
                                <div class="col-md-12 mt-25 mb-25 marge-droite">
                                  <div class="d-flex">
                                    <button
                                      class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                      type="button"
                                      @click="addRowProduit(magasinIndex)"
                                    >
                                      <i
                                        class="fa fa-plus-circle position-relative ms-5 fs-12"
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

          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }"
              >
                Ajouter un approvisionnement
              </button>
              <router-link
                to="/approvisionnements/liste-approvisionnements"
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
import {
  Approvisionnement,
  ApprovisionnementDepot,
} from "@/models/Approvisionnement";
import { Produit, ProduitDepot } from "@/models/Produit";
import { MagasinDepot } from "@/models/Magasin";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "AddApprovisionnement",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup: () => {
    const approvisionnementSchema = Yup.object().shape({
      refAppro: Yup.string().required("La reference est obligatoire"),
      montantTotal: Yup.number()
        .typeError("Veuillez entrer un nombre")
        .required("Le montant est obligatoire"),
      dateAppro: Yup.date().required("La date est obligatoire"),
      fournisseur: Yup.string().required("La fournisseur est obligatoire"),
    });

    const approvisionnementForm = ref<Approvisionnement | null>(null);
    const router = useRouter();
    const fournisseurOptions = ref([]);
    const magasinOptions = ref([]);
    const produitOptions = ref([]);

    // formulaire dynamique start
    const isDisable = ref(true);
    const magasins = reactive([
  {
    magasin: '',
    produits: [
      {
        produit: '',
        prixRevient: 0,
        qtite: 0,
        montant: 0,
      },
    ],
  },
]);

const addRowMagasin = () => {
  magasins.push({
    magasin: '',
    produits: [
      {
        produit: '',
        prixRevient: 0,
        qtite: 0,
        montant: 0,
      },
    ],
  });
};

const addRowProduit = (magasinIndex) => {
  magasins[magasinIndex].produits.push({
    produit: '',
    prixRevient: 0,
    qtite: 0,
    montant: 0,
  });
};

const removeRowMagasin = (index) => {
  magasins.splice(index, 1);
};

const removeRowProduit = (magasinIndex, produitIndex) => {
  magasins[magasinIndex].produits.splice(produitIndex, 1);
};

const selectMag = (selectedMagasin, magasin) => {
  magasin.magasin = selectedMagasin;
};

const selectProd = (selectedProduit, produit) => {
  produit.produit = selectedProduit;
  produit.prixRevient = 0;
  produit.montant = 0;
  produit.qtite = 0;
};

const validateRowProduit = (e) => {
  return e === '' || e === 0 || e === '0' || e == null || e < 0;
};

    watch(
  magasins,
  (newValue) => {
    isDisable.value = newValue.some(
      (magasin) =>
        magasin.magasin === '' ||
        magasin.produits.some(
          (produit) =>
            produit.produit === '' ||
            produit.prixRevient === 0 ||
            produit.qtite === 0 ||
            produit.montant === 0
        )
    );
  },
  { deep: true }
);

    // watch(magasins, (newValue, oldValue) => {
    //   Object.keys(newValue).forEach(function (key) {
    //     if (
    //       newValue[key].magasin == ""
    //     ) {
    //       isDisable.value = true;
    //     } else {
    //       isDisable.value = false;
    //     }
    //   });
    // });

    // watch(produits, (newValue, oldValue) => {
    //   Object.keys(newValue).forEach(function (key) {
    //     if (
    //       newValue[key].produit == "" ||
    //       newValue[key].prixRevient == "" ||
    //       newValue[key].qtite == "" ||
    //       newValue[key].montant == ""
    //     ) {
    //       isDisable.value = true;
    //     } else {
    //       isDisable.value = false;
    //     }
    //   });
    // });

    const { remove, push, fields, update } = useFieldArray("magasins");

    const magasinsss: any = ref(null);
    const produitsss: any = ref(null);
    const valuess = ref();

    const fetchMagasins = async () => {
      try {
        const response = await axios.get("/magasins");
        const magasinsData = response.data.data.data;
        magasinsss.value = magasinsData;
        magasinOptions.value = magasinsData.map((magasin) => ({
          value: magasin.id + "|" + magasin.nomMagasin,
          label: `${magasin.nomMagasin}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchProduits = async () => {
      try {
        const response = await axios.get("/produits");
        const produitsData = response.data.data.data;
        produitsss.value = produitsData;
        produitOptions.value = produitsData.map((produit) => ({
          value: produit.id + "|" + produit.nomProd,
          label: `${produit.refProd} - ${produit.nomProd}`,
        }));
      } catch (error) {
        //
      }
    };

    const idApprovisionnement = ref(0);
    const idProduit = ref(0);

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const addApprovisionnement = async (values, { resetForm }) => {
      console.log('Dedans')
      values.magasins = magasins.map((magasin) => ({
        magasin: magasin.magasin.split('|')[0],
        produits: magasin.produits.map((produit) => ({
          produit: produit.produit.split('|')[0],
          prixRevient: produit.prixRevient,
          qtite: produit.qtite,
          montant: produit.montant,
          nomProd: produit.produit.split('|')[1],
        })),
      }));
      // values.produits = produits.map(produit => ({
      //   produit: produit.produit.split("|")[0],
      //   prixRevient: produit.prixRevient,
      //   qtite: produit.qtite,
      //   montant: produit.montant,
      //   nomProd: produit.produit.split("|")[1],
      // }));
      console.log('Données envoyées', values)
      // ApiService.post("/approvisionnements", values)
      //   .then(({ data }) => {
      //     if (data.code == 201) {
      //       success(data.message);
      //       resetForm();
      //       router.push({ name: "ListeApprovisionnementPage" });
      //     }
      //   })
      //   .catch(({ response }) => {
      //     error(response.data.message);
      //   });
    };

    const fetchFournisseur = async () => {
      try {
        const response = await ApiService.get("/fournisseurs");
        const fournisseurData = response.data.data.data;
        fournisseurOptions.value = fournisseurData.map((fournisseur) => ({
          value: fournisseur.id,
          label: `${
            fournisseur.nomFournisseur
              ? fournisseur.nomFournisseur
              : fournisseur.denomination
          }`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchFournisseur();
      fetchMagasins();
      fetchProduits();
    });

    return {
      approvisionnementSchema,
      addApprovisionnement,
      approvisionnementForm,
      fournisseurOptions,
      magasins,
      removeRowMagasin,
      removeRowProduit,
      addRowMagasin,
      addRowProduit,
      validateRowProduit,
      valuess,
      idApprovisionnement,
      produitOptions,
      selectProd,
      selectMag,
      isDisable,
      getCurrentDate,
      magasinOptions,
    };
  },
});
</script>

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}
.marge-droite {
  margin-left: 87px;
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
