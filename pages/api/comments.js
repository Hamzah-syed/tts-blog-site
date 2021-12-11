// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql } from "graphql-request";
import { graphqlClient } from "../../services/client";

export default async function comments(req, res) {
  const { name, email, comment, slug } = JSON.parse(req.body);
  const query = gql`
    mutation createComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    let result;
    await graphqlClient
      .request(query, {
        name,
        email,
        comment,
        slug,
      })
      .then((res) => (result = res))
      .catch((err) => console.log(err));
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
