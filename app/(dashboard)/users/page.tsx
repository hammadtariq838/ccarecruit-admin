import { fetchUsersOnServer } from "@/requests/server/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function UsersPage() {
  const users = await fetchUsersOnServer();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className="my-4">
        <Table>
          <TableHeader>
            <TableRow>
              {users.length > 0 &&
                Object.keys(users[0]).map((key) => (
                  <TableHead key={key}>
                    {key
                      .replace(/([A-Z])/g, " $1") // insert space before capital letters
                      .replace(/^./, (str) => str.toUpperCase()) // capitalize first letter
                    }
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {Object.values(user).map((value, index) => (
                  <TableCell key={index}>{value?.toString()}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
