"use server";

import { TLogin, TRegister } from "@/schemas/auth";
import { createAxiosClient } from "@/lib/api";
import { setCookie } from "./shared";

export async function register(values: TRegister) {
  try {
    delete (values as any).confirmPassword;
    const serverClient = createAxiosClient();
    const { data } = await serverClient.post("/user/signup", values);
    setCookie(data.data.token);
    return { success: "User Created, Please Login" };
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}

export async function login(values: TLogin) {
  try {
    const serverClient = createAxiosClient();
    const { data } = await serverClient.post("/user/login", values);
    setCookie(data.data.token);
    return { success: "Success" };
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}
