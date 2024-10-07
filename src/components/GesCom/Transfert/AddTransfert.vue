<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="transfertForm" @submit="addTransfert" :validation-schema="transfertSchema">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Magasin A <span class="text-danger">*</span>
                </label>
                <Field  name="magasin1"  v-slot="{ field }">
                  <Multiselect
                    :options="magasin1Options"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le magasin"
                  />
                </Field>  
              </div>
              <ErrorMessage name="magasin1" class="text-danger"/>
            </div>
            
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Magasin B <span class="text-danger">*</span>
                </label>
                <Field  name="magasin2"  v-slot="{ field }">
                  <Multiselect
                    :options="magasin2Options"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le magasin"
                  />
                </Field>  
              </div>
              <ErrorMessage name="magasin2" class="text-danger"/>
            </div>
            <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Motif 
                  </label>
                  <Field name="motif" as="textarea"  cols="12"
                    rows="6" placeholder="Entrer les motifs" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                  <textarea
                  class="form-control shadow-none rounded-0 text-black"
                    v-model="field.value"
                  ></textarea>
                </Field>
                  <ErrorMessage name="motif" class="text-danger"/>
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
                        Transferts des produits
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
                            >
                              
                            </button>
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
                                  class="row d-flex align-items-center justify-content-between fw-bold py-2"
                                  style="background-color: #0a59a4"
                                >
                                  <div class="col-md-5">
                                    <h3 class="fs-4 text-white">
                                      Transfert (s) du produit
                                    </h3>
                                  </div>
                                  <div class="col-md-3">
                                    <div class="d-flex align-items-center ">
                                      <div class="p-6 bg-ecf3f2"><span class="d-block  fw-medium text-black-emphasis fs-13 text-uppercase">Montant total: {{montantTotal}}</span></div>
                                    </div>
                                  </div>
                                  <div class="col-md-4">
                                    <div class="d-flex float-end">
                                      <button
                                        class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                        type="button"
                                        :class="{ 'cursor-not-allowed': isDisable }"
                                        :disabled="isDisable"
                                        @click="addRowProduit()"
                                      >
                                        <i class="fa fa-plus-circle"></i>
                                        Ajouter un produit
                                      </button>
                                      <router-link to="/liste-transferts"></router-link>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div
                                    class="row d-flex align-items-center justify-content-between mt-10"
                                  >
                                    <div class="col-md-4">
                                      <label class="d-block text-black fw-semibold">
                                        Produit
                                        <span class="text-danger">*</span>
                                      </label>
                                    </div>
                                    <div class="col-md-3">
                                      <label class="d-block text-black fw-semibold mb-10">
                                        Prix Unitaire<span class="text-danger">*</span>
                                      </label>
                                    </div>
                                    <div class="col-md-3">
                                      <label class="d-block text-black fw-semibold mb-10">
                                        Quantité <span class="text-danger">*</span>
                                      </label>
                                    </div>
                                    <div class="col-md-2">
                                      <label class="d-block text-black fw-semibold mb-10">
                                        Action
                                      </label>
                                    </div>
                                  </div>
                                  <hr class="mt-0" />
                                  <div
                                    class="row"
                                    v-for="(produit, index) in produits"
                                    :key="index"
                                  >
                                    <div class="col-md-4">
                                      <div class="">
                                        <Multiselect
                                          :options="produitOptions"
                                          :searchable="true"
                                          track-by="label"
                                          label="label"
                                          v-model="produit.produit"
                                          placeholder="Sélectionner le produit"
                                          @select="selectProd(produit.produit, produit)"
                                        />
                                        <div
                                          class="invalid-feedback"
                                          v-if="valideteRowProduit(produit.produit)"
                                        >
                                          Le produit est obligatoire.
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-3">
                                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                        <input
                                          v-model="produit.prixUnitaire"
                                          type="number"
                                          :class="
                                            valideteRowProduit(produit.prixUnitaire)
                                              ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                              : 'form-control shadow-none fs-md-15 text-black '
                                          "
                                          placeholder="Entrer le prixUnitaire"
                                        />
                                        <div
                                          v-if="valideteRowProduit(produit.prixUnitaire)"
                                          class="invalid-feedback"
                                        >
                                          Le prix Unitaire est obligatoire.
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-3">
                                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                        <input
                                          type="number"
                                          v-model="produit.qtite"
                                          @input="getIndex($event, produit)"
                                          :class="
                                            valideteRowProduit(produit.qtite)
                                              ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                              : 'form-control shadow-none fs-md-15 text-black '
                                          "
                                          placeholder="Entrer la quantité"
                                        />
                                        <div
                                          v-if="valideteRowProduit(produit.qtite)"
                                          class="invalid-feedback"
                                        >
                                          La quantité est obligatoire.
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-2">
                                      <button
                                        class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                        type="button"
                                        @click="removeRowProduit(index)"
                                      >
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

            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                  Faire un transfert
                </button>
                <router-link to="/transferts/liste-transferts" 
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

import { defineComponent, ref, watch, onMounted, reactive } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Transfert } from '@/models/Transfert';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import { Produit, ProduitDepot } from "@/models/Produit";

export default defineComponent({
    name: "AddTransfert",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const transfertSchema = Yup.object().shape({
      magasin1: Yup.string().required('Le magasin1 est obligatoire'),
      magasin2: Yup.string().required('Le magasin2 est obligatoire'),
      motif: Yup.string().notRequired(),
    });

    const transfertForm =  ref<Transfert | null>(null);
    const router = useRouter();
    const magasin1Options = ref([]);
    const magasin2Options = ref([]);
    const produitOptions = ref([]);

    const fetchMagasin1 = async () => {
      try {
        const response = await ApiService.get('all/magasins');
        const magasin1sData = response.data.data.data;
        magasin1Options.value = magasin1sData.map((magasin) => ({
          value: magasin.id,
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
          value: produit.id + "|" + produit.nomProd + "|" + produit.prixVente,
          label: `${produit.refProd} - ${produit.nomProd}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchMagasin2 = async () => {
      try {
        const response = await ApiService.get('all/magasins');
        const magasin2Data = response.data.data.data;
        magasin2Options.value = magasin2Data.map((magasin) => ({
          value: magasin.id,
          label: `${magasin.nomMagasin}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(()=> {
      fetchMagasin1();
      fetchMagasin2();
      fetchProduits();
    })
    
    const addTransfert = async (values, {resetForm}) => {
      values.produits = produits.map(produit => ({
        produit: produit.produit.split("|")[0],
        prixUnitaire: produit.prixUnitaire,
        qtite: produit.qtite,
        nomProd: produit.produit.split("|")[2],
      }));
      // ApiService.post("/transferts",values)
      //   .then(({ data }) => {
      //     if(data.code == 201) { 
      //       success(data.message);
      //       resetForm();
      //       router.push({ name: "ListeTransfertPage" });
      //     }
      //   }).catch(({ response }) => {
      //     error(response.data.message);
      //   });
    };

    // formulaire dynamique start

    const montantTotal = ref(0);
    const isDisable = ref(true);
    const produits = reactive([
      {
        produit: "",
        prixUnitaire: 0,
        qtite: 0,
        montant: 0,
      },
    ]);

    const addRowProduit = () => {
      produits.push({
        produit: "",
        prixUnitaire: 0,
        qtite: 0,
        montant: 0,
      });
    };

    const removeRowProduit = (index) => {
      if (produits.length > 1) produits.splice(index, 1);
      totals();
    };

    const valideteRowProduit = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        return true;
      } else {
        return false;
      }
    };

    const totals = () => {
      montantTotal.value = produits.reduce((total, produit) => {
        return total + produit.montant;
      }, 0);
      console.log("totals", montantTotal.value);
    };

    watch(produits, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].produit == "" ||
          newValue[key].prixUnitaire == "" ||
          newValue[key].qtite == ""
        ) {
          isDisable.value = true;
        } else {
          isDisable.value = false;
        }
      });
    });

    const { remove, push, fields, update } = useFieldArray("produits");

    const prixUnitaireProd = ref();
    const produitsss: any = ref(null);
    const valuess = ref();

    const idProduit = ref(0);

    const getIndex = (event, produit) => {
      console.log("event", event.data);
      if (produit.qtite != null && produit.prixUnitaire != null) {
        produit.montant = produit.qtite * produit.prixUnitaire;
        console.log("getIndex", produit.montant);
      } else {
        produit.montant = 0;
      }
      totals();
    };

    const selectProd = async (value: any, produit: ProduitDepot) => {
      console.log("Element", value);
      console.log("Objet", produit.prixUnitaire);

      produit.prixUnitaire = value.split("|")[2];
      produit.qtite = 1;
      totals();
    };

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    return { transfertSchema,
       addTransfert,
        transfertForm,magasin1Options,
        magasin2Options,
        produits,
        removeRowProduit,
        addRowProduit,
        valideteRowProduit,
        montantTotal,
        valuess,
        idProduit,
        prixUnitaireProd,
        selectProd,
        getIndex,
        isDisable,
        getCurrentDate,
        produitOptions,
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