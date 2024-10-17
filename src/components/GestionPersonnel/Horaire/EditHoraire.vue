<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form @submit="EditHoraire">
        <div class="col-md-12 mb-md-25">
          <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
            <div class="row">
              <div class="border border-primary mb-10">
                <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                  style="background-color: #0a59a4">
                  <div class="col-md-7">
                    <h3 class="fs-4 text-white">
                      Les horaires de l'entreprise
                    </h3>
                  </div>
                  <div class="col-md-5">
                    <div class="d-flex float-end">
                      <!-- <button
                        class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                        type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                        @click="addRowHoraire()">
                        <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                        Ajouter un horaire
                      </button> -->
                      <!-- <router-link to="/liste-mouvements"></router-link> -->
                    </div>
                  </div>
                </div>
                <div>
                  <div class="row d-flex align-items-center justify-content-between mt-2">
                    <div class="col-md-2">
                      <label class="d-block text-black fw-semibold">
                        Jour
                        <span class="text-danger">*</span>
                      </label>
                    </div> 
                    <div class="col-md-2">
                      <label class="d-block text-black fw-semibold">
                        Heure d'ouverture
                        <span class="text-danger">*</span>
                      </label>
                    </div>
                   
                    <div class="col-md-2">
                      <label class="d-block text-black fw-semibold">
                        Début de pause
                        <span class="text-danger">*</span>
                      </label>
                    </div>
                    <div class="col-md-2">
                      <label class="d-block text-black fw-semibold mb-10">
                        Fin de pause<span class="text-danger">*</span>
                      </label>
                    </div>
                    <div class="col-md-2">
                      <label class="d-block text-black fw-semibold">
                        Heure de fermeture
                        <span class="text-danger">*</span>
                      </label>
                    </div>
                    <!-- <div class="col-md-2">
                      <label class="d-block text-black fw-semibold mb-10">
                        Statut <span class="text-danger">*</span>
                      </label>
                    </div>-->
                    <div class="col-md-2">
                      <label class="d-block text-black fw-semibold mb-10">
                        Est jour ouvrable<span class="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <hr class="mt-0" />
                  <div class="row" v-for="(horaire, index) in horaires" :key="index">
                    <div class="col-md-2 mb-2">
                      <div class="form-group ">
                        <input :disabled="horaire.estActif=='0'" readonly class="form-control shadow-none fs-md-15 text-black" name="jour" type="text" v-model="horaire.jour" 
                        :class="valideteRowHoraire(horaire.jour,horaire.estActif) ? 'is-invalid' : ''" />
                        <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.jour,horaire.estActif)">
                          Champs obligatoire.
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 mb-2">
                      <div class="form-group ">
                        <input :disabled="horaire.estActif=='0'" v-model="horaire.heureOuverture" type="time" :class="valideteRowHoraire(horaire.heureOuverture,horaire.estActif) ? 'is-invalid' : ''" class="form-control shadow-none fs-md-15 text-black"
                          placeholder="Saisir le nom" />
                        <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.heureOuverture,horaire.estActif)">
                          Champs obligatoire.
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 mb-2">
                      <div class="form-group ">
                        <input  :disabled="horaire.estActif=='0'" v-model="horaire.heureDebutPause" type="time" :class="valideteRowHoraire(horaire.heureDebutPause,horaire.estActif) ? 'is-invalid' : ''"
                          class="form-control shadow-none fs-md-15 text-black"/>
                        <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.heureDebutPause,horaire.estActif)">
                          Champs obligatoire.
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 mb-2">
                      <div class="form-group">
                        <input :disabled="horaire.estActif=='0'" v-model="horaire.heureFinPause" type="time" :class="valideteRowHoraire(horaire.heureFinPause,horaire.estActif) ? 'is-invalid' : ''"
                          class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                          <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.heureFinPause,horaire.estActif)">
                            Champs obligatoire.
                          </div>
                      </div>
                    </div>
                    <div class="col-md-2 mb-2">
                      <div class="form-group ">
                        <input :disabled="horaire.estActif=='0'" v-model="horaire.heureFermeture" type="time" :class="valideteRowHoraire(horaire.heureFermeture,horaire.estActif) ? 'is-invalid' : ''" class="form-control shadow-none fs-md-15 text-black"
                          placeholder="Saisir le nom" />
                        <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.heureFermeture,horaire.estActif)">
                          Champs obligatoire.
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 mb-2">
                        <div class="form-check-size">
                          <div class="form-check form-check-inline radio radio-primary">
                            <input class="form-check-input" :id="index" v-model="horaire.estActif" type="radio" :name="`radio${index}`" value="1">
                            <label class="form-check-label mb-0" :for="index">Oui</label>
                          </div>
                          <div class="form-check form-check-inline radio radio-primary">
                            <input class="form-check-input" :id="`radio${index}`" v-model="horaire.estActif" type="radio" :name="`radio${index}`" value="0">
                            <label class="form-check-label mb-0" :for="`radio${index}`">Non</label>
                          </div>
                        </div>
                        <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.estActif)">
                          Champs obligatoire.
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
            <button class="btn btn-success me-3" type="submit"
                :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable">
                Modifier un horaire
            </button>
            <router-link to="/horaires/liste-horaire" 
            class="btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
          </div>
        </div>  
      </Form> 
    </div> 
  </div> 
</template>
  
  <script lang="ts">
    import { defineComponent, onMounted, reactive, ref, watch} from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import axios from 'axios';
    import ApiService from '@/services/ApiService';
    import { error, success } from '@/utils/utils';
    import { useRouter, useRoute } from 'vue-router';
    import { Horaire } from '@/models/Horaire';
    import Multiselect from '@vueform/multiselect/src/Multiselect';
    import VueMultiselect from 'vue-multiselect'

  
  export default defineComponent({
      name: "EditHoraire",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
      
  },
  setup: () => {
    const router = useRouter();
    const isDisable = ref(true);
    const horaires = reactive([]);

    watch(
      horaires,
      (newValue) => {
          isDisable.value = newValue.some(
            horaire => 
              valideteRowHoraire(horaire.jour,horaire.estActif) || valideteRowHoraire(horaire.heureOuverture,horaire.estActif) 
              || valideteRowHoraire(horaire.heureFermeture,horaire.estActif) || valideteRowHoraire(horaire.heureDebutPause,horaire.estActif) || 
              valideteRowHoraire(horaire.heureFinPause,horaire.estActif) 
          );
        },
      { deep: true }
    );

    const valideteRowHoraire = (e,d) => {
      if ((e == "" || e == "" || e == 0 || e == "0" || e == null || e < 0) && d !="0") {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

    function getAllHoraires(page = 1, limi = 10, searchTerm = '') {
        ApiService.get(`/horaires?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            data.data.data.forEach(horaire => {
            horaires.push({
              id:horaire.id,
              jour: horaire.jour,
              heureOuverture: horaire.heureOuverture,
              heureFermeture:horaire.heureFermeture,
              heureDebutPause: horaire.heureDebutPause,
              heureFinPause:  horaire.heureFinPause,
              estActif: horaire.estActif
            })});
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
    }

    
    const EditHoraire = async () => {
       ApiService.put("/horaires", horaires)
        .then(({ data }) => {
          if (data.code == 201) {
            console.log(data.code,"datadatadatadata");
            success(data.message);
            router.push({ name: "ListeHoraire" });
          }
        }).catch(({ response }) => {
          console.log(response,"responseresponseresponse");
          error(response.message);
        });
    };

    onMounted(async () => {
      getAllHoraires();
    })

    return {
      EditHoraire,
      valideteRowHoraire,
      isDisable,
      horaires,
    };
  },
});
</script>
