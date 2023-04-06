import { NextPage } from "next";
import { Box, Button, ButtonGroup } from "@mui/material";
import { stationsData } from "@/data/stations/stations1";
import { useState } from "react";
import Kyoei from "@/designs/Kyoei";

type PageProps = {};
const Page: NextPage<PageProps> = () => {
  const [index, setIndex] = useState<number>(0);
  const station = stationsData[index];

  return (
    <Box sx={{ padding: "10px" }}>
      <Box sx={{ margin: "10px auto" }}>
        <Kyoei station={station} />
      </Box>
      <ButtonGroup>
        <Button
          size="large"
          variant="outlined"
          disabled={index === 0}
          onClick={() => {
            if (index > 0) {
              setIndex(index - 1);
            }
          }}
        >
          戻る
        </Button>
        <Button
          size="large"
          variant="outlined"
          disabled={index === stationsData.length - 1}
          onClick={() => {
            if (index < stationsData.length) {
              setIndex(index + 1);
            }
          }}
        >
          次へ
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Page;
