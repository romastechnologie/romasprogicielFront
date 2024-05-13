<template>
    <div class="container-fluid p-0">
        <div class="row m-0">
            <div class="col-12 p-0">
                <div class="login-card login-dark">
                    <div>
                        <div><router-link class="logo" to="/"><img class="img-fluid for-light"
                                    src="@/assets/images/logo/logo.png" alt="looginpage"><img class="img-fluid for-dark"
                                    src="@/assets/images/logo/logo_dark.png" alt="looginpage"></router-link></div>
                        <div class="login-main">
                            <Form class="theme-form" ref="loginForm" @submit="onSubmitLogin" :validation-schema="loginSchema">
                                <h4>Connecter-vous à votre compte</h4>
                                <p>Entrer votre email et votre mot de passe</p>
                                <div class="form-group">
                                    <label class="col-form-label">Email </label>
                                    <!-- <input v-model="email" class="form-control" type="email" placeholder="Test@gmail.com"> -->
                                    <Field name="email" type="email" 
                                    class="form-control" placeholder="Entrer votre email"/>
                                    <ErrorMessage name="email" class="text-danger"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label">Mot de passe</label>
                                    <div class="form-input position-relative">
                                        <!-- <input v-model="password" :type="type" class="form-control" name="login[password]"
                                            placeholder="*********"> -->
                                            <Field name="password" type="password"  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer votre mot de passe"/>
                                            <ErrorMessage name="password" class="text-danger"/>
                                        <div class="show-hide"><span class="show"> </span></div>
                                    </div>
                                </div>
                                <div class="form-group mb-0">
                                    <div class="checkbox p-0">
                                        <input id="checkbox1" type="checkbox">
                                        <label class="text-muted" for="checkbox1">Remember password</label>
                                    </div><a class="link"><router-link to="/authentication/forget_password">Forgot
                                            password?</router-link></a>
                                    <div class="text-end mt-3">
                                        <button ref="submitButton" class="btn btn-primary btn-block w-100" type="submit" >Connectez-vous maintenant
                                            </button>
                                    </div>
                                </div>
                                <h6 class="text-muted mt-4 or">Ou connectez-vous avec</h6>
                                <div class="social mt-4">
                                    <div class="btn-showcase"><a class="btn btn-light" href="https://www.linkedin.com/login"
                                            target="_blank"><vue-feather class="txt-linkedin" type="linkedin"></vue-feather>
                                            LinkedIn
                                        </a><a class="btn btn-light" href="https://twitter.com/login?lang=en"
                                            target="_blank"><vue-feather class="txt-twitter"
                                                type="twitter"></vue-feather>twitter</a><a class="btn btn-light"
                                            href="https://www.facebook.com/" target="_blank"><vue-feather class="txt-fb"
                                                type="facebook"></vue-feather>facebook</a></div>
                                </div>
                                <p class="mt-4 mb-0 text-center">Don't have account?<router-link class="ms-2"
                                        to="/auth/register">Create Account</router-link></p>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts" >
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as Yup from 'yup';
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useAuthStore } from '@/services/auth';
import Swal from 'sweetalert2';
import store from '@/utils/store';

export default{
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

    // let router = useRouter()
    // let type = ref<string>('password')
    // let email = ref<string>("test@admin.com")
    // let password = ref<string>("test@123456")

    // const showPassword = () =>{
    //     if (type.value === 'password') {
    //         type.value = 'text';
    //     } else {
    //         type.value = 'password';
    //     }
    // }

    const router  = useRouter();
    //const store = useAuthStore();
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
      if (error.length === 0) {
          // Go to page after successfully login
          router.push({ name: "tableauBordPage" });
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
        // const doLogin = () =>{
        //     if (email.value === "test@admin.com") {

        //         router.replace('/');
        //         localStorage.setItem('user', email.value)
        //         localStorage.setItem("SidebarType", 'compact-wrapper')
        //     }
        //     else {
        //         toast.error('Opps... Invalid email and password ', { position: 'top-right', icon: 'times', autoClose: 2000 });
        //     }

        // }

        return {
            onSubmitLogin, loginForm,
            submitButton,
            //showPassword,
            //doLogin,
            loginSchema,

        }
    }

    }
</script>