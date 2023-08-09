import { Flex } from '@chakra-ui/react';
import Element from '~/components/Element';
import { useState, useEffect } from 'react';

export default function Timeline() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const datetime = [
    ['day', '16 Agustus 2023', 'DAY 1'],
    ['time', '16.00', 'awikwok'],
    ['time', '16.00', 'awikwok'],
    ['time', '16.00', 'awikwok'],
    ['time', '16.00', 'awikwok']
  ];
  const space = windowWidth >= 1024 ? 10 : 45;
  const y2Value = `${space * (datetime.length - 1)}%`;

  return (
    <Flex>
      <Flex marginTop={{ base: '20%', lg: '3%' }} position='absolute'>
        {datetime.length > 1 && (
          <svg height='200%' width=''>
            <line
              x1={windowWidth >= 1024 ? '90%' : '30%'}
              y1='0%'
              x2={windowWidth >= 1024 ? '90%' : '30%'}
              y2={y2Value}
              stroke='#FF93D1'
              strokeWidth={windowWidth >= 1024 ? '4' : '3'}
            />
          </svg>
        )}
      </Flex>
      <Flex flexDir={'column'} marginTop={{ base: '2%', lg: '2%' }}>
        {datetime.map((item, index) => (
          <Element key={index} exp={item[0]} date={item[1]} title={item[2]} />
        ))}
      </Flex>
    </Flex>
  );
}
