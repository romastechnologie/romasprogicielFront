<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="processusForm" @submit="add_Processus" :validation-schema="processusSchema">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="dateDebutProcessus" class="form-label">
              Date début Processus<span class="text-danger">*</span>
            </label>
            <Field name="dateDebutProcessus" class="form-control shadow-none fs-md-15 text-black" v-model="dateDebutProcessus" type="date" />
            <ErrorMessage name="dateDebutProcessus" class="text-danger" />
          </div>
          
          <div class="col-md-6 mb-3">
                <label for="dateFinProcessus" class="form-label">
                  Date Fin Processus<span class="text-danger">*</span>
                </label>
                <Field
                  name="dateFinProcessus"
                  class="form-control"
                  type="date"
                  :min="dateDebutProcessus"
                  v-model="dateFinProcessus"
                />
                <ErrorMessage name="dateFinProcessus" class="text-danger" />
              </div>

          <div class="col-md-6 mb-3">
                      <label for="periodePaie" class="form-label">Période<span class="text-danger">*</span></label>
                      <Field
                        name="periodePaie"
                        class="form-control"
                        type="month"
                        :min="minDate"
                        :max="maxDate"
                        v-model="periodePaieDefault"
                        @change="updatePaymentPeriods"
                      />
                      <ErrorMessage name="periodePaie" class="text-danger" />
                    </div>

                    

                            <div class="col-md-6 mb-3">
                <label class="d-block text-black mb-10">
                  Statut <span class="text-danger">*</span>
                </label>
                <Field name="statut" v-slot="{ field }">
                  <Multiselect
                    v-model="field.value"
                    v-bind="field"
                    :options="statutOptions"
                    :preserve-search="true"
                    :multiple="false"
                    :searchable="true"
                    placeholder="Sélectionner le statut"
                    label="label"
                    track-by="value"
                  />
                </Field>
                <ErrorMessage name="statut" class="text-danger" />
              </div>

          <!-- Paie -->
          <!-- <button
            class="btn btn-primary transition border-0 pb-2 ps-8 pe-8 mb-3"
            @click.prevent="addPayment"
          >
            Ajouter un paiement
          </button> -->
           <div class="col-md-12 m-10">
              <div class="row">
                <div class="border border-primary mb-10">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                    <div class="col-md-7">
                      <h4 class="fs-4 text-white">Liste des contrats</h4>
                    </div>
                    <div class="col-md-5">
                      <div class="d-flex float-end">
                        <button
                          class="btn btn-success"
                          type="button"
                          :class="{ 'cursor-not-allowed': isDisable }"
                          :disabled="isDisable"
                           @click.prevent="addPayment">
                          <i class="fa fa-plus-circle position-relative me-1 fs-12" ></i>Ajouter un contrat
                        </button>
                      </div>
                    </div>
                  </div>
                   <div class="accordion dark-accordion my-3 py-7"  id="payment">
                    <div class="accordion-item accordion-wrapper"  v-for="(payment, paymentIndex) in payments"
            :key="paymentIndex">
    <h2 class="accordion-header" :id="`payment${paymentIndex}`">
  <button 
    :class="`accordion-button bg-light-primary font-primary ${payments.length == paymentIndex+1 ? '' :'collapsed'} d-flex justify-content-between align-items-center pe-4`" 
    type="button" 
    data-bs-toggle="collapse" 
    :data-bs-target="`#collapse${paymentIndex}`" 
    :aria-expanded="`${payments.length == paymentIndex+1 ? true :false}`" 
    :aria-controls="`collapse${paymentIndex}`"
  >
    <span class="flex-grow-1 text-truncate me-3">
      {{ payment.nomPersonnel ? payment.nomPersonnel : `Personnel ${paymentIndex+1}` }}
    </span>
    
    <div class="d-flex align-items-center gap-2">
      <!-- Modifier cette condition pour afficher seulement à partir de l'index 1 (Personnel 2) -->
      <button
        v-if="paymentIndex > 0" 
        @click.stop="removePayment(paymentIndex)"
        class="btn btn-sm btn-danger"
        title="Supprimer ce bloc"
      >
        <i class="fa fa-trash"></i>
      </button>
      <i class="vue-feather vue-feather--chevron-down svg-color" data-name="chevron-down">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </i>
    </div>
  </button>
</h2>   <div :class="`accordion-collapse collapse ${payments.length == paymentIndex+1 ? 'show' :''}`" :id="`collapse${paymentIndex}`" :aria-labelledby="`payment${paymentIndex}`" data-bs-parent="#payment" style="">
                        <div class="accordion-body">

                          <div class="row">
                    <div class="col-md-8 mb-3">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Contrat <span class="text-danger">*</span>
                        </label>
                        <Field
                          :name="`payments[${paymentIndex}].contrat`"
                          v-slot="{ field }"
                          v-model="payment.contrat"
                        >
                          <Multiselect
                            :options="getAvailableContrats(paymentIndex)"
                            :searchable="true"
                            track-by="value"
                            label="label"
                            v-model="field.value"
                            v-bind="field"
                            placeholder="Sélectionner le contrat"
                            @update:model-value="fetchPrimeRetenue(paymentIndex, $event)"
                          />
                        </Field>
                        <ErrorMessage
                          :name="`payments[${paymentIndex}].contrat`"
                          class="text-danger"
                        />
                      </div>
                    </div>
<!-- 
                    <div class="col-md-4 mb-3">
                      <label
                        :for="`payments[${paymentIndex}].refPaie`"
                        class="form-label"
                      >
                        Référence<span class="text-danger">*</span>
                      </label>
                      <Field
                        :name="`payments[${paymentIndex}].refPaie`"
                        class="form-control"
                        type="text"
                        v-model="payment.refPaie"
                      />
                      <ErrorMessage
                        :name="`payments[${paymentIndex}].refPaie`"
                        class="text-danger"
                      />
                    </div> -->

                    <div class="col-md-4 mb-3">
                      <label
                        :for="`payments[${paymentIndex}].datePaie`"
                        class="form-label"
                      >
                        Date de Paie<span class="text-danger">*</span>
                      </label>
                      <Field
                        :name="`payments[${paymentIndex}].datePaie`"
                        class="form-control"
                        type="Date"
                        v-model="payment.datePaie"
                      />
                      <ErrorMessage
                        :name="`payments[${paymentIndex}].datePaie`"
                        class="text-danger"
                      />
                    </div>

                <div class="col-md-4 mb-3">
                      <label :for="`payments[${paymentIndex}].periode`" class="form-label">
                        Période<span class="text-danger">*</span>
                      </label>
                      <Field
                        :name="`payments[${paymentIndex}].periode`"
                        class="form-control"
                        type="month"
                        :min="minDate"
                        :max="maxDate"
                        :disabled=true
                       v-model="payment.periode"
                      />
                      <ErrorMessage :name="`payments[${paymentIndex}].periode`" class="text-danger" />
                    </div>

                    <div class="col-md-4 mb-3">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Mode de Paiement <span class="text-danger">*</span>
                        </label>
                        <Field
                          :name="`payments[${paymentIndex}].modepaiement`"
                          v-model="payment.modepaiement"
                          type="text"
                          v-slot="{ field }"
                        >
                          <Multiselect
                            v-model="field.value"
                            v-bind="field"
                            :options="modeOptions"
                            :preserve-search="true"
                            :multiple="false"
                            :searchable="true"
                            placeholder="Sélectionner le mode de paiement"
                            label="label"
                            track-by="label"
                          />
                        </Field>
                        <ErrorMessage
                          :name="`payments[${paymentIndex}].modepaiement`"
                          class="text-danger"
                        />
                      </div>
                    </div>

                    <div class="col-md-4 mb-3">
                      <label
                        :for="`payments[${paymentIndex}].salaireBrut`"
                        class="form-label"
                      >
                        Salaire de base<span class="text-danger">*</span>
                      </label>
                      <Field
                        :name="`payments[${paymentIndex}].salaireBrut`"
                        class="form-control"
                        type="number"
                        v-model="payment.salaireBrut"
                        :readonly="true"
                      />
                      <ErrorMessage
                        :name="`payments[${paymentIndex}].salaireBrut`"
                        class="text-danger"
                      />
                    </div>

                    <div class="col-md-4 mb-3">
                      <label
                        :for="`payments[${paymentIndex}].totalRetenues`"
                        class="form-label"
                      >
                        Total des retenues<span class="text-danger">*</span>
                      </label>
                      <Field
                        :name="`payments[${paymentIndex}].totalRetenues`"
                        class="form-control"
                        type="number"
                        :readonly="true"
                        v-model="payment.totalRetenues"
                      />
                      <ErrorMessage
                        :name="`payments[${paymentIndex}].totalRetenues`"
                        class="text-danger"
                      />
                    </div>

                    <div class="col-md-4 mb-3">
                      <label
                        :for="`payments[${paymentIndex}].totalPrimes`"
                        class="form-label"
                      >
                        Total des primes<span class="text-danger">*</span>
                      </label>
                      <Field
                        :name="`payments[${paymentIndex}].totalPrimes`"
                        class="form-control"
                        type="number"
                        :readonly="true"
                        v-model="payment.totalPrimes"
                      />
                      <ErrorMessage
                        :name="`payments[${paymentIndex}].totalPrimes`"
                        class="text-danger"
                      />
                    </div>

                            <div class="col-md-4 mb-3">
                    <label class="form-label">Montant ITS</label>
                    <Field :name="`payments[${paymentIndex}].montantITS`" class="form-control" type="number" :readonly="true" v-model="payment.montantITS" />
                  </div>
                        <div class="col-md-4 mb-3">
                      <label
                        :for="`payments[${paymentIndex}].salaireNet`"
                        class="form-label"
                      >
                        Salaire Net<span class="text-danger">*</span>
                      </label>
                      <Field
                        :name="`payments[${paymentIndex}].salaireNet`"
                        class="form-control"
                        type="text"
                        :readonly="true"
                        v-model="payment.salaireNet"
                      />
                      <ErrorMessage
                        :name="`payments[${paymentIndex}].salaireNet`"
                        class="text-danger"
                      />
                    </div>

                    <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                        <div class="row">
                          <div class="border border-primary mb-5">
                            <div
                              class="row d-flex align-items-center justify-content-between fw-bold py-2"
                              style="background-color: #0a59a4"
                            >
                              <div class="col-md-3">
                                <h3 class="fs-4 text-white">Prime</h3>
                              </div>
                              <div class="col-md-3">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': payment.isDisable }"
                                    :disabled="payment.isDisable"
                                    @click="addRowPrime(payment)"
                                  >
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
                                      <tr v-for="(prime, index) in payment.primes" :key="index">
                                        <td class="typePrime-col  td-large">
                                          <Multiselect
                                            :options="getAvailableTypePrimes(paymentIndex, primeIndex)"
                                            :searchable="true"
                                            track-by="label"
                                            label="label"
                                            v-model="prime.typePrime"
                                            placeholder=""
                                            @select="selectTypePrime($event, prime, payment)"
                                          />
                                          <span
                                            class="invalid-feedback"
                                            v-if="validateRowPrime(prime.typePrime)"
                                          >
                                            Le type de prime est obligatoire.
                                          </span>
                                        </td>
                                        <td class="valeur-col">
                                          <input
                                            type="text"
                                            :readonly="true"
                                            v-model="prime.valeur"
                                            class="form-control"
                                          />
                                        </td>
                                        <!-- <td class="quantite-col">
                                          <input
                                            type="text"
                                            v-model="prime.quantite"
                                            :class="
                                              validateRowPrime(prime.quantite)
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                            "
                                            placeholder="Entrer la quantité"
                                          />
                                          <span
                                            class="invalid-feedback"
                                            v-if="validateRowPrime(prime.quantite)"
                                          >
                                            La quantité est obligatoire.
                                          </span>
                                        </td> -->
                                <td class="quantite-col">
                                          <input
                                            type="text"
                                            v-model="prime.quantite"
                                            :class="
                                              validateRowPrime(prime.quantite)
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                            "
                                            placeholder="Entrer la quantité"
                                            readonly
                                          />
                                          <span
                                            class="invalid-feedback"
                                            v-if="validateRowPrime(prime.quantite)"
                                          >
                                            La quantité est obligatoire.
                                          </span>
                                        </td>

                                        <td class="valeurUnitaire-col">
                                          <input
                                            type="text"
                                            v-model="prime.valeurUnitaire"
                                            class="form-control"
                                            placeholder=""
                                          />
                                        </td>
                                        <td class="montant-col">
                                          <input
                                            type="text"
                                            v-model="prime.montant"
                                            :readonly="true"
                                            class="form-control"
                                            placeholder=""
                                          />
                                        </td>
                                        <td class="actions-col pe-0">
                                          <div class="button-container" style="white-space: nowrap">
                                            <button
                                              type="button"
                                              :disabled="prime.desactive"
                                              class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                              @click="removeRowPrime(payment, index)"
                                            >
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
                            <div
                              class="row d-flex align-items-center justify-content-between fw-bold py-2"
                              style="background-color: #0a59a4"
                            >
                              <div class="col-md-3">
                                <h3 class="fs-4 text-white">Retenue</h3>
                              </div>
                              <div class="col-md-3">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': payment.isDisablee }"
                                    :disabled="payment.isDisablee"
                                    @click="addRowRetenue(payment)"
                                  >
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
                                      <tr v-for="(retenue, index) in payment.retenues" :key="index">
                                        <td class="typeRetenue-col  td-large">
                                          <Multiselect                                 
                                            :options="getAvailableTypeRetenues(paymentIndex, index)"
                                            :searchable="true"
                                            track-by="label"
                                            label="label"
                                            v-model="retenue.typeRetenue"
                                            placeholder=""
                                            @select="selectTypeRetenue($event, retenue, payment)"
                                          />
                                          <span
                                            class="invalid-feedback"
                                            v-if="validateRowRetenue(retenue.typeRetenue)"
                                          >
                                            Le type de retenue est obligatoire.
                                          </span>
                                        </td>
                                        <td class="valeur-col">
                                          <input
                                            type="text"
                                            :readonly="true"
                                            v-model="retenue.valeur"
                                            class="form-control"
                                          />
                                        </td>
                                        <td class="quantite-col">
                                          <input
                                            type="text"
                                            v-model="retenue.quantite"
                                            :class="
                                              validateRowRetenue(retenue.quantite)
                                                ? 'form-control is-invalid'
                                                : 'form-control'
                                            "
                                            placeholder="Entrer la quantité"
                                            readonly
                                          />
                                          <span
                                            class="invalid-feedback"
                                            v-if="validateRowRetenue(retenue.quantite)"
                                          >
                                            La quantité est obligatoire.
                                          </span>
                                        </td>
                                        <td class="valeurUnitaire-col">
                                          <input
                                            type="text"
                                            v-model="retenue.valeurUnitaire"
                                            class="form-control"
                                            placeholder=""
                                          />
                                        </td>
                                        <td class="montant-col">
                                          <input
                                            type="text"
                                            v-model="retenue.montant"
                                            :readonly="true"
                                            class="form-control"
                                            placeholder=""
                                          />
                                        </td>
                                        <td class="actions-col pe-0">
                                          <div class="button-container" style="white-space: nowrap">
                                            <button
                                              type="button"
                                              :disabled="retenue.desactive"
                                              class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                              @click="removeRowRetenue(payment, index)"
                                            >
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
                  </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>
                  </div>
                  </div>
         
        </div>

        <!-- Fin Paie -->

        <div class="col-md-12 mt-3">
          <div class="d-flex align-items-center">
            <button class="btn btn-success me-3" type="submit">
              Ajouter un processus
            </button>
            <router-link to="/processus/liste-processus" class="btn btn-danger">
              <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Annuler
            </router-link>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, watch, computed } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import ApiService from "@/services/ApiService";
import { error, success } from "@/utils/utils";
import { useRouter } from "vue-router";
import Multiselect from "@vueform/multiselect";
import VueMultiselect from "vue-multiselect";
import Swal from 'sweetalert2';


interface ItsOption {
  value: number;
  label: string;
}
interface Its {
  plafondMin: number;
  plafondMax: number | null; // null = pas de plafond (ex : infini)
  taux: number; // en pourcentage, ex: 10 = 10%
}
export default defineComponent({
  name: "AddProcessus",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect,
  },

  setup: () => {
    // Calcul des dates dynamiques pour la période
    const today = new Date(); // 30 mai 2025
    const currentYear = today.getFullYear(); // 2025
    const previousYear = currentYear - 1; // 2024

    const minDate = computed(() => `${previousYear}-01`);
    const maxDate = computed(() => `${currentYear}-12`);

    // Valeur par défaut pour periodePaie (mois et année actuels : "2025-05")
    const periodePaieDefault = ref(`${currentYear}-${String(today.getMonth() + 1).padStart(2, '0')}`);

    // Dates du processus
    const dateDebutProcessus = ref(getCurrentDateTime()); // "2025-05-30"
    const dateFinProcessus = ref(""); // Initialisation vide, sera mise à jour avec min
   
    const itsBaremes = ref<Its[]>([]);
      const montantITS = ref<number>(0);

    // Schémas de validation
    const paymentSchema = Yup.object().shape({
      contrat: Yup.string().required("Le contrat est obligatoire."),
      // refPaie: Yup.string().required("La référence est obligatoire."),
      datePaie: Yup.date()
        .typeError("Veuillez entrer une date valide")
        .required("La date de paie est obligatoire."),
      periode: Yup.string()
        .matches(/^\d{4}-(0[1-9]|1[0-2])$/, "La période doit être au format YYYY-MM (ex: 2025-05)")
        .test('valid-year', 'La période doit être comprise entre 2024 et 2025.', value => {
          if (!value) return false;
          const year = parseInt(value.split('-')[0], 10);
          return year >= 2024 && year <= 2025;
        })
        .required("La période est obligatoire."),
      modepaiement: Yup.string().required("Le mode de paiement est obligatoire."),
      salaireBrut: Yup.number().required("Le salaire brut est obligatoire."),
      totalRetenues: Yup.number()
        .typeError("Veuillez entrer des nombres")
        .required("Le total des retenues est obligatoire."),
      totalPrimes: Yup.number()
        .typeError("Veuillez entrer des nombres")
        .required("Le total des primes est obligatoire."),
      salaireNet: Yup.number()
        .typeError("Veuillez entrer des nombres")
        .required("Le salaire net est obligatoire."),
    });

    const processusSchema = Yup.object().shape({
      dateDebutProcessus: Yup.date()
        .typeError("Entrer une date valide")
        .required("La date de début est obligatoire."),
      dateFinProcessus: Yup.date()
        .typeError("Entrer une date valide")
        .required("La date de fin est obligatoire.")
        .min(
          Yup.ref("dateDebutProcessus"),
          "La date de fin doit être postérieure à la date de début."
        ),
      periodePaie: Yup.string()
        .matches(/^\d{4}-(0[1-9]|1[0-2])$/, "La période doit être au format YYYY-MM (ex: 2025-05)")
        .test('valid-year', 'La période doit être comprise entre 2024 et 2025.', value => {
          if (!value) return false;
          const year = parseInt(value.split('-')[0], 10);
          return year >= 2024 && year <= 2025;
        })
        .required("La période est obligatoire."),
      payments: Yup.array()
        .of(paymentSchema)
        .min(1, "Au moins un paiement est requis."),
          statut: Yup.string().required("Le mode de paiement est obligatoire."),

    });

    const processusForm = ref(null);
    const router = useRouter();
    const contratOptions = ref([]);
    const typePrimeOptions = ref([]);
    const typeRetenueOptions = ref([]);
    const modeOptions = ref([]);
    const lesContrats = ref([]);
    const itsOptions = ref<ItsOption[]>([]);


    
    const payments = reactive([
      {
        contrat: "",
        nomPersonnel: "",
        refPaie: "",
        datePaie: "",
        periode: periodePaieDefault.value,
        modepaiement: "",
        salaireBrut: 0,
        totalRetenues: 0,
        totalPrimes: 0,
        salaireNet: 0,
        montantITS: 0,
        primes: [
          {
            typePrime: "",
            montant: 0,
            valeurUnitaire: 0,
            quantite: 1,
            valeur: "0",
            desactive: false,
          },
        ],
        retenues: [
          {
            typeRetenue: "",
            montant: 0,
            valeurUnitaire: 0,
            quantite: 1,
            valeur: "0",
            desactive: false,
          },
        ],
        isOpen: false,
        isDisable: true,
        isDisablee: true,
      },
    ]);

    const updatePaymentPeriods = () => {
      payments.forEach((payment) => {
        payment.periode = periodePaieDefault.value;
      });
    };

    onMounted(() => {
      getAllModePaiements();
      getAllTypePrime();
      getAllTypeRetenue();
      getAllContrats();
      getAllIts();
    });

const getAvailableContrats = (currentIndex: number) => {
  const selectedIds = payments
    .map((p, idx) => idx !== currentIndex ? p.contrat : null)
    .filter(Boolean);

  return contratOptions.value.filter((option) => !selectedIds.includes(option.value));
};

    const getAllContrats = async () => {
      try {
        const response = await ApiService.get('/all/contrats');
        const contratsData = response.data.data.data;
        lesContrats.value = contratsData;
        contratOptions.value = contratsData.map((contrat) => ({
          value: contrat.id,
          label: `${contrat?.reference || "N/A" } - ${contrat?.personnel?.nom || "N/A"} `,
        }));
      } catch (error) {
        console.error('Error fetching contrats:', error);
      }
    };

     // Fonction pour formater une date de YYYY-MM-DD à DD-MM-YYYY
     const formatDate = (dateString: string | undefined | null): string => {
      if (!dateString) return "N/A"; // Retourne "N/A" si la date est absente
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A"; // Vérifie si la date est invalide
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const getAllTypePrime = async () => {
      try {
        const response = await ApiService.get('/all/typePrimes');
        const typePrimesData = response.data.data.data;
        typePrimeOptions.value = typePrimesData.map(typePrime => ({
          value: `${typePrime.id}|${typePrime.valeur}|${typePrime.typeDeValeur}`,
          label: typePrime.nomPrime,
        }));
      } catch (error) {
        console.error('Error fetching type primes:', error);
      }
    };

    const getAllTypeRetenue = async () => {
      try {
        const response = await ApiService.get('/all/typeRetenues');
        const typeRetenuesData = response.data.data.data;
        // typeRetenueOptions.value = typeRetenuesData.map(typeRetenue => ({
        //   value: `${typeRetenue.id}|${typeRetenue.valeur}|${typeRetenue.typeDeValeur}`,
        //   label: typeRetenue.nomRetenue,
        // }));
        typeRetenueOptions.value = typeRetenuesData.map(typeRetenue => ({
  value: `${typeRetenue.id}|${typeRetenue.valeur}|${typeRetenue.typeDeValeur}|${typeRetenue.typeDeCharge}`,
  label: typeRetenue.nomRetenue,
}));
      } catch (error) {
        console.error('Error fetching type retenues:', error);
      }
    };

    const getAllModePaiements = async () => {
      try {
        const response = await ApiService.get('/all/modepaiements');
        const modesData = response.data.data.data;
        modeOptions.value = modesData.map((mode) => ({
          value: mode.id,
          label: mode.libelle,
        }));
      } catch (error) {
        console.error('Error fetching mode paiements:', error);
      }
    };

    const fetchPrimeRetenue = async (paymentIndex, contratId) => {
      const payment = payments[paymentIndex];
      try {
        const response = await ApiService.get(`/prime/retenues/contrat/${contratId}`);
       console.log("document recupéré",response);
        const { primes: fetchedPrimes, retenues: fetchedRetenues, paie } = response.data.data;

        // Récupérer les détails du contrat pour obtenir le salaireBase
        const contratData = await getContrat(contratId);
        payment.salaireBrut = contratData.salaireBase || 0; 
        payment.nomPersonnel = contratData.personnel ? `${contratData.personnel.nom} ${contratData.personnel.prenom}` : "";
        payment.montantITS = calculerITS(payment.salaireBrut); // <-- AJOUT ICI
 
        // Si une paie existe, surcharger avec ses valeurs
        if (paie) {
          payment.refPaie = paie.refPaie || "";
          payment.datePaie = paie.datePaie || "";
          payment.periode =  periodePaieDefault.value || paie.periode;
          payment.modepaiement = paie.modepaiement || "";
          payment.salaireBrut = paie.salaireBrut || payment.salaireBrut; // Prendre paie.salaireBrut si disponible
          payment.montantITS = calculerITS(payment.salaireBrut);
          payment.totalRetenues = paie.totalRetenues || 0;
          payment.totalPrimes = paie.totalPrimes || 0;
          payment.salaireNet = paie.salaireNet || 0;
        } else {
          payment.refPaie = "";
          payment.datePaie = "";
          payment.periode = periodePaieDefault.value;
          payment.modepaiement = "";
          payment.totalRetenues = 0;
          payment.totalPrimes = 0;
          payment.salaireNet = 0;
        }

        // Gestion des primes
        payment.primes.splice(0, payment.primes.length);
        fetchedPrimes.forEach(prime => {
          const typePrimeString = `${prime.typeprime.id}|${prime.typeprime.valeur}|${prime.typeprime.typeDeValeur}`;
          payment.primes.push({
            typePrime: typePrimeString,
            montant: prime.montant,
            valeurUnitaire: prime.valeurUnitaire,
            quantite: parseInt(prime.quantite),
            valeur: `${parseInt(prime.typeprime.valeur)}`,
            desactive: true,
          });
        });

        // Gestion des retenues
        payment.retenues.splice(0, payment.retenues.length);
        fetchedRetenues.forEach(retenue => {
const typeRetenueString = `${retenue.typesretenue.id}|${retenue.typesretenue.valeur}|${retenue.typesretenue.typeDeValeur}|${retenue.typesretenue.typeDeCharge}`;
          payment.retenues.push({
            typeRetenue: typeRetenueString,
            montant: retenue.montant,
            valeurUnitaire: retenue.valeurUnitaire,
            quantite: parseInt(retenue.quantite),
            valeur: `${parseInt(retenue.typesretenue.valeur)}`,
            desactive: true,
          });
        });

        updateAllMontants(payment);
      } catch (error) {
        console.error('Error fetching primes, retenues, or paie data:', error);
        // En cas d'erreur, utiliser le salaireBase du contrat
        const contratData = await getContrat(contratId);
        payment.salaireBrut = contratData.salaireBase || 0;
        payment.refPaie = "";
        payment.datePaie = "";
        payment.periode = periodePaieDefault.value;
        payment.modepaiement = "";
        payment.totalRetenues = 0;
        payment.totalPrimes = 0;
        payment.salaireNet = 0;
        payment.primes = [{ typePrime: "", montant: 0, valeurUnitaire: 0, quantite: 1, valeur: "0", desactive: false }];
        payment.retenues = [{ typeRetenue: "", montant: 0, valeurUnitaire: 0, quantite: 1, valeur: "0", desactive: false }];
        updateAllMontants(payment);
      }
    };

    function getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const getContrat = async (id) => {
      try {
        const response = await ApiService.get(`/contrat/${id}`);
        return response.data.data;
      } catch (error) {
        console.error('Error fetching contrat:', error);
        return {};
      }
    };
    const statutOptions = [
  { label: "Active", value: 1 },
  { label: "Clôturé", value: 0 },
];

   const addPayment = () => {
  // Fermer tous les paiements existants
  payments.forEach(p => p.isOpen = false);

  // Ajouter un nouveau paiement ouvert
  payments.push({
    contrat: "",
    nomPersonnel: "",
    refPaie: "",
    datePaie: "",
    periode: periodePaieDefault.value,
    modepaiement: "",
    salaireBrut: 0,
    totalRetenues: 0,
    totalPrimes: 0,
    salaireNet: 0,
     montantITS: 0,
    primes: [
      {
        typePrime: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: "0",
        desactive: false,
      },
    ],
    retenues: [
      {
        typeRetenue: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: "0",
        desactive: false,
      },
    ],
    isOpen: true,
    isDisable: true,
    isDisablee: true,
  });
};


// Vérifie si tous les champs requis sont remplis
const isValidPayment = (payment) => {
  return (
    payment.contrat &&
    payment.datePaie &&
    payment.periode &&
    payment.modepaiement &&
    payment.salaireBrut > 0 &&
    payment.salaireNet > 0 &&
    !payment.primes.some(prime => validateRowPrime(prime.typePrime) || validateRowPrime(prime.montant)) &&
    !payment.retenues.some(ret => validateRowRetenue(ret.typeRetenue) || validateRowRetenue(ret.montant))
  );
};


    const removePayment = (index) => {
      if (payments.length > 1) {
        payments.splice(index, 1);
      }
    };

    const toggleAccordion = (index) => {
      payments[index].isOpen = !payments[index].isOpen;
    };

    const validateRowPrime = (value) => {
      return !value || value <= 0;
    };

    const validateRowRetenue = (value) => {
      return !value || value <= 0;
    };

    const addRowPrime = (payment) => {
      payment.primes.push({
        typePrime: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: "0",
        desactive: false,
      });
    };

    const addRowRetenue = (payment) => {
      payment.retenues.push({
        typeRetenue: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: "0",
        desactive: false,
      });
    };

    const removeRowPrime = (payment, index) => {
      if (!payment.primes[index].desactive && payment.primes.length > 1) {
        payment.primes.splice(index, 1);
        updateAllMontants(payment);
      }
    };

    const removeRowRetenue = (payment, index) => {
      if (!payment.retenues[index].desactive && payment.retenues.length > 1) {
        payment.retenues.splice(index, 1);
        updateAllMontants(payment);
      }
    };

    const calculerMontant = (item) => {
      const valeurUnitaire = item.valeurUnitaire || 1;
      return valeurUnitaire * item.quantite;
    };

    const updateValeurUnitaire = (payment) => {
      const salaireBase = parseFloat(payment.salaireBrut) || 1;

      payment.primes.forEach(prime => {
        if (prime.typePrime) {
          const [id, valeur, typeDeValeur] = prime.typePrime.split('|');
          const valeurNum = parseFloat(valeur);
          if (typeDeValeur.includes('%')) {
            prime.valeurUnitaire = salaireBase * valeurNum / 100;
          } else if (typeDeValeur.includes('MT')) {
            prime.valeurUnitaire = valeurNum;
          }
          prime.montant = calculerMontant(prime);
        }
      });

      payment.retenues.forEach(retenue => {
        if (retenue.typeRetenue) {
          const [id, valeur, typeDeValeur] = retenue.typeRetenue.split('|');
          const valeurNum = parseFloat(valeur);
          if (typeDeValeur.includes('%')) {
            retenue.valeurUnitaire = salaireBase * valeurNum / 100;
          } else if (typeDeValeur.includes('MT')) {
            retenue.valeurUnitaire = valeurNum;
          }
          retenue.montant = calculerMontant(retenue);
        }
      });
    };

   const updateAllMontants = (payment) => {
  payment.primes.forEach(prime => {
    prime.montant = calculerMontant(prime);
  });

  payment.retenues.forEach(retenue => {
    retenue.montant = calculerMontant(retenue);
  });

  // Total des PRIMES (pas modifié)
  payment.totalPrimes = payment.primes.reduce((acc, prime) => acc + (prime.montant || 0), 0);

  // ❗ Total des RETENUES : inclut SEULEMENT les charges ouvrières
  payment.totalRetenues = payment.retenues
    .filter(retenue => {
      const [ , , , typeDeCharge ] = (retenue.typeRetenue || '').split('|');
      return typeDeCharge !== 'Charge Patronale'; // <-- Ne garde que les non-patronales
    })
    .reduce((acc, retenue) => acc + (retenue.montant || 0), 0);

  // Calcule ITS
  payment.montantITS = calculerITS(payment.salaireBrut);

  // Calcule salaire NET
  payment.salaireNet = (payment.salaireBrut || 0) + payment.totalPrimes - payment.totalRetenues - payment.montantITS;
};


    const selectTypePrime = (selectedTypePrime, prime, payment) => {
      const [id, valeur, typeDeValeur] = selectedTypePrime.split('|');
      const valeurNum = parseFloat(valeur);
      prime.valeur = valeurNum.toString();

      const salaireBase = parseFloat(payment.salaireBrut) || 1;

      if (typeDeValeur) {
        if (typeDeValeur.includes('%')) {
          prime.valeurUnitaire = salaireBase * valeurNum / 100;
        } else if (typeDeValeur.includes('MT')) {
          prime.valeurUnitaire = salaireBase + valeurNum;
        }
      } else {
        console.error('typeDeValeur is undefined');
      }

      prime.montant = calculerMontant(prime);
      updateAllMontants(payment);
    };

    const selectTypeRetenue = (selectedTypeRetenue, retenue, payment) => {
      const [id, valeur, typeDeValeur] = selectedTypeRetenue.split('|');
      const valeurNum = parseFloat(valeur);
      retenue.valeur = valeurNum.toString();

      const salaireBase = parseFloat(payment.salaireBrut) || 1;

      if (typeDeValeur) {
        if (typeDeValeur.includes('%')) {
          retenue.valeurUnitaire = salaireBase * valeurNum / 100;
        } else if (typeDeValeur.includes('MT')) {
          retenue.valeurUnitaire = salaireBase + valeurNum;
        }
      } else {
        console.error('typeDeValeur is undefined');
      }

      retenue.montant = calculerMontant(retenue);
      updateAllMontants(payment);
    };

   watch(
  payments,
  (newPayments) => {
    newPayments.forEach((payment, index) => {
      updateValeurUnitaire(payment);
      updateAllMontants(payment);
      payment.isDisable = payment.primes.some(prime =>
        validateRowPrime(prime.typePrime) ||
        validateRowPrime(prime.montant) ||
        validateRowPrime(prime.valeurUnitaire) ||
        validateRowPrime(prime.quantite) ||
        validateRowPrime(prime.valeur)
      );
      payment.isDisablee = payment.retenues.some(retenue =>
        validateRowRetenue(retenue.typeRetenue) ||
        validateRowRetenue(retenue.montant) ||
        validateRowRetenue(retenue.valeurUnitaire) ||
        validateRowRetenue(retenue.quantite) ||
        validateRowRetenue(retenue.valeur)
      );
      if (isValidPayment(payment)) {
       // payment.isOpen = false;
      }
    });
  },
  { deep: true }
);

 const getAvailableTypePrimes = (paymentIndex: number, primeIndex: number) => {
  const selected = payments[paymentIndex].primes
    .map((p, idx) => idx !== primeIndex ? p.typePrime : null)
    .filter(Boolean);
  return typePrimeOptions.value.filter(option => !selected.includes(option.value));
};

const getAvailableTypeRetenues = (paymentIndex: number, retenueIndex: number) => {
  const selected = payments[paymentIndex].retenues
    .map((r, idx) => idx !== retenueIndex ? r.typeRetenue : null)
    .filter(Boolean);
  return typeRetenueOptions.value.filter(option => !selected.includes(option.value));
};

 /*   const add_Processus = async (values) => {
      if (!values || Object.keys(values).length === 0) {
        console.error("Erreur : L'objet 'values' est vide ou indéfini !");
        return;
      }

      try {
        values.paiements = payments.map(payment => ({
          contrat: parseInt(payment.contrat),
          refPaie: payment.refPaie,
          datePaie: payment.datePaie,
          periode: payment.periode,
          modepaiement: parseInt(payment.modepaiement),
          salaireBrut: payment.salaireBrut,
          totalRetenues: payment.totalRetenues,
          totalPrimes: payment.totalPrimes,
          salaireNet: payment.salaireNet,
          paieprime: payment.primes.map(prime => ({
            typeprime: parseInt(prime.typePrime.split('|')[0]),
            valeur: parseInt(prime.valeur),
            valeurUnitaire: prime.valeurUnitaire,
            montant: prime.montant,
            quantite: prime.quantite,
          })),
          paieretenue: payment.retenues.map(retenue => ({
            typesretenue: parseInt(retenue.typeRetenue.split('|')[0]),
            valeur: parseInt(retenue.valeur),
            valeurUnitaire: retenue.valeurUnitaire,
            montant: retenue.montant,
            quantite: retenue.quantite,
          })),
        }));

        console.log("Données envoyées:", values);
        const { data } = await ApiService.post("/processuspaies", values);
        if (data.code === 201) {
          success(data.message);
          router.push({ name: "ListeProcessus" });
        }
      } catch (err) {
        console.error("Erreur d'API:", err);
        error(err.response?.data?.message || "Une erreur est survenue.");
      }
    };*/

    const getAllIts = async () => {
  try {
    const response = await ApiService.get("/all/itss");
    const canalsData = response.data.data.data;
    itsBaremes.value = canalsData; // <-- très important !
    itsOptions.value = canalsData.map((its) => ({
      value: its.id,
      label: its.libelle,
    }));
  } catch (error) {
    // Gérer erreur
  }
};

const calculerITS = (salaire: number): number => {
  let totalITS = 0;

  const sortedBaremes = [...itsBaremes.value].sort((a, b) => a.plafondMin - b.plafondMin);

  for (const bareme of sortedBaremes) {
    const plafondMin = bareme.plafondMin;
    const plafondMax = bareme.plafondMax ?? Infinity;

    // Si le salaire est en dessous du début de cette tranche, on s’arrête
    if (salaire <= plafondMin) break;

    const trancheSuperieure = Math.min(salaire, plafondMax);
    const montantDansTranche = trancheSuperieure - plafondMin;

    if (montantDansTranche > 0) {
      const montantTranche = montantDansTranche * (bareme.taux / 100);
      totalITS += montantTranche;
      console.log(
        `Tranche: ${plafondMin} - ${plafondMax}, taux: ${bareme.taux}%, montant: ${montantTranche}`
      );
    }

    // Si le salaire est dans cette tranche, on arrête la boucle
    if (salaire <= plafondMax) break;
  }

  console.log("Total ITS:", totalITS);
  return Math.round(totalITS);
};

watch(montantITS, (value) => {
   // salaireNet();
  if (value > 0) {
    console.log(`Montant ITS calculé : ${value} FCFA`);
  }
});


    /*const add_Processus = async (values) => {
  if (!values || Object.keys(values).length === 0) {
    console.error("Erreur : L'objet 'values' est vide ou indéfini !");
    return;
  }

  try {
    // Supprimer l'ancien champ "payments" du formulaire s’il existe
    delete values.payments;

    // Remplir le vrai tableau à envoyer
    values.paiements = payments.map(payment => ({
      contrat: parseInt(payment.contrat),
      refPaie: payment.refPaie,
      datePaie: payment.datePaie,
      periode: payment.periode,
      modepaiement: parseInt(payment.modepaiement),
      salaireBrut: payment.salaireBrut,
      totalRetenues: payment.totalRetenues,
      totalPrimes: payment.totalPrimes,
      montantITS: payment.montantITS,
      salaireNet: payment.salaireNet,
      paieprime: payment.primes.map(prime => ({
        typeprime: parseInt(prime.typePrime.split('|')[0]),
        valeur: parseInt(prime.valeur),
        valeurUnitaire: prime.valeurUnitaire,
        montant: prime.montant,
        quantite: prime.quantite,
      })),
      paieretenue: payment.retenues.map(retenue => ({
        typesretenue: parseInt(retenue.typeRetenue.split('|')[0]),
        valeur: parseInt(retenue.valeur),
        valeurUnitaire: retenue.valeurUnitaire,
        montant: retenue.montant,
        quantite: retenue.quantite,
      })),
    }));

    console.log("Données envoyées:", values);
    const { data } = await ApiService.post("/processuspaies", values);
    if (data.code === 201) {
      success(data.message);
      router.push({ name: "ListeProcessus" });
    }
  } catch (err) {
    console.error("Erreur d'API:", err);
    error(err.response?.data?.message || "Une erreur est survenue.");
  }
};*/

const simulateProgress = async (total, updateCallback) => {
  for (let i = 1; i <= total; i++) {
    await new Promise(resolve => setTimeout(resolve, 100)); // délai simulé
    const progress = Math.round((i / total) * 100);
    updateCallback(progress);
  }
};

const add_Processus = async (values) => {
  if (!values || Object.keys(values).length === 0) {
    console.error("Erreur : L'objet 'values' est vide ou indéfini !");
    return;
  }

  try {
    delete values.payments;

    const totalPaiements = payments.length;
    let currentProgress = 0;

    Swal.fire({
      title: 'Génération en cours...',
      html: `<div id="progressText">Initialisation...</div><div class="progress" style="height: 20px;"><div id="progressBar" class="progress-bar bg-info" role="progressbar" style="width: 0%">0%</div></div>`,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
      }
    });
    values.paiements = payments.map(payment => ({
      contrat: parseInt(payment.contrat),
      refPaie: payment.refPaie,
      datePaie: payment.datePaie,
      periode: payment.periode,
      modepaiement: parseInt(payment.modepaiement),
      salaireBrut: payment.salaireBrut,
      totalRetenues: payment.totalRetenues,
      totalPrimes: payment.totalPrimes,
      montantITS: payment.montantITS,
      salaireNet: payment.salaireNet,
      paieprime: payment.primes.map(prime => ({
        typeprime: parseInt(prime.typePrime.split('|')[0]),
        valeur: parseInt(prime.valeur),
        valeurUnitaire: prime.valeurUnitaire,
        montant: prime.montant,
        quantite: prime.quantite,
      })),
      paieretenue: payment.retenues.map(retenue => ({
        typesretenue: parseInt(retenue.typeRetenue.split('|')[0]),
        valeur: parseInt(retenue.valeur),
        valeurUnitaire: retenue.valeurUnitaire,
        montant: retenue.montant,
        quantite: retenue.quantite,
      })),
    }));
    await simulateProgress(totalPaiements, (progress) => {
      const progressBar = document.getElementById("progressBar");
      const progressText = document.getElementById("progressText");
      if (progressBar && progressText) {
        progressBar.style.width = `${progress}%`;
        progressBar.innerText = `${progress}%`;
        progressText.innerHTML = `Génération de fichiers : ${progress}%`;
      }
    });
    console.log('processus',values);
    const { data } = await ApiService.post("/processuspaies", values);
    Swal.close();
    if (data.code === 201) {
      success(data.message); 
      router.push({ name: "ListeProcessus" });
    }
  } catch (err) {
    console.error("Erreur d'API:", err);
    Swal.close();
    error(err.response?.data?.message || "Une erreur est survenue.");
  }
};


    return {
      processusSchema,
      getCurrentDateTime,
      dateDebutProcessus,
      dateFinProcessus,
      processusForm,
      payments,
      contratOptions,
      typePrimeOptions,
      typeRetenueOptions,
      modeOptions,
      fetchPrimeRetenue,
      addPayment,
      removePayment,
      toggleAccordion,
      addRowPrime,
      removeRowPrime,
      addRowRetenue,
      removeRowRetenue,
      selectTypePrime,
      selectTypeRetenue,
      validateRowPrime,
      validateRowRetenue,
      add_Processus,
      minDate,
      maxDate,
      periodePaieDefault,
      updatePaymentPeriods,
         calculerITS,
       montantITS,
       formatDate,
       getAvailableContrats,
         getAvailableTypePrimes,
       getAvailableTypeRetenues,
       statutOptions 
    };
  },
});
</script>

<style scoped>
.accordion-button {
  cursor: pointer;
  flex-grow: 1;
  text-align: left;
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.justify-content-between {
  justify-content: space-between;
}

.ms-3 {
  margin-left: 1rem;
}

.btn-danger {
  /* Vous pouvez ajouter des styles supplémentaires ici si nécessaire */
}
.progress {
  background-color: #f5f5f5;
  border-radius: 5px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  transition: width 0.4s ease;
}

</style>