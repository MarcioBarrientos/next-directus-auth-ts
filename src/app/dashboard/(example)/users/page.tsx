import { ContentLayout } from "@/components/content-layout"
import { getUsers } from "@/actions/users"
import { DataTable } from "@/app/dashboard/(example)/users/_components/data-table"
import { columns } from "@/app/dashboard/(example)/users/_components/columns"

export default async function UsersPage() {
  const users = await getUsers()
  return (
    <ContentLayout title="Users">
      {/*<div>{JSON.stringify(users)}</div>*/}
      <DataTable columns={columns} data={users} />
    </ContentLayout>
  )
}
