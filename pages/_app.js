import "@/styles/globals.css";
import Layout from '@/src/components/Layout'; 

export default function App({ Component, pageProps }) {
  return (
    
      <Layout>
      <Component {...pageProps} />
      </Layout>

  );
}
