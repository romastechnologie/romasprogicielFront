<template>
    <Card3 colClass="col-sm-12" pre="true" preClass="f-m-light mt-1" headerTitle="true" title="Tooltip form validation"
        :desc="desc">
        <form class="row g-3 needs-validation custom-input" novalidate @submit.prevent="onCustomSubmit">
            <div class="col-md-4 position-relative">
                <label class="form-label" for="validationTooltip01">First name</label>
                <input type="text" class="form-control"
                    v-bind:class="Submitted ? inputs.firstname.errorMessage.length ? 'is-invalid' : 'is-valid' : ''"
                    id="name" placeholder="Your name" v-model="inputs.firstname.data">
                <div class="invalid-tooltip" v-if="inputs.firstname.errorMessage.length">{{
                    inputs.firstname.errorMessage
                }}</div>
                <div class="valid-tooltip" v-else>Looks Good!</div>
            </div>
            <div class="col-md-4 position-relative">
                <label class="form-label" for="validationTooltip02">Last name</label>
                <input class="form-control" type="text"
                    v-bind:class="Submitted ? inputs.lastname.errorMessage.length ? 'is-invalid' : 'is-valid' : ''"
                    id="name" placeholder="Your name" v-model="inputs.lastname.data">
                <div class="invalid-tooltip" v-if="inputs.lastname.errorMessage.length">{{
                    inputs.lastname.errorMessage
                }}</div>
                <div class="valid-tooltip" v-else>Looks Good!</div>
            </div>
            <div class="col-md-4 position-relative">
                <label class="form-label" for="validationTooltipUsername">Username</label>
                <div class="input-group has-validation"><span class="input-group-text"
                        id="validationTooltipUsernamePrepend">@</span>
                    <input class="form-control" id="validationCustomUsername" type="text"
                        v-bind:class="Submitted ? inputs.username.errorMessage.length ? 'is-invalid' : 'is-valid' : ''"
                        placeholder="Username" v-model="inputs.username.data">
                    <div class="invalid-tooltip" v-if="inputs.username.errorMessage.length">{{
                        inputs.username.errorMessage
                    }}</div>
                    <div class="valid-tooltip" v-else>Looks Good!</div>
                </div>
            </div>
            <div class="col-md-6 position-relative">
                <label class="form-label" for="validationTooltip03">City</label>
                <input class="form-control" id="validationCustom03" type="text"
                    v-bind:class="Submitted ? inputs.city.errorMessage.length ? 'is-invalid' : 'is-valid' : ''"
                    placeholder="City" required v-model="inputs.city.data">
                <div class="invalid-tooltip" v-if="inputs.city.errorMessage.length">{{ inputs.city.errorMessage }}
                </div>
                <div class="valid-tooltip" v-else>Looks Good!</div>
            </div>
            <div class="col-md-3 position-relative">
                <label class="form-label" for="validationTooltip04">State</label>
                <select class="form-select" id="validationCustom04"
                    v-bind:class="Submitted ? inputs.state.errorMessage.length ? 'is-invalid' : 'is-valid' : ''"
                    v-model="inputs.state.data" required>
                    <option selected disabled value="">Choose...</option>
                    <option v-for="(value, index) in optionValues" :value="value" :key="value + index">{{ value }}
                    </option>
                </select>
                <div class="invalid-tooltip" v-if="inputs.state.errorMessage.length">{{ inputs.state.errorMessage }}
                </div>
                <div class="valid-tooltip" v-else>Looks Good!</div>
            </div>
            <div class="col-md-3 position-relative">
                <label class="form-label" for="validationTooltip05">Zip</label>
                <input class="form-control" id="validationCustom05" type="text"
                    v-bind:class="Submitted ? inputs.zip.errorMessage.length ? 'is-invalid' : 'is-valid' : ''"
                    v-model="inputs.zip.data" placeholder="Zip" required>
                <div class="invalid-tooltip" v-if="inputs.zip.errorMessage.length">{{ inputs.zip.errorMessage }}
                </div>
                <div class="valid-tooltip" v-else>Looks Good!</div>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Submit form</button>
            </div>
        </form>
    </Card3>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
import { onCustomSubmit, inputs, Submitted, optionValues } from "@/composables/common/validationForm"
const Card3 = defineAsyncComponent(() => import("@/components/common/card/CardData3.vue"))
let desc = ref<string>("If your form layout allows it, you can swap the <code>.{valid|invalid}</code>-feedback classes for<code>.{valid|invalid}</code>-tooltip classes to display validation feedback in a styled tooltip. Be sure to have a parent with <code>position: relative</code> on it for tooltip positioning.")
</script>