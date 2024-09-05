<template>
  <div class="modal fade" id="AddCategorieDocumentModal" tabindex="-1" role="dialog" ref="addCategorieDocumentModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="categorieDocumentForm" @submit="addCategorieDocument" :validation-schema="categorieSchema">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libellé <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  code <span class="text-danger">*</span>
                </label>
                <Field name="code" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                <ErrorMessage name="code" class="text-danger"/>
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
import {CategorieDocument} from '@/models/CategorieDocument'
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "AddCategorieDocumentModal",
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
    const categorieSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libellé est obligatoire'),
      code: Yup.string().required('Le code est obligatoire'),

    });

    const categorieDocumentForm = ref<CategorieDocument | null>(null);
    const addCategorieDocumentModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const CategorieDocumentOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une catégorie Document");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getCategorieDocument(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier la categorie Document";
         btntext.value = "Modifier";
      }else{ 
         title.value = "Ajouter une categorie Document";
         btntext.value = "Ajouter";
      }
    }

    const getCategorieDocument = async (id: number) => {
      return ApiService.get("/categorieDocuments/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          categorieDocumentForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addCategorieDocumentModalRef.value);
      
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchCategorieDocument = async () => {
      try {
        const response = await ApiService.get('/all/categorieDocuments');
        const categorieDocumentData = response.data.data.data;
        CategorieDocumentOptions.value = categorieDocumentData.map((categorieDocument) => ({
          value: categorieDocument.id,
          label: `${categorieDocument.codeCategorieDocument} - ${categorieDocument.libelleCategorieDocument}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchCategorieDocument();
    });

    const addCategorieDocument = async (values: any, categorieDocumentForm) => {
      values = values as CategorieDocument;
      if(isUPDATE.value){
        ApiService.put("/categorieDocuments/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              categorieDocumentForm.resetForm();
              hideModal(addCategorieDocumentModalRef.value);
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
        ApiService.post("/categorieDocuments/",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              categorieDocumentForm.resetForm();
              hideModal(addCategorieDocumentModalRef.value);
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

    return { categorieSchema,
      addCategorieDocumentModalRef,
      addCategorieDocument,
      categorieDocumentForm,
      title,btntext,resetValue,
      CategorieDocumentOptions,
    };
  },
});
</script>@/models/CategorieInfo