<template>
  <div class="modal fade" id="AddTypeOperationModal" tabindex="-1" role="dialog" ref="addTypeOperationModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ title }}</h4>
                <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
          <Form ref="typeOperationForm" @submit="addTypeOperation" :validation-schema="typeOperationSchema">
            <div class="row">
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libelle <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div>
            <button
              class="btn btn-primary"
              type="submit"
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
import { TypeOperation } from '@/models/TypeOperation';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "AddTypeOperationModal",
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
    const typeOperationSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libelle est obligatoire'),
    });

    const typeOperationForm = ref<TypeOperation | null>(null);
    const addTypeOperationModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typeOperationOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un typeOperation");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTypeOperation(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le type d'opération";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un type d'opération";
         btntext.value = "Ajouter"
      }
    }

    const getTypeOperation = async (id: number) => {
      return ApiService.get("/typeOperations/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          typeOperationForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addTypeOperationModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchTypeOperation = async () => {
      try {
        const response = await ApiService.get('all/typeOperations');
        const typeOperationData = response.data.data.data;
        typeOperationOptions.value = typeOperationData.map((typeOperation) => ({
          value: typeOperation.id,
          label: `${typeOperation.codeTypeOperation} - ${typeOperation.libelleTypeOperation}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchTypeOperation();
    });

    const addTypeOperation = async (values: any, typeOperationForm) => {
      values = values as TypeOperation;
      if(isUPDATE.value){
        ApiService.put("/typeOperations/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              typeOperationForm.resetForm();
              hideModal(addTypeOperationModalRef.value);
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
        ApiService.post("/typeOperations",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              typeOperationForm.resetForm();
              hideModal(addTypeOperationModalRef.value);
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

    return { typeOperationSchema,
      addTypeOperationModalRef,
      addTypeOperation,
      typeOperationForm,
      title,btntext,resetValue,
      typeOperationOptions,
    };
  },
});
</script>@/models/CategorieInfo