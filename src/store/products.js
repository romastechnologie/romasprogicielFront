import { defineStore } from 'pinia';
import { ref, computed, } from 'vue';
import { data } from "@/core/data/products";
export const useProductsStore = defineStore('products', () => {
    let datas = ref(data);
    let col2 = ref(false);
    let col3 = ref(false);
    let col4 = ref(true);
    let col6 = ref(false);
    let listViewEnable = ref(false);
    let list = ref(false);
    let cartItems = ref([]);
    let cart = ref(cartItems);
    let products = ref([]);
    let tagItems = ref([]);
    let filteredProduct = ref([]);
    function productData(value) {
        products.value = value;
    }
    function grid2(item) {
        col2.value = item;
        col3.value = false;
        col4.value = false;
        col6.value = false;
        listViewEnable.value = false;
    }
    function grid3() {
        col2.value = false;
        col3.value = true;
        col4.value = false;
        col6.value = false;
        listViewEnable.value = false;
    }
    function grid4() {
        col2.value = false;
        col3.value = false;
        col4.value = true;
        col6.value = false;
        listViewEnable.value = false;
    }
    function grid6() {
        col2.value = false;
        col3.value = false;
        col4.value = false;
        col6.value = true;
        listViewEnable.value = false;
    }
    function listView() {
        listViewEnable.value = true;
        list.value = true;
        col2.value = false;
        col3.value = false;
        col4.value = false;
        col6.value = false;
    }
    function gridView() {
        listViewEnable.value = false;
        col4.value = true;
    }
    const filterProducts = computed(() => {
        return products.value.filter((product) => {
            if (!tagItems.value.length)
                return true;
            const Tags = tagItems.value.some((prev) => {
                if (product.tags) {
                    if (product.tags.includes(prev)) {
                        return prev;
                    }
                }
            });
            return Tags;
        });
    });
    function addToCart(product) {
        const hasItems = cart.value.find((items) => {
            if (items.sku === product.sku) {
                items.quantity = items.quantity ? items.quantity : 1;
                return true;
            }
            return false;
        });
        if (!hasItems) {
            cart.value.push(product);
        }
        localStorage.setItem('cartItem', JSON.stringify(cart.value));
    }
    function updateCartQuantity(item) {
        function calculateStockCounts(product, quantity) {
            const qty = product.quantity + quantity;
            const stock = product.stock;
            if (stock < qty) {
                return false;
            }
            return true;
        }
        cartItems.value.find((items, index) => {
            if (items.sku === item.product.sku) {
                const qty = cartItems.value[index].quantity + item.qty;
                const stock = calculateStockCounts(cartItems.value[index], item.qty);
                if (qty !== 0 && stock)
                    cartItems.value[index]['quantity'] = qty;
                else
                    localStorage.setItem('cartItem', JSON.stringify(cartItems));
                return true;
            }
        });
    }
    function setTags(item) {
        tagItems.value = item;
    }
    const getColors = computed(() => {
        const uniqueColors = [];
        const itemColor = [];
        products.value.map((product) => {
            if (product.colors) {
                product.colors.map((color) => {
                    const index = uniqueColors.indexOf(color);
                    if (index === -1)
                        uniqueColors.push(color);
                });
            }
        });
        for (let i = 0; i < uniqueColors.length; i++) {
            itemColor.push({ color: uniqueColors[i] });
        }
        return itemColor;
    });
    const getBrands = computed(() => {
        const brands = [...new Set(products.value.map((product) => product.brand))];
        return brands;
    });
    function priceFilter(item) {
        filteredProduct.value = [];
        products.value.find((product) => {
            if (product.price >= item[0] && product.price <= item[1]) {
                filteredProduct.value.push(product);
            }
        });
    }
    const getTotalAmount = computed(() => {
        return cart.value.reduce((prev, curr) => {
            return prev + curr.price * curr.quantity;
        }, 0);
    });
    const getCategory = computed(() => {
        const uniqueCategory = [];
        const itemCat = [];
        products.value.map((product) => {
            if (product.category) {
                product.category.map((category) => {
                    const index = uniqueCategory.indexOf(category);
                    if (index === -1)
                        uniqueCategory.push(category);
                });
            }
        });
        for (let i = 0; i < uniqueCategory.length; i++) {
            itemCat.push({ category: uniqueCategory[i] });
        }
        return itemCat;
    });
    function intialUpload(items) {
        cart.value = items;
    }
    function removeProduct(item) {
        const index = cart.value.indexOf(item);
        cart.value.splice(index, 1);
        localStorage.setItem('cartItem', JSON.stringify(cart.value));
    }
    function sortProducts(item) {
        if (item === 'Featured') {
            products.value.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        }
        else if (item === 'z-a') {
            products.value.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                else if (a.name < b.name) {
                    return 1;
                }
                return 0;
            });
        }
        else if (item === 'Lowest') {
            products.value.sort(function (a, b) {
                if (a.price < b.price) {
                    return -1;
                }
                else if (a.price > b.price) {
                    return 1;
                }
                return 0;
            });
        }
        else if (item === 'Highest') {
            products.value.sort(function (a, b) {
                if (a.price > b.price) {
                    return -1;
                }
                else if (a.price < b.price) {
                    return 1;
                }
                return 0;
            });
        }
    }
    return {
        products,
        col2,
        col3,
        col4,
        col6,
        listViewEnable,
        list,
        grid2,
        grid3,
        grid4,
        grid6,
        listView,
        gridView,
        productData,
        filterProducts,
        setTags,
        getBrands,
        priceFilter,
        addToCart,
        updateCartQuantity,
        getTotalAmount,
        cart,
        getCategory,
        removeProduct,
        sortProducts,
        getColors,
        intialUpload,
        datas
    };
});
//# sourceMappingURL=products.js.map