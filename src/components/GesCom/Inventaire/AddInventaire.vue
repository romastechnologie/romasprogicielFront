<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        @submit="addInventaire"
        :validation-schema="inventaireSchema"
        :keep-values="valuess">
          <div class="row">
            <div class="col-md-4">
                <div class="form-group mb-3">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de début <span class="text-danger">*</span>
                  </label>
                  <Field name="dateDebut" type="datetime-local" :value="getCurrentDateTime()"
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateDebut" class="text-danger"/>
              </div>
              <div class="col-md-4">
                <div class="form-group mb-3">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de fin <span class="text-danger">*</span>
                  </label>
                  <Field name="dateFin" type="datetime-local" :value="getCurrentDateTime()"
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
                <ErrorMessage name="dateFin" class="text-danger"/>
              </div>
              <!-- <div class="col-md-4 mb-5">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Personnes concernées <span class="text-danger">*</span>
                  </label>
                  <Field  name="personnel"  v-slot="{ field }">
                    <Multiselect
                      :options="personneOptions"
                      :searchable="true"
                      multiple="true"
                      mode="tags"
                      track-by="label"
                      label="label"
                      v-model = "field.value"
                      v-bind = "field"
                      placeholder="Sélectionnez les personnes"
                    />
                  </Field>  
                  <ErrorMessage name="personnel" class="text-danger"/>
                </div>
              </div> -->
            <div class="col-md-4 mb-3">
              <div class="form-group">
                <label class="d-block text-black fw-semibold mb-10">
                    Magasin <span class="text-danger">*</span>
                </label>
                <Multiselect
                  :options="magasinOptions"
                  :searchable="true"
                  track-by="label"
                  label="label"
                  v-model="magasin"
                  placeholder="Sélectionner le magasin"
                  @select="selectMag(magasin)"
                />
              </div>
            </div>
            <div class="col-md-12 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold mb-10">
                Motif
              </label>
              <Field
                name="motif"
                as="textarea"
                cols="15"
                rows="1"
                placeholder="Entrer le motif"
                v-slot="{ field }"
                class="form-control shadow-none rounded-0 text-black">
                <textarea class="form-control shadow-none rounded-0 text-black" cols="1"
                  v-model="field.value"
                ></textarea>
              </Field>
              <ErrorMessage name="motif" class="text-danger" />
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
                          Equipes de l'inventaire
                        </h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" :class="{ 'cursor-not-allowed': isDisables }" :disabled="isDisables"
                            @click="addRowEquipe()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                            Ajouter une equipe
                          </button>
                          <router-link to="/liste-mouvements"></router-link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="row d-flex align-items-center justify-content-between mt-10">
                        <!-- <div class="col-md-3">
                          <label class="d-block text-black fw-semibold">
                            Nom Complet
                            <span class="text-danger">*</span>
                          </label>
                        </div> -->
                        
                        <div class="col-md-3">
                    <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                      Personnels <span class="text-danger">*</span>
                      </label>  
                      </div>
                    </div>
                    <div class="col-md-3">
                          <label class="d-block text-black fw-semibold mb-10">
                            Role<span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold mb-10">
                            Actions
                          </label>
                        </div>
                      </div>
                      <hr class="mt-0" />
                      <div class="row" v-for="(equipe, index) in equipes" :key="index">
                        <!-- <div class="col-md-3 mb-2">
                          <div class="form-group ">
                            <input v-model="equipe.nomComplet" type="text" class="form-control shadow-none fs-md-15 text-black"
                              placeholder="Saisir le nomComplet" />
                            <div class="invalid-feedback" v-if="valideteRowEquipe(equipe.nomComplet)">
                              Le nomComplet est obligatoire.
                            </div>
                          </div>
                        </div> -->
                        <div class="col-md-4 mb-2">
                          <div class="form-group ">
                          <Multiselect 
                          :options="personnelOptions" 
                          :searchable="true" 
                          :multiple="false"
                          v-model="equipe.personnel"
                          placeholder="Sélectionner le personnel"/>
                        <span class="invalid-feedback" v-if="valideteRowEquipe(equipe.personnel)"></span>
                          </div>
                        </div>
                        <div class="col-md-3 mb-2">
                          <div class="form-group ">
                            <Multiselect 
                            :options="roleOptions" 
                            :searchable="true" 
                            :multiple="false"
                            v-model="equipe.role"
                            placeholder="Choisir le role"/>
                            <span class="invalid-feedback" v-if="valideteRowEquipe(equipe.role)"></span>
                          </div>
                        </div>
                        <div class="col-md-3 mb-2">
                            <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                            @click="removeRowEquipe(index)">
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
            <!-- <div class="accordion" id="basicAccordion">
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
                    Approvisionner les magasins en produit
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
                        ></button>
                      </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade show active p-10"
                        id="home-tab-pane"
                        role="tabpanel"
                        tabindex="0"
                      > -->
                        <div class="row">
                          <div class="border border-primary mb-10">
                            <div class="row d-flex align-items-center justify-content-between fw-bold py-2 bg-primary">
                              <div class="col-md-7">
                                <h4 class="fs-4 text-white">Magasins</h4>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': isDisable }"
                                    :disabled="isDisable"
                                    @click="addRowProduit()">
                                    <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i
                                    >Ajouter un produit
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="row">
                                <!-- Produit -->
                                <div class="row mt-10">
                                  <div class="col-md-3">
                                    <label
                                      class="d-block text-black fw-semibold">
                                      Produit
                                      <span class="text-danger">*</span>
                                    </label>
                                  </div>
                                  <div class="col-md-2">
                                    <label class="d-block text-black fw-semibold mb-10" >
                                      Stock Logique
                                    </label>
                                  </div>
                                  <div class="col-md-2">
                                    <label  class="d-block text-black fw-semibold mb-10" >
                                      Stock Fiche
                                    </label>
                                  </div>
                                  <div class="col-md-2">
                                    <label  class="d-block text-black fw-semibold mb-10">Stock Mag
                                    </label>
                                  </div>
                                  <div class="col-md-1">
                                    <label
                                      class="d-block text-black fw-semibold mb-10" :readOnly="true">Ecart Reel
                                    </label>
                                  </div>
                                  <div class="col-md-1">
                                    <label
                                      class="d-block text-black fw-semibold mb-10" :readOnly="true">Ecart Log
                                    </label>
                                  </div>
                                  <div class="col-md-1">
                                    <label class="d-block text-black fw-semibold mb-10">
                                      Action
                                    </label>
                                  </div>
                                  <hr class="mt-0" />
                                </div>
                                <div
                                  class="row gx-2 gy-0" v-for="(produit, produitIndex) in produits" :key="produitIndex">
                                    <div class="col-md-3 mb-2">
                                      <div class="form-group ">
                                        <Multiselect
                                          :options="produitOptions"
                                          :searchable="true"
                                          track-by="label"
                                          label="label"
                                          :disabled="isDis"
                                          v-model="produit.produit"
                                          placeholder="Sélectionner le produit"
                                          @select="selectProd(produit.produit, produit)"
                                        />
                                        <div
                                          class="invalid-feedback"
                                          v-if="
                                            validateRowProduit(produit.produit)" >
                                          Le produit est obligatoire.
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-2 mb-2">
                                      <div
                                        class="form-group ">
                                        <input
                                          type="number"
                                          v-model="produit.qtiteLogique"
                                          :class="
                                            validateRowProduit(produit.qtiteLogique)
                                              ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                              : 'form-control shadow-none fs-md-15 text-black '
                                          "
                                          placeholder="Entrer la quantité"
                                        />
                                        <div
                                          v-if="validateRowProduit(produit.qtiteLogique)"
                                          class="invalid-feedback">
                                          La quantité est obligatoire.
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-2 mb-2">
                                      <div
                                        class="form-group "
                                      >
                                        <input
                                          v-model="produit.qtiteFiche"
                                          type="number"
                                          :class="
                                            validateRowProduit(produit.qtiteFiche)
                                              ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                              : 'form-control shadow-none fs-md-15 text-black '
                                          "
                                          placeholder="Entrer la quantité"/>
                                        <div
                                          v-if="validateRowProduit(produit.qtiteFiche)"
                                          class="invalid-feedback">
                                          La quantité est obligatoire.
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-2 mb-2">
                                      <div
                                        class="form-group "
                                      >
                                        <input
                                          v-model="produit.qtitePhysique"
                                          type="number"
                                          :class="
                                            validateRowProduit(produit.qtitePhysique)
                                              ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                              : 'form-control shadow-none fs-md-15 text-black '
                                          "
                                          placeholder="Entrer la quantité"/>
                                        <div
                                          v-if="validateRowProduit(produit.qtitePhysique)"
                                          class="invalid-feedback">
                                          La quantité est obligatoire.
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-1 mb-2">
                                      <div class="form-group ">
                                        <input
                                          v-model="produit.ecartReel"
                                          :readonly="true"
                                          type="number" 
                                          :class="
                                            validateRowProduit(produit.ecartReel)
                                              ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                              : 'form-control shadow-none fs-md-15 text-black '
                                          "
                                          placeholder="Entrer l'écart"
                                        />
                                        <div
                                          v-if="validateRowProduit(produit.ecartReel)"
                                          class="invalid-feedback"
                                        >
                                          L'écart est obligatoire.
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-1">
                                      <div class="form-group mb-2">
                                        <input
                                          v-model="produit.ecartLogique"
                                          :readonly="true"
                                          type="number" 
                                          :class="
                                            validateRowProduit(produit.ecartLogique)
                                              ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                              : 'form-control shadow-none fs-md-15 text-black '
                                          "
                                          placeholder="Entrer l'écart"
                                        />
                                        <div
                                          v-if="validateRowProduit(produit.ecartLogique)"
                                          class="invalid-feedback"
                                        >
                                          L'écart est obligatoire.
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-1 mb-2">
                                      <button
                                        class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                        type="button"
                                        @click="removeRowProduit(produitIndex)">
                                        <i
                                          class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                                        ></i>
                                      </button>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    <!--</div>
                 </div>
                </div>
                </div>
            </div>
          </div> -->
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-success me-3"
                type="submit"
                :disabled="isDisable"
                :class="{ 'cursor-not-allowed': isDisable }">
                Ajouter un inventaire
              </button>
              <router-link
                to="/inventaires/liste-inventaires"
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
import { defineComponent, ref, watch, onMounted, reactive } from "vue";
import { Form, Field, ErrorMessage, useFieldArray } from "vee-validate";
import { error, success } from "@/utils/utils";
import { useRouter } from "vue-router";
import ApiService from "@/services/ApiService";
import {
  Inventaire,
  InventaireDepot,
} from "@/models/Inventaire";
import { Produit, ProduitDepot   } from "@/models/Produit";
import { MagasinDepot } from "@/models/Magasin";
import * as Yup from "yup";
import axios from "axios";
import Multiselect from "@vueform/multiselect";

export default defineComponent({
  name: "AddInventaire",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup: () => {
    const inventaireSchema = Yup.object().shape({
      dateDebut: Yup.date().typeError('Entrer une date valide').required('La date de debut est obligatoire'),
      dateFin: Yup.string().typeError('Entrer une date valide').required('La date de fin est obligatoire'),
      motif: Yup.string().notRequired(),
    });

    const inventaireForm = ref<Inventaire | null>(null);
    const router = useRouter();
    const clientOptions = ref([]);
    const magasinOptions = ref([]);
    const produitOptions = ref([]);
    const personneOptions = ref([]);
    const magasin = ref();

    // formulaire dynamique start
    const isDisable = ref(true);
    // const magasins = reactive([
    //   {
    //     magasin: '',
    //     produits: [
    //       {
    //         produit: '',
    //         qtitePhysique: 0,
    //         qtiteLogique: 0,
    //         ecart: 0,
    //       },
    //     ],
    //   },
    // ]);

    const produits = reactive([
      {
        produit: '',
        qtitePhysique: 0,
        qtiteLogique: 0,
        qtiteFiche:0,
        ecartLogique: 0,
        ecartReel:0,
      },
    ]);

// const addRowMagasin = () => {
//   magasins.push({
//     magasin: '',
//     produits: [
//       {
//         produit: '',
//         qtitePhysique: 0,
//         qtiteLogique: 0,
//         ecart: 0,
//       },
//     ],
//   });
// };

// const addRowProduit = () => {
//   magasins[magasinIndex].produits.push({
//     produit: '',
//     qtitePhysique: 0,
//     qtiteLogique: 0,
//     ecart: 0,
//   });
// };

const addRowProduit = () => {
  produits.push({
    produit: '',
    qtitePhysique: 0,
    qtiteLogique: 0,
    qtiteFiche:0,
    ecartReel:0,
    ecartLogique: 0,
  });
};


// const removeRowMagasin = (index) => {
//   magasins.splice(index, 1);
// };

// const removeRowProduit = (magasinIndex, produitIndex) => {
//   magasins[magasinIndex].produits.splice(produitIndex, 1);
// };

const removeRowProduit = ( produitIndex) => {
  produits.splice(produitIndex, 1);
};

const selectMag = (selectedMagasin) => {
  fetchProduits(selectedMagasin.split("|")[0]);
  if(selectedMagasin.split("|")[0]){
    isDis.value=false;
  }else{
    isDis.value=true;
  }
};

const selectProd = (selectedProduit, produit) => {
  produit.produit = selectedProduit;
  //produit.qtitePhysique = 0;
  // produit.qtiteLogique = selectedProduit.split("|")[2];
  //produit.qtiteLogique = parseFloat(selectedProduit.split("|")[2]);
  // produit.ecart = produit.qtiteLogique - produit.qtitePhysique;
  calculEcart(produit);
};

const calculEcart = (produit) => {
    produit.ecartLogique = produit.qtiteLogique - produit.qtitePhysique;
    produit.ecartReel = produit.qtiteFiche - produit.qtitePhysique;
};
// watch(
//   () => magasins,
//   (newMagasins) => {
//     newMagasins.forEach(magasin => {
//       magasin.produits.forEach(produit => {
//         calculEcart(produit);
//       });
//     });
//   },
//   { deep: true }
// );

watch(
  () => produits,
  (newProduits) => {
    newProduits.forEach(produit => {
        calculEcart(produit);
      });
  },
  { deep: true }
);


const fetchPersonnes = async () => {
      try {
        const response = await ApiService.get('all/personnels');
        const personneData = response.data.data.data;
        personneOptions.value = personneData.map((personnels) => ({
          value: personnels.id,
          label: `${personnels.nom}`,
        }));
      } catch (error) {
        //
      }
    };

const validateRowProduit = (e) => {
  return e === '' || e == null || e < 0;
};

//     watch(
//   magasins,
//   (newValue) => {
//     isDisable.value = newValue.some(
//       (magasin) =>
//         magasin.magasin === '' ||
//         magasin.produits.some(
//           (produit) =>
//             produit.produit === '' ||
//             produit.qtitePhysique === 0 ||
//             produit.qtitePhysique < 0 ||
//             produit.qtiteLogique === 0 ||
//             produit.ecart === 0
//         )
//     );
//   },
//   { deep: true }
// );

watch(
  produits,
  (newValue) => {
    isDisable.value =newValue.some(
      (produit) =>
        produit.produit === '' 
        //  produit.qtiteFiche >= 0 ||
        //  produit.qtitePhysique >= 0 ||
        //  produit.qtiteLogique >= 0 
    );
  },
  { deep: true }
);


    onMounted(() => {
      fetchMagasins();
      fetchClient();
      fetchPersonnes();
      getAllRoles();
      getAllPersonnels()
    });

    const equipeForm = ref(null);
    
    const roleOptions=ref([]);
    
    const personnelOptions = ref();

    const isDisables = ref(true);
    const isDis =  ref(true);
    
    isDis.value = (magasin.value)? false:true;
    const equipes = reactive([{
      //nomComplet: "",
      role: "",
      personnel: ""
    }]);

    const addRowEquipe = () => {
      equipes.push({
       // nomComplet: "",
        role: "",
        personnel:""
      });
    };

    const removeRowEquipe = (index) => {
      if (equipes.length > 1) equipes.splice(index, 1);
      //totals();
    };

    watch(
      equipes,
      (newValue) => {
        isDisables.value =
        newValue.some(
          (equipe) =>
          valideteRowEquipe(equipe.role) ||
          valideteRowEquipe(equipe.personnel)
        );
      },
      { deep: true }
    );

    const valideteRowEquipe = (e) => {
      if (e == "" || e == "" || e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

    const getAllPersonnels = async () => {
      try{
      const response = await ApiService.get('/all/personnels');
      const canalsData = response.data.data.data;
      console.log('DataDataData',canalsData)
      personnelOptions.value = canalsData.map((personnel) => ({
        value:personnel.id,
        label:personnel.nom + " " + personnel.prenom ,
      }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    const getAllRoles = async () => {
      try{
      const response = await ApiService.get('/roles');
      const rolesData = response.data.data;
      console.log('Data',rolesData)
      roleOptions.value = rolesData.map((role) => ({
        value:role.id,
        label:role.nom,
      }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    const magasinsss: any = ref(null);
    const produitsss: any = ref(null);
    const valuess = ref();

    const fetchMagasins = async () => {
      try {
        const response = await axios.get("all/magasins");
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

    const fetchProduits = async (magasin) => {
      try {
        const response = await axios.get("all/produitconditionnementmagasins/"+magasin);
       
        const produitsData = response.data.data;
        console.log(produitsData,"produitsDataproduitsDataproduitsDataproduitsData");
        produitOptions.value = produitsData.map((produit) => ({
          value: produit.id + "|" + `${produit.produitcondi.produit.refProd} - ${produit.produitcondi.produit.nomProd} [${produit.produitcondi.conditionnement.libelle}]` + "|" + produit.qtiteLogique,
          label: `${produit.produitcondi.produit.refProd} - ${produit.produitcondi.produit.nomProd} [${produit.produitcondi.conditionnement.libelle}]`,
        }));
        console.log(produitOptions.value,"response.data.data");
      } catch (error) {
        //
        console.log(error,"errorerrorerror")
      }
    };

    // const getCurrentDate = () => {
    //   const today = new Date();
    //   const day = String(today.getDate()).padStart(2, "0");
    //   const month = String(today.getMonth() + 1).padStart(2, "0");
    //   const year = today.getFullYear();
    //   return `${year}-${month}-${day}`;
    // };

    const getCurrentDateTime = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const addInventaire = async (values, { resetForm }) => {
      values.inventaiprocondimags =produits.map((produit) => ({
          procondimag: produit.produit.split('|')[0],
          qtePhysique: produit.qtitePhysique,
          qteLogique: produit.qtiteLogique,
          qteFiche: produit.qtiteFiche,
          ecartReel: produit.ecartReel,
          ecartLogique: produit.ecartLogique,
          nomProd: produit.produit.split('|')[1]
      }));
      values.magasin=magasin.value.split('|')[0];
      values.equipes=equipes;

      console.log('DOnnées =>', values)
      ApiService.post("/inventaires", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeInventairePage" });
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchClient = async () => {
      try {
        const response = await ApiService.get("all/clients");
        const fournisseurData = response.data.data.data;
        clientOptions.value = fournisseurData.map((client) => ({
          value: client.id,
          label: `${
            client.nomClient
              ? client.nomClient + '' + client.prenomClient
              : client.raisonSociale
          }`,
        }));
      } catch (error) {
        //
      }
    };

    return {
      inventaireSchema,
      addInventaire,
      inventaireForm,
      removeRowProduit,
      addRowProduit,
      validateRowProduit,
      produits,
      valuess,
      clientOptions,
      magasinOptions,
      magasin,
      produitOptions,
      selectProd,
      isDisable,
      isDisables,
      isDis,
      getCurrentDateTime,
      selectMag,
      valideteRowEquipe,
      addRowEquipe,
      removeRowEquipe,
      equipes,
      personneOptions,
      personnelOptions,
      roleOptions
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