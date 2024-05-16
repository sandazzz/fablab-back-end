import { Prisma, PrismaClient } from "@prisma/client";
import fastify from "fastify";

const prisma = new PrismaClient();
const app = fastify({ logger: true });

app.get("/", async (req, res) => {
  // Renvoyer une réponse JSON avec un statut 200 OK
  res.send({ message: "Hello World" });
});

app.get<{
  Params: UserUidParams;
}>(`/user/:cardid`, async (req, res) => {
  const { cardid } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        cardid: cardid,
      },
    });
    if (!user) {
      res.status(404).send("User not found");
      return false;
    }
    return true;
    res.send(true);
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).send("Error fetching user data");
  }
});

interface UserUidParams {
  cardid: string;
}

/*app.put<{
  Body: IAddPoint;
}>("/addpoint", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        points: {
          increment: 1,
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error updating user points:", error);
    res.status(500).send("Error updating user points");
  }
});

interface IAddPoint {
  id: number;
}*/

//-------------------------------------------------------------------------------

app.listen( 3000, '0.0.0.0' , (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`
  🚀 Server ready at: http://localhost:3000
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`);
});
