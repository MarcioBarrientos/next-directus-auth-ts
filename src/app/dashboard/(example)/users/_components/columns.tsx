"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DirectusUser } from "@directus/sdk"
import { Button } from "@/components/ui/button"
import { ArrowUpDownIcon, PencilIcon, TrashIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Form from "next/form"
import { editUser, removeUser } from "@/actions/users"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = DirectusUser & {
  role: {
    id: string
    name: string
  }
}

export const columns: ColumnDef<Record<string, any>, unknown | User>[] = [
  {
    id: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return `${row.original.first_name} ${row.original.last_name}`
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return row.original.role?.name
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      const updateUserWithId = editUser.bind(null, user.id)
      return (
        <div className="flex items-center justify-end gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Update user</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Editing user</SheetTitle>
              </SheetHeader>
              <Form action={updateUserWithId} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="first_name">First name</Label>
                  <Input defaultValue={user.first_name} name="first_name" />
                </div>
                <div>
                  <Label htmlFor="last_name">Last name</Label>
                  <Input defaultValue={user.last_name} name="last_name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input defaultValue={user.email} name="email" />
                </div>
                <SheetClose asChild>
                  <Button type="submit">Update</Button>
                </SheetClose>
              </Form>
            </SheetContent>
          </Sheet>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete user</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are sure to delete this user
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  user with the email <strong>{user.email}</strong>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => removeUser(user.id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]
