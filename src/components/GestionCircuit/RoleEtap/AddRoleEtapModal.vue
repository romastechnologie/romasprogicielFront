<template>

    <div class="modal fade" id="AddRoleEtapModal" tabindex="-1" role="dialog" ref="addRoleEtapModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="roleEtapForm" @submit="addRoleEtap" :validation-schema="roleEtapSchema">
                        <div class="row">
                         
                              <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Code <span class="text-danger">*</span>
                              </label>
                              <Field name="code" type="string" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                              <ErrorMessage name="code" class="text-danger"/>
                            </div>
                          </div>
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Libelle <span class="text-danger">*</span>
                              </label>
                              <Field name="libelle" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                              <ErrorMessage name="libelle" class="text-danger"/>
                            </div>     
                          </div>
                      <div class="form-check mt-3 mb-15 mb-sm-20 mb-md-25">
                        <label for="estBloque"  class="form-check-label fw-medium position-relative top-1">
                          Ce rôle peut arrêter le processus
                          <Field 
                          id="estBloque"
                          name="estBloque" 
                          class="form-check-input shadow-none"
                          v-model="estBloque"
                          :value="true"
                          :unchecked-value="false"
                          type="checkbox"
                          placeholder="Entrer ordre"/>
                        </label>
                        
                        <ErrorMessage name="estBloque" class="text-danger" />
                      </div>
                        <div class="col-md-12 mb-3">
                        <div class="form-group mb-15 mb-sm-20 mb-md-25">
                          <label class="d-block text-black fw-semibold mb-10">
                            Ordre<span class="text-danger">*</span>
                          </label>
                          <Field name="ordre" type="number" 
                          class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer ordre"/>
                          <ErrorMessage name="ordre" class="text-danger"/>
                        </div>
                      </div>
                          <button
                            class="btn btn-primary"
                            type="submit">
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
    import { ref, watch } from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import ApiService from '@/services/ApiService';
    import { error, hideModal, success } from '@/utils/utils';
    import { RoleEtap } from '@/models/RoleEtap';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddRoleEtapModal",
      components: {
        Form,
        Field,
        ErrorMessage
      },
      props:{
        id: {
          type: Number,
          required: true,
          default:0
        },
      },
      emits: ["refreshRoleEtaps",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const roleEtapSchema = Yup.object().shape({
        code: Yup.string().required("le code est obligatoire."),
        libelle: Yup.string().required("le libellé est obligatoire."),
        ordre: Yup.number().required("L'ordre est obligatoire."),
        });
    
    
        const roleEtapnew = ref(props.id);
        const roleEtapForm =  ref<RoleEtap | null>(null);
        const addRoleEtapModalRef = ref<null | HTMLElement>(null);
        let roleEtaps= ref<Array<RoleEtap>>([]);
        const title = ref('Ajouter un roleEtap');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
        const estBloque = ref(false);

        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getRoleEtap(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    

        watch(estBloque, (newValue) => {
  console.log("Valeur de estBloque modifiée :", newValue);
});
        const getRoleEtap = async (id: number) => {
          return ApiService.get("/roleetaps/"+id)
          .then(({ data }) => {
            roleEtapForm.value?.setFieldValue("id",data.data.id);
            roleEtapForm.value?.setFieldValue("code",data.data.code);
            roleEtapForm.value?.setFieldValue("libelle",data.data.libelle);
            roleEtapForm.value?.setFieldValue("ordre",data.data.ordre);
            roleEtapForm.value?.setFieldValue("estBloque",data.data.estBloque);

            emit('openmodal', addRoleEtapModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier le roleEtap";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un roleEtap";
             btntext.value = "Ajouter";
          }
        }   
const addRoleEtap = async (values: any, { resetForm }: { resetForm: () => void }) => {
  values = values as RoleEtap;
  console.log("Valeurs envoyées à l'API :", values); // Debug
  loading.value = false;
  if (isupdate.value) {
    ApiService.put(`/roleetaps/${values.id}`, values)
      .then(({ data }) => {
        if (data.code === 200) {
          success(data.message);
          resetForm();
          hideModal(addRoleEtapModalRef.value);
          isupdate.value = false;
          btnTitle();
          emit("refreshRoleEtaps");
          router.push({ name: "ListeRoleEtapPage" });
        }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
  } else {
    ApiService.post("/roleetaps", values)
      .then(({ data }) => {
        if (data.code === 201) {
          success(data.message);
          resetForm();
          hideModal(addRoleEtapModalRef.value);
          emit("refreshRoleEtaps");
        }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
  }
};


        const resetValue = () => {
          const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
          isupdate.value=false;
          formFields.forEach(field => {
            field.value = '';
          });
          btnTitle()
        };
    
        return {roleEtaps, title,btntext, resetValue, roleEtapSchema,
           addRoleEtap, roleEtapForm,addRoleEtapModalRef,roleEtapnew,estBloque,
           //refreshRoleEtaps
           };
      },
    };
    </script>@/models/RoleEtap