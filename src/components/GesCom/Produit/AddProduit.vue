<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form @submit="addProduit" :validation-schema="produitSchema" :keep-values="valuess">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Groupe de taxe <span class="text-danger">*</span>
              </label>
              <Field name="groupeTaxe" v-slot="{ field }">
                <Multiselect :options="groupeTaxeOptions" :searchable="true" track-by="label" label="label"
                  v-model="field.value" v-bind="field" placeholder="Choisir le groupe de taxe"
                  @select="selectGroupe(field.value)" />
              </Field>
              <ErrorMessage name="groupeTaxe" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Mode prix <span class="text-danger">*</span>
              </label>
              <Field name="modeDefPrix" v-model="modeDefPrix" v-slot="{ field }">
                <Multiselect :options="['HT(Hors Taxes)','TTC(Toutes Taxes Comprises)']" :searchable="true"
                  :disabled="(modeDefPrix=='HT(Hors Taxes)')? true : false" track-by="label" label="label"
                  v-model="field.value" v-bind="field" placeholder="Choisir le mode de prix" />
              </Field>
              <ErrorMessage name="modeDefPrix" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3">
            <br />
            <div class="form-check mt-3 mb-2 mb-sm-2 mb-md-2">
              <label for="estActif" class="form-check-label fw-medium position-relative top-1">
                Est Service ?
              </label>
              <input id="estService" name="estService" v-model="estService" :value="estService" type="checkbox"
                class="form-check-input shadow-none" />
              <ErrorMessage name="estService" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3">
            <br />
            <div class="form-check mt-3 mb-2 mb-sm-2 mb-md-2">
              <label for="estModeCarreau" class="form-check-label fw-medium position-relative top-1">
                Est Mode Carreau ?
              </label>
              <input id="estModeCarreau" name="estModeCarreau" v-model="estModeCarreau" :value="estModeCarreau"
                type="checkbox" class="form-check-input shadow-none" />
              <ErrorMessage name="estModeCarreau" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Famille <span class="text-danger">*</span>
              </label>
              <Field name="famille" v-slot="{ field }">
                <Multiselect :options="familleOptions" :searchable="true" track-by="label" label="label"
                  v-model="field.value" v-bind="field" placeholder="Sélectionner la famille" />
              </Field>
              <ErrorMessage name="famille" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Référence <span class="text-danger">*</span>
              </label>
              <Field name="refProd" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la référence" />
              <ErrorMessage name="refProd" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Nom du produit <span class="text-danger">*</span>
              </label>
              <Field name="nomProd" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le nom" />
              <ErrorMessage name="nomProd" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3" v-if="!estService">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Magasin par défaut <span class="text-danger">*</span>
              </label>
              <Field name="magasin" v-slot="{ field }">
                <Multiselect :options="magasinOptions" :searchable="true" track-by="label" label="label"
                  v-model="field.value" v-bind="field" placeholder="Sélectionner le magasin" />
              </Field>
              <ErrorMessage name="magasin" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3" v-if="!estService">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Méthode de gestion<span class="text-danger">*</span>
              </label>
              <Field name="methode" v-slot="{ field }">
                <Multiselect :options="['Mt1','Mt2']" :searchable="true" track-by="label" label="label"
                  v-model="field.value" v-bind="field" placeholder="Sélectionner la methode" />
              </Field>
              <ErrorMessage name="methode" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3" v-if="!estService">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Prix de vente<span class="text-danger">*</span>
              </label>
              <Field name="prixVente" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le prix" />
              <ErrorMessage name="prixVente" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3" v-if="!estService">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Seuil d'approvisionnement <span class="text-danger">*</span>
              </label>
              <Field name="seuilAppro" type="number" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le seuil d'Appro" />
              <ErrorMessage name="seuilAppro" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3" v-if="!estService">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Seuil Alerte <span class="text-danger">*</span>
              </label>
              <Field name="seuilAlerte" type="number" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le seuil d'Alerte" />
              <ErrorMessage name="seuilAlerte" class="text-danger" />
            </div>
          </div>
          <div class="col-md-2" v-if="estModeCarreau">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Pièce par carton <span class="text-danger">*</span>
              </label>
              <Field name="pieceParCarton" type="number" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la pièce par carton" />
              <ErrorMessage name="pieceParCarton" class="text-danger" />
            </div>
          </div>
          <div class="col-md-2" v-if="estModeCarreau">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Pièce par m² <span class="text-danger">*</span>
              </label>
              <Field name="pieceParMetreCarre" type="number" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la pièce par m²" />
              <ErrorMessage name="pieceParMetreCarre" class="text-danger" />
            </div>
          </div>
          <div class="col-md-2" v-if="estModeCarreau">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                M² par carton <span class="text-danger">*</span>
              </label>
              <Field name="metreCarreParCarton" type="number" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le m² par carton" />
              <ErrorMessage name="metreCarreParCarton" class="text-danger" />
            </div>
          </div>
          <div class="col-md-2" v-if="estModeCarreau">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Surface par pièce <span class="text-danger">*</span>
              </label>
              <Field name="surfaceParPiece" type="number" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la surface pièce" />
              <ErrorMessage name="surfaceParPiece" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4" v-if="estModeCarreau">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Couleur
              </label>
              <Field name="couleur" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer la couleur" />
              <ErrorMessage name="couleur" class="text-danger" />
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group mb-2 mb-sm-2 mb-md-2">
              <label class="d-block text-black fw-semibold mb-1">
                Description
              </label>
              <Field name="descProd" as="textarea" cols="15" rows="6" placeholder="Entrer la description"
                v-slot="{ field }" class="form-control shadow-none rounded-0 text-black">
                <textarea class="form-control shadow-none rounded-0 text-black" v-model="field.value"></textarea>
              </Field>
              <ErrorMessage name="descProd" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12 mb-md-25">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                  type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                  Conditionnement
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="home2-tab" data-bs-toggle="tab" data-bs-target="#home2-tab-pane"
                  type="button" role="tab" aria-controls="home2-tab-pane" aria-selected="false">
                  Image
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-1">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">
                          Conditionnement (s) du produit
                        </h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                            @click="addRowConditionnement()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                            Ajouter un conditionnement
                          </button>
                          <router-link to="/liste-mouvements"></router-link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="row d-flex align-items-center justify-content-between mt-10">
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold">
                            Conditionnement
                            <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Quantité <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Prix Min
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Prix de vente<span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Prix Max
                          </label>
                        </div>
                        <div class="col-md-1">
                          <label class="d-block text-black fw-semibold mb-1">
                            Action
                          </label>
                        </div>
                      </div>
                      <hr class="mt-0" />
                      <div class="row" v-for="(conditionnement, index) in conditionnements" :key="index">
                        <div class="col-md-3">
                          <div class="">
                            <Multiselect :options="conditionnementOptions" :searchable="true" track-by="label"
                              label="label" v-model="conditionnement.conditionnement"
                              placeholder="Sélectionner le conditionnement" @select="
                                        selectConditionnement(conditionnement.conditionnement, conditionnement)
                                      " />
                            <div class="invalid-feedback" v-if="valideteRowProduit(conditionnement.conditionnement)">
                              Le conditionnement est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <div class="form-group mb-2 mb-sm-2 mb-md-2">
                            <input type="number" v-model="conditionnement.quantite" :readonly="true" :class="
                                        valideteRowProduit(conditionnement.quantite)
                                          ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                          : 'form-control shadow-none fs-md-15 text-black '
                                      " placeholder="Entrer la quantité" />
                            <div v-if="valideteRowProduit(conditionnement.quantite)" class="invalid-feedback">
                              La quantité est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <div class="form-group mb-2 mb-sm-2 mb-md-2">
                            <input v-model="conditionnement.prixMin" type="number"
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prix" />
                            <!-- <div
                                      v-if="valideteRowProduit(conditionnement.prixMin)"
                                      class="invalid-feedback"
                                    >
                                      Le prix min est obligatoire.
                                    </div>-->
                          </div>
                        </div>
                        <div class="col-md-2">
                          <div class="form-group mb-2 mb-sm-2 mb-md-2">
                            <input v-model="conditionnement.prixVente" type="number" :class="
                                        valideteRowProduit(conditionnement.prixVente)
                                          ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                          : 'form-control shadow-none fs-md-15 text-black '
                                      " placeholder="Entrer le prix" />
                            <div v-if="valideteRowProduit(conditionnement.prixVente)" class="invalid-feedback">
                              Le prix de vente est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2">
                          <div class="form-group mb-2 mb-sm-2 mb-md-2">
                            <input type="number" class="form-control shadow-none fs-md-15 text-black"
                              placeholder="Entrer le prix max" v-model="conditionnement.prixMax" />
                            <!----<div
                                      v-if="valideteRowProduit(conditionnement.prixMax)"
                                      class="invalid-feedback"
                                    >
                                      Le prix max est obligatoire
                                    </div>-->
                          </div>
                        </div>
                        <div class="col-md-1">
                          <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                            @click="removeRowConditionnement(index)">
                            <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade p-10" id="home2-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-1">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4 !important">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">
                          Image(s) du produit
                        </h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" :class="{ 'cursor-not-allowed': isDisablee }" :disabled="isDisablee"
                            @click="addRowImage()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                            Ajouter une image
                          </button>
                          <router-link to="/liste-mouvements"></router-link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="row d-flex align-items-center justify-content-between mt-10">
                        <div class="col-md-10">
                          <label class="d-block text-black fw-semibold">
                            Image
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-1">
                            Action
                          </label>
                        </div>
                      </div>
                      <hr class="mt-0" />
                      <div class="row mb-5" v-for="(image, index) in images" :key="index">
                        <div class="col-md-10 mb-1">
                          <Field name="urlImage" type="file" accept="image/jpeg, image/png application/pdf"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="Choisissez une image" />
                          <!-- <div
                                    class="invalid-feedback"
                                    v-if="valideteRowProduit(image.image)"
                                  >
                                    L'image est obligatoire.
                                  </div> -->
                        </div>
                        <div class="col-md-2 mb-1">
                          <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                            @click="removeRowConditionnement(index)">
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
          <div class="col-md-12">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit" :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable || isDisablee }">
                Ajouter un produit
              </button>

              <router-link to="/produits/liste-produits" class="btn btn-danger"><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
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
import { Produit, ConditionnementDepot } from "@/models/Produit";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "AddProduit",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup: () => {
    const produitSchema = Yup.object().shape({
      refProd: Yup.string().required("La reference est obligatoire"),
      groupeTaxe: Yup.string().required("Le groupe de taxe est obligatoire"),
      modeDefPrix: Yup.string().required("Le mode de prix est obligatoire"),
      nomProd: Yup.string().required("Le nom est obligatoire"),
      descProd: Yup.string().notRequired(),
      famille: Yup.string().required("La famille est obligatoire"),
      //estService: Yup.boolean().notRequired(),
      //estModeCarreau: Yup.boolean().notRequired(),
      magasin: Yup.string().when([], (value, schema) => {
        return !estService.value
          ? schema.required("Le magasin est obligatoire")
          : schema.notRequired()
      }),
      methode: Yup.string().when([], (value, schema) => {
        return !estService.value
          ? schema.required("La méthode est obligatoire")
          : schema.notRequired()
      }),
      prixVente: Yup.number().typeError('Veuillez entrer des chiffres').when([], (value, schema) => {
        return !estService.value
          ? schema.required("Le prix de vente est obligatoire")
          : schema.notRequired()
      }),
      seuilAppro: Yup.number().typeError('Veuillez entrer des chiffres').when([], (value, schema) => {
        return !estService.value
          ? schema.required("Le seuil d'aprovisionnement est obligatoire")
          : schema.notRequired()
      }),
      pieceParCarton: Yup.number().typeError('Veuillez entrer des chiffres').when([], (value, schema) => {
        return estModeCarreau.value
          ? schema.required("Le nombre de pièce par carton est obligatoire")
          : schema.notRequired()
      }),
      pieceParMetreCarre: Yup.number().typeError('Veuillez entrer des chiffres').when([], (value, schema) => {
        return estModeCarreau.value
          ? schema.required("Le nombre de pièce par m² est obligatoire")
          : schema.notRequired()
      }),
      metreCarreParCarton: Yup.number().typeError('Veuillez entrer des chiffres').when([], (value, schema) => {
        return estModeCarreau.value
          ? schema.required("Le m² par carton est obligatoire")
          : schema.notRequired()
      }),
      surfaceParPiece: Yup.number().typeError('Veuillez entrer des chiffres').when([], (value, schema) => {
        return estModeCarreau.value
          ? schema.required("La surface par pièce est obligatoire")
          : schema.notRequired()
      }),
      couleur: Yup.string().notRequired(),
    });

    const produitForm = ref<Produit | null>(null);
    const router = useRouter();
    const familleOptions = ref([]);
    const groupeTaxeOptions = ref([]);
    const modeDefPrixOptions = ref([]);
    const magasinOptions = ref([]);
    const methodeOptions = ref([]);
    const estService= ref(false)
    const estModeCarreau= ref(false)

    watch(estService, () => {
      console.log('estservice', estService.value)
    })

    watch(estModeCarreau, () => {
      console.log('estModeCarreau', estModeCarreau.value)
    })

    // formulaire dynamique start

    const montantTotal = ref(0);
    const isDisable = ref(true);
    const isDisablee = ref(true);
    const conditionnements = reactive([
      {
        conditionnement: "",
        quantite: 0,
        prixMin: 0,
        prixVente: 0,
        prixMax: 0,
      },
    ]);

    const images = reactive([
      {
        image: "",
      },
    ]);

    const addRowConditionnement = () => {
      conditionnements.push({
        conditionnement: "",
        quantite: 0,
        prixMin: 0,
        prixVente: 0,
        prixMax: 0,
      });
    };

    const addRowImage = () => {
      images.push({
        image: "",
      });
    };

    const removeRowConditionnement = (index) => {
      if (conditionnements.length > 1) conditionnements.splice(index, 1);
      //totals();
    };

    const removeRowImage = (index) => {
      if (images.length > 1) images.splice(index, 1);
      //totals();
    };

    const valideteRowProduit = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        return true;
      } else {
        return false;
      }
    };

    // const totals = () => {
    //   montantTotal.value = 0;
    //   Object.keys(produits).forEach(function (key) {
    //     if (produits[key].montant != null) {
    //       montantTotal.value += parseFloat(produits[key].montant);
    //     }
    //   });
    // };

    const modeDefPrix = ref("");
    const selectGroupe =(value)=>{
      console.log(value,"valuevaluevaluevalue");
      if(parseInt(value.split("|")[1]) > 0) {
        modeDefPrix.value ="TTC(Toutes Taxes Comprises)";
      } else {
        modeDefPrix.value ="HT(Hors Taxes)";
      }
    }

    watch(conditionnements, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].conditionnement == "" ||
          newValue[key].quantite == "" ||
          newValue[key].prixVente == ""
        ) {
          isDisable.value = true;
        } else {
          isDisable.value = false;
        }
      });
    });

    watch(images, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].image == ""
        ) {
          isDisablee.value = true;
        } else {
          isDisablee.value = false;
        }
      });
    });

    onMounted(() => {
      fetchConditionnements();
    });

    const { remove, push, fields, update } = useFieldArray("conditionnements");

    const conditionnementOptions = ref([]);
    const prixProd = ref();
    const produitsss: any = ref(null);
    const valuess = ref();

    const fetchConditionnements = async () => {
      try {
        const response = await axios.get("all/conditionnements");
        const conditionnementsData = response.data.data.data;
        produitsss.value = conditionnementsData;
        conditionnementOptions.value = conditionnementsData.map((conditionnement) => ({
          value: conditionnement.id + "|" + conditionnement.valeur,
          label: `${conditionnement.code}`,
        }));
      } catch (error) {
        //
      }
    };


    const selectConditionnement = async (value: any, conditionnement: ConditionnementDepot) => {
      console.log("Element", value);
      console.log("Objet", conditionnement.quantite);
      conditionnement.quantite = value.split("|")[1];
      conditionnement.prixMin = 0;
      conditionnement.prixVente = 0;
      conditionnement.prixMax = 0;
    };

    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const addProduit = async (values, { resetForm }) => {

      console.log('Iff')
      values.conditionnements = conditionnements.map(conditionnement => ({
        conditionnement: conditionnement.conditionnement.split("|")[0],
        quantite: conditionnement.quantite,
        prixMin: conditionnement.prixMin,
        prixVente: conditionnement.prixVente,
        prixMax: conditionnement.prixMax,
        //libelle: conditionnement.conditionnement.split("|")[1],
      }));
      values.images = images.map(image => ({
        image: image.image,
      }));
      console.log('values ====>', values);
      ApiService.post("/produits", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeProduit" });
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchFamille = async () => {
      try {
        const response = await ApiService.get("all/familles");
        const familleData = response.data.data.data;
        familleOptions.value = familleData.map((famille) => ({
          value: famille.id,
          label: `${famille.codeFamille} - ${famille.libelleFamille}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchMagasin = async () => {
      try {
        const response = await ApiService.get("all/magasins");
        const familleData = response.data.data.data;
        magasinOptions.value = familleData.map((magasin) => ({
          value: magasin.id,
          label: `${magasin.nomMagasin}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchGroupTaxe = async () => {
      try {
        const response = await ApiService.get("all/groupeTaxes");
        const groupeTaxeData = response.data.data.data;
        groupeTaxeOptions.value = groupeTaxeData.map((groupeTaxe) => ({
          value: `${groupeTaxe.id}|${groupeTaxe.taux}`,
          label: `${groupeTaxe.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchFamille();
      fetchMagasin();
      fetchGroupTaxe();
    });

    return {
      produitSchema,
      addProduit,
      produitForm,
      familleOptions,
      modeDefPrixOptions,
      groupeTaxeOptions,
      methodeOptions,
      magasinOptions,
      conditionnements,
      addRowImage,
      removeRowImage,
      removeRowConditionnement,
      addRowConditionnement,
      valideteRowProduit,
      montantTotal,
      valuess,
      modeDefPrix,
      selectGroupe,
      images,
      conditionnementOptions,
      prixProd,
      selectConditionnement,
      //getIndex,
      isDisable,
      isDisablee,
      getCurrentDate,
      estModeCarreau,
      estService,
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
