"use server"

import { directus } from "@/services/directus"
import { getServerSession } from "next-auth"
import { options } from "@/lib/auth/options"
import { deleteUser, readUsers, updateUser } from "@directus/sdk"
import { revalidatePath } from "next/cache"

export async function getUsers() {
  const session = await getServerSession(options)
  const api = directus(session?.access_token)

  return await api.request(
    readUsers({
      limit: -1,
      fields: ["*", "role.id", "role.name"],
    })
  )
}

export async function removeUser(id: string) {
  const session = await getServerSession(options)
  const api = directus(session?.access_token)

  await api.request(deleteUser(id))
  revalidatePath("/dashboard/users")
}

export async function editUser(id: string, formData: FormData) {
  const session = await getServerSession(options)
  const api = directus(session?.access_token)

  await api.request(
    updateUser(id, {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
    })
  )
  revalidatePath("/dashboard/users")
}
