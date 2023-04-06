import { NextPage } from "next";
import { Box, Button } from "@mui/material";

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return (
    <Box sx={{ my: 3 }}>
      <Button variant="text" href="/navitime">
        駅（ナビタイム）
      </Button>
      <Button variant="text" href="/kyoei">
        駅（キョウエイアド）
      </Button>
    </Box>
  );
};

export default Page;
