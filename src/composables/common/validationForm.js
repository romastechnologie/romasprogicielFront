import { ref } from 'vue';
export let errors = ref([]);
export let optionValues = ref(['U.S', 'Thailand', 'India', 'U.K']);
export let themeValue = ref(["Mofi", "Mofi", "Wingo"]);
export let feedbacks = ref(["Cuba", "Tivo", "Wingo"]);
export let inputs = ref({
    firstname: {
        data: 'Mark',
        errorMessage: 'asdasd',
    }, lastname: {
        data: 'Otto',
        errorMessage: ''
    }, username: {
        data: '',
        errorMessage: ''
    }, city: {
        data: '',
        errorMessage: ''
    }, state: {
        data: '',
        errorMessage: ''
    }, zip: {
        data: '',
        errorMessage: ''
    }, password: {
        data: '',
        errorMessage: ''
    }, feedback: {
        data: '',
        errorMessage: ''
    }
});
export let formSubmitted = ref(false);
export let Submitted = ref(false);
export function onCustomStyleSubmit() {
    formSubmitted.value = true;
    const values = inputs.value;
    values.firstname.data.length < 3 ? values.firstname.errorMessage = 'Please choose a firstname' : values.firstname.errorMessage = '';
    values.lastname.data.length < 3 ? values.lastname.errorMessage = 'Please choose a lastname.' : values.lastname.errorMessage = '';
    values.username.data.length < 3 ? values.username.errorMessage = 'Please choose a username.' : values.username.errorMessage = '';
    values.city.data.length < 3 ? values.city.errorMessage = 'Please provide a valid city.' : values.city.errorMessage = '';
    values.state.data.length < 1 ? values.state.errorMessage = 'Please select a valid state.' : values.state.errorMessage = '';
    values.zip.data.length < 7 ? values.zip.errorMessage = 'Please provide a valid zip.' : values.zip.errorMessage = '';
    values.password.data.length < 1 ? values.password.errorMessage = 'Please provide a valid password.' : values.password.errorMessage = '';
}
export function onCustomSubmit() {
    Submitted.value = true;
    const values = inputs.value;
    values.firstname.data.length < 3 ? values.firstname.errorMessage = 'Please choose a firstname' : values.firstname.errorMessage = '';
    values.lastname.data.length < 3 ? values.lastname.errorMessage = 'Please choose a lastname.' : values.lastname.errorMessage = '';
    values.username.data.length < 3 ? values.username.errorMessage = 'Please choose a username.' : values.username.errorMessage = '';
    values.city.data.length < 3 ? values.city.errorMessage = 'Please provide a valid city.' : values.city.errorMessage = '';
    values.state.data.length < 1 ? values.state.errorMessage = 'Please select a valid state.' : values.state.errorMessage = '';
    values.zip.data.length < 7 ? values.zip.errorMessage = 'Please provide a valid zip.' : values.zip.errorMessage = '';
    values.feedback.data.length < 7 ? values.feedback.errorMessage = 'Please provide a valid feedback.' : values.feedback.errorMessage = '';
}
//# sourceMappingURL=validationForm.js.map