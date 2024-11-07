<template>
    <div class="modal fade" id="AddEcheanceModal" tabindex="-1" role="dialog"
        ref="addEcheanceModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="echeanceForm" @submit="addEcheance"
                        :validation-schema="echeanceSchema">
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label for="ref" class="form-label">Date Echeance<span class="text-danger">*</span></label>
                                <Field name="dateEcheance" class="form-control" type="Date" />
                                <ErrorMessage name="dateEcheance" class="text-danger" />
                            </div>

                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Montant<span class="text-danger">*</span>
                                    </label>
                                    <Field name="montant" type="number"
                                        class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Entrer le montant" />
                                    <ErrorMessage name="montant" class="text-danger" />
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Reste A Paye<span class="text-danger">*</span>
                                    </label>
                                    <Field name="resteAPaye" type="number"
                                        class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Entrer le Reste à Payer" />
                                    <ErrorMessage name="resteAPaye" class="text-danger" />
                                </div>
                            </div>
                          
                            <div class="col-md-12 mb-4">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        Demande
                                    </label>
                                    <Field name="demande" v-model="demandes" type="text"
                                        v-slot="{ field }">
                                        <Multiselect v-model="field.value" v-bind="field"
                                            :options="demandesOptions" :preserve-search="true"
                                            :multiple="false" :searchable="true"
                                            placeholder="Sélectionner la demande" label="label"
                                            track-by="label" />
                                    </Field>
                                    <span class="text-danger" v-if="showMErr">La demande est
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
import { Echeance } from '@/models/Echeance';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';

export default {
    name: "AddEcheanceModal",
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
    emits: ["refreshDeamndes", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const echeanceSchema = Yup.object().shape({
            dateEcheance: Yup.string().required('La date echeance est obligatoire'),
            montant: Yup.string().required('Le montant est obligaoire'),
            resteAPaye: Yup.string().required('La reste a payer est obligatoire'),
            demande: Yup.string().notRequired(),     
        });

        const demandesnew = ref(props.id);
        const echeanceForm = ref<Echeance | null>(null);
        const addEcheanceModalRef = ref<null | HTMLElement>(null);
        let Echeance = ref<Array<Echeance>>([]);
        const title = ref('Ajouter une echeance');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();
        const demandes = ref();
        const demandesOptions = ref([]);
        const showMErr = ref(false);

        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getEcheances(newValue);
                isupdate.value = true;
                getAllDemandes();
            }
            btnTitle();
        });

        const getEcheances = async (id: number) => {
            console.log(id, "Element recupéré")
            return ApiService.get("/echeances/" + id)
                .then(({ data }) => {
                    const donnees = data.data;
                    for (const key in donnees) {
                        echeanceForm.value?.setFieldValue(key,
                            (typeof donnees[key] === 'object' && donnees[key] !== null) ? donnees[key].id : donnees[key]
                        );
                    }
                    emit('openmodal', addEcheanceModalRef.value);
                })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

        const getAllDemandes = async () => {
            console.log('Data')

            try {
                const response = await ApiService.get('/all/demandes');
                const demandesData = response.data.data.data;
                console.log('response',response)
                console.log('demandesData',demandesData)

                demandesOptions.value = demandesData.map((demande) => ({
                    value: demande.id,
                    label: demande.statut,

                }));
            }
            catch (error) {
                //error(response.data.message)
            }
        }


        const btnTitle = async () => {
            if (isupdate.value) {
                title.value = "Modifier l'échéance";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter une écheance";
                btntext.value = "Ajouter";
            }
        }

        const addEcheance = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as Echeance;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/echeances/${values.id}`, values)
                    .then(({ data }) => {
                        if (data.code == 200) {
                            success(data.message);
                            resetForm();
                            hideModal(addEcheanceModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit('close');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else {
                ApiService.post("/echeances", values)
                    .then(({ data }) => {
                        if (data.code == 201) {
                            success(data.message)
                            resetForm();
                            hideModal(addEcheanceModalRef.value);
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
               await getAllDemandes();
        });

        return {
            demandes,showMErr, title, btntext, resetValue, echeanceSchema,
            addEcheance, echeanceForm, addEcheanceModalRef, demandesnew, demandesOptions, Echeance
        };
    },
};


</script>