<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="processusForm" :validation-schema="processusSchema">
        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="dateProcessus" class="form-label">
              Date débit Processus<span class="text-danger">*</span></label
            >
            <Field name="dateProcessus" class="form-control" type="Date" />
            <ErrorMessage name="dateProcessus" class="text-danger" />
          </div>

          <div class="col-md-3 mb-3">
            <label for="dateProcessus" class="form-label">
              Date fin Processus<span class="text-danger">*</span></label
            >
            <Field name="dateFinProcessus" class="form-control" type="Date" />
            <ErrorMessage name="dateFinProcessus" class="text-danger" />
          </div>

          <div class="col-md-3 mb-3">
            <label for="periode" class="form-label">
              Période<span class="text-danger">*</span></label
            >
            <Field name="periode" class="form-control" type="Date" />
            <ErrorMessage name="periode" class="text-danger" />
          </div>

          <!-- Paie-->

          <button
            class="btn btn-primary transition border-0 pb-2 ps-8 pe-8 mb-3"
            @click.prevent="addPayment"
          >
            Ajouter un paiement
          </button>

          <div
            v-for="(payment, paymentIndex) in payments"
            :key="paymentIndex"
            class="accordion-item mt-3"
          >
          <div class="border border-secondary mb-5">
            <h2 class="accordion-header">
              <div
                class="d-flex align-items-center justify-content-between"
                
              >
                <button
                  class="accordion-button"
                  type="button"
                  @click="toggleAccordion(paymentIndex)"
                >
                  Paiement {{ paymentIndex + 1 }}
                  <i
                    :class="
                      payment.isOpen
                        ? 'fa fa-arrow-circle-up ms-2'
                        : 'fa fa-arrow-circle-down ms-2'
                    "
                  ></i>
                </button>

                <button
                  type="button"
                  class="btn btn-danger transition border-0 ms-3"
                  @click="removePayment(paymentIndex)"
                >
                  <i class="icofont icofont-ui-delete"></i>
                </button>
              </div>
            </h2>

            <div
              class="accordion-collapse collapse"
              :class="{ show: payment.isOpen }"
            >
              <div class="accordion-body">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label>Contrat <span class="text-danger">*</span></label>
                    <Multiselect
                      :options="contratOptions"
                      v-model="payment.contrat"
                      placeholder="Sélectionner le contrat"
                      @select="fetchPrimeRetenue(payment.contrat, payment)"
                    />
                  </div>

                  <div class="col-md-3 mb-3">
                    <label>Référence <span class="text-danger">*</span></label>
                    <input
                      v-model="payment.refPaie"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-3 mb-3">
                    <label
                      >Date de Paie <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="payment.datePaie"
                      type="date"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-3 mb-3">
                    <label>Période <span class="text-danger">*</span></label>
                    <input
                      v-model="payment.periode"
                      type="date"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-3 mb-3">
                    <label
                      >Mode de Paiement
                      <span class="text-danger">*</span></label
                    >
                    <Multiselect
                      :options="modeOptions"
                      v-model="payment.modes"
                      placeholder="Sélectionner le mode"
                    />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label
                      >Salaire Brut <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="payment.salaireBrut"
                      type="text"
                      class="form-control"
                      readonly
                    />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label
                      >Total des retenues
                      <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="payment.totalRetenues"
                      type="number"
                      class="form-control"
                      readonly
                    />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label
                      >Total des primes
                      <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="payment.totalPrimes"
                      type="number"
                      class="form-control"
                      readonly
                    />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label
                      >Salaire Net <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="payment.salaireNet"
                      type="text"
                      class="form-control"
                      readonly
                    />
                  </div>

                  <!-- Tableaux de primes et retenues -->
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active p-10"
                      id="home-tab-pane"
                      role="tabpanel"
                      tabindex="0"
                    >
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
                                  @click.prevent="addRowPrime(payment)"
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
                                <table
                                  class="table table-fixed text-nowrap align-middle mb-0"
                                >
                                  <thead>
                                    <tr>
                                      <th scope="col" class="prime">
                                        Type prime
                                      </th>
                                      <th scope="col" class="quantite">
                                        Valeur
                                      </th>
                                      <th scope="col" class="prix-unitaire">
                                        Quantité
                                      </th>
                                      <th scope="col">Valeur Unitaire</th>
                                      <th scope="col">Montant</th>
                                      <th scope="col">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(
                                        prime, primeIndex
                                      ) in payment.primes"
                                      :key="primeIndex"
                                    >
                                      <td class="typePrime-col">
                                        <Multiselect
                                          :options="typePrimeOptions"
                                          :searchable="true"
                                          track-by="label"
                                          label="label"
                                          v-model="prime.typePrime"
                                          placeholder=""
                                          @select="
                                            selectTypePrime(
                                              prime.typePrime,
                                              prime,
                                              payment
                                            )
                                          "
                                        />
                                        <span
                                          class="invalid-feedback"
                                          v-if="
                                            validateRowPrime(prime.typePrime)
                                          "
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
                                        />
                                        <span
                                          class="invalid-feedback"
                                          v-if="
                                            validateRowPrime(prime.quantite)
                                          "
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
                                        <div
                                          class="button-container"
                                          style="white-space: nowrap"
                                        >
                                          <button
                                            type="button"
                                            class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                            @click.prevent="
                                              removeRowPrime(
                                                payment,
                                                primeIndex
                                              )
                                            "
                                          >
                                            <i
                                              class="icofont icofont-ui-delete"
                                            ></i>
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
                    <div
                      class="tab-pane fade show active p-10"
                      id="home-tab-pane"
                      role="tabpanel"
                      tabindex="0"
                    >
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
                                  @click.prevent="addRowRetenue(payment)"
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
                                <table
                                  class="table table-fixed text-nowrap align-middle mb-0"
                                >
                                  <thead>
                                    <tr>
                                      <th scope="col" class="prime">
                                        Type retenue
                                      </th>
                                      <th scope="col" class="quantite">
                                        Valeur
                                      </th>
                                      <th scope="col" class="prix-unitaire">
                                        Quantité
                                      </th>
                                      <th scope="col">Valeur Unitaire</th>
                                      <th scope="col">Montant</th>
                                      <th scope="col">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(
                                        retenue, retenueIndex
                                      ) in payment.retenues"
                                      :key="retenueIndex"
                                    >
                                      <td class="typeRetenue-col">
                                        <Multiselect
                                          :options="typeRetenueOptions"
                                          :searchable="true"
                                          track-by="label"
                                          label="label"
                                          v-model="retenue.typeRetenue"
                                          placeholder=""
                                          @select="
                                            selectTypeRetenue(
                                              retenue.typeRetenue,
                                              retenue,
                                              payment
                                            )
                                          "
                                        />
                                        <span
                                          class="invalid-feedback"
                                          v-if="
                                            validateRowRetenue(
                                              retenue.typeRetenue
                                            )
                                          "
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
                                        />
                                        <span
                                          class="invalid-feedback"
                                          v-if="
                                            validateRowRetenue(retenue.quantite)
                                          "
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
                                        <div
                                          class="button-container"
                                          style="white-space: nowrap"
                                        >
                                          <button
                                            type="button"
                                            class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                            @click.prevent="
                                              removeRowRetenue(
                                                payment,
                                                retenueIndex
                                              )
                                            "
                                          >
                                            <i
                                              class="icofont icofont-ui-delete"
                                            ></i>
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

          <!-- Fin Paie-->

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                @click.prevent="addPaie"
              >
                Ajouter un processus
              </button>
              <router-link
                to="/processus/liste-processus"
                class="btn btn-danger"
                ><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
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
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  computed,
  watch,
} from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import axios from "axios";
import ApiService from "@/services/ApiService";
import { Processus } from "@/models/Processus";
import { error, success } from "@/utils/utils";
import { useRouter } from "vue-router";
import Multiselect from "@vueform/multiselect/src/Multiselect";
import VueMultiselect from "vue-multiselect";

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
    const processusSchema = Yup.object().shape({
      debutProcessus: Yup.date()
        .typeError("Entrer une date valide")
        .required("La date est obligatoire."),
      periode: Yup.date()
        .typeError("Entrer une date valide")
        .required("La période est obligatoire."),
      dateFinProcessus: Yup.date()
        .typeError("Entrer une date valide")
        .required("La période est obligatoire."),
    });

    const processusForm = ref(null);
    const router = useRouter();
    const contrat = ref();
    const contratOptions = ref([]);
    const typePrimes = ref(null);
    const typePrimeOptions = ref([]);
    const typeOptions = ref([]);
    const typeRetenueOptions = ref([]);
    const typeRetenues = ref(null);
    const prOptions = ref();
    const modeOptions = ref([]);
    const modes = ref();

    onMounted(() => {
      getAllModePaiements();
      getAllTypePrime();
      getAllTypeRetenue();
      getAllContrats();
    });

    const getAllContrats = async () => {
      try {
        const response = await ApiService.get("/all/contrats");
        const contratsData = response.data.data.data;
        console.log("Data", contratsData);
        contratOptions.value = contratsData.map((contrat) => ({
          value: contrat.id,
          label: contrat.salaireBase + "-" + contrat?.personnel?.nom,
        }));
      } catch (error) {
        console.error("Error fetching contrats:", error);
        // Gérer
      }
    };

    const selectedContrat = ref(null);

    const getAllTypePrime = async () => {
      try {
        const response = await ApiService.get("/all/typePrimes");
        const typePrimesData = response.data.data.data;
        console.log("Type prime", typePrimesData);
        typePrimeOptions.value = typePrimesData.map((typePrime) => ({
          value: `${typePrime.id}|${typePrime.valeur}|${typePrime.typeDeValeur}`,
          label: typePrime.nomPrime,
        }));
      } catch (error) {
        // H
      }
    };

    const getAllModePaiements = async () => {
      try {
        const response = await ApiService.get("/modepaiements");
        const modesData = response.data.data.data;
        modeOptions.value = modesData.map((mode) => ({
          value: mode.id,
          label: mode.libelle,
        }));
      } catch (error) {
        //error(response.data.message)
      }
    };

    const getAllTypeRetenue = async () => {
      try {
        const response = await ApiService.get("/all/typeRetenues");
        const typeRetenuesData = response.data.data.data;
        console.log("Type prime", typeRetenuesData);
        typeRetenueOptions.value = typeRetenuesData.map((typeRetenue) => ({
          value: `${typeRetenue.id}|${typeRetenue.valeur}|${typeRetenue.typeDeValeur}`,
          label: typeRetenue.nomRetenue,
        }));
      } catch (error) {
        // H
      }
    };

    // formulaire dynamique
    const totalPrime = ref(0);
    const totalRetenue = ref(0);
    const salaireDeBase = ref();
    const salaireNet = ref(0);

    // const totalPrimes = () => {
    //   totalPrime.value = 0;
    //   Object.keys(primes).forEach(function (key) {
    //     if (primes[key].montant != null) {
    //       totalPrime.value += parseInt(primes[key].montant);
    //     }
    //   });
    // };

    // const totalRetenues = () => {
    //   totalRetenue.value = 0;
    //   Object.keys(retenues).forEach(function (key) {
    //     if (primes[key].montant != null) {
    //       totalRetenue.value += parseInt(retenues[key].montant);
    //     }
    //   });
    // };

    // const totalsalaireNet = () => {
    //   salaireNet.value =
    //     totalPrime.value - totalRetenue.value + parseInt(salaireDeBase.value);
    // };

    const isDisable = ref(true);
    const isDisablee = ref(true);

    const validateRowPrime = (value) => {
      return !value || value <= 0;
    };

    const validateRowRetenue = (value) => {
      return !value || value <= 0;
    };

    const payments = reactive([
      {
        contrat: "",
        refPaie: "",
        datePaie: "",
        periode: "",
        modes: "",
        salaireBrut: "",
        totalRetenues: 0,
        totalPrimes: 0,
        salaireNet: 0,
        primes: [],
        retenues: [],
        isOpen: false,
      },
    ]);

    const fetchPrimeRetenue = async (contratId, payment) => {
      try {
        const response = await ApiService.get(
          `/prime/retenues/contrat/${contratId}`
        );
        const { primes: fetchedPrimes, retenues: fetchedRetenues } =
          response.data.data;
        getContrat(contratId);

        payment.primes.splice(0, payment.primes.length);
        payment.retenues.splice(0, payment.retenues.length);

        fetchedPrimes.forEach((prime) => {
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

        fetchedRetenues.forEach((retenue) => {
          const typeRetenueString = `${retenue.typeretenu.id}|${retenue.typeretenu.valeur}|${retenue.typeretenu.typeDeValeur}`;
          payment.retenues.push({
            typeRetenue: typeRetenueString,
            montant: retenue.montant,
            valeurUnitaire: retenue.valeurUnitaire,
            quantite: parseInt(retenue.quantite),
            valeur: `${parseInt(retenue.typeretenu.valeur)}`,
            desactive: true,
          });
        });

        updateAllMontants(payment);
      } catch (error) {
        console.error("Erreur lors de la récupération du contrat:", error);
      }
    };

    const getContrat = async (id) => {
      try {
        const response = await ApiService.get(`/contrat/${id}`);
        const contratData = response.data.data;
        console.log("Type prime", contratData);
        salaireDeBase.value = contratData.salaireBase;
      } catch (error) {
        // H
      }
    };

    const selectTypePrime = (selectedTypePrime, prime, payment) => {
      const [id, valeur, typeDeValeur] = selectedTypePrime.split("|");
      const valeurNum = parseFloat(valeur);
      prime.valeur = valeurNum;

      const salaireBase = parseFloat(payment.salaireBrut) || 1;

      if (typeDeValeur) {
        if (typeDeValeur.includes("%")) {
          prime.valeurUnitaire = (salaireBase * valeurNum) / 100;
        } else if (typeDeValeur.includes("MT")) {
          prime.valeurUnitaire = salaireBase + valeurNum;
        }
      } else {
        console.error("typeDeValeur is undefined");
      }

      prime.montant = calculerMontant(prime);
      updateAllMontants(payment);
    };

    const selectTypeRetenue = (selectedTypeRetenue, retenue, payment) => {
      const [id, valeur, typeDeValeur] = selectedTypeRetenue.split("|");
      const valeurNum = parseFloat(valeur);
      retenue.valeur = valeurNum;

      const salaireBase = parseFloat(payment.salaireBrut) || 1;

      if (typeDeValeur) {
        if (typeDeValeur.includes("%")) {
          retenue.valeurUnitaire = (salaireBase * valeurNum) / 100;
        } else if (typeDeValeur.includes("MT")) {
          retenue.valeurUnitaire = salaireBase + valeurNum;
        }
      } else {
        console.error("typeDeValeur is undefined");
      }

      retenue.montant = calculerMontant(retenue);
      updateAllMontants(payment);
    };

    const addPayment = () => {
      payments.push({
        contrat: "",
        refPaie: "",
        datePaie: "",
        periode: "",
        modes: "",
        salaireBrut: "",
        totalRetenues: 0,
        totalPrimes: 0,
        salaireNet: 0,
        primes: [],
        retenues: [],
        isOpen: false,
      });
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
      if (payment.primes.length > 1) {
        payment.primes.splice(index, 1);
      }
    };

    const removeRowRetenue = (payment, index) => {
      if (payment.retenues.length > 1) {
        payment.retenues.splice(index, 1);
      }
    };

    const removePayment = (index) => {
      if (payments.length > 1) {
        payments.splice(index, 1);
      }
    };

    const calculerMontant = (item) => {
      const valeurUnitaire = item.valeurUnitaire || 1;
      return valeurUnitaire * item.quantite;
    };

    const updateAllMontants = (payment) => {
      payment.primes.forEach((prime) => {
        prime.montant = calculerMontant(prime);
      });
      payment.retenues.forEach((retenue) => {
        retenue.montant = calculerMontant(retenue);
      });
      payment.totalPrimes = payment.primes.reduce(
        (acc, prime) => acc + prime.montant,
        0
      );
      payment.totalRetenues = payment.retenues.reduce(
        (acc, retenue) => acc + retenue.montant,
        0
      );
      payment.salaireNet =
        payment.salaireBrut - payment.totalRetenues + payment.totalPrimes;
    };

    const toggleAccordion = (index) => {
      payments[index].isOpen = !payments[index].isOpen;
    };

    watch(
      payments,
      (newPayments) => {
        newPayments.forEach((payment) => {
          updateAllMontants(payment);
        });
      },
      { deep: true }
    );

    const addPaie = async () => {
      try {
        const values = payments.map((payment) => ({
          contrat: payment.contrat,
          refPaie: payment.refPaie,
          datePaie: payment.datePaie,
          periode: payment.periode,
          modes: payment.modes,
          salaireBrut: payment.salaireBrut,
          totalRetenues: payment.totalRetenues,
          totalPrimes: payment.totalPrimes,
          salaireNet: payment.salaireNet,
          primes: payment.primes.map((prime) => ({
            typePrime: parseInt(prime.typePrime.split("|")[0]),
            valeur: parseInt(prime.valeur),
            valeurUnitaire: prime.valeurUnitaire,
            montant: prime.montant,
            quantite: prime.quantite,
          })),
          retenues: payment.retenues.map((retenue) => ({
            typeRetenue: parseInt(retenue.typeRetenue.split("|")[0]),
            valeur: parseInt(retenue.valeur),
            valeurUnitaire: retenue.valeurUnitaire,
            montant: retenue.montant,
            quantite: retenue.quantite,
          })),
        }));

        const response = await ApiService.post("/gescom/paies", values);
        if (response.data.code === 201) {
          console.log("Paiement ajouté avec succès");
          router.push({ name: "ListePrcessus" });
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du paiement", error);
      }
    };

    return {
      processusSchema,
      processusForm,

      //paie
      typePrimeOptions,
      typePrimes,
      selectTypePrime,
      removeRowPrime,
      addRowPrime,
      isDisable,
      salaireDeBase,
      typeRetenueOptions,
      typeRetenues,
      selectTypeRetenue,
      removeRowRetenue,
      addRowRetenue,
      isDisablee,
      fetchPrimeRetenue,
      prOptions,
      contrat,
      selectedContrat,
      salaireNet,
      totalRetenue,
      totalPrime,
      modes,
      modeOptions,
      payments,
      contratOptions,
      addPayment,
      removePayment,
      addPaie,
      toggleAccordion,
      validateRowPrime,
      validateRowRetenue,
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
  margin-left: 1rem; /* Ajustez l'espace entre le bouton "Supprimer" et le bouton d'accordéon */
}

.btn-danger {
  /* Vous pouvez ajouter des styles supplémentaires ici si nécessaire */
}
</style>
