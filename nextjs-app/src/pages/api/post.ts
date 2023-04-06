import axios from "axios";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

type Data = {
  message: string;
  results:
    | {
        address1: string;
        address2: string;
        address3: string;
        kana1: string;
        kana2: string;
        kana3: string;
        prefcode: string;
        zipcode: string;
      }[]
    | null;
  status: number;
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const code = req.query.code as string;
  if (!code) {
    res.status(400).json({ message: "no post code!", results: null, status: 404 });
  }
  await axios("https://zipcloud.ibsnet.co.jp/api/search", {
    method: "GET",
    headers: { Accept: "application/json", "Content-type": "application/json" },
    params: { zipcode: code },
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((e: { message: string; results: null; status: number }) => {
      res.status(200).json(e);
    });
};

export default handler;
