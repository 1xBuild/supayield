import { defaultConnectors } from "@fuels/connectors";
import { QueryClient } from "@tanstack/react-query";

// Creating a Query Client instance for react-query
export const queryClient = new QueryClient();

// Fuel Provider configuration
export const fuelConfig = {
  connectors: defaultConnectors({ devMode: true }),
};
