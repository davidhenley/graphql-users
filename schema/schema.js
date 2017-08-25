const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const users = [
  { id: '1', firstName: 'David', age: 32 },
  { id: '2', firstName: 'Ryan', age: 30 },
  { id: '3', firstName: 'Kyle', age: 35 },
];

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
      resolve(pV, { id }) {
        return _.find(users, { id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
