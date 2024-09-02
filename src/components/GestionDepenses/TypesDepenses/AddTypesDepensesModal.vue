<template>
  <div class="modal fade" id="AddTypesDepensesModal" tabindex="-1" role="dialog" ref="addTypesDepensesModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
          <Form ref="typesDepensesForm" @submit="addTypesDepenses" :validation-schema="typesDepensesSchema">
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
                  Description <span class="text-danger">*</span>
                </label>
                <Field name="description" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la valeur Types Depenses"/>
                <ErrorMessage name="description" class="text-danger"/>
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
import { TypesDepenses} from '@/models/TypesDepenses';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "AddTypesDepensesModal",
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
    const typesDepensesSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libellé est obligatoire'),
      description: Yup.string().required('La description est obligatoire'),

    });

    const typesDepensesForm = ref<TypesDepenses | null>(null);
    const addTypesDepensesModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typesDepensesOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un typeDepense");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTypesDepenses(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le typesDepense";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un typesDepense";
         btntext.value = "Ajouter";
      }
    }

    const getTypesDepenses = async (id: number) => {
      return ApiService.get("/typesDepenses/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          typesDepensesForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addTypesDepensesModalRef.value);
      
      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchTypesDepenses = async () => {
      try {
        const response = await ApiService.get('/all/typesDepenses/');
        const typesDepensesData = response.data.data.data;
        typesDepensesOptions.value = typesDepensesData.map((typesDepenses) => ({
          value: typesDepenses.id,
          label: `${typesDepenses.codeTypesDepenses} - ${typesDepenses.libelleTypesDepenses}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchTypesDepenses();
    });

    const addTypesDepenses = async (values: any, typesDepensesForm) => {
      values = values as TypesDepenses;
      if(isUPDATE.value){
        ApiService.put("/typesDepenses/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              typesDepensesForm.resetForm();
              hideModal(addTypesDepensesModalRef.value);
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
        ApiService.post("/typesDepenses/",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              typesDepensesForm.resetForm();
              hideModal(addTypesDepensesModalRef.value);
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

    return { typesDepensesSchema,
      addTypesDepensesModalRef,
      addTypesDepenses,
      typesDepensesForm,
      title,btntext,resetValue,
      typesDepensesOptions,
    };
  },
});
</script>@/models/CategorieInfo