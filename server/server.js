require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth"); 
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;


app.use(authMiddleware);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            user: req.user,
            authError: req.authError,
        };
    },
});

const startApolloServer = async () => {
    await server.start(); 
    server.applyMiddleware({ app }); 

    
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startApolloServer(); 
