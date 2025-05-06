<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form  @submit="addCircuit" :validation-schema="circuitSchema">
        <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="string" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nom" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3"> 
              <label for="Duree" class="form-label">Durée du circuit <span class="text-danger">*</span></label>
              <div class="input-group">
                <Field  name="Duree" id="Duree" class="form-control" type="number" placeholder="Entrez la durée"/>
                <Field name="typeDuree"  type="text"  v-slot="{ field }">
                <select  v-model = "field.value" v-bind = "field"  class="form-select form-control" style="width: 20px !important;">
                  <option value="...">...</option>
                  <option value="Jour(s)">Jour(s)</option>
                  <option value="Mois">Mois</option>
                  <option value="Annees">Années</option>
                </select>
              </Field>
              </div>
              <div>
                <ErrorMessage name="typeDuree" class="text-danger"/>
                <ErrorMessage name="Duree" class="text-danger"/> 
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
                          Etapes
                        </h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                            @click="addRowCircuit()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                            Ajouter une étape
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="row d-flex align-items-center justify-content-between mt-10">
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold">
                            Nom
                            <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold">
                            Ordre
                            <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label  class="form-label">Durée du circuit<span class="text-danger">*</span></label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-10">
                            Role Etape <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-3">
                    <div class="form-group mb-15 mb-sm-20 mb-md-25">
                      <label class="d-block text-black fw-semibold mb-10">
                          Users <span class="text-danger">*</span>
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
                      <div class="row" v-for="(circuit, index) in etapevalidations" :key="index">
                        <div class="col-md-2 mb-2">
                          <div class="form-group ">
                            <input v-model="circuit.nom" type="text" class="form-control shadow-none fs-md-15 text-black"
                              placeholder="Saisir le nom" />
                            <div class="invalid-feedback" v-if="valideteRowCircuit(circuit.nom)">
                              Le nom est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2 mb-2">
                          <div class="form-group ">
                            <input v-model="circuit.ordre" type="number" readonly
                              class="form-control shadow-none fs-md-15 text-black" placeholder="saisir ordre" />
                            <div class="invalid-feedback" v-if="valideteRowCircuit(circuit.ordre)">
                              L'ordre est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2 mb-2">
                        <div class="input-group">
                      <input v-model="circuit.Duree" class="form-control" type="number" for="inputGroupSelect01" >
                          <div class="invalid-feedback" v-if="valideteRowCircuit(circuit.Duree)">
                            La durée est obligatoire
                            </div>
                      <select v-model="circuit.typeDuree" class="form-select form-control" style="width: 20px !important;">
                        <option value="...">...</option>
                        <option value="Jour(s)">Jour(s)</option>
                        <option value="Mois">Mois</option>
                        <option value="Annees">Annees</option>
                      </select>
                          <div class="invalid-feedback" v-if="valideteRowCircuit(circuit.typeDuree)">
                            Le type de durée est obligatoire
                          </div>
                        </div>
                      </div>
                        <div class="col-md-2 mb-2">
                          <div class="form-group ">
                          <Multiselect 
                          
                          :options="roleOptions" 
                          :searchable="true" 
                          :multiple="false"
                          v-model="circuit.role"
                          placeholder="Choisir le role"/>
                        <span class="invalid-feedback" v-if="valideteRowCircuit(circuit.role)"></span>
                          </div>
                        </div>
                        <div class="col-md-3 mb-2">
                          <div class="form-group ">
                          <Multiselect 
                          mode="tags"
                          :close-on-select="false"
                          :options="userOptions" 
                          :searchable="true" 
                          :multiple="true"
                          v-model="circuit.user"
                          placeholder="Sélectionner les users"/>
                        <span class="invalid-feedback" v-if="valideteRowCircuit(circuit.user)"></span>
                          </div>
                        </div>
                        
                        <div class="col-md-1 mb-2">
                            <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                            @click="removeRowCircuit(index)">
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
                <button class="btn btn-success me-3"  type="submit">
                  Ajouter un circuit
                </button>
                <router-link to="/circuits/liste-circuits" class=" btn btn-danger ">
                  <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
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
import { Circuit } from "@/models/Circuit";
import { error, success,ajouterPeriode } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import axios from 'axios';


export default defineComponent({
  name: "AddCircuit",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },

  setup: () => {
    const circuitSchema = Yup.object().shape({
      nom: Yup.string().required("Le nom est obligatoire."),
      Duree: Yup.number().typeError("").required("La durée est obligatoire."),
      typeDuree: Yup.string().required("Le type de duree est obligatoire."),
    });

    onMounted(async () => {
    });

    const circuitForm = ref(null);
    const nom = ref();
    const router = useRouter();
    const roleOptions=ref([]);
    const typeDureeOptions = ref([]);
    const userOptions = ref([]);
    const isDisable = ref(true);
    const typeDuree = ref();
    const Duree = ref();
    
    const etapevalidations = reactive([{
      nom: "",
      role: "",
      ordre: 1,
      Duree: "",
      typeDuree: "",
      user: []
    }]);
    watch(
  etapevalidations,
  () => {
    const hasValidationError = etapevalidations.some(
      (circuit) =>
        valideteRowCircuit(circuit.nom) ||
        valideteRowCircuit(circuit.ordre) ||
        valideteRowCircuit(circuit.role) ||
        valideteRowCircuit(circuit.Duree) ||
        valideteRowCircuit(circuit.typeDuree) ||
        valideteRowCircuit(circuit.user)
    );

    const lastEtape = etapevalidations[etapevalidations.length - 1];
    const selectedRole = roleOptions.value.find((role) => role.value === lastEtape.role);

    if (selectedRole && selectedRole.code === 'VAL') {
      isDisable.value = true;
    } else {
      isDisable.value = hasValidationError;
    }
  },
  { deep: true }
);


    const convertToDays = (value: number, unit: string): number => {
  switch (unit.toLowerCase()) {
    case 'jour(s)':
      return value;
    case 'mois':
      return value * 30; // approx. 30 jours
    case 'annees':
    case 'années':
      return value * 365; // approx. 365 jours
    default:
      return 0;
  }
};

const isStepDurationValid = (circuitDuration: number, circuitUnit: string): boolean => {
  const circuitDurationInDays = convertToDays(circuitDuration, circuitUnit);

  const totalEtapesDuration = etapevalidations.reduce((acc, etape) => {
    const d = Number(etape.Duree);
    const unit = etape.typeDuree;
    return acc + convertToDays(d, unit);
  }, 0);

  return totalEtapesDuration === circuitDurationInDays;
};


watch(
  [Duree, typeDuree, etapevalidations],
  () => {
    if (Duree.value && typeDuree.value) {
      const isValid = isStepDurationValid(Number(Duree.value), typeDuree.value);
      if (!isValid) {
        error("La somme des durées des étapes doit être **exactement égale** à la durée du circuit !");
      }
    }
  },
  { deep: true }
);



    const addRowCircuit = () => {
  const nextOrder = etapevalidations.length + 1;
  etapevalidations.push({
    nom: "",
    role: "",
    ordre: nextOrder,
    Duree: "",
    typeDuree: "",
    user:[]
  });
};


const removeRowCircuit = (index) => {
  if (etapevalidations.length > 1) {
    etapevalidations.splice(index, 1);
    etapevalidations.forEach((etape, idx) => {
      etape.ordre = idx + 1;
    });
  }
};

   /* watch(
      etapevalidations,
      (newValue) => {
        isDisable.value =
        newValue.some(
          (circuit) =>
          valideteRowCircuit(circuit.nom) ||
          valideteRowCircuit(circuit.ordre) ||
          valideteRowCircuit(circuit.role) ||
          valideteRowCircuit(circuit.Duree)||
          valideteRowCircuit(circuit.typeDuree)||
          valideteRowCircuit(circuit.user)
        );
      },
      { deep: true }
    );*/

    const valideteRowCircuit = (e) => {
      if (e == "" || e == "" || e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

    const { remove, push, fields, update } = useFieldArray("circuits");


    typeDureeOptions.value = [{value:"jour(s)", label:"Jour(s)"}, {value:"mois", label:"Mois"},{value:"annees", label:"Annees"}]

    const addCircuit = async (values) => {
      if (!values || Object.keys(values).length === 0) {
        console.error("Erreur : L'objet 'values' est vide ou indéfini !");
        return;
      }
          if (!isStepDurationValid(Number(values.Duree), values.typeDuree)) {
      error("La somme des durées des étapes doit correspondre exactement à la durée définie !");
      return;
    }
      try{
        values["etapeCircuit"]  =  etapevalidations.map((etape) => ({
          ordre:etape.ordre,
          Duree:etape.Duree,
          typeDuree:etape.typeDuree,
          nom:etape.nom,
          role:etape.role,
          user:etape.user,
        }))
        console.log("values",values);
        const {data} = await ApiService.post("/circuits",values);
        if(data.code === 201){
          success(data.message);
          router.push({name: "ListeCircuitPage"});
        }
      }catch(err){
        console.error("Erreur d'API :", err);
      }

    //   console.log("top icieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    //   values["etapes"]=circuits;
    //   console.log("top ici",values);
    //   ApiService.post("/circuits",values)
    //     .then(({ data }) => {
    //       console.log("top ici",data)
    //       if(data.code == 201) { 
    //         success(data.message);
    //         resetForm();
    //         router.push({ name: "ListeCircuitPage" });
    //       }
    //     }).catch(({ response }) => {
    //       error(response.data.message);
    //     });
    };
    const getAllUsers = async () => {
      try{
      const response = await ApiService.get('/users');
      const canalsData = response.data.data.data;
      console.log('Data',canalsData)
      userOptions.value = canalsData.map((user) => ({
        value:user.id,
        label:user.nom + '' + user.prenom,
      }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    const getAllRoleEtaps = async () => {
      try{
      const response = await ApiService.get('/all/roleetaps');
      const rolesData = response.data.data.data;
      console.log('Data',rolesData)
      roleOptions.value = rolesData.map((role) => ({
        value:role.id,
        label:role.libelle,
        code: role.code,

      }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    onMounted(async () => {
      getAllUsers();
      getAllRoleEtaps();
    })
    
    return { circuitSchema,Duree,typeDuree,nom,
       addCircuit,
        circuitForm,typeDureeOptions,
      isDisable,
      etapevalidations,removeRowCircuit,
      addRowCircuit,
      valideteRowCircuit,userOptions,roleOptions,

      };
  },
});
</script>