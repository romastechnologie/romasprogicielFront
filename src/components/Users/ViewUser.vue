<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
              <router-link to="/liste-users" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium" >
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
              
            </div>
            <table class="table">
              <tbody>
                <tr v-if="user?.nom">
                  <td>Nom et prénom</td>
                  <td>{{ user?.nom }} {{ user?.prenom }}</td>
                </tr>
                <tr v-if="user?.telephone">
                  <td>Téléphone</td>
                  <td>{{ user?.telephone }}</td>
                </tr>
                <tr v-if="user?.email">
                  <td>Email</td>
                  <td>{{ user?.email }}</td>
                </tr>
                <tr v-if="user?.sexe">
                  <td>Sexe</td>
                  <td>{{ user?.sexe }}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <div class="row">
                    <div class="col-6" v-for="(rle, index) in userData?.userRoles" :key="index">
                      <div class="d-flex align-items-center py-2">
                        <div class="col-4">
                          <span class="bullet bg-primary me-3"></span>
                          <p class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">{{ rle?.role?.nom }}</p>
                        </div>
                        <div class="col-2">
                          <span class="bullet bg-primary me-3"></span>
                          <span class="badge text-outline-danger">
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="javascript:void(0);"
                              @click="suppRole(rle.id)"
                            >
                              <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i>
                              Supprimer
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import ApiService from "@/services/ApiService";
import { User, UserData } from "@/models/users";
import { error, format_date,separateur,format_Date, suppression, success } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";
//import { emit } from "process";

export default defineComponent({
  name: "ViewUser",
  setup: () => {
    const route = useRoute();
    const user = ref<User | null>(null);
    const users = ref<Array<User>>([]);

    let userData = ref<UserData>();
      const router = useRouter();

    function getUser(id: string) {
      return ApiService.get("/users/"+id)
        .then(({ data }) => {
          userData.value = data.data;
          user.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 

    onMounted(() => {
      const id = route.params.id as string;
      getUser(id);
    });

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

    watch(reloadData, () => {
      getUser(route.params.id as string);
    });

    return { user, getUser, format_date,format_Date, users,separateur,
      suppression,userData,suppRole, reloadData
     };
  },
});
</script>
