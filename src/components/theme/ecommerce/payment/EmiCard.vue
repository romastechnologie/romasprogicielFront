<template>
    <Card3 colClass="col-xxl-4 col-lg-6 box-col-6" cardhaderClass="py-4" headerTitle="true" title="EMI">
        <form class="theme-form row">
            <div class="mb-3 col-6 p-r-0">
                <input class="form-control" type="text" placeholder="First Name">
            </div>
            <div class="mb-3 col-6">
                <input class="form-control" type="text" placeholder="Last name">
            </div>
            <div class="mb-3 col-6 p-r-0">
                <input class="form-control" type="text" placeholder="Pincode">
            </div>
            <div class="mb-3 col-6">
                <select class="form-select" size="1">
                    <option>Bank Name</option>
                    <option>SBI</option>
                    <option>ICICI</option>
                    <option>KOTAK</option>
                    <option>BOB</option>
                </select>
            </div>
            <div class="mb-3 col-12">
                <select class="form-select" size="1">
                    <option>Select Card</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
            <div class="mb-3 col-12">
                <select class="form-select" size="1">
                    <option>Select Duration</option>
                    <option>2015-2016</option>
                    <option>2016-2017</option>
                    <option>2017-2018</option>
                    <option>2018-2019</option>
                </select>
            </div>
            <div class="mb-3 col-12">
                <ul class="payment-opt">
                    <li><img src="@/assets/images/ecommerce/mastercard.png" alt=""></li>
                    <li><img src="@/assets/images/ecommerce/visa.png" alt=""></li>
                    <li><img src="@/assets/images/ecommerce/paypal.png" alt=""></li>
                </ul>
            </div>
            <div class="col-12">
                <button class="btn btn-primary btn-block" type="button" title="">Submit</button>
            </div>
        </form>
    </Card3>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'
const Card3 = defineAsyncComponent(() => import("@/components/common/card/CardData3.vue"))
</script>