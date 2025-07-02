<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="paieForm" @submit="addPaie" :validation-schema="paieSchema">
        <div class="row">
          <div class="col-md-8 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Contrat <span class="text-danger">*</span>
              </label>
              <Field name="contrat" v-slot="{ field }" v-model="newContrat">
                <Multiselect :options="contratOptions" :searchable="true" track-by="value" label="label"
                  v-model="field.value" v-bind="field" placeholder="Sélectionner le contrat" />
              </Field>
              <ErrorMessage name="contrat" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <label for="datePaie" class="form-label"> Date de Paie<span class="text-danger">*</span></label>
            <Field name="datePaie" class="form-control" type="Date" />
            <ErrorMessage name="datePaie" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3">
            <label for="periode" class="form-label">Période<span class="text-danger">*</span></label>
            <Field
              name="periode"
              class="form-control"
              type="month"
              id="periode"
              :min="minDate"
              :max="maxDate"
              v-model="periodeDefault"
            />
            <ErrorMessage name="periode" class="text-danger" />
          </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Mode de Paiement <span class="text-danger">*</span>
              </label>
              <Field name="modepaiement" v-model="modepaiement" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="modeOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le mode de paiement" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="modepaiement" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <label for="salaireBrut" class="form-label">Salaire Brut<span class="text-danger">*</span></label>
            <Field name="salaireBrut" class="form-control" type="number" id="salaireBrut" v-model="salaireDeBase" :readonly="true" />
            <ErrorMessage name="salaireBrut" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3">
            <label for="totalRetenues" class="form-label">Total des retenues<span class="text-danger">*</span></label>
            <Field name="totalRetenues" class="form-control" type="number" :readonly="true" v-model="totalRetenue" />
            <ErrorMessage name="totalRetenues" class="text-danger" />
            <!-- <div v-if="isRetenueOverLimit" class="retenue-error-message">
              <i class="fa fa-exclamation-circle me-2"></i>
              Attention : Le total des retenues dépasse 1/3 du salaire de base. Veuillez revoir les montants.
            </div> -->
          </div>
          <div class="col-md-4 mb-3">
            <label for="totalPrimes" class="form-label">Total des primes<span class="text-danger">*</span></label>
            <Field name="totalPrimes" class="form-control" type="number" :readonly="true" v-model="totalPrime" />
            <ErrorMessage name="totalPrimes" class="text-danger" />
          </div>
          <div class="col-md-4 mb-3">
            <label for="salaireNet" class="form-label">Salaire Net<span class="text-danger">*</span></label>
            <Field name="salaireNet" class="form-control" type="text" id="salaireNet" :readonly="true" v-model="salaireNet" />
            <ErrorMessage name="salaireNet" class="text-danger" />
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
                            <tr v-for="(prime, index) in primes" :key="index" class="prime-row">
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
                                  placeholder="Entrer la quantité" readonly />
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
                                  <button type="button" :disabled="primes[index].desactive"
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
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
                            <tr v-for="(retenue, index) in retenues" :key="index" class="retenue-row">
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
                                  placeholder="Entrer la quantité" readonly />
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
                                  <button type="button" :disabled="retenues[index].desactive"
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
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
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit" :disabled="isRetenueOverLimit">
                Ajouter une paie
              </button>
              <div class="me-3">
            <button id="generateBulletinBtn" class="btn btn-success" @click="generateBulletin">Générer Bulletin de Paie</button>
             </div>
              <router-link to="/paies/liste-paies" class="btn btn-danger">
                <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler
              </router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, computed, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { Paie } from '@/models/Paie';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import VueMultiselect from 'vue-multiselect';

// Interfaces pour typage
interface ContratOption {
  value: number;
  label: string;
}

interface ModeOption {
  value: number;
  label: string;
}

interface ProcessusOption {
  value: number;
  label: string;
}

interface Prime {
  typePrime: string;
  montant: number;
  valeurUnitaire: number;
  quantite: number;
  valeur: string;
  desactive: boolean;
}

interface Retenue {
  typeRetenue: string;
  montant: number;
  valeurUnitaire: number;
  quantite: number;
  valeur: string;
  desactive: boolean;
}

interface TypePrimeOption {
  value: string;
  label: string;
}

interface TypeRetenueOption {
  value: string;
  label: string;
}

interface Contrat {
  id: number;
  reference?: string;
  personnel?: { nom: string };
  typeContrat?: { libelle: string };
  datePriseFonction?: string;
  dateFin?: string;
  salaireBase?: number;
}

export default defineComponent({
  name: "AddPaie",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect
  },

  setup: () => {
    const paieSchema = Yup.object().shape({
      contrat: Yup.string().required("Le contrat est obligatoire."),
      salaireBrut: Yup.number().required("Le salaire brut est obligatoire."),
      totalRetenues: Yup.number().typeError("Veuillez entrer des nombres").required("Le total des retenues est obligatoire."),
      datePaie: Yup.date().typeError("Veuillez entrer une date valide").required("La date de paie est obligatoire."),
      modepaiement: Yup.string().required("Le mode de paiement est obligatoire."),
      periode: Yup.string()
        .matches(/^\d{4}-(0[1-9]|1[0-2])$/, "La période doit être au format YYYY-MM (ex: 2025-05)")
        .test('valid-year', value => {
          if (!value) return false;
          const year = parseInt(value.split('-')[0], 10);
          return year >= 2024 && year <= 2025;
        })
        .required("La période est obligatoire."),
    });

    onMounted(() => {
      getAllModePaiements();
      getAllTypePrime();
      getAllTypeRetenue();
      getAllContrats();
    });

    const lesContrats = ref<any>([]);
    const paieForm = ref(null);
    const showMErr = ref<boolean>(false);
    const modepaiement = ref<string | null>(null);
    const processuspaie = ref<string | null>(null);
    const modeOptions = ref<ModeOption[]>([]);
    const processusOptions = ref<ProcessusOption[]>([]);
    const contrat = ref<string | null>(null);
    const newContrat = ref<number | null>(null);
    const salaire = ref<number[]>([]);
    const contratOptions = ref<ContratOption[]>([]);
    const router = useRouter();
    const typePrimes = ref<TypePrimeOption[] | null>(null);
    const typePrimeOptions = ref<TypePrimeOption[]>([]);
    const typeRetenueOptions = ref<TypeRetenueOption[]>([]);
    const typeRetenues = ref<TypeRetenueOption[] | null>(null);

    // Fonction pour formater une date
    const formatDate = (dateString: string | undefined | null): string => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const getAllContrats = async () => {
      try {
        const response = await ApiService.get('/all/contrats');
        const contratsData: Contrat[] = response.data.data.data;
        lesContrats.value = contratsData;
        contratOptions.value = contratsData.map((contrat) => ({
          value: contrat.id,
          label: `${contrat?.reference || "N/A"} - ${contrat?.personnel?.nom || "N/A"}`,
        }));
      } catch (error) {
        console.error('Error fetching contrats:', error);
      }
    };

    const selectedContrat = ref<number | null>(null);

    const fetchPrimeRetenue = async (id: number) => {
      try {
        const response = await ApiService.get(`/prime/retenues/contrat/${id}`);
        const { primes: fetchedPrimes, retenues: fetchedRetenues } = response.data.data;
        await getContrat(id);
        primes.splice(0, primes.length);
        retenues.splice(0, retenues.length);

        fetchedPrimes.forEach((prime: any) => {
          const typePrimeString = `${prime.typeprime.id}|${prime.typeprime.valeur}|${prime.typeprime.typeDeValeur}`;
          primes.push({
            typePrime: typePrimeString,
            montant: prime.montant,
            valeurUnitaire: prime.valeurUnitaire,
            quantite: parseInt(prime.quantite),
            valeur: `${parseInt(prime.typeprime.valeur)}`,
            desactive: true,
          });
        });

        fetchedRetenues.forEach((retenue: any) => {
          const typeRetenueString = `${retenue.typesretenue.id}|${retenue.typesretenue.valeur}|${retenue.typesretenue.typeDeValeur}`;
          retenues.push({
            typeRetenue: typeRetenueString,
            montant: retenue.montant,
            valeurUnitaire: retenue.valeurUnitaire,
            quantite: retenue.quantite,
            valeur: `${parseInt(retenue.typesretenue.valeur)}`,
            desactive: true,
          });
        });
      } catch (error) {
        console.error('Error fetching primes and retenues:', error);
      }
    };

    const getContrat = async (id: number) => {
      try {
        const response = await ApiService.get(`/contrat/${id}`);
        const contratData: Contrat = response.data.data;
        salaireDeBase.value = contratData.salaireBase || 0;
      } catch (error) {
        console.error('Error fetching contrat:', error);
      }
    };

    const getAllTypePrime = async () => {
      try {
        const response = await ApiService.get('/all/typePrimes');
        const typePrimesData: any[] = response.data.data.data;
        typePrimeOptions.value = typePrimesData.map(typePrime => ({
          value: `${typePrime.id}|${typePrime.valeur}|${typePrime.typeDeValeur}`,
          label: typePrime.nomPrime,
        }));
        typePrimes.value = typePrimeOptions.value;
      } catch (error) {
        console.error('Error fetching type primes:', error);
      }
    };

    const getAllTypeRetenue = async () => {
      try {
        const response = await ApiService.get('/all/typeRetenues');
        const typeRetenuesData: any[] = response.data.data.data;
        typeRetenueOptions.value = typeRetenuesData.map(typeRetenue => ({
          value: `${typeRetenue.id}|${typeRetenue.valeur}|${typeRetenue.typeDeValeur}`,
          label: typeRetenue.nomRetenue,
        }));
        typeRetenues.value = typeRetenueOptions.value;
      } catch (error) {
        console.error('Error fetching type retenues:', error);
      }
    };

    const totalPrime = ref<number>(0);
    const totalRetenue = ref<number>(0);
    const salaireDeBase = ref<number>(0);
    const salaireNet = ref<number>(0);
    const isRetenueOverLimit = ref<boolean>(false);

    const totalPrimes = () => {
      totalPrime.value = 0;
      primes.forEach((prime: Prime) => {
        const montant = parseFloat(String(prime.montant)) || 0;
        totalPrime.value += montant;
      });
    };

    const totalRetenues = () => {
      totalRetenue.value = 0;
      retenues.forEach((retenue: Retenue) => {
        const montant = parseFloat(String(retenue.montant)) || 0;
        totalRetenue.value += montant;
      });
    };

    const totalsalaireNet = () => {
      const salaireBaseValue = parseFloat(String(salaireDeBase.value)) || 0;
      salaireNet.value = (totalPrime.value - totalRetenue.value) + salaireBaseValue;
    };

    const isDisable = ref<boolean>(true);
    const isDisablee = ref<boolean>(true);

    const today = new Date();
    const currentYear = today.getFullYear();
    const previousYear = currentYear - 1;

    const periodeDefault = ref<string>(`${currentYear}-${String(today.getMonth() + 1).padStart(2, '0')}`);

    const minDate = computed(() => `${previousYear}-01`);
    const maxDate = computed(() => `${currentYear}-12`);

    const primes = reactive<Prime[]>([
      {
        typePrime: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: "0",
        desactive: false,
      },
    ]);

    const retenues = reactive<Retenue[]>([
      {
        typeRetenue: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: "0",
        desactive: false,
      },
    ]);

    const addRowPrime = () => {
      primes.push({
        typePrime: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: "0",
        desactive: false,
      });
    };

    const addRowRetenue = () => {
      retenues.push({
        typeRetenue: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: "0",
        desactive: false,
      });
    };

    const removeRowPrime = (index: number) => {
      if (!primes[index].desactive && primes.length > 1) {
        primes.splice(index, 1);
      }
    };

    const removeRowRetenue = (index: number) => {
      if (!retenues[index].desactive && retenues.length > 1) {
        retenues.splice(index, 1);
      }
    };

    const validateRowPrime = (value: any) => {
      return !value || parseFloat(String(value)) <= 0;
    };

    const validateRowRetenue = (value: any) => {
      return !value || parseFloat(String(value)) <= 0;
    };

    const calculerMontant = (item: Prime | Retenue) => {
      const valeurUnitaire = parseFloat(String(item.valeurUnitaire)) || 1;
      const quantite = parseFloat(String(item.quantite)) || 0;
      return valeurUnitaire * quantite;
    };

    const updateAllMontants = () => {
      primes.forEach(prime => {
        prime.montant = calculerMontant(prime);
      });
      retenues.forEach(retenue => {
        retenue.montant = calculerMontant(retenue);
      });
      totalPrimes();
      totalRetenues();
      totalsalaireNet();
      checkRetenueLimit();
    };

    const updateValeurUnitaire = () => {
      const salaireBase = parseFloat(String(salaireDeBase.value)) || 1;

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

    watch(newContrat, (newValue: number | null) => {
      if (newValue) {
        selectedContrat.value = newValue;
        fetchPrimeRetenue(newValue);
        const count = lesContrats.value.find((el) => el.id === newValue);
        if (count) {
          salaireDeBase.value = parseFloat(String(count.salaireBase)) || 0;
        } else {
          console.warn('Aucun contrat trouvé avec cet ID');
          salaireDeBase.value = 0;
        }
      }
    });

    watch(salaireDeBase, () => {
      updateValeurUnitaire();
      updateAllMontants();
      totalsalaireNet();
    });

    watch(primes, () => {
      updateValeurUnitaire();
      updateAllMontants();
      totalPrimes();
      totalsalaireNet();
    }, { deep: true });

    watch(retenues, () => {
      updateValeurUnitaire();
      updateAllMontants();
      totalRetenues();
      totalsalaireNet();
    }, { deep: true });

    const selectTypePrime = (selectedTypePrime: string, prime: Prime) => {
      const [id, valeur, typeDeValeur] = selectedTypePrime.split('|');
      const valeurNum = parseFloat(valeur);
      prime.valeur = String(valeurNum);

      const salaireBase = parseFloat(String(salaireDeBase.value)) || 1;
      if (typeDeValeur.includes('%')) {
        prime.valeurUnitaire = salaireBase * valeurNum / 100;
      } else if (typeDeValeur.includes('MT')) {
        prime.valeurUnitaire = salaireBase + valeurNum;
      }
      prime.montant = calculerMontant(prime);
      updateAllMontants();
    };

    const selectTypeRetenue = (selectedTypeRetenue: string, retenue: Retenue) => {
      const [id, valeur, typeDeValeur] = selectedTypeRetenue.split('|');
      const valeurNum = parseFloat(valeur);
      retenue.valeur = String(valeurNum);

      const salaireBase = parseFloat(String(salaireDeBase.value)) || 1;
      if (typeDeValeur.includes('%')) {
        retenue.valeurUnitaire = salaireBase * valeurNum / 100;
      } else if (typeDeValeur.includes('MT')) {
        retenue.valeurUnitaire = salaireBase + valeurNum;
      }
      retenue.montant = calculerMontant(retenue);
      updateAllMontants();
    };

    watch(
      primes,
      (newValue: Prime[]) => {
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
      (newValue: Retenue[]) => {
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

    const checkRetenueLimit = () => {
      const salaireBaseValue = parseFloat(String(salaireDeBase.value)) || 0;
      const retenueLimit = salaireBaseValue / 3;
      isRetenueOverLimit.value = totalRetenue.value > retenueLimit;
      if (isRetenueOverLimit.value) {
        error(`Le total des retenues (${totalRetenue.value}) dépasse les 1/3 du salaire de base (${retenueLimit.toFixed(2)}). Veuillez revoir le montant des retenues.`);
      }
    };

    watch(totalRetenue, () => {
      checkRetenueLimit();
    });

    watch(salaireDeBase, () => {
      checkRetenueLimit();
    });

    const checkPaieUniqueness = async (contratId: number, periode: string): Promise<boolean> => {
      try {
        const response = await ApiService.get(`/gescom/paies/check-uniqueness?contrat=${contratId}&periode=${periode}`);
        return response.data.exists;
      } catch (err) {
        console.error('Error checking paie uniqueness:', err);
        error('Erreur lors de la vérification de l\'unicité de la paie.');
        return true;
      }
    };

    const addPaie = async (values: any, { resetForm }: { resetForm: () => void }) => {
      console.log('Selected Contract ID:', selectedContrat.value);
      console.log('Periode:', values.periode);
      if (isRetenueOverLimit.value) {
        error("Impossible d'ajouter la paie : le total des retenues dépasse 1/3 du salaire de base. Veuillez ajuster les retenues.");
        return;
      }
      try {
        const isPaieExists = await checkPaieUniqueness(selectedContrat.value!, values.periode);
        if (isPaieExists) {
          error("Une paie existe déjà pour ce contrat et cette période. Veuillez sélectionner une autre période ou contrat.");
          return;
        }
        values['modepaiement'] = modepaiement.value;
        values['processuspaie'] = processuspaie.value;
        values['contrat'] = selectedContrat.value;
        values.paieprime = primes.map(prime => ({
          typeprime: parseInt(prime.typePrime.split('|')[0]),
          valeur: parseInt(prime.valeur),
          valeurUnitaire: prime.valeurUnitaire,
          montant: prime.montant,
          quantite: prime.quantite,
        }));
        values.paieretenue = retenues.map(retenue => ({
          typesretenue: parseInt(retenue.typeRetenue.split('|')[0]),
          valeur: parseInt(retenue.valeur),
          valeurUnitaire: retenue.valeurUnitaire,
          montant: retenue.montant,
          quantite: retenue.quantite,
        }));
        console.log('Données envoyées', values);
        ApiService.post("/gescom/paies", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              router.push({ name: "ListePaie" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      } catch (error) {
        console.error('Error in addPaie:', error);
        error('Erreur lors de la vérification ou de l\'ajout de la paie. Vérifiez la connexion au serveur.');
      }
    };

    const getAllModePaiements = async () => {
      try {
        const response = await ApiService.get('/all/modepaiements');
        const modesData: any[] = response.data.data.data;
        modeOptions.value = modesData.map((mode) => ({
          value: mode.id,
          label: mode.libelle,
        }));
      } catch (error) {
        console.error('Error fetching mode paiements:', error);
      }
    };

 





    const generateBulletin = async () => {
  console.log('Début generateBulletin', {
    selectedContrat: selectedContrat.value,
    isRetenueOverLimit: isRetenueOverLimit.value,
  });

  if (isRetenueOverLimit.value) {
    error("Impossible de générer le bulletin : le total des retenues dépasse 1/3 du salaire de base.");
    return;
  }

  const contrat = lesContrats.value.find((c: Contrat) => c.id === selectedContrat.value);
  if (!contrat) {
    error("Erreur : Aucun contrat sélectionné ou contrat introuvable.");
    return;
  }

  const data = {
    nom: contrat.personnel?.nom || "Inconnu",
    matricule: contrat.reference || "N/A",
    poste: contrat.typeContrat?.libelle || "N/A",
    periode: periodeDefault.value,
    salaire_brut: salaireDeBase.value,
    total_gains: totalPrime.value + salaireDeBase.value,
    total_retenues: totalRetenue.value,
    net_a_payer: salaireNet.value,
    primes: primes.map(prime => ({
      type_prime: prime.typePrime?.split('|')[2] || "N/A",
      quantite_prime: prime.quantite,
      montant_prime: prime.montant,
    })),
    retenues: retenues.map(retenue => ({
      type_retenue: retenue.typeRetenue?.split('|')[2] || "N/A",
      quantite_retenue: retenue.quantite,
      montant_retenue: retenue.montant,
    })),
  };

  // Validation supplémentaire
  if (!data.periode || typeof data.periode !== 'string' || !/^\d{4}-\d{2}$/.test(data.periode)) {
    error("Erreur : Format de période invalide (attendu : YYYY-MM).");
    return;
  }
  if (typeof data.salaire_brut !== 'number' || data.salaire_brut <= 0) {
    error("Erreur : Salaire brut invalide.");
    return;
  }

  console.log('Données envoyées à l’API:', JSON.stringify(data, null, 2));

  try {
    console.log('Avant ApiService.post');
    const response = await ApiService.post('/generatePdf', {
      ...data,
      responseType: 'blob',
      headers: { Accept: 'application/pdf' },
    });
    console.log('Après ApiService.post, réponse:', response);

    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('application/pdf')) {
      throw new Error('La réponse de l’API n’est pas un fichier PDF valide.');
    }

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');

    success('Bulletin généré avec succès !');
  } catch (err) {
    console.error('Erreur détaillée:', {
      message: err.message,
      response: err.response ? {
        status: err.response.status,
        data: err.response.data,
      } : 'Aucune réponse disponible',
    });

    if (err.response?.data instanceof Blob) {
      const text = await err.response.data.text();
      console.error('Contenu de response.data:', text);
      try {
        const json = JSON.parse(text);
        console.error('Erreur JSON:', json);
      } catch (e) {
        console.error('Impossible de parser response.data en JSON:', e);
      }
    }

    if (err.response?.status === 400) {
      error('Erreur : Les données envoyées à l’API sont incorrectes.');
    } else if (err.response?.status === 500) {
      error('Erreur : Problème côté serveur lors de la génération du PDF. Consultez les logs serveur.');
    } else {
      error(`Erreur lors de la génération du bulletin : ${err.message}`);
    }
  }
};

    return {
      paieSchema,
      addPaie,
      paieForm,
      modeOptions,
      showMErr,
      modepaiement,
      typePrimeOptions,
      processuspaie,
      processusOptions,
      periodeDefault,
      minDate,
      maxDate,
      typePrimes,
      selectTypePrime,
      salaire,
      removeRowPrime,
      addRowPrime,
      validateRowPrime,
      isDisable,
      primes,
      salaireDeBase,
      typeRetenueOptions,
      typeRetenues,
      selectTypeRetenue,
      removeRowRetenue,
      addRowRetenue,
      validateRowRetenue,
      isDisablee,
      retenues,
      contratOptions,
      fetchPrimeRetenue,
      contrat,
      selectedContrat,
      salaireNet,
      totalRetenue,
      totalPrime,
      newContrat,
      isRetenueOverLimit,
      generateBulletin
    };
  },
});
</script>

<style scoped>
.retenue-error-message {
  font-size: 1.2rem;
  font-weight: bold;
  color: #d32f2f;
  background-color: #ffebee;
  border: 1.1px solid #ef5350;
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 8px;
  display: flex;
  align-items: center;
}
</style>