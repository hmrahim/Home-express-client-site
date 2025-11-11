import React from 'react';
import Banner from '../../Components/Banner';
import Featured from './Featured';
import ElectricItems from './ElectricItems';
import PlumbingItems from './PlumbingItems';
import PaintingItems from './PaintingItems';

const Home = () => {
    return (
        <div className=''>
            <Banner/>
           <Featured/>
           <ElectricItems/>
           <PlumbingItems/>
           <PaintingItems/>
           

        </div>
    );
};

export default Home;