import { gql, request } from "graphql-request";

const apiMater = 'https://ap-south-1.cdn.hygraph.com/content/cm6yhh1kz01x307uqs702lnc0/master'

const products = async (projectslug) => {
  const query = gql`
   query MyQuery {
  products(first: 100) {
    image {
      url
    }
    wasf
    title
    time
  }
}

    `

  const data = await request(apiMater, query)
  return data

}
const product = async (productslug) => {
  // Remove hyphens and clean the slug
  const cleanSlug = decodeURIComponent(productslug ?? "")
    .trim()
    .replace(/-/g, " ")
    .trim();

  const query = gql`
   

    query MyQuery {
  products(
    first: 100
    where: {title_contains: "${cleanSlug}"}
  ) {
    image {
      url
    }
    wasf
    title
    time
    uses
    nameofmatriel
    color {
      hex
    }
    description
  }
}
  `;

  const data = await request(apiMater, query);
  return data;
};


const mainpageProjects = async () => {
  const query = gql`
   query MyQuery {
  projectdatas {
    title

    image {
      url
    }
      slug
  }
}

    `

  const data = await request(apiMater, query)
  return data

}

const sendMessage = async (name, email, phone3, message) => {
  const query = gql`
 
  
  mutation MyMutation {
  createNewMessage(
    data: {email: "`+ email + `", message: "` + message + `", name: "` + name + `", phone: "` + phone3 + `"}
  ) {
    id
  }
  publishManyNewMessagesConnection(first: 1000) {
    edges {
      node {
        id
      }
    }
  }
}
  

    `

  const data = await request(apiMater, query)
  return data
}

const allContacts = async () => {
  const query = gql`
   query MyQuery {
  contacts(first: 100) {
    company
    email
    message
    name
    phonenumber
    quantity
  }
}
    `

  const data = await request(apiMater, query)
  return data

}

const landscapes = async () => {
  const query = gql`
  query MyQuery {
  landscapes {
    title
    image {
      imageLandscape {
        id
      }
      url
    }
    descriptoin
  }
}
    `

  const data = await request(apiMater, query)
  return data

}

const createContact = async (name, email, phone, message, company, quantity) => {
  // Remove any non-numeric characters and convert to number
  const phoneNumber = parseInt(phone.replace(/\D/g, ''));
  const parsedQuantity = parseInt(quantity) || 0;

  const query = gql`
    mutation MyMutation {
      createContact(
        data: {
          company: "${company || ''}", 
          email: "${email || ''}", 
          message: "${message}", 
          name: "${name}", 
          phonenumber: ${phoneNumber}, 
          quantity: ${parsedQuantity}
        }
      ) {
        id
      }
        
  publishManyContactsConnection(first: 100) {
    edges {
      node {
        id
      }
    }
  }
    }
  `

  const data = await request(apiMater, query)
  return data
}

export default { products, product, landscapes, sendMessage, allContacts, createContact }