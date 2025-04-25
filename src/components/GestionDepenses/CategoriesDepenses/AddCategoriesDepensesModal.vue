<template>
    <div class="modal fade" id="AddCategoriesDepensesModal" tabindex="-1" role="dialog"
        ref="addCategoriesDepensesModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="categoriesDepensesForm" @submit="addCategoriesDepenses"
                        :validation-schema="categoriesDepensesSchema">
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
                                <Field name="reference" class="form-control" type="text" />
                                <ErrorMessage name="reference" class="text-danger" />
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
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Description <span class="text-danger">*</span>
                                    </label>
                                    <Field name="description" cols="20" rows="2" as="textarea" placeholder="Description"
                                        v-slot="{ field }" class="form-control shadow-none rounded-0 text-black">
                                        <textarea v-model="field.value"
                                            class="form-control shadow-none rounded-0 text-black"></textarea>
                                    </Field>
                                    <ErrorMessage name="description" class="text-danger" />
                                </div>
                            </div>
                            <div class="col-md-12 mb-4">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        Categories Depenses
                                    </label>
                                    <Field name="categoriesDepense" v-model="categoriesDepenses" type="text"
                                        v-slot="{ field }">
                                        <Multiselect v-model="field.value" v-bind="field"
                                            :options="categoriesDepensesOptions" :preserve-search="true"
                                            :multiple="false" :searchable="true"
                                            placeholder="Sélectionner la categorie de depense" label="label"
                                            track-by="label" />
                                    </Field>
                                    <span class="text-danger" v-if="showMErr">La catégorie dépense est
                                        obligatoire</span>

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
import { onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { CategoriesDepenses } from '@/models/CategoriesDepenses';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';

export default {
    name: "AddCategoriesDepensesModal",
    components: {
        Form,
        Field,
        Multiselect,
        ErrorMessage
    },
    props: {
        id: {
            type: Number,
            required: true,
            default: 0
        },
    },
    emits: ["refreshCategoriesDepenses", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const categoriesDepensesSchema = Yup.object().shape({
            reference: Yup.string().required('La Référence est obligatoire'),
            libelle: Yup.string().required('Le libelle est obligatoire'),
            description: Yup.string().required('La description est obligatoire'),
            categoriesDepense: Yup.string().notRequired(),      
        });

        const categoriesDepensesnew = ref(props.id);
        const categoriesDepensesForm = ref<CategoriesDepenses | null>(null);
        const addCategoriesDepensesModalRef = ref<null | HTMLElement>(null);
        let CategoriesDepenses = ref<Array<CategoriesDepenses>>([]);
        const title = ref('Ajouter une categoriesDepenses');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();
        const categoriesDepenses = ref();
        const categoriesDepensesOptions = ref([]);
        const showMErr = ref(false);

        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getCategoriesDepenses(newValue);
                isupdate.value = true;
                getAllCategoriesDepense();
            }
            btnTitle();
        });

        const getCategoriesDepenses = async (id: number) => {
            console.log(id, "Element recupéré")
            return ApiService.get("/categoriesDepenses/" + id)
                .then(({ data }) => {
                    const donnees = data.data;
                    for (const key in donnees) {
                        categoriesDepensesForm.value?.setFieldValue(key,
                            (typeof donnees[key] === 'object' && donnees[key] !== null) ? donnees[key].id : donnees[key]
                        );
                    }
                    emit('openmodal', addCategoriesDepensesModalRef.value);
                })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

        const getAllCategoriesDepense = async () => {
            try {
                const response = await ApiService.get('/all/categoriesDepenses');
                const categoriesDepensesData = response.data.data.data;
                console.log('Data')
                console.log('categoriesDepensesData',categoriesDepensesData)

                categoriesDepensesOptions.value = categoriesDepensesData.map((categoriesDepenses) => ({
                    value: categoriesDepenses.id,
                    label: categoriesDepenses.libelle,

                }));
            }
            catch (error) {
                //error(response.data.message)
            }
        }


        const btnTitle = async () => {
            if (isupdate.value) {
                title.value = "Modifier la CategoriesDepenses";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter une CategoriesDepenses";
                btntext.value = "Ajouter";
            }
        }

        const addCategoriesDepenses = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as CategoriesDepenses;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/categoriesDepenses/${values.id}`, values)
                    .then(({ data }) => {
                        if (data.code == 200) {
                            success(data.message);
                            resetForm();
                            hideModal(addCategoriesDepensesModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit('close');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else {
                ApiService.post("/categoriesDepenses", values)
                    .then(({ data }) => {
                        if (data.code == 201) {
                            success(data.message)
                            resetForm();
                            hideModal(addCategoriesDepensesModalRef.value);
                            emit('close');
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

        onMounted(async () => {
               await getAllCategoriesDepense();
        });

        return {
            categoriesDepenses,showMErr, title, btntext, resetValue, categoriesDepensesSchema,
            addCategoriesDepenses, categoriesDepensesForm, addCategoriesDepensesModalRef, categoriesDepensesnew, categoriesDepensesOptions, CategoriesDepenses
        };
    },
};


</script>@/models/CategoriesDepenses