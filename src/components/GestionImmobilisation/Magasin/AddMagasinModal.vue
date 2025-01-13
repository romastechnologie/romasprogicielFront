<template>
    <div class="modal fade" id="AddMagasinModal" tabindex="-1" role="dialog" ref="addTypeBienModalRef"
        aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="magasinForm" @submit="addMagasin" :validation-schema="magasinSchema">
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black  mb-10">
                                        Code <span class="text-danger">*</span>
                                    </label>

                                    <Field name="code" class="form-control" type="text" 
                                     placeholder="Entrer le code"/>
                                    <ErrorMessage name="code" class="text-danger" />
                                </div>
                            </div>

                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Libelle<span class="text-danger">*</span>
                                    </label>
                                    <Field name="libelle" type="text"
                                        class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Entrer le libelle" />
                                    <ErrorMessage name="libelle" class="text-danger" />
                                </div>
                            </div>
                            <button class="btn btn-primary" type="submit">
                                {{ btntext }}
                            </button>
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
import { ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { Magasin } from '@/models/Magasin';
import { useRouter } from 'vue-router';

export default {
    name: "AddMagasinModal",
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
    emits: ["refreshMagasins", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const magasinSchema = Yup.object().shape({
            code: Yup.string().required('Le code est obligatoire'),
            libelle: Yup.string().required('Le libelle est obligatoire'),
            
        });


        const magasinnew = ref(props.id);
        const magasinForm = ref<Magasin | null>(null);
        const addMagasinModalRef = ref<null | HTMLElement>(null);
        let magasins = ref<Array<Magasin>>([]);
        const title = ref('Ajouter un magasin');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();

        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getMagasin(newValue);
                isupdate.value = true;
            }
            btnTitle();
        });

        const getMagasin = async (id: number) => {
            return ApiService.get("/magasins/" + id)
                .then(({ data }) => {
                    magasinForm.value?.setFieldValue("id", data.data.id);
                    magasinForm.value?.setFieldValue("code", data.data.code);
                    magasinForm.value?.setFieldValue("libelle", data.data.libelle);
                    emit('openmodal', addMagasinModalRef.value);
                })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

        const btnTitle = async () => {
            if (isupdate.value) {
                title.value = "Modifier le magasin";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter un magasin";
                btntext.value = "Ajouter";
            }
        }

        const addMagasin = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as Magasin;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/magasins/${values.id}`, values)
                    .then(({ data }) => {
                        if (data.code == 200) {
                            success(data.message);
                            resetForm();
                            hideModal(addMagasinModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit("refreshMagasins");
                            router.push('/magasins/liste-magasins');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else {
                ApiService.post("/magasins", values)
                    .then(({ data }) => {
                        if (data.code == 201) {
                            success(data.message)
                            resetForm();
                            hideModal(addMagasinModalRef.value);
                            router.push('/magasins/liste-magasins');
                            emit("refreshMagasins");

                        }
                    }).catch(({ response }) => {
                        error(response.message);
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

        return {
          magasins, title, btntext, resetValue, magasinSchema,
            addMagasin, magasinForm, addMagasinModalRef, magasinnew,
            //refreshTypeBiens
        };
    },
};
</script>@/models/Magasin