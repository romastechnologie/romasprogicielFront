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
                      <h3 class="fs-4 text-white">
                        Mouvements
                      </h3>
                    </div>
                    <div class="col-md-5">
                      <div class="d-flex float-end">
                        <button
                          class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                          type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                          @click="addRowMouvement()">
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
                        <label class="d-block text-black fw-semibold mb-10">
                          Actions
                        </label>
                      </div>
                    </div>
                    <hr class="mt-0" />
                    <div class="row" v-for="(mouvement, index) in mouvements" :key="index">
                      <div class="col-md-3 mb-2">
                        <div class="form-group ">
                          <Multiselect :close-on-select="true" :options="magasinOptions" :searchable="true"
                            :multiple="false" v-model="mouvement.magasin" placeholder="Choisir le magasin" />
                          <span class="invalid-feedback" v-if="valideteRowMouvement(mouvement.magasin)"></span>
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
                          <Field name="type" v-model="mouvement.typee" type="text" v-slot="{ field }">
                            <Multiselect :searchable="true" :options="['Entrée', 'Sortie']" v-model="field.value"
                              v-bind="field" placeholder="Sélectionner le type" />
                          </Field>
                          <span class="invalid-feedback" v-if="valideteRowMouvement(mouvement.type)"></span>
                        </div>
                      </div>

                      <div class="col-md-1 mb-2">
                        <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                          @click="removeRowMouvement(index)">
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
import { Document } from '@/models/Document';
import { error, success, ajouterPeriode } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import axios from 'axios';


export default defineComponent({
  name: "AddMouvement",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },

  setup: () => {
    const mouvementSchema = Yup.object().shape({
      magasin: Yup.string().required("Le magasin est obligatoire."),
      typee: Yup.string().required("Le type d'opération est obligatoire."),
      qte: Yup.number().required("La quantité est obligatoire.").min(1, "La quantité doit être supérieure à 0."),
      produit: Yup.number().min(1, "Au moins un produit doit être sélectionné.").required("Le produit est obligatoire."),
    });

    const validateMouvements = async () => {
      try {
        await mouvementSchema.validate(mouvements, { abortEarly: false });
        console.log("Tous les mouvements sont valides !");
      } catch (err) {
        console.error("Validation échouée :", err.errors);
      }
    };


    const mouvementForm = ref(null);
    const nom = ref();
    const router = useRouter();
    const roleOptions = ref([]);


    const magasinOptions = ref();
    const produitOptions = ref();

    const isDisable = ref(true);
    const typeDuree = ref();
    const Duree = ref();

    const mouvements = reactive([{
      magasin: "",
      typee: "",
      qte: "",
      produit: ""
    }]);

    const addRowMouvement = () => {
      mouvements.push({
        magasin: "",
        typee: "",
        qte: "",
        produit: ""
      });
    };

    const removeRowMouvement = (index) => {
      if (mouvements.length > 1) mouvements.splice(index, 1);
      //totals();
    };

    watch(mouvements, (newValue) => {
      isDisable.value = newValue.some((mouvement) =>
        valideteRowMouvement(mouvement.magasin) ||
        valideteRowMouvement(mouvement.typee) ||
        valideteRowMouvement(mouvement.qte) ||
        valideteRowMouvement(mouvement.produit)
      );
    },
      { deep: true }
    );

    const valideteRowMouvement = (e) => {
      if (e == "" || e == "" || e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

    const { remove, push, fields, update } = useFieldArray("mouvements");

    const addMouvement = async (values, { resetForm }) => {
      console.log("SUIVI ==> ",values);
      ApiService.post("/suivi", values)
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeMouvementPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const getAllProduit = async () => {
      try {
        const response = await ApiService.get('/all/produits');
        const canalsData = response.data.data.data;
        console.log('Data', canalsData)
        produitOptions.value = canalsData.map((produit) => ({
          value: produit.id,
          label: produit.nomProd,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    const getAllMagasin = async () => {
      try {
        const response = await ApiService.get('/all/magasins');
        const magasinsData = response.data.data.data;
        console.log('Data', magasinsData)
        magasinOptions.value = magasinsData.map((magasin) => ({
          value: magasin.id,
          label: magasin.nomMagasin,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    onMounted(async () => {
      await getAllProduit();
      await getAllMagasin();
    })

    return {
      mouvementSchema,
      addMouvement,
      mouvementForm,
      isDisable,
      mouvements, removeRowMouvement,
      addRowMouvement,
      valideteRowMouvement, produitOptions, roleOptions, magasinOptions,
    };

  },
});
</script>