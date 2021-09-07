//importe aki os estylos dos Components
import '../../styles/global.css'
import '../../styles/menu.css'
import '../../styles/content.css'
import '../../styles/cards.css'
import '../../styles/details.css'




function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp