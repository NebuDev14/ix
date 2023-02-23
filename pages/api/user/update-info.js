import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";
import { filterBody, wrongMethod, unauthorized, missingFields } from "../../../lib/server";

// TODO: server side validation of OSIS and image (link)
export default async function handler(req, res) {
  if (req.method != "POST") {
    return wrongMethod();
  }

  const jwt = await getToken({ req });
  if (!jwt) {
    return unauthorized();
  }

  // https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
  // current changeable fields
  const fields = ["osis", "name", "image", "experience", "initialized"];
  const body = filterBody(req.body, fields)
  if (body.initialized && !body.osis && !body.experience) {
    return missingFields();
  }

  const updateUser = await prisma.user.update({
    where: {
      id: jwt.sub,
    },
    data: {
      ...body,
    },
  });
  return res.status(200).json(updateUser);
}
