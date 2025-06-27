import BestSeller from '../components/BestSeller';
import BottomBanner from '../components/BottomBanner';
import MainBanner from '../components/MainBanner'
import NewsLetter from '../components/NewsLetter';
import Catagories from '../components/catagories'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Catagories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
      
    </div>
  )
}

export default Home;
