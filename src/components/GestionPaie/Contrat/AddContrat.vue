<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="contratForm" @submit="addContrat" :validation-schema="contratSchema">
              <div class="row">
              <div class="col-md-4 mb-3">
                    <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refContrat" class="form-control" type="text"/>
                    <ErrorMessage name="refContrat" class="text-danger" />
            </div>
           
            <div class="col-md-4  mb-3">
                    <label for="dateDebut" class="form-label"> Date de début<span class="text-danger">*</span></label>
                    <Field name="dateDebut"  class="form-control" type="Date"/>
                    <ErrorMessage name="dateDebut" class="text-danger" />
            </div>
           
            <div class="col-md-4 mb-3">
                    <label for="dateFin" class="form-label"> Date de fin<span class="text-danger">*</span></label>
                    <Field name="dateFin"  class="form-control" type="Date"/>
                    <ErrorMessage name="dateFin" class="text-danger" />
            </div>
            <div class="col-md-4 mb-3">
                    <label for="salaireDeBase" class="form-label">Salaire de base<span class="text-danger">*</span></label>
                    <Field name="salaireDeBase" class="form-control" type="text" v-model="salaireDeBase"/>
                    <ErrorMessage name="salaireDeBase" class="text-danger" />
            </div>
            <div class="col-md-4 mb-3">
                    <label for="heuresTravaillees" class="form-label">Heures travaillées<span class="text-danger">*</span></label>
                    <Field name="heuresTravaillees" class="form-control" type="number"/>
                    <ErrorMessage name="heuresTravaillees" class="text-danger" />
            </div>
  
            <div class="col-md-4 mb-3">
                    <label for="renouvelable" class="form-label">Renouvelable</label>
                    <Field name="renouvelable" class="form-control" type="text"/>
                    <ErrorMessage name="renouvelable" class="text-danger" />
         </div>

         <div class="col-md-4  mb-3">
                    <label for="periodeEssai" class="form-label"> Période d'Essai<span class="text-danger">*</span></label>
                    <Field name="periodeEssai"  class="form-control" type="Date"/>
                    <ErrorMessage name="periodeEssai" class="text-danger" />
         </div>
         <div class="col-md-4 mb-3">
                    <label for="periodePaie" class="form-label"> Période de Paie<span class="text-danger">*</span></label>
                    <Field name="periodePaie"  class="form-control" type="Date"/>
                    <ErrorMessage name="periodePaie" class="text-danger" />
         </div>

          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type Contrat <span class="text-danger">*</span>
              </label>
              <Field name="types" v-model="types" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="typeOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le type"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le type de contrat est obligatoire</span>
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
                  Ajouter des primes
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
                        Prime
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
                        <div class="border border-primary mb-5">
                          <div
                            class="row d-flex align-items-center justify-content-between fw-bold py-2"
                            style="background-color: #0a59a4"
                          >
                            <div class="col-md-4">
                              <h3 class="fs-4 text-white">Prime</h3>
                            </div>
                            <div class="col-md-4">
                              <h3 class="fs-4 text-white">Montant total : {{ montantTotal }}</h3>
                            </div>
                            <div class="col-md-4">
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
                                          :class="validateRowPrime(prime.valeurUnitaire) ? 'form-control is-invalid' : 'form-control'"
                                          placeholder=""
                                        />
                                        <span class="invalid-feedback" v-if="validateRowPrime(prime.valeurUnitaire)">
                                          La valeur unitaire est obligatoire.
                                        </span>
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
              <router-link to="/contrats/liste-contrats" 
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
  
  import { defineComponent, onMounted, ref, watch, reactive, computed} from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
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
            salaireDeBase: Yup.string().required("Le nom est obligatoire."),
            heuresTravaillees: Yup.number().typeError("veuillez entrer des nombres").required("Le cout d'aquisition est obligatoire."),
            dateDebut: Yup.date().typeError("veuillez entrer une date valide").required("La date de début est obligatoire."),
            dateFin: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            periodeEssai: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            periodePaie: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            renouvelable: Yup.string().notRequired(),
            types: Yup.string().required("Le type est obligatoire."),
      });
  
      onMounted(() => {
        getAllTypeContrat();
        getAllTypePrime();
      });
  
      const contratForm =  ref(null);
      const showMErr = ref(false);
      const types = ref();
      const typeOptions = ref([]);
      const typePrimeOptions = ref([]);
      const router = useRouter();
      const typePrimes = ref(null);
      const salaireDeBase = ref();

      const getAllTypeContrat = async () => {
        try{
        const response = await ApiService.get('/all/typeContrats');
        const typesData = response.data.data.data;

        typeOptions.value = typesData.map((type) => ({
          value: type.id,
          label: type.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
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

    // formulaire dynamique

    const isDisable = ref(true);

    const primes = reactive([
      {
        typePrime: "",
        montant: 0,
        valeurUnitaire: 0,
        quantite: 1,
        valeur: "",
      },
    ]);

    const addRowPrime = () => {
        primes.push({
          typePrime: '',
          montant: 0,
          valeurUnitaire: 0,
          quantite: 1,
          valeur: '',
        });
      };

    const removeRowPrime = (index) => {
      if (primes.length > 1) {
        primes.splice(index, 1);
      }
    };

    const validateRowPrime = (value) => {
      return !value || value <= 0;
    };

    const calculerMontantPrime = (prime) => {
      const salaireBase = parseInt(salaireDeBase.value) || 0;
      const valeur = parseInt(prime.valeur) || 0;
      
      if (prime.typePrime.includes('%')) {
        return salaireBase * valeur / 100;
      } else if (prime.typePrime.includes('Mt')) {
        return salaireBase + valeur;
      }
      
      return 0;
    };

    const updateAllMontants = () => {
      primes.forEach(prime => {
        prime.montant = calculerMontantPrime(prime);
      });
    };

    const montantTotal = computed(() => {
      return primes.reduce((total, prime) => total + calculerMontantPrime(prime), 0);
    });

    watch(salaireDeBase, () => {
      updateAllMontants();
    });

    watch(primes, () => {
      updateAllMontants();
    }, { deep: true });

    const selectTypePrime = (selectedTypePrime, prime) => {
      const [id, valeur, typeDeValeur] = selectedTypePrime.split('|');
      prime.valeur = valeur;
      prime.quantite = 1;
      updateAllMontants();
    };

    const addContrat = async (values: any, { resetForm }) => {
      values['types'] = types.value
      values.primes = primes.map(prime => ({
        typePrime: parseInt(prime.typePrime.split('|')[0]),
        valeur: prime.valeur,
        valeurUnitaire: prime.valeurUnitaire,
        montant: prime.montant,
        quantite: prime.quantite,
        }));
      console.log('Données envoyées', values)
        ApiService.post("/contrats", values)
           .then(({ data }) => {
             if (data.code == 201) {
              success(data.message);
               //resetForm();
             console.log('flefelef')
              router.push({ name: "ListeContrat" });
           }
           }).catch(({ response }) => {
            error(response.data.message);
          });
    };

    watch(
      primes,
      (newValue) => {
        isDisable.value = newValue.some(
          (prime) =>
            validateRowPrime(prime.typePrime) ||
            validateRowPrime(prime.montant) ||
            validateRowPrime(prime.valeurUnitaire) ||
            validateRowPrime(prime.quantite) ||
            validateRowPrime(prime.valeur)
        );
      },
      { deep: true }
    );
  
      return { contratSchema, addContrat, contratForm,
        typeOptions,showMErr,types,typePrimeOptions,
        typePrimes,
        selectTypePrime,
        removeRowPrime,
        addRowPrime,
        validateRowPrime,
        isDisable,primes,
        montantTotal,
        salaireDeBase,
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

.table thead th, .table tbody td {
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