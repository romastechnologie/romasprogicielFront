<template>
  <div
    class="modal fade createNewModal"
    id="AddFonctionModal"
    tabindex="-1"
    ref="addFonctionModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="fonctionForm" @submit="addFonction" :validation-schema="fonctionSchema">
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
                  Libelle <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelle" class="text-danger"/>
              </div>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
            {{ btntext }}
            </button>
      </div>
        </Form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button>
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
import { Fonction } from '@/models/Fonction';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "AddFonctionModal",
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
    const fonctionSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obligatoire'),
      libelle: Yup.string().required('Le libelle est obligatoire'),
    });

    const fonctionForm = ref<Fonction | null>(null);
    const addFonctionModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const fonctionOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un fonction");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getFonction(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier la fonction";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter une fonction";
         btntext.value = "Ajouter"
      }
    }

    const getFonction = async (id: number) => {
      return ApiService.get("/fonctions/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          fonctionForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addFonctionModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const fetchFonction = async () => {
      try {
        const response = await ApiService.get('/fonctions');
        const fonctionData = response.data.data.data;
        fonctionOptions.value = fonctionData.map((fonction) => ({
          value: fonction.id,
          label: `${fonction.codeFonction} - ${fonction.libelleFonction}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchFonction();
    });

    const addFonction = async (values: any, fonctionForm) => {
      values = values as Fonction;
      if(isUPDATE.value){
        ApiService.put("/fonctions/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              fonctionForm.resetForm();
              hideModal(addFonctionModalRef.value);
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
        ApiService.post("/fonctions",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              fonctionForm.resetForm();
              hideModal(addFonctionModalRef.value);
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

    return { fonctionSchema,
      addFonctionModalRef,
      addFonction,
      fonctionForm,
      title,btntext,resetValue,
      fonctionOptions,
    };
  },
});
</script>@/models/CategorieInfo