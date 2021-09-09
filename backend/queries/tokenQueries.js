import { graphql } from "graphql";

export const tokenQuery = graphql`
  {
    ethereum(network: bsc) {
      dexTrades(
        options: { desc: ["block.height", "tradeIndex"], limit: 1, offset: 0 }
        date: { since: "2021-05-27", till: null }
        baseCurrency: { is: "0x9b3Cf8809d82d729cb42b61cCA3f8a7A98B8d5Ed" }
      ) {
        block {
          timestamp {
            time(format: "%Y-%m-%d %H:%M:%S")
          }
          height
        }
        tradeIndex
        protocol
        exchange {
          fullName
        }
        smartContract {
          address {
            address
            annotation
          }
        }
        baseAmount
        baseCurrency {
          name
          address
          symbol
        }
        quotePrice
        quoteAmount
        quoteCurrency {
          address
          symbol
        }
        transaction {
          hash
        }
      }
    }
  }
`;
