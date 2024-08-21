<template>
  <div class="modal fade" id="AddTypeCompteModal" tabindex="-1" role="dialog" ref="addTypeCompteModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ title }}</h4>
                <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
          <Form ref="typeCompteForm" @submit="addTypeCompte" :validation-schema="typeCompteSchema">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                  <ErrorMessage name="code" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
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
import { defineComponent, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '@/services/ApiService';
import * as Yup from 'yup';
import { TypeCompte } from '@/models/TypeCompte';
import { error , success, hideModal } from '@/utils/utils';

export default defineComponent({
    name: "AddTypeCompteModal",
    components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }){
    const typeCompteSchema = Yup.object().shape({
      code: Yup.string().required("Le code est obligatoire"),
      libelle: Yup.string().required('Le libellé est obligatoire'),
    });

    const typeCompteForm = ref<TypeCompte | null>(null);
    const addTypeCompteModalRef = ref<null | HTMLElement>(null);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un type de compte");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getTypeCompte(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le type de compte";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un type de compte";
         btntext.value = "Ajouter";
      }
    }

    const getTypeCompte = async (id: number) => {
      return ApiService.get("/typecomptes/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          typeCompteForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addTypeCompteModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const addTypeCompte = async (values: any, typeCompteForm) => {
      values = values as TypeCompte;
      if(isUPDATE.value){
        ApiService.put("/typecomptes/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              typeCompteForm.resetForm();
              hideModal(addTypeCompteModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/typecomptes",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              typeCompteForm.resetForm();
              hideModal(addTypeCompteModalRef.value);
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

    return { typeCompteSchema,
      addTypeCompteModalRef,
      addTypeCompte,
      typeCompteForm,
      title,btntext,resetValue
    };
  },
});
</script>@/models/TypeCompte