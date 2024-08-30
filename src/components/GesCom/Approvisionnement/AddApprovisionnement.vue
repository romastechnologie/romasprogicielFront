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
            <div class="form-group ">
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
            <div class="form-group ">
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
            <div class="form-group ">
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
            <div class="form-group ">
              <label class="d-block text-black fw-semibold mb-10">
                Montant total <span class="text-danger">*</span>
              </label>
              <Field
                v-model="montantTotal"
                name="montantTotal"
                :readonly="true"
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le montant total"
              />
              <ErrorMessage name="montantTotal" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12 m-10">
              <div class="row">
                <div class="border border-primary mb-10">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                    <div class="col-md-7">
                      <h4 class="fs-4 text-white">Approvisionner les produits dans les magasins</h4>
                    </div>
                    <div class="col-md-5">
                      <div class="d-flex float-end">
                        <button
                          class="btn btn-success"
                          type="button"
                          :class="{ 'cursor-not-allowed': isDisable }"
                          :disabled="isDisable"
                          @click="addRowMagasin()">
                          <i class="fa fa-plus-circle position-relative me-1 fs-12" ></i>Ajouter un magasin
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="accordion dark-accordion my-3 py-7"  id="magasin">
                      <div class="accordion-item accordion-wrapper" v-for="(magasin, magasinIndex) in magasins" :key="magasinIndex">
                        <h2 class="accordion-header" :id="`magasin${magasinIndex}`">
                          <button :class="`accordion-button bg-light-primary font-primary ${magasins.length == magasinIndex+1 ? '' :'collapsed'}`" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${magasinIndex}`" :aria-expanded="`${magasins.length == magasinIndex+1 ? true :false}`" :aria-controls="`collapse${magasinIndex}`">
                            {{ magasin.nomMagasin ? magasin.nomMagasin: `Magasin ${magasinIndex+1}`}}
                            <i class="vue-feather vue-feather--chevron-down svg-color" data-name="chevron-down" data-tags="expand" data-type="chevron-down"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down vue-feather__content"><polyline points="6 9 12 15 18 9"></polyline></svg></i>
                          </button>
                        </h2>
                        <div :class="`accordion-collapse collapse ${magasins.length == magasinIndex+1 ? 'show' :''}`" :id="`collapse${magasinIndex}`" :aria-labelledby="`magasin${magasinIndex}`" data-bs-parent="#magasin" style="">
                          <div class="accordion-body">
                            <div class="row" >
                              <div class="col-md-10 mb-2">
                                <div class="">
                                  <Multiselect
                                    :options="magasinOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="magasin.magasin"
                                    placeholder="Sélectionner le magasin"
                                    @select="selectMag(magasin.magasin, magasin)"
                                  />
                                </div>
                              </div>
                              <div class="col-md-2">
                                <button
                                  class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                  type="button" @click="removeRowMagasin(magasinIndex)">
                                  <i class="fa fa-trash-o lh-1 me-1 position-relative top-2" ></i>
                                </button>
                              </div>
                            </div>
                            <div class="border border-primary mb-10">
                              <div class="row gx-0 d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                                <div class="col-md-7">
                                  <h5 class="fs-6 mx-1 text-white">Ajouter les produits dans le magasin</h5>
                                </div>
                                <div class="col-md-5">
                                  <div class="d-flex float-end">
                                    <button
                                      class="btn btn-sm btn-success"
                                      type="button"
                                      @click="addRowProduit(magasinIndex)"><i class="fa fa-plus-circle position-relative me-1 fs-12"></i
                                      >Ajouter un produit
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="p-3">
                              <div class="row mt-10">
                                <div class="col-md-4">
                                  <label
                                    class="d-block text-black fw-semibold">
                                    Produit
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold mb-10">
                                    Quantité<span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold mb-10" >
                                    Prix de revient
                                  </label>
                                </div>
                                <div class="col-md-3">
                                  <label
                                    class="d-block text-black fw-semibold mb-10">
                                    Montant<span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-1">
                                  <label class="d-block text-black fw-semibold mb-10" >
                                    Action
                                  </label>
                                </div>
                                <hr class="mt-0" />
                              </div>
                              <div class="row gy-0"  v-for="(produit, produitIndex) in magasin.produits" :key="produitIndex"  >
                                <div class="col-md-4">
                                  <div class="form-group mb-2" >
                                    <Multiselect
                                      :options="produitOptions"
                                      :searchable="true"
                                      track-by="label"
                                      label="label"
                                      v-model="produit.produit"
                                      placeholder="Sélectionner le produit"
                                      @select=" selectProd(produit.produit, produit)" />
                                    <div
                                      class="invalid-feedback"
                                      v-if="validateRowProduit(produit.produit) " >
                                      Le produit est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-2">
                                  <div
                                    class="form-group mb-2 ">
                                    <input
                                      type="number"
                                      v-model="produit.qtite"
                                      :class="
                                        validateRowProduit(produit.qtite)
                                          ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                          : 'form-control shadow-none fs-md-15 text-black '"
                                      placeholder="Entrer la quantité"/>
                                    <div v-if="validateRowProduit(produit.qtite)"
                                      class="invalid-feedback">
                                      La quantité est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-2">
                                  <div
                                    class="form-group mb-2"
                                  >
                                    <input
                                      v-model="produit.prixRevient"
                                      type="number"
                                        class="form-control shadow-none fs-md-15 text-black"
                                      placeholder="Entrer le prix"
                                    />
                                  </div>
                                </div>
                                <div class="col-md-3">
                                  <div
                                    class="form-group mb-2">
                                    <input
                                      v-model="produit.montant"
                                      type="number"
                                      :readonly="true"
                                      :class="
                                         'form-control shadow-none fs-md-15 text-black'
                                          "
                                      placeholder="Entrer le montant"
                                    />
                                  </div>
                                </div>
                                <div class="col-md-1 mb-2">
                                  <button
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    type="button"
                                    @click="removeRowProduit(magasinIndex, produitIndex)" >
                                    <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
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
          <div class="col-md-12 mt-5">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }">
                Ajouter un approvisionnement
              </button>
              <router-link
                to="/approvisionnements/liste-approvisionnements"
                class="btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2" ></i>
                <span class="position-relative"></span>Annuler</router-link >
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
    const  montantTotal= ref(0);
    // formulaire dynamique start
    const isDisable = ref(true);
    const magasins = reactive([
  {
    magasin: '',
    nomMagasin:'',
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
    nomMagasin:'',
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
  magasin.nomMagasin = selectedMagasin.split("|")[1]
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
            produit.qtite === 0
        )
    );
  },
  { deep: true }
);


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

    const totals = () => {
      montantTotal.value = 0;
      magasins.map((element)=>{
        element.produits.map((produit)=>{
          if (produit.montant != null) {
            montantTotal.value += produit.montant;
          }
        })
      })
      // Object.keys(magasins).forEach(function (key) {
      //   Object.keys(produits).forEach(function (key) {
      //   if (produits[key].montant != null) {
      //     montantTotal.value += parseFloat(produits[key].montant);
      //   }
      // });
      // });
    };

    const fetchProduits = async () => {
      try {
        const response = await axios.get("/produitconditionnements");
        const produitsData = response.data.data;
        produitsss.value = produitsData;
        produitOptions.value = produitsData.map((produitconditionnements) => ({
          value: produitconditionnements.id+"|"+ `${produitconditionnements.produit.nomProd} [ ${produitconditionnements.conditionnement.libelle} ]` + "|" + produitconditionnements.prixVenteHt +"|"+ produitconditionnements.prixVenteTtc,
          label: `${produitconditionnements.produit.nomProd} [ ${produitconditionnements.conditionnement.libelle} ]`,
        }));
      } catch (error) {
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
      montantTotal
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
