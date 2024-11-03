import Banner from '../components/Banner';
import Browser from '../components/Browser';
import HomeSlider from '../components/HomeSlider';
import Popular from '../components/Popular';
import {motion} from "framer-motion"

const Home = () => {
    return(
        <motion.div initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration: 0.1}}>
            <Banner />
            <Browser />
            <Popular /> 
            <HomeSlider />
        </motion.div>
    );
}

export default Home