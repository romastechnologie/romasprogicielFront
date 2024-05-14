<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="userForm" @submit="editUser" :validation-schema="userSchema" :initial-values="userForm">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Nom et prénom <span class="text-danger">*</span>
                  </label>
                  <Field name="nomComplet" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom et le prénom"/>
                  <ErrorMessage name="nomComplet" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
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
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Email
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
              <div class="col-md-6">
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
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Rôle <span class="text-danger">*</span>
                </label>
                <Field  name="role"  v-slot="{ field }">
                  <VueMultiselect
                    v-model = "field.value"
                    v-bind = "field"
                    :options="roleOptions"
                    :close-on-select="true"
                    :clear-on-select="false"
                    :multiple="true"
                    :searchable="true"
                    placeholder="Sélectionner le rôle"
                    label="label"
                    track-by="label"
                  />
                </Field>
                <ErrorMessage name="role" class="text-danger"/>
              </div>
            </div>
          <div class="col-md-12">
            <div class="mt-4">
              <button
              class="btn btn-success me-3"
                type="submit">
                  Modifier un utilisateur
              </button>
              <router-link to="/users/liste-user" 
                class=" btn btn-danger"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, onMounted, ref} from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import Multiselect from '@vueform/multiselect'
    import axios from 'axios';
    import ApiService from '@/services/ApiService';
    import { error, success } from '@/utils/utils';
    import { useRouter, useRoute } from 'vue-router';
    import { User } from '@/models/users';
    import VueMultiselect from 'vue-multiselect'
  
  export default defineComponent({
      name: "EditUser",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
  },
  
  setup: () => {
    const userSchema = Yup.object().shape({
      email: Yup.string().email("L'email est invalide").required('L\'email   est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      nomComplet: Yup.string().required('Le nom et le prénom sont obligatoires'),
      telephone : Yup.number()
      .typeError('Le téléphone doit être un nombre')
      .required('Le téléphone est obligatoire')
      .test(
        'is-six-digits',
        'Le téléphone doit avoir exactement 6 chiffres',
        value => (value ? /^[0-9]{6}$/.test(value.toString()) : true)
      ),
      password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').notRequired(),
      role: Yup.number().typeError('Veuillez entrer un nombre').required('Le rôle est obligatoire'),
    });

    const roleOptions = ref([]);
    const passwords = ref<string>("");
    const router = useRouter();
    const userForm = ref<User>();
    const route = useRoute();
    const  codepay= ref();
    const  nationalnumlber= ref();
    const telephone=ref();
    const validPhone=ref<boolean>(false);
    const numberPhone=ref();

    onMounted(() => {
      fetchRoles();
      passwords.value=password();
      userForm.value?.setFieldValue("password",passwords.value);
      if(route.params.id) {
        getUser(parseInt(route.params.id as string));
      }
    });

    function password():string{
      let charactersArray = 'a-z,A-Z,0-9,#'.split(',')
      let CharacterSet = '';
      let password = '';
      let size = 12;

      if (charactersArray.indexOf('a-z') >= 0) {
        CharacterSet += 'abcdefghijklmnopqrstuvwxyz'
      }

      if (charactersArray.indexOf('A-Z') >= 0) {
        CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }
      
      if (charactersArray.indexOf('0-9') >= 0) {
        CharacterSet += '0123456789'
      }

      if (charactersArray.indexOf('#') >= 0) {
        CharacterSet += '@$!%*?&#'
      }

      for (let i = 0; i < size; i++) {
        password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length))
      }
      return password
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

    const editUser = async (values:any) => {
      ApiService.put("/users/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            //resetForm();
            router.push({ name: "ListeUserPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('/roles');
        const rolesData = response.data.data;
        roleOptions.value = rolesData.map((role:any) => ({
          value: role.id,
          label: role.nom,
        }));
      } catch (error) {
        //
      }
    };
      return {userForm,
         userSchema,
          editUser,
          roleOptions,
          telephone,
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