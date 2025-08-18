// This file contains all the GraphQL queries and mutations for the Hygraph API

// Product queries
export const GET_PRODUCTS = `
  query GetProducts($where: ProductWhereInput, $limit: Int, $skip: Int) {
    products(where: $where, first: $limit, skip: $skip) {
      id
      name
      slug
      materialType
      colorTone
      finish
      thicknessMm
      pricePerM2
      images {
        url
      }
    }
    productsConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: String!) {
    product(where: { slug: $slug }) {
      id
      name
      slug
      materialType
      colorTone
      finish
      thicknessMm
      pricePerM2
      description
      origin
      density
      waterAbsorption
      compressiveStrength
      images {
        url
      }
    }
  }
`;

export const GET_FEATURED_PRODUCTS = `
  query GetFeaturedProducts {
    products(first: 6, orderBy: createdAt_DESC) {
      id
      name
      slug
      materialType
      colorTone
      finish
      images {
        url
      }
      pricePerM2
    }
  }
`;

// Inquiry mutations
export const CREATE_INQUIRY = `
  mutation CreateInquiry($data: InquiryCreateInput!) {
    createInquiry(data: $data) {
      id
      createdAt
      name
      email
      phone
      message
      productId
      productNameSnapshot
      quantityM2
      company
      status
    }
  }
`;

// Inquiry queries
export const GET_INQUIRIES = `
  query GetInquiries {
    inquiries(orderBy: createdAt_DESC) {
      id
      createdAt
      name
      email
      phone
      message
      productId
      productNameSnapshot
      quantityM2
      company
      status
    }
  }
`;

// Inquiry mutations
export const UPDATE_INQUIRY_STATUS = `
  mutation UpdateInquiry($id: ID!, $status: InquiryStatus!) {
    updateInquiry(
      where: { id: $id }
      data: { status: $status }
    ) {
      id
      status
    }
    publishInquiry(where: { id: $id }) {
      id
    }
  }
`;

// Product mutations
export const CREATE_PRODUCT = `
  mutation CreateProduct($data: ProductCreateInput!) {
    createProduct(data: $data) {
      id
      slug
    }
    publishProduct(where: { slug: $data.slug }) {
      id
    }
  }
`;
