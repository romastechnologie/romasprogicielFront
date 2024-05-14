<template>
    <!-- <Card3 colClass="col-sm-12">
        <ProductFilter :product="products" /> -->
        <div class="list-product table-responsive theme-scrollbar">
            <form>
                <div class="mb-3 row justify-content-end">
                    <label for="table-complete-search" class="col-xs-3 col-sm-auto col-form-label">Search:</label>
                    <div class="col-xs-3 col-sm-auto">
                        <input id="table-complete-search" type="text" class="form-control" v-model="filterQuery">
                    </div>
                </div>
                <table class="table display" id="project-status">
                    <thead>
                        <tr>
                            <th>
                                <div class="form-check">
                                    <input class="form-check-input checkbox-primary" type="checkbox">
                                </div>
                            </th>
                            <th> <span class="f-light f-w-600">Nom et Prénom</span></th>
                            <th> <span class="f-light f-w-600">Telephone</span></th>
                            <th> <span class="f-light f-w-600">Email</span></th>
                            <th> <span class="f-light f-w-600">Rôle</span></th>
                            <th> <span class="f-light f-w-600">Sexe</span></th>
                            <th> <span class="f-light f-w-600">Status</span></th>
                            <th> <span class="f-light f-w-600">Date de création</span></th>
                            <th> <span class="f-light f-w-600">Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="product-removes" v-for ="(user, index) in users" :key="index">
                            <td>
                                <div class="form-check">
                                    <input class="form-check-input checkbox-primary" type="checkbox">
                                </div>
                            </td>
                            <td>
                                <p class="f-light">{{ user.nomComplet }}</p>
                            </td>
                            <td>
                                <p class="f-light">{{ user.telephone }}</p>
                            </td>
                            <td>
                                <p class="f-light">{{ user.email }}</p>
                            </td>
                            <td>
                                <p class="f-light">{{ user?.role?.nom }}</p>
                            </td>
                            <td>
                                <p class="f-light">{{ user.sexe }}</p>
                            </td>
                            <td> <span class="badge">Actif</span></td>
                            <td>
                                <p class="f-light">{{ format_date(user.createdAt) }} </p>
                            </td>
                            <td>
                                <div class="product-action">
                                    <svg>
                                        <use href="@/assets/svg/icon-sprite.svg#trash1"></use>
                                    </svg>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <ul class="pagination mt-2 justify-content-end pagination-primary">
                    <li class="page-item"> <a class="page-link" v-on:click="prev()" aria-label="Previous"><span
                                aria-hidden="true">&laquo;</span></a></li>
                    <li class="page-item" v-for="i in num_pages()" :key="i"
                        v-bind:class="[i == currentPage ? 'active' : '']" v-on:click="change_page(i)">
                        <a class="page-link">{{ i }}</a>
                    </li>
                    <li class="page-item"><a class="page-link" v-on:click="change()" aria-label="Next"><span
                                aria-hidden="true">&raquo;</span></a></li>
                </ul>
            </form>
        </div>
    <!-- </Card3> -->
</template>

<!-- <script lang="ts" setup>
import { ref, defineAsyncComponent, watch, onMounted } from 'vue'
import { product, categorys, subcategory, statu, price, productlist } from "@/core/data/ecommerce"
import { getImages } from "@/composables/common/getImages"
const Card3 = defineAsyncComponent(() => import("@/components/common/card/CardData3.vue"))
const ProductFilter = defineAsyncComponent(() => import("@/components/theme/ecommerce/productlist/ProductFilter.vue"))
let elementsPerPage = ref<number>(10)
let currentPage = ref<number>(1)
let filterQuery = ref<string>("")
let allData = ref<any[]>([])
let products = ref<string>("")
watch(filterQuery, (search: string) => {
    var filteredData = productlist.filter((row) => {
        return (
            row.name.toLowerCase().includes(search.toLowerCase()) || row.sku.toLowerCase().includes(search.toLowerCase()) || row.category.toLowerCase().includes(search.toLowerCase())
        )
    });
    search == "" ? allData.value = productlist : allData.value = filteredData
})
watch(products, (item: string) => {
    return item ? allData.value.filter((products) => !products.product.indexOf(allData.value)) : item

})
function get_rows() {
    var start = (currentPage.value - 1) * elementsPerPage.value;
    var end = start + elementsPerPage.value;
    return allData.value.slice(start, end);
}
function stars(count: number) {
    var stars = '';

    for (var i = 0; i < 5; i++) {
        if (count > i) {
            stars = stars + '<i class="fa fa-star txt-warning"></i>';
        } else {
            stars = stars + '<i class="fa fa-star f-light"></i>';
        }
    }

    return stars;
}
function num_pages() {
    return Math.ceil(allData.value.length / elementsPerPage.value);
}
function change_page(page: number) {
    currentPage.value = page;
}
function change() {
    currentPage.value++;
}
function prev() {
    currentPage.value--;
}
onMounted(() => { allData.value = productlist; })
</script> -->

<script lang="ts">
import { defineComponent,defineAsyncComponent, onMounted, ref} from "vue";
import ApiService from "@/services/ApiService";
import { User } from "@/models/users";
import { format_date, suppression, error, } from "@/utils/utils";
import JwtService from "@/services/JwtService";
import Card3 from "@/components/common/card/CardData3.vue";
import ProductFilter from "@/components/theme/ecommerce/productlist/ProductFilter.vue";

export default defineComponent({
  //name: "ListeUser",
  components: {
    Card3,
    ProductFilter,
  },
  setup(){
    onMounted(() => {
      getAllUsers();
    });

    const Card3 = defineAsyncComponent(() => import("@/components/common/card/CardData3.vue"))
    const ProductFilter = defineAsyncComponent(() => import("@/components/theme/ecommerce/productlist/ProductFilter.vue"))
    const users = ref<Array<User>>([]);
    const user = ref<User>();

    let elementsPerPage = ref<number>(10)
    let currentPage = ref<number>(1)
    let filterQuery = ref<string>("")
    let allData = ref<any[]>([])
    let products = ref<string>("")

    // BEGIN PAGINATE
    // const searchTerm = ref('');
    // const page = ref(1);
    // const totalPages = ref(0);
    // const limit = ref(10);
    // const totalElements = ref(0);

    // const handlePaginate = ({ page_, limit_ }) => {
    //   try {
    //     page.value = page_;
    //     getAllUsers(page_, limit_);
    //   } catch (error) {
    //     //
    //   }
    // };

    //  function rechercher(){
    //   getAllUsers(page.value, limit.value, searchTerm.value );
    // }


    // END PAGINATE

    function getAllUsers(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/users?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          users.value = data.data.data;
        //   totalPages.value = data.data.totalPages;
        //   limit.value = data.data.limit;
        //   totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }

    const selectedUser = ref<User | undefined>(undefined);

    const num_pages = () => {
    return Math.ceil(allData.value.length / elementsPerPage.value);
}

//   const openEditAgenceModal = (user: User) => {
//     selectedUser.value = { ...user };
//   };

//   const openEditPassModal = (user: User) => {
//     selectedUser.value = { ...user };
//   };

  const privileges = ref<Array<string>>(JwtService.getPrivilege());

//   const checkPermission = (name) => {
//     return privileges.value.includes(name);
//   }

    return {users,
      //checkPermission,
      format_date,
      suppression,
      user,
      selectedUser,
    //   openEditAgenceModal,
    //   openEditPassModal,
    //   page, 
    //   totalPages,
    //   limit,
    //   totalElements,
    //   handlePaginate,
    //   searchTerm,
    //   rechercher
      num_pages,
      Card3,
      ProductFilter,
      elementsPerPage,
      allData,
    };
  },
});
</script>