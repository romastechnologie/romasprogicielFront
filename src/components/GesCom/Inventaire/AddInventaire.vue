<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        @submit="addInventaire"
        :validation-schema="inventaireSchema"
        :keep-values="valuess"
      >
            <div class="row">
            <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de début <span class="text-danger">*</span>
                  </label>
                  <Field name="dateDebut" type="datetime-local" :value="getCurrentDateTime()"
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateDebut" class="text-danger"/>
              </div>
              <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de fin <span class="text-danger">*</span>
                  </label>
                  <Field name="dateFin" type="datetime-local" :value="getCurrentDateTime()"
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
                <ErrorMessage name="dateFin" class="text-danger"/>
              </div>
              <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Personnes concernées <span class="text-danger">*</span>
                </label>
                <Field  name="personnel"  v-slot="{ field }">
                  <Multiselect
                    :options="personneOptions"
                    :searchable="true"
                    multiple="true"
                    mode="tags"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionnez les personnes"
                  />
                </Field>  
                <ErrorMessage name="personnel" class="text-danger"/>
              </div>
            </div>
              <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Motif
              </label>
              <Field
                name="motif"
                as="textarea"
                cols="15"
                rows="6"
                placeholder="Entrer le motif"
                v-slot="{ field }"
                class="form-control shadow-none rounded-0 text-black"
              >
                <textarea
                  class="form-control shadow-none rounded-0 text-black"
                  v-model="field.value"
                ></textarea>
              </Field>
              <ErrorMessage name="motif" class="text-danger" />
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
                                      :readOnly="true"
                                      class="d-block text-black fw-semibold mb-10" 
                                      
                                    >
                                      Quantité Logique<span class="text-danger">*</span>
                                    </label>
                                  </div>
                                  <div class="col-md-2">
                                    <label
                                      class="d-block text-black fw-semibold mb-10"
                                    >
                                    Quantité physique<span class="text-danger"
                                        >*</span
                                      >
                                    </label>
                                  </div>
                                  <div class="col-md-2">
                                    <label
                                      class="d-block text-black fw-semibold mb-10" 
                                      :readOnly="true"
                                    >
                                      Ecart<span class="text-danger">*</span>
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
                                        :readonly="true"
                                        v-model="produit.qtiteLogique"
                                        :class="
                                          validateRowProduit(produit.qtiteLogique)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer la quantité"
                                      />
                                      <div
                                        v-if="validateRowProduit(produit.qtiteLogique)"
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
                                        v-model="produit.qtitePhysique"
                                        type="number"
                                        :class="
                                          validateRowProduit(produit.qtitePhysique)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer la quantité"
                                      />
                                      <div
                                        v-if="validateRowProduit(produit.qtitePhysique)"
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
                                        v-model="produit.ecart"
                                        :readonly="true"
                                        type="number" 
                                        :class="
                                          validateRowProduit(produit.ecart)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer l'écart"
                                      />
                                      <div
                                        v-if="validateRowProduit(produit.ecart)"
                                        class="invalid-feedback"
                                      >
                                        L'écart est obligatoire.
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

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }"
              >
                Ajouter un inventaire
              </button>
              <router-link
                to="/inventaires/liste-inventaires"
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
  Inventaire,
  InventaireDepot,
} from "@/models/Inventaire";
import { Produit, ProduitDepot   } from "@/models/Produit";
import { MagasinDepot } from "@/models/Magasin";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "AddInventaire",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup: () => {
    const inventaireSchema = Yup.object().shape({
      dateDebut: Yup.date().typeError('Entrer une date valide').required('La date de debut est obligatoire'),
      dateFin: Yup.string().typeError('Entrer une date valide').required('La date de fin est obligatoire'),
      // client: Yup.string().required("Le client est obligatoire"),
      motif: Yup.string().notRequired(),
      personnel: Yup.array().required('Les personnes sont obligatoires'),
    });

    const inventaireForm = ref<Inventaire | null>(null);
    const router = useRouter();
    const clientOptions = ref([]);
    const magasinOptions = ref([]);
    const produitOptions = ref([]);
    const personneOptions = ref([]);

    // formulaire dynamique start
    const isDisable = ref(true);
    const magasins = reactive([
  {
    magasin: '',
    produits: [
      {
        produit: '',
        qtitePhysique: 0,
        qtiteLogique: 0,
        ecart: 0,
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
        qtitePhysique: 0,
        qtiteLogique: 0,
        ecart: 0,
      },
    ],
  });
};

const addRowProduit = (magasinIndex) => {
  magasins[magasinIndex].produits.push({
    produit: '',
    qtitePhysique: 0,
    qtiteLogique: 0,
    ecart: 0,
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
  produit.qtitePhysique = 0;
  // produit.qtiteLogique = selectedProduit.split("|")[2];
  produit.qtiteLogique = parseFloat(selectedProduit.split("|")[2]);
  // produit.ecart = produit.qtiteLogique - produit.qtitePhysique;
  calculEcart(produit);
};

const calculEcart = (produit) => {
    produit.ecart = produit.qtiteLogique - produit.qtitePhysique;
};
watch(
  () => magasins,
  (newMagasins) => {
    newMagasins.forEach(magasin => {
      magasin.produits.forEach(produit => {
        calculEcart(produit);
      });
    });
  },
  { deep: true }
);


const fetchPersonnes = async () => {
      try {
        const response = await ApiService.get('all/personnels');
        const personneData = response.data.data.data;
        personneOptions.value = personneData.map((personnels) => ({
          value: personnels.id,
          label: `${personnels.nom}`,
        }));
      } catch (error) {
        //
      }
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
            produit.qtitePhysique === 0 ||
            produit.qtitePhysique < 0 ||
            produit.qtiteLogique === 0 ||
            produit.ecart === 0
        )
    );
  },
  { deep: true }
);


    onMounted(() => {
      fetchMagasins();
      fetchClient();
      fetchProduits();
      fetchPersonnes();
    });

    const { remove, push, fields, update } = useFieldArray("magasins");
    const magasinsss: any = ref(null);
    const produitsss: any = ref(null);
    const valuess = ref();

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
        //
      }
    };

    const fetchProduits = async () => {
      try {
        const response = await axios.get("all/produits");
        const produitsData = response.data.data.data;
        produitsss.value = produitsData;
        produitOptions.value = produitsData.map((produit) => ({
          value: produit.id + "|" + produit.nomProd + "|" + produit.qtiteLogique,
          label: `${produit.refProd} - ${produit.nomProd}`,
        }));
      } catch (error) {
        //
      }
    };

    // const getCurrentDate = () => {
    //   const today = new Date();
    //   const day = String(today.getDate()).padStart(2, "0");
    //   const month = String(today.getMonth() + 1).padStart(2, "0");
    //   const year = today.getFullYear();
    //   return `${year}-${month}-${day}`;
    // };

    const getCurrentDateTime = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const addInventaire = async (values, { resetForm }) => {
      values.magasins = magasins.map((magasin) => ({
        magasin: magasin.magasin.split('|')[0],
        produits: magasin.produits.map((produit) => ({
          produit: produit.produit.split('|')[0],
          qtitePhysique: produit.qtitePhysique,
          qtiteLogique: produit.qtiteLogique,
          ecart: produit.ecart,
          nomProd: produit.produit.split('|')[1],
        })),
      }));
      console.log('DOnnées =>', values)
      // ApiService.post("/inventaires", values)
      //   .then(({ data }) => {
      //     if (data.code == 201) {
      //       success(data.message);
      //       resetForm();
      //       router.push({ name: "ListeInventairePage" });
      //     }
      //   })
      //   .catch(({ response }) => {
      //     error(response.data.message);
      //   });
    };

    const fetchClient = async () => {
      try {
        const response = await ApiService.get("all/clients");
        const fournisseurData = response.data.data.data;
        clientOptions.value = fournisseurData.map((client) => ({
          value: client.id,
          label: `${
            client.nomClient
              ? client.nomClient + '' + client.prenomClient
              : client.raisonSociale
          }`,
        }));
      } catch (error) {
        //
      }
    };

    return {
      inventaireSchema,
      addInventaire,
      inventaireForm,
      magasins,
      removeRowMagasin,
      removeRowProduit,
      addRowMagasin,
      addRowProduit,
      validateRowProduit,
      valuess,
      clientOptions,
      magasinOptions,
      produitOptions,
      selectProd,
      isDisable,
      getCurrentDateTime,
      selectMag,
      personneOptions
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