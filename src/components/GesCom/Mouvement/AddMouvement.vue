<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="mouvementForm" @submit="addMouvement" :validation-schema="mouvementSchema">
        <div class="row">
          <div class="col-md-12 mb-md-25">
            <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
              <div class="row">
                <div class="border border-primary mb-10">
                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                    style="background-color: #0a59a4">
                    <div class="col-md-7">
                      <h3 class="fs-4 text-white">Mouvements</h3>
                    </div>
                    <div class="col-md-5">
                      <div class="d-flex float-end">
                        <button
                          class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                          type="button" :class="{ 'cursor-not-allowed': isDisable }" @click="addRowMouvement()">
                          <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                          Ajouter un mouvement
                        </button>
                        <router-link to="/liste-mouvements"></router-link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row d-flex align-items-center justify-content-between mt-10">
                      <div class="col-md-3">
                        <label class="d-block text-black fw-semibold">
                          Magasin
                          <span class="text-danger">*</span>
                        </label>
                      </div>

                      <div class="col-md-5">
                        <label class="d-block text-black fw-semibold mb-10">
                          Produit <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-1">
                        <label class="d-block text-black fw-semibold">
                          Quantité
                          <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                          <label class="d-block text-black fw-semibold mb-10">
                            Type Operation<span class="text-danger">*</span>
                          </label>
                        </div>
                      </div>

                      <div class="col-md-1">
                        <label class="d-block text-black fw-semibold mb-10">Actions</label>
                      </div>
                    </div>
                    <hr class="mt-0" />
                    <div class="row" v-for="mouvement in mouvements" :key="mouvement.index">

                      <div class="col-md-3 mb-2">
                        <div class="form-group ">                            
                              <Multiselect :close-on-select="true" :options="magasinOptions" :searchable="true"
                              :multiple="false" v-model="mouvement.magasin" placeholder="Choisir le magasin" />
                        </div>
                      </div>
                      <div class="col-md-5 mb-2">
                        <div class="form-group ">
                          <Multiselect :close-on-select="true" :options="produitOptions" :searchable="true"
                            :multiple="false" v-model="mouvement.produit" placeholder="Sélectionner les produits" />
                          <span class="invalid-feedback" v-if="valideteRowMouvement(mouvement.produit)"></span>
                        </div>
                      </div>

                      <div class="col-md-1 mb-2">
                        <div class="form-group ">
                          <input v-model="mouvement.qte" type="number"
                            class="form-control shadow-none fs-md-15 text-black" placeholder="saisir qte" />
                          <div class="invalid-feedback" v-if="valideteRowMouvement(mouvement.qte)">
                            La quantité est obligatoire.
                          </div>
                        </div>
                      </div>

                      <div class="col-md-2 mb-2">
                        <div class="form-group ">
                            <Multiselect :searchable="true" :options="lestypes" v-model="mouvement.type"
                              placeholder="Sélectionner le type" />
                          <span class="invalid-feedback" v-if="valideteRowMouvement(mouvement.type)"></span>
                        </div>
                      </div>

                      <div class="col-md-1 mb-2">
                        <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                          @click="removeRowMouvement(mouvement.index)">
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
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter un mouvement
              </button>
              <router-link to="/mouvements/liste-mouvements" class=" btn btn-danger "><i
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
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, generateUuid, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';

export default defineComponent({
  name: "AddMouvement",
  components: {
    Form,
    Field,
    Multiselect
  },

  setup: () => {
    const mouvementSchema = Yup.object().shape({
      mouvements: Yup.array().of(
        Yup.object().shape({
          magasin: Yup.string().required("Le magasin est obligatoire."),
          type: Yup.string().required("Le type d'opération est obligatoire."),
          qte: Yup.number().required("La quantité est obligatoire.").min(1, "La quantité doit être supérieure à 0."),
          produit: Yup.number().min(1, "Au moins un produit doit être sélectionné.").required("Le produit est obligatoire."),
        })
      )
    });

    const mouvementForm = ref(null);
    const router = useRouter();

    const magasinOptions = ref([]);
    const produitOptions = ref([]);
    const isDisable = ref(true);

    const mouvements = ref<Array<{ index: string; magasin: number | null; type: string | null; qte: number | null; produit: number | null; }>>([]);

    // const addRowMouvement = () => {
    //   mouvements.value.push({
    //     index: generateUuid(),
    //     magasin: 0,
    //     type: null,
    //     qte: null,
    //     produit: 0
    //   });
    //   console.log("Le contenu de Mouvements est celui là ===> ",  mouvements.value)
    //   //valideteRowMouvement(); // Valide après l'ajout d'une ligne
    // };

    const addRowMouvement = () => {
      mouvements.value.push({
        index: generateUuid(),
        magasin: null, // Modifié
        type: null,
        qte: null,
        produit: null // Modifié
      });
      console.log("Le contenu de Mouvements est celui là ===> ", mouvements.value);
    };

    // const valideteRowMouvement = (e) => {
    //   if (e === null || e === undefined || e === "" || e === 0) {
    //     return true; // Champs invalides
    //   } else {
    //     return false; // Champs valides
    //   }
    // };


    const lestypes = ref([
      { value: "Entrée", label: "Entrée" },
      { value: "Sortie", label: "Sortie" }
    ]);

    const removeRowMouvement = (indexToRemove) => {
      const index = mouvements.value.findIndex(mouvement => mouvement.index === indexToRemove);
      if (index !== -1) {
        mouvements.value.splice(index, 1);
      }
    };


    // watch(mouvements, (newValue) => {
    //   isDisable.value = newValue.some((mouvement) =>
    //     valideteRowMouvement(mouvement)
    //   );
    // }, { deep: true });

    // const valideteRowMouvement = (row) => {
    //   return !row.magasin || !row.type || !row.qte || !row.produit;
    // };

    const valideteRowMouvement = (e) => {
      if (e === null || e === undefined || e === "" || e === 0) {
        return true; // Champs invalides
      } else {
        return false; // Champs valides
      }
    };


    const addMouvement = async () => {
      if (!mouvementForm.value) return;
      const isValid = await mouvementForm.value.validate();
      if (isValid) {
        try {
          await ApiService.post('/suivi', mouvements.value);
          success("Mouvement ajouté avec succès");
          //router.push("ListeMouvements");
        } catch (err) {
          error("Erreur lors de l'ajout du mouvement");
          console.error(err);
        }
      }
    };

    onMounted(async () => {
      await addRowMouvement();
      const loadOptions = async () => {
        try {
          const [magasins, produits] = await Promise.all([
            ApiService.get('/all/magasins'),
            ApiService.get('/all/produits')
          ]);
          magasinOptions.value = (magasins.data.data.data).map((magasin) => ({
            value: magasin.id,
            label: magasin.nomMagasin,
          }));;
          produitOptions.value = (produits.data.data.data).map((produit) => ({
            value: produit.id,
            label: produit.nomProd,
          }));;
        } catch (err) {
          error("Erreur lors du chargement des options");
        }
      };
      loadOptions();
    });

    return {
      mouvements,
      addRowMouvement,
      removeRowMouvement,
      addMouvement,
      mouvementForm,
      magasinOptions,
      produitOptions,
      lestypes,
      valideteRowMouvement,
      isDisable,
      mouvementSchema
    };
  },
});
</script>

<style scoped>
/* Ajoutez votre style ici si nécessaire */
</style>
