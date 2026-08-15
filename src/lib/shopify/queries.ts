export const PRODUCTS_QUERY = `
  query {
    products(first: 10) {
      nodes {
        id
        handle
        title
        description
        featuredImage {
          url
          altText
        }
      }
    }
  }
`;
export const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 5) {
        nodes {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            nodes {
              id
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      images(first: 10) {
        nodes {
          url
          altText
        }
      }
      variants(first: 25) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
      metafields(
      identifiers: [
            { namespace: "custom", key: "precio_total" }
            { namespace: "custom", key: "trip_date" }
      ]
      ) {
          namespace
          key
          value
          type
      }
    }
  }
`;

export const CART_QUERY = `
  query CartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCTS_BY_TYPE_QUERY = `
  query ProductsByType($query: String!) {
    products(first: 15, query: $query) {
      nodes {
        id
        title
        handle
        description
        productType
        featuredImage {
          url
          altText
        }
        variants(first: 1) {
          nodes {
            id
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
        metafields(
        identifiers: [
            { namespace: "custom", key: "precio_total" }
            { namespace: "custom", key: "trip_date" }
            { namespace: "custom", key: "trip_start_date" }
        ]
        ) {
          namespace
          key
          value
          type
        }
      }
    }
  }
`;