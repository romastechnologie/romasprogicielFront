<template>
    <div class="form theme-form">
        <Form ref="userForm" @submit="addUser" :validation-schema="userSchema">
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label>Nom et prénom <span class="text-danger">*</span></label>
                    <Field name="nomComplet" type="text" 
                class="form-control"  placeholder="Entrer le nom et le prénom"/>
                  <ErrorMessage name="nomComplet" class="text-danger"/>
                    <!-- <input class="form-control" type="text" :class="inputclasses" placeholder="Project name *"
                        v-model="title" @input="validated($event.target.value)"> -->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label>Téléphone <span class="text-danger">*</span></label>
                    <Field name="telephone" type="text" 
                class="form-control"  placeholder="Entrer le telephone"/>
                  <ErrorMessage name="telephone" class="text-danger"/>
                    <!-- <input class="form-control" type="text" :class="inputclasses" placeholder="Project name *"
                        v-model="title" @input="validated($event.target.value)"> -->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label>Email <span class="text-danger">*</span></label>
                    <Field
                    type="email"
                    class="form-control"
                    placeholder="Entrer l'email"
                    name="email"
                  />
                  <ErrorMessage name="email" class="text-danger"/>
                    <!-- <input class="form-control" v-model="sites" @input="validated($event.target.value)"
                        :class="inputclasses" type="text" placeholder="Name client or company name"> -->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mb-3">
                <label >
                  Sexe <span class="text-danger">*</span>
                </label>
                <select class="form-select" name="sexe" v-model="selectedSexe">
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
                </select>
                <div v-if="!selectedSexe" class="text-danger">Le sexe est obligatoire</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mb-3">
                <label >
                  Rôle <span class="text-danger">*</span>
                </label>
                <select class="form-select" name="role" v-model="selectedRole" >
                    <option v-for="role in roleOptions" :key="role.value" :value="role.value">{{ role.label }}</option>
                </select>
                <div v-if="!selectedRole" class="text-danger">Le rôle est obligatoire</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label>Mot de passe <span class="text-danger">*</span></label>
                    <Field name="password" type="text" 
                class="form-control" placeholder="Entrer le mot de passe"/>
                <ErrorMessage name="password" class="text-danger"/>
                </div>
            </div>
        </div>
        
        <!-- <projectRate /> -->
        <!-- <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label>Enter some Details</label>
                    <textarea class="form-control" id="exampleFormControlTextarea4" rows="3" v-model="desc" @input="update($event.target.value)"></textarea>
                </div>
            </div>
        </div>
        <uploadProject /> -->
        <div class="row">
            <div class="col">
                <div class="text-end">
                    <button
                    class="btn btn-success me-3" :disabled="!selectedRole || !selectedSexe"
                    type="submit">
                    Créer un utilisateur
                    </button>
                    <!-- <a class="btn btn-success me-3" target="_blank" @click="add()">Add</a> -->
                    <a
                    class="btn btn-danger" href="/users/user_list">Annuler</a></div>
            </div>
        </div>
    </Form>
</div>

</template>
<!-- <script lang="ts" setup>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { all } from "@/core/data/project"
import { inputclasses, itemclasses } from "@/composables/createProject"
import { useRouter } from 'vue-router'
const projectRate = defineAsyncComponent(() => import("@/components/theme/project/createproject/ProjectRate.vue"))
const uploadProject = defineAsyncComponent(() => import("@/components/theme/project/createproject/UploadProject.vue"))
let formSubmitted = ref<boolean>(false)
let titleError = ref<boolean>(false)
let descError = ref<boolean>(false)
let errors = ref<string | number[]>([])
let title = ref<string>("")
let desc = ref<string>("")
let sites = ref<string>("")
let allprojects = ref()
let router = useRouter()
function add() {
    formSubmitted.value = true;
    errors.value = [];
    if (title.value.length < 5 || desc.value.length < 5) {
        titleError.value = true; descError.value = true;
        errors.value.push();
    } else {
        titleError.value = false; descError.value = false;
        errors.value.push();
        const arr = {
            id: 1,
            title: title, badge: "Doing", box: "b-light1-primary",
            type: "primary progress-bar-striped", font: "primary",
            img: "user/3.jpg", sites: sites,
            desc: desc, issue: "12", resolved: "5",
            comment: "7", like: "+10",
            progress: "70", customers_img1: "user/3.jpg",
            customers_img2: "user/5.jpg", customers_img3: "user/1.jpg"
        }
        allprojects.value.push(arr)
        router.replace('/project/project_list');
    }
}
function validated() {
    if (title.value.length < 5) {
        inputclasses.value = 'is-invalid'
    }
    else {
        inputclasses.value = 'is-valid'
    }
}
function update() {
    if (desc.value.length < 4) {
        itemclasses.value = 'is-invalid'
    }
    else {
        itemclasses.value = 'is-valid'
    }
}
onMounted(() => {
    try {
        allprojects.value = all;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script> -->

<script lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { User } from '@/models/users';
  
  export default defineComponent({
      //name: "AddUser",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
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
      password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
      role: Yup.number().typeError('Veuillez entrer un nombre').required('Le rôle est obligatoire'),
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
    const selectedRole = ref('');
    const selectedSexe = ref('');

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

    const addUser = async (values:any) => {
        console.log('Je suis dans la fonction')
        console.log('nf,fl', values)
      ApiService.post("/users",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            //resetForm();
            router.replace('/user_list');
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
          addUser,
          roleOptions,
          telephone,
          validPhone,
          //validate,
          //onInput,
          selectedRole,
          selectedSexe
        };
    },
  });
  </script>