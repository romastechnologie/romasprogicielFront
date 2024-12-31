<template>
    <div class="modal fade" id="AddCircuitDemandeModal" tabindex="-1" role="dialog" ref="addCircuitDemandeModalRef"
        aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="circuitDemandeForm" @submit="addCircuitDemande" :validation-schema="circuitDemandeSchema">
                        <div class="row">
                            <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Catégorie de la demande <span class="text-danger">*</span>
              </label>
              <Field name="categorie" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="categorieOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" 
                  placeholder="Sélectionner la catégorie" label="label" track-by="label" />
              </Field>
              <ErrorMessage name="categorie" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Circuit <span class="text-danger">*</span>
              </label>
              <Field name="circuit" v-model="circuits" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="circuitOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le circuit " label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="circuit" class="text-danger" />
            </div>
          </div>
          
                            <button class="btn btn-primary" type="submit">
                                {{ btntext }}
                            </button>
                        </div>
                    </Form>
                </div>
                <!-- <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                        <button class="btn btn-primary" type="button">Save changes</button>
                    </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import Swal from "sweetalert2";
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { CircuitDemande } from '@/models/CircuitDemande';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';


export default {
    name: "AddCircuitDemandeModal",
    components: {
        Form,
        Field,
        ErrorMessage,
        Multiselect,
    },
    props: {
        id: {
            type: Number,
            required: true,
            default: 0
        },
    },
    emits: ["refreshCircuitDemandes", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const circuitDemandeSchema = Yup.object().shape({
            categorie: Yup.string().required('La catégorie de demande est obligatoire'),
             circuit: Yup.string().required('Le circuit est obligatoire'),
            
        });


        const circuitDemandenew = ref(props.id);
        const circuitDemandeForm = ref<CircuitDemande | null>(null);
        const addCircuitDemandeModalRef = ref<null | HTMLElement>(null);
        let circuitDemandes = ref<Array<CircuitDemande>>([]);
        const title = ref('Ajouter un circuit de demande');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();
        const categorie = ref();
        const categories = ref();
        const circuits = ref();
        const circuit = ref();
        const categorieOptions = ref([]);
        const circuitOptions = ref([] as any[]);

        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getCircuitDemande(newValue);
                isupdate.value = true;
            }
            btnTitle();
        });


        onMounted(() => {
      
      getAllCategorieDemandes()
      getAllCircuits()
     
    });

    const getAllCategorieDemandes = async () => {
        try{
        const response = await ApiService.get('/all/categorieDemandes');
        const categoriesData = response.data.data.data;

        categorieOptions.value = categoriesData.map((categorie) => ({
          value: categorie.id,
          label: categorie.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllCircuits = async () => {
        try{
        const response = await ApiService.get('/all/circuits');
        const circuitsData = response.data.data.data;
        console.log(circuitsData,"gggggggggg");
        circuitOptions.value = circuitsData.map((circuit) => ({
          value: circuit.id,
          label: circuit.nom,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

        const getCircuitDemande = async (id: number) => {
  return ApiService.get("/circuitDemandes/" + id)
    .then(({ data }) => {
      console.log("Données récupérées: ", data);
      const donnees = data.data;
      for (const key in donnees) {
        circuitDemandeForm.value?.setFieldValue(
          key,
          typeof donnees[key] === "object" && donnees[key] !== null
            ? donnees[key].id 
            : donnees[key]  
        );
      }

      if (donnees.categorie) {
        circuitDemandeForm.value?.setFieldValue(
          "bien",
          donnees.categorie.id
        );
      }

      if (donnees.circuit) {
        circuitDemandeForm.value?.setFieldValue(
          "bien",
          donnees.circuit.id
        );
      }

      emit("openmodal", addCircuitDemandeModalRef.value);
    })
    .catch(({ response }) => {
      console.error("Erreur lors de la récupération: ", response);
      error(response.data.message);
    });
};
        const btnTitle = async () => {
            if (isupdate.value) {
                title.value = "Modifier le circuit de demande";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter un circuit de demande";
                btntext.value = "Ajouter";
            }
        }

        const addCircuitDemande = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as CircuitDemande;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/circuitDemandes/${values.id}`, values)
                    .then(({ data }) => {
                        if (data.code == 200) {
                            success(data.message);
                            resetForm();
                            hideModal(addCircuitDemandeModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit("refreshCircuitDemandes");
                            router.push('/circuits/liste-circuits-demandes');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else{
    console.log("Début de la fonction pour envoyer les données");
    console.log("Valeurs envoyées : ", values);

    ApiService.post("/circuitDemandes", values)
        .then(({ data }) => {
            console.log("Réponse de l'API reçue : ", data);

            if (data.code == 201) {
                console.log("Code de succès détecté (201)");
                success(data.message);

                console.log("Réinitialisation du formulaire");
                resetForm();

                console.log("Fermeture de la modale");
                hideModal(addCircuitDemandeModalRef.value);

                console.log("Émission de l'événement pour rafraîchir les données");
                emit("refreshCircuitDemandes");

                // console.log("Redirection vers la liste des circuits de demande");
                // router.push('/circuitDemandes/liste-circuitDemande');
            } else {
                console.log("Code différent de 201 détecté, message : ", data.message);
            }
        })
        .catch(({ response }) => {
            console.log("Erreur lors de l'appel API : ", response);
            error(response.message);
        });

    console.log("Fin de la fonction pour envoyer les données");
};

        };

        const resetValue = () => {
            const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
            isupdate.value = false;
            formFields.forEach(field => {
                field.value = '';
            });
            btnTitle()
        };

        return {
            circuitDemandes, title, btntext, resetValue, circuitDemandeSchema,circuit,categorie,
            addCircuitDemande, circuitDemandeForm, addCircuitDemandeModalRef, circuitDemandenew,categorieOptions,circuitOptions,categories,circuits,
            //refreshCircuitDemandes
        };
    },
};
</script>