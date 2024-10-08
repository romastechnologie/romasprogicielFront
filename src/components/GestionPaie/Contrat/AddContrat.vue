<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="contratForm" @submit="addContrat" :validation-schema="contratSchema">
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
            <Field name="refContrat" class="form-control" type="text" />
            <ErrorMessage name="refContrat" class="text-danger" />
          </div>

          <div class="col-md-4  mb-3">
            <label for="dateDebut" class="form-label"> Date de début<span class="text-danger">*</span></label>
            <Field name="dateDebut" class="form-control" type="Date" />
            <ErrorMessage name="dateDebut" class="text-danger" />
          </div>

          <div class="col-md-4 mb-3">
            <label for="dateFin" class="form-label"> Date de fin<span class="text-danger">*</span></label>
            <Field name="dateFin" class="form-control" type="Date" />
            <ErrorMessage name="dateFin" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3">
            <label for="salaireDeBase" class="form-label">Salaire de base<span class="text-danger">*</span></label>
            <Field name="salaireDeBase" class="form-control" type="text" v-model="salaireDeBase" />
            <ErrorMessage name="salaireDeBase" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3">
            <label for="heuresTravaillees" class="form-label">Heures travaillées<span
                class="text-danger">*</span></label>
            <Field name="heuresTravaillees" class="form-control" type="number" />
            <ErrorMessage name="heuresTravaillees" class="text-danger" />
          </div>

          <div class="col-md-4 mb-3">
            <label for="renouvelable" class="form-label">Renouvelable</label>
            <Field name="renouvelable" class="form-control" type="text" />
            <ErrorMessage name="renouvelable" class="text-danger" />
          </div>

          <div class="col-md-4  mb-3">
            <label for="dateFinPeriodeEssai" class="form-label"> Date fin de période d'Essai<span
                class="text-danger">*</span></label>
            <Field name="dateFinPeriodeEssai" class="form-control" type="Date" />
            <ErrorMessage name="dateFinPeriodeEssai" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Période de Paie <span class="text-danger">*</span>
              </label>
              <Field name="periodePaie" type="text" v-slot="{ field }">
                <Multiselect :searchable="true" :options="['Mensuel', 'Hebdomadaire', 'Bimensuel', 'Bihebdomadaire']"
                  v-model="field.value" v-bind="field" placeholder="Sélectionner la période" />
              </Field>
              <ErrorMessage name="periodePaie" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type Contrat <span class="text-danger">*</span>
              </label>
              <Field name="types" v-model="types" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="typeOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le type" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="types" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Field name="personnel" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le personnel" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="personnel" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Mode de tarification <span class="text-danger">*</span>
              </label>
              <Field name="modeDeTarification" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="modeDeTarificationOptions"
                  :preserve-search="true" :multiple="false" :searchable="true" placeholder="Sélectionner le mode"
                  label="label" track-by="label" />
              </Field>
              <ErrorMessage name="modeDeTarification" class="text-danger" />
            </div>
          </div>

          <div class="col-md-12 mb-md-25">
            <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
              <div class="row">
                <div class="border border-primary mb-10">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                    style="background-color: #0a59a4">
                    <div class="col-md-7">
                      <h3 class="fs-4 text-white">
                        HoraireContrats
                      </h3>
                    </div>
                    <div class="col-md-5">
                      <div class="d-flex float-end">
                        <button
                          class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                          type="button" :class="{ 'cursor-not-allowed': isDisableeeeeee }" :disabled="isDisableeeeeee"
                          @click="addRowHoraireContrat()">
                          <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                          Ajouter un horaireContrat
                        </button>
                        <router-link to="/liste-mouvements"></router-link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row d-flex align-items-center justify-content-between mt-10">
                      <div class="col-md-3">
                        <label class="d-block text-black fw-semibold">
                          Heure d'arrivée
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-3">
                        <label class="d-block text-black fw-semibold">
                          Heure de début de pause
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold mb-10">
                          Heure de fin de pause<span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold mb-10">
                          Heure de départ <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <label class="d-block text-black fw-semibold mb-10">
                          Actions <span class="text-danger">*</span>
                        </label>
                      </div>
                    </div>
                    <hr class="mt-0" />
                    <div class="row" v-for="(horaireContrat, index) in horaireContrats" :key="index">
                      <div class="col-md-3 mb-2">
                        <div class="form-group ">
                          <input v-model="horaireContrat.heureArrive" type="time"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                          <div class="invalid-feedback" v-if="valideteRowHoraireContrat(horaireContrat.heureArrive)">
                            L"heure d'arrivée est obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 mb-2">
                        <div class="form-group">
                          <input v-model="horaireContrat.heureDebutPause" type="time"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                        </div>
                        <div class="invalid-feedback" v-if="valideteRowHoraireContrat(horaireContrat.heureDebutPause)">
                          L'heure de début de pause est obligatoire.
                        </div>
                      </div>
                      <div class="col-md-2 mb-2">
                        <div class="form-group ">
                          <input v-model="horaireContrat.heureFinPause" type="time"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                          <div class="invalid-feedback" v-if="valideteRowHoraireContrat(horaireContrat.heureFinPause)">
                            L'heure de fin de pause est obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 mb-2">
                        <div class="form-group ">
                          <input v-model="horaireContrat.heureDepart" type="time"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                          <div class="invalid-feedback" v-if="valideteRowHoraireContrat(horaireContrat.heureDepart)">
                            L'heure de départ est obligatoire.
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2 mb-2">
                        <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                          @click="removeRowHoraireContrat(index)">
                          <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="col-md-12 mb-md-25">
            <div class="accordion" id="basicAccordion">
              <div class="accordion-item mb-0 bord1">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#basicCollapseOne" aria-expanded="false" aria-controls="basicCollapseOne">
                    Choisir des fonctions
                  </button>
                </h2>
                <div id="basicCollapseOne" class="accordion-collapse collapse" data-bs-parent="#basicAccordion">
                  <div class="accordion-body">

                    <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                        <div class="row">
                          <div class="border border-primary mb-10">
                            <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                              style="background-color: #0a59a4">
                              <div class="col-md-7">
                                <h3 class="fs-4 text-white">
                                  Fonctions
                                </h3>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button" :class="{ 'cursor-not-allowed': isDisableee }" :disabled="isDisableee"
                                    @click="addRowFonction()">
                                    <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                                    Ajouter une fonction
                                  </button>
                                  <router-link to="/liste-mouvements"></router-link>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="row d-flex align-items-center justify-content-between mt-10">
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold">
                                    Etat
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold">
                                    Fonction
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold">
                                    Organisation
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold mb-10">
                                    Date de début <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold mb-10">
                                    Date de fin <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-2">
                                  <label class="d-block text-black fw-semibold mb-10">
                                    Action
                                  </label>
                                </div>
                              </div>
                              <hr class="mt-0" />
                              <div class="row" v-for="(fonction, index) in fonctions" :key="index">
                                <div class="col-md-2 mb-2">
                                  <div class="form-check mt-3 mb-15 mb-sm-20 mb-md-25">
                                    <label for="estActif" class="form-check-label fw-medium position-relative top-1">
                                      Est Actif ?
                                    </label>
                                    <input name="estActif" v-model="fonction.estActif" type="checkbox"
                                      class="form-check-input shadow-none" />
                                    <ErrorMessage name="estActif" class="text-danger" />
                                  </div>
                                </div>
                                <div class="col-md-2 mb-2">
                                  <div class="">
                                    <Multiselect :options="fonctionOptions" :searchable="true" track-by="label"
                                      label="label" v-model="fonction.fonction"
                                      placeholder="Sélectionner la Fonction" />
                                    <div class="invalid-feedback" v-if="valideteRowFonction(fonction.fonction)">
                                      La fonction est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-2 mb-2">
                                  <div class="">
                                    <Field name="Organisation" type="text" v-slot="{ field }">
                                      <Multiselect v-model="field.value" v-bind="field" :options="OrganisationOptions"
                                        :preserve-search="true" :multiple="false" :searchable="true"
                                        placeholder="Sélectionner l'organisation" label="label" track-by="label" />
                                    </Field>
                                    <ErrorMessage name="Organisation" class="text-danger" />
                                  </div>
                                </div>
                                <div class="col-md-2 mb-2">
                                  <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                    <input v-model="fonction.dateDebut" type="date"
                                      class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                                    <div class="invalid-feedback" v-if="valideteRowFonction(fonction.dateDebut)">
                                      La date de début est obligatoire.
                                    </div>
                                  </div>

                                </div>
                                <div class="col-md-2 mb-2">
                                  <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                    <input v-model="fonction.dateFin" type="date"
                                      class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                                  </div>
                                  <div class="invalid-feedback" v-if="valideteRowFonction(fonction.dateFin)">
                                    La date de fin est obligatoire.
                                  </div>
                                </div>
                                <div class="col-md-2 mb-2">
                                  <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                    @click="removeRowFonction(index)">
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


          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
              <div class="row">
                <div class="border border-primary mb-5">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                    style="background-color: #0a59a4">
                    <div class="col-md-3">
                      <h3 class="fs-4 text-white">Prime</h3>
                    </div>
                    <!-- <div class="col-md-4">
                            <h3 class="fs-4 text-white">Montant total : {{ montantTotal }}</h3>
                          </div> -->
                    <div class="col-md-3">
                      <div class="d-flex float-end">
                        <button
                          class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                          type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                          @click="addRowPrime">
                          <i class="fa fa-plus-circle"></i>
                          Ajouter une prime
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="card-body p-15 p-sm-20 p-md-25">
                      <div class="table-responsive">
                        <table class="table table-fixed text-nowrap align-middle mb-0">
                          <thead>
                            <tr>
                              <th scope="col" class="prime">Type prime</th>
                              <th scope="col" class="quantite">Valeur</th>
                              <th scope="col" class="prix-unitaire">Quantité</th>
                              <th scope="col">Valeur Unitaire</th>
                              <th scope="col">Montant</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(prime, index) in primes" :key="index">
                              <td class="typePrime-col">
                                <Multiselect :options="typePrimeOptions" :searchable="true" track-by="label"
                                  label="label" v-model="prime.typePrime" placeholder=""
                                  @select="selectTypePrime(prime.typePrime, prime)" />
                                <span class="invalid-feedback" v-if="validateRowPrime(prime.typePrime)">
                                  Le type de prime est obligatoire.
                                </span>
                              </td>
                              <td class="valeur-col">
                                <input type="text" :readonly="true" v-model="prime.valeur" class="form-control" />
                              </td>
                              <td class="quantite-col">
                                <input type="text" v-model="prime.quantite"
                                  :class="validateRowPrime(prime.quantite) ? 'form-control is-invalid' : 'form-control'"
                                  placeholder="Entrer la quantité" />
                                <span class="invalid-feedback" v-if="validateRowPrime(prime.quantite)">
                                  La quantité est obligatoire.
                                </span>
                              </td>
                              <td class="valeurUnitaire-col">
                                <input type="text" v-model="prime.valeurUnitaire" class="form-control" placeholder="" />
                              </td>
                              <td class="montant-col">
                                <input type="text" v-model="prime.montant" :readonly="true" class="form-control"
                                  placeholder="" />
                              </td>
                              <td class="actions-col pe-0">
                                <div class="button-container" style="white-space: nowrap">
                                  <button type="button" class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    @click="removeRowPrime(index)">
                                    <i class="icofont icofont-ui-delete"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
              <div class="row">
                <div class="border border-primary mb-5">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                    style="background-color: #0a59a4">
                    <div class="col-md-3">
                      <h3 class="fs-4 text-white">Retenue</h3>
                    </div>
                    <!-- <div class="col-md-4">
                            <h3 class="fs-4 text-white">Montant total : {{ montantTotal }}</h3>
                          </div> -->
                    <div class="col-md-3">
                      <div class="d-flex float-end">
                        <button
                          class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                          type="button" :class="{ 'cursor-not-allowed': isDisablee }" :disabled="isDisablee"
                          @click="addRowRetenue">
                          <i class="fa fa-plus-circle"></i>
                          Ajouter une retenue
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="card-body p-15 p-sm-20 p-md-25">
                      <div class="table-responsive">
                        <table class="table table-fixed text-nowrap align-middle mb-0">
                          <thead>
                            <tr>
                              <th scope="col" class="prime">Type retenue</th>
                              <th scope="col" class="quantite">Valeur</th>
                              <th scope="col" class="prix-unitaire">Quantité</th>
                              <th scope="col">Valeur Unitaire</th>
                              <th scope="col">Montant</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(retenue, index) in retenues" :key="index">
                              <td class="typeRetenue-col">
                                <Multiselect :options="typeRetenueOptions" :searchable="true" track-by="label"
                                  label="label" v-model="retenue.typeRetenue" placeholder=""
                                  @select="selectTypeRetenue(retenue.typeRetenue, retenue)" />
                                <span class="invalid-feedback" v-if="validateRowRetenue(retenue.typeRetenue)">
                                  Le type de retenue est obligatoire.
                                </span>
                              </td>
                              <td class="valeur-col">
                                <input type="text" :readonly="true" v-model="retenue.valeur" class="form-control" />
                              </td>
                              <td class="quantite-col">
                                <input type="text" v-model="retenue.quantite"
                                  :class="validateRowRetenue(retenue.quantite) ? 'form-control is-invalid' : 'form-control'"
                                  placeholder="Entrer la quantité" />
                                <span class="invalid-feedback" v-if="validateRowRetenue(retenue.quantite)">
                                  La quantité est obligatoire.
                                </span>
                              </td>
                              <td class="valeurUnitaire-col">
                                <input type="text" v-model="retenue.valeurUnitaire" class="form-control"
                                  placeholder="" />
                              </td>
                              <td class="montant-col">
                                <input type="text" v-model="retenue.montant" :readonly="true" class="form-control"
                                  placeholder="" />
                              </td>
                              <td class="actions-col pe-0">
                                <div class="button-container" style="white-space: nowrap">
                                  <button type="button" class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    @click="removeRowRetenue(index)">
                                    <i class="icofont icofont-ui-delete"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter un contrat
              </button>
              <router-link to="/contrats/liste-contrats" class=" btn btn-danger"><i
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

import { defineComponent, onMounted, ref, watch, reactive, computed } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
import * as Yup from 'yup';
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { Contrat } from '@/models/Contrat';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import VueMultiselect from 'vue-multiselect'

export default defineComponent({
  name: "AddContrat",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect
  },

  setup: () => {
    const contratSchema = Yup.object().shape({
      refContrat: Yup.string().required("La référence est obligatoire."),
      salaireDeBase: Yup.string().required("Le salaire est obligatoire."),
      heuresTravaillees: Yup.number().typeError("veuillez entrer des nombres").required("Les heures sont obligatoires."),
      dateDebut: Yup.date().typeError("veuillez entrer une date valide").required("La date de début est obligatoire."),
      dateFin: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
      dateFinPeriodeEssai: Yup.date().typeError("veuillez entrer une date valide").required("La période est obligatoire."),
      periodePaie: Yup.string().required("La période est obligatoire."),
      renouvelable: Yup.string().notRequired(),
      types: Yup.string().required("Le type est obligatoire."),
      personnel: Yup.string().required("Le personnel est obligatoire."),
      modeDeTarification: Yup.string().required("Le mode de tarification est obligatoire."),
    });

    onMounted(async() => {
      await getAllTypeContrat();
      await getAllTypePrime();
      await getAllTypeRetenue();
      await getAllPersonnels();
      //getAllPersonnel();
      await getAllModeTarifications();
      await getAllOrganisations();
      await fetchFonction();
    });

    const contratForm = ref(null);
    const showMErr = ref(false);
    const types = ref();
    const personnelId = ref();
    const personnel = ref();
    const typeOptions = ref([]);
    const typePrimeOptions = ref([]);
    const typeRetenueOptions = ref([]);
    const router = useRouter();
    const typePrimes = ref(null);
    const typeRetenues = ref(null);
    const salaireDeBase = ref();
    const personnelOptions = ref();
    const OrganisationOptions = ref();
    const Organisation = ref();

    const modeDeTarificationOptions = ref([]);
    const personnels = ref([] as any[]);

    const getAllTypeContrat = async () => {
      try {
        const response = await ApiService.get('/all/typeContrats');
        const typesData = response.data.data.data;

        typeOptions.value = typesData.map((type) => ({
          value: type.id,
          label: type.libelle,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    const getAllPersonnels = async () => {
      try{
      const response = await ApiService.get('/all/personnels');
      const personnelsData = response.data.data.data;
      console.log('Data', personnelsData)
      personnelOptions.value = personnelsData.map((personnel) => ({
        value: personnel.id,
        label: personnel.nom + " " + personnel.prenom,
      }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    /*const getAllPersonnel = async () => {
    try {
      const response = await ApiService.get('/personnels');
      personnels.value = response.data;
      personnelOptions.value = response.data.map((personnel: any) => ({
        value: personnel.id,
        label: `${personnel.nom + " " + personnel.heureFinPause}`
      }));
      console.log(response);
    } catch (error) {
      console.error('Erreur lors de la recupération des personnels:', error);
      throw error;
    }
  }*/

    const getAllTypePrime = async () => {
      try {
        const response = await ApiService.get('/all/typePrimes');
        const typePrimesData = response.data.data.data;
        console.log('Type prime', typePrimesData)
        typePrimeOptions.value = typePrimesData.map(typePrime => ({
          value: `${typePrime.id}|${typePrime.valeur}|${typePrime.typeDeValeur}`,
          label: typePrime.nomPrime,
        }));
      } catch (error) {
        // H
      }
    };

    const getAllTypeRetenue = async () => {
      try {
        const response = await ApiService.get('/all/typeRetenues');
        const typeRetenuesData = response.data.data.data;
        console.log('Type prime', typeRetenuesData)
        typeRetenueOptions.value = typeRetenuesData.map(typeRetenue => ({
          value: `${typeRetenue.id}|${typeRetenue.valeur}|${typeRetenue.typeDeValeur}`,
          label: typeRetenue.nomRetenue,
        }));
      } catch (error) {
        // H
      }
    };

    const getAllModeTarifications = async () => {
      try {
        const response = await ApiService.get('/all/modeTarifications');
        const modeDeTarificationsData = response.data.data.data;
        console.log('Data', modeDeTarificationsData)
        modeDeTarificationOptions.value = modeDeTarificationsData.map((modeDeTarification) => ({
          value: modeDeTarification.id,
          label: modeDeTarification.libelle,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }


    const getAllOrganisations = async () => {
      try {
        const response = await ApiService.get('/all/organisations');
        const OrganisationsData = response.data.data.data;
        console.log('Data', OrganisationsData)
        OrganisationOptions.value = OrganisationsData.map((Organisation) => ({
          value: Organisation.id,
          label: Organisation.nom,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    // horaireContrat
    const isDisableeeeee = ref(true);
    const horaireContrats = reactive([{
      heureArrive: "",
      heureDepart: "",
      heureFinPause: "",
      heureDebutPause: ""
    }]);

    const addRowHoraireContrat = () => {
      horaireContrats.push({
        heureArrive: "",
        heureDepart: "",
        heureFinPause: "",
        heureDebutPause: ""
      });
    };

    const removeRowHoraireContrat = (index) => {
      if (horaireContrats.length > 1) horaireContrats.splice(index, 1);
      //totals();
    };

    watch(
      horaireContrats,
      (newValue) => {
        isDisableeeeee.value =
          newValue.some(
            (horaireContrat) =>
              valideteRowHoraireContrat(horaireContrat.heureArrive) ||
              valideteRowHoraireContrat(horaireContrat.heureFinPause) ||
              valideteRowHoraireContrat(horaireContrat.heureDepart) ||
              valideteRowHoraireContrat(horaireContrat.heureDebutPause)
          );
      },
      { deep: true }
    );

    const valideteRowHoraireContrat = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

    //const { remove, push, fields, update } = useFieldArray("horaireContrats");


    // formulaire dynamique
    const isDisable = ref(true);
    const isDisablee = ref(true);

    const isDisableee = ref(true);

    const primes = reactive([
      {
        typePrime: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: 0,
      },
    ]);

    const retenues = reactive([
      {
        typeRetenue: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: 0,
      },
    ]);

    const addRowPrime = () => {
      primes.push({
        typePrime: '',
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: 1,
      });
    };

    const addRowRetenue = () => {
      retenues.push({
        typeRetenue: '',
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: 1,
      });
    };

    const removeRowPrime = (index) => {
      if (primes.length > 1) {
        primes.splice(index, 1);
      }
    };

    const removeRowRetenue = (index) => {
      if (retenues.length > 1) {
        retenues.splice(index, 1);
      }
    };
    const validateRowPrime = (value) => {
      return !value || value <= 0;
    };

    const validateRowRetenue = (value) => {
      return !value || value <= 0;
    };

    const calculerMontant = (item) => {
      const valeurUnitaire = item.valeurUnitaire || 1;
      return valeurUnitaire * item.quantite;
    };

    const updateAllMontants = () => {
      primes.forEach(prime => {
        prime.montant = calculerMontant(prime);
      });
      retenues.forEach(retenue => {
        retenue.montant = calculerMontant(retenue);
      });
    };

    const updateValeurUnitaire = () => {
      const salaireBase = parseFloat(salaireDeBase.value) || 1;

      primes.forEach(prime => {
        if (prime.typePrime) {
          const [id, valeur, typeDeValeur] = prime.typePrime.split('|');
          const valeurNum = parseFloat(valeur);
          if (typeDeValeur.includes('%')) {
            prime.valeurUnitaire = salaireBase * valeurNum / 100;
          } else if (typeDeValeur.includes('MT')) {
            prime.valeurUnitaire = salaireBase + valeurNum;
          }
          prime.montant = calculerMontant(prime);
        }
      });

      retenues.forEach(retenue => {
        if (retenue.typeRetenue) {
          const [id, valeur, typeDeValeur] = retenue.typeRetenue.split('|');
          const valeurNum = parseFloat(valeur);
          if (typeDeValeur.includes('%')) {
            retenue.valeurUnitaire = salaireBase * valeurNum / 100;
          } else if (typeDeValeur.includes('MT')) {
            retenue.valeurUnitaire = salaireBase + valeurNum;
          }
          retenue.montant = calculerMontant(retenue);
        }
      });
    };

    watch(salaireDeBase, () => {
      updateValeurUnitaire();
      updateAllMontants();
    });

    watch(primes, () => {
      updateValeurUnitaire();
      updateAllMontants();
    }, { deep: true });

    watch(retenues, () => {
      updateValeurUnitaire();
      updateAllMontants();
    }, { deep: true });

    const selectTypePrime = (selectedTypePrime, prime) => {
      const [id, valeur, typeDeValeur] = selectedTypePrime.split('|');
      const valeurNum = parseFloat(valeur);
      prime.valeur = valeurNum;

      const salaireBase = parseFloat(salaireDeBase.value) || 1;

      if (typeDeValeur.includes('%')) {
        prime.valeurUnitaire = salaireBase * valeurNum / 100;
      } else if (typeDeValeur.includes('MT')) {
        prime.valeurUnitaire = salaireBase + valeurNum;
      }

      prime.montant = calculerMontant(prime);
      updateAllMontants();
    };

    const selectTypeRetenue = (selectedTypeRetenue, retenue) => {
      const [id, valeur, typeDeValeur] = selectedTypeRetenue.split('|');
      const valeurNum = parseFloat(valeur);
      retenue.valeur = valeurNum;

      const salaireBase = parseFloat(salaireDeBase.value) || 1;

      if (typeDeValeur.includes('%')) {
        retenue.valeurUnitaire = salaireBase * valeurNum / 100;
      } else if (typeDeValeur.includes('MT')) {
        retenue.valeurUnitaire = salaireBase + valeurNum;
      }

      retenue.montant = calculerMontant(retenue);
      updateAllMontants();
    };
    //const isDisable = ref(true);
    const fonctions = reactive([
      {
        estActif: "",
        fonction: "",
        organisation: "",
        dateDebut: "",
        dateFin: ""
      },
    ]);

    const addRowFonction = () => {
      fonctions.push({
        estActif: "",
        fonction: "",
        organisation: "",
        dateDebut: "",
        dateFin: ""
      });
    };

    const removeRowFonction = (index) => {
      if (fonctions.length > 1) fonctions.splice(index, 1);
      //totals();
    };

    const valideteRowFonction = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

    /* watch(
        valeurPossibles,
        (newValue) => {
          isDisable.value =
          newValue.some(
            (valeurPossible) =>
            valideteRowValeurPossible(valeurPossible.valeur) ||
            valideteRowValeurPossible(valeurPossible.libelle)
           
          );
        },
        { deep: true }
      );*/
    watch(fonctions, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].estActif == "" ||
          newValue[key].fonction == "" ||
          newValue[key].organisation == "" ||
          newValue[key].dateDebut == "" ||
          newValue[key].dateFin == ""
        ) {
          isDisableee.value = true;
        } else {
          isDisableee.value = false;
        }
      });
    });

    const { remove, push, fields, update } = useFieldArray("fonctions");

    const fonctionOptions = ref([]);
    const fetchFonction = async () => {
      try {
        const response = await axios.get("/fonctions");
        const fonctionData = response.data.data.data;
        console.log("ZZZZZZZZZZ ===> ", fonctionData)
        fonctionOptions.value = fonctionData.map((fonction) => ({
          value: fonction.id,
          label: `${fonction.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const addContrat = async (values, { resetForm }) => {
      values['typeContrat'] = types.value;
      values.contratprime = primes.map(prime => ({
        typeprime: parseInt(prime.typePrime.split('|')[0]),
        valeur: prime.valeur,
        valeurUnitaire: prime.valeurUnitaire,
        montant: prime.montant,
        quantite: prime.quantite,
      }));
      values.contratretenue = retenues.map(retenue => ({
        typesretenue: parseInt(retenue.typeRetenue.split('|')[0]),
        valeur: retenue.valeur,
        valeurUnitaire: retenue.valeurUnitaire,
        montant: retenue.montant,
        quantite: retenue.quantite,
      }));
      values.fonctions = fonctions.map(fonction => ({
        estActif: fonction.estActif,
        fonction: fonction.fonction,
        organisation: fonction.organisation,
        dateDebut: fonction.dateDebut,
        dateFin: fonction.dateFin,
      }));
      values.horaireContrats = horaireContrats.map(horaireContrat => ({
        heureArrive: horaireContrat.heureArrive,
        heureDepart: horaireContrat.heureDepart,
        heureFinPause: horaireContrat.heureFinPause,
        heureDebutPause: horaireContrat.heureDebutPause,
      }));
      console.log('Values', values);
      try {
        const { data } = await ApiService.post("/gescom/contrats", values);
        if (data.code == 201) {
          success(data.message);
          //router.push({ name: "ListeContrat" });
        }
      } catch ({ response }) {
        error(response.data.message);
      }
    };

    watch(
      primes,
      (newValue) => {
        isDisable.value = newValue.some(prime =>
          validateRowPrime(prime.typePrime) ||
          validateRowPrime(prime.montant) ||
          validateRowPrime(prime.valeurUnitaire) ||
          validateRowPrime(prime.quantite) ||
          validateRowPrime(prime.valeur)
        );
      },
      { deep: true }
    );

    watch(
      retenues,
      (newValue) => {
        isDisablee.value = newValue.some(retenue =>
          validateRowRetenue(retenue.typeRetenue) ||
          validateRowRetenue(retenue.montant) ||
          validateRowRetenue(retenue.valeurUnitaire) ||
          validateRowRetenue(retenue.quantite) ||
          validateRowRetenue(retenue.valeur)
        );
      },
      { deep: true }
    );


    return {
      contratSchema,
      addContrat,
      contratForm,
      typeOptions,
      showMErr,
      types,
      typePrimeOptions,
      typePrimes,
      selectTypePrime,
      removeRowPrime,
      addRowPrime,
      validateRowPrime,
      isDisable, primes,
      isDisableee, fonctionOptions,
      removeRowFonction,
      addRowFonction,
      valideteRowFonction, fonctions,
      salaireDeBase,
      typeRetenueOptions,
      typeRetenues,
      selectTypeRetenue,
      removeRowRetenue,
      addRowRetenue,
      validateRowRetenue,
      isDisablee, retenues,
      personnelOptions,
      personnelId,
      personnel,
      modeDeTarificationOptions,
      OrganisationOptions,
      Organisation, removeRowHoraireContrat,
      addRowHoraireContrat,
      valideteRowHoraireContrat, horaireContrats, isDisableeeeee
    };
  },
});
</script>

<style>
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

input[readonly] {
  background-color: #f0f0f0;
}

.table-responsive {
  overflow-x: auto;
}

.table thead th,
.table tbody td {
  white-space: nowrap;
}

.typePrime-col,
.quantite-col,
.valeur-col,
.valeurUnitaire-col,
.montant-col {
  min-width: 150px;
}

.actions-col {
  width: 120px;
}

.form-control {
  width: 100%;
}
</style>