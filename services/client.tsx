import { GraphQLClient } from "graphql-request";
const EndpointUrl = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const Token = process.env.NEXT_PUBLIC_GRAPHCMS_ACCESS_TOKEN;

export const graphqlClient = new GraphQLClient(EndpointUrl, {
  headers: {
    Authorization:
      `Bearer ${Token}`,
  },
});
