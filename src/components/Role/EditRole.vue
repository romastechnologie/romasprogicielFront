<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form">
    <Form ref="roleForm" @submit="editRole" :validation-schema="roleSchema" :initial-values="role">
      <div class="row">
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="text" readonly="true"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nom" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Description <span class="text-danger">*</span>
                </label>
                <Field
                  type="text"  readonly="true"
                  class="form-control shadow-none fs-md-15 text-black"
                  placeholder="Ecriver la description"
                  name="description"
                />
                <ErrorMessage name="description" class="text-danger"/>
              </div>
            </div>
          <!-- <div class="mb-7">
            <div class="row ">
              <div class="col-xl-3 col-md-3" v-for="(privilege, index) in permissions" :key="index">
                <label class="form-check form-check-sm form-check-custom form-check-solid me-5 mb-5 me-lg-20">
                      <Field class="form-check-input" type="checkbox" :value="privilege.id" name="privileges"/>
                      <span class="form-check-label">{{privilege.description}}</span>
                  </label>
              </div>
              <ErrorMessage name="privileges" class="text-danger"/>
            </div>
            <Field class="form-check-input" type="checkbox" visibility="hidden" :value="null" style="opacity:0;" name="privileges"/>
          </div> -->
          <div class="mb-7">
            <div class="row">
                <div class="col-xl-3 col-md-3" v-for="(privilege, index) in permissions" :key="index">
                      <div class="d-flex align-items-center">
                        <Field class="form-check-input m-r-5" type="checkbox" :value="privilege.id" name="privileges"/>
                          <p>{{ privilege.description }}</p>
                      </div>
                <ErrorMessage name="privileges" class="text-danger"/>
                <Field class="form-check-input" type="checkbox" visibility="hidden" :value="null" style="opacity:0;" name="privileges"/>
                </div>
            </div>
          </div>
        <div class="col-md-12">
          <div class="d-flex align-items-center ">
            <button
            class="btn btn-success me-3"
              type="submit"
            >
                Complèter
            </button>
            <router-link to="/roles/liste-role" 
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

import { defineComponent, onMounted, ref} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import { Permission, Role } from '@/models/Role';


export default defineComponent({
    name: "EditRole",
    components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup: () => {
    const roleSchema = Yup.object().shape({
      //nom: Yup.string().required('Le nom est obligatoire'),
      //description: Yup.string().required("La description est obligatoire"),
      privileges:Yup.array().required('Les privilèges sont obligatoires')
    });

    onMounted(() => {
      id.value = route.params.id as string;
      if (id.value) {
        getAllPermissions(id.value)
        getRole(id.value);
      }
    });


    const privileges = ref<Array<string>>([]);
    const roleForm =  ref<Role>();
    const permissionOptions = ref([]);
    const router = useRouter();
    const permissions= ref<Array<Permission>>([]);
    let role = ref<Role>();
    const id = ref<string>("");
    const route = useRoute();

    const editRole = async (values:any) => {
      values['idRole'] = id.value;
      ApiService.post("/roles/permissions",values)
      .then(({ data }) => {
        if(data.code == 200) { 
          success(data.message)
          router.push({ name: "ListeRolePage" });
        }
      }).catch(({ response }) => {
        error(response.message);
      });
    }

    function getAllPermissions(id:string) {
      ApiService.get('/resteante/permissions/'+ id)
      .then(({ data }) => {
        permissions.value = data.data;
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    } 

    async function getRole(id:string) {
     await ApiService.get("/roles/simple",id)
      .then(({ data }) => {
          role.value = data.data;
          privileges.value = data.data.privileges;
          roleForm.value?.setFieldValue('nom',data.data.nom)
          roleForm.value?.setFieldValue('id',data.data.id)
          roleForm.value?.setFieldValue('description',data.data.description)
        })
      .catch(({ response }) => {
        error(response.message);
    });
  } 

    return {role, roleSchema, editRole, roleForm, permissions, permissionOptions, privileges};
  }
});
</script>