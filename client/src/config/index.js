

export const registerFormControls = [
    {
        name: 'username',
        label: 'UserName',
        placeholder: 'Enter your username',
        componentType: 'input',
        type: 'text',
        required: true,
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your Email',
        componentType: 'input',
        type: 'email',
        required: true,
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your Password',
        componentType: 'input',
        type: 'password',
        required: true,
    }
]

export const loginFormControls = [
    {
        name: "email",
        label: "Email",
        placeholder: 'Enter your email',
        type: "email",
        required: true,
        componentType: "input"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        type: "password",
        required: true,
        componentType: "input"
    }
]


export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price",
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)",
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
];
