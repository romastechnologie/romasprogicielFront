<!-- <template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
    <Form ref="permissionForm" @submit="addPermission" :validation-schema="permissionSchema">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nom" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Description <span class="text-danger">*</span>
                </label>
                <Field name="description" cols="30"
                rows="12" as="textarea" placeholder="Description" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                  <textarea
                    v-model="field.value"
                    class="form-control shadow-none rounded-0 text-black"
                  ></textarea>
                </Field>
                <ErrorMessage name="description" class="text-danger"/>
              </div>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit">
              AJouter une permission
            </button>
          </div>
        </Form>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Permission } from '@/models/Permission';
import * as Yup from 'yup';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddPermission",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const permissionSchema = Yup.object().shape({
      description: Yup.string().required('La permission est obligatoire'),
      nom: Yup.string().required('Le nom est obligatoire'),
    });

    const permissionForm = ref<Permission | null>(null);
    const router = useRouter();

    const addPermission = async (values:any, {resetForm}: {resetForm: () => void  }) => {
      console.log('donees envoyees', values)
      ApiService.post("/permissions",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListePermissionPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { permissionSchema, addPermission, permissionForm,
      };
  },
});
</script> -->