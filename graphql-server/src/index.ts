import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { resolvers } from "./resolvers";
import authMiddleware from "./middleware/auth";
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./schema.graphql"), {
      encoding: "utf-8",
    })
);

async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server,{
        context : authMiddleware
    });
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
}

mongoose.connect(
    process.env.DATABASE_URL,
    {dbName:'eCommerce'}
    ).then(async () => {
        await startApolloServer();
        console.log("DB Connected Successfully");
    }).catch((error:any) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    });
