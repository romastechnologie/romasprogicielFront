<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        @submit="addInventaire"
        :validation-schema="inventaireSchema"
        :keep-values="valuess">
          <div class="row">
            <div class="col-md-4">
              <h1></h1>
            </div>
          <div class="col-md-12 mb-md-25">
            <div class="row">
              <div class="border border-primary mb-10">
                <div class="row d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                  <div class="col-md-7">
                    <h4 class="fs-4 text-white px-5">Magasins</h4>
                  </div>
                  <div class="col-md-5">
                    <div class="d-flex float-end">
                     
                    </div>
                  </div>
                </div>
                <div>
                  <div class="row">
                    <!-- Produit -->
                    <div class="row mt-10">
                      <div class="col-md-4">
                        <label
                          class="d-block text-black fw-semibold">
                          Produit
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold mb-10" >
                          Stock Logique
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label  class="d-block text-black fw-semibold mb-10" >
                          Stock Fiche
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label  class="d-block text-black fw-semibold mb-10">Stock Mag
                        </label>
                      </div>
                      <div class="col-md-1">
                        <label
                          class="d-block text-black fw-semibold mb-10" :readOnly="true">Ecart Reel
                        </label>
                      </div>
                      <div class="col-md-1">
                        <label
                          class="d-block text-black fw-semibold mb-10" :readOnly="true">Ecart Log
                        </label>
                      </div>
                      <hr class="mt-0" />
                    </div>
                    <div
                      class="row gx-2 gy-0" v-for="(produit, produitIndex) in produits" :key="produitIndex">
                        <div class="col-md-4 mb-2">
                          <div class="form-group ">
                            <input
                              type="number"
                              v-model="produit.nomProd"
                              :class="
                                validateRowProduit(produit.nomProd)
                                  ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                  : 'form-control shadow-none fs-md-15 text-black '
                              "
                              placeholder="Entrer la quantité"
                            />
                            <div
                              class="invalid-feedback"
                              v-if="
                                validateRowProduit(produit.nomProd)" >
                              Le produit est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2 mb-2">
                          <div
                            class="form-group ">
                            <input
                              type="number"
                              v-model="produit.qteLogique"
                              :class="
                                validateRowProduit(produit.qteLogique)
                                  ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                  : 'form-control shadow-none fs-md-15 text-black '
                              "
                              placeholder="Entrer la quantité"
                            />
                            <div
                              v-if="validateRowProduit(produit.qteLogique)"
                              class="invalid-feedback">
                              La quantité est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2 mb-2">
                          <div
                            class="form-group "
                          >
                            <input
                              v-model="produit.qteFiche"
                              type="number"
                              :class="
                                validateRowProduit(produit.qteFiche)
                                  ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                  : 'form-control shadow-none fs-md-15 text-black '
                              "
                              placeholder="Entrer la quantité"/>
                            <div
                              v-if="validateRowProduit(produit.qteFiche)"
                              class="invalid-feedback">
                              La quantité est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2 mb-2">
                          <div
                            class="form-group "
                          >
                            <input
                              v-model="produit.qtePhysique"
                              type="number"
                              :class="
                                validateRowProduit(produit.qtePhysique)
                                  ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                  : 'form-control shadow-none fs-md-15 text-black '
                              "
                              placeholder="Entrer la quantité"/>
                            <div
                              v-if="validateRowProduit(produit.qtePhysique)"
                              class="invalid-feedback">
                              La quantité est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-1 mb-2">
                          <div class="form-group ">
                            <input
                              v-model="produit.ecartReel"
                              :readonly="true"
                              type="number" 
                              :class="
                                validateRowProduit(produit.ecartReel)
                                  ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                  : 'form-control shadow-none fs-md-15 text-black '"
                              placeholder="Entrer l'écart"
                            />
                            <div
                              v-if="validateRowProduit(produit.ecartReel)"
                              class="invalid-feedback"
                            >
                              L'écart est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-1">
                          <div class="form-group mb-2">
                            <input
                              v-model="produit.ecartLogique"
                              :readonly="true"
                              type="number" 
                              :class="
                                validateRowProduit(produit.ecartLogique)
                                  ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                  : 'form-control shadow-none fs-md-15 text-black '
                              "
                              placeholder="Entrer l'écart"
                            />
                            <div
                              v-if="validateRowProduit(produit.ecartLogique)"
                              class="invalid-feedback"
                            >
                              L'écart est obligatoire.
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
                :class="{ 'cursor-not-allowed': isDisable }">
                Mettre à jour l'inventaire
              </button>
              <button
                class="btn btn-primary me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }">
                  Cloturer l'inventaire
              </button>
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
import { useRoute, useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import {
  Inventaire,
} from "@/models/Inventaire";

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
    
    });

    const inventaireForm = ref<Inventaire | null>(null);
    const router = useRouter();
    const clientOptions = ref([]);
    const magasinOptions = ref([]);
    const produitOptions = ref([]);
    const personneOptions = ref([]);
    const magasin = ref();
    const route = useRoute();

    // formulaire dynamique start
    const isDisable = ref(true);
    const produits = reactive([
      {
        id: '',
        qtePhysique: 0,
        qteLogique: 0,
        qteFiche:0,
        ecartLogique: 0,
        ecartReel:0,
        observation:"",
        nomProd:'',
      },
    ]);

// const removeRowProduit = ( produitIndex) => {
//   produits.splice(produitIndex, 1);
// };

// const selectMag = (selectedMagasin) => {
//   fetchProduits(selectedMagasin.split("|")[0]);
// };

// const selectProd = (selectedProduit, produit) => {
//   produit.produit = selectedProduit;
//   calculEcart(produit);
// };

const calculEcart = (produit) => {
    produit.ecartLogique = produit.qtiteLogique - produit.qtitePhysique;
    produit.ecartReel = produit.qtiteFiche - produit.qtitePhysique;
};

watch(
  () => produits,
  (newProduits) => {
    newProduits.forEach(produit => {
        calculEcart(produit);
      });
  },
  { deep: true }
);


const validateRowProduit = (e) => {
  return e === '' || e == null || e < 0;
};

watch(
  produits,
  (newValue) => {
    isDisable.value =newValue.some(
      (produit) =>
        produit.id === '' 
        //  produit.qtiteFiche >= 0 ||
        //  produit.qtitePhysique >= 0 ||
        //  produit.qtiteLogique >= 0 
    );
  },
  { deep: true }
);


    onMounted(() => {
      if(route.params.id) {
        getAllInventaireById(route.params.id);
      }
      
    });


    const isDisables = ref(true);


    const magasinsss: any = ref(null);
    const produitsss: any = ref(null);
    const valuess = ref();
    const magasinss = ref("");
    // const fetchMagasins = async () => {
    //   try {
    //     const response = await axios.get("all/magasins");
    //     const magasinsData = response.data.data.data;
    //     magasinsss.value = magasinsData;
    //     magasinOptions.value = magasinsData.map((magasin) => ({
    //       value: magasin.id + "|" + magasin.nomMagasin,
    //       label: `${magasin.nomMagasin}`,
    //     }));
    //   } catch (error) {
    //     //
    //   }
    // };

    // const fetchProduits = async (magasin) => {
    //   try {
    //     const response = await axios.get("all/produitconditionnementmagasins/"+magasin);
       
    //     const produitsData = response.data.data;
    //     console.log(produitsData,"produitsDataproduitsDataproduitsDataproduitsData");
    //     produitOptions.value = produitsData.map((produit) => ({
    //       value: produit.id + "|" + produit.produitcondi.produit.nomProd + "|" + produit.qtiteLogique,
    //       label: `${produit.produitcondi.produit.refProd} - ${produit.produitcondi.produit.nomProd} [${produit.produitcondi.conditionnement.libelle}]`,
    //     }));
    //     console.log(produitOptions.value,"response.data.data");
    //   } catch (error) {
    //     //
    //     console.log(error,"errorerrorerror")
    //   }
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
      console.log('DOnnées =>', values)
      ApiService.post("/inventaires", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeInventairePage" });
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    function getAllInventaireById(id) {
        ApiService.get(`/inventaire/`+id)
          .then(({ data }) => {
            magasinss.value = data.data.data.magasin.libelle
            data.data.data.inventaiprocondimags.forEach(produit => {
            produits.push({
              id: produit.id,
              qtePhysique: produit.qtitePhysique,
              qteLogique: produit.qtiteLogique,
              qteFiche: produit.qtiteFiche,
              ecartReel: produit.ecartReel,
              ecartLogique: produit.ecartLogique,
              observation:"",
              nomProd: produit.nomProd
            })});
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
    }


    return {
      inventaireSchema,
      addInventaire,
      inventaireForm,
      validateRowProduit,
      produits,
      valuess,
      clientOptions,
      magasinOptions,
      magasin,
      produitOptions,
      isDisable,
      isDisables,
      getCurrentDateTime,
      personneOptions,
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