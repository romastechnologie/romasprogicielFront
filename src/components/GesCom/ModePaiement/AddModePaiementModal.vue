<template>
  <div
    class="modal fade createNewModal"
    id="AddModePaiementModal"
    tabindex="-1"
    ref="addModePaiementModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="modePaiementForm" @submit="addModePaiement" :validation-schema="modePaiementSchema">
            <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10" >
                  Libelle <span class="text-danger">*</span>
                </label>
                <Field name="libelle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                <ErrorMessage name="libelleAdresse" class="text-danger"/>
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
import { ModePaiement } from '@/models/ModePaiement';
import { error , success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddModePaiementModal",
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
    const modePaiementSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libelle est obligatoire'),
    });

    const modePaiementForm = ref<ModePaiement | null>(null);
    const addModePaiementModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const modePaiementOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un mode de paiement");
    const btntext = ref('Ajouter');
    const clientOptions = ref([]);

    watch(() => props.item, (newValue) => {
      getModePaiement(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le mode de paiement";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un mode de paiement";
         btntext.value = "Ajouter"
      }
    }

    const getModePaiement = async (id: number) => {
      return ApiService.get("/modepaiements/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          modePaiementForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addModePaiementModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    // const fetchModePaiement = async () => {
    //   try {
    //     const response = await ApiService.get('/adresselivraisons');
    //     const modePaiementData = response.data.data.data;
    //     modePaiementOptions.value = modePaiementData.map((modePaiement) => ({
    //       value: modePaiement.id,
    //       label: `${modePaiement.codeModePaiement} - ${modePaiement.libelleModePaiement}`,
    //     }));
    //   } catch (error) {
    //     //
    //   }
    // };

    const addModePaiement = async (values: any, modePaiementForm) => {
      values = values as ModePaiement;
      if(isUPDATE.value){
        ApiService.put("/modepaiements/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              modePaiementForm.resetForm();
              hideModal(addModePaiementModalRef.value);
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
        ApiService.post("/modepaiements",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              modePaiementForm.resetForm();
              hideModal(addModePaiementModalRef.value);
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

    return { modePaiementSchema,
      addModePaiementModalRef,
      addModePaiement,
      modePaiementForm,
      title,btntext,resetValue,
      modePaiementOptions,clientOptions
    };
  },
});
</script>@/models/CategorieInfo