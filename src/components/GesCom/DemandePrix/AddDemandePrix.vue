<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        @submit="addDemandePrix"
        :validation-schema="demandePrixSchema"
        :keep-values="valuess"
      >
        <div class="row">
          
          <div class="col-md-6">
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
            </div>
            <ErrorMessage name="fournisseur" class="text-danger" />
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de mouvement
              </label>
              <Field
                name="dateD"
                type="date"
                :value="getCurrentDate()"
                class="form-control shadow-none fs-md-15 text-black"
              />
            </div>
            <ErrorMessage name="dateD" class="text-danger" />
          </div>

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
                        Produit
                      </h3>
                    </div>
                    <div class="col-md-5">
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
                        <router-link to="/liste-mouvements"></router-link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      class="row d-flex align-items-center justify-content-between mt-10"
                    >
                     <div class="col-md-5">
                        <label class="d-block text-black fw-semibold mb-10">
                          Produit <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-5">
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
                      <div class="col-md-5">
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
                      <div class="col-md-5">
                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                          <input
                            type="number"
                            v-model="produit.qtite"
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


          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }"
              >
                Ajouter une demande 
              </button>
              <router-link
                to="/demandes-prix/liste-demande-prix"
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
import { defineComponent, ref, watch, onMounted, reactive } from 'vue';
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';
import { hideModal, error, success } from '@/utils/utils';
import { DemandePrix } from '@/models/DemandePrix';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';
import { Form, Field, ErrorMessage, useFieldArray } from "vee-validate";
import { Produit, ProduitDepot } from "@/models/Produit";

export default defineComponent({
    name: "AddDemandePrix",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }){
    const demandePrixSchema = Yup.object().shape({
      // montantTotal: Yup.number().typeError('Veuillez entrer des nombres').required("Le montant est obligatoire"),
      fournisseur: Yup.string().required('Le fournisseur est obligatoire'),
      dateD: Yup.date().required('La date est obligatoire'),
    });

    const DemandePrixForm = ref<DemandePrix | null>(null);
    const addDemandePrixModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const demandePrixOptions = ref([]);
    // const item = ref({ ...props.item });
    const produitForm = ref<Produit | null>(null);
    const fournisseurOptions = ref([]);

    // formulaire dynamique start

    const montantTotal = ref(0);
    const isDisable = ref(true);
    const produits = reactive([
      {
        produit: "",
        qtite: 0,
      },
    ]);

    const addRowProduit = () => {
      produits.push({
        produit: "",
        qtite: 0,
      })
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
      montantTotal.value = 0;
      Object.keys(produits).forEach(function (key) {
        if (produits[key].montant != null) {
          montantTotal.value += parseFloat(produits[key].montant);
        }
      });
    };

    watch(produits, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].produit == "" ||
          newValue[key].qtite == ""
        ) {
          isDisable.value = true;
        } else {
          isDisable.value = false;
        }
      });
    });
    const { remove, push, fields, update } = useFieldArray("produits");

    const produitOptions = ref([]);
    const prixProd = ref();
    const produitsss: any = ref(null);
    const valuess = ref();

    const fetchProduits = async () => {
      try {
        const response = await axios.get("all/produits");
        const produitsData = response.data.data.data;
        produitsss.value = produitsData;
        produitOptions.value = produitsData.map((produit) => ({
          value: produit.id + produit.nomProd,
          label: `${produit.refProd} - ${produit.nomProd}`,
        }));
      } catch (error) {
        //
      }
    };

    const idProduit = ref(0);

    const selectProd = async (value: any, produit: ProduitDepot) => {
      console.log("Element", value);
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

    const addDemandePrix = async (values, { resetForm }) => {
      values.produits = produits.map(produit => ({
        produit: produit.produit.split("|")[0],
        qtite: produit.qtite,
        nomProd: produit.produit.split("|")[1],
      }));
      console.log('Données envoyées=>', values)
      // ApiService.post("/demandePrixs", values)
      //   .then(({ data }) => {
      //     if (data.code == 201) {
      //       success(data.message);
      //       resetForm();
      //       router.push({ name: "ListeDemandePrixPage" });
      //     }
      //   })
      //   .catch(({ response }) => {
      //     error(response.data.message);
      //   });
    };

    const fetchFournisseur = async () => {
      try {
        const response = await ApiService.get("all/fournisseurs");
        const fournisseurData = response.data.data.data;
        fournisseurOptions.value = fournisseurData.map((forunisseur) => ({
          value: forunisseur.id,
          label: `${forunisseur.nomFournisseur}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchFournisseur();
      fetchProduits();
    });


    return { demandePrixSchema,
      addDemandePrix,
      DemandePrixForm,
      demandePrixOptions,
      fournisseurOptions,
      produits,
      removeRowProduit,
      addRowProduit,
      valideteRowProduit,
      montantTotal,
      valuess,
      idProduit,
      produitOptions,
      prixProd,
      selectProd,
      isDisable,
      getCurrentDate,
    };
  },
});
</script>@/models/CategorieInfo

<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}
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