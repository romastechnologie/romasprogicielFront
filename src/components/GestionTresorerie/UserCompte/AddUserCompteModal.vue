<template>
    <div class="modal fade" id="AddUserCompteModal" tabindex="-1" role="dialog" ref="addUserCompteModalRef"
        aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="monnaieForm" @submit="addUserCompte" :validation-schema="userCompteSchema">
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Numéro de compte <span class="text-danger">*</span>
                                    </label>
                                    <Field name="numCompte" type="text"
                                        class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Entrer le libelle" />
                                    <ErrorMessage name="numCompte" class="text-danger" />
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Utilisateur <span class="text-danger">*</span>
                                    </label>
                                    <Field name="utilisateurName" type="text"
                                        class="form-control shadow-none fs-md-15 text-black" placeholder="Valeur"
                                        as="select">
                                        <option v-for="user in users" :key="user.id" :value="user.id">
                                            {{ user.nom }} {{ user.prenom }}</option>
                                    </Field>
                                    <ErrorMessage name="utilisateurName" class="text-danger" />
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Tresorerie <span class="text-danger">*</span>
                                    </label>
                                    <Field name="tresorerieName" type="text"
                                        class="form-control shadow-none fs-md-15 text-black" placeholder="Valeur"
                                        as="select">
                                        <option v-for="tresorerie in tresoreries" :key="tresorerie.id"
                                            :value="tresorerie.id">{{ tresorerie.nom }}</option>
                                    </Field>
                                    <ErrorMessage name="tresorerieName" class="text-danger" />
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
import { ref, watch,onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { Monnaie } from '@/models/Monnaie';
import { UserCompte } from '@/models/UserCompte';
import { User } from '@/models/users';
import { Tresorerie } from '@/models/Tresorerie';



export default {
    name: "AddUserCompteModal",
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
    emits: ["refreshUserComptes", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const userCompteSchema = Yup.object().shape({
            numCompte: Yup.string().required('Le numéro de compte est obligatoire'),
            utilisateurName: Yup.string().required('L\'utilisateur est obligatoire'),
            tresorerieName: Yup.string().required('La trésorerie est obligatoire'),
        });

        const tresoreries = ref<Tresorerie[]>([])
        const users = ref<User[]>([])
        const userComptenew = ref(props.id);
        const userCompteForm = ref<UserCompte | null>(null);
        const addUserCompteModalRef = ref<null | HTMLElement>(null);
        let userComptes = ref<Array<UserCompte>>([]);
        const title = ref('Ajouter une numéro de compte');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();

        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getUserCompte(newValue);
                isupdate.value = true;
            }
            btnTitle();
        });

        const getUserCompte = async (id: number) => {
            return ApiService.get("/userComptes/" + id)
                .then((res) => {
                    userCompteForm.value?.setFieldValue("numCompte", res.data.numCompte);
                    // userCompteForm.value?.setFieldValue("libelle", res.data.libelle);
                    // userCompteForm.value?.setFieldValue("valeur", res.data.valeur);
                    emit('openmodal', addUserCompteModalRef.value);
                })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

        const getTresorerie = () => {
            ApiService.get('/tresoreries')
                .then(res => {
                    tresoreries.value = res.data
                    console.log(res)
                })
        }

        function getAllUsers() {
            return ApiService.get(`/users`)
                .then(({ data }) => {
                    users.value = data.data.data;
                    return data.data;
                })
                .catch(({ response }) => {

                });
        }

        const btnTitle = async () => {
            if (isupdate.value) {
                title.value = "Modifier le numéro de compte";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter un compte";
                btntext.value = "Ajouter";
            }
        }

        const addUserCompte = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as UserCompte;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/userComptes/${values.id}`, values)
                    .then((res) => {
                        if (res.data.code == 200) {
                            success(res.data.message);
                            resetForm();
                            hideModal(addUserCompteModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit("refreshUserComptes");
                            router.push('/userComptes/liste-userCompte');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else {
                ApiService.post("/userComptes", values)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.code == 201) {
                            success(res.data.message)
                            resetForm();
                            hideModal(addUserCompteModalRef.value);
                            //router.push('/monnaies/liste-monnaie');
                            emit("refreshUserComptes");

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
        onMounted(() => {
            getTresorerie(),
            getAllUsers()
        })

        return {
            userComptes, title, btntext, resetValue, userCompteSchema,
            addUserCompte, userCompteForm, addUserCompteModalRef, userComptenew, getAllUsers, users, getTresorerie,
            tresoreries
            //refreshMonnaies
        };
    },
};

</script>