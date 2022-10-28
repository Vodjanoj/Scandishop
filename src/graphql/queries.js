import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const GRAPH_URL = "http://localhost:4000/";

const client = new ApolloClient({
  uri: GRAPH_URL,
  cache: new InMemoryCache(),
});

export async function getCategories() {
  const query = gql`
    query {
      categories {
        name
      }
    }
  `;
  const {
    data: { categories },
  } = await client.query({ query });


  return categories;
}

export async function getCurrencies() {
  const query = gql`
    query {
      currencies {
        label
        symbol
      }
    }
  `;
  const {
    data: { currencies },
  } = await client.query({ query });
  return currencies;
}

export async function getProductsByCategory(categoryType) {
  const query = gql`
    query productsByCategoryQuery($categoryType: String!) {
      category(input: { title: $categoryType }) {
        name
        products {
          id
          name
          brand
          gallery
          prices {
            currency {
              label
              symbol
            }
            amount
          }
        }
      }
    }
  `;
  const variables = { categoryType };
  const {
    data: {
      category: { products },
    },
  } = await client.query({ query, variables });

  return products;
}

// const query = gql`
//     query {
//       categories {
//         name
//         products {
//           id
//           name
//           inStock
//           gallery
//           description
//           category
//           attributes {
//             id
//             name
//             type
//             items {
//               displayValue
//               value
//               id
//             }
//           }
//           prices {
//             currency {
//               label
//               symbol
//             }
//             amount
//           }
//           brand
//         }
//       }
//     }
//   `;
