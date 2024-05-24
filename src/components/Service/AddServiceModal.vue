<template>

  <div class="modal fade" id="AddServiceModal" tabindex="-1" role="dialog" ref="addServiceModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button ref="closeServiceModal" class="btn-close py-0" type="button" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="serviceForm" @submit="addService" :validation-schema="serviceSchema">
            <div class="row">
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code" />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libelle <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le libellé" />
                  <ErrorMessage name="libelle" class="text-danger" />
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
import { Service } from '@/models/Service';

export default {
  name: "AddServicesModal",
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
  emits: ["getAllServices", "openmodal"],

  setup: (props, { emit }) => {
    const loading = ref<boolean>(false);
    const serviceSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libellé est obligatoire'),
      code: Yup.string().required('Le code est obligatoire'),
    });

    const closeServiceModal = ref(null);
    const serviceForm = ref<Service | null>(null);
    const addServicesModalRef = ref<null | HTMLElement>(null);
    const title = ref('Ajouter un service');
    const btntext = ref('Ajouter');
    const isupdate = ref(false);

    watch(() => props.id, (newValue) => {
      if (newValue != 0) {
        getService(newValue);
        isupdate.value = true;
        btnTitle();
      }

    });

    const btnTitle = async () => {
      if (isupdate.value) {
        title.value = "Modifier le service";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un service";
        btntext.value = "Ajouter";
      }
    }

    const getService = async (id: number) => {
      return ApiService.get("/services/" + id)
        .then(({ data }) => {
          serviceForm.value?.setFieldValue("id", data.data.id);
          serviceForm.value?.setFieldValue("code", data.data.code);
          serviceForm.value?.setFieldValue("libelle", data.data.libelle);
          emit('openmodal', addServicesModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const addService = async (values, { resetForm }) => {
      values = values as Service;
      loading.value = false;
      if (isupdate.value) {
        console.log('puuuttt')
        ApiService.put(`/services/${values?.id}`, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              resetForm();
              hideModal(addServicesModalRef.value);
              isupdate.value = false;
              btnTitle();
              emit("getAllServices");
            }
          }).catch(({ response }) => {
            error(response.data.message)
          });
      } else {
        console.log('posttttt')
        ApiService.post("/services", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              resetForm();
              hideModal(addServicesModalRef.value);
              if (closeServiceModal) {
                (closeServiceModal.value as HTMLButtonElement).click()
              }
              //emit("getAllServices");
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

    return { serviceSchema, addService, serviceForm, addServicesModalRef, btntext, title, resetValue, closeServiceModal };
  },
};

</script>