<template>

    <div class="modal fade" id="AddTagModal" tabindex="-1" role="dialog" ref="addTagModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="tagForm" @submit="addTag" :validation-schema="tagSchema">
                        <div class="row">
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Code<span class="text-danger">*</span>
                              </label>
                              <Field name="code" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                              <ErrorMessage name="code" class="text-danger"/>
                            </div>
                          </div>
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Libelle<span class="text-danger">*</span>
                              </label>
                              <Field name="libelle" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                              <ErrorMessage name="libelle" class="text-danger"/>
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
    import { Tag } from '@/models/Tag';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddTagModal",
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
      emits: ["refreshTags",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const tagSchema = Yup.object().shape({
          code: Yup.string().required('Le code est obligatoire'),
          libelle: Yup.string().required('Le libelle est obligatoire'),
         
        });
    
    
        const tagnew = ref(props.id);
        const tagForm =  ref<Tag | null>(null);
        const addTagModalRef = ref<null | HTMLElement>(null);
        let tags= ref<Array<Tag>>([]);
        const title = ref('Ajouter un tag');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getTag(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getTag = async (id: number) => {
          return ApiService.get("/tags/"+id)
          .then(({ data }) => {
            tagForm.value?.setFieldValue("id",data.data.id);
            tagForm.value?.setFieldValue("code",data.data.code);
            tagForm.value?.setFieldValue("libelle",data.data.libelle);
            emit('openmodal', addTagModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier le tag";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un tag";
             btntext.value = "Ajouter";
          }
        }
    
        const addTag = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Tag;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/tags/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addTagModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshTags");
                router.push('/tags/liste-tag');
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }else{
            ApiService.post("/tags",values)
            .then(({ data }) => {
              console.log("DATAYAG ===> ", data)
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addTagModalRef.value);
                //router.push('/tags/liste-tag');
                emit("refreshTags");
              }else{
                error(data.message);
              }
            }).catch(({ response }) => {
              console.log("DATAYAG22 ===> ", response)
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
    
        return {tags, title,btntext, resetValue, tagSchema,
           addTag, tagForm,addTagModalRef,tagnew,
           //refreshTags
           };
      },
    };
    </script>@/models/Tag