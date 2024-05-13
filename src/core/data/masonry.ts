interface anim {
    image: string,
    animation: string
}
interface aosAttribute {
    attr: string;
    desc: string;
    example: string;
    default: string;
}
interface data {
    title: string,
    children: {
        title: string
    }[]
}
interface photos {
    id?: number,
    title: string,
    descr: string,
    image: string
}
interface item {
    image: string
}
export const photo = [
    {
        title: "Johan Deo",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "lightgallry/01.jpg"
    },
    {
        title: "Dev John",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "lightgallry/02.jpg"
    },
    {
        title: "Johan Deo",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "lightgallry/03.jpg"
    },
    {
        title: "Comeren Diaz",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "lightgallry/04.jpg"
    },
    {
        title: "Andew Jon",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "lightgallry/05.jpg"
    },
    {
        title: "Sarah Loren",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "lightgallry/011.jpg"
    },
    {
        title: "Andew Jon",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "lightgallry/010.jpg"
    },
    {
        title: "Bucky Barnes",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "lightgallry/08.jpg"
    }
]
export const search = [
    {
        id: 1,
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "big-lightgallry/01.jpg"
    },
    {
        id: 2,
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "big-lightgallry/02.jpg"
    },
    {
        id: 3,
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "big-lightgallry/03.jpg"
    },
    {
        id: 4,
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "big-lightgallry/04.jpg"
    },
    {
        id: 5,
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "big-lightgallry/05.jpg"
    },
    {
        id: 6,
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "big-lightgallry/011.jpg"
    },
    {
        id: 7,
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "big-lightgallry/010.jpg"
    },
    {
        id: 8,
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\"s standard dummy.",
        image: "big-lightgallry/08.jpg"
    }
]
export const aos: anim[] = [
    { image: "masonry/1.jpg", animation: "fade-down" },
    { image: "masonry/2.jpg", animation: "zoom-out-down" },
    { image: "masonry/3.jpg", animation: "flip-down" },
    { image: "masonry/4.jpg", animation: "fade-up" },
    { image: "masonry/5.jpg", animation: "flip-down" },
    { image: "masonry/6.jpg", animation: "fade-up" },
    { image: "masonry/7.jpg", animation: "flip-down" },
    { image: "masonry/8.jpg", animation: "fade-up" },
    { image: "masonry/9.jpg", animation: "flip-down" },
    { image: "masonry/10.jpg", animation: "fade-up" },
    { image: "masonry/11.jpg", animation: "flip-down" },
    { image: "masonry/12.jpg", animation: "fade-up" },
    { image: "masonry/14.jpg", animation: "flip-down" },
    { image: "masonry/15.jpg", animation: "flip-left" },
    { image: "masonry/13.jpg", animation: "flip-down" },
    { image: "masonry/4.jpg", animation: "zoom-out" },
    { image: "masonry/5.jpg", animation: "flip-right" },
    { image: "masonry/6.jpg", animation: "zoom-out" },
    { image: "masonry/7.jpg", animation: "zoom-out-up" },
    { image: "masonry/8.jpg", animation: "zoom-out-down" },
    { image: "masonry/9.jpg", animation: "flip-down" },
    { image: "masonry/10.jpg", animation: "slide-up" },
    { image: "masonry/9.jpg", animation: "flip-down" },
    { image: "masonry/10.jpg", animation: "fade-up" },
    { image: "masonry/11.jpg", animation: "flip-down" },
    { image: "masonry/12.jpg", animation: "fade-up" },
    { image: "masonry/14.jpg", animation: "flip-down" },
    { image: "masonry/15.jpg", animation: "flip-left" },
    { image: "masonry/13.jpg", animation: "flip-down" },
    { image: "masonry/4.jpg", animation: "zoom-out" },
    { image: "masonry/5.jpg", animation: "flip-right" },
    { image: "masonry/6.jpg", animation: "zoom-out" },
    { image: "masonry/7.jpg", animation: "zoom-out-up" }
]
export const init: aosAttribute[] = [
    {
        attr: "<em><code>data-aos-offset</code></em>",
        desc: "Change offset to trigger animations sooner or later (px)",
        example: "200",
        default: "120"
    },
    {
        attr: "<em><code>data-aos-duration</code></em>",
        desc: "*Duration of animation (ms)",
        example: "600",
        default: "400"
    },
    {
        attr: "<em><code>data-aos-easing</code></em>",
        desc: "Choose timing function to ease elements in different ways",
        example: "ease-in-sine",
        default: "ease"
    },
    {
        attr: "<em><code>data-aos-delay</code></em>",
        desc: "Delay animation (ms)",
        example: "300",
        default: "0"
    },
    {
        attr: "<em><code>data-aos-anchor</code></em>",
        desc: "Anchor element, whose offset will be counted to trigger animation instead of actual elements offset",
        example: "#selector",
        default: "null"
    },
    {
        attr: "<em><code>data-aos-anchor-placement</code></em>",
        desc: "Anchor placement - which one position of element on the screen should trigger animation",
        example: "top-center",
        default: "top-bottom"
    },
    {
        attr: "<em><code>data-aos-once</code></em>",
        desc: "Choose wheter animation should fire once, or every time you scroll up/down to element",
        example: "true",
        default: "false"
    }
]
export const animation: data[] = [
    {
        title: "Fade animations:",
        children: [
            {
                title: "fade"
            },
            {
                title: "fade-up"
            },
            {
                title: "fade-down"
            },
            {
                title: "fade-left"
            },
            {
                title: "fade-right"
            },
            {
                title: "fade-up-right"
            },
            {
                title: "fade-up-left"
            },
            {
                title: "fade-down-right"
            },
            {
                title: "fade-down-left"
            }
        ]
    },
    {
        title: "Flip animations:",
        children: [
            {
                title: "flip-up"
            },
            {
                title: "flip-down"
            },
            {
                title: "flip-left"
            },
            {
                title: "flip-right"
            }
        ]
    },
    {
        title: "Slide animations:",
        children: [
            {
                title: "slide-up"
            },
            {
                title: "slide-down"
            },
            {
                title: "slide-left"
            },
            {
                title: "slide-right"
            }
        ]
    },
    {
        title: "Zoom animations:",
        children: [
            {
                title: "zoom-in"
            },
            {
                title: "zoom-in-up"
            },
            {
                title: "zoom-in-down"
            },
            {
                title: "zoom-in-left"
            },
            {
                title: "zoom-in-right"
            },
            {
                title: "zoom-out"
            },
            {
                title: "zoom-out-up"
            },
            {
                title: "zoom-out-down"
            },
            {
                title: "zoom-out-left"
            },
            {
                title: "zoom-out-right"
            }
        ]
    }
]
export const anchor: string[] = [
    "top-bottom",
    "top-center",
    "top-top",
    "center-bottom",
    "center-center",
    "center-top",
    "bottom-bottom",
    "bottom-center",
    "bottom-top"
]
export const easing: string[] = [
    "linear",
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "ease-in-back",
    "ease-out-back",
    "ease-in-out-back",
    "ease-in-sine",
    "ease-out-sine",
    "ease-in-out-sine",
    "ease-in-quad",
    "ease-out-quad",
    "ease-in-out-quad",
    "ease-in-cubic",
    "ease-out-cubic",
    "ease-in-out-cubic",
    "ease-in-quart",
    "ease-out-quart",
    "ease-in-out-quart"
]
export const image: item[] = [
    {
        image: "lightgallry/01.jpg"
    },
    {
        image: "lightgallry/02.jpg"
    },
    {
        image: "lightgallry/03.jpg"
    },
    {
        image: "lightgallry/04.jpg"
    },
    {
        image: "lightgallry/05.jpg"
    },
    {
        image: "lightgallry/011.jpg"
    },
    {
        image: "lightgallry/010.jpg"
    },
    {
        image: "lightgallry/08.jpg"
    },
    {
        image: "lightgallry/09.jpg"
    },
    {
        image: "lightgallry/010.jpg"
    },
    {
        image: "lightgallry/011.jpg"
    },
    {
        image: "lightgallry/012.jpg"
    }
]
export const imgs: photos[] = [
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/01.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/02.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/03.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/04.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/05.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/011.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/010.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/08.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/01.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/02.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/03.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/04.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/05.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/011.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/010.jpg"
    },
    {
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        image: "lightgallry/08.jpg"
    }
]
export const imags: item[] = [
    {
        image: "masonry/1.jpg"
    },
    {
        image: "masonry/2.jpg"
    },
    {
        image: "masonry/3.jpg"
    },
    {
        image: "masonry/4.jpg"
    },
    {
        image: "masonry/6.jpg"
    },
    {
        image: "masonry/5.jpg"
    },

    {
        image: "masonry/7.jpg"
    },
    {
        image: "masonry/8.jpg"
    },
    {
        image: "masonry/9.jpg"
    },
    {
        image: "masonry/10.jpg"
    },
    {
        image: "masonry/11.jpg"
    },
    {
        image: "masonry/12.jpg"
    },
    {
        image: "masonry/13.jpg"
    },
    {
        image: "masonry/14.jpg"
    },
    {
        image: "masonry/15.jpg"
    },
    {
        image: "masonry/1.jpg"
    }
]
export const imagearray: photos[] = [
    {
        image: "masonry/1.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/2.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/3.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/4.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/5.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/6.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/8.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/9.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/10.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/11.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/12.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/14.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/15.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    },
    {
        image: "masonry/13.jpg",
        title: "Portfolio Title",
        descr: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    }
]
export const hover: item[] = [
    {
        image: "lightgallry/08.jpg"
    },
    {
        image: "lightgallry/09.jpg"
    },
    {
        image: "lightgallry/010.jpg"
    },
    {
        image: "lightgallry/011.jpg"
    }
]