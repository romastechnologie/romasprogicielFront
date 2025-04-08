<template>
    <div class="modal fade" id="AddReglesTypesModal" tabindex="-1" role="dialog"
        ref="addReglesTypesModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="reglesTypesForm" 
                        @submit="addReglesTypes"
                        :validation-schema="reglesTypesSchema">
                        <div class="row">

                         <div class="col-md-12 mb-4">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        Regle de conservation
                                    </label>
                                    <Field name="regleConservation" v-model="reglesConservations" type="text"
                                        v-slot="{ field }">
                                        <Multiselect v-model="field.value" v-bind="field"
                                            :options="reglesConservationsOptions" :preserve-search="true"
                                            :multiple="false" :searchable="true"
                                            placeholder="Sélectionner la regle de conservation" label="label"
                                            track-by="label" />
                                    </Field>
                                    <span class="text-danger" v-if="showMErr">La regle de conservation est
                                        obligatoire</span>
                                </div>
                            </div>
                            
                            <div class="col-md-12 mb-4">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        Type document
                                    </label>
                                    <Field name="typeDocument" v-model="typesDocuments" type="text"
                                        v-slot="{ field }">
                                        <Multiselect v-model="field.value" v-bind="field"
                                            :options="typesDocumentsOptions" :preserve-search="true"
                                            :multiple="false" :searchable="true"
                                            placeholder="Sélectionner le type de document" label="label"
                                            track-by="label" />
                                    </Field>
                                    <span class="text-danger" v-if="showMErr">Le type document est
                                        obligatoire</span>
                                </div>
                            </div>
                            
                            <div class="col-md-12 mb-4">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        Categories Documents
                                    </label>
                                    <Field name="categoriedocument" v-model="categoriesDocuments" type="text"
                                        v-slot="{ field }">
                                        <Multiselect v-model="field.value" v-bind="field"
                                            :options="categoriesDocumentsOptions" :preserve-search="true"
                                            :multiple="false" :searchable="true"
                                            placeholder="Sélectionner la catégorie de document" label="label"
                                            track-by="label" />
                                    </Field>
                                    <span class="text-danger" v-if="showMErr">La catégorie de est
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
import { ReglesTypes } from '@/models/ReglesTypes';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';

export default {
    name: "AddReglesTypesModal",
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
    emits: ["refreshReglesTypes", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const reglesTypesSchema = Yup.object().shape({
            typeDocument: Yup.string().required('La Référence est obligatoire'),
            categoriedocument: Yup.string().required('Le libelle est obligatoire'),
           regleConservation: Yup.string().required('La description est obligatoire'),     
        });
        const reglesTypesnew = ref(props.id);
        const reglesTypesForm = ref<ReglesTypes | null>(null);
        const addReglesTypesModalRef = ref<null | HTMLElement>(null);
        let ReglesTypes = ref<Array<ReglesTypes>>([]);
        const title = ref('Ajouter une regle type document');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();
        const reglesConservations = ref();
        const reglesConservationsOptions = ref([]);
        const typesDocuments = ref();
        const typesDocumentsOptions = ref([]);
        const categoriesDocuments = ref();
        const categoriesDocumentsOptions = ref([]);
        const showMErr = ref(false);

        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getRegleTypes(newValue);
                isupdate.value = true;
                getAllReglesConservations();
            }
            btnTitle();
        });

        const getRegleTypes = async (id: number) => {
            console.log(id, "Element recupéré")
            return ApiService.get("/regletypecategories/" + id)
                .then(({ data }) => {
                    const donnees = data.data;
                    for (const key in donnees) {
                        reglesTypesForm.value?.setFieldValue(key,
                            (typeof donnees[key] === 'object' && donnees[key] !== null) ? donnees[key].id : donnees[key]
                        );
                    }
                    emit('openmodal', addReglesTypesModalRef.value);
                })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

        const getAllReglesConservations = async () => {
            try {
                const response = await ApiService.get('all/regleConservations');
                const reglesConservationsData = response.data.data.data;
                console.log('Data')
                console.log('categoriesDepensesData',reglesConservationsData)

                reglesConservationsOptions.value = reglesConservationsData.map((reglesConservations) => ({
                    value: reglesConservations.id,
                    label: reglesConservations.libelle,

                }));
            }
            catch (error) {
                //error(response.data.message)
            }
        }

        const getAllTypesDocuments = async () => {
            try {
                const response = await ApiService.get('all/typedocuments');
                const typesDocumentsData = response.data.data.data;
                console.log('Data')
                console.log('categoriesDepensesData',typesDocumentsData)
                typesDocumentsOptions.value = typesDocumentsData.map((typesDocuments) => ({
                    value: typesDocuments.id,
                    label: typesDocuments.nom,

                }));
            }
            catch (error) {
                //error(response.data.message)
            }
        }

        const getAllCategoriesDocuments = async () => {
            try {
                const response = await ApiService.get('all/categorieDocuments');
                const categoriesDocumentsData = response.data.data.data;
                console.log('Data')
                console.log('categoriesDepensesData',categoriesDocumentsData)
                categoriesDocumentsOptions.value = categoriesDocumentsData.map((categoriesDocuments) => ({
                    value: categoriesDocuments.id,
                    label: categoriesDocuments.libelle,

                }));
            }
            catch (error) {
                //error(response.data.message)
            }
        }

        const btnTitle = async () => {
            if (isupdate.value) {
                title.value = "Modifier regle type document";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter une regle type document ";
                btntext.value = "Ajouter";
            }
        }

        const addReglesTypes = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as ReglesTypes;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/regletypecategories/${values.id}`, values)
                    .then(({ data }) => {
                        if (data.code == 200) {
                            success(data.message);
                            resetForm();
                            hideModal(addReglesTypesModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit('close');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else {
                ApiService.post("/regletypecategories", values)
                    .then(({ data }) => {
                        console.log( 'data',data);
                        if (data.code == 201) {
                            success(data.message)
                            resetForm();
                            hideModal(addReglesTypesModalRef.value);
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
               await getAllReglesConservations();
               await getAllTypesDocuments();
               await getAllCategoriesDocuments();

        });

        return {
            reglesConservations,showMErr, title, btntext, resetValue, reglesTypesSchema,
            addReglesTypes, reglesTypesForm, addReglesTypesModalRef, reglesTypesnew, reglesConservationsOptions,
            typesDocuments, 
            typesDocumentsOptions,
            categoriesDocuments,
            categoriesDocumentsOptions, 
            ReglesTypes
        };
    },
};

</script>@/models/ReglesTypes