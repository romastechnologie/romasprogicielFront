<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-5 b-center bg-size"
                :style="{ backgroundImage: 'url(' + require('@/assets/images/login/log.jpg') + ')' }"><img
                    class="bg-img-cover bg-center" src="@/assets/images/login/log.jpg" alt="looginpage"></div>
            <div class="col-xl-7 p-0">
                <div class="login-card login-dark">
                    <div>
                        <div><a class="logo "> <router-link to="/"><img class="img-fluid for-light"
                            src="@/assets/images/logo/logo.png" alt="looginpage"><img class="img-fluid for-dark"
                            src="@/assets/images/logo/logo_dark.png" alt="looginpage"></router-link></a></div>
                        <div class="login-main">
                            <Form class="theme-form" ref="loginForm" @submit="onSubmitLogin" :validation-schema="loginSchema">
                                <h4>Connecter-vous à votre compte</h4>
                                <p>Entrer votre email et votre mot de passe</p>
                                <div class="form-group">
                                    <label class="col-form-label">Email </label>
                                    <Field name="email" type="email" 
                                    class="form-control" placeholder="Entrer votre email"/>
                                    <ErrorMessage name="email" class="text-danger"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label">Mot de passe</label>
                                    <div class="form-input position-relative">
                                        <Field name="password" :type="showPassword ? 'password' : 'text'" class="form-control pr-5" placeholder="Entrer votre mot de passe"/>
                                        <i :class="{ 'fa fa-eye': !showPassword, 'fa fa-eye-slash': showPassword }" class="flaticon-eye position-absolute end-0 top-50 translate-middle-y pe-2" @click="toggleShow" :aria-label="buttonLabel"></i>
                                        <ErrorMessage name="password" class="text-danger"/>
                                    </div>
                                </div>
                                <div class="form-group mb-0">
                                    <div class="checkbox p-0">
                                        <input id="checkbox1" type="checkbox">
                                        <label class="text-muted" for="checkbox1">Se souvenir de moi</label>
                                    </div><a class="link"><router-link to="/authentication/forget_password">Mot de passe oublié
                                            ?</router-link></a>
                                    <div class="text-end mt-3">
                                        <button ref="submitButton" class="btn btn-primary btn-block w-100" type="submit" >Connectez-vous maintenant
                                            </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" >
import { defineComponent, ref, computed } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as Yup from 'yup';
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useAuthStore } from '@/services/auth';
import Swal from 'sweetalert2';
import store from '@/utils/store';

export default defineComponent({
    name: "LoginPage",
    components: {
      Form,
      Field,
      ErrorMessage
    },
    setup: ({}) => {

    const loginSchema = Yup.object().shape({
    email: Yup.string().email("L'email est invalide").required('L\'email   est obligatoire'),
    password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
    });

    const router  = useRouter();
    const store = useAuthStore();
    const submitButton = ref<HTMLButtonElement | null>(null);

    const loginForm = ref(null);
    const onSubmitLogin = async (values: any) => {
     // values = values as User;
      // Clear existing errors
      store.logout();
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value.disabled = true;
      }
      // Send login request
      await store.login(values);
      const error = Object.values(store.errors);
      console.log('Pas de erreurs', error)

      if (error.length === 0) {
          console.log('Dans la fonction je suis')
          //router.push('defaultRoot');
          router.replace('/accueil/tableau-bord');
          localStorage.setItem('user', 'test@gmail.com')
          localStorage.setItem("SidebarType", 'compact-wrapper')
      } else {
        Swal.fire({
          text: error[1] as string,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-sm fw-semobold btn-danger",
          },
        }).then(() => {
          store.errors = {};
        });
      }
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

        const showPassword = ref(true);
        const password = ref(null);

        const toggleShow = () => {
        showPassword.value = !showPassword.value;
        };

        const buttonLabel = computed(() => (showPassword.value ? 'Hide' : 'Show'));

        return {
            onSubmitLogin,
             loginForm,
            submitButton,
            showPassword,
            toggleShow,
            buttonLabel,
            password,
            loginSchema,
        }
    }

    });
</script>