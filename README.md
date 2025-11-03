<img src="https://ibb.co.com/6JL1C7Zd" alt='Data Model diagram'>

erDiagram
    CATEGORY ||--o{ PRODUCT : contains
    CATEGORY {
        ObjectId _id
        string name
    }
    PRODUCT {
        ObjectId _id
        string name
        string description
        number price
        number discount
        boolean status
        string image
        string productCode
        ObjectId category
    }
