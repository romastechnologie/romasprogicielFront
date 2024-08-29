export const input = [
    {
        title: "Placeholder",
        placeholder: "Type your title in Placeholder",
        type: "text",
        class: "form-control"
    },
    {
        title: "Password",
        placeholder: "Password input",
        type: "password",
        class: "form-control"
    },
    {
        title: "Number",
        placeholder: "Number",
        type: "number",
        class: "form-control digits"
    },
    {
        title: "Telephone",
        placeholder: "91-(999)-999-999",
        type: "tel",
        class: "form-control m-input digits"
    },
    {
        title: "URL",
        placeholder: "url",
        type: "https://getbootstrap.com",
        class: "form-control"
    },
    {
        title: "Date and time",
        value: "2018-01-19T18:45:00",
        type: "datetime-local",
        class: "form-control digits"
    },
    {
        title: "Date",
        value: "2018-01-01",
        type: "date",
        class: "form-control digits"
    },
    {
        title: "Month",
        value: "2018-01",
        type: "month",
        class: "form-control digits"
    },
    {
        title: "Week",
        value: "2018-W09",
        type: "week",
        class: "form-control digits"
    }
];
export const borderedcheckbox = [
    {
        class: "checkbox-primary",
        ids: "checkbox-primary-1",
        title: "Primary - checkbox-primary"
    },
    {
        class: "checkbox-secondary",
        ids: "checkbox-secondary",
        title: "Secondary - checkbox-secondary"
    },
    {
        class: "checkbox-success",
        ids: "checkbox-primary",
        title: "Success - checkbox-success"
    }
];
export const iconcheckbox = [
    {
        id: 1,
        ids: "checkbox-icon",
        icon: "fa-sliders",
        title: "Sliders"
    },
    {
        id: 2,
        ids: "checkbox-icon1",
        icon: "fa-user",
        title: "User"
    },
    {
        id: 3,
        ids: "checkbox-icon2",
        icon: "fa-tags",
        title: "Tags"
    },
    {
        id: 4,
        ids: "checkbox-icon3",
        icon: "fa-android",
        title: "Android"
    },
    {
        id: 5,
        ids: "checkbox-icon4",
        icon: "fa-eye-slash",
        title: "Hidden"
    },
    {
        id: 6,
        ids: "checkbox-icon5",
        icon: "fa-folder-open",
        title: "Folder"
    },
    {
        id: 7,
        ids: "checkbox-icon6",
        icon: "fa-paper-plane",
        title: "Send"
    },
    {
        id: 8,
        ids: "checkbox-icon7",
        icon: "fa-cloud-upload",
        title: "Upload"
    }
];
export const filledCheckbox = [
    {
        class: "checkbox-dashed-warning",
        ids: "dashed4",
        title: "Warning - checkbox-dashed-warning "
    },
    {
        class: "checkbox-dashed-danger",
        ids: "dashed5",
        title: "Danger - checkbox-dashed-danger "
    },
    {
        class: "checkbox-dashed-info",
        ids: "dashed6",
        title: "Info - checkbox-dashed-info"
    }
];
export const borderedradio = [
    {
        ids: "radio22",
        class: "radio-secondary",
        title: "Koho Theme"
    },
    {
        ids: "radio55",
        class: "radio-success",
        title: "Roxo Theme"
    },
    {
        ids: "radio33",
        class: "radio-warning",
        title: "Voxo Theme"
    },
    {
        ids: "radio66",
        class: "radio-info",
        title: "Zeta Theme"
    }
];
export const iconsradio = [
    {
        id: 1,
        ids: "radio-icon",
        icon: "fa-sliders",
        title: "Sliders"
    },
    {
        id: 2,
        ids: "radio-icon4",
        icon: "fa-eye-slash",
        title: "Hidden"
    },
    {
        id: 3,
        ids: "radio-icon5",
        icon: "fa-folder-open",
        title: "Folder"
    },
    {
        id: 4,
        ids: "radio-icon7",
        icon: "fa-paper-plane",
        title: "Send"
    },
    {
        id: 5,
        ids: "radio-icon8",
        icon: "fa-user",
        title: "Users"
    },
    {
        id: 6,
        ids: "radio-icon9",
        icon: "fa-trash-o",
        title: "Trash"
    },
    {
        id: 7,
        ids: "radio-icon10",
        icon: "fa-github",
        title: "github"
    },
    {
        id: 8,
        ids: "radio-icon11",
        icon: "fa-play-circle",
        title: "Play"
    }
];
export const filledradio = [
    {
        class: "radio-primary",
        ids: "radio111",
        title: "Product"
    },
    {
        class: "radio-warning",
        ids: "radio333",
        title: "Order history"
    },
    {
        class: "radio-danger",
        ids: "radio444",
        title: "Invoice"
    },
    {
        class: "radio-info",
        ids: "radio666",
        title: "Wishlist"
    }
];
export const Inline = [
    {
        title: "Inline Checkbox",
        children: [
            {
                type: "checkbox",
                id: "inlineCheckbox1",
                value: "option1",
                label: "I",
                checked: true,
                disabled: false
            },
            {
                type: "checkbox",
                id: "inlineCheckbox2",
                value: "option2",
                label: "II",
                checked: false,
                disabled: false
            },
            {
                type: "checkbox",
                id: "inlineCheckbox3",
                value: "option3",
                label: "III (disabled)",
                checked: false,
                disabled: true
            }
        ]
    },
    {
        title: "Inline Radios",
        children: [
            {
                type: "radio",
                id: "inlineRadio1",
                name: "inlineRadioOptions",
                value: "option1",
                label: "1",
                checked: true,
                disabled: false
            },
            {
                type: "radio",
                id: "inlineRadio2",
                name: "inlineRadioOptions",
                value: "option2",
                label: "2",
                checked: false,
                disabled: false
            },
            {
                type: "radio",
                id: "inlineRadio3",
                name: "inlineRadioOptions",
                value: "option3",
                label: "3 (disabled)",
                checked: false,
                disabled: true
            }
        ]
    },
    {
        title: "Inline Switches",
        children: [
            {
                type: "checkbox",
                id: "flexSwitchCheckDefault2",
                value: "",
                label: "",
                checked: true,
                disabled: false
            },
            {
                type: "checkbox",
                id: "flexSwitchCheckDefault3",
                value: "",
                label: "",
                checked: false,
                disabled: false
            },
            {
                type: "checkbox",
                id: "flexSwitchCheckDisabled3",
                value: "",
                label: "",
                checked: false,
                disabled: true
            }
        ]
    }
];
export const payment = [
    {
        id: "edo-ani",
        checked: false,
        label: "Visa"
    },
    {
        id: "edo-ani1",
        checked: false,
        label: "MasterCard"
    },
    {
        id: "edo-ani2",
        checked: true,
        label: "Paypal"
    },
    {
        id: "edo-ani13",
        checked: false,
        label: "G-pay"
    },
    {
        id: "edo-ani6",
        checked: false,
        label: "Bitpay"
    }
];
export const social = [
    {
        id: "chk-ani",
        checked: false,
        label: "Instagram"
    },
    {
        id: "chk-ani1",
        checked: false,
        label: "Facebook"
    },
    {
        id: "chk-ani2",
        checked: true,
        label: "Whatsapp"
    },
    {
        id: "chk-ani4",
        checked: false,
        label: "Twitter"
    }
];
export const checkbox = [
    {
        id: "inline-1",
        label: "Blog",
        checked: false,
    },
    {
        id: "inline-2",
        label: "Gallery",
        checked: true,
    },
    {
        id: "inline-3",
        label: "Faq",
        checked: false,
    },
    {
        id: "inline-4",
        label: "Email",
        checked: false,
    },
    {
        id: "inline-5",
        label: "Icons",
        checked: false,
    }
];
export const radio = [
    {
        id: "radioinline1",
        label: "Maps",
        checked: true,
    },
    {
        id: "radioinline2",
        label: "Tasks",
        checked: false,
    },
    {
        id: "radioinline3",
        label: "To-do",
        checked: false,
    },
    {
        id: "radioinline4",
        label: "Forms",
        checked: false,
    },
    {
        id: "radioinline5",
        label: "Login",
        checked: false,
    }
];
export const toggle = [
    {
        id: "option1",
        checked: true,
        disabled: false,
        label: "Checked"
    },
    {
        id: "option2",
        checked: false,
        disabled: false,
        label: "Radio"
    },
    {
        id: "option3",
        checked: false,
        disabled: true,
        label: "Disabled"
    },
    {
        id: "option4",
        checked: false,
        disabled: false,
        label: "Radio"
    }
];
export const outlined = [
    {
        id: "btn-check-outlined",
        checked: false,
        label: "Single toggle",
        class: "btn-outline-info"
    },
    {
        id: "btn-check-2-outlined",
        checked: true,
        label: "Checked",
        class: "btn-outline-danger"
    },
    {
        id: "success-outlined",
        checked: true,
        label: "Checked success radio",
        class: "btn-outline-success"
    },
    {
        id: "danger-outlined",
        checked: false,
        label: "Dark radio",
        class: "btn-outline-dark"
    },
];
export const customform = [
    {
        option: true,
        children: [
            {
                title: "Select Your Favorite Pixelstrap theme"
            },
            {
                title: "Tivo"
            },
            {
                title: "Mofi"
            },
            {
                title: "Roxo"
            }
        ]
    },
    {
        options: true,
        children: [
            {
                title: "Select Your Favorite Colors"
            },
            {
                title: "Yellow"
            },
            {
                title: "Red"
            },
            {
                title: "Orange"
            }
        ]
    },
    {
        iconbutton: true,
        children: [
            {
                title: "Select Your Favorite Chocolates"
            },
            {
                title: "Dark Chocolates"
            },
            {
                title: "Dairy Milk"
            },
            {
                title: "Kitkat"
            }
        ]
    },
    {
        submit: true,
        children: [
            {
                title: "Select Your Favorite Theme"
            },
            {
                title: "Oslo"
            },
            {
                title: "Koho"
            },
            {
                title: "Voxo"
            }
        ]
    }
];
export const segmented = [
    {
        input1: true,
        class: "btn-outline-info",
        class1: "btn-info",
        label: "Info ",
        dropclass: "",
        children: [
            {
                text: "Learning",
                class: "dropdown-item",
                href: "#"
            },
            {
                text: "Editors",
                class: "dropdown-item",
                href: "#"
            },
            {
                text: "Users",
                class: "dropdown-item",
                href: "#"
            },
            {
                class: "dropdown-divider"
            },
            {
                text: "Social App",
                class: "dropdown-item",
                href: "#"
            }
        ]
    },
    {
        input2: true,
        class: "btn-outline-secondary",
        class1: "btn-secondary",
        label: "Secondary ",
        dropclass: "dropdown-menu-end",
        children: [
            {
                text: "Search Result",
                class: "dropdown-item",
                href: "#"
            },
            {
                text: "Tasks",
                class: "dropdown-item",
                href: "#"
            },
            {
                text: "Projects",
                class: "dropdown-item",
                href: "#"
            },
            {
                class: "dropdown-divider"
            },
            {
                text: "Animation",
                class: "dropdown-item",
                href: "#"
            }
        ]
    }
];
export const checkboxes = [
    {
        type: "checkbox",
        checked: false
    },
    {
        type: "radio",
        checked: true
    }
];
export const size = [
    {
        class: "input-group-sm",
        id: "inputGroup-sizing-sm",
        label: "Small",
    },
    {
        class: "",
        id: "inputGroup-sizing-default",
        label: "Default",
    },
    {
        class: "input-group-lg",
        id: "inputGroup-sizing-lg",
        label: "Large",
    }
];
export const masks = [
    {
        colclass: "col-sm-6",
        title: "Date Format",
        class: "col-12",
        children: [
            {
                id: "cleave-date1",
                title: "Date",
                placeholder: "DD-MM-YYYY"
            },
            {
                id: "cleave-date2",
                title: "Date format type",
                placeholder: "MM-YYYY"
            }
        ]
    },
    {
        colclass: "col-sm-6",
        title: "Time Format",
        class: "col-12",
        children: [
            {
                id: "cleave-time1",
                title: "Time format type",
                placeholder: "hh:mm:ss"
            },
            {
                id: "cleave-time2",
                title: "Hour/month type",
                placeholder: "hh:mm"
            }
        ]
    },
    {
        colclass: "col-12",
        title: "Default Input Mask",
        class: "col-xxl-4 col-sm-6",
        children: [
            {
                id: "cleave-number-format",
                title: "Currency",
                placeholder: "Enter number"
            },
            {
                id: "cleave-type-prefix",
                title: "Prefix",
                placeholder: "Prefix-xxxx-xxxx-xxxx"
            },
            {
                id: "cleave-type-delimiter",
                title: "Delimiter",
                placeholder: "xxx·xxx·xxx"
            },
            {
                id: "cleave-phone-number",
                title: "Phone Number",
                placeholder: "(xxx)xxx-xxxx"
            },
            {
                id: "cleave-card-number",
                title: "Card Number",
                placeholder: "xxxx xxxx xxxx xxxx"
            },
            {
                id: "tailprefix",
                title: "Tailprefix",
                placeholder: "0000.00€"
            }
        ]
    }
];
export const yourpayment = [
    {
        id: "ptm11",
        label: "BOB",
        img: "ecommerce/card.png",
        checked: false
    },
    {
        id: "ptm22",
        label: "MasterCard",
        img: "ecommerce/mastercard.png",
        checked: true
    },
    {
        id: "ptm33",
        label: "Paypal",
        img: "ecommerce/paypal.png",
        checked: false
    },
    {
        id: "ptm44",
        label: "VISA",
        img: "ecommerce/visa.png",
        checked: false
    }
];
export const web = [
    {
        id: "ptm101",
        label: "A. HTML",
        checked: false
    },
    {
        id: "ptm201",
        label: "B. CSS",
        checked: false
    },
    {
        id: "ptm301",
        label: "C. Javascript",
        checked: true
    },
    {
        id: "ptm401",
        label: "D. Above the all",
        checked: false
    }
];
export const svg = [
    {
        id: "ptm100",
        label: "The notification icon displayed new messages.",
        class: "stroke-danger",
        icon: "notification",
        checked: false
    },
    {
        id: "ptm200",
        label: "The download icon indicated completion.",
        class: "stroke-success",
        icon: "stroke-calendar",
        checked: false
    },
    {
        id: "ptm300",
        label: "The tag icon allowed easy categorization.",
        class: "stroke-dark",
        icon: "tag",
        checked: true
    },
    {
        id: "ptm400",
        label: "The email icon was inaccessibly located.",
        class: "stroke-primary",
        icon: "stroke-email",
        checked: false
    }
];
export const activities = [
    {
        class: "checkbox-success",
        id: "check-a",
        label: "Reading ",
        checked: false
    },
    {
        class: "checkbox-success",
        id: "check-b",
        label: "Watching TV",
        checked: true
    },
    {
        class: "checkbox-danger",
        id: "check-c",
        label: "Listening to music",
        checked: false
    },
    {
        class: "checkbox-danger",
        id: "check-d",
        label: "Playing video games",
        checked: false
    },
    {
        class: "checkbox-success",
        id: "check-e",
        label: "Painting/Drawing",
        checked: false
    }
];
export const upgrade = [
    {
        id: "feature1",
        label: "Voxo",
        sale: "270 Sales",
        checked: false
    },
    {
        id: "feature2",
        label: "Mofi",
        sale: "4.8K Sales",
        checked: false
    },
    {
        id: "feature3",
        label: "Multikart",
        sale: "2.6k Sales",
        checked: false
    },
    {
        id: "feature4",
        label: "Viho",
        sale: "2k Sales",
        checked: true
    }
];
export const defultstyle = [
    {
        class: "radio-primary",
        id: "radio14",
        label: "COD",
        badgeclass: "badge-primary",
        badge: "50 INR",
        desc: "Estimated 2 Day Shipping ( Duties end tax may be due delivery )"
    },
    {
        class: "radio-secondary",
        id: "radio13",
        label: "Fast",
        badgeclass: "badge-secondary",
        badge: "100 INR",
        desc: "Estimated 1 Day Shipping ( Duties end tax may be due delivery )"
    }
];
export const borderstyle = [
    {
        class: "checkbox-warning",
        id: "checkbox11",
        label: "$39",
        badgeclass: "badge-warning",
        badge: "100 MBPS",
        checked: true,
        desc: "Plans for 2/4/6 months are offered to new clients."
    },
    {
        class: "checkbox-info",
        id: "checkbox22",
        label: "$50",
        badgeclass: "badge-info",
        badge: "Hired",
        checked: false,
        desc: "Plans for 2 years projects offered to new clients."
    }
];
export const dashed = [
    {
        id: "radio15",
        img: "blog/img.png",
        desc: "We provide end to end digital solutions, right from designing your website/application development: Domain, Web Hosting, Email Hosting Registration."
    },
    {
        id: "radio16",
        img: "blog/blog.jpg",
        desc: "When someone visits your homepage, your design should inspire them to stay. Therefore, your value proposition should be established on the homepage for visitors."
    }
];
export const offer = [
    {
        id: "checkbox50",
        class: "checkbox-success",
        img: "email-template/11.jpg",
        checked: false,
        desc: "Fruits are an essential part of a healthy diet, and offer many health benefits. They're packed with vitamins, minerals, and fiber, which can help improve digestion."
    },
    {
        id: "checkbox101",
        class: "checkbox-danger",
        img: "email-template/10.jpg",
        checked: true,
        desc: "Flowers have long been used to express feelings and sentiments, and each bloom has its own distinct significance. For instance, while daisies signify innocence and purity."
    }
];
export const inline = [
    {
        class: "radio-warning",
        id: "radio19",
        label: "COD",
        badgeclass: "badge-warning",
        badge: "50 INR",
        desc: "Estimated 14-20 Day Shipping ( Duties end taxes may be due upon delivery)"
    },
    {
        class: "radio-secondary",
        id: "radio20",
        label: "Fast",
        badgeclass: "badge-secondary",
        badge: "100 INR",
        desc: "Estimated 1 Day Shipping ( Duties end taxes may be due upon delivery)"
    },
    {
        class: "radio-secondary",
        id: "radio21",
        label: "Standard",
        badgeclass: "badge-secondary",
        badge: "80 INR",
        desc: "Estimated 3 Day Shipping ( Duties end taxes may be due upon delivery)"
    },
    {
        class: "radio-warning",
        id: "radio22",
        label: "Local",
        badgeclass: "badge-warning",
        badge: "Free",
        desc: "Estimated 15 Day Shipping ( Duties end taxes may be due upon delivery)"
    }
];
export const delivery = [
    {
        class: "radio-primary",
        id: "radio23",
        label: "COD",
        badgeclass: "badge-primary",
        badge: "50 INR",
        checked: false,
        desc: "Estimated 10 to 15 Day Shipping ( Duties end tax may be due delivery)"
    },
    {
        class: "radio-secondary",
        id: "radio24",
        label: "Fast",
        badgeclass: "badge-secondary",
        badge: "100 INR",
        checked: false,
        desc: "Estimated 10 to 12 Day Shipping  ( Duties end tax may be due delivery)"
    },
    {
        class: "radio-success",
        id: "radio25",
        label: "Standard",
        badgeclass: "badge-success",
        badge: "80 INR",
        checked: false,
        desc: "Estimated 3 to 5 Day Shipping ( Duties end tax may be due delivery)"
    },
    {
        class: "radio-info",
        id: "radio5",
        label: "Local",
        badgeclass: "badge-info",
        badge: "Free",
        checked: true,
        desc: "Estimated 3 to 5 Day Shipping ( Duties end tax may be due delivery)"
    }
];
export const buying = [
    {
        class: "radio-warning",
        id: "radio26",
        label: "Pixelstrap",
        badgeclass: "badge-warning",
        badge: "250 INR",
        checked: true,
        star: 5,
        rating: "5 start rating"
    },
    {
        class: "radio-danger",
        id: "radio27",
        label: "Multikart",
        badgeclass: "badge-warning",
        badge: "150 INR",
        checked: true,
        star: 2,
        rating: "2 start rating"
    }
];
export const horizontaldelivery = [
    {
        colclass: "col-sm-9",
        class: "radio-primary",
        id: "radio30",
        label: "COD",
        badgeclass: "badge-primary",
        badge: "50 INR",
        checked: false,
        desc: "Estimated 5 Day Shipping ( Duties end tax may be due delivery)"
    },
    {
        colclass: "col-sm-9 offset-sm-3",
        class: "radio-secondary",
        id: "radio31",
        label: "Fast",
        badgeclass: "badge-secondary",
        badge: "100 INR",
        checked: true,
        desc: "Estimated 1 Day Shipping ( Duties end tax may be due delivery)"
    },
];
export const horizontalbuying = [
    {
        colclass: "col-sm-9",
        class: "radio-success",
        id: "radio32",
        label: "Pixelstrap",
        badgeclass: "badge-warning",
        badge: "250 INR",
        checked: false,
        star: 5,
        rating: "5 start rating"
    },
    {
        colclass: "col-sm-9 offset-sm-3",
        class: "radio-info",
        id: "radio33",
        label: "Tivo",
        badgeclass: "badge-info",
        badge: "150 INR",
        checked: true,
        star: 1,
        rating: "1 start rating"
    }
];
export const bootstrapcalender = [
    {
        label: "Date",
        type: "date",
        value: "2024-05-01"
    },
    {
        label: "Month",
        type: "month",
        value: "2024-01"
    },
    {
        label: "Week",
        type: "week",
        value: "2024-W09"
    },
    {
        label: "Time",
        type: "time",
        value: "21:45:00"
    }
];
export const outlinecolor = [
    {
        label: "Primary Select",
        class: "form-control-primary"
    },
    {
        label: "Secondary Select",
        class: "form-control-secondary"
    },
    {
        label: "Success Select",
        class: "form-control-success"
    },
    {
        label: "Info Select",
        class: "form-control-info"
    },
    {
        label: "Warning Select",
        class: "form-control-warning"
    },
    {
        label: "Danger Select",
        class: "form-control-danger"
    },
    {
        label: "Inverse Select",
        class: "form-control-inverse"
    }
];
export const fullColored = [
    {
        label: "Primary Select",
        class: "form-control-primary-fill"
    },
    {
        label: "Secondary Select",
        class: "form-control-secondary-fill"
    },
    {
        label: "Success Select",
        class: "form-control-success-fill"
    },
    {
        label: "Info Select",
        class: "form-control-info-fill"
    },
    {
        label: "Warning Select",
        class: "form-control-warning-fill"
    },
    {
        label: "Danger Select",
        class: "form-control-danger-fill"
    },
    {
        label: "Inverse Select",
        class: "form-control-inverse-fill"
    }
];
export const customswitch = [
    {
        colclass: "col-md-4 col-sm-6",
        class: "border rounded-3",
        sizeclass: "form-check-size",
        children: [
            {
                inputclass: "switch-primary",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-secondary",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-success",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-danger",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-warning",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-info",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-dark",
                checked: true,
                disabled: false
            }
        ]
    },
    {
        colclass: "col-md-4 col-sm-6",
        class: "border rounded-3 radius-none",
        sizeclass: "form-check-size default-square",
        children: [
            {
                inputclass: "switch-primary",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-secondary",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-success",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-danger",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-warning",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-info",
                checked: true,
                disabled: false
            },
            {
                inputclass: "switch-dark",
                checked: true,
                disabled: false
            }
        ]
    },
    {
        colclass: "col-md-4",
        class: "border rounded-3 common-flex",
        sizeclass: "form-check-size",
        children: [
            {
                inputclass: "switch-primary",
                checked: true,
                disabled: true
            },
            {
                inputclass: "switch-secondary",
                checked: true,
                disabled: true
            },
            {
                inputclass: "switch-success",
                checked: true,
                disabled: true
            },
            {
                inputclass: "switch-danger",
                checked: true,
                disabled: true
            },
            {
                inputclass: "switch-warning",
                checked: true,
                disabled: true
            },
            {
                inputclass: "switch-info",
                checked: true,
                disabled: true
            },
            {
                inputclass: "switch-dark",
                checked: true,
                disabled: true
            }
        ]
    }
];
export const iconswich = [
    {
        class: "bg-primary",
        label: "Primary Switch",
        checked: true,
    },
    {
        class: "bg-secondary",
        label: "Secondary Switch",
        checked: true,
    },
    {
        class: "bg-success",
        label: "Success Switch",
        checked: true,
    },
    {
        class: "bg-danger",
        label: "Danger Switch",
        checked: true,
    },
    {
        class: "bg-warning",
        label: "Warning Switch",
        checked: true,
    },
    {
        class: "bg-info",
        label: "Info Switch",
        checked: true,
    },
    {
        class: "bg-dark",
        label: "Dark Switch",
        checked: true,
    }
];
export const Unchecked = [
    {
        class: "bg-primary",
        label: "Unchecked Primary Switch",
        checked: true,
    },
    {
        class: "bg-secondary",
        label: "Unchecked Secondary Switch",
        checked: true,
    },
    {
        class: "bg-success",
        label: "Unchecked Success Switch",
        checked: true,
    },
    {
        class: "bg-danger",
        label: "Unchecked Danger Switch",
        checked: true,
    },
    {
        class: "bg-warning",
        label: "Unchecked Warning Switch",
        checked: true,
    },
    {
        class: "bg-info",
        label: "Unchecked Info Switch",
        checked: true,
    },
    {
        class: "bg-dark",
        label: "Unchecked Dark Switch",
        checked: true,
    }
];
export const borders = [
    {
        class: "bg-primary",
        label: "Bordered Primary Switch",
        checked: true,
    },
    {
        class: "bg-secondary",
        label: "Bordered Secondary Switch",
        checked: true,
    },
    {
        class: "bg-success",
        label: "Bordered Success Switch",
        checked: true,
    },
    {
        class: "bg-danger",
        label: "Bordered Danger Switch",
        checked: true,
    },
    {
        class: "bg-warning",
        label: "Bordered Warning Switch",
        checked: true,
    },
    {
        class: "bg-info",
        label: "Bordered Info Switch",
        checked: true,
    },
    {
        class: "bg-dark",
        label: "Bordered Dark Switch",
        checked: true,
    }
];
export const disable = [
    {
        class: "bg-primary"
    },
    {
        class: "bg-secondary"
    },
    {
        class: "bg-success"
    },
    {
        class: "bg-danger"
    },
    {
        class: "bg-warning"
    },
    {
        class: "bg-info"
    },
    {
        class: "bg-dark"
    }
];
export const switchsize = [
    {
        label: "Small Size",
        class: "text-end switch-sm",
        checked: true,
        disabled: false
    },
    {
        label: "Small Size Unhecked",
        class: "text-end switch-sm",
        checked: false,
        disabled: false
    },
    {
        label: "Normal Size",
        class: "text-end",
        checked: true,
        disabled: false
    },
    {
        label: "Normal Unhecked",
        class: "text-end",
        checked: false,
        disabled: false
    },
    {
        label: "Disabled State",
        class: "text-end",
        checked: false,
        disabled: true
    },
    {
        label: "Large Size",
        class: "text-end switch-lg",
        checked: true,
        disabled: false
    },
    {
        label: "Large Unhecked",
        class: "text-end switch-lg",
        checked: false,
        disabled: false
    },
    {
        label: "Disabled",
        class: "text-end switch-lg",
        checked: false,
        disabled: true
    }
];
export const tab = [
    {
        id: "bill-wizard-tab",
        href: "#bill-wizard",
        icon: "fa-user",
        label: "Billing"
    },
    {
        id: "ship-wizard-tab",
        href: "#ship-wizard",
        icon: "fa-truck",
        label: "Shipping"
    },
    {
        id: "payment-wizard-tab",
        href: "#payment-wizard",
        icon: "fa-money",
        label: "Payment"
    },
    {
        id: "finish-wizard-tab",
        href: "#finish-wizard",
        icon: "fa-check-square",
        label: "Finish"
    }
];
export const billing = [
    {
        id: "customFirstname",
        text: true,
        placeholer: "Enter first name",
        type: "text",
        label: "First Name"
    },
    {
        id: "customLastname",
        text: true,
        placeholer: "Enter last name",
        type: "text",
        label: "Last Name"
    },
    {
        id: "customContact",
        text: false,
        placeholer: "Enter number",
        type: "number",
        label: "Contact Number"
    },
    {
        id: "customEmail",
        text: true,
        placeholer: "Mofi@example.com",
        type: "email",
        label: "Email"
    }
];
export const information = [
    {
        id: "shipping-choose1",
        label: "Home",
        add: "<h6>Filomena Green </h6><span> Address: 2211 Fruitville Rd, Sarasota, Florida, US 34237</span><span> Contact: (941) 321-5643</span>",
        checked: false,
    },
    {
        id: "shipping-choose2",
        label: "Work",
        add: "<h6>Ms. Ila Runte DDS</h6><span>  Address: 1531 E 23rd St S, Independence, Mississippi, US 64055</span><span>  Contact: (816) 252-4500</span>",
        checked: true,
    }
];
export const method = [
    {
        id: "shipping-choose3",
        checked: false,
        label: "Standard Delivery - Free",
        desc: "Estimated 5-7 days shipping"
    },
    {
        id: "shipping-choose4",
        checked: true,
        label: "Express Delivery - $24",
        desc: "Estimated 1-2 days shipping"
    }
];
export const currentcart = [
    {
        img: "product/13.png",
        title: "T-shirt",
        multipl: "$98 * 2",
        price: "$400"
    },
    {
        img: "email-template/4.png",
        title: "i Phone",
        multipl: "$4*2",
        price: "$450"
    },
    {
        img: "product/2.png",
        title: "T-shirt",
        multipl: "$10 * 2",
        price: "$234"
    },
    {
        img: "dashboard-2/product/2.png",
        title: "Chairs",
        multipl: "$98 * 2",
        price: "$200"
    }
];
export const customwizard = [
    {
        id: "wizard-info-tab",
        icon: "fa-user",
        label: "Personal info",
        href: "#wizard-info"
    },
    {
        id: "bank-wizard-tab",
        icon: "fa-chain-broken",
        label: "Connect bank account",
        href: "#bank-wizard"
    },
    {
        id: "inquiry-wizard-tab",
        icon: "fa-group",
        label: "Inquiries",
        href: "#inquiry-wizard"
    },
    {
        id: "successful-wizard-tab",
        icon: "fa-group",
        label: "Completed",
        href: "#successful-wizard"
    }
];
export const info = [
    {
        id: "customFirstname",
        text: true,
        placeholer: "Enter first name",
        type: "text",
        label: "First Name"
    },
    {
        id: "customLastname",
        text: true,
        placeholer: "Enter last name",
        type: "text",
        label: "Last Name"
    },
    {
        id: "customEmail",
        text: true,
        placeholer: "Mofi@example.com",
        type: "email",
        label: "Email"
    }
];
export const bank = [
    {
        id: "radio-wizard-1",
        img: "forms/hdfc.png",
        label: "ABC BANK",
        checked: false,
    },
    {
        id: "radio-wizard-2",
        img: "forms/Bank-of-Baroda.png",
        label: "XYZ BANK",
        checked: true,
    },
    {
        id: "radio-wizard-3",
        img: "forms/idbi.png",
        label: "PQR BANK",
        checked: false,
    },
    {
        id: "radio-wizard-4",
        img: "forms/rbl.png",
        label: "DEF BANK",
        checked: false,
    },
    {
        id: "radio-wizard-5",
        img: "forms/us-bank.png",
        label: "MNO BANK",
        checked: false,
    },
    {
        id: "radio-wizard-6",
        img: "forms/axis.png",
        label: "WXY BANK",
        checked: false,
    },
    {
        id: "radio-wizard-7",
        img: "forms/SCB.png",
        label: "STD BANK",
        checked: false,
    }
];
export const inquiry = [
    {
        id: "notification1",
        label: "Featured Items"
    },
    {
        id: "notification2",
        label: "Newsletters"
    },
    {
        id: "notification3",
        label: "Notifications"
    },
    {
        id: "notification4",
        label: "Blogs"
    }
];
export const business = [
    {
        id: "wizard-n-info-tab",
        href: "#wizard-n-info",
        num: "1",
        label: "Choose account"
    },
    {
        id: "bank-n-wizard-tab",
        href: "#bank-n-wizard",
        num: "2",
        label: "Business settings"
    },
    {
        id: "inquiry-n-wizard-tab",
        href: "#inquiry-n-wizard",
        num: "3",
        label: "Contact details"
    },
    {
        id: "pay-n-wizard-tab",
        href: "#pay-n-wizard",
        num: "4",
        label: "Pay details"
    },
    {
        id: "successful-n-wizard-tab",
        href: "#successful-n-wizard",
        num: "5",
        label: "Completed"
    }
];
export const settings = [
    {
        label: "Tivo",
        menber: "2-3 Members",
        checked: false,
    },
    {
        label: "Cuba",
        menber: "4-5 Members",
        checked: false,
    },
    {
        label: "Multikart",
        menber: "2 Members ",
        checked: false,
    },
    {
        label: "Roxo",
        menber: "1 Members",
        checked: true,
    }
];
export const vertical = [
    {
        id: "wizard-v-info-tab",
        icon: "fa-user",
        label: "Personal info",
        href: "#wizard-v-info"
    },
    {
        id: "bank-v-wizard-tab",
        icon: "fa-chain-broken",
        label: "Connect bank account",
        href: "#bank-v-wizard"
    },
    {
        id: "inquiry-v-wizard-tab",
        icon: "fa-group",
        label: "Inquiries",
        href: "#inquiry-v-wizard"
    },
    {
        id: "successful-v-wizard-tab",
        icon: "fa-group",
        label: "Completed",
        href: "#successful-v-wizard"
    }
];
export const businessvertical = [
    {
        id: "business-n-info-tab",
        href: "#business-n-info",
        num: "1",
        label: "Choose account"
    },
    {
        id: "business-bank-wizard-tab",
        href: "#business-bank-wizard",
        num: "2",
        label: "Business settings"
    },
    {
        id: "business-inquiry-wizard-tab",
        href: "#business-inquiry-wizard",
        num: "3",
        label: "Contact details"
    },
    {
        id: "business-pay-wizard-tab",
        href: "#business-pay-wizard",
        num: "4",
        label: "Pay details"
    },
    {
        id: "business-successful-wizard-tab",
        href: "#business-successful-wizard",
        num: "5",
        label: "Completed"
    }
];
export const code = [
    {
        pattern: "[0-9]"
    },
    {
        pattern: "[0-9]"
    },
    {
        pattern: "[0-9]"
    },
    {
        pattern: "[0-9]"
    },
    {
        pattern: "[0-9]"
    },
    {
        pattern: "[0-9]"
    }
];
//# sourceMappingURL=forms.js.map