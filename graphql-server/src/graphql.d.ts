declare module '*.graphql' {
    import { DocumentNode } from 'src/graphql'
    const Schema: DocumentNode
  
    export = Schema
}
  