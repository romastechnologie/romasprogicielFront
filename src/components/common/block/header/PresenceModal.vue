<template>
  <div
    class="modal fade"
    id="AddPresenceModal"
    tabindex="-1"
    role="dialog"
    ref="addPermissionModalRef"
    aria-labelledby="tooltipmodal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Information présence</h4>
          <button
            class="btn-close py-0"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Form
            ref="presenceForm"
            @submit="addPresence"
            :validation-schema="presenceSchema"
          >
            <div class="row">
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Description <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="description"
                    cols="20"
                    rows="3"
                    as="textarea"
                    placeholder="Description"
                    v-slot="{ field }"
                    class="form-control shadow-none rounded-0 text-black"
                  >
                    <textarea
                      v-model="field.value"
                      class="form-control shadow-none rounded-0 text-black"
                    ></textarea>
                  </Field>
                  <ErrorMessage name="description" class="text-danger" />
                </div>
              </div>
              <button class="btn btn-primary" type="submit">Valider</button>
            </div>
          </Form>
        </div>
        <!-- <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                        <button class="btn btn-primary" type="button">Save changes</button>
                    </div> -->
      </div>
    </div>
  </div>
</template> 
    
    <script lang="ts">
import { ref, watch } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import ApiService from "@/services/ApiService";
import { error, hideModal, success } from "@/utils/utils";
import { useRouter } from "vue-router";

export default {
  name: "PresenceModal",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  // emits: ["refreshPermissions", "openmodal"],

  setup: (props: any, { emit }: { emit: Function }) => {
    const presenceSchema = Yup.object().shape({
      description: Yup.string().required("L'observation est obligatoire"),
    });
    const presenceForm = ref<any | null>(null);
    const addPresenceModalRef = ref<null | HTMLElement>(null);

    const addPresence = async (
      values: any,
      { resetForm }: { resetForm: () => void }
    ) => {
      //
    };
    const router = useRouter();

    return {
      addPresenceModalRef,
      presenceForm,
      addPresence,
      presenceSchema,
      //refreshPermissions
    };
  },
};
</script>