<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="equipeForm" @submit="addEquipe" :validation-schema="equipeSchema">
        <div class="row">

            <div class="col-md-12 mb-md-25">
                                      <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                                        <div class="row">
                                          <div class="border border-primary mb-10">
                                            <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                                              style="background-color: #0a59a4">
                                              <div class="col-md-7">
                                                <h3 class="fs-4 text-white">
                                                  Equipes
                                                </h3>
                                              </div>
                                              <div class="col-md-5">
                                                <div class="d-flex float-end">
                                                  <button
                                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                                    type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
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
                                                <div class="col-md-3">
                                                  <label class="d-block text-black fw-semibold">
                                                    Nom Complet
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-3">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Role<span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-3">
                                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                              <label class="d-block text-black fw-semibold mb-10">
                                              Personnels <span class="text-danger">*</span>
                                              </label>  
                                              </div>
                                            </div>
                                                <div class="col-md-3">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Actions
                                                  </label>
                                                </div>
                                              </div>
                                              <hr class="mt-0" />
                                              <div class="row" v-for="(equipe, index) in equipes" :key="index">
                                                <div class="col-md-3 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="equipe.nomComplet" type="text" class="form-control shadow-none fs-md-15 text-black"
                                                      placeholder="Saisir le nomComplet" />
                                                    <div class="invalid-feedback" v-if="valideteRowEquipe(equipe.nomComplet)">
                                                      Le nomComplet est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                
                                                <div class="col-md-3 mb-2">
                                                  <div class="form-group ">
                                                  <Multiselect 
                                                  
                                                  :close-on-select="false"
                                                  :options="roleOptions" 
                                                  :searchable="true" 
                                                  :multiple="false"
                                                  v-model="equipe.role"
                                                  placeholder="Choisir le role"/>
                                                <span class="invalid-feedback" v-if="valideteRowEquipe(equipe.role)"></span>
                                                  </div>
                                                </div>
                                                <div class="col-md-3 mb-2">
                                                  <div class="form-group ">
                                                  <Multiselect 
                                                  
                                                  :close-on-select="false"
                                                  :options="personnelOptions" 
                                                  :searchable="true" 
                                                  :multiple="false"
                                                  v-model="equipe.personnel"
                                                  placeholder="Sélectionner le personnel"/>
                                                <span class="invalid-feedback" v-if="valideteRowEquipe(equipe.personnel)"></span>
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
        
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter une équipe
              </button>
              <router-link to="/equipes/liste-equipes" class=" btn btn-danger "><i
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
import { error, success,ajouterPeriode } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import axios from 'axios';


export default defineComponent({
  name: "AddEquipe",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },

  setup: () => {
    const equipeSchema = Yup.object().shape({
      nomComplet: Yup.string().required("Le nomComplet est obligatoire."),
      role: Yup.number().required("Le role est obligatoire."),
      personnel: Yup.string().required("Le personnel est obligatoire."),
    });

    onMounted(async () => {
    });

    const equipeForm = ref(null);
    
    const router = useRouter();
    const roleOptions=ref([]);
    
    const personnelOptions = ref();

    const isDisable = ref(true);
    
    
    const equipes = reactive([{
      nomComplet: "",
      role: "",
      personnel: []
    }]);

    const addRowEquipe = () => {
      equipes.push({
        nomComplet: "",
        role: "",
        personnel:[]
      });
    };

    const removeRowEquipe = (index) => {
      if (equipes.length > 1) equipes.splice(index, 1);
      //totals();
    };

    watch(
      equipes,
      (newValue) => {
        isDisable.value =
        newValue.some(
          (equipe) =>
          valideteRowEquipe(equipe.nomComplet) ||
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

    const { remove, push, fields, update } = useFieldArray("equipes");


    const addEquipe = async (values, {resetForm}) => {
      ApiService.post("/equipes",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeEquipePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const getAllPersonnels = async () => {
      try{
      const response = await ApiService.get('/all/personnels');
      const canalsData = response.data.data.data;
      console.log('Data',canalsData)
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

    onMounted(async () => {
      getAllPersonnels();
      getAllRoles();
    })
    
    return { equipeSchema,
       addEquipe,
        equipeForm,
      isDisable,
      equipes,removeRowEquipe,
      addRowEquipe,
      valideteRowEquipe,personnelOptions,roleOptions,
      };
    
  },
});
</script>