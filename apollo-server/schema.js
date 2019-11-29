const { gql } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const { getCwd } = require('./folder');
const { find, filter } = require('lodash');

const pubsub = new PubSub();
const POST_ADDED = 'POST_ADDED';

const authors = [{
    name: 'hyb',
    id: 1
}];

const books = [{
    title: '大司马',
    author: 'hyb'
}, {
    title: '大司马1',
    author: 'hyb'
}, {
    title: '三国志',
    author: 'sds'
}];
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Subscription {
        postAdded: Post
    }
    type Book {
      title: String
      author: Author
    }
    type Post {
        author: String
        comment: String
    }

    type Author {
      id: Int
      name: String
      books: [Book]
    }
  
    type Query {
      author(id: Int): Author
      currentFolder: String
    }
  
    type Mutation {
      addPost(author: String, comment: String): Post
    }
  `;

// Provide resolver functions for your schema fields
const resolvers = {
    Subscription: {
        postAdded: {
          // Additional event labels can be passed to asyncIterator creation
          subscribe: () => {
              return pubsub.asyncIterator([POST_ADDED]);
          },
        },
    },
    Query: {
        author(parent, args) {
            return find(authors, { id: args.id });
        },
        currentFolder: () => {
            return getCwd();
        }
    },
    Author: {
        books(author) {
            return filter(books, { author: author.name });
        }
    },
    Mutation: {
        addPost(root, args) {
            pubsub.publish(POST_ADDED, { postAdded: args });
            return args;
        }
    }
};

module.exports = { typeDefs, resolvers };