<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="paieForm" @submit="addPaie" :validation-schema="paieSchema">
              <div class="row">

                <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Contrat <span class="text-danger">*</span>
              </label>
              <Field name="contrat" v-model="selectedContrat" >
              <Multiselect
                :options="contratOptions"
                :searchable="true"
                track-by="label"
                label="label"
                v-model="selectedContrat"
                placeholder="Sélectionner le contrat"
                @select="fetchPrimeRetenue(selectedContrat)"
              />
            </Field>

              <ErrorMessage name="contrat" class="text-danger" />
            </div>
          </div>

              <div class="col-md-4 mb-3">
                    <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refPaie" class="form-control" type="text"/>
                    <ErrorMessage name="refPaie" class="text-danger" />
            </div>
           
            <div class="col-md-4 mb-3">
                    <label for="datePaie" class="form-label"> Date de Paie<span class="text-danger">*</span></label>
                    <Field name="datePaie"  class="form-control" type="Date"/>
                    <ErrorMessage name="datePaie" class="text-danger" />
            </div>
            
         <div class="col-md-4 mb-3">
                    <label for="periode" class="form-label"> Période<span class="text-danger">*</span></label>
                    <Field name="periode"  class="form-control" type="Date"/>
                    <ErrorMessage name="periode" class="text-danger" />
         </div>
         
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Mode de Paiement <span class="text-danger">*</span>
              </label>
              <Field name="modes" v-model="modes" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="modeOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le mode"
                label="label" track-by="label" />
              </Field>
              <ErrorMessage name="modes" class="text-danger" />
            </div>
          </div>

          <div class="col-md-4 mb-3">
                    <label for="salaireBrut" class="form-label">Salaire Brut<span class="text-danger">*</span></label>
                    <Field name="salaireBrut" class="form-control" type="text" v-model="salaireDeBase" :readonly="true"/>
                    <ErrorMessage name="salaireBrut" class="text-danger" />
            </div>
            <div class="col-md-4 mb-3">
                    <label for="totalRetenues" class="form-label">Total des retenues<span class="text-danger">*</span></label>
                    <Field name="totalRetenues" class="form-control" type="number" :readonly="true" v-model="totalRetenue"/>
                    <ErrorMessage name="totalRetenues" class="text-danger" />
            </div>
            <div class="col-md-4 mb-3">
                    <label for="totalPrimes" class="form-label">Total des primes<span class="text-danger">*</span></label>
                    <Field name="totalPrimes" class="form-control" type="number" :readonly="true" v-model="totalPrime"/>
                    <ErrorMessage name="totalPrimes" class="text-danger" />
            </div>
            <div class="col-md-4 mb-3">
                    <label for="salaireNet" class="form-label">Salaire Net<span class="text-danger">*</span></label>
                    <Field name="salaireNet" class="form-control" type="text" :readonly="true" v-model="salaireNet"/>
                    <ErrorMessage name="salaireNet" class="text-danger" />
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
                    <h3 class="fs-4 text-white">Prime</h3>
                  </div>
                  <div class="col-md-3">
                    <div class="d-flex float-end">
                      <button
                        class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                        type="button"
                        :class="{ 'cursor-not-allowed': isDisable }"
                        :disabled="isDisable"
                        @click="addRowPrime"
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
                          <tr v-for="(prime, index) in primes" :key="index">
                            <td class="typePrime-col">
                              <Multiselect
                                :options="typePrimeOptions"
                                :searchable="true"
                                track-by="label"
                                label="label"
                                v-model="prime.typePrime"
                                placeholder=""
                                @select="selectTypePrime(prime.typePrime, prime)"
                              />
                              <span class="invalid-feedback" v-if="validateRowPrime(prime.typePrime)">
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
                                :class="validateRowPrime(prime.quantite) ? 'form-control is-invalid' : 'form-control'"
                                placeholder="Entrer la quantité"
                              />
                              <span class="invalid-feedback" v-if="validateRowPrime(prime.quantite)">
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
                                  :disabled="primes[index].desactive"
                                  class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                  @click="removeRowPrime(index)"
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
                        :class="{ 'cursor-not-allowed': isDisablee }"
                        :disabled="isDisablee"
                        @click="addRowRetenue"
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
                          <tr v-for="(retenue, index) in retenues" :key="index">
                            <td class="typeRetenue-col">
                              <Multiselect
                                :options="typeRetenueOptions"
                                :searchable="true"
                                track-by="label"
                                label="label"
                                v-model="retenue.typeRetenue"
                                placeholder=""
                                @select="selectTypeRetenue(retenue.typeRetenue, retenue)"
                              />
                              <span class="invalid-feedback" v-if="validateRowRetenue(retenue.typeRetenue)">
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
                                :class="validateRowRetenue(retenue.quantite) ? 'form-control is-invalid' : 'form-control'"
                                placeholder="Entrer la quantité"
                              />
                              <span class="invalid-feedback" v-if="validateRowRetenue(retenue.quantite)">
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
                                  :disabled="retenues[index].desactive"
                                  class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                  @click="removeRowRetenue(index)"
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

          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Ajouter une paie
              </button>
              <router-link to="/paies/liste-paies" 
              class=" btn btn-danger"><i
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
  
  import { defineComponent, onMounted, ref, reactive, computed, watch} from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import axios from 'axios';
  import ApiService from '@/services/ApiService';
  import { Paie } from '@/models/Paie';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'
  
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
            refPaie: Yup.string().required("La référence est obligatoire."),
            salaireBrut: Yup.number().typeError("veuillez entrer des nombres").required("Le nom est obligatoire."),
            totalRetenues: Yup.number().typeError("veuillez entrer des nombres").required("Le cout d'aquisition est obligatoire."),
            datePaie: Yup.date().typeError("veuillez entrer une date valide").required("La date de début est obligatoire."),
            // dateFin: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            // periodeEssai: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            // periodePaie: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            renouvelable: Yup.string().notRequired(),
            modes: Yup.string().required("Le type est obligatoire."),
      });
  
      onMounted(() => {
        getAllModePaiements();
        getAllTypePrime();
        getAllTypeRetenue();
        getAllContrats();
      });
  
      const paieForm =  ref(null);
      const showMErr = ref(false);
      const modes = ref();
      const modeOptions = ref([]);
      const contrat = ref();
      
      const contratOptions = ref([]);
      const router = useRouter();
      const typePrimes = ref(null);
      const typePrimeOptions = ref([]);
      const typeOptions = ref([]);
      const typeRetenueOptions = ref([]);
      const typeRetenues = ref(null);
      const prOptions = ref();
      const getAllContrats = async () => {
      try {
        const response = await ApiService.get('/contrats');
        const contratsData = response.data.data.data;
        console.log('Data', contratsData);
        contratOptions.value = contratsData.map((contrat) => ({
          value: contrat.id,
          label: contrat.refContrat,
        }));
      } catch (error) {
        console.error('Error fetching contrats:', error);
        // Gérer 
      }
    };

      const selectedContrat = ref(null);

      const fetchPrimeRetenue = async (id) => {
        console.log("ID passé à fetchPrimeRetenue:", id);
      try {
        const response = await ApiService.get(`/prime/retenues/contrat/${id}`);
        const { primes: fetchedPrimes, retenues: fetchedRetenues } = response.data.data;
        getContrat(id);
        primes.splice(0, primes.length); 
        retenues.splice(0, retenues.length); 

        fetchedPrimes.forEach(prime => {
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

        fetchedRetenues.forEach(retenue => {
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

    const getContrat = async(id) =>
    {
      try {
        const response = await ApiService.get(`/contrat/${id}`);
        const contratData = response.data.data;
        console.log('Type prime', contratData)
        salaireDeBase.value = contratData.salaireBase
      } catch (error) {
        // H
      }
    }

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

    
      // formulaire dynamique
      const totalPrime = ref(0);
      const totalRetenue = ref(0);
      const salaireDeBase = ref();
      const salaireNet = ref(0);

      const totalPrimes=()=>{
        totalPrime.value=0;
      Object.keys(primes).forEach(function (key)
      {
            if (primes[key].montant !=null ) {
              totalPrime.value += parseInt(primes[key].montant)
            }
        });
      }

      const totalRetenues=()=>{
        totalRetenue.value=0;
      Object.keys(retenues).forEach(function (key)
      {
            if (primes[key].montant !=null ) {
              totalRetenue.value += parseInt(retenues[key].montant)
            }
        });
      }

      const totalsalaireNet=()=>{
        salaireNet.value=(totalPrime.value - totalRetenue.value) + parseInt(salaireDeBase.value);

      }

    const isDisable = ref(true);
    const isDisablee = ref(true);

    const primes = reactive([
  {
    typePrime: "",
    montant: 0,
    valeurUnitaire: 0,
    quantite: 1,
    valeur: "0",
    desactive: false,
  },
]);

const retenues = reactive([
  {
    typeRetenue:"",
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

  const removeRowPrime = (index) => {
    if (!primes[index].desactive && primes.length > 1) {
      primes.splice(index, 1);
    }
  };

  const removeRowRetenue = (index) => {
    if (!retenues[index].desactive && retenues.length > 1) {
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
  totalPrimes();
  totalRetenues();
  totalsalaireNet();
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

const selectTypePrime = (selectedTypePrime, prime) => {
  const [id, valeur, typeDeValeur] = selectedTypePrime.split('|');
  const valeurNum = parseFloat(valeur);
  prime.valeur = valeurNum;

  const salaireBase = parseFloat(salaireDeBase.value) || 1;

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
  updateAllMontants();
};

const selectTypeRetenue = (selectedTypeRetenue, retenue) => {
  const [id, valeur, typeDeValeur] = selectedTypeRetenue.split('|');
  const valeurNum = parseFloat(valeur); 
  retenue.valeur = valeurNum;

  const salaireBase = parseFloat(salaireDeBase.value) || 1;

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
  updateAllMontants();
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


      const addPaie = async (values: any, { resetForm }) => {
      values['modes'] = modes.value;
      values['contrat'] = selectedContrat.value;
      values.paieprime = primes.map(prime => ({
        typeprime: parseInt(prime.typePrime.split('|')[0]),
      valeur: parseInt(prime.valeur),
      valeurUnitaire: prime.valeurUnitaire,
      montant: prime.montant,
      quantite: (prime.quantite),
    }));

    values.paieretenue = retenues.map(retenue => ({
      typesretenue: parseInt(retenue.typeRetenue.split('|')[0]),
      valeur: parseInt(retenue.valeur),
      valeurUnitaire: (retenue.valeurUnitaire),
      montant: retenue.montant,
      quantite: retenue.quantite,
    }));

        console.log('Données envoyées', values)
          ApiService.post("/gescom/paies", values)
            .then(({ data }) => {
              if (data.code == 201) {
                success(data.message);
                //resetForm();
              console.log('flefelef')
                router.push({ name: "ListePaie" });
            }
            }).catch(({ response }) => {
              error(response.data.message);
            });
      };

      const getAllModePaiements = async () => {
        try{
        const response = await ApiService.get('/modepaiements');
        const modesData = response.data.data.data;
        modeOptions.value = modesData.map((mode) => ({
          value: mode.id,
          label: mode.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
  
      return { paieSchema, addPaie, paieForm,modeOptions,showMErr,modes,
        typePrimeOptions,
        typePrimes,
        selectTypePrime,
        removeRowPrime,
        addRowPrime,
        validateRowPrime,
        isDisable,primes,
        salaireDeBase,
        typeRetenueOptions,
        typeRetenues,
        selectTypeRetenue,
        removeRowRetenue,
        addRowRetenue,
        validateRowRetenue,
        isDisablee,retenues,
        contratOptions,
        fetchPrimeRetenue,
        prOptions,contrat,
        selectedContrat,
        salaireNet,
        totalRetenue,
        totalPrime,
      };
    },
  });
  </script>