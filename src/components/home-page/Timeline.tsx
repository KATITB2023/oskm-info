import {
  Box,
  Flex,
  HStack,
  Heading,
  VStack,
  Image,
  Text,
  Grid,
  GridItem,
  useDisclosure,
  keyframes,
  useToast
} from "@chakra-ui/react";
import TimelineBackground from "../background/TimelineBackground";
import { colors } from "~/styles/component/colors";
import { timelineData } from "./Datetime";
import React, { useState } from "react";
import { TimelineModal } from "./TimelineModal";

export interface EventDetail {
  time: string;
  event: string;
  type: string;
}

interface EventProps {
  event: string;
  date: string;
  image: string;
  detail?: EventDetail[];
}

export default function Timeline() {
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDetail, setEventDetail] = useState<EventDetail[]>([]);
  const timelineDate = timelineData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const scaling = keyframes`
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.15);
    }
`;
  const scalingAsteroid = keyframes`
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.35);
    }
`;

  return (
    <>
      <Box position='relative' w='100%' pt={20} id='timeline'>
        <TimelineBackground />
        <Flex px={{ base: 10, lg: 48 }} py={20} flexDir='column' gap={20}>
          <Heading
            size='2xl'
            color='yellow.5'
            textShadow={`0px 0px 10px ${colors.yellow[5]}`}
            textAlign={{ base: "center", lg: "left" }}
            zIndex='10'
          >
            TIMELINE
            <br />
            KAT ITB 2023
          </Heading>
          <VStack spacing={0} px={{ base: 0, lg: 40 }} zIndex='10'>
            {timelineDate.map((data: EventProps, indexParent) => (
              <React.Fragment key={data.event}>
                <HStack
                  alignSelf={indexParent % 2 === 0 ? "flex-start" : "flex-end"}
                  spacing={2}
                  transition='all 0.2s ease-in-out'
                  onClick={() => {
                    if (data.detail && data.detail.length > 0) {
                      const now = new Date().getTime();
                      const titleDetail = data.detail.filter(
                        (detail) => detail.type === "title"
                      );
                      let title = "";
                      // haha gws
                      const monthParser = [
                        "Januari",
                        "Februari",
                        "Maret",
                        "April",
                        "Mei",
                        "Juni",
                        "Juli",
                        "Agustus",
                        "September",
                        "Oktober",
                        "November",
                        "Desember"
                      ];
                      titleDetail.forEach((detail) => {
                        const splitted = detail.time.split(" ");
                        const day = splitted[0] as string;
                        const month = monthParser.indexOf(
                          splitted[1] as string
                        );
                        const year = splitted[2] as string;
                        const time = new Date(
                          `${year}-${month + 1}-${parseInt(
                            day
                          )} 00:00:00 GMT+0700`
                        ).getTime();
                        if (time >= now && title === "") {
                          title = detail.time;
                        }
                      });

                      const index = data.detail.findIndex(
                        (detail) => detail.time === title
                      );

                      let detail = data.detail;
                      if (index !== -1) detail = data.detail.slice(0, index);
                      if (detail.length === 0) {
                        toast({
                          status: "info",
                          description:
                            "Yah, detailnya belum bisa dimunculin. Jalanin aja dulu ya!",
                          position: "top"
                        });
                        return;
                      }

                      setEventTitle(data.event);
                      setEventDetail(detail);
                      onOpen();
                      return;
                    }
                    if (data.detail && data.detail.length === 0) {
                      toast({
                        status: "info",
                        description: "Detailnya belum ada nih, ditunggu ya!",
                        position: "top"
                      });
                    }
                  }}
                  _hover={{
                    cursor: "pointer",
                    animation: `${scaling} 1s infinite alternate`
                  }}
                >
                  <Image
                    src={data.image}
                    alt=''
                    draggable='false'
                    w={{
                      base: indexParent === 1 ? "75px" : "100px",
                      lg: indexParent === 1 ? "150px" : "250px"
                    }}
                  />
                  <VStack spacing={0} color='yellow.5'>
                    <Heading fontSize={{ base: "xl", lg: "2xl" }}>
                      {data.event}
                    </Heading>
                    <Text fontSize={{ base: "lg", lg: "xl" }} textAlign='left'>
                      {data.date}
                    </Text>
                  </VStack>
                </HStack>
                {indexParent !== timelineDate.length - 1 && (
                  <Grid
                    templateRows='repeat(4, 1fr)'
                    templateColumns='repeat(4, 1fr)'
                    w='80%'
                    key={`timeline-${indexParent}`}
                  >
                    {new Array(4).fill(0).map((_, index) => (
                      <React.Fragment key={`meteor-${index}`}>
                        {index !== 0 && indexParent % 2 === 0 && (
                          <GridItem colSpan={index} />
                        )}
                        {index !== 3 && indexParent % 2 !== 0 && (
                          <GridItem colSpan={3 - index} />
                        )}
                        <GridItem
                          colSpan={
                            indexParent % 2 === 0 ? 4 - index : index + 1
                          }
                        >
                          <Image
                            src={`/images/timeline/${
                              indexParent % 2 === 0
                                ? "asteroid"
                                : "asteroid-left"
                            }.png`}
                            alt=''
                            w={{ base: "40px", lg: "70px" }}
                            draggable='false'
                            animation={`${scalingAsteroid} 1.5s infinite alternate`}
                            sx={{
                              animationDelay: `${
                                index * Math.floor(Math.random() * 1.5)
                              }s`
                            }}
                          />
                        </GridItem>
                      </React.Fragment>
                    ))}
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </VStack>
        </Flex>
      </Box>
      <TimelineModal
        isOpen={isOpen}
        onClose={onClose}
        title={eventTitle}
        data={eventDetail}
      />
    </>
  );
}
