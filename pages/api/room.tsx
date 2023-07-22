import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  code: string;
};

const RoomHandler = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  switch (req.method) {
    case "GET": {
    }
    case "POST": {
      const { displayName } = req.body;

      if (displayName.length >= 3 && displayName.length <= 20) {
        return res.status(200).json({ message: "Success", code: "000000" });
      }

      return res
        .status(400)
        .json({ message: "Invalid display name", code: "000000" });
    }
    default: {
      return res
        .status(405)
        .json({ message: "Invalid method", code: "000000" });
    }
  }
};

export default RoomHandler;
