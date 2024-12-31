<template>
  <div class="modal fade createNewModal" id="AddAnnulationMotifModal" tabindex="-1" aria-hidden="true" ref="addRejetModalRef">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Motif de rejet d'une demande</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <Form ref="rejetForm" @submit="addAnnulation" :validation-schema="rejetSchema">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Motif <span class="text-danger">*</span>
                  </label>
                  <Field name="motif" cols="30" rows="5" as="textarea" placeholder="Ecrire votre motif ici"
                    v-slot="{ field }" class="form-control shadow-none rounded-0 text-black">
                    <textarea v-model="field.value" class="form-control shadow-none rounded-0 text-black"></textarea>
                  </Field>
                  <ErrorMessage name="motif" class="text-danger" />
                </div>
              </div>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit">
              Rejeter
            </button>
          </Form>
        </div>
        <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"
          @click="resetValue()"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import * as Yup from 'yup';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import Multiselect from '@vueform/multiselect';
import { error, hideModal, success } from '@/utils/utils';
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import axios from 'axios';
export default ({
  name: "AddAnnulationMotifModal",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const rejetSchema = Yup.object().shape({
      motif: Yup.string().required('Le motif est obligatoire'),
    });

    const rejetForm = ref<any | null>(null);
    const router = useRouter();
    const addRejetModalRef = ref<null | HTMLElement>(null);
    const valeur = ref(0);
    const isUPDATE = ref(false);

   

    watch(() => props.item, (newValue) => {
      console.log("Une information importante ===", newValue)
      if(newValue){
        valeur.value = newValue
      }
    });

    const addAnnulation = async (values: any, bureauForm) => {
      console.log("VALUESSS ", values)

      values["id"] = valeur.value;
        ApiService.put(`/demandes/demande/${valeur.value}`, values)
          .then(({ data }) => {
            console.log("Retours ===> ",data)
            if (data.code == 200) {
              success(data.message);
              bureauForm.resetForm();
              hideModal(addRejetModalRef.value);
              emit('close');
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });

    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
      isUPDATE.value = false;
      formFields.forEach(field => {
        field.value = '';
      });
    };

    onMounted(() => {
//
    });

    return {
      addRejetModalRef,
      addAnnulation,
      rejetForm,
      rejetSchema,
      resetValue
    };

  }
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>