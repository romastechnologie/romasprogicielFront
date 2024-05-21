<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing " >
          <Form ref="userForm" @submit="addUser" :validation-schema="userSchema">
            <div class="row">
              <div class="col-md-4 mb-4">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold">
                    Nom <span class="text-danger">*</span>
                  </label>
                  <Field name="nom" type="text" 
                class="form-control" placeholder="Entrer le nom"/>
                  <ErrorMessage name="nom" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold">
                    Prénom <span class="text-danger">*</span>
                  </label>
                  <Field name="prenom" type="text" 
                class="form-control" placeholder="Entrer le prénom"/>
                  <ErrorMessage name="prenom" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold">
                    Téléphone <span class="text-danger">*</span>
                  </label>
                  <Field name="telephone" type="text"
                class="form-control"    placeholder="Entrer le numéro de téléphone"
                  />
                  <ErrorMessage name="telephone" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold">
                    Email <span class="text-danger">*</span>
                  </label>
                  <Field
                    type="email" 
                    class="form-control"
                    placeholder="Entrer l'email"
                    name="email"
                  />
                  <ErrorMessage name="email" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div class="form-group">
                  <label class="d-block text-black fw-semibold">
                    Sexe <span class="text-danger">*</span>
                  </label>
                  <Field  name="sexe"  type="text"  v-slot="{ field }">
                    <!-- <Multiselect
                    :searchable = "true"
                    :options = "['Masculin', 'Féminin']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le sexe"
                    /> -->
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
              <div class="col-md-6 mb-4">
                <div class="form-group mb-10 mb-sm-15 mb-md-17">
              <label class="d-block text-black fw-semibold mb-10">
                Mot de passe <span class="text-danger">*</span>
              </label>
              <Field name="password" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le mot de passe"/>
                <ErrorMessage name="password" class="text-danger"/>
            </div>
              </div>
            <div class="col-md-6 mb-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Rôle <span class="text-danger">*</span>
                </label>
                <Field  name="roles"  v-slot="{ field }">
                  <VueMultiselect
                    v-model = "field.value"
                    @update:model-value="val => field.value = val"
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
                <ErrorMessage name="roles" class="text-danger"/>
              </div>
            </div>
              
          <div class="col-md-12">
            <div class="mt-4">
              <button
              class="btn btn-success me-3"
                type="submit">
                  Créer un utilisateur
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
  </template>
  
  <script lang="ts">
    import { defineComponent, onMounted, ref} from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import Multiselect from '@vueform/multiselect'
    import axios from 'axios';
    import ApiService from '@/services/ApiService';
    import { error, success } from '@/utils/utils';
    import { useRouter } from 'vue-router';
    import { User } from '@/models/users';
    import VueMultiselect from 'vue-multiselect'

  export default defineComponent({
      name: "AddUser",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect,
  },
  
  setup: () => {
    const userSchema = Yup.object().shape({
      email: Yup.string().email("L'email est invalide").required('L\'email   est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
      prenom: Yup.string().required('Le prénom obligatoire'),
      telephone : Yup.number()
      .typeError('Le téléphone doit être un nombre')
      .required('Le téléphone est obligatoire')
      .test(
        'is-six-digits',
        'Le téléphone doit avoir exactement 6 chiffres',
        value => (value ? /^[0-9]{6}$/.test(value.toString()) : true)
      ),
      password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
      //roles: Yup.array().required('Le rôle est obligatoire'),
    });

    const roleOptions = ref([]);
    const passwords = ref<string>("");
    const router = useRouter();
    const userForm = ref<User | null>(null);
    const  codepay= ref();
    const  nationalnumlber= ref();
    const telephone=ref();
    const validPhone=ref<boolean>(false);
    const numberPhone=ref();
    const value = ref('')

    onMounted(() => {
      fetchRoles();
      passwords.value=password();
      userForm.value?.setFieldValue("password",passwords.value);
    });

    // function onInput(phone, phoneObject, input) {
    //   //
    // }

    // function validate(phoneObject) {
    //   validPhone.value = phoneObject.valid;
    //   if (phoneObject.valid == true) {
    //     telephone.value = phoneObject.number;
    //     codepay.value= phoneObject.countryCallingCode;
    //     nationalnumlber.value = phoneObject.nationalNumber;
    //     numberPhone.value = phoneObject.nationalNumber;

    //   }else{
    //     telephone.value="";
    //     codepay.value= "";
    //     nationalnumlber.value= "";
    //     numberPhone.value="";
    //   }
    // }
    
    function password():string{
      let charactersArray = 'a-z,A-Z,0-9,#'.split(',')
      let CharacterSet = '';
      let password = '';
      let size = 12;
      /* switch (this.strengthLevel) {
        case 12:
            size = 10
            charactersArray = 'a-z,A-Z'.split(',')
            break
        case 24:
            size = 12
            charactersArray = 'a-z,A-Z,0-9'.split(',')
            break
        case 36:
            size = 14
            charactersArray = 'a-z,A-Z,0-9,#'.split(',')
            break
        case 48:
            size = 16
            charactersArray = 'a-z,A-Z,0-9,#'.split(',')
        break
      }*/

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

    const roles = ref([])
    const addUser = async (values:any, {resetForm}) => {
      values['roles']=roles.value.map(role => role.value)
      console.log('Données envoyées', values)
      ApiService.post("/users",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            //resetForm();
            console.log('flefelef')
            router.push({ name: "ListeUser" });
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
          label: `${role.nom}`
        }));
      } catch (error) {
        //
      }
    };
      return {userForm,
         userSchema,
          addUser,
          roleOptions,
          telephone,
          validPhone,
          value,
          password,
          passwords,
          roles,
          // validate,
          // onInput,
        };
    },
  });
  </script>