  <template>
  <div class="row">

    <div class="col-xl-4">
      <!-- My Profile Card -->
      <div class="card">
        <!-- Card Header -->
        <div class="card-header">
          <h4 class="card-title mb-0">Profile : <span class="badge badge-primary f-w-500 background-light-primary font-primary">Actif</span></h4>
          <!-- Card Options -->
          <div class="card-options">
            <a class="card-options-collapse" href="#" data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
            <a class="card-options-remove" href="#" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a>
          </div>
        </div>

        <!-- Card Body For user -->
        <div class="card-body">
          <Form ref="passForm" @submit="editUserPass"  :validation-schema="editUserPass">
              <div class="row mb-2">
                  <div class="profile-title">
                      <div class="d-flex"> <img class="img-70 rounded-circle" alt="" src="@/assets/images/user/admin.jpg">
                          <div class="flex-grow-1" style="margin-left: 10px">
                              <h4 class="">{{ user?.nom }} {{ user?.prenom }}</h4>
                              <p class="">{{ user?.email }}</p>
                              
                          </div>
                      </div>
                  </div>
              </div>
          <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                  Mot de passe <span class="text-danger">*</span>
              </label>
              <Field name="newPassword" type="text" 
                class="form-control shadow-none fs-md-15 text-black"/>
                <ErrorMessage name="newPassword" class="text-danger"/>
                  <ErrorMessage name="newPassword" class="text-danger"/>
              </div>
          </div>
          <div class="form-footer">
            <div class="col-md-12 mb-3">
              <div class="d-flex align-items-center ">
                <button
                class="btn btn-primary me-3"
                  type="submit">
                    Modifier le mot de passe
                </button>
              </div>
            </div>
          </div>
      </Form>
      </div>

      <!-- Card Body For profile -->
      <!-- <div class="card-body">
        <Form ref="passForm" @submit="editUserPass" :validation-schema="passSchema">
          <div class="row">
            <div class="col-md-12 mb-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                    Nouveau mot de passe
                </label>
                <Field name="newPassword" type="text" 
                    class="form-control shadow-none fs-md-15 text-black"/>
                    <ErrorMessage name="newPassword" class="text-danger"/>
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
      </div> -->

      </div>
    </div>

    <!-- Informations de l'utilisateur Form -->
    <div class="col-xl-8">
      <!-- Edit Profile Form -->
      <Form class="card" ref="userForm" @submit="editUser" :validation-schema="userSchema" :initial-values="userForm">
        <!-- Card Header -->
        <div class="card-header">
          <h4 class="card-title mb-0">Modifier les informations</h4>
          <!-- Card Options -->
          <div class="card-options">
            <a class="card-options-collapse" href="#" data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
            <a class="card-options-remove" href="#" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a>
          </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-2">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold">
                    Nom <span class="text-danger">*</span>
                  </label>
                  <Field name="nom" type="text" 
                class="form-control" placeholder="Entrer le nom"/>
                  <ErrorMessage name="nom" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-2">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold">
                    Prénom <span class="text-danger">*</span>
                  </label>
                  <Field name="prenom" type="text" 
                class="form-control" placeholder="Entrer le prénom"/>
                  <ErrorMessage name="prenom" class="text-danger"/>
                </div>
              </div>
                <div class="col-md-4 mb-2" >
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Téléphone <span class="text-danger">*</span>
                    </label>
                    <Field name="telephone" type="text"
                  class="form-control shadow-none fs-md-15 text-black"    placeholder="Entrer le numéro de téléphone"
                    />
                    <ErrorMessage name="telephone" class="text-danger"/>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Email <span class="text-danger">*</span>
                    </label>
                    <Field
                      type="email" 
                      class="form-control shadow-none fs-md-15 text-black"
                      placeholder="Entrer l'email"
                      name="email"
                    />
                    <ErrorMessage name="email" class="text-danger"/>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Sexe <span class="text-danger">*</span>
                    </label>
                    <Field  name="sexe"  type="text"  v-slot="{ field }">
                      <VueMultiselect
                      v-model = "field.value"
                      v-bind = "field"
                      :options="['Masculin', 'Féminin']"
                      :close-on-select="true"
                      :clear-on-select="false"
                      placeholder="Sélectionner le sexe"
                    />
                    </Field>
                    <ErrorMessage name="sexe" class="text-danger"/>
                  </div>
                </div>
          </div>
        </div>
        <!-- Card Footer -->
        <div class="card-footer text-end">
          <div class="col-md-12">
              <div class="mt-4">
                <button
                class="btn btn-primary me-3"
                  type="submit">
                    Modifier un utilisateur
                </button>
                <router-link to="/utilisateurs/liste-utilisateur" 
                  class=" btn btn-danger"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                  <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
        </div>
      </Form>
    </div>
  </div>

  
  <div class="col-md-12">
      <div class="card">
          <div class="card-header">
                  <div class="card-title">
                    <h4 >Rôles
                      <h5 style="float:right">
                        <a
                          class="btn btn-primary btn-sm"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#AddRoleModal"
                          @click="openAddRoleModal(user)"
                        >
                        <i class="fa fa-lock lh-2 me-8 position-relative top-1"></i>
                        Ajouter un rôle
                        </a>
                      </h5>
                    </h4>
                  </div>
          </div>
          <div class="table-responsive add-project">
              <table class="table card-table table-vcenter text-nowrap">
                  <thead>
                      <tr>
                          <th class="text-inherit">Nom du rôle</th>
                          <th class="text-inherit">Description</th>
                          <th class="text-inherit">Date affectation</th>
                          <th class="text-inherit">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(rle, index) in userData?.userRoles" :key="index">
                          <td><a class="text-inherit" href="#">{{ rle?.role?.nom }}</a></td>
                          <td><a>{{ rle?.role?.description }}</a></td>
                          <td>{{ rle?.dateAffectation }}</td>
                          <td >
                            <!-- <a class="icon" href="javascript:void(0)"></a>
                            <a class="btn btn-primary btn-sm" href="javascript:void(0)"><i class="fa fa-pencil"></i>
                            Edit</a> -->
                            <a class="icon" href="javascript:void(0)"></a><a class="btn btn-danger btn-sm" @click="suppRole(rle.id)"
                            href="javascript:void(0)"><i class="fa fa-trash"></i> Supprimer</a></td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
  <AddRoleModal :selectedUser="selectedUser" :selectedUserId="selectedUserId"/>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref, watch} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter, useRoute } from 'vue-router';
import VueMultiselect from 'vue-multiselect'
import { User, UserData } from "@/models/users";
import AddRoleModal from "./AddRoleModal.vue";
import { useAuthStore } from "@/services/auth";
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "EditUser",
  components: {
  Form,
  Field,
  ErrorMessage,
  Multiselect,
  VueMultiselect,
  AddRoleModal,

},

setup: () => {

    //Utilisateur Info
    const userSchema = Yup.object().shape({
      email: Yup.string().email("L'email est invalide").required('L\'email   est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
      prenom: Yup.string().required('Le prénom est obligatoire'),
      telephone : Yup.number()
      .typeError('Le téléphone doit être un nombre')
      .required('Le téléphone est obligatoire')
      .test(
        'is-six-digits',
        'Le téléphone doit avoir exactement 6 chiffres',
        value => (value ? /^[0-9]{8}$/.test(value.toString()) : true)
      ),
    });
      
    //Utilisateur connexté
    const passSchema = Yup.object().shape({
      newPassword: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
    });

    const userPassForm = ref<User>();
    const passForm =  ref<User | null>(null);
    const userForm = ref<User>();

    const store = useAuthStore();

    const roleOptions = ref([]);
    const passwords = ref<string>("");
    const router = useRouter();
    const route = useRoute();
    const  codepay= ref();
    const  nationalnumlber= ref();
    const telephone=ref();
    const validPhone=ref<boolean>(false);
    const numberPhone=ref();
    const passId = ref()

    onMounted(() => {
      //fetchRoles();
      //userForm.value?.setFieldValue("password",passwords.value);
      if(route.params.id) {
        getUser(parseInt(route.params.id as string));
      }
      const id = route.params.id as string;
      const passId = id;
      console.log('rekpek', passId)
      getUserInfo(id);
      if (JwtService.getUserId()) {
          getUserOnly(JwtService.getUserId());
        }
    });

    
    const selectedUser = ref<User | undefined>(undefined);
    const selectedUserId = ref<number>();

    const openAddRoleModal = (user: User) => {
      selectedUser.value = { ...user };
      selectedUserId.value = user.id;
    };

    function getUserOnly(id: string | null) {
          ApiService.get("/users/" + id)
            .then(({ data }) => {
              for (const key in data.data) {
                userPassForm.value?.setFieldValue(
                  key,
                  typeof data.data[key] === 'object' && data.data[key] !== null
                    ? data.data[key].id
                    : data.data[key]
                );
              }
            })
            .catch(({ response }) => {
              error(response.message);
              //router.push({ name: "userForms-liste" });
            });
        }

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

    const user = ref<User | null>(null);
    const users = ref<Array<User>>([]);
    let userData = ref<UserData>();

    function getUserInfo(id: string) {
      return ApiService.get("/users/"+id)
        .then(({ data }) => {
          userData.value = data.data;
          user.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 

    const editUser = async (values) => {
      ApiService.put("/users/" + values.id, values)
        .then(({ data }) => {
          if (data.code === 200) { 
            console.log('Fait avec succès ');
            success(data.message);
            //resetForm();
            router.push({ name: "ListeUser" });
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const editUserPass = async (values:any) => {
        const passData = {
          id: parseInt(route.params.id as string),
          newPassword: values.newPassword,
        };
        console.log('rllr,e', passData)
      ApiService.put("users/password/admin/"+passData.id, passData)
        .then(({ data }) => {
          if (data.code == 200) {
          success(data.message);
          //resetForm();
          router.push({ name: "ListeUser" });
        }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };
    // const fetchRoles = async () => {
    //   try {
    //     const response = await axios.get('/roles');
    //     const rolesData = response.data.data;
    //     roleOptions.value = rolesData.map((role:any) => ({
    //       value: role.id,
    //       label: role.nom,
    //     }));
    //   } catch (error) {
    //     //
    //   }
    // };


    const reloadData = ref(false);

    const suppRole = async (id:any) => {
      console.log('Supprimer', id)
      ApiService.delete("/roles/users/"+id)
        .then(({ data }) => {
          if(data.code == 200) { 
            console.log('Supprimé')
            success(data.message);
            reloadData.value = !reloadData.value; 
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    // watch(reloadData, () => {
    //   getUserInfo(route.params.id as string);
    // });

  return {userForm,
      userSchema,
      editUser,
      roleOptions,
      telephone,
      //getUserInfo,
      user,
      users,
      userData,
      openAddRoleModal,
      selectedUserId,
      selectedUser,
      reloadData,
      suppRole,
      editUserPass,
      userPassForm,
      passSchema,
      passId,
      //validPhone,
      // validate,
      // onInput,
      // bureauselect,
      // getBureau,
      // bureauxOptions
    };
},
});
</script>