"use server";

import { revalidatePath } from "next/cache";
import { updateOperatorProfile, updateOperatorPlan } from "@/lib/db";

export type ProfileActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

function readRequiredString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
}

export async function saveProfileAction(
  _previousState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  try {
    const fullName = readRequiredString(formData, "fullName");
    const role = readRequiredString(formData, "role");
    const email = readRequiredString(formData, "email");
    const operationalNote = readRequiredString(formData, "operationalNote");

    updateOperatorProfile({
      fullName,
      role,
      email,
      operationalNote,
    });

    revalidatePath("/", "layout");

    return {
      status: "success",
      message: "Profile saved.",
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to save profile.",
    };
  }
}

export async function savePlanAction(
  _previousState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  try {
    const plan = readRequiredString(formData, "plan");

    updateOperatorPlan(plan);

    revalidatePath("/", "layout");

    return {
      status: "success",
      message: "Plan updated.",
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to save plan.",
    };
  }
}
