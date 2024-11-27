<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
      <Form ref="userForm" @submit="addUser" :validation-schema="userSchema">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Personnel <span class="text-danger">*</span>
              </label>
              <Field name="personnelId" v-model="personnelId" v-slot="{ field }">
                <Multiselect @select="selectPersonnel(field.value)" v-model="field.value" v-bind="field"
                  :options="personnelOptions" :close-on-select="true" :clear-on-select="false" :multiple="false"
                  :searchable="true" placeholder="Sélectionner le personnel" label="label" track-by="label" />
              </Field>
              <!-- <ErrorMessage name="personnelId" class="text-danger" /> -->
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Nom <span class="text-danger">*</span>
              </label>
              <Field v-model="selectpersonnel.nom" name="nom" type="text" class="form-control"
                placeholder="Entrer le nom" disabled />
              <ErrorMessage name="nom" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Prénom <span class="text-danger">*</span>
              </label>
              <Field v-model="selectpersonnel.prenom" name="prenom" type="text" class="form-control"
                placeholder="Entrer le prénom" disabled />
              <ErrorMessage name="prenom" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Téléphone <span class="text-danger">*</span>
              </label>
              <Field v-model="selectpersonnel.telephone" name="telephone" type="text" class="form-control"
                placeholder="Entrer le numéro de téléphone" disabled />
              <ErrorMessage name="telephone" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Email <span class="text-danger">*</span>
              </label>
              <Field v-model="selectpersonnel.email" type="email" class="form-control" placeholder="Entrer l'email"
                name="email" disabled />
              <ErrorMessage name="email" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold">
                Sexe <span class="text-danger">*</span>
              </label>
              <Field name="sexe" type="text" v-slot="{ field }">
                <!-- <Multiselect
                    :searchable = "true"
                    :options = "['Masculin', 'Féminin']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le sexe"
                    /> -->
                <Multiselect v-model="field.value" v-bind="field" :options="['Masculin', 'Féminin']"
                  :close-on-select="true" :clear-on-select="false" placeholder="Sélectionner le sexe" />
              </Field>
              <ErrorMessage name="sexe" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-10 mb-sm-15 mb-md-17">
              <label class="d-block text-black fw-semibold mb-10">
                Mot de passe <span class="text-danger">*</span>
              </label>
              <Field name="password" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le mot de passe" />
              <ErrorMessage name="password" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Rôle <span class="text-danger">*</span>
              </label>
              <Multiselect 
                v-model="roles" 
                :options="roleOptions" 
                :close-on-select="true" 
                :preserve-search="true"
                :clear-on-select="false" 
                :multiple="true" 
                :searchable="true" 
                placeholder="Sélectionner le rôle"
                label="label" 
                track-by="label" />
              <span class="text-danger" v-if="showMErr">Le rôle est obligatoire</span>
            </div>
          </div>

          <div class="col-md-12">
            <div class="mt-4">
              <button class="btn btn-success me-3" type="submit">
                Créer un utilisateur
              </button>
              <router-link to="/utilisateurs/liste-utilisateur" class=" btn btn-danger"><i
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
import { defineComponent, onMounted, ref } from 'vue';
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
      // personnelId: Yup.number().required('Le personnel est obligatoire'),
      email: Yup.string().email("L'email est invalide").required('L\'email   est obligatoire'),
      sexe: Yup.string().required('Le sexe est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
      prenom: Yup.string().required('Le prénom obligatoire'),
      telephone: Yup.number()
        .typeError('Le téléphone doit être un nombre')
        .required('Le téléphone est obligatoire')
        .test(
          'is-six-digits',
          'Le téléphone doit avoir exactement 6 chiffres',
          value => (value ? /^[0-9]{8}$/.test(value.toString()) : true)
        ),
      password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
      //roles: Yup.array().required('Le rôle est obligatoire'),
    });

    const selectpersonnel = ref({
      nom: "",
      prenom: "",
      email: "",
      telephone: ""
    })

    const roleOptions = ref([]);
    const personnelOptions = ref([]);
    const passwords = ref<string>("");
    const router = useRouter();
    const userForm = ref<User | null>(null);
    const codepay = ref();
    const nationalnumlber = ref();
    const telephone = ref();
    const validPhone = ref<boolean>(false);
    const numberPhone = ref();
    const value = ref('')
    const personnels = ref([] as any[]);

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

    function password(): string {
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
    const showMErr = ref(false);
    const roles = ref([]);
    let roles_ = ref([]);
    const personnelId = ref();

    const addUser = async (values: any, { resetForm }) => {
      console.log("Valeurs du formulaire: ", values);
      values['roles'] = roles.value;
      values['personnel'] = personnelId.value;
      if (roles.value.length === 0) {
        showMErr.value = true;
      }
      else {
        showMErr.value = false;
      }
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/users", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              //resetForm();
              console.log('flefelef')
           //   router.push({ name: "ListeUserP" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('/roles');
        const rolesData = response.data.data;
        roles_ = rolesData;
        roleOptions.value = rolesData.map((role: any) => ({
          value: role.id,
          label: `${role.nom}`
        }));
      } catch (error) {
        //
      }
    };

    const getAllPersonnel = async () => {
      try {

        const response = await ApiService.get('/all/personnels');
        //console.log("personnels reccuperer avec succes", response.data.data.data);
        personnels.value = response.data.data.data;

        personnelOptions.value = response.data.data.data.map((personnel: any) => ({
          value: personnel.id,
          label: `${personnel.nom + " " + personnel.prenom}`
        }));
        
      } catch (error) {
        console.error('Erreur lors de la recupération des personnels:', error);
        throw error;
      }
    }

    const selectPersonnel = (id: any) => {
      console.log("L'id du personnel sélectionné: ", id);
      const personnel = personnels.value.find(personnel => personnel.id == id);
      console.log("Personnel sélectionné: ",  personnel );

      selectpersonnel.value.nom = personnel.nom;
      selectpersonnel.value.prenom = personnel.prenom;
      selectpersonnel.value.telephone = personnel.telephone;
      selectpersonnel.value.email = personnel.email;
      console.log("Personnel sélectionné: ", personnel)
    }

    onMounted(() => {
      getAllPersonnel();
      fetchRoles();
      passwords.value = password();
      userForm.value?.setFieldValue("password", passwords.value);
    })

    return {
      userForm,
      userSchema,
      addUser,
      roleOptions,
      telephone,
      validPhone,
      value,
      roles,
      showMErr,
      personnelOptions,
      personnelId,
      selectpersonnel,
      selectPersonnel
      // validate,
      // onInput,
    };
  },
});
</script>