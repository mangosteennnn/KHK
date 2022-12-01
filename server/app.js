const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

//Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

//Load db methods
const mongoDataMethods = require('./data/db')

//Connenct to MongoDB
const connenctDB = async() => {
  try {
    await mongoose.connect('mongodb+srv://ngocnhun:12345@tutorialgraphql.gbwviqj.mongodb.net/TutorialGraphQL?retryWrites=true&w=majority',
      {
      //useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      })

    console.log('MongoDB connected')
  } catch (error){
    console.log(error.message)
    process.exit(1)
  }
}

connenctDB()

const server = new ApolloServer({typeDefs, resolvers, context: () => ({mongoDataMethods})
})

const app = express();
server.start().then((res) => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});