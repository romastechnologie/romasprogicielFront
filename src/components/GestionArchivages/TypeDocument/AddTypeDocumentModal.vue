<template>
  <div class="modal fade" id="AddTypeDocumentModal" tabindex="-1" role="dialog" ref="addTypeDocumentModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="typeDocumentForm" @submit="addTypeDocument" :validation-schema="typeDocumentSchema">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Code <span class="text-danger">*</span>
                </label>
                <Field name="code" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                <ErrorMessage name="code" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libellé <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                <ErrorMessage name="nom" class="text-danger"/>
              </div>
            </div>
            
            
            <button
              class="btn btn-primary mt-3"
            >
            {{ btntext }}
            </button>
      </div>
        </Form>
        </div>
        <!-- <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';
import { hideModal } from '@/utils/utils';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { TypeDocument } from '@/models/TypeDocument';

export default defineComponent({
    name: "AddTypeDocumentModal",
    components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }){
    const typeDocumentSchema = Yup.object().shape({
      nom: Yup.string().required('Le nom est obligatoire'),
      code: Yup.string().required('Le code est obligatoire'),

    });

    const typeDocumentForm = ref<TypeDocument | null>(null);
    const addTypeDocumentModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typeDocumentOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un type Document");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTypeDocument(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le type de Document";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un type de Document";
         btntext.value = "Ajouter";
      }
    }

    const getTypeDocument = async (id: number) => {
      return ApiService.get("/typeDocuments/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          typeDocumentForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addTypeDocumentModalRef.value);
      
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchTypeDocument = async () => {
      try {
        const response = await ApiService.get('/all/typeocuments');
        const typeDocumentData = response.data.data.data;
        typeDocumentOptions.value = typeDocumentData.map((typeDocument) => ({
          value: typeDocument.id,
          label: `${typeDocument.codeTypeDocument} - ${typeDocument.libelleTypeDocument}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchTypeDocument();
    });

    const addTypeDocument = async (values: any, typeDocumentForm) => {
      values = values as TypeDocument;
      if(isUPDATE.value){
        ApiService.put("/typeDocuments/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              typeDocumentForm.resetForm();
              hideModal(addTypeDocumentModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        console.log('values',values)
        ApiService.post("/typeDocuments/",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              typeDocumentForm.resetForm();
              hideModal(addTypeDocumentModalRef.value);
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
        isUPDATE.value=false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    return { typeDocumentSchema,
      addTypeDocumentModalRef,
      addTypeDocument,
      typeDocumentForm,
      title,btntext,resetValue,
      typeDocumentOptions,
    };
  },
});
</script>@/models/CategorieInfo