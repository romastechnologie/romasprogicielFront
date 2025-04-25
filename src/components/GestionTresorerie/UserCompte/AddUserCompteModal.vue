<template>
    <div class="modal fade" id="AddUserCompteModal" tabindex="-1" role="dialog" ref="addUserCompteModalRef"
        aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="UserCompte">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="usercompteForm" @submit="addUserCompte" :validation-schema="usercompteSchema">
                        <div class="row">
        
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                       Numéro de compte<span class="text-danger">*</span>
                                    </label>
                                    <Field name="numCompte" type="number"
                                        class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Entrer le numero de compte" />
                                    <ErrorMessage name="numCompte" class="text-danger" />
                                </div>
                            </div>
                         
                            <div class="col-md-12 mb-4">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        Personnel <span class="text-danger"></span>
                                    </label>
                                 <Field name="personnel" v-model="personnels" type="text" v-slot="{ field }">
                                    <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                                     :multiple="false" :searchable="true" placeholder="Sélectionner un personnel"
                                      label="label" track-by="label" />
                                  </Field>
                                  <ErrorMessage name="personnel" class="text-danger" />
                                </div>
                            </div>

                            <div class="col-md-12 mb-4">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        Tresorerie <span class="text-danger"></span>
                                    </label>
                                 <Field name="tresorerie" v-model="tresoreries" type="text" v-slot="{ field }">
                                    <Multiselect v-model="field.value" v-bind="field" :options="tresorerieOptions" :preserve-search="true"
                                     :multiple="false" :searchable="true" placeholder="Sélectionner la tresorerie "
                                      label="label" track-by="label" />
                                  </Field>
                                  <ErrorMessage name="tresorerie" class="text-danger" />
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
import { ref, watch, onMounted} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { UserCompte } from '@/models/UserCompte';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import { user } from '@/core/data/letter-box';

export default {
    name: "AddUserCompteModal",
    components: {
        Form,
        Field,
        Multiselect,
        ErrorMessage
    },
    props: {
        id: {
            type: Number,
            required: true,
            default: 0
        },
    },
    emits: ["refreshUserComptes", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const usercompteSchema = Yup.object().shape({
            //code: Yup.string().required('Le code est obligatoire'),
            numCompte: Yup.string().required('Numero de compte est obligatoire'),
            personnel: Yup.string().required('Utilisateur est obligatoire'),
            tresorerie: Yup.string().required('La tresorerie est obligatoire'),

        });


        const usercomptenew = ref(props.id);
        const usercompteForm = ref<UserCompte | null>(null);
        const addUserCompteModalRef = ref<null | HTMLElement>(null);
        let usercomptes = ref<Array<UserCompte>>([]);
        const title = ref('Ajouter un numero de compte');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();
        const personnels = ref();
        const personnelOptions = ref([]);
       const tresoreries = ref();
       const tresorerieOptions = ref([]);

        onMounted(() => {
        getAllPersonnels();
        getAllTresoreries();
      });
  

        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getUserCompte(newValue);
                isupdate.value = true;
                getAllPersonnels();
                getAllTresoreries();
            }
            btnTitle();
        });
    
        const getUserCompte = async (id: number) => {
  return ApiService.get("/userComptes/" + id)
    .then(({ data }) => {
      console.log("Données récupérées: ", data);
      const donnees = data.data;

      // Mapper les données dans le formulaire
      for (const key in donnees) {
        usercompteForm.value?.setFieldValue(
          key,
          typeof donnees[key] === "object" && donnees[key] !== null
            ? donnees[key].id 
            : donnees[key]  
        );
      }

      if (donnees.personnel) {
        usercompteForm.value?.setFieldValue(
          "bien",
          donnees.personnel.id
        );
      }

      if (donnees.tresorerie) {
        usercompteForm.value?.setFieldValue(
          "bien",
          donnees.tresorerie.id
        );
      }

      emit("openmodal", addUserCompteModalRef.value);
    })
    .catch(({ response }) => {
      console.error("Erreur lors de la récupération: ", response);
      error(response.data.message);
    });
};
        


        const getAllPersonnels= async () => {
          try{
          const response = await ApiService.get('/all/personnels');
          const personnelsData = response.data.data.data;
          console.log("personnel", personnelsData);
          personnelOptions.value = personnelsData.map((personnel) => ({
            value: personnel.id,
            label: personnel.nom + " " + personnel.prenom,

          }));
          }
          catch(error){
            //error(response.data.message)
          }
        } 
    

        const getAllTresoreries= async () => {
          try{
          const response = await ApiService.get('/all/tresoreries');
          const tresoreriesData = response.data.data.data;
          console.log("tresorerie", tresoreriesData);
          tresorerieOptions.value = tresoreriesData
          .filter(tresorerie => tresorerie.operation === true)
          .map((tresorerie) => ({
            value: tresorerie.id,
            label: tresorerie.nom,
          }));
          }
          catch(error){
            //error(response.data.message)
          }
        } 

        const btnTitle = async () => {
            if (isupdate.value) {
                title.value = "Modifier le compte ";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter un compte";
                btntext.value = "Ajouter";
            }
        }

        const addUserCompte = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as UserCompte;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/userComptes/${values.id}`, values)
                    .then(({ data }) => {
                        if (data.code == 200) {
                            success(data.message);
                            resetForm();
                            hideModal(addUserCompteModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit("refreshUserComptes");
                            router.push('/userComptes/liste-userCompte');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else {
                ApiService.post("/userComptes", values)
                    .then(({ data }) => {
                        if (data.code == 201) {
                            success(data.message)
                            resetForm();
                            hideModal(addUserCompteModalRef.value);
                            //router.push('/pannes/liste-panne');
                            emit("refreshUserComptes");

                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            }
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
            usercomptes, title, btntext, resetValue, usercompteSchema,
            addUserCompte, usercompteForm, addUserCompteModalRef, usercomptenew, personnelOptions, personnels,
            tresorerieOptions,tresoreries
            //refreshPannes
        };
    },
};
</script>@/models/UserCompte