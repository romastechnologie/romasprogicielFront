<template>
<div class="card card-flush h-md-100">
	<div class="card-header">
		<div class="card-title">
			<h2>{{ nom }}</h2>
		</div>
	</div>
	<div class="card-body pt-1">
		<div class="fw-bolder text-gray-600 mb-5">Nombre total de permission ayant ce rôle: {{ privileges?.length }}</div>
		<div class="d-flex flex-column text-gray-600">
			<div class="d-flex align-items-center" v-for="(pri, index) in privileges" :key="index">
				<div class="flex-grow-1" v-if="index < 5">
				<h5 class="pb-2 f-w-600" v-if="pri.permission ">{{ pri.permission.description }}</h5>
				</div>
			</div>
			<div  class="d-flex align-items-center py-2" v-if="number > 5">
				<span class="bullet bg-primary me-3"></span>
				<em>et {{ number - 5 }} de plus...</em>
			</div>
		</div>
	</div>
	<div class="card-footer flex-wrap pt-2">
		<router-link :to="{ name: 'ViewRolePage', params: { id: id } }" class="default-btn me-2 text-white btn bg-success btn-md">
			<i class="fa fa-eye lh-2 position-relative top-1"></i>
		</router-link>
		<router-link :to="{ name: 'EditRolePage', params: { id: id } }" class="btn btn-md btn-primary my-1 me-2">
			<i class="fa fa-pencil lh-2  position-relative top-1"></i>
		</router-link>
		<button type="button" @click="$emit('delete')" class="btn btn-md btn-danger btn-active-danger my-1">
			<i class="fa fa-trash lh-2  position-relative top-1" ></i>
			
		</button>
	</div>
</div>
</template>
  
<script lang="ts" >
import type { RolePermission } from "@/models/Role";
import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "role-card",
    props: {
		id: {
			type: Number,
			required: true,
		}, 
        nom:{
			type:String,
			required: true,
		},
        number:{
			type: Number,
			required: true,
			default:0
		},
        privileges: Array as () => Array<RolePermission>,
    },
  });
</script>