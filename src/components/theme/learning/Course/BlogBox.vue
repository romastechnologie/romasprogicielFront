<template>
    <div class="col-xl-9 xl-60 order-xl-0 order-1 box-col-12">
        <div class="card">
            <div class="card-body">
                <div class="blog-single">
                    <div class="blog-box blog-details"><img class="img-fluid w-100" src="@/assets/images/faq/learning-1.png"
                            alt="blog-main">
                        <div class="blog-details">
                            <ul class="blog-social">
                                <li>25 July 2018</li>
                                <li><i class="icofont icofont-user"></i>Mark <span>Jecno </span></li>
                                <li><i class="icofont icofont-thumbs-up"></i>02<span>Hits</span></li>
                                <li><i class="icofont icofont-ui-chat"></i>598 Comments</li>
                            </ul>
                            <h4 class="pt-2">Knowledge can be defined as awareness of facts or as practical skills. there is
                                wide agreement among philosophers that it is a form of true belief.</h4>
                            <div class="single-blog-content-top">
                                <p>Knowledge can be defined as awareness of facts or as practical skills, and may also refer
                                    to familiarity with objects or situations. Knowledge of facts, also called propositional
                                    knowledge, is often defined as true belief that is distinct from opinion or guesswork by
                                    virtue of justification. While there is wide agreement among philosophers that it is a
                                    form of true belief, many controversies in philosophy focus on justification: whether it
                                    is needed at all, how to understand it, and whether something else besides it is needed.
                                </p>
                                <p>Knowledge can be produced in many different ways. The most important source is
                                    perception, which refers to the usage of the five senses. Many theorists also include
                                    introspection as a source of knowledge, not of external physical objects, but of one's
                                    own mental states. Other sources often discussed include memory, rational intuition,
                                    inference, and testimony. According to foundationalism, some of these sources are basic
                                    in the sense that they can justify beliefs without depending on other mental states.
                                    This claim is rejected by coherentists.</p>
                            </div>
                        </div>
                    </div>
                    <CourseDetail />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
const CourseDetail = defineAsyncComponent(() => import("@/components/theme/learning/Course/CourseDetail.vue"))
</script>