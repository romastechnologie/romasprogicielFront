<template>
  <div class="modal fade" id="AddTypeDepenseModal" tabindex="-1" role="dialog" ref="addTypeDepenseModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ title }}</h4>
                <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
          <Form ref="typeDepenseForm" @submit="addTypeDepense" :validation-schema="typeDepenseSchema">
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
import { TypeDepense } from '@/models/TypeDepense';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "AddTypeDepenseModal",
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
    const typeDepenseSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libelle est obligatoire'),
    });

    const typeDepenseForm = ref<TypeDepense | null>(null);
    const addTypeDepenseModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typeDepenseOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un type de dépense");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTypeDepense(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le type de depense";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un type de depense";
         btntext.value = "Ajouter"
      }
    }

    const getTypeDepense = async (id: number) => {
      return ApiService.get("/typeDepenses/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          typeDepenseForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addTypeDepenseModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchTypeDepense = async () => {
      try {
        const response = await ApiService.get('/typeDepenses');
        const typeDepenseData = response.data.data.data;
        typeDepenseOptions.value = typeDepenseData.map((typeDepense) => ({
          value: typeDepense.id,
          label: `${typeDepense.codeTypeDepense} - ${typeDepense.libelleTypeDepense}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchTypeDepense();
    });

    const addTypeDepense = async (values: any, typeDepenseForm) => {
      values = values as TypeDepense;
      if(isUPDATE.value){
        ApiService.put("/typeDepenses/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              typeDepenseForm.resetForm();
              hideModal(addTypeDepenseModalRef.value);
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
        ApiService.post("/typeDepenses",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              typeDepenseForm.resetForm();
              hideModal(addTypeDepenseModalRef.value);
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

    return { typeDepenseSchema,
      addTypeDepenseModalRef,
      addTypeDepense,
      typeDepenseForm,
      title,btntext,resetValue,
      typeDepenseOptions,
    };
  },
});
</script>@/models/CategorieInfo