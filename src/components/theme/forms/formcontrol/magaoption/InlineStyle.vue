<template>
    <Card3 colClass="col-sm-12" cardbodyClass="megaoptions-border-space-sm" pre="true" preClass="f-m-light mt-1"
        headerTitle="true" title="Inline style" :desc="desc" footer="show" footerclass="text-end"
        lightclass="bg-light-warning" btnclass="btn-warning">
        <form class="mega-inline">
            <div class="row">
                <div class="col-sm-6" v-for="(item, index) in inline" :key="index">
                    <div class="card">
                        <div class="d-flex p-20">
                            <div class="form-check radio m-0" :class="item.class">
                                <input class="form-check-input" :id="item.id" type="radio" name="radio1" value="option1">
                                <label class="form-check-label" :for="item.id"><span
                                        class="flex-grow-1 megaoption-space"><span class="mt-0 mega-title-badge">{{
                                            item.label }}<span class="badge pull-right digits" :class="item.badgeclass">{{
        item.badge }}</span></span><span>{{ item.desc }}</span></span></label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </Card3>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
import { inline } from "@/core/data/forms"
import { getImages } from "@/composables/common/getImages"
const Card3 = defineAsyncComponent(() => import("@/components/common/card/CardData3.vue"))
let desc = ref<string>(" For Create inline megaoption add <code>.mega-inline</code> class in form tag")
</script>