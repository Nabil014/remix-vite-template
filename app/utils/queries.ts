import crypto from "crypto";
import { prisma } from "./prisma.server";


export async function accountExists(email: string) {
  let account = await prisma.user.findUnique({
    where: { email: email },
    select: { id: true },
  });

  return Boolean(account);
}

export async function createAccount(email: string, password: string,firstName: string, lastName: string, ) {
  let salt = crypto.randomBytes(16).toString("hex");
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha256")
    .toString("hex");

  return prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,

      password: {
        create: {
          hash,
          salt,
        },
      },    },
  });
}

export async function createMessageWhale(message: any, currentTime: any) {
  await prisma.signalwhale.create({
    data: {
      alert: message.alert,
      chain: message.chain,
      swapped: message.swapped,
      from: message.from,
      to: message.to,
      netWorth: message.netWorth,
      transactionHash: message.transactionHash,
      time: currentTime,
    },
  });
}
export async function createMessageTrader(message: any, currentTime: any) {
  await prisma.signaltrader.create({
    data: {
      alert: message.alert,
      chain: message.chain,
      swapped: message.swapped,
      from: message.from,
      to: message.to,
      netWorth: message.netWorth,
      transactionHash: message.transactionHash,
      time: currentTime,
    },
  });
}
export async function login(email: string, password: string) {
  // Encuentra al usuario junto con su registro de contraseña
  let user = await prisma.user.findUnique({
    where: { email: email },
    include: {
      password: true, // Asegura que el campo 'password' sea incluido en el resultado
    },
  });

  if (!user || !user.password) {
    // Si el usuario no existe o no tiene una contraseña asignada, retorna false
    return false;
  }

  // Genera el hash usando la misma sal almacenada en el campo
  let hash = crypto
    .pbkdf2Sync(password, user.password.salt, 1000, 64, "sha256")
    .toString("hex");

  // Verifica si el hash generado coincide con el almacenado
  if (hash !== user.password.hash) {
    return false;
  }

  // Devuelve el identificador del usuario si las contraseñas coinciden
  return user.id;
}

export async function getMessagesWhales() {
  const messages = await prisma.signalwhale.findMany({
    select: {
      alert: true,
      chain: true,
      swapped: true,
      from: true,
      to: true,
      netWorth: true,
      transactionHash: true,
      time: true
    },
    orderBy: {
      time: "desc",
    },
  });
  return messages;
}

export async function getMessagesTraders() {
  const messages = await prisma.signaltrader.findMany({
    select: {
      alert: true,
      chain: true,
      swapped: true,
      from: true,
      to: true,
      netWorth: true,
      transactionHash: true,
      time: true
    },
    orderBy: {
      time: "desc",
    },
  });
  return messages;
}