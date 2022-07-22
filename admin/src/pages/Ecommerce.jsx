import React, { useEffect } from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import { GoPrimitiveDot } from "react-icons/go";
import { Stacked, SparkLine, Button} from "../components";
import { earningData, SparklineAreaData } from '../data/dummy';

const Ecommerce = () => {
  const { setFormPage } = useStateContext();
  useEffect(()=>{
      setFormPage(true);
  })
  const { currentColor } = useStateContext();

  return (
    <div className='mt-12' >
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className='text-gray-400 font-bold' >Earnings</p>
              <p className='text-2xl' >$63,448.78</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
              size="md"
            />
          </div>
        </div>
        <div className='flex m-3 flex-wrap items-center gap-1 justify-center' >
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 pr-24 rounded-2xl"
            >
              <button
                type='button'
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl transition-all duration-300"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>{item.percentage}</span>
              </p>
              <p className='text-sm text-gray-400 mt-1' >{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-10 flex-wrap justify-center' >
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780'>
          <div className='flex justify-between cursor-default' >
            <p className="font-semibold text-xl ml-4 md:ml-0">Revenue Updates</p>
            <div className='flex items-center gap-4' >
              <p className='flex items-center gap-2 text-gray-600 hover:drop-shadow-xl transition-all duration-300' >
                <span><GoPrimitiveDot /> </span>
                <span>Expense </span>
              </p>
              <p className='flex items-center gap-2 text-green-600 hover:drop-shadow-xl transition-all duration-300' >
                <span><GoPrimitiveDot /></span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className='mt-10 flex gap-10 flex-wrap justify-center' >
            <div className="border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className='text-3xl font-semibold'>$93,438</span>
                  <span className='p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs transition-all duration-200'>23%</span>
                </p>
                <p className='text-gray-500 mt-1'>Budget</p>
              </div>
              <div className="mt-8">
                <p>
                  <span className='text-3xl font-semibold'>$93,438</span>
                </p>
                <p className='text-gray-500 mt-1'>Expense</p>
              </div>
              <div className="mt-5">
                <SparkLine
                  currentcolor={currentColor}
                  id="line-sparkline"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked width="320px" height="360px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ecommerce