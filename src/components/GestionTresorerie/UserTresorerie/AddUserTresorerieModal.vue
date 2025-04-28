<template>
    <div class="modal fade" id="AddUserTresorerieModal" tabindex="-1" role="dialog" ref="addUserTresorerieModalRef"
        aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="UserTresorerie">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="usertresorerieForm" @submit="addUserTresorerie" :validation-schema="usertresorerieSchema">
                        <div class="row">
        
            
                            <div class="col-md-12 mb-4">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        User <span class="text-danger"></span>
                                    </label>
                                 <Field name="user" v-model="user" type="text" v-slot="{ field }">
                                    <Multiselect v-model="field.value" v-bind="field" :options="userOptions" :preserve-search="true"
                                     :multiple="false" :searchable="true" placeholder="Sélectionner un user "
                                      label="label" track-by="label" />
                                  </Field>
                                  <ErrorMessage name="user" class="text-danger" />
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
                                      label="label" track-by="label" mode="tags" />
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
import { UserTresorerie } from '@/models/UserTresorerie';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import { user } from '@/core/data/letter-box';

export default {
    name: "AddUserTresorerieModal",
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
    emits: ["refreshUserTresoreries", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const usertresorerieSchema = Yup.object().shape({
            //code: Yup.string().required('Le code est obligatoire'),
            user: Yup.string().required('Utilisateur est obligatoire'),
            tresorerie: Yup.array().required('La tresorerie est obligatoire')
        });
        const usertresorerienew = ref(props.id);
        const usertresorerieForm = ref<UserTresorerie | null>(null);
        const addUserTresorerieModalRef = ref<null | HTMLElement>(null);
        let usertresoreries = ref<Array<UserTresorerie>>([]);
        const title = ref('Ajouter un numero de tresorerie');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();
        const user = ref();
        const userOptions = ref([]);
       const tresoreries = ref();
       const tresorerieOptions = ref([]);

        onMounted(() => {
        getAllAllUsers();
        getAllTresoreries();
      });
        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getUserTresorerie(newValue);
                isupdate.value = true;
                getAllAllUsers();
                getAllTresoreries();
            }
            btnTitle();
        });
    
        const getUserTresorerie = async (id: number) => {
  return ApiService.get("/userTresoreris/" + id)
    .then(({ data }) => {
      console.log("Données récupérées: ", data);
      const donnees = data.data;

      // Mapper les données dans le formulaire
      for (const key in donnees) {
        usertresorerieForm.value?.setFieldValue(
          key,
          typeof donnees[key] === "object" && donnees[key] !== null
            ? donnees[key].id 
            : donnees[key]  
        );
      }

      if (donnees.user) {
        usertresorerieForm.value?.setFieldValue(
          "bien",
          donnees.user.id
        );
      }

      if (donnees.tresorerie) {
        usertresorerieForm.value?.setFieldValue(
          "bien",
          donnees.tresorerie.id
        );
      }

      emit("openmodal", addUserTresorerieModalRef.value);
    })
    .catch(({ response }) => {
      console.error("Erreur lors de la récupération: ", response);
      error(response.data.message);
    });
};
        const getAllAllUsers= async () => {
          try{
          const response = await ApiService.get('/all/users');
          const usersData = response.data.data;
          console.log("user", usersData);
          userOptions.value = usersData.map((user) => ({
            value: user.id,
            label: `${user.nom} ${user.prenom}`,

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
                title.value = "Modifier la tresorerie ";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter une tresorerie";
                btntext.value = "Ajouter";
            }
        }

        const addUserTresorerie = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as UserTresorerie;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/userTresoreries/${values.id}`, values)
                    .then(({ data }) => {
                        if (data.code == 200) {
                            success(data.message);
                            resetForm();
                            hideModal(addUserTresorerieModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit("refreshUserTresoreries");
                            router.push('/userTresoreries/liste-userTresorerie');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else {
                ApiService.post("/userTresoreries", values)
                    .then(({ data }) => {
                        if (data.code == 201) {
                            success(data.message)
                            resetForm();
                            hideModal(addUserTresorerieModalRef.value);
                            //router.push('/pannes/liste-panne');
                            emit("refreshUserTresoreries");
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
            usertresoreries, title, btntext, resetValue, usertresorerieSchema,
            addUserTresorerie, usertresorerieForm, addUserTresorerieModalRef, usertresorerienew, userOptions, user,
            tresorerieOptions,tresoreries
            //refreshPannes
        };
    },
};
</script>@/models/UserTresorerie