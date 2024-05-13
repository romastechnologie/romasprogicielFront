interface table {
    id: number,
    img: string,
    firstName: string,
    lastName: string,
    userName: string,
    role: string,
    company: string,
    language: string,
    badgeClass: string,
    credit: string,
    borderColor: string,
    country: string
}
interface table1 {
    id: number,
    firstName: string,
    lastName: string,
    office: string,
    role: string,
    salary: string,
    age: number,
    join: string
}
interface table2 {
    id: number,
    icon: string,
    status: string,
    signalName: string,
    security: string,
    stage: string,
    schedule: string,
    bgClass: string,
    teamLead: string,
    font: string
}
interface table3 {
    id: number,
    firstName: string,
    name: string,
    email: string,
    lastName: string,
    exp: string,
    sex: string,
    contact: string,
    userName: string,
    age: string,
    dessert: string,
    calories: string,
    fat: string,
    price: string
}
interface breckpoint {
    id: number,
    name: string,
    order: string,
    price: string,
    quantity: string,
    total: string
}
interface sizing {
    id: number,
    Name: string,
    Date: string,
    Status: string,
    statusClass: string,
    hours: string,
    performance: string
}
interface customs {
    id: number,
    film: string,
    released: string,
    studio: string,
    budget: string,
    domestic: string,
    color: string
}
interface dasheds {
    id: number,
    className: string,
    type: string,
    hours: string,
    trainer: string,
    spot: string,
    bottom: string
}
interface datatsb {
    id: number,
    img: string,
    name: string,
    position: string,
    office: string,
    invoice: string,
    startDate: string,
    Budget: string,
    salary: string,
    credit: string,
    ActionClass: string,
    iconClass: string,
    iconColor: string
}
export const data: table[] = [
    {
        id: 1,
        img: "user/1.jpg",
        firstName: "Ram Jacob",
        lastName: "Wolfe",
        userName: "RamJacob@twitter",
        role: "Developer",
        company: "Apple Inc.",
        language: "Php",
        badgeClass: "badge-light-danger",
        credit: "$3500.00",
        borderColor: "border-bottom-secondary",
        country: "IND"
    },
    {
        id: 2,
        img: "user/2.png",
        firstName: "John Deo",
        lastName: "Gummer",
        userName: "JohnDeo@twitter",
        role: "Designer",
        company: "Hewlett packard",
        language: "Html",
        badgeClass: "badge-light-primary",
        credit: "$2400.00",
        borderColor: "border-bottom-success",
        country: "US"
    },
    {
        id: 3,
        img: "user/3.jpg",
        firstName: "Elana John",
        lastName: "Cazale",
        userName: "ElanaJohn@twitter",
        role: "Designer",
        company: "Microsoft",
        language: "Pug",
        badgeClass: "badge-light-danger",
        credit: "$2560.00",
        borderColor: "border-bottom-info",
        country: "UK"
    },
    {
        id: 4,
        img: "user/3.png",
        firstName: "Meryl Streep",
        lastName: "Roberts",
        userName: "MerylStreep@twitter",
        role: "Developer",
        company: "Tata Ltd.",
        language: "React",
        badgeClass: "badge-light-success",
        credit: "$1870.00",
        borderColor: "border-bottom-warning",
        country: "IDN"
    },
    {
        id: 5,
        img: "user/6.jpg",
        firstName: "Emma Stone",
        lastName: "Stone",
        userName: "EmmaStone@twitter",
        role: "Developer",
        company: "Wipro Ltd.",
        badgeClass: "badge-light-primary",
        language: "Vue",
        credit: "$4580.00",
        borderColor: "border-bottom-danger",
        country: "IRN"
    },
    {
        id: 6,
        img: "user/7.jpg",
        firstName: "Eliana Jons",
        lastName: "Jons",
        userName: "ElianaJons@twitter",
        role: "Developer",
        company: "Info Ltd.",
        badgeClass: "badge-light-success",
        language: "Vue",
        credit: "$4580.00",
        borderColor: "border-bottom-light",
        country: "IRN"
    }
]
export const inverse: table1[] = [
    {
        id: 1,
        firstName: "Stephan",
        lastName: "Laiten",
        office: "Tokyo",
        role: "Accountant",
        salary: "$2100.00",
        age: 20,
        join: "21/01/2022"
    },
    {
        id: 2,
        firstName: "Fay",
        lastName: "Van Damme",
        office: "London",
        role: "CEO",
        salary: "$1420.00",
        age: 22,
        join: "14/02/2022"
    },
    {
        id: 3,
        firstName: "Brevin",
        lastName: "Oleveria",
        office: "New York",
        role: "Software Engineer",
        salary: "$1340.00",
        age: 18,
        join: "04/06/2022"
    },
    {
        id: 4,
        firstName: "Regina",
        lastName: "Ottandy",
        office: "France",
        role: "Pre-sale Support",
        salary: "$3400.00",
        age: 25,
        join: "10/08/2022"
    },
    {
        id: 5,
        firstName: "Vani",
        lastName: "Shah",
        office: "Los Angeles",
        role: "Senior Developer",
        salary: "$3500.00",
        age: 28,
        join: "23/07/2022"
    }
]
export const hoverable: table2[] = [
    {
        id: 1,
        icon: "alert-triangle",
        status: "No Signal",
        signalName: "Astrid: NE Shared managed",
        security: "Medium",
        stage: "Triaged",
        schedule: "0.33",
        bgClass: "bg-light-success font-success",
        teamLead: "Chase Nguyen",
        font: "font-success"
    },
    {
        id: 2,
        icon: "alert-triangle",
        status: "Offline",
        signalName: "Cosmo: prod shared ares",
        security: "Huge",
        stage: "Triaged",
        schedule: "0.39",
        bgClass: "bg-light-danger font-danger",
        teamLead: "Brie Furman",
        font: "font-danger"
    },
    {
        id: 3,
        icon: "alert-circle",
        status: "Online",
        signalName: "Phoenix: prod shared lyra-lists",
        security: "Minor",
        stage: "No Triaged",
        schedule: "3.12",
        bgClass: "bg-light-primary font-primary",
        teamLead: "Jeremy Lake",
        font: "font-primary"
    },
    {
        id: 4,
        icon: "check-circle",
        status: "No Signal",
        signalName: "Astrid: NE Shared managed",
        security: "Negligible",
        stage: "triaged",
        schedule: "13.18",
        bgClass: "bg-light-success font-success",
        teamLead: "Angelica Howards",
        font: "font-success"
    },
    {
        id: 5,
        icon: "check-circle",
        status: "Online",
        signalName: "Astrid: NE Shared managed",
        security: "Negligible",
        stage: "triaged",
        schedule: "5.33",
        bgClass: "bg-light-danger font-danger",
        teamLead: "Diane Okuma",
        font: "font-danger"
    }
]
export const caption: table3[] = [
    {
        id: 1,
        firstName: "Mark",
        name: "Elana Robbert",
        email: "ElanaRob@gmail.com",
        lastName: "Otto",
        exp: "1 Year",
        sex: "Male",
        contact: "+91 9789887777",
        userName: "Mark@twitter",
        age: "28",
        dessert: "KitKat",
        calories: "518",
        fat: "26",
        price: "20"
    },
    {
        id: 2,
        firstName: "Elana",
        name: "Stiphen Deo",
        email: "Stiphen@yahoo.com",
        lastName: "Thornton",
        exp: "6 Month",
        sex: "Female",
        contact: "+91 9874563210",
        userName: "Elana@twitter",
        age: "22",
        dessert: "Donut",
        calories: "452",
        fat: "25",
        price: "80"
    },
    {
        id: 3,
        firstName: "Larry",
        name: "Genelia Ottre",
        email: "Genelia@gmail.com",
        lastName: "Otthe Birdto",
        exp: "2 Days",
        sex: "Male",
        contact: "+91 8794562135",
        userName: "Larry@twitter",
        age: "24",
        dessert: "Eclair",
        calories: "262",
        fat: "16",
        price: "10"
    }
]
export const breckpoint: breckpoint[] = [
    {
        id: 1,
        name: "Iphone X Grey",
        order: "C12345",
        price: "$12550",
        quantity: "1",
        total: "$12550"
    },
    {
        id: 2,
        name: "Titan Watch",
        order: "A14725",
        price: "$120",
        quantity: "2",
        total: "$250"
    },
    {
        id: 3,
        name: "Apple Airpods",
        order: "B54213",
        price: "$210",
        quantity: "1",
        total: "$210"
    }
]
export const sizingTablesXl: sizing[] = [
    {
        id: 1,
        Name: "Mark Jecno",
        Date: "22/08/2022",
        Status: "On leave",
        statusClass: "font-danger",
        hours: "0",
        performance: "29/30"
    },
    {
        id: 2,
        Name: "Elana Robbert",
        Date: "21/08/2022",
        Status: "Present",
        statusClass: "font-success",
        hours: "10",
        performance: "30/30"
    },
    {
        id: 3,
        Name: "John Deo",
        Date: "18/08/2022",
        Status: "On leave",
        statusClass: "font-danger",
        hours: "8",
        performance: "28/30"
    }
]
export const custom: customs[] = [
    {
        id: 1,
        film: "Frozen",
        released: "2013",
        studio: "Disney",
        budget: "$150,000,000",
        domestic: "$400,953,009",
        color: ""
    },
    {
        id: 2,
        film: "Minions",
        released: "2015",
        studio: "Universal",
        budget: "$74,000,000",
        domestic: "$336,045,770",
        color: ""
    },
    {
        id: 3,
        film: "Zootopia",
        released: "2016",
        studio: "Disney",
        budget: "$150,000,000",
        domestic: "$341,268,248",
        color: ""
    },
    {
        id: 4,
        film: "Finding Dory",
        released: "2016",
        studio: "Disney Pixar",
        budget: "$175,000,000",
        domestic: "$486,295,561",
        color: ""
    },
    {
        id: 5,
        film: "Toy Story 3",
        released: "2010",
        color: "table-success",
        studio: "Disney Pixar",
        budget: "$200,000,000",
        domestic: "$415,004,880"
    }
]
export const dashed: dasheds[] = [
    {
        id: 1,
        className: "Crit Cardio",
        type: "Gym",
        bottom: "border-bottom-secondary",
        hours: "9:00 AM - 11:00 AM",
        trainer: "Aaron Chapman",
        spot: "10"
    },
    {
        id: 2,
        className: "Zumba Dance",
        type: "Dance",
        bottom: "border-bottom-success",
        hours: "8:00 AM - 9:00 AM",
        trainer: "Donna Wilson",
        spot: "12"
    },
    {
        id: 3,
        className: "Like a butterfly",
        type: "Boxing",
        bottom: "border-bottom-info",
        hours: "9:00 AM - 10:00 AM",
        trainer: "Randy Porter",
        spot: "13"
    },
    {
        id: 4,
        className: "Pilates Reformer",
        type: "Gym",
        bottom: "border-bottom-warning",
        hours: "7:00 AM - 8:30 AM",
        trainer: "Aaron Chapman",
        spot: "15"
    },
    {
        id: 5,
        className: "Mind & Body",
        type: "Yoga",
        bottom: "",
        hours: "8:00 AM - 9:00 AM",
        trainer: "Adam Stewart",
        spot: "20"
    }
]
export const datatable: datatsb[] = [
    {
        id: 1,
        img: "user/1.jpg",
        name: "Tiger Nixon",
        position: "System Architect",
        office: "Hewlett packard",
        invoice: "#PX0101",
        startDate: "2024/04/27",
        Budget: "$3142.00",
        salary: "High",
        credit: "4.3%",
        ActionClass: "badge-light-primary",
        iconClass: "icofont-arrow-up",
        iconColor: "font-success"
    },
    {
        id: 2,
        img: "user/2.png",
        name: "Garrett Winters",
        position: "Maintenace service",
        office: "Apple Inc.",
        invoice: "#RF304f",
        startDate: "2024/04/22",
        Budget: "$1234.00",
        salary: "Urgent",
        credit: "5.6%",
        ActionClass: "badge-light-danger",
        iconClass: "icofont-arrow-up",
        iconColor: "font-success"
    },
    {
        id: 3,
        img: "user/3.jpg",
        name: "Ashton Cox",
        position: "Junior Technical Author",
        office: "Edinburgh",
        invoice: "#DNJ480",
        startDate: "2024/05/21",
        Budget: "$2345.00",
        salary: "Low",
        credit: "2.4%",
        ActionClass: "badge-light-success",
        iconClass: "icofont-arrow-down",
        iconColor: "font-danger"
    },
    {
        id: 4,
        img: "user/6.jpg",
        name: "Brielle Williamson",
        position: "Senior Javascript Developer",
        office: "Microsoft",
        invoice: "#G189d0",
        startDate: "2024/03/09",
        Budget: "$7689.00",
        salary: "Medium",
        credit: "2.2%",
        ActionClass: "badge-light-warning",
        iconClass: "icofont-arrow-down",
        iconColor: "font-danger"
    },
    {
        id: 5,
        img: "user/7.jpg",
        name: "Tiger Nixon",
        position: "Accountant",
        office: "Tata Co.",
        invoice: "#31D8FFS",
        startDate: "2024/04/10",
        Budget: "$2145.00",
        salary: "High",
        credit: "5.8%",
        ActionClass: "badge-light-primary",
        iconClass: "icofont-arrow-up",
        iconColor: "font-success"
    },
    {
        id: 6,
        img: "user/14.png",
        name: "Michael Morris",
        position: "General service",
        office: "Google Inc.",
        invoice: "#G189D4",
        startDate: "2024/06/12",
        Budget: "$2578.00",
        salary: "Urgent",
        credit: "6.4%",
        ActionClass: "badge-light-danger",
        iconClass: "icofont-arrow-up",
        iconColor: "font-success"
    },
    {
        id: 7,
        img: "user/10.jpg",
        name: "Kevin Dawson",
        position: "System Architect",
        office: "Mindtree Ltd.",
        invoice: "#PX2101",
        startDate: "2024/04/25",
        Budget: "$6538.00",
        salary: "Low",
        credit: "0.3%",
        ActionClass: "badge-light-success",
        iconClass: "icofont-arrow-down",
        iconColor: "font-danger"
    },
    {
        id: 8,
        img: "user/12.png",
        name: "Thomas Taylor",
        position: "System Architect",
        office: "Wipro Ltd.",
        invoice: "#px0101",
        startDate: "2024/06/09",
        Budget: "$2121.00",
        salary: "Urgent",
        credit: "7.3%",
        ActionClass: "badge-light-danger",
        iconClass: "icofont-arrow-up",
        iconColor: "font-success"
    },
    {
        id: 9,
        img: "user/3.png",
        name: "Carolyn Jones",
        position: "General service",
        office: "Edinburgh",
        invoice: "#G5384H",
        startDate: "2024/01/11",
        Budget: "$9546.00",
        salary: "High",
        credit: "6.3%",
        ActionClass: "badge-light-primary",
        iconClass: "icofont-arrow-up",
        iconColor: "font-uccess"
    },
    {
        id: 10,
        img: "user/6.jpg",
        name: "Glen Matney",
        position: "System Architect",
        office: "Mphasis Ltd",
        invoice: "#E5384H",
        startDate: "2024/04/02",
        Budget: "$4587.00",
        salary: "Medium",
        credit: "3.3%",
        ActionClass: "badge-light-warning",
        iconClass: "icofont-arrow-down",
        iconColor: "font-danger"
    },
    {
        id: 11,
        img: "user/9.jpg",
        name: "Charles Kubik",
        position: "System Architect",
        office: "Infosys Ltd.",
        invoice: "#JK384H",
        startDate: "2024/05/01",
        Budget: "$3140.00",
        salary: "Low",
        credit: "2.3%",
        ActionClass: "badge-light-success",
        iconClass: "icofont-arrow-down",
        iconColor: "font-danger"
    },
    {
        id: 12,
        img: "user/10.jpg",
        name: "Herbert Stokes",
        position: "General service",
        office: "Edinburgh",
        invoice: "#HY5384H",
        startDate: "2024/07/04",
        Budget: "$3014.00",
        salary: "Low",
        credit: "1.3%",
        ActionClass: "badge-light-success",
        iconClass: "icofont-arrow-down",
        iconColor: "font-danger"
    },
    {
        id: 13,
        img: "user/11.png",
        name: "Mary Cousar",
        position: "System Architect",
        office: "Infosys.",
        invoice: "#KH384H",
        startDate: "2024/04/06",
        Budget: "$2014.00",
        salary: "Urgent",
        credit: "5.3%",
        ActionClass: "badge-light-danger",
        iconClass: "icofont-arrow-up",
        iconColor: "font-success"
    }
]