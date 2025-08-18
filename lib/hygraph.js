import { GraphQLClient } from 'graphql-request';

// Define the base URLs for Hygraph API - one for read operations and one for write operations
const HYGRAPH_READ_ENDPOINT = process.env.HYGRAPH_READ_ENDPOINT;
const HYGRAPH_WRITE_ENDPOINT = process.env.HYGRAPH_WRITE_ENDPOINT;
const HYGRAPH_AUTH_TOKEN = process.env.HYGRAPH_AUTH_TOKEN;

// Create clients for read and write operations
export const readClient = new GraphQLClient(HYGRAPH_READ_ENDPOINT);

// Write client with auth token for mutation operations
export const writeClient = new GraphQLClient(HYGRAPH_WRITE_ENDPOINT, {
    headers: {
        Authorization: `Bearer ${HYGRAPH_AUTH_TOKEN}`,
    },
});

// Function to fetch products with optional filtering
export async function fetchProducts({ materialType, colorTone, finish, limit = 12, skip = 0 } = {}) {
    // Build the where clause based on filters
    let where = {};

    if (materialType) {
        where.materialType = materialType;
    }

    if (colorTone) {
        where.colorTone = colorTone;
    }

    if (finish) {
        where.finish = finish;
    }

    // Construct the GraphQL query with optional filtering
    const query = `
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

    // Execute the query
    const result = await readClient.request(query, {
        where: Object.keys(where).length > 0 ? where : null,
        limit,
        skip,
    });

    return {
        products: result.products,
        totalCount: result.productsConnection.aggregate.count,
    };
}

// Function to fetch a single product by slug
export async function fetchProductBySlug(slug) {
    const query = `
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

    const result = await readClient.request(query, { slug });
    return result.product;
}

// Function to create a new inquiry
export async function createInquiry(inquiryData) {
    const mutation = `
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

    const result = await writeClient.request(mutation, {
        data: {
            ...inquiryData,
            status: "NEW"
        }
    });

    return result.createInquiry;
}

// Function to fetch all inquiries
export async function fetchInquiries() {
    const query = `
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

    const result = await readClient.request(query);
    return result.inquiries;
}

// Function to update inquiry status
export async function updateInquiryStatus(id, status) {
    const mutation = `
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

    const result = await writeClient.request(mutation, {
        id,
        status,
    });

    return result.updateInquiry;
}

// Function to create a new product
export async function createProduct(productData) {
    // Prepare the image connections
    const imageConnections = productData.images.map(url => ({
        url,
    }));

    const mutation = `
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

    // Prepare the data structure for the mutation
    const data = {
        name: productData.name,
        slug: productData.slug,
        materialType: productData.materialType,
        colorTone: productData.colorTone,
        finish: productData.finish,
        thicknessMm: productData.thicknessMm,
        pricePerM2: productData.pricePerM2,
        description: productData.description,
        origin: productData.origin || null,
        density: productData.density || null,
        waterAbsorption: productData.waterAbsorption || null,
        compressiveStrength: productData.compressiveStrength || null,
        images: {
            create: imageConnections.map(image => ({
                asset: {
                    create: {
                        url: image.url,
                    },
                    connect: null
                }
            }))
        }
    };

    const result = await writeClient.request(mutation, { data });
    return result;
}
