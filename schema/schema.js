const graphql = require('graphql');
const axios = require('axios');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const ROOT_URL = 'http://localhost:3000';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(pV, { id }) {
        let { data } = await axios.get(`${ROOT_URL}/users/${id}`);
        console.log(data);
        return data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
