<template>
    <Card3 colClass="col-sm-12" table="true" text="true" headerTitle="true" title="Inverse Table with Primary background"
        :desc="desc">
        <div class="table-responsive theme-scrollbar">
            <table class="table table-striped bg-primary">
                <thead class="tbl-strip-thad-bdr">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Credit Volume </th>
                        <th scope="col">Username</th>
                        <th scope="col">Role </th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in data" :key="index">
                        <th scope="row">{{ item.id }}</th>
                        <td>{{ item.firstName }}</td>
                        <td>{{ item.lastName }}</td>
                        <td>{{ item.company }}</td>
                        <td>{{ item.credit }}</td>
                        <td>{{ item.userName }}</td>
                        <td>{{ item.role }}</td>
                        <td>{{ item.country }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Card3>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
import { data } from "@/core/data/table"
import { getImages } from "@/composables/common/getImages"
const Card3 = defineAsyncComponent(() => import("@/components/common/card/CardData3.vue"))
let desc = ref<string>("Use a class <code>.bg-info, .bg-success, .bg-warning and .bg-danger classes.</code> with light text on dark backgrounds inside table element.<br>To set the light background color use .bg-[color] class where [color] is the value of your selected color from stack color palette. So for teal color background class will be .bg-teal")
</script>