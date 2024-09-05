<template>

  <div class="modal fade" id="AddBanqueModal" tabindex="-1" role="dialog" ref="addBanqueModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="banqueForm" @submit="addBanque" :validation-schema="banqueSchema">
            <div class="row">
              <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle <span class="text-danger">*</span>
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
           
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination <span class="text-danger">*</span>
                </label>
                <Field name="denominationBanque" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la dénomination"/>
                <ErrorMessage name="denominationBanque" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse <span class="text-danger">*</span>
                </label>
                <Field name="adresse" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adresse" class="text-danger"/>
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
import { ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { Banque } from '@/models/Banque';

export default {
  name: "AddBanqueModal",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },
  },
  emits: ["getAllBanques", "openmodal"],

  setup: (props, { emit }) => {
    const loading = ref<boolean>(false);
    const banqueSchema = Yup.object().shape({
      
      sigle: Yup.string().required('Le sigle est obligatoire'),
      denominationBanque: Yup.string().required('La dénomination est obligatoire'),
      adresse: Yup.string().required("L'adresse est obligatoire"),
    });

    const banqueForm = ref<Banque | null>(null);
    const addBanquesModalRef = ref<null | HTMLElement>(null);
    const title = ref('Ajouter une banque');
    const btntext = ref('Ajouter');
    const isupdate = ref(false);

    watch(() => props.id, (newValue) => {
      if (newValue != 0) {
        getBanque(newValue);
        isupdate.value = true;
        btnTitle();
      }

    });

    const btnTitle = async () => {
      if (isupdate.value) {
        title.value = "Modifier une banque";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter une banque";
        btntext.value = "Ajouter";
      }
    }

    const getBanque = async (id: number) => {
      return ApiService.get("/banques/" + id)
        .then(({ data }) => {
          banqueForm.value?.setFieldValue("id", data.data.id);
          banqueForm.value?.setFieldValue("sigle", data.data.sigle);
          banqueForm.value?.setFieldValue("denominationBanque", data.data.denominationBanque);
          banqueForm.value?.setFieldValue("adresse", data.data.adresse);
          emit('openmodal', addBanquesModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const addBanque = async (values, { resetForm }) => {
      values = values as Banque;
      loading.value = false;
      if (isupdate.value) {
        console.log('puuuttt')
        ApiService.put(`/banques/${values?.id}`, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              resetForm();
              hideModal(addBanquesModalRef.value);
              isupdate.value = false;
              btnTitle();
              emit("getAllBanques");
            }
          }).catch(({ response }) => {
            error(response.data.message)
          });
      } else {
        console.log('posttttt')
        ApiService.post("/banques", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              resetForm();
              hideModal(addBanquesModalRef.value);
              //emit("getAllBanques");
            }
          }).catch(({ response }) => {
            error(response.data.message)
          });
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      isupdate.value = false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    return { banqueSchema, addBanque, banqueForm, addBanquesModalRef, btntext, title, resetValue };
  },
};

</script>