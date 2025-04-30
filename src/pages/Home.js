// import { useEffect, useState } from 'react';
// import '../styles/Home.css';
// import ProductCard from '../components/ProductCard';
// import bannerImage from '../static/bg.jpg';
// import axios from 'axios';
// import { BASE_URL, API_HEADERS } from '../config';

// function Home({ addToCart }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/products/`, {
//         headers: API_HEADERS,
//       })
//       .then((response) => {
//         setProducts(response.data || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       });
//   }, []);
//   console.log(products);
//   return (
//     <div className="home-container">
//       <img src={bannerImage} alt="Banner" className="home-banner" />

//       {loading ? (
//         <p>Loading products...</p>
//       ) : (
//         <div className="product-grid">
//           {products.map((product) => (
//             <ProductCard product={product} addToCart={addToCart} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;

import { useEffect, useState } from 'react';
import '../styles/Home.css';
import ProductCard from '../components/ProductCard';
import bannerImage from '../static/bg.jpg';
import axios from 'axios';
import config from '../config.json';
export const BASE_URL = config.BASE_URL;
export const API_HEADERS = config.API_HEADERS;

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViaWebSocket = async () => {
      try {
        // async with websockets.connect(uri) as websocket:
        //     print("[*] Connected to master.")
        //     # Send self IP+PORT to master
        //     await websocket.send(json.dumps({
        //         "type": "register",
        //         "ip": f"{get_own_ip()}:{SLAVE_PORT}"
        //     }))

        //     await listen_to_master(websocket)
        const ws = new WebSocket('ws://192.168.75.106:7890'); // Replace with actual master WS address

        ws.onopen = () => {
          console.log('[WS] Connected to master');
          ws.send(JSON.stringify({ type: 'get_active_peer' }));
        };

        ws.onmessage = async (event) => {
          const msg = JSON.parse(event.data);

          if (msg.type === 'active_peer') {
            const activeIP = msg.ip;

            console.log('[WS] Active peer IP:', activeIP);
            const activeWs = new WebSocket(`ws://${activeIP}:7891`);
            activeWs.onopen = () => {
              console.log('[WS] Connected to active peer');
              activeWs.send(JSON.stringify({ type: 'get_leader_ip' }));
            };

            activeWs.onmessage = (e) => {
              const activeMsg = JSON.parse(e.data);

              if (activeMsg.type === 'leader_ip') {
                const leaderIP = activeMsg.ip;
                console.log('[WS] Leader IP:', leaderIP);

                const leaderWs = new WebSocket(`ws://${leaderIP}:7891`);
                leaderWs.onopen = () => {
                  console.log('[WS] Connected to leader');
                  leaderWs.send(JSON.stringify({ type: 'get_random_slave' }));
                };

                leaderWs.onmessage = async (event) => {
                  const leaderMsg = JSON.parse(event.data);
                  if (leaderMsg.type === 'random_slave') {
                    const ngrokUrl = leaderMsg.ngrok_url;
                    const ngrok_header = leaderMsg.ngrok_header;
                    console.log('[WS] Ngrok URL:', ngrokUrl);
                    console.log('[WS] Ngrok Header:', ngrok_header);

                    // Step 5: Now fetch products using Axios
                    const res = await axios.get(`${ngrokUrl}/products/`, {
                      headers: ngrok_header,
                    });
                    setProducts(res.data || []);
                    setLoading(false);
                  }
                };
              }
            };
          }
        };

        ws.onerror = (err) => {
          console.error('[WS] Master connection error:', err);
          setLoading(false);
        };
      } catch (error) {
        console.error('Error fetching products via WebSocket:', error);
        setLoading(false);
      }
    };

    fetchViaWebSocket();
  }, []);

  return (
    <div className="home-container">
      <img src={bannerImage} alt="Banner" className="home-banner" />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
