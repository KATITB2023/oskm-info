import { Flex } from '@chakra-ui/react';
import Element from '~/components/Element';
import { useState, useEffect } from 'react';
import InitElement from './InitElement';

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
    ['time', '12.45', 'Open Gate'],
    ['time', '13.30', 'Opening Ceremony'],
    ['time', '14.30', 'Opening Performance'],
    ['time', '15.00', 'ISHOMA'],
    ['time', '15.45', 'Talkshow 1: Tentang ITB dan KM ITB'],

    ['day', '17 Agustus 2023', 'DAY 2'],
    ['time', '07.30', 'Upcara Kemerdekaan Indonesia'],
    [
      'time',
      '09.30',
      'Talkshow 2: Tentang Bangsa, Perguruan tinggi, dan Mahasiswa Sesi 1'
    ],
    ['time', '10.50', 'Tentang Bangsa, Perguruan tinggi, dan Mahasiswa Sesi 2'],
    ['time', '12.00', 'ISHOMA'],
    [
      'time',
      '13.00',
      'Mentoring 1: Tentang Bangsa, Perguruan tinggi, dan Mahasiswa'
    ],
    ['time', '14.00', 'Treasure Hunt'],
    ['time', '14.45', 'ISHOMA'],
    ['time', '16.20', 'Interfak'],

    ['day', '18 Agustus 2023', 'DAY 3'],
    ['time', '06.30', 'Open Gate'],
    ['time', '08.00', 'Defile Unit'],
    ['time', '08.30', 'Talkshow 3: Tentang Diri'],
    ['time', '11.00', 'Mentoring 2: Tentang Diri'],
    ['time', '11.50', 'ISHOMA'],
    ['time', '13.10', 'Mentoring 3: Identitas Mahasiswa dan PoPoPe'],
    ['time', '13.55', 'Mentoring 4: Organisasi dan Kaderisasi'],
    ['time', '15.10', 'ISHOMA'],
    ['time', '15.40', 'Mentoring Agama'],
    ['time', '17.10', 'Treasure Hunt'],

    ['day', '19 Agustus 2023', 'DAY 4'],
    ['time', '13.00', 'Lorong Massa'],
    ['time', '14.30', 'Performance Warna-warni'],
    ['time', '15.00', 'ISHOMA'],
    ['time', '15.45', 'Orasi Danlap'],
    ['time', '16.10', 'Pawai Pelangi'],
    ['time', '16.55', 'Orasi Pelangi'],
    ['time', '17.55', 'ISHOMA'],
    ['time', '18.25', 'Closing ceremony']
  ];

  return (
    <Flex>
      <Flex marginTop={{ base: '20%', lg: '3%' }} position='absolute'></Flex>
      <Flex flexDir={'column'} marginTop={{ base: '2%', lg: '2%' }}>
        <InitElement date='16 Agustus 2023' title='DAY 1'></InitElement>
        {datetime.map((item, index) => (
          <Element key={index} exp={item[0]} date={item[1]} title={item[2]} />
        ))}
      </Flex>
    </Flex>
  );
}
