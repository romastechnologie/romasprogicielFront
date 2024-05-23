<template>
  <div class="modal fade" id="AddRoleModal" tabindex="-1" role="dialog" ref="addAddRoleModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Ajout de rôle</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <h5>Vous êtes sur le point de complèter de (s) rôle (s) à: {{ selectedUser?.nom }}</h5>
                      <Form ref="passForm" @submit="addRole" :validation-schema="passSchema">
                        <div class="row">
                          <div class="col-md-12 mb-4">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Rôle <span class="text-danger">*</span>
                              </label>
                              <VueMultiselect
                                v-model = "roles"
                                :options="roleOptions"
                                :close-on-select="false"
                                :preserve-search="true"
                                :clear-on-select="false"
                                :multiple="true"
                                :searchable="true"
                                placeholder="Sélectionner le rôle"
                                label="label"
                                track-by="label"
                              />
                              <span class="text-danger" v-if="showMErr">Le rôle est obligatoire</span>
                            </div>
                          </div>
                          <button
                            class="btn btn-primary"
                            type="submit"
                          >
                            Envoyer
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
import { ref, onMounted, watch} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { useRoute } from 'vue-router';
import { User } from '@/models/users';
import VueMultiselect from 'vue-multiselect'
import axios from 'axios';
//import store from "./ListeUser.vue";

export default {
  name: "AddRoleModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    VueMultiselect,

  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
    selectedUser: Object as () => User | undefined,
  },
  setup: (props : any, { emit }: { emit: Function }) => {
    const passSchema = Yup.object().shape({
      //roles: Yup.array().required('Le rôle est obligatoire'),
    });

      const passForm =  ref<User | null>(null);
      const addAddRoleModalRef = ref<null | HTMLElement>(null);
      //const router = useRouter();
      const userForm = ref<User>();
      const route = useRoute();
      const roleOptions = ref([]);
      const roles = ref([])
      const showMErr = ref(false);
      const addRole = async (values:any, {resetForm}: {resetForm: () => void  }) => {
        values['userId']=selectedUser.value?.id
        values['roles']=roles.value.map(role => role.value)
        if(roles.value.length === 0) {
          showMErr.value = true;
        }
        else {
          showMErr.value = false;
        }
      console.log('eokeok', values)
      if(showMErr.value === false) {
        ApiService.post("/roles/users/"+selectedUser.value?.id, values)
        .then(({ data }) => {
          if (data.code == 200) {
          success(data.message);
          resetForm();
          hideModal(addAddRoleModalRef.value);
          emit('close');
          emit('getAllUsers',data.data);
        }
        }).catch(({ response }) => {
          error(response.data.message);
        });
      }
      // else{
      //   showMErr.value = true;
      // }
      
    };

    function getUser(id:number) {
      ApiService.get("/users/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            userForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const selectedUser = ref<User | undefined>(undefined);
    const selectedUserId = ref<number>();

    watch(() => props.selectedUser, (newValue) => {
      selectedUser.value = newValue;
      if(newValue){
        selectedUserId.value = newValue.id;
        fetchRoles(selectedUserId.value);
      }
    });

    onMounted(() => {
      if(route.params.id) {
        getUser(parseInt(route.params.id as string));
      }
    });

    const fetchRoles = async (userId:any) => {
      try {
        if (selectedUserId.value) {
          const response = await axios.get(`/resteante/roles/${userId}`);
          const rolesData = response.data.data;
          roleOptions.value = rolesData.map((role:any) => ({
            value: role.id,
            label: role.nom,
          }));
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des rôles :", error);
      }
    };

    return {passSchema,
      addRole,
      passForm,
      addAddRoleModalRef,
      getUser,roleOptions,
      selectedUserId,
      roles,
      showMErr
    };
  },
};
</script>