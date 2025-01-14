import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "@/styles/GlobalStyles";
import { Layout } from "@/ui/Layout";
import { Home } from "@/pages/Home";
import { ThemeProvider } from "@/context/ThemeContext";
import useTables from "./features/tables/useTables";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  useEffect(() => {
    document.body.classList.remove("no-transition");
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="tables/:name" />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
