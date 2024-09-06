<template>
  <div
    class="modal fade createNewModal"
    id="AddDepartementModal"
    tabindex="-1"
    ref="addDepartementModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header">
          <h4 class="modal-title fw-bold text-black">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>

        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="departementForm" @submit="addDepartement" :validation-schema="departementSchema">
            <div class="row">
              <div class="col-md-12 mt-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                  <ErrorMessage name="code" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                  <ErrorMessage name="libelle" class="text-danger"/>
                </div>
              </div>
              <button class="btn btn-primary" type="submit">
                {{ btntext }}
              </button>
          </div>
        </Form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '../../services/ApiService';
import * as Yup from 'yup';
import { Departement } from '../../models/Departement';
import { error , success, hideModal } from '../../utils/utils';

export default defineComponent({
    name: "AddDepartementModal",
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
    const departementSchema = Yup.object().shape({
      code: Yup.string().required("Le code est obligatoire"),
      libelle: Yup.string().required('Le libellé est obligatoire'),
    });

    const departementForm = ref<Departement | null>(null);
    const addDepartementModalRef = ref<null | HTMLElement>(null);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un departement");
    const btntext = ref('Ajouter');

    watch(() => props.item, (newValue) => {
      getDepartement(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le departement";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un departement";
         btntext.value = "Ajouter";
      }
    }

    const getDepartement = async (id: number) => {
      return ApiService.get("/departements/"+id)
      .then(({ data }) => {
        // map data in form
        const donnees = data.data;
        for (const key in donnees) {
          departementForm.value?.setFieldValue(key, 
          (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
          );
        }
        emit('openmodal', addDepartementModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const addDepartement = async (values: any, departementForm) => {
      values = values as Departement;
      if(isUPDATE.value){
        ApiService.put("/departements/"+values.id,values)
        .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              departementForm.resetForm();
              hideModal(addDepartementModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
      }else{
        ApiService.post("/departements",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              departementForm.resetForm();
              hideModal(addDepartementModalRef.value);
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

    return { departementSchema,
      addDepartementModalRef,
      addDepartement,
      departementForm,
      title,btntext,resetValue
    };
  },
});
</script>@/models/Departement