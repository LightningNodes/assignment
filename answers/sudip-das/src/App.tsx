import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "antd"
import { Provider } from "react-redux"
import { store } from "./store"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true
    }
  }
});

function App({ children }: { children: React.ReactNode }) {

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#437eff'
          }
        },
      }}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>

    </ConfigProvider>
  )
}

export default App
