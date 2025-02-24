<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="circuitForm" @submit="editCircuit" :validation-schema="circuitSchema" :initial-values="circuitForm">
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
            <div class="col-md-2 mb-2"> 
              <label for="Duree" class="form-label">Durée du circuit <span class="text-danger">*</span></label>
              <div class="input-group">
                <Field  name="Duree" id="Duree" class="form-control" type="number" v-model="duree" placeholder="Entrez la durée"/> 
                <Field name="typeDuree"  type="text"  v-model="typeDuree"  v-slot="{ field }">
                  <Multiselect v-model="field.value" v-bind="field" :options="typeDureeOptions" :preserve-search="true"
                   :multiple="false" :searchable="true" placeholder="Sélectionner le type de duree"
                  label="label" track-by="label" />
                <!-- <select  v-model = "field.value"  v-bind = "field"  class="form-select form-control" style="width: 20px !important;">
                  <option value="...">...</option>
                  <option value="Jour(s)">Jour(s)</option>
                  <option value="Mois">Mois</option>
                  <option value="Annees">Années</option>
                </select> -->

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
                            Ajouter un circuit
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
                          Personnels <span class="text-danger">*</span>
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
                            <input v-model="circuit.ordre" type="number"
                              class="form-control shadow-none fs-md-15 text-black" placeholder="saisir ordre" />
                            <div class="invalid-feedback" v-if="valideteRowCircuit(circuit.ordre)">
                              L'ordre est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-2 mb-2">
                          <div class="input-group">
                      <input v-model="circuit.duree" class="form-control" type="number" for="inputGroupSelect01" >
                      <div class="invalid-feedback" v-if="valideteRowCircuit(circuit.duree)">
                            La Durée est obligatoire
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
                          :close-on-select="false"
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
                          :options="personnelOptions" 
                          :searchable="true" 
                          :multiple="true"
                          v-model="circuit.personnel"
                          placeholder="Sélectionner les personnels"/>
                        <span class="invalid-feedback" v-if="valideteRowCircuit(circuit.personnel)"></span>
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
            
        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier un circuit
            </button>
            <router-link to="/circuits/liste-circuits" 
                class=" btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
          </div>
        </div>
      </div>
    </Form>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { Circuit} from '@/models/Circuit';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditCircuit",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const circuitSchema = Yup.object().shape({
      nom: Yup.string().required('Le nom du circuit est obligatoire'),
      Duree: Yup.number().required('La Duree est obligatoire'),
      typeDuree: Yup.string().required('Le Type de Duree est obligatoire'),
    });

    const circuitForm = ref<Circuit>();
    const router = useRouter();
    const route = useRoute();
    const typeDureeOptions = ref([]);
    const isDisable = ref(true);
    const roleOptions=ref([]);
    const personnelOptions = ref();
    const duree = ref();
    const typeDuree = ref();

    const etapevalidations = reactive([{
      nom: "",
      role: "",
      ordre: "",
      duree: "",
      typeDuree: "",
      personnel: []
    }]);
    
    const addRowCircuit = () => {
      etapevalidations.push({
        nom: "",
        role: "",
        ordre: "",
        duree: "",
        typeDuree: "",
        personnel:[]
      });
    };
    const removeRowCircuit = (index) => {
      if (etapevalidations.length > 1) etapevalidations.splice(index, 1);
      //totals();
    };
    watch(
      etapevalidations,
      (newValue) => {
        isDisable.value =
        newValue.some(
          (circuit) =>
          valideteRowCircuit(circuit.nom) ||
          valideteRowCircuit(circuit.ordre) ||
          valideteRowCircuit(circuit.role) ||
          valideteRowCircuit(circuit.duree)||
          valideteRowCircuit(circuit.typeDuree)||
          valideteRowCircuit(circuit.personnel)
        );
      },
      { deep: true }
    );
    const valideteRowCircuit = (e) => {
      if (e == "" || e == "" || e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };
    typeDureeOptions.value = [{value:"jour(s)", label:"Jour(s)"}, {value:"mois", label:"Mois"},{value:"annees", label:"Annees"}]

    function getCircuit(id:number) {
      ApiService.get("/circuits/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            circuitForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          };
          console.log('data2',data.data);

          duree.value = data.data['Duree'];
          typeDuree.value = data.data['typeDuree'];
   
          console.log('data1',duree.value);
          console.log('data3',typeDuree.value);

    data.data.etapevalidations.forEach(donne => {
      etapevalidations.push({
      nom: donne.nom,
      role: donne.roleetap?.id,
      ordre: donne.Ordre,
      duree: donne.Duree,
      typeDuree: donne.typeDuree,
      personnel: []
    })
    })

      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

//     const editCircuit = (values, { resetForm }) => {
//   const data = circuitForm.value;

//   // Vérifie si `data` et `data.id` existent
//   if (!data || !data.id) {
//     error("Données du circuit invalides ou ID manquant");
//     return;
//   }

//   // Envoi de la requête PUT avec les données du formulaire
//   ApiService.put("/circuits/" + data.id, data)
//     .then((response) => {
//       // Vérifie si la réponse HTTP est un succès (200 OK)
//       if (response.status === 200) {
//         success(response.data.message);  // Affiche le message de succès
//         resetForm();                      // Réinitialise le formulaire après la modification
//         router.push({ name: "ListeCircuitPage" });  // Redirige vers la page de liste des circuits
//       } else {
//         error("Une erreur inattendue s'est produite");  // Gestion des réponses inattendues
//       }
//     })
//     .catch(({ response }) => {
//       // Gestion des erreurs de l'API
//       if (response && response.data && response.data.message) {
//         error(response.data.message);  // Affiche le message d'erreur venant du backend
//       } else {
//         error("Une erreur s'est produite lors de la modification du circuit");  // Message générique
//       }
//     });
// };

const editCircuit = async (values, { resetForm }) => {
  try {
    const response = await ApiService.put(`/circuits/${values.id}`, values);
    
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListeCircuitPage" });
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
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

    const getAllRoleEtaps = async () => {
      try{
      const response = await ApiService.get('/all/roleetaps');
      const rolesData = response.data.data.data;
      console.log('Data',rolesData)
      roleOptions.value = rolesData.map((role) => ({
        value:role.id,
        label:role.libelle,
      }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }

    onMounted(async () => {
      getAllPersonnels();
      getAllRoleEtaps();
    })


    onMounted(() => {
      if(route.params.id) {
        getCircuit(parseInt(route.params.id as string));
      }
    });

    return { 
      circuitSchema,typeDuree,etapevalidations, editCircuit, circuitForm, typeDureeOptions,removeRowCircuit,addRowCircuit,valideteRowCircuit,isDisable,personnelOptions,roleOptions,duree
    };
  },
});
</script>